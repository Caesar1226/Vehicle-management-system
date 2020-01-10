import { Table, Carousel, message } from 'antd';
import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import Login from './pages/login';
import Home from './pages/home';
import Admin from './admin';
import Buttons from './pages/ui/button';
import NoMatch from './pages/nomatch';
import Modals from './pages/ui/modals';
import Loadings from './pages/ui/loadings';
import Notice from './pages/ui/notice';
import Message from './pages/ui/message';
import Tab from './pages/ui/tabs';
import Gallery from './pages/ui/gallery';
import Carousels from './pages/ui/carousel';
import FormLogin from './pages/form/login';
import FormRegister from './pages/form/register';
import BasicTable from './pages/table/basicTable';
import HighTable from './pages/table/highTable';
import City from './pages/city';
import Order from './pages/order';
import OrderDetail from './pages/order/detail';
import Common from './common';
import User from './pages/user';
import BikeMap from './pages/Map/bikeMap';
import Bar from './pages/echarts/bar';
import Pie from './pages/echarts/pie';
import Line from './pages/echarts/line';
import Rich from './pages/rich';

class IRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <HashRouter>
                <App>
                    <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/common" render={() =>
                        <Common>
                            <Route path="/common/order/detail/:orderId" component={OrderDetail}/>
                        </Common>
                    }
                    />
                    <Route path="/" render={()=>
                        <Admin>
                            <Switch>
                                <Route path='/home' component={Home} />
                                <Route path="/ui/buttons" component={Buttons}></Route>
                                <Route path="/ui/modals" component={Modals}></Route>
                                <Route path="/ui/loadings" component={Loadings}></Route>
                                <Route path="/ui/notification" component={Notice}></Route>
                                <Route path="/ui/messages" component={Message}></Route>
                                <Route path="/ui/tabs" component={Tab}></Route>
                                <Route path="/ui/gallery" component={Gallery}></Route>
                                <Route path="/ui/carousel" component={Carousels}></Route>
                                <Route path="/form/login" component={FormLogin}></Route>
                                <Route path="/form/reg" component={FormRegister}></Route>
                                <Route path="/table/basic" component={BasicTable}></Route>
                                <Route path="/table/high" component={HighTable}></Route>
                                <Route path="/city" component={City}></Route>
                                <Route path="/order" component={Order}></Route>
                                <Route path="/user" component={User}></Route>
                                <Route path="/bikeMap" component={BikeMap}></Route>
                                <Route path="/charts/bar" component={Bar}></Route>
                                <Route path="/charts/pie" component={Pie}></Route>
                                <Route path="/charts/line" component={Line}></Route>
                                <Route path="/rich" component={Rich}></Route>
                                <Route component={NoMatch}></Route>
                            </Switch>
                        </Admin>
                    }></Route>
                    </Switch>
                </App>
            </HashRouter>
        );
    }
}
 
export default IRouter;