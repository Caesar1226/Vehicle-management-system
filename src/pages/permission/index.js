import React, { Component } from 'react';
import {Card, Button, Form, Input, Select, Tree, Transfer, Modal} from 'antd'
import ETable from '../../components/ETable';
import Utils from '../../utils/utils';
import axios from '../../axios';
const FormItem = Form.Item;
const Option = Select.Option;
class Permisson extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount(){
        axios.reequestList(this, '/role/list', {});
    }
    // 角色创建
    handleRole = ()=>{
        this.setState({
            isRoleVisible:true
        })
    }
    // 提交
    handleRoleSubmit = ()=>{
        let _this = this;
        let data = this.roleForm.props.form.getFieldsValue();
        axios.ajax({
            url: '/role/create',
            data: {
                params: data
            }
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
                    isRoleVisible: false
                })
                axios.reequestList(this, '/role/list', {});
                this.roleForm.props.form.resetFields()
            }
        })
    }
    render() { 
        const columns = [
            {
                title: '角色ID',
                dataIndex: 'id'
            }, {
                title: '角色名称',
                dataIndex: 'role_name'
            },{
                title: '创建时间',
                dataIndex: 'create_time',
                render: Utils.formatTime
            }, {
                title: '使用状态',
                dataIndex: 'status',
                render(status){
                    if (status == 1) {
                        return "启用"
                    } else {
                        return "停用"
                    }
                }
            }, {
                title: '授权时间',
                dataIndex: 'authorize_time',
                render: Utils.formatTime
            }, {
                title: '授权人',
                dataIndex: 'authorize_user_name',
            }
        ];
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleRole}>创建角色</Button>
                    <Button type="primary" style={{marginLeft: 10}}>设置权限</Button>
                    <Button type="primary" style={{marginLeft: 10}}>用户授权</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        selectedRowKeys={this.state.selectedRowKeys}
                    />
                </div>
                <Modal
                    title="创建角色"
                    visible={this.state.isRoleVisible}
                    onOk={this.handleRoleSubmit}
                    onCancel={()=>{
                        this.roleForm.props.form.resetFields()
                        this.setState({
                            isRoleVisible: false
                        })
                    }}
                >
                    <RoleForm wrappedComponentRef={(inst)=>this.roleForm=inst}></RoleForm>
                </Modal>
            </div>
        );
    }
}
 
export default Permisson;

class RoleForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            isVisible: false
        }
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
                <FormItem label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator('role_name')(
                            <Input type="text" placeholder="请输入角色名称"/>
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        type == 'detail' ? this.getState(userInfo.state) :
                        getFieldDecorator('state')(
                            <Select>
                                <Option value={1}>开启</Option>
                                <Option value={0}>关闭</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}
RoleForm = Form.create({})(RoleForm)