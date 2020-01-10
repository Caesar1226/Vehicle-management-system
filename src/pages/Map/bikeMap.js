import { Icon, Card } from 'antd';
import React, { Component } from 'react';
import axios from '../../axios';
import Utils from '../../utils/utils';
import BaseForm from '../../components/BaseForm';
class BikeMap extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount(){
        this.requestList()
    }
    map  = ''
    // 表单封装，通过构建表单对象，在BaseForm中进行统一渲染
    fformList = [
        {
            type:'INPUT',
            label:'用户名',
            field:'user_name',
            placeholder:'请输入用户名称',
            width:'100'
        },
        {
            type:'INPUT',
            label:'手机号',
            field:'user_phone',
            placeholder:'请输入用户手机号',
            width:'100',
        },
        {
            type: 'DATEPICKER',
            label:'请选择入职日期',
            field:'user_date',
            placeholder:'请输入日期'
        }
    ]
    requestList = ()=>{
        
        axios.ajax({
            url: '/map/bike_list',
            data: {
                params: this.params
            }
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
                    total_count: res.result.total_count
                })
                this.renderMap(res);
            }
        })
    }
    handleFilter=(params)=>{
        this.params = params
        this.requestList()
    }
    // 渲染地图数据
    renderMap = (res)=>{
        
        let list = res.result.route_list;
        this.map = new window.BMap.Map('container');
        let gps1 = list[0].split(',');
        let startPoint = new window.BMap.Point(gps1[0], gps1[1]);      // 起始坐标
        let gps2 = list[list.length-1].split(',');
        let endPoint = new window.BMap.Point(gps2[0], gps2[1]);        // 终止坐标
        this.map.centerAndZoom(endPoint, 11);

        let startPointIcon = new window.BMap.Icon('/assets/start_point.png',new window.BMap.Size(36,42),{
            imageSize:new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(18, 42)
        })
        let bikeMarkerStart = new window.BMap.Marker(startPoint, {icon: startPointIcon})
        this.map.addOverlay(bikeMarkerStart);
        let endPointIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(18, 42)
        })
        let bikeMarkerEnd = new window.BMap.Marker(endPoint, {icon: endPointIcon})
        this.map.addOverlay(bikeMarkerEnd);
        //绘制行驶路线
        let routeList = []
        list.forEach((item)=>{
            let p = item.split(',')
            routeList.push(new window.BMap.Point(p[0], p[1]))
        })
        let polyLine = new window.BMap.Polyline(routeList,{
            strokeColor: '#ef4136',
            strokeWeight: 2,
            strokeOpacity: 1
        })
        this.map.addOverlay(polyLine);
        //绘制服务区
        let servicePointList = []
        let serviceList = res.result.service_list
        serviceList.map((item)=>{
            servicePointList.push(new window.BMap.Point(item.lon, item.lat))
        })
        let polyServiceLine = new window.BMap.Polyline(servicePointList,{
            strokeColor: '#ef4136',
            strokeWeight: 3,
            strokeOpacity: 1
        })
        this.map.addOverlay(polyServiceLine);
        // 添加地图中的自行车图标
        let bikeList = res.result.bike_list;
        let bikeIcon = new window.BMap.Icon('/assets/bike.jpg', new window.BMap.Size(36, 42),{
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        })
        bikeList.forEach(item=>{
            let p = item.split(',')
            let point = new window.BMap.Point(p[0], p[1]);    
            let bikeMarker = new window.BMap.Marker(point, {icon: bikeIcon})  
            this.map.addOverlay(bikeMarker);
        })
    }
    render() { 
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}></BaseForm>
                </Card>
                <Card style={{marginTop: 10}}>
                    <div>共{this.state.total_count}辆车</div>
                    <div id="container" style={{height: 500}}></div>
                </Card>
            </div>
        );
    }
}
 
export default BikeMap;