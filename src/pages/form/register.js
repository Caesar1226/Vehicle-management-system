import React, { Component } from 'react';
import { message, Button, Checkbox, Icon, Upload, TimePicker, DatePicker, Select, Input, Card, Form, Radio, InputNumber, Switch } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userImg: ""
        }
    }
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.getBase64(info.file.originFileObj, userImg =>
            this.setState({
              userImg,
              loading: false,
            }),
          );
        }
    };
    handleSubmit = ()=>{
        let info = this.props.form.getFieldsValue();
        message.success(`${info.userName},恭喜你，提交成功!`);
    }
    render() { 
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 12}
            }
        }
        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: {
                    span: 12,
                    offset: 4
                }
            }
        }
        const rowObject = {minRows: 2, maxRows: 6};
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
        return (
            <div>
                <Card title="注册表单">
                    <Form {...formItemLayout} layout="horizontal">
                        <FormItem label="用户名">
                            {
                                getFieldDecorator('userName', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '用户名不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入用户名"></Input>
                                )
                            }
                        </FormItem> 
                        <FormItem label="密码">
                            {
                                getFieldDecorator('userPwd', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '密码不能为空'
                                        }
                                    ]
                                })(
                                    <Input type="password" placeholder="请输入密码"></Input>
                                )
                            }
                        </FormItem> 
                        <FormItem label="性别">
                            {
                                getFieldDecorator('sex', {
                                    initialValue: '',
                                    rules: []
                                })(
                                    <RadioGroup>
                                        <Radio value='1'>男</Radio>
                                        <Radio value='2'>女</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem label="年龄">
                            {
                                getFieldDecorator('age', {
                                    initialValue: 18,
                                    rules: []
                                })(
                                    <InputNumber></InputNumber>
                                )
                            }
                        </FormItem>
                        <FormItem label="当前状态">
                            {
                                getFieldDecorator('age', {
                                    initialValue: '2',
                                    rules: []
                                })(
                                    <Select>
                                        <Option value="1">咸鱼一条</Option>
                                        <Option value="2">风华浪子</Option>
                                        <Option value="3">北大才子一枚</Option>
                                        <Option value="4">百度FE</Option>
                                        <Option value="5">创业者</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="爱好">
                            {
                                getFieldDecorator('interest', {
                                    initialValue: ['2', '5'],
                                    rules: []
                                })(
                                    <Select mode="multiple">
                                        <Option value="1">游泳</Option>
                                        <Option value="2">打篮球</Option>
                                        <Option value="3">踢足球</Option>
                                        <Option value="4">跑步</Option>
                                        <Option value="5">爬山</Option>
                                        <Option value="6">骑行</Option>
                                        <Option value="7">桌球</Option>
                                        <Option value="8">麦霸</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="是否已婚">
                            {
                                getFieldDecorator('isMarried', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                    rules: []
                                })(
                                    <Switch/>
                                )
                            }
                        </FormItem>
                        <FormItem label="生日">
                            {
                                getFieldDecorator('birthday', {
                                    
                                })(
                                    <DatePicker
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label="联系地址">
                            {
                                getFieldDecorator('address')(
                                    <TextArea
                                        autoSize={rowObject}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label="早起时间">
                            {
                                getFieldDecorator('Time')(
                                    <TimePicker/>
                                )
                            }
                        </FormItem>
                        <FormItem label="头像">
                            {
                                getFieldDecorator('Avatar', {
                                    valuePropName: 'fileList'
                                })(
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        showUploadList={false}
                                        onChange={this.handleChange}
                                    >
                                        {this.state.userImg ? <img src={this.state.userImg}/>:uploadButton}
                                    </Upload>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('agreement',{
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(
                                    <Checkbox>我已阅读过<a href="#">慕课协议</a></Checkbox>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}
 
export default Form.create()(Register);