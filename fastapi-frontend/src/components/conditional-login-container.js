"use client"
import React, { useState, useEffect } from 'react';
import { useGlobalState } from '../context/GlobalState';
import { useRouter } from 'next/navigation';
import AuthService from '../services/auth.service';
import { jwtDecode } from "jwt-decode";
import Link from 'next/link';

const ConditionalLoginContainer = () => {

  // // show hidden password text
  // const [showInputPassword, setShowInputPassword] = useState(false);
  // const [inputPassword, setInputPassword] = useState('');

  // const handleTogglePassword = () => {
  //   setShowInputPassword(!showInputPassword);
  // };

  const [view, setView] = useState('login');

  const showLogin = () => {
    setView('login');
  };

  const showSignup = () => {
    setView('signup');
  };

  const showForgotPassword = () => {
    setView('forgotPassword');
  };

  const { state, dispatch } = useGlobalState();

  useEffect(() => {
    const getUserFromLocalStorage = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = jwtDecode(userData);
        console.log('User data:', user);
        dispatch({
          type: 'SET_USER',
          payload: user
        });
      }
    };
    getUserFromLocalStorage();
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    dispatch({ type: 'LOGOUT_USER' });
    router.push('/');
    console.log('Logged out')
  };

  // code from justins login screen

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //------------------------------------------------------------------------------------------------------------------------------
  const handleLogin = (e) => {
      e.preventDefault();
      const username = email;
      AuthService
          .login(username, password)
          .then(async (resp) => {
              if(resp != undefined){
                  if (resp.access_token) {
                      //let data = jwtDecode(resp.access_token);
                      let data = jwtDecode(resp.access_token, { header: true });
                      await dispatch({
                          type: 'SET_USER',
                          payload: data,
                      });
                      console.log('Login success');
                      router.push('/');
                  } else {
                      console.log('Login failed');
                      dispatch({ type: 'LOGOUT_USER' });
                  }
              }
          })
          .catch((error) => {
              // Handle the error here
              console.error('An error occurred:', error);
              // Optionally, dispatch a logout or error action
              dispatch({ type: 'LOGOUT_USER' });
          })
          .finally(() => {
              // Code to run regardless of success or failure
              console.log('Login request completed');
          });
        }

  // code from justins registration page
  const [user, setUser] = useState({
    password: "",
    passwordConf: "",
    email: "",
    username: "",
  });
//------------------------------------------------------------------------------------------------------------------------------
  const handleChange = (key, value) => {
    setUser({
      ...user,
      [key]: value,
    });
  };
//------------------------------------------------------------------------------------------------------------------------------
  async function handleRegister(e) {
    e.preventDefault();
    try {
      const resp = await AuthService.register(user);
      
      if (resp.data.access_token) {
        //let data = jwtDecode(resp.access_token);
        let data = jwtDecode(resp.data.access_token, { header: true });
        await dispatch({
            type: 'SET_USER',
            payload: data,
        });
        console.log('Login success');
        router.push('/');
      } else {
          console.log('Login failed');
          dispatch({ type: 'LOGOUT_USER' });
      }
  
    } catch (error) {
      console.error('Registration failed:', error);
    }
  }

  return (
    <>
    <div className='container d-flex justify-content-center min-vh-50'>
      <div className='row border rounded-5 p-3 bg-white shadow box-area'>
        <div className='col-md-12 box'>
          <div className='row align-items-center'>
            <div className='header-text mb-4'>
              {view === 'login' && <p className='mt-2'>Hello</p>}
              {view === 'signup' && <></>}
              {view === 'forgotPassword' && <></>}
              {view === 'login' && <p className='mt-2'>Welcome to TinyTrackers!</p>}
              {view === 'signup' && <p className='mt-2'>Create a New Account</p>}
              {view === 'forgotPassword' && <p className='mt-2'>Forgot Password?</p>}
            </div>
            </div>
            </div>
            {view === 'login' && (
              <><form>
              <div className='input-group mb-3'>
                <input
                  type='text'
                  className='form-control form control-lg bg-light fs-6'
                  placeholder='Email Address'
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className='input-group mb-1'>
                <input
                  type='password'
                  className='form-control form control-lg bg-light fs-6'
                  placeholder='Password'
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </form>
              <div className='input-group mb-3 d-flex justify-content-between'>
                <div className='forgot mt-2 fs-6'>
                  <a href='#' onClick={showForgotPassword}>
                    Forgot Password?
                  </a>
                </div>
                {/* login logout button */}
                <div className='login-button'>
                  {state.user ? (
                  <button className='btn btn-lg btn-primary w-30 fs-6' type = "submit" onClick={handleLogout}>
                    Log Out
                  </button>  
                  ) : (
                  <button className='btn btn-lg btn-primary w-30 fs-6' type = "submit" onClick={handleLogin}>
                    Log In
                  </button>
                  )}
                </div>
              </div></>
            )}
            {view === 'signup' && (
              <>
              <form>
              <div className='mb-3'>
                <input 
                    required 
                    type='text' 
                    className='mt-2 form-control form control-lg bg-light fs-6' 
                    placeholder='Enter Your Name' />
                <input 
                    required 
                    onChange={(e) => {
                      let olduser = user;
                      olduser.email = e.target.value;
                      olduser.username = e.target.value;
                      setUser(olduser);
                    }} 
                    type='text' 
                    className='mt-2 form-control form control-lg bg-light fs-6' 
                    placeholder='Enter Email Address' />
                <input 
                    required 
                    type={showInputPassword ? 'text' : 'password'}
                    // onChange={(e) => setInputPassword(e.target.value)}
                    id='password'
                    onChange={(e) => handleChange("password", e.target.value)} 
                    className='mt-2 form-control form control-lg bg-light fs-6' 
                    placeholder='Enter New Password' />
                <input 
                    required 
                    type='password'
                    id='passwordConf'
                    onChange={(e) => handleChange("passwordConf", e.target.value)} 
                    className='mt-2 form-control form control-lg bg-light fs-6' 
                    placeholder='Confirm New Password' />
                <button
                  className='mt-2 btn btn-lg btn-primary w-30 fs-6'
                  onClick={handleRegister}
                >
                  Sign Up
                </button>
              </div>
              </form>
              </>
            )}
            {view === 'forgotPassword' && (
              <div className='mb-3'>
                <p>Security question 1</p>
                <input type='text' className='mt-2 form-control form control-lg bg-light fs-6' placeholder='Your Answer' />
                <p className='mt-3'>Securtiy question 2</p>
                <input type='text' className='mt-2 form-control form control-lg bg-light fs-6' placeholder='Your Answer' />
                <button
                  className='mt-3 btn btn-lg btn-primary w-30 fs-6'
                  onClick={showLogin}
                >
                  Submit
                </button>
              </div>
            )}
            <div className='row mb-3'>
              <small>
                {view === 'login'
                  ? "Don't have an account? "
                  : 'Already have an account? '}
                <a href='#' onClick={view === 'login' ? showSignup : showLogin}>
                  {view === 'login' ? 'Sign up' : 'Log in'}
                </a>
              </small>
            </div>        
      </div>
    </div>
    </>
  );
};


export default ConditionalLoginContainer;
