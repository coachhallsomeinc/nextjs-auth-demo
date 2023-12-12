import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import styles from '@/styles/global.module.css';

function Footer() {
  return (
    <footer id={styles.componentcolor} className="py-3 sticky-bottom">
      <div className="container">
        <div className="row">
          <div className="col-6">
          <Image src="/img/Asset-3.svg" width={150} height={20} alt="image"/>
          </div>
          <div id={styles.footertext} className="col-3 text-right">
            <p style={{ fontSize: 'large' }} className="mb-0">Built by Tanner McDaniel</p>
          </div>
          <div className='col-1'>
            <div>
                <Link href="mailto:tmmcdaniel909@gmail.com"><Image src="/img/envelope-solid.svg" width={25} height={25} alt="image" /></Link>
            </div>
          </div>
          <div className='col-1'>
            <div>
                <Link target="_blank" href="https://www.linkedin.com/in/tanner-mcdaniel-8b9b96171/"><Image alt="image" src="/img/linkedin.svg" width={25} height={25} /></Link>
            </div>
          </div>
          <div className='col-1'>
            <div>
                <Link target="_blank" href="https://github.com/Tanner90909"><Image src="/img/square-github.svg" width={25} height={25} /></Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer