import { React, useEffect, useState } from "react";
import styles from "@/styles/global.module.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import ChildService from "@/services/childservice";
import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGlobalState } from "@/context/GlobalState";

const ChildRegisterForm = () => {
  const { state, dispatch } = useGlobalState();
  const router = useRouter();
  const [child, setChild] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    allergies: "",
    pediatricianName: "",
    pediatricianPhoneNumber: "",
  });

  const handleChildRegistration = async () => {
    try {
      // const accessToken = localStorage.getItem("access_token");
      // console.log(accessToken);

      const childData = {
        child_first_name: child?.firstName || "str",
        child_last_name: child?.lastName || "str",
        child_dob: child?.dob || "str",
        child_allergies: child?.allergies || "str",
        child_pediatrician_name: child?.pediatricianName || "str",
        child_pediatrician_phone_number:
          child?.pediatricianPhoneNumber || "str",
      };

      const data = {
        data: childData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + state.user?.access_token,
        },
      };

      console.log(state);
      console.log(data);

      const response = await ChildService.registerChild(data);
      // const response = await ChildService.registerChild(accessToken, childData);
      console.log("Child registration response:", response);
      if (response) {
        router.push("/profiles");
      }
    } catch (error) {
      console.error("Error during child registration:", error.message);
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
            <div className="col-2"></div>
            <div
              id={styles.componentcolor}
              className="col-md-8 border rounded-5 shadow text-center p-3"
            >
              <p>
                Please enter the following information to register your child
              </p>
              <input
                required
                type="text"
                className="mt-2 form-control form control-lg bg-light fs-6"
                placeholder="Enter your child's first name"
                value={child.firstName}
                onChange={(e) =>
                  setChild({ ...child, firstName: e.target.value })
                }
              />
              <input
                required
                type="text"
                className="mt-2 form-control form control-lg bg-light fs-6"
                placeholder="Enter your child's last name"
                value={child.lastName}
                onChange={(e) =>
                  setChild({ ...child, lastName: e.target.value })
                }
              />
              <input
                required
                type="text"
                className="mt-2 form-control form control-lg bg-light fs-6"
                placeholder="Enter your child's DOB"
                value={child.dob}
                onChange={(e) => setChild({ ...child, dob: e.target.value })}
              />
              <input
                type="text"
                className="mt-2 form-control form control-lg bg-light fs-6"
                placeholder="Enter any allergies your child has"
                value={child.allergies}
                onChange={(e) =>
                  setChild({ ...child, allergies: e.target.value })
                }
              />
              <input
                type="text"
                className="mt-2 form-control form control-lg bg-light fs-6"
                placeholder="Enter your child's pediatrician name"
                value={child.pediatricianName}
                onChange={(e) =>
                  setChild({ ...child, pediatricianName: e.target.value })
                }
              />
              <input
                type="text"
                className="mt-2 form-control form control-lg bg-light fs-6"
                placeholder="Enter your child's pediatrician phone number"
                value={child.pediatricianPhoneNumber}
                onChange={(e) =>
                  setChild({
                    ...child,
                    pediatricianPhoneNumber: e.target.value,
                  })
                }
              />
              <button
                id={styles.textbasefont}
                style={{ fontSize: "large" }}
                className="btn btn-lg btn-primary w-30 fs-6 mt-3"
                onClick={handleChildRegistration}
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
};

export default ChildRegisterForm;
