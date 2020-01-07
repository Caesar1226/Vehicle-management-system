import { Button, Badge, Card, Table, Modal, message } from 'antd';
import React, { Component } from 'react';
import axios from '../../axios/index';
import Utils from '../../utils/utils';
class HighTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            dataSource3: [],
            sortOrder: true
        }
    }
    
    params = {
        page: 1
    }
    columns = [
        {
            title: 'id',
            dataIndex: 'id'
        },
        {
            title: '用户名',
            dataIndex: 'userName'
        },
        {
            title: '性别',
            dataIndex: 'sex'
        },
        {
            title: '状态',
            dataIndex: 'state',
            render(state){
                let config = {
                    '1': '咸鱼一条',
                    '2': '风华浪子',
                    '3': '北大才子',
                    '4': '百度FE',
                    '5': '创业者'
                }
                return config[state]
            }
        },
        {
            title: '爱好',
            dataIndex: 'interest',
            render(interest){
                let config = {
                    '1': '游泳',
                    '2': '打篮球',
                    '3': '踢足球',
                    '4': '跑步',
                    '5': '爬山',
                    '6': '骑行',
                    '7': '桌球',
                    '8': '麦霸'
                }
                return config[interest]
            }
        },
        {
            title: '生日',
            dataIndex: 'birthday'
        },
        {
            title: '地址',
            dataIndex: 'address'
        },
        {
            title: '早起时间',
            dataIndex: 'time'
        }
    ]
    
    
    componentDidMount(){
        this.request()
        this.request3()
    }
    request = ()=>{
        let _this = this;
        axios.ajax({
            url: "/imooc/table/list",
            data: {
                params: {
                    page: this.params.page
                },
                isShowLoading: true
            }
        }).then(res=>{
            if(res.code == 0){   
                res.result.list.map((item, index)=>{
                    item.key = index
                })            
                this.setState(
                    {
                        dataSource: res.result.list,
                        pagination: Utils.pagination(res, (current)=>{
                            // to do
                            _this.params.page = current;
                            _this.request();
                        })
                    }
                )
            }          
        })
    }
    request3 = ()=>{
        let _this = this;
        axios.ajax({
            url: "/imooc/table/highList",
            data: {
                params: {
                    page: this.params.page
                },
                isShowLoading: true
            }
        }).then(res=>{
            if(res.code == 0){   
                res.result.list.map((item, index)=>{
                    item.key = index
                })      
                
                this.setState(
                    {
                        dataSource3: res.result.list,
                        pagination: Utils.pagination(res, (current)=>{
                            // to do
                            _this.params.page = current;
                            _this.request3();
                        })
                    }
                )
            }          
        })
    }
    /**
     * 点击排序
     */
    handleChange = (pagination, filters, sorter)=>{
        this.setState({
            sortOrder: sorter.order
        })
    }
    /**
     * 删除
     */
    handleDelete = (item)=>{
        let id = item.id;
        let _this = this;
        Modal.confirm({
            title: '确认',
            content: '您确认要删除此条数据吗？',
            onOk: ()=>{
                message.success('删除成功');
                _this.request3();
            }
        })
    }
    render() { 
        const columns2 = [
            {
                title: 'id',
                dataIndex: 'id',
                width: 80,
                fixed: 'left'
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                fixed: 'left',
                width: 80,
            },
            {
                title: '性别',
                dataIndex: 'sex'
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state){
                    let config = {
                        '1': '咸鱼一条',
                        '2': '风华浪子',
                        '3': '北大才子',
                        '4': '百度FE',
                        '5': '创业者'
                    }
                    return config[state]
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render(interest){
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸'
                    }
                    return config[interest]
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                key: 33
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                key: 34
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                key: 35
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                key: 36
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                key: 37
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                key: 37
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                key: 38
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                key: 39
            },
            {
                title: '地址',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time'
            }
        ]
        const columns3 = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex'
            },
            {
                title: '年龄',
                dataIndex: 'age',
                sorter:(a, b)=>{
                    return a.age - b.age
                },
                sortOrder: this.state.sortOrder
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state){
                    let config = {
                        '1': '咸鱼一条',
                        '2': '风华浪子',
                        '3': '北大才子',
                        '4': '百度FE',
                        '5': '创业者'
                    }
                    return config[state]
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render(interest){
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸'
                    }
                    return config[interest]
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time'
            }
        ]
        const columns4 = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex'
            },
            {
                title: '年龄',
                dataIndex: 'age'
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state){
                    let config = {
                        '1': '咸鱼一条',
                        '2': '风华浪子',
                        '3': '北大才子',
                        '4': '百度FE',
                        '5': '创业者'
                    }
                    return config[state]
                }
            },
            {
                title: '运行状态',
                dataIndex: 'interest',
                render(interest){
                    let config = {
                        '1': <Badge status="success" text="成功"/>,
                        '2': <Badge status="error" text="错误"/>,
                        '3': <Badge status="default" text="正常"/>,
                        '4': <Badge status="processing" text="进行中"/>,
                        '5': <Badge status="warning" text="警告"/>,
                    }
                    return config[interest] || <Badge status="default" text="正常"/>
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                dataIndex: 'address'
            },
            {
                title: '操作',
                render: (text, item)=>{
                    return <Button onClick={(item)=>this.handleDelete(item)} type="danger">删除</Button>
                }
            }
        ]  
        return (
            <div>
                <Card title="头部固定">
                    <Table
                        bordered
                        columns={this.columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{y: 240}}
                    ></Table>
                </Card>
                <Card title="左侧固定">
                    <Table
                        bordered
                        columns={this.columns2}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{x: 1800, y: 240}}
                    ></Table>
                </Card>
                <Card title="表格排序">
                    <Table
                        bordered
                        columns={columns3}
                        dataSource={this.state.dataSource3}
                        pagination={false}
                        onChange={this.handleChange}
                    ></Table>
                </Card>
                <Card title="操作按钮">
                    <Table
                        bordered
                        columns={columns4}
                        dataSource={this.state.dataSource3}
                        pagination={false}
                    ></Table>
                </Card>
            </div>
        );
    }
}
 
export default HighTable;