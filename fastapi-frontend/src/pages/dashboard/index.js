import Link from "next/link";
import DataService from "@/services/data.service";
import { useGlobalState } from "@/context/GlobalState";
import React, { useState, useEffect } from "react";

import {
  WS_URL
} from '@/services/auth.constants';

export default function DashboardPage() {
  const [localState, setLocalState] =  useState({});
  const [messages, setMessages] =  useState([]);
  const [prompt, setPrompt] =  useState("");
  const {state, dispatch} = useGlobalState();
  const [ws, setWS] = useState(new WebSocket(WS_URL + "/12345"));
  const [t, setToggle] = useState(false);

  useEffect(() => {
    // if(state.user != null){
    //   DataService
    //     .getData({
    //       data: "hello",
    //       headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //         "Authorization":"Bearer " + state.user.access_token
    //       }
    //     })
    //     .then(async (resp) => {
    //         if(resp != undefined){
    //             setLocalState(resp)
    //             await dispatchEvent({
    //               type: 'GET_DATA_COMPLETED',
    //               payload: resp,
    //             });
    //         }
    //     })
    //     .catch((error) => {
    //         // Handle the error here
    //         console.error('An error occurred:', error);
    //     })
    //     .finally(() => {
    //         // Code to run regardless of success or failure
    //         console.log('Send Data request completed');
    //     });
    //   }
  }, []);

  ws.onopen = function(event) {
    ws.send("Hello Server!");
  };

  ws.onmessage = function(event) {
    console.log("Message: " + event.data);
    let m = [];
    if(messages.length > 0){
      m = messages;
    }
    m.push(event.data);
    setMessages(m);
    setToggle(!t)
  };

  const sendMessage = (e) => {
    e.preventDefault();
    let m = prompt;
    ws.send(m);
  }

  const promptChange = (e) => {
    setPrompt(e.target.value);
  }

  useEffect(() => {
    const getUserFromLocalStorage = () => {
      const data = localStorage.getItem('user');
      //const data = jwtDecode(data);
      if (data) {
        console.log('User data:', data);
        dispatch({
          type: 'SET_USER',
          payload: data
        });
      }
    };
    getUserFromLocalStorage();
  }, []);

  const handleLogout = () => {
    authService.logout();
    dispatch({ type: 'LOGOUT_USER' });
    router.push('/login');
  };
  useEffect((e) => {
    console.log(t);
  }, [t]);

  return (
  <div>
    <h1>Dashboard</h1>
    {state.user ? (
      <div>
        <div>
          <input onChange={promptChange} type="text" id="messageText" autocomplete="off"/>
          <button onClick={sendMessage}>Send</button>

          <div>
            <ul>
            {
              messages ? (
                messages.map((item, i) => {
                  return <li key={i}>{item}</li>
                })
              ) : ( <li>Send a message</li>)
            }
            </ul>
          </div>
        </div>
        <ul>
          <li className="nav-item">
            <Link href="/" onClick={handleLogout}>Logout</Link>
          </li>
        </ul>
        
      </div>
    ) : (
      <ul>
        <li className="nav-item">
          <Link href="/login">Login</Link>
        </li>
      </ul>
    )}
  </div>
  )
}
