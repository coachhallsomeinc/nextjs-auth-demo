import React, { useState } from 'react';

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

  return (
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
            <div className='input-group mb-3'>
              <input
                type='text'
                className='form-control form control-lg bg-light fs-6'
                placeholder='Email Address'
              />
            </div>
            <div className='input-group mb-1'>
              <input
                type='password'
                className='form-control form control-lg bg-light fs-6'
                placeholder='Password'
              />
            </div>
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
                    onClick={showLogin}
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
  );
};

export default ConditionalLoginContainer;
