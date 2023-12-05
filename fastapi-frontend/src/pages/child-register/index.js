import { React, useEffect, useState } from "react";
import styles from "@/styles/global.module.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";

function childRegister() {
  return (
    <>
      <div id={styles.page}>
        <div className="container mt-5">stuff</div>
        <div className="row">
          <Navbar />
        </div>
        <div className="container mt-5">
          <div className="row mt-5">
            <div className="col-2"></div>
            <div
              id={styles.componentcolor}
              className="col-md-8 border rounded-5 shadow text-center p-3"
            >
              <div className="row">
                <h1>Hello!</h1>
                <p className="text-center">
                  At TinyTrackers, you can enter a Child ID Code to link your
                  account to an existing child profile or register a new child
                  profile.
                </p>
              </div>
                <Link
                    id={styles.textbasefont}
                    style={{ fontSize: "large" }}
                    className="btn btn-lg btn-primary w-30 fs-6"
                    href="/child-code-register"
                >
                    Enter Child ID Code
                </Link>
                <p className="mt-3">or</p>
                <Link 
                    id={styles.textbasefont}
                    style={{ fontSize: "large" }}
                    className="btn btn-lg btn-primary w-30 fs-6" 
                    href="/child-register-form">
                Register new Child
                </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <Footer />
      </div>
    </>
  );
}

export default childRegister;
