import { React, useEffect, useState } from "react";
import styles from "@/styles/global.module.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";

function ChildRegisterForm() {
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
                <p>Please enter the following information to register your child</p>
                <input
                required
                type="text"
                className="mt-2 form-control form control-lg bg-light fs-6"
                placeholder="Enter your child's first name"
                />
                <input
                required
                type="text"
                className="mt-2 form-control form control-lg bg-light fs-6"
                placeholder="Enter your child's last name"
                />
                <input
                required
                type="text"
                className="mt-2 form-control form control-lg bg-light fs-6"
                placeholder="Enter your child's DOB"
                />
                <input
                type="text"
                className="mt-2 form-control form control-lg bg-light fs-6"
                placeholder="Enter any allergies your child has"
                />
                <input
                type="text"
                className="mt-2 form-control form control-lg bg-light fs-6"
                placeholder="Enter your child's pediatrician name"
                />
                <input
                type="text"
                className="mt-2 form-control form control-lg bg-light fs-6"
                placeholder="Enter your child's pediatrician phone number"
                />
                <button
                id={styles.textbasefont}
                style={{ fontSize: "large" }}
                className="btn btn-lg btn-primary w-30 fs-6 mt-3"
                >
                    Register your child
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

export default ChildRegisterForm;
