import React from "react";
import Image from "next/image";
import styles from '@/styles/global.module.css';

export default function Navbar() {
  return (
    <>
      <nav id={styles.componentcolor} className="navbar fixed-top">
        <div id={styles.componentcolor} className="container-fluid">
          <a className="navbar-brand" href="../">
          <Image src="/img/Asset-1.svg" width={40} height={40}/>
          </a>
          <a className="navbar-brand" href="../">
          <Image src="/img/Asset-3.svg" width={250} height={40}/>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div id={styles.componentcolor} className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                <Image src="/img/Asset-3.svg" height={30} width={250} />
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div id={styles.componentcolor} className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a style={{ fontSize: 'x-large' }} className="nav-link" aria-current="page" href="/about">
                    About Us
                  </a>
                </li>
                <li className="nav-item">
                  <a style={{ fontSize: 'x-large' }} className="nav-link" href="/additional-resources">
                    Additional Resources
                  </a>
                </li>
                <li className="nav-item">
                  <a style={{ fontSize: 'x-large' }} className="nav-link" href="../">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a style={{ fontSize: 'x-large' }} className="nav-link" aria-current="page" href="/calendar">
                    Calendar
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
