import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import styles from "@/styles/global.module.css";
import { useGlobalState } from "@/context/GlobalState";
import { jwtDecode } from "jwt-decode";
import GetUserService from "@/services/getuser.service";
import { useRouter } from "next/router";

function ProfilesPage() {
  const { state } = useGlobalState();
  const [user_id, setUserId] = useState();
  const [user, setUserData] = useState(state.user);
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
          state.user.access_token
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

  // useEffect(() => {
  //   // localStorage.getItem("user")
  //   console.log(state.user)
  // }, [])

  // console.log(state);

  // if (!state.isAuthenticated) {
  //   router.push("../")
  // }

  // useEffect(() => {
  //   console.log(state)
  //   }, [user])

  return (
    <>
      <div id={styles.page}>
        <div className="container my-5">
          <div className="row">
            <Navbar />
          </div>
          <div className="row mt-5">
            <div className="col">
              <div>
                <div className="accordion mt-5 shadow">
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
                        <div id={styles.textbasefont}>{user.username}</div>
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseOne"
                      className="accordion-collapse collapse show"
                    >
                      <div className="accordion-body">
                        <div id={styles.textbasefont}>
                          <ul>
                            <li>Username: {user.username}</li>
                            <li>Email Address: {user.email}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item" id={styles.componentcolor}>
                    <h2 className="accordion-header">
                      <button
                        id={styles.componentcolor}
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseTwo"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseTwo"
                      >
                        <div id={styles.textbasefont}>Child 1 Name here</div>
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseTwo"
                      className="accordion-collapse collapse"
                    >
                      <div id={styles.textbasefont} className="accordion-body">
                        Child 1 profile information here
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item" id={styles.componentcolor}>
                    <h2 className="accordion-header">
                      <button
                        id={styles.componentcolor}
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseThree"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseThree"
                      >
                        <div id={styles.textbasefont}>
                          Child 2 profile (if a child 2 exists)
                        </div>
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseThree"
                      className="accordion-collapse collapse"
                    >
                      <div id={styles.textbasefont} className="accordion-body">
                        Child 2 profile information here
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProfilesPage;
