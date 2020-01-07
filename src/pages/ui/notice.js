import { Button, Card, notification } from 'antd';
import React, { Component } from 'react';
class Notice extends Component {
    state = {  }
    openNotification = (type, direction)=>{
        if(direction){
            notification.config({
                placement: direction
            })
        }
        notification[type]({
            message: 'wewega',
            description: 'asjglabhjabflafbn;ka'
        })
    }
    render() { 
        return (
            <div>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.openNotification('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.openNotification('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.openNotification('warning')}>Warning</Button>
                    <Button type="primary" onClick={()=>this.openNotification('error')}>Error</Button>
                </Card>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.openNotification('success', 'topLeft')}>Success</Button>
                    <Button type="primary" onClick={()=>this.openNotification('info', 'topRight')}>Info</Button>
                    <Button type="primary" onClick={()=>this.openNotification('warning', 'bottomLeft')}>Warning</Button>
                    <Button type="primary" onClick={()=>this.openNotification('error', 'bottomRight')}>Error</Button>
                </Card>
            </div>
        );
    }
}    
export default Notice;