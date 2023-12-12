import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import styles from "@/styles/global.module.css";
import { useGlobalState } from "@/context/GlobalState";
import { jwtDecode } from "jwt-decode";
import GetUserService from "@/services/getuser.service";
import ChildService from "@/services/childservice";
import { useRouter } from "next/router";

function ProfilesPage() {
  const { state } = useGlobalState();
  const [user_id, setUserId] = useState();
  const [user, setUserData] = useState(state.user);
  const [childToRender, setChildToRender] = useState([]);
  const router = useRouter();

  useEffect(() => {
    let num = 0;
    if (state.user) {
      num = state.user.user_id;
      // console.log(state.user)
    } else {
      // get from local, set the user_id to #
      const u = JSON.parse(localStorage.getItem("user"));
      num = u.user_id;
    }
    if (num == 0) {
      // redirect back to login
      router.push("../");
    } else {
      setUserId(num);
    }
  }, []);

  useEffect(() => {
    if (user_id != 0) {
      const getUser = async () => {
        console.log(state);
        let response = await GetUserService.getUserData(
          user_id,
          state.user?.access_token
        );
        console.log(response);
        setUserData(response.data);
        // dispatch response.data here
        console.log(state.user);
      };
      getUser() // make sure to catch any error
        .catch(console.error);
    }
  }, [user_id]);

  const data = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + state.user?.access_token,
    },
  };

  useEffect(() => {
    const data = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + state.user?.access_token,
      },
    };
    ChildService.getChildData(data).then((result) => {
      setChildToRender(result);
    });
  }, []);

  // console.log(childData)

  return (
    <>
      <div id={styles.page}>
        <div className="container my-5">
          <div className="row">
            <Navbar />
          </div>

          <div className="row mt-1">
            <div className="col-2"></div>
            <div className="col-8">
              <div className="text-center">
              <h1 className="mt-5" id={styles.textbasefont}>
                Family Profiles
              </h1>
              </div>
              <div>
                <div className="accordion-container">
                <div className="accordion mt-5 shadow rounded-5">
                  <div className="accordion-item" id={styles.componentcolor}>
                    <h2 className="accordion-header">
                      <button
                        id={styles.componentcolor}
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseOne"
                        aria-expanded="true"
                        aria-controls="panelsStayOpen-collapseOne"
                      >
                        <div id={styles.textbasefont}>{user?.username}</div>
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseOne"
                      className="accordion-collapse collapse show"
                    >
                      <div className="accordion-body">
                        <div id={styles.textbasefont}>
                          <ul>
                            <li>Username: {user?.username}</li>
                            <li>Email Address: {user?.email}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {childToRender.map((child) => {
                    return (
                      <div
                        key={child.unique_child_code}
                        className="accordion-item"
                        id={styles.componentcolor}
                      >
                        <h2 className="accordion-header">
                          <button
                            id={styles.componentcolor}
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#panelsStayOpen-collapse${child.unique_child_code}`}
                            aria-expanded="false"
                            aria-controls={`panelsStayOpen-collapse${child.unique_child_code}`}
                          >
                            <div id={styles.textbasefont}>
                              {child.first_name}
                            </div>
                          </button>
                        </h2>
                        <div
                          id={`panelsStayOpen-collapse${child.unique_child_code}`}
                          className="accordion-collapse collapse"
                        >
                          <div
                            id={styles.textbasefont}
                            className="accordion-body"
                          >
                            <ul>
                              <li>First Name: {child.first_name}</li>
                              <li>Last Name: {child.last_name}</li>
                              <li>
                                Unique Child Code: {child.unique_child_code}
                              </li>
                              <li>Date of Birth: {child.dob}</li>
                              <li>Allergies: {child.allergies}</li>
                              <li>
                                Pediatrician Name: {child.pediatrician_name}
                              </li>
                              <li>
                                Pediatrician Phone Number:{" "}
                                {child.pediatrician_number}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                </div>
              </div>
              <div className="row">
              <div className="col-3"></div>
              <div
                className="col-6 py-3 mt-5 text-center border rounded-5 shadow"
                id={styles.componentcolor}
              >
                <h5 id={styles.textbasefont}>
                  Want to add a new child to your family?
                </h5>
                <Link
                  id={styles.textbasefont}
                  style={{ fontSize: "large" }}
                  className="btn btn-lg btn-primary w-30 fs-6"
                  href="/child-code-register"
                >
                  Enter Child ID Code
                </Link>
                <Link
                  id={styles.textbasefont}
                  style={{ fontSize: "large" }}
                  className="mx-3 btn btn-lg btn-primary w-30 fs-6"
                  href="/child-register-form"
                >
                  Register new Child
                </Link>
              </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProfilesPage;
