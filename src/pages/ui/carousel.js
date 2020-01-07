import React, { Component } from 'react';
import './ui.less';
import { Carousel, Card } from 'antd';
class Carousels extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div className="slade-wrap">
                <Card title="文字背景轮播" className="card-wrap">
                    <Carousel autoplay effect="fade">
                        <div><h3>Ant Motion Banner - React</h3></div>
                        <div><h3>Ant Motion Banner - Vue</h3></div>
                        <div><h3>Ant Motion Banner - Angular</h3></div>
                    </Carousel>
                </Card>
                <Card title="图片背景轮播" className="card-wrap">
                    <Carousel autoplay>
                        <div><img src="/carousel-img/carousel-1.jpg" style={{width: "100%"}}/></div>
                        <div><img src="/carousel-img/carousel-2.jpg" style={{width: "100%"}}/></div>
                        <div><img src="/carousel-img/carousel-3.jpg" style={{width: "100%"}}/></div>
                    </Carousel>
                </Card>   
            </div>
        );
    }
}
 
export default Carousels;