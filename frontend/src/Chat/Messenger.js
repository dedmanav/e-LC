import "./messenger.css";
// import Topbar from "../../components/topbar/Topbar";
// import Conversation from "../../components/conversations/Conversation";
// import Message from "../../components/message/Message";
// import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useEffect, useRef, useState } from "react";
import { useAuth } from '../Contexts/AuthContext';
// import axios from "axios";
// import { io } from "socket.io-client";
import Topbar from "./Topbar";
import Conversation from "./Conversation";
import CurrConversation from "./CurrConversation";
import Message from "./Message";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const {
    authUser,
    // setAuthUser,
    isloggedin,
    // setIsloggedin,
    currentChat,
    setCurrentChat
}= useAuth();

  const scrollRef = useRef();

//   useEffect(() => {
//     socket.current = io("ws://localhost:8900");
//     socket.current.on("getMessage", (data) => {
//       setArrivalMessage({
//         sender: data.senderId,
//         text: data.text,
//         createdAt: Date.now(),
//       });
//     });
//   }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

//   useEffect(() => {
//     socket.current.emit("addUser", authUser._id);
//     socket.current.on("getUsers", (users) => {
//       setOnlineUsers(
//         authUser.followings.filter((f) => users.some((u) => u.userId === f))
//       );
//     });
//   }, [authUser]);
var userId = authUser?._id;
  useEffect(() => {
    const getConversations = async () => {
        try{
            console.log("tried");
            
            console.log(authUser?._id);
            const res = await fetch(`/conversations/${userId}`,{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            })
            const object= await res.json();
            console.log(object);
            setConversations(object);
            console.log(conversations);
        }
            catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [isloggedin]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        console.log("tried");
        console.log(currentChat);
            const res = await fetch('/messages/' + currentChat?._id,{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include",
                
            })
        // const res = await axios.get("/messages/" + currentChat?._id);
        const object= await res.json();
            console.log(object);
            console.log(currentChat, "hi");
        setMessages(object);
        // console.log(messages);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: authUser?._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== authUser._id
    );

//     socket.current.emit("sendMessage", {
//       senderId: authUser._id,
//       receiverId,
//       text: newMessage,
//     });

    try {
        console.log("tried");
        console.log(message);
            const res = await fetch('/messages',{
                method:"POST",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include",
                body: JSON.stringify({
                   message
                  })
            })
    //   const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* <Topbar /> */}
      <div className="messenger">
        <div className="chatMenu" >
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations?.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={authUser} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages?.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m?.sender === authUser?._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
              <CurrConversation currentUser={authUser} />
          </div>
        </div>
      </div>
    </>
  );
}
