import React, { useEffect, useState } from "react";
import Chat from "../Chat/Chat";
import "./ChatWindow.css";
import { db } from "./firebase";
import {
  ListItemText,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Divider,
  Typography,
} from "@mui/material";

function ChatWindow(props) {
  const { userEmail, chats,selectChatFn,selectedChatIndex} = props;

  const  selectChat = (index) => selectChatFn(index);
  if(chats.length > 0){
  return (
    <div className="chat-window-main">
        <div className="chat-window-heading">
          <h3 style={{ textAlign: "center" }}> Intern Mantra</h3>
        </div>
        <div className="chat-list-main">
          <List>
            {chats.map((data, _index,users) => (
              <div className="chat-list-container">
                <div className="chat-list-name" key={_index}>
                {console.log(users)}
                  <ListItem 
                  onClick={()=>selectChat(_index)} 
                  selected={selectedChatIndex === _index} 
                  alignItems="flex-start"
                  >
                    <ListItemAvatar>
                      <Avatar>{data.users.filter(_user => _user !== userEmail)[0].split('')[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={data.users.filter(_user => _user !== userEmail)[0]}
                    secondary={
                      <React.Fragment>
                        <Typography component='span'
                          color='textPrimary'>
                            {data.messages[data.messages.length - 1].message.substring(0, 30) }
                        </Typography>
                      </React.Fragment>
                    }
                    />
                  </ListItem>
                </div>
                <Divider />
              </div>
            ))}
          </List>
        </div>
      
    </div>
  );
}
else{
  return (
    <div className="chat-window-main">
      <div className="chat-window-first">
          <h3 style={{ textAlign: "center" }}> Intern Mantra</h3>
        </div>
      </div>
  )
}

}


export default ChatWindow;
