import { message, Card, Button } from 'antd';
import React, { Component } from 'react';
import './ui.less';
class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    showMessage = (type)=>{
        message[type]('恭喜你，React课程紧急成功');
    }
    render() { 
        return (
            <div>
                <Card title="全局提示框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.showMessage('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.showMessage('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.showMessage('warning')}>Warning</Button>
                    <Button type="primary" onClick={()=>this.showMessage('error')}>Error</Button>
                    <Button type="primary" onClick={()=>this.showMessage('loading')}>Loading</Button>
                </Card>
            </div>
        );
    }
}
 
export default Message;