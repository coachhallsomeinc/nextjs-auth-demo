"use client"
import React, { useState, useEffect } from 'react'
import { useGlobalState } from '../context/GlobalState';
import { useRouter } from 'next/navigation';
import authService from '../services/auth.service';
import { jwtDecode } from "jwt-decode";
import Link from 'next/link';
import styles from '../styles/home.module.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.css';


export default function Home() {

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

  return (
  <>
    <div className="container mt-5">
      <div className='row'>
        <Navbar />
      </div>
      <div className="row mt-5">
          <div className="col-md-6 text-center border rounded-5 shadow">
              <Image className='mt-4' src="/img/Asset-2.svg" width={300} height={85}/>
              <p className='mt-4'>Need help keeping track of medications and logging symptoms for your children? Look no further than TinyTrackers!</p>
          </div>
          <div className='col-md-6'>
            {/* log in container */}
            <div className='container d-flex justify-content-center min-vh-50'> 
              <div className='row border rounded-5 p-3 bg-white shadow box-area'>
                <div className='col-md-12 box'>
                  <div className='row align-items-center'>
                    <div className='header-text mb-4'>
                      <p>Hello!</p>
                      <p>Welcome to TinyTrackers!</p>
                    </div>
                    <div className='input-group mb-3'>
                      <input type="text" className='form-control form control-lg bg-light fs-6' placeholder='Email Address'></input>
                    </div>
                    <div className='input-group mb-1'>
                      <input type="password" className='form-control form control-lg bg-light fs-6' placeholder='Password'></input>
                    </div>
                    <div className='input-group mb-3 d-flex justify-content-between'>
                      <div className='forgot mt-2 fs-6'>
                        <a href='#'>Forgot Password?</a>
                      </div>
                      <div className='login-button'>
                        <button className='btn btn-lg btn-primary w-30 fs-6'>Log In</button>
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <small>Don't have account? <a href='#'>Sign up</a></small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
    {/* <main className={`${styles.main}`}>
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
      </main> */}
      <Footer />
  </>
  )
}
