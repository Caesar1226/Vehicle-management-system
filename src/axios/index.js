import JsonP from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';
import Utils from '../utils/utils';
export default class Axios{
    static reequestList(_this, url, params){
        var data = {
            params : params
        }   
        this.ajax({
            url,
            data
        }).then((res)=>{
            let list = res.result.item_list.map((item, index) => {
                item.key = index;
                return item;
            });
            _this.setState({
                list,
                pagination: Utils.pagination(res, (current) => {
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        })
    }
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, {
                param: 'callback'
            }, function (err, response) {
                if (response.status == 'success') {
                    resolve(response);
                } else {
                    reject(response.messsage);
                }
            })
        })
    }
    static get(option){
        return new Promise((resolve, reject)=>{
            axios.get(option.url,option.params)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err); 
            })
        })
    }
    static ajax(options){
        let loading;
        if(options.data && options.data.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        let baseApi = "http://rap2api.taobao.org/app/mock/240963" 
        return new Promise((resolve, reject)=>{
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseApi,
                timeout: 5000,
                params: (options.data && options.data.params) || ''
            }).then(res=>{
                if(options.data && options.data.isShowLoading !== false){
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if(res.status == 200){
                    let data = res.data
                    if(data.code == '0'){
                        resolve(data)
                    }else {
                        Modal.info({
                            title: "提示",
                            content: data.msg
                        })
                    }
                }
            }).catch(err=>{
                if(options.data && options.data.isShowLoading !== false){
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                reject(err)
            })
        })
    }
}