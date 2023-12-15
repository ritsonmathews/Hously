// import React, { useState, useEffect } from "react";
// import { db } from "./firebase";
// import SendMessage from "./SendMessage";
// import "./Chat.css";
// import { isAuthenticated } from "../../auth";


// const adminId = isAuthenticated().admin._id;

// const uid = 54987454;
// const Chat = (props) => {
//   const { user, chat,index} = props;
 
 
//   console.log(chat);
  


//       if(chat === undefined) 
//       {return(<div></div>)}
//      else if(chat!== undefined) {
//       return(
//         <div className="chat-view">
//              {
//               chat.messages.map((_msg, _index,message) => {
//                 return(
//                 <div key={_index} className={_msg.sender === user ? "sent" :"received"}>
//                   {/* <div>{_msg.sender}</div> */}
//                   <div>{_msg.message}</div>
//                 </div>
//                 )
//               })
//             }
//         </div>
//       )
//  }
//  else {
// return(
//       <div className='chatview-container'>Loading...</div>)
// }
    
// }
            
  

// export default Chat;

