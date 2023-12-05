import { React, useEffect, useState } from "react";
import styles from "@/styles/global.module.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";

function ChildCodeRegister() {
  return (
    <>
      <div id={styles.page}>
        <div className="container mt-5">stuff</div>
        <div className="row">
          <Navbar />
        </div>
        <div className="container mt-5">
          <div className="row mt-5">
            <div className="col-3"></div>
            <div
              id={styles.componentcolor}
              className="col-md-6 border rounded-5 shadow text-center p-3"
            >
              <p>Please enter your child's Child ID Code</p>
              <input
                required
                type="text"
                className="mt-2 form-control form control-lg bg-light fs-6"
                placeholder="Enter your child's Child ID Code"
              />
              <button
              id={styles.textbasefont}
              style={{ fontSize: "large" }}
              className="btn btn-lg btn-primary w-30 fs-6 mt-3"
              >
                Register your Child
              </button>
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

export default ChildCodeRegister;
