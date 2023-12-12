import React from "react";
import Image from "next/image";
import { useGlobalState } from "@/context/GlobalState";
import AuthService from "../services/auth.service";
import styles from "@/styles/global.module.css";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.css";

export default function Navbar() {
  const { state, dispatch } = useGlobalState();

  const handleLogout = () => {
    AuthService.logout();
    dispatch({ type: "LOGOUT_USER" });
    console.log("Logged out");
    router.push("../");
  };
  return (
    <>
      <nav id={styles.componentcolor} className="navbar fixed-top">
        <div id={styles.componentcolor} className="container-fluid">
          <Link className="navbar-brand" href="../">
            <Image alt="image" src="/img/Asset-1.svg" width={40} height={40} />
          </Link>
          <Link className="navbar-brand" href="../">
            <Image alt="image" src="/img/Asset-3.svg" width={250} height={40} />
          </Link>
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
                <Image alt="image" src="/img/Asset-3.svg" height={30} width={250} />
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
                <li className="nav-item" data-bs-dismiss="offcanvas">
                  <Link
                    id={styles.textbasefont}
                    style={{ fontSize: "x-large" }}
                    className="nav-link"
                    aria-current="page"
                    href="/about"
                  >
                    About Us
                  </Link>
                </li>
                <li className="nav-item" data-bs-dismiss="offcanvas">
                  <Link
                    id={styles.textbasefont}
                    style={{ fontSize: "x-large" }}
                    className="nav-link"
                    href="/additional-resources"
                  >
                    Additional Resources
                  </Link>
                </li>
                {state.user ? (
                  <>
                    <li className="nav-item" data-bs-dismiss="offcanvas">
                      <Link
                        id={styles.textbasefont}
                        style={{ fontSize: "x-large" }}
                        className="nav-link"
                        aria-current="page"
                        href="/calendar"
                      >
                        Calendar
                      </Link>
                    </li>
                    <li className="nav-item" data-bs-dismiss="offcanvas">
                      <Link 
                        id={styles.textbasefont}
                        style={{ fontSize: "x-large" }}
                        className="nav-link"
                        aria-current="page"
                        href="/profiles"
                      >
                        Profiles
                      </Link>
                    </li>
                    <li className="nav-item" data-bs-dismiss="offcanvas">
                      <Link 
                        id={styles.textbasefont}
                        style={{ fontSize: "x-large" }}
                        className="nav-link"
                        href="../"
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="nav-item" data-bs-dismiss="offcanvas">
                    <Link
                      id={styles.textbasefont}
                      style={{ fontSize: "x-large" }}
                      className="nav-link"
                      href="../"
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
