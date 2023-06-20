import { useEffect, useState } from "react";
import "./conversation.css";
import { useAuth } from '../Contexts/AuthContext';
import hacker from "../assets/img/hacker.png";
export default function Conversation({ conversation, currentUser }) {

    const  {
        // authUser,
        // setAuthUser,
        isloggedin,
        // setIsloggedin,
        // currentChat
    } = useAuth();

  const [user, setUser] = useState(null);
//   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
//   if(conversation===null) conversation = currentChat;

  useEffect(() => {
    const friendId = conversation?.members.find((m) => m !== currentUser._id);
    console.log(friendId);
    const getUser = async () => {
      try {
        const res=await fetch("/users?userId=" + friendId,{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        });
        const object= await res.json();
            console.log(object);
        // console.log(res);
        setUser(object);
        console.log(user);

      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [isloggedin]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          hacker
        }
        alt=""
      />
      <span className="conversationName">{user?.name}</span>
    </div>
  );
}
