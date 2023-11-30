import React from 'react'

function Logincontainer() {
  return (
    <>
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
    </>
  )
}

export default Logincontainer