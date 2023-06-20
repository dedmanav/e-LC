import { useEffect, useState } from "react";
import "./conversation.css";
import { useAuth } from '../Contexts/AuthContext';
import hacker from "../assets/img/hacker.png";
export default function CurrConversation({ currentUser }) {

    const  {
        // authUser,
        // setAuthUser,
        isloggedin,
        // setIsloggedin,
        currentChat
    } = useAuth();

  const [user, setUser] = useState(null);
//   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
//   let conversation = currentChat;

  useEffect(() => {
    const friendId = currentChat?.members.find((m) => m !== currentUser._id);
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
  }, [currentChat]);

  return (
    <>
    {
        currentChat ? 
    (<>
        <div>
        <h1 style={{textAlign: "center"}}> Currently Chatting With  
        </h1> 
        <hr style = {{color:'black'}} />
        
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
    </div>
    </>)
    :
    (<>
    </>)
    }
    </>
  );
}
