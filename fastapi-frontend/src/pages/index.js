"use client"
import React, { useState, useEffect } from 'react'
import { useGlobalState } from '../context/GlobalState';
import { useRouter } from 'next/navigation';
import authService from '../services/auth.service';
import { jwtDecode } from "jwt-decode";
import Link from 'next/link';
import styles from '@/styles/global.module.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import ConditionalLoginContainer from '@/components/conditional-login-container';
import CarouselHomepage from '@/components/carousel-homepage';
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
  <div id={styles.page}>
    <div className="container mt-5">
      <div className='row'>
        <Navbar />
      </div>
      <div className="row mt-5">
          <div id={styles.componentcolor} className="col-md-6 text-center border rounded-5 shadow">
              <Image className='mt-4' src="/img/Asset-2.svg" width={300} height={150}/>
              <p style={{ fontSize: 'larger' }} id={styles.textbasefont} className='mt-5'>Need help keeping track of medications and logging symptoms for your children? Look no further than TinyTrackers!</p>
          </div>
          <div className='col-md-6'>
            {/* log in container */}
            <ConditionalLoginContainer />
          </div>
      </div>
    </div>
    <Image src="/img/carousel-1-doctor.jpg" className="d-flex mx-auto rounded-5 my-5 border shadow" height={720} width={720} alt="..." />
    <Footer />
    </div>
  </>
  )
}
