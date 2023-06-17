import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
const STYLES = ['btn--primary', 'btn--outline', 'btn--test'];

const SIZES = ['btn--medium', 'btn--large'];

export const Logout_Button = ({
  children,
  type,
  buttonStyle,
  buttonSize,
}) => {
  const navigate = useNavigate();
  // setAuth
  const  {
    authUser,
    setAuthUser,
    isloggedin,
    setIsloggedin
} = useAuth();
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];
    const Logout = async () =>
    {
      try{
        console.log("hi");
        const res = await fetch("/logout", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        setIsloggedin(false);
        navigate('/');
        console.log(isloggedin);
        // window.location.reload();
        console.log("done with this request");  
      }
      catch(err)
      {
        console.log(err);
        window.alert("You need to first log in.");
      }
    };

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <Link to="/" className='btn-mobile'>
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={Logout}
        type={type}
      >
        {children}
      </button>
    </Link>
  );
};
