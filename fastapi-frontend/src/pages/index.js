
import React, { useState } from 'react'
import { useGlobalState } from '../context/GlobalState';
import authService from '../services/auth.service';
import { useRouter } from 'next/navigation';
import styles from '../styles/home.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <main className={`${styles.main}`}>

        <div className={styles.grid}>
          <Link href="/login">Login</Link>
        </div>
      </main>
    </>
  )
}
