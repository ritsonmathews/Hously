import { Input, Button, TextField } from "@mui/material";
import "./SendMessage.css";

import React, { useState } from "react";

const SendMessage = (props) => {
  const { submitMessageFn } = props;

  const [msg, setMsg] = useState({});
  
  const userTyping = (e) =>{
  setMsg(e.target.value);
  console.log(msg);
   }
  // const messageValid = (txt) => txt && txt.replace(/\s/g, "").length;

  const submitMessage = () => {
  if(msg!==""){
      submitMessageFn(msg);
     
    }
    else{console.log(Error);}
    setMsg("");
  }
    
  return (
    <div>
      <form>
        <div className="sendMsg">
          <TextField
            className="send-input-box"
            style={{
              fontSize: "15px",
              fontWeight: "550",
              marginLeft: "5px",
              marginBottom: "-3px",
            }}
            value={msg}
            onChange={(e) => userTyping(e)}
            placeholder="Type a Message...."
            
          ></TextField>
          <i
            class="far fa-paper-plane"
            onClick={submitMessage}
            style={{
              width: "18%",
              fontSize: "25px",
              fontWeight: "550",
              margin: "4px 5% -5px 1%",
              maxWidth: "200px",
            }}
          ></i>
          {/* <Button
            type="submit"
            // style={{ display: "none" }}
            onClick={(e) => e.preventDefault()}
          >
            Send
          </Button> */}
        </div>
      </form>
    </div>
  );
};
export default SendMessage;
