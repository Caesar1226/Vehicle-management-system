import { Row, Col } from 'antd';
import React, { Component } from 'react';
import './index.less';
import utils from '../../utils/utils';
import axios from '../../axios/index';
import { connect } from 'react-redux'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    componentWillMount(){
        this.setState({
            userName: '君不见'
        })
        setInterval(() => {
            
            let sysTime = utils.formateDate(new Date().getTime());
            this.setState({
                sysTime
            })
        }, 1000);
        this.getWeatherAPIData()
    }

    getWeatherAPIData(){
        axios.get({
            url: "https://free-api.heweather.net/s6/weather/now?location=%E5%8D%97%E4%BA%AC&key=0cfb4f5f0a8944829204be3f557bd31a"
        }).then(res=>{
            let weather = res.data.HeWeather6[0].now.cond_txt
            this.setState({
                weather
            })
        })
    }

    render() { 
        const menuType = this.props.menuType
        return (
            <div className="header">
                <Row className="header-top">
                    {
                        menuType ? 
                            <Col span={6} className="logo">
                                <img src="/assets/logo-ant.svg" alt=""/>
                                <span>Imooc 通用管理系统</span>
                            </Col> : ''
                    }
                    <Col span={menuType ? 18 : 24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                {
                    menuType ? '' :
                    <Row className="breadcrumb">
                        <Col span={4} className="breadcrumb-title">
                            { this.props.menuName1 }
                        </Col>
                        <Col span={20} className="weather">
                            <span className="date">{this.state.sysTime}</span>
                            <span className="weather-detail">{this.state.weather}</span>
                        </Col>
                    </Row>
                }
            </div>
        );
    }
}
const mapStateToProps = state => {
    
    return {
        menuName1: state.menuName
    }
} 
export default connect(mapStateToProps)(Header);