"use client"
import React, { useState, useEffect } from 'react';
import { useGlobalState } from '../context/GlobalState';
import { useRouter } from 'next/navigation';
import AuthService from '../services/auth.service';
import { jwtDecode } from "jwt-decode";
import Link from 'next/link';
import styles from '../styles/home.module.css';

function LoginButton() {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogout = () => {
        authService.logout();
        dispatch({ type: 'LOGOUT_USER' });
        router.push('/');
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
    {state.user ? (
        <button
            className='btn btn-lg btn-primary w-30 fs-6'
            type = "submit"
            onClick={handleLogin}
            >
            Log In
        </button>
    ) : (
        <button
            className='btn btn-lg btn-primary w-30 fs-6'
            type = "submit"
            onClick={handleLogout}
            >
            Log out
        </button>
    )}
    </>
  )
}

export default LoginButton