import React, { useState, useEffect, useContext } from 'react';
import {Login_Button} from './Login_Button';
import {Logout_Button} from './Logout_Button';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import './Navbar.css';
import { useAuth } from "../Contexts/AuthContext";
import LoginContext from './LoginModal';
import SignIn from '../Components/Register/SignIn';
import { Button } from './Button';
import { useNavigate } from "react-router-dom";


// useEffect(() => {
  //   Navbar();
  // }, []);
function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  // const { authUser } = useAuth();
  // const logout = Logout();
  
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  // const { loginModal, setLoginmodal }= useContext(LoginContext);
//   const  {
//     authUser,
//     setAuthUser,
// } = useAuth();

const [isFetching, setIsFetching] = useState(true);

const navigate = useNavigate();

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  // navigate(0)
  const  {
    authUser,
    setAuthUser,
    isloggedin,
    setIsloggedin
} = useAuth();

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

  console.log(isloggedin, "hi");
  // useEffect(() => {
  //   showButton();
  // }, []);
  // useEffect(() => {
  //   Navbar();
  // }, []);
  window.addEventListener('resize', showButton);

  return (
    // console.log(isloggedin),
    <>
    {/* {authUser!==null? */}
    {isloggedin===true ?
    (<>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo'>
            e-LC
            <i className='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/home' className='nav-links'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/form' className='nav-links'>
                Sell Item
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/profile' className='nav-links'>
                Profile
              </Link>
            </li>
            {/* <li>
              <Link
                to='/'
                className='nav-links'
                onClick={Logout}
              >
                Logout
              </Link>
            </li> */}
          </ul>
          {button && <Logout_Button buttonStyle='btn--outline'> Logout</Logout_Button>}
          {/* {loginModal ? <Modal /> : ""} */}
        </div>
      </nav>
    </>)
      :
      (
      <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            e-LC
            <i className='fab fa-typo3' />
          </Link>
          {/* <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div> */}
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {/* <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li> */}
          </ul>
          <Button
          // className='btns'
          buttonStyle='btn--outline'
          // buttonSize='btn--large'
          path="/signin"
        >
          LOGIN 
        </Button>
          {/* {loginModal ? <SignIn /> : ""} */}
        </div>
      </nav>
    </>)}
    </>
  );
}

export default Navbar;
