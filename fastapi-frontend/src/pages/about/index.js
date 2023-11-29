import React from 'react'
import Navbar from '@/components/navbar';
import Image from 'next/image';
import Footer from '@/components/Footer';

function about_us() {

  return (
    <>
    <div className='container mt-5'>
      <div className='row'>
        <Navbar />
      </div>
      <div className='row'>
        <div className='col-6'>
          <h1>About Us</h1>
          <p>Blah blah blah about us stuff here</p>
        </div>
        <div className='col-6'>
          <Image className='rounded-5 mt-5' src="/img/baby-at-doctor.jpg" alt="baby at doctor" width={500} height={300}/>
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default about_us