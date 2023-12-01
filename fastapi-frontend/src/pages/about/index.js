import React from 'react'
import Navbar from '@/components/navbar';
import Image from 'next/image';
import Footer from '@/components/Footer';
import styles from '@/styles/global.module.css';

function about_us() {

  return (
    <>
    <div id={styles.page}>
    <div className='container mt-5'>
      <div className='row'>
        <Navbar />
      </div>
      <div className='row mt-5'>
        <div className='col-6'>
          <h1 id={styles.textbasefont}>About Us</h1>
          <p id={styles.textbasefont}>Blah blah blah about us stuff here</p>
        </div>
        <div className='col-6'>
          <Image className='rounded-5 mt-5' src="/img/baby-at-doctor.jpg" alt="baby at doctor" width={500} height={300}/>
        </div>
      </div>
    </div>
    <Footer />
    </div>
    </>
  )
}

export default about_us