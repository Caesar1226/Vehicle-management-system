import { Button, Modal, Card } from 'antd';
import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftJs from 'draftjs-to-html';
class Rich extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRichText: false,
            editorState: ''
        }
    }
    onEditorStateChange = (editorState)=>{
        //console.log(editorState, 'editorState')
        this.setState({
            editorState,
        });
    }
    handleClearContent = ()=>{
        this.setState({
            editorState: ''
        });
    }
    handleGetText = ()=>{
        this.setState({
            showRichText: true
        })
    }
    onEditorChange = (contentState)=>{
        this.setState({
            contentState
        })
    }
    render() { 
        const {editorState} = this.state;
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleClearContent}>清空内容</Button>
                    <Button type="primary" onClick={this.handleGetText} style={{marginLeft: 10}}>获取HTML文本</Button>
                </Card>
                <Card title="富文本编辑器">
                <Editor
                    editorState={editorState}
                    onEditorStateChange={this.onEditorStateChange}
                    onContentStateChange={this.onEditorChange} 
                />
                </Card>
                <Modal
                    title="富文本"
                    visible= {this.state.showRichText}
                    onCancel={()=>{
                        this.setState({
                            showRichText:false
                        })
                        
                    }}
                    footer={null}
                >
                    {
                        draftJs(this.state.contentState)
                    }
                </Modal>
            </div>
        );
    }
}
 
export default Rich;