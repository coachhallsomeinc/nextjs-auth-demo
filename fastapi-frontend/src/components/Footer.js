import React from 'react'
import Image from 'next/image'
import styles from '@/styles/global.module.css';

function Footer() {
  const col3Style = {
      display: 'block', // or 'none' depending on your needs
    };

    const mediaQuery = '@media (max-width: 767px)';
  return (
    <>
    <div className='fixed-bottom'>
    <footer id={styles.componentcolor} className="mt-5 py-3">
      <div className="container">
        <div className="row">
          <div className="col-6">
          <Image src="/img/Asset-3.svg" width={150} height={20}/>
          </div>
          <div id={styles.footertext} className="col-3 text-right">
            <p style={{ fontSize: 'large' }} className="mb-0">Built by Tanner McDaniel</p>
          </div>
          <div className='col-1'>
            <div className='icon-blue'>
                <a href="mailto:tmmcdaniel909@gmail.com"><Image src="/img/envelope-solid.svg" width={25} height={25} /></a>
            </div>
          </div>
          <div className='col-1'>
            <div className='icon-blue'>
                <a target="_blank" href="https://www.linkedin.com/feed/?trk=homepage-basic_sign-in-submit"><Image src="/img/linkedin.svg" width={25} height={25} /></a>
            </div>
          </div>
          <div className='col-1'>
            <div className="icon-blue">
                <a target="_blank" href="https://github.com/Tanner90909"><Image src="/img/square-github.svg" width={25} height={25} /></a>
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