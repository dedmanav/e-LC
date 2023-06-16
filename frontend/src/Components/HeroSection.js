import React from 'react';
import '../App.css';
import {Login_Button} from './Login_Button';
import { Logout_Button } from './Logout_Button';
import { Button } from './Button';
import './HeroSection.css';
import { useAuth } from "../Contexts/AuthContext";

function HeroSection() {
  const  {
    authUser,
    setAuthUser,
    isloggedin,
    setIsloggedin
} = useAuth();
console.log(isloggedin);
  return (
    <div className='hero-container'>
      <video src='/videos/cash.mp4' autoPlay loop muted />
      <h1>e-LC</h1>
      <h3 style={{color: "white"}}>Your Limbdi Corner Digitalised!!</h3>
      <p>Get Started!</p>

        <div className='hero-btns'>
          
        {/* <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          path = "/profile"
        >
          LOGIN   <i class='fas fa-school' />
        </Button>  */}
        {isloggedin ?
    (<>
      <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          path = "/home"
        >
          ENTER   <i class='fas fa-arrow-right' />
        </Button> 
    </>)
    :
    (<>
      <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          path = "/signin"
        >
          LOGIN   <i class='fas fa-school' />
        </Button> 
    </>)}

      </div>


  
        
    </div>
  );
}

export default HeroSection;
