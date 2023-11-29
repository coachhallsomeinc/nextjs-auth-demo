import React from 'react'

function Footer() {
  return (
    <>
    <div className='fixed-bottom'>
    <footer className="mt-5 py-3 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <p className="mb-0">TinyTrackers</p>
          </div>
          <div className="col-3 text-right">
            <p className="mb-0">Built by Tanner McDaniel</p>
          </div>
          <div className='col-1'>
            <div>
                <a href="mailto:tmmcdaniel909@gmail.com"><img src="/img/envelope-solid.svg"></img></a>
            </div>
          </div>
          <div className='col-1'>
            <div>
                <a href="https://www.linkedin.com/feed/?trk=homepage-basic_sign-in-submit"><img src="/img/linkedin.svg"></img></a>
            </div>
          </div>
          <div className='col-1'>
            <div>
                <a href="https://github.com/Tanner90909"><img src="/img/square-github.svg"></img></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </div>
    </>
  )
}

export default Footer