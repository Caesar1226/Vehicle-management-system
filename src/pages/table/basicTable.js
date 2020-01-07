import { Checkbox, Table, Card, Button, Modal, message } from 'antd';
import React, { Component } from 'react';
import axios from '../../axios/index';
import Utils from '../../utils/utils';
class BasicTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            dataSource2: [],
        }
    }
    params = {
        page: 1
    }
    componentDidMount(){
        const dataSource = [
            {
                id: 1,
                userName: "徐洋",
                sex: "男",
                state: "2",
                interest: "3",
                birthday: "2008-10-22",
                address : "广东省漳州市",
                time: "2018-12-01 13:45:22"
                },
                {
                id: 2,
                userName: "毛军",
                sex: "女",
                state: "4",
                interest: "7",
                birthday: "1986-03-21",
                address : "河北省巴音郭楞蒙古自治州",
                time: "1975-11-27 17:52:11"
                },
                {
                id: 3,
                userName: "钱娜",
                sex: "女",
                state: "4",
                interest: "4",
                birthday: "1977-05-11",
                address : "江苏省黄山市",
                time: "1984-02-18 13:04:51"
                },
                {
                id: 4,
                userName: "林芳",
                sex: "女",
                state: "1",
                interest: "5",
                birthday: "2007-05-21",
                address : "辽宁省西宁市",
                time: "1970-12-14 12:08:08"
                },
                {
                id: 5,
                userName: "傅秀英",
                sex: "女",
                state: "2",
                interest: "4",
                birthday: "1989-02-05",
                address : "浙江省无锡市",
                time: "1983-04-21 12:55:28"
                },
                {
                id: 6,
                userName: "陆静",
                sex: "女",
                state: "3",
                interest: "4",
                birthday: "1992-04-25",
                address : "澳门特别行政区东莞市",
                time: "2015-10-31 22:01:30"
                }
        ]
        dataSource.map((item, index)=>{
            item.key = index
        })
        this.setState({
            dataSource
        })
        this.request();
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
                        dataSource2: res.result.list,
                        selectedRowKeys: [],
                        selectedRows: null,                     
                        selectedRowKey: [],
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
    onRowClick = (record, index)=>{
        console.log(record, index)
        let selectKey = [index]
        this.setState({
            selectedRowKey: selectKey,
            selectedItem: record
        })
    }
    add = ()=>{
        let item = this.state.selectedItem;
        if(item.id){

        }
    }
    // 复选框删除
    handleDelete = () => {
        let rows = this.state.selectedRows
        let ids = []
        rows.map((item)=>{
            ids.push(item.id)
        })
        Modal.confirm({
            title: '删除提示',
            content: `您确定要删除这些数据吗？${ids.join(',')}`,
            onOk: ()=>{
                message.success('删除成功');
                this.setState({
                    selectedRowKeys: [],
                    selectedRows: null
                })
                this.request()
            }
        })
    }
    render() { 
        const columns = [
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
        //const { selectedRowKeys, selectedRowKey } = this.state;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys: this.state.selectedRowKey
        }
        const rowCheckSelection = {
            type: 'checkBox',
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows)=>{
                let ids = []
                selectedRows.map((item)=>{
                    ids.push(item.id)
                })
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        }
        return (
            <div>
                <Card title="基础表格">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    ></Table>
                </Card>
                <Card title="动态数据渲染表格-Mock" style={{marginTop: 10}}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    ></Table>
                </Card>
                <Card title="Mock-单选" style={{marginTop: 10}}>
                    <Table
                        rowSelection={rowSelection} 
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                        onRow={(record, index)=>{
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index)
                                }
                            }
                        }}
                    ></Table>
                </Card>
                <Card title="Mock-复选" style={{marginTop: 10}}>
                    <div>
                        <Button onClick={this.handleDelete} style={{marginBottom: 10}}>删除</Button>
                    </div>  
                    <Table
                        rowSelection={ rowCheckSelection } 
                        bordered
                        columns={columns}
                        dataSource={ this.state.dataSource2 }
                        pagination={ false }
                        onRow={(record, index)=>{
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index)  
                                }
                            }
                        }}
                    ></Table>
                </Card>
                <Card title="Mock-分页" style={{marginTop: 10}}>         
                    <Table
                        bordered
                        columns={columns}
                        dataSource={ this.state.dataSource2 }
                        pagination={ true }
                        pagination={ this.state.pagination }
                    ></Table>
                </Card>
            </div>
        );
    }
}
 
export default BasicTable;