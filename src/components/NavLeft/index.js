import React, { Component } from 'react';
import MenuConfig from '../../config/menuConfig';
import { Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { switchMenu } from '../../redux/action'
import './index.less';

const { SubMenu } = Menu;

class NavLeft extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentKey: ''
        }
    }
    
    componentWillMount(){
        const menuTreeNode = this.renderMenu(MenuConfig)
        let currentKey = window.location.hash.replace(/#|\?.*$/g, '')
        this.setState({
            menuTreeNode
        })
    }
    
    renderMenu = (data)=>{
        
        return data.map((item)=>{
            if(item.children){
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )               
            }
        return <Menu.Item title={item.title} key={item.key}>
                <NavLink to={item.key}>{item.title}</NavLink>
            </Menu.Item>
        })
    }
    handleClick = (item)=>{
        console.log(item)
        const { dispatch } = this.props;
        dispatch(switchMenu(item.item.props.title))
        this.setState({
            currentKey: item.key
        })
    }
    render() { 
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt=""/>
                    <h1>Imooc MS</h1>
                </div>
                <Menu 
                    onClick={this.handleClick}
                    theme="dark"
                    selectedKeys={[this.state.currentKey]}
                >
                    { this.state.menuTreeNode }
                </Menu>
            </div>
        );
    }
}
 
export default connect()(NavLeft);