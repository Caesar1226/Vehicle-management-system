import React from 'react';
import { Select } from 'antd'
const Option = Select.Option;
export default {
    formateDate(time){
        if(!time) return ''
        time = Number(time)
        let date = new Date(time)
        return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() 
    },
    pagination(data, callback){
        return {
            onChange: (current)=>{
                
                callback(current)
            },
            current: data.result.page,
            pageSize: data.result.page_size,
            total: data.result.total,
            showTotal: ()=>{
                return `共${data.result.total}条数据`
            },
            showQuickjumper: true
        }
    },
    getOptionList(data){
        if(!data){
            return [];
        }
        let options = [] //[<Option value="0" key="all_key">全部</Option>];
        data.map((item)=>{
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        
        return options;
    },
    updateSelectedItem(selectedRowKeys, selectedItem, selectedIds){// 行key 行数据
        
        if(selectedIds){
            this.setState({
                selectedRowKeys,
                selectedItem,
                selectedIds
            })
        }else {
            this.setState({
                selectedRowKeys,
                selectedItem
            })
        }    
    }
}