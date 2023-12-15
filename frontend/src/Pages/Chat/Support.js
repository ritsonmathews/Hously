// import React, { useState } from "react";
// import Chat from "./Chat";
// import ChatWindow from "./ChatWindow";
// import SendMessage from "./SendMessage";
// import { isAuthenticated } from "../../auth";
// import { db, firebaseApp } from "./firebase";
// import { useEffect } from "react";
// import firebase from 'firebase/compat/app'

// import "./Support.css";

// const userName = isAuthenticated().admin.username;
// function Support() {
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [newChatFormVisible, setNewChatFormVisible] = useState(false);
//   const [email, setEmail] = useState(" ");
//   const [chats, setChats] = useState([]);
//   const [roomId, setRoomId] = useState(null); 
//   const selectChat = (chatIndex) => {
//     setNewChatFormVisible(false);
//     setSelectedChat(chatIndex);
//     console.log();
//     console.log(selectedChat);
//   };

//   const submitMessage = (msg) => {
//     const docKey = roomId[selectedChat];
//     console.log(docKey);
//     console.log(msg);
//     if(msg!==""){
//       db.collection("messages")
//       .doc(docKey)
//       .update({ messages: firebase.firestore.FieldValue.arrayUnion({
//         sender: userName,
//          message: msg
//       }) });
//     }
 
//   };

//   useEffect(() => {
//     db.collection("messages")
//       .where("users", "array-contains", userName)
//       .onSnapshot(async (res) => {
//         const chats = res.docs.map((_doc) => _doc.data());
//         const id = res.docs.map((_doc) => _doc.id);
//         setEmail(userName);
//         setChats(chats);
//         setRoomId(id);
//         {
//           console.log(chats);
//           console.log(id);
//         }
//       });
//   }, []);

  
//     return (
//       <div className="support-main-container">
//         <div className="support-leftside">
//           <ChatWindow
//             userEmail={email}
//             selectChatFn={selectChat}
//             chats={chats}
//             selectedChatIndex={selectedChat}
//           ></ChatWindow>
//         </div>
//         <div className="support-rightside">
//           {newChatFormVisible ? null : (
//             <Chat user={email} chat={chats[selectedChat]}></Chat>
//           )}
//           {selectedChat !== null && !newChatFormVisible ? (
//             <SendMessage submitMessageFn={submitMessage}></SendMessage>
//           ) : null}
//         </div>
//       </div>
//     )
//   }


// export default Support;
