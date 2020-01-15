import React, { Component } from 'react';
import {Table} from 'antd';
import Utils from '../../utils/utils';
class ETable extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }  
    }
    onRowClick = (record, index)=>{
        
        let rowSelection = this.props.rowSelection;
        let selectedIds=this.props.selectedIds, selectedItem=this.props.selectedItem, selectedRowKeys=this.props.selectedRowKeys
        if(rowSelection=='checkbox'){
            if(selectedItem){
                const i = selectedIds.indexOf(record.id)
                if(i == -1){
                    selectedIds.push(record.id)
                    selectedItem.push(record)
                    selectedRowKeys.push(index)
                }else {
                    selectedIds.splice(i, 1)
                    selectedItem.splice(i, 1)
                    selectedRowKeys.splice(i, 1)    
                }
            }else {
                selectedIds = [record.id]
                selectedItem = [record]
                selectedRowKeys = [index]
            }
            this.props.updateSelectedItem(selectedRowKeys, selectedItem, selectedIds)
        }else {
            let selectedRowKeys = [index]
            let selectedItem = record
            //console.log(selectedRowKeys, selectedItem)
            this.props.updateSelectedItem(selectedRowKeys, selectedItem)
        }
    }
    tableInit = ()=>{
        let row_selection= this.props.rowSelection
        const rowSelection = {
            type: 'radio',
            selectedRowKeys: this.props.selectedRowKeys,
            onChange: this.onSelectChange
        }   
        if(row_selection === false || row_selection === null){
            row_selection = false   
        }else if(row_selection == 'checkbox'){
            rowSelection.type = 'checkbox'
        }else {
            row_selection = true
            rowSelection.type = 'radio'
        }
        return <Table
            bordered
            {...this.props}
            rowSelection={row_selection ? rowSelection : null}
            onRow={(record, index) => {
                return {
                    onClick: () => {
                        if(!row_selection){
                            return;
                        }
                        this.onRowClick(record, index);
                    }
                };
            }}
        />
    }
    render() { 
        return (
            <div>
                {this.tableInit()}
            </div>
        );
    }
}
 
export default ETable;