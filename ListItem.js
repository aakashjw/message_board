import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/action/delete';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import {deleteMessage} from './Api.js';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

const iconButtonElement = (
  <IconButton
	touch={true}
  	tooltip="delete"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Reply</MenuItem>
    <MenuItem>Forward</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

class CustomListItem extends React.Component {
	constructor(props) {
	 super(props);
		this.state = { open: false };
	}
	getInitialState(){
		return {
		 open: false,
		}
	}
	 handleOpen(){
    	this.setState({open: true});
  	 };

  	handleClose(){
  	console.log("closed");
    	this.setState({open: false});
  	};


	render() {
			const actions = [
		      <FlatButton
		        label="Submit"
		        onClick = {()=>{
		        console.log("this.refs.token.input.value",this.refs.token.input.value);
		        	deleteMessage('message_'+this.props.id , (messages)=>{
		        						console.log("callback receivedd");
						  				this.props.deleteCallback(messages)
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
			      return (
			      <div>
			         <ListItem
			          leftAvatar={<Avatar src="./avatar.png" />}
			          rightIconButton={
					    <IconButton
						  	id={this.props.id}
						  	onClick = {()=>{
						  		this.handleOpen();
						  	}}
						  	touch={true}
						  	tooltip="delete"
						    tooltipPosition="bottom-left"
						  >
						    <MoreVertIcon color={grey400} />
						  </IconButton>
			          }
			          primaryText="~anonymous"
			          secondaryText={
			          
			         	<p> {this.props.message}  {this.props.time} </p> 
			             
			           }
			          secondaryTextLines={2}
			        />
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
			        </div>
			      );
	}
}

export default CustomListItem;