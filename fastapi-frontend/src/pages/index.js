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
import Logincontainer from '@/components/login-container';
import ConditionalLoginContainer from '@/components/conditional-login-container';
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
              <Image className='mt-4' src="/img/Asset-2.svg" width={300} height={150}/>
              <p className='mt-5'>Need help keeping track of medications and logging symptoms for your children? Look no further than TinyTrackers!</p>
          </div>
          <div className='col-md-6'>
            {/* log in container */}
            <ConditionalLoginContainer />
          </div>
      </div>
    </div>
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
    <Footer />
  </>
  )
}
