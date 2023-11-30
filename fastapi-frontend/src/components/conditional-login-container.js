"use client"
import React, { useState, useEffect } from 'react';
import { useGlobalState } from '../context/GlobalState';
import { useRouter } from 'next/navigation';
import AuthService from '../services/auth.service';
import { jwtDecode } from "jwt-decode";
import Link from 'next/link';
import styles from '../styles/home.module.css';

const ConditionalLoginContainer = () => {
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

  // code from justins login button which takes you to the login screen he built

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
    authService.logout();
    dispatch({ type: 'LOGOUT_USER' });
    router.push('/');
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

  return (
    <>
    <div className='container d-flex justify-content-center min-vh-50'>
      <div className='row border rounded-5 p-3 bg-white shadow box-area'>
        <div className='col-md-12 box'>
          <div className='row align-items-center'>
            <div className='header-text mb-4'>
              <p>Hello!</p>
              {view === 'login' && <p>Welcome to TinyTrackers!</p>}
              {view === 'signup' && <p>Create a New Account</p>}
              {view === 'forgotPassword' && <p>Forgot Password?</p>}
            </div>
            <form>
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
            {view === 'login' && (
              <div className='input-group mb-3 d-flex justify-content-between'>
                <div className='forgot mt-2 fs-6'>
                  <a href='#' onClick={showForgotPassword}>
                    Forgot Password?
                  </a>
                </div>
                <div className='login-button'>
                  <button
                    className='btn btn-lg btn-primary w-30 fs-6'
                    type = "submit"
                    onClick={handleLogin}
                    // onClick={showLogin}
                  >
                    Log In
                  </button>
                </div>
              </div>
            )}
            {view === 'signup' && (
              <div className='input-group mb-3 d-flex justify-content-between'>
                {/* Additional registration fields go here */}
                <button
                  className='btn btn-lg btn-primary w-30 fs-6'
                  onClick={showSignup}
                >
                  Sign Up
                </button>
              </div>
            )}
            {view === 'forgotPassword' && (
              <div className='input-group mb-3 d-flex justify-content-between'>
                {/* Fields for security questions and answers go here */}
                <button
                  className='btn btn-lg btn-primary w-30 fs-6'
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
      </div>
    </div>
    <div>

      {/* justins login */}
      <main className={`${styles.main}`}>
        <div className={styles.grid}>
          {state.user ? (
              <li className="nav-item">
                <Link href="/" className={styles.logout} onClick={handleLogout}>Logout</Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link href="/login">Login</Link>
              </li>
            )}
        </div>
      </main>
    </div>
    </>
  );
};


export default ConditionalLoginContainer;
