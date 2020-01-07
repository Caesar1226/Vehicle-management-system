import { Col, Row } from 'antd';
import React, { Component } from 'react';
import Header from './components/Header';
import './style/common.less';

class Common extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 

        return (
            <div>
                <Row className="simple-page">
                    <Header menuType = "second"/>
                </Row>
                <Row className="content">
                    {this.props.children}
                </Row>
            </div>
        );
    }
}
 
export default Common;