import React, { Component } from 'react';
import { message, Select, Input, Card, Button, Modal, Form, Radio, DatePicker } from 'antd';
import axios from '../../axios';
import Utils from '../../utils/utils';
import ETable from '../../components/ETable';
import BaseForm from '../../components/BaseForm';
import moment from 'moment';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const { Option } = Select;
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        }
    }
    formList = [
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
    params = {
        page: 1
    }
    componentDidMount(){
        this.requestList()
    }
    handleFilter=(params)=>{
        this.params = params
        this.requestList()
    }
    requestList = ()=>{
        axios.reequestList(this, '/table/list1', this.params)
    }
    // 功能区操作
    handleOperate = (type)=>{
        let _this = this;
        let item = this.state.selectedItem;
        if(type=='create'){
            this.setState({
                type,
                isVisible: true,
                title: '创建员工' 
            })
        }else if(type=='edit'){
            if(!item){
                Modal.info({
                    title: '提示',
                    content: '请选择一个用户'
                })
                return;
            }
            this.setState({
                type,
                isVisible: true,
                title: '编辑员工',
                userInfo: item 
            })
        }else if(type == 'detail'){
            if(!item){
                Modal.info({
                    title: '提示',
                    content: '请选择一个用户'
                })
                return;
            }
            this.setState({
                type,
                isVisible: true,
                title: '员工详情',
                userInfo: item 
            })
        }else {
            if(!item){
                Modal.info({
                    title: '提示',
                    content: '请选择一个用户'
                })
                return;
            }
            Modal.confirm({
                title: '确认删除',
                content: '是否要删除当前选中员工?',
                onOk(){
                    axios.ajax({
                        url: '/user/delete',
                        data: {
                            params: {
                                id: item.id
                            }
                        }
                    }).then(res=>{
                        if(res.code == 0){
                            message.error({
                                content: '删除成功!'
                            })
                            _this.setState({
                                isVisible: false 
                            })
                            _this.requestList()
                        }
                    })
                }
            })
        }
        
    }
    // 创建提交
    handleSubmit = ()=>{
        let type = this.state.type;
        let data = this.userForm.props.form.getFieldsValue();
        axios.ajax({
            url: type=='create'?'/user/add':'/user/edit',
            data: {
                params: data
            }
        }).then(res=>{
            if(res.code == 0){
                this.userForm.props.form.resetFields();
                this.setState({
                    isVisible: false 
                })
                this.requestList()
            }
        })
    }
    render() { 
        const columns = [{
            title: 'id',
            dataIndex: 'id'
          }, {
            title: '用户名',
            dataIndex: 'username'
          }, {
            title: '性别',
            dataIndex: 'sex',
            render(sex){
                return sex ==1 ?'男':'女'
            }
          }, {
            title: '状态',
            dataIndex: 'state',
            render(state){
                let config = {
                    '1':'咸鱼一条',
                    '2':'风华浪子',
                    '3':'北大才子一枚',
                    '4':'百度FE',
                    '5':'创业者'
                }
                return config[state];
            }
          },{
            title: '爱好',
            dataIndex: 'interest',
            render(interest){
                let config = {
                    '1':'游泳',
                    '2':'打篮球',
                    '3':'踢足球',
                    '4':'跑步',
                    '5':'爬山',
                    '6':'骑行',
                    '7':'桌球',
                    '8':'麦霸'
                }
                return config[interest];
            }
          },{
            title: '结婚状况',
            dataIndex: 'isMarried',
            render(isMarried){
                return isMarried == 1 ?'已婚':'未婚'
            }
          },{
            title: '生日',
            dataIndex: 'birthday'
          },{
            title: '联系地址',
            dataIndex: 'address'
          },{
            title: '早起时间',
            dataIndex: 'time'
          }
        ];
        let footer = {};
        
        if(this.state.type == 'detail'){
            footer = {
                footer: null
            }}
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}></BaseForm>
                </Card>
                <Card style={{marginTop:10}} className="operate-wrap">
                    <Button type="primary" icon="plus" onClick={()=>this.handleOperate('create')}>创建员工</Button>
                    <Button type="primary" icon="edit" style={{marginLeft:10}} onClick={()=>this.handleOperate('edit')}>编辑员工</Button>
                    <Button type="primary" onClick={()=>this.handleOperate('detail')}>员工详情</Button>
                    <Button type="primary" icon="delete" style={{marginLeft:10}} onClick={()=>this.handleOperate()}>删除员工</Button>
                </Card>
                <div className="content-wrap">
                    <ETable 
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        columns={columns} 
                        dataSource={this.state.list} 
                        pagination={false} 
                        selectedRowKeys={this.state.selectedRowKeys}
                        rowSelection={'radio'}
                        selectedRowKeys = {this.state.selectedRowKeys}
                        selectedItem={this.state.selectedItem}
                    />
                </div> 
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    onCancel={()=>{
                        this.userForm.props.form.resetFields();
                        this.setState({
                            isVisible : false
                        })
                    }}
                    width={600}
                    {...footer}
                >
                    <UserForm type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={(inst)=>this.userForm = inst}></UserForm>
                </Modal>
            </div>
        );
    }
}
 
export default User;

class UserForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            isVisible: false
        }
    }
    getState = (state)=>{
        return {
            '1':'咸鱼一条',
            '2':'风华浪子',
            '3':'北大才子一枚',
            '4':'百度FE',
            '5':'创业者'
        }[state]
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        }
        let type = this.props.type;
        let userInfo = this.props.userInfo || {};
        return (
            <Form layout="horizontal">
                <FormItem label="用户名" {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.username :
                        getFieldDecorator('user_name',{
                            initialValue: userInfo.username
                        })(
                            <Input type="text" placeholder="请输入用户名"/>
                        )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.sex==1?'男': '女' :
                        getFieldDecorator('sex',{
                            initialValue: userInfo.sex
                        })(
                            <RadioGroup>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        type == 'detail' ? this.getState(userInfo.state) :
                        getFieldDecorator('state',{
                            initialValue: userInfo.state
                        })(
                            <Select>
                                <Option value={1}>咸鱼一条</Option>
                                <Option value={2}>风华浪子</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="生日" {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.birthday :
                        getFieldDecorator('birthday',{
                            initialValue: moment(userInfo.birthday)
                        })(
                            <DatePicker></DatePicker>
                        )
                    }
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.address :
                        getFieldDecorator('address',{
                            initialValue: userInfo.address
                        })(
                            <TextArea rows={3} placeholder="请输入联系地址"></TextArea>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}
UserForm = Form.create({})(UserForm)