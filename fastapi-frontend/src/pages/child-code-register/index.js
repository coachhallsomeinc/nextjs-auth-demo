import { React, useEffect, useState } from "react";
import styles from "@/styles/global.module.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import ChildService from "@/services/childservice";
import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGlobalState } from "@/context/GlobalState";

function ChildCodeRegister() {
  const router = useRouter();
  const { state, dispatch } = useGlobalState();
  const [child, setChild] = useState("");

  console.log(child);

  const handleChildRegistrationWithCode = async () => {
    try {
      console.log("starting handchildregistrationwithcode");
      console.log(child);
      const data = {
        data: { unique_child_code: child },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + state.user?.access_token,
        },
      };
      console.log(data.data);
      const response = await ChildService.registerChildWithCode(data);
      console.log("Child registration with code response:", response);
      if (response) {
        router.push("/profiles");
      }
    } catch (error) {
      console.error("Error during child code registration:", error.message);
    }
  };

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
              <p>Please enter your child&apos;s Child ID Code</p>
              <input
                required
                type="text"
                onChange={(e) => setChild(e.target.value)}
                className="mt-2 form-control form control-lg bg-light fs-6"
                placeholder="Enter your child's Child ID Code"
              />
              <button
                id={styles.textbasefont}
                style={{ fontSize: "large" }}
                className="btn btn-lg btn-primary w-30 fs-6 mt-3"
                onClick={handleChildRegistrationWithCode}
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
