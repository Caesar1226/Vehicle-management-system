import { Alert, Spin, Card, Icon } from 'antd';
import React, { Component } from 'react';
import './ui.less'
class Loadings extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const icon = <Icon type="loading" style={{fontSize: 24}}/>
        return (
            <div>
                <Card title="Spin用法" className="card-wrap">
                    <Spin size='small'></Spin>
                    <Spin style={{margin: '0 10px'}}/>
                    <Spin size='large'></Spin>
                    <Spin indicator={icon} style={{marginLeft: 10}}/>
                </Card>
                <Card title="内容遮罩" className="card-wrap">
                    <Alert 
                        message="React"
                        description="欢迎来到React高级实战课"
                        type="info"
                    />
                    
                    <Spin tip="加载中...">
                        <Alert 
                            message="React"
                            description="欢迎来到React高级实战课"
                            type="warning"
                        />
                    </Spin>
                    <Spin indicator={icon}>
                        <Alert 
                            message="React"
                            description="欢迎来到React高级实战课"
                            type="warning"
                        />
                    </Spin>
                </Card>
            </div>
        );
    }
}
 
export default Loadings;