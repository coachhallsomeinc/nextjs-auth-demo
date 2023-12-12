"use client";
import React, { useState, useEffect, use } from "react";
import { useGlobalState } from "../context/GlobalState";
import { useRouter } from "next/navigation";
import AuthService from "../services/auth.service";
import { jwtDecode } from "jwt-decode";
import styles from "@/styles/global.module.css";
import Link from "next/link";
import request from "@/services/api.request";

const ConditionalLoginContainer = () => {
  // show hidden password text
  const [showInputPassword, setShowInputPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowInputPassword(!showInputPassword);
  };

  const [view, setView] = useState("login");

  const showLogin = () => {
    setView("login");
  };

  const showSignup = () => {
    setView("signup");
  };

  // const showForgotPassword = () => {
  //   setView("forgotPassword");
  // };

  const { state, dispatch } = useGlobalState();

  // code from justins registration page
  const [user, setUser] = useState({
    password: "",
    passwordConf: "",
    email: "",
    username: "",
  });

  useEffect(() => {
    const getUserFromLocalStorage = () => {
      const userData = localStorage.getItem("user");
      // console.log(userData)
      if (userData) {
        const user = jwtDecode(userData);
        // console.log("User data:", user);
        dispatch({
          type: "SET_USER",
          payload: user,
        });
      }
    };
    getUserFromLocalStorage();
  }, [dispatch]);

  const handleLogout = () => {
    AuthService.logout();
    dispatch({ type: "LOGOUT_USER" });
    router.push("/");
    console.log("Logged out");
  };

  // code from justins login screen

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //------------------------------------------------------------------------------------------------------------------------------
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(state)
    // const username = email;
    AuthService.login(email, password)
      .then(async (resp) => {
        if (resp != undefined) {
          if (resp.access_token) {
            //let data = jwtDecode(resp.access_token);
            let data = resp;
            await dispatch({
              type: "SET_USER",
              payload: data,
            });
            // localStorage.setItem("user", JSON.stringify(data));
            console.log("Login success");
            router.push("/profiles");
          } else {
            console.log("Login failed " + resp.data.detail);
            await dispatch({ 
              type: "LOGIN_FAILED", 
              payload: resp,
            });
          }
        }
      })
      .catch((error) => {
        // Handle the error here
        console.error("An error occurred:", error);
        // Optionally, dispatch a logout or error action
        dispatch({ type: "LOGOUT_USER" });
      })
      .finally(() => {
        // Code to run regardless of success or failure
        console.log("Login request completed");
      });
  };

  //------------------------------------------------------------------------------------------------------------------------------
  const handleChange = (key, value) => {
    setUser({
      ...user,
      [key]: value,
    });
  };
  //------------------------------------------------------------------------------------------------------------------------------
  async function handleRegister(e) {
    e.preventDefault();
    try {
      const resp = await AuthService.register(user);

      if (resp.data.access_token) {
        //let data = jwtDecode(resp.access_token);
        let data = resp.data;
        await dispatch({
          type: "SET_USER",
          payload: data,
        });
        // localStorage.setItem("user", JSON.stringify(resp.data));
        // localStorage.setItem("access_token", resp.data.access_token)
        console.log("Login success");
        router.push("/child-register");
      } else {
        console.log("Login failed");
        dispatch({ type: "LOGOUT_USER" });
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }

  // console.log(user);

  return (
    <>
      <div
        id={styles.componentcolor}
        className="container shadow border rounded-5 d-flex justify-content-center min-vh-50"
      >
        <div className="row p-3  box-area">
          <div className="col-md-12 box">
            <div className="row align-items-center">
              <div className="header-text mb-4">
                {view === "login" && (
                  <p
                    id={styles.textbasefont}
                    style={{ fontSize: "large" }}
                    className="mt-2"
                  >
                    Hello
                  </p>
                )}
                {view === "signup" && <></>}
                {/* {view === "forgotPassword" && <></>} */}
                {view === "login" && (
                  <p
                    id={styles.textbasefont}
                    style={{ fontSize: "large" }}
                    className="mt-2"
                  >
                    Welcome to TinyTrackers!
                  </p>
                )}
                {view === "signup" && (
                  <p
                    id={styles.textbasefont}
                    style={{ fontSize: "large" }}
                    className="mt-2"
                  >
                    Create a New Account
                  </p>
                )}
                {/* {view === "forgotPassword" && (
                  <p
                    id={styles.textbasefont}
                    style={{ fontSize: "large" }}
                    className="mt-2"
                  >
                    Forgot Password?
                  </p>
                )}  */}
              </div>
            </div>
          </div>
          {view === "login" && (
            <>
              <form>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control form control-lg bg-light fs-6"
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group mb-1">
                  <input
                    type={showInputPassword ? "text" : "password"}
                    className="form-control form control-lg bg-light fs-6"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleTogglePassword}
                  >
                    {showInputPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </form>
              <div className="input-group mb-3 d-flex justify-content-between">
                {/* <div className="forgot mt-2 fs-6">
                  <Link
                    id={styles.textbasefont}
                    style={{ fontSize: "large" }}
                    href="#"
                    onClick={showForgotPassword}
                  >
                    Forgot Password?
                  </Link>
                </div> */}
                {/* login logout button */}
                <div className="login-button">
                  {state.user ? (
                    <button
                      id={styles.textbasefont}
                      style={{ fontSize: "large" }}
                      className="btn btn-lg btn-primary w-30 fs-6"
                      type="submit"
                      onClick={handleLogout}
                    >
                      Log Out
                    </button>
                  ) : (
                    <button
                      id={styles.textbasefont}
                      style={{ fontSize: "large" }}
                      className="btn btn-lg btn-primary w-30 fs-6"
                      type="submit"
                      onClick={handleLogin}
                    >
                      Log In
                    </button> 
                  )}
                </div>
                <span className="text-danger">{state?.user?.isError}</span>
              </div>
            </>
          )}
          {view === "signup" && (
            <>
              <form>
                <div className="mb-3">
                  <input
                    required
                    onChange={(e) => {
                      let olduser = user;
                      olduser.username = e.target.value;
                      setUser(olduser);
                    }}
                    type="text"
                    className="mt-2 form-control form control-lg bg-light fs-6"
                    placeholder="Enter Your Name"
                  />
                  <input
                    required
                    onChange={(e) => {
                      let olduser = user;
                      olduser.email = e.target.value;
                      setUser(olduser);
                    }}
                    type="text"
                    className="mt-2 form-control form control-lg bg-light fs-6"
                    placeholder="Enter Email Address"
                  />
                  <div className="input-group">
                    <input
                      type={showInputPassword ? "text" : "password"}
                      id="password"
                      onChange={(e) => handleChange("password", e.target.value)}
                      className="mt-2 form-control form control-lg bg-light fs-6"
                      placeholder="Enter New Password"
                      required
                    />
                      <button
                        className="mt-2 btn btn-outline-secondary"
                        type="button"
                        onClick={handleTogglePassword}
                      >
                        {showInputPassword ? "Hide" : "Show"}
                      </button>
                  </div>

                  <div className="input-group">
                    <input
                      type={showInputPassword ? "text" : "password"}
                      id="passwordConf"
                      onChange={(e) =>
                        handleChange("passwordConf", e.target.value)
                      }
                      className="mt-2 form-control form control-lg bg-light fs-6"
                      placeholder="Confirm New Password"
                      required
                    />
                      <button
                        className="mt-2 btn btn-outline-secondary"
                        type="button"
                        onClick={handleTogglePassword}
                      >
                        {showInputPassword ? "Hide" : "Show"}
                      </button>
                  </div>
                  <button
                    id={styles.textbasefont}
                    style={{ fontSize: "large" }}
                    className="mt-2 btn btn-lg btn-primary w-30 fs-6"
                    onClick={handleRegister}
                    // {(user.password !== user.passwordConf) && disabled}
                    disabled={user.password !== user.passwordConf}
                  >
                    Sign Up
                  </button>
                </div>
                <span className="text-danger">{user.password !== user.passwordConf && "Password's do not match"}</span>
              </form>
            </>
          )}
          {/* {view === "forgotPassword" && (
            <div className="mb-3">
              <p id={styles.textbasefont} style={{ fontSize: "large" }}>
                Security question 1
              </p>
              <input
                type="text"
                className="mt-2 form-control form control-lg bg-light fs-6"
                placeholder="Your Answer"
              />
              <p
                id={styles.textbasefont}
                style={{ fontSize: "large" }}
                className="mt-3"
              >
                Securtiy question 2
              </p>
              <input
                type="text"
                className="mt-2 form-control form control-lg bg-light fs-6"
                placeholder="Your Answer"
              />
              <button
                id={styles.textbasefont}
                className="mt-3 btn btn-lg btn-primary w-30 fs-6"
                onClick={showLogin}
              >
                Submit
              </button>
            </div>
          )} */}
          <div className="row mb-3">
            <small id={styles.textbasefont}>
              {view === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <Link
                href="#"
                onClick={view === "login" ? showSignup : showLogin}
              >
                {view === "login" ? "Sign up" : "Log in"}
              </Link>
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConditionalLoginContainer;
