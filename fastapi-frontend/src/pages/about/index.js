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
        <div className="col-md-6 border rounded-5 shadow" id={styles.componentcolor}>
          <div id={styles.abouttext}>
            <h1 className='text-center' id={styles.textbasefont}>About Us</h1>
            <h5 className="mt-3 px-3" id={styles.textbasefont}>At TinyTrackers, we are driven by a passion for simplifying the journey of parenthood. Our mobile-first web app is designed with a focus on functionality and ease, providing parents with a digital companion to effortlessly manage and monitor their children&apos;s health.</h5>
            <h5 className="mt-3 px-3" id={styles.textbasefont}>From medication schedules to symptom tracking, TinyTrackers empowers parents to stay organized and informed. Our commitment to the well-being of your family is reflected in features like secure profiles, customizable event tracking, and seamless export functionality for healthcare professionals. Join us in creating a healthier and happier future for your little ones, one well-documented moment at a time.</h5>
            <div className='row'>
              <Image alt="image" className='mt-5' src="/img/Asset-3.svg" width={20} height={30} />
            </div>
          </div>
        </div>
        <div className='col-md-6 d-flex justify-content-center'>
          <Image className='rounded-5 border shadow' src="/img/baby-at-doctor.jpg" alt="baby at doctor" width={500} height={500}/>
        </div>
      </div>
    </div>
    </div>
    <Footer />
    </>
  )
}

export default about_us