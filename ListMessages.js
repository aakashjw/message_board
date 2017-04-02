import React from 'react';
import {List} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CustomListItem from './ListItem.js';
import {getAllPosts,postMessage,deleteAll} from './Api.js'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import ReactDOM from 'react-dom';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

class ListExampleMessages extends React.Component {

constructor(props) {
  super(props);
  this.state = { listItems: [], open: false };
}

  getInitialState(){
      return {
          listItems : [], open:false
      }
  }
  componentWillMount(){
    getAllPosts(this.getAllMessagesFromServer.bind(this))
  }

  getAllMessagesFromServer(messages){
   console.log("getAllMessagesFromServer",messages);
   if(messages == false){
      this.setState({
      listItems : 0
    }) 
   }
   this.setState({
      listItems : messages
    })

  }
  postMessage(){
      let text = this.refs.textInput.input.value
      postMessage(text,this.getAllMessagesFromServer.bind(this))
  }
  deleteAll(){
      //deleteAll(this.getAllMessagesFromServer.bind(this))
  }
  handleOpen(){
    this.setState({open: true});
  };

  handleClose(){
    this.setState({open: false});
  };
  
   render() {
    const actions = [
          <FlatButton
            label="Submit"
            onClick = {()=>{
            console.log("this.refs.token.input.value",this.refs.token.input.value);
              deleteAll((messages)=>{
                      this.getAllMessagesFromServer(messages)
                      this.handleClose().bind(this);
                  } ,this.refs.token.input.value)
          
            }}
            primary={true}
            onTouchTap={this.handleClose}
          />,
          <FlatButton
            label="Cancel"
            primary={true}
            onClick={this.handleClose.bind(this)}
          />,
        ];

    console.log("rendering",this.state.listItems);
      return (  <div>
                     <MuiThemeProvider >
                      <List>
                          <Subheader>Message Board</Subheader>
                          <div>
                          <Toolbar>
                          <ToolbarGroup firstChild={true}>
                          <TextField
                                hintText="Message Field"
                                floatingLabelText="Post a message here"
                                ref="textInput"
                          /><br />
                          <RaisedButton label="POST MESSAGE" 
                          primary={true} 
                          onClick = {this.postMessage.bind(this)}/>

                          <RaisedButton label="DELETE ALL" 
                          secondary={true} 
                          onClick = {this.handleOpen.bind(this)}/>

                          </ToolbarGroup>
                          </Toolbar>
                          </div>
                          { 
                            this.state.listItems.length>0 && this.state.listItems.map((message) => {

                            return  (
                            <div>
                            <CustomListItem id={message.id} message={message.messageText} time={message.TimeStamp} deleteCallback={this.getAllMessagesFromServer.bind(this)}></CustomListItem>
                            <Divider inset={true} />
                            </div>)
                          })}
                            
                            
                        
                        </List>
                          

                    </MuiThemeProvider >
                    <MuiThemeProvider >
                    <Dialog
                              actions={actions}
                              modal={false}
                              open={this.state.open}
                            >

                              Enter Secret Token To Delete 
                              {"\n"}

                             <TextField
                                        hintText="Enter Secret Token"
                                        floatingLabelText="Secret Token"
                                        ref="token"
                                  /><br />

                         </Dialog>
                      </MuiThemeProvider >
                </div>
            ); 
  }
  
}




export default ListExampleMessages;