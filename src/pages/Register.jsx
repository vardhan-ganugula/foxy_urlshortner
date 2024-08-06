import React, { useState } from "react";
import Header from "../components/Header";
import { MdError } from "react-icons/md";
import Alert from "../components/Alert";
import { navlinks } from "../../utils";
import {Link} from 'react-router-dom'

function SignUp() {

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [cpassword, setCpassword] = useState("");
  let [userName, setUsername] = useState("");
  let [proceed, isProceed] = useState(false);
  let [alert, setAlert] = useState({ type: "", data: "", visible: false });

  function checkEmail() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const errEmail = document.querySelector("#email-p");
    if (emailPattern.test(email)) {
      errEmail.classList.remove("flex");
      errEmail.classList.add("hidden");
      isProceed(true);
    } else {
      errEmail.classList.add("flex");
      errEmail.classList.remove("hidden");
      isProceed(false);
    }
  }
  function checkPass() {
    const errPass = document.querySelector("#password-p");

    if (password.length > 6) {
      errPass.classList.remove("flex");
      errPass.classList.add("hidden");
      isProceed(true);
    } else {
      errPass.classList.add("flex");
      errPass.classList.remove("hidden");
      isProceed(false);
    }
  }
  function checkCpass() {
    const errCpass = document.querySelector("#cpassword-p");

    if (password === cpassword) {
      errCpass.classList.remove("flex");
      errCpass.classList.add("hidden");
      isProceed(true);
    } else {
      errCpass.classList.add("flex");
      errCpass.classList.remove("hidden");
      isProceed(false);
    }
  }
  function checkUsername() {
    const errUsername = document.querySelector("#username-p");

    if (userName.length > 6) {
      errUsername.classList.remove("flex");
      errUsername.classList.add("hidden");
      isProceed(true);
    } else {
      errUsername.classList.add("flex");
      errUsername.classList.remove("hidden");
      isProceed(false);
    }
  }
  function handleCreateUser(e) {
    e.preventDefault();
    if (!proceed) {
      if(alert.visible)
            document.querySelector('#alertDiv').style.display = 'flex'
      setAlert({ type: "failed", data: "enter all the fields", visible: true });
      return;
    }
    fetch(import.meta.env.VITE_SERVER + "/auth/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: userName,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.status === 'success'){
          if(alert.visible)
            document.querySelector('#alertDiv').style.display = 'flex'
          setAlert({ type: "success", data: "account created", visible: true });
        }
        else{
          if(alert.visible)
            document.querySelector('#alertDiv').style.display = 'flex'
            setAlert({ type: "failed", data: "failed to crete account", visible: true });
        }
      })
      .catch((err) => {
        console.error(err);
        if(alert.visible)
            document.querySelector('#alertDiv').style.display = 'flex'
        setAlert({ type: "failed", data: "failed to crete account", visible: true });
      });
  }

  return (
    <>
      <Header navlinks={navlinks} />
      <main className="w-full h-[85vh] flex items-center justify-center ">
        {alert.visible && <Alert type={alert.type} data={alert.data} />}
        <div className=" w-[400px] rounded shadow-lg overflow-hidden px-3 py-5">
          <h2 className="w-full py-4 bg-orange-500 text-white text-center text-2xl font-bold">
            Register Form
          </h2>
          <form className="p-4" onSubmit={handleCreateUser}>
            <div className="flex gap-2 flex-col mt-5">
              <label htmlFor="username" className="ml-1 font-semibold">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="px-3 py-2 border-2 border-orange-300 rounded outline-none font-mono"
                placeholder="enter the username"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={checkUsername}
              />
              <p className="text-xs text-red-500 hidden gap-2" id="username-p">
                {" "}
                <MdError size={15} />
                username should atleast 6 char length
              </p>
            </div>

            <div className="flex gap-2 flex-col mt-5 relative">
              <label htmlFor="email" className="ml-1 font-semibold">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="px-3 py-2 border-2 border-orange-300 rounded outline-none font-mono"
                placeholder="name@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onBlur={checkEmail}
              />
              <p className="text-xs text-red-500 gap-2 hidden" id="email-p">
                {" "}
                <MdError size={15} />
                please enter valid email
              </p>
            </div>
            <div className="flex gap-2 flex-col mt-5">
              <label htmlFor="password" className="ml-1 font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="px-3 py-2 border-2 border-orange-300 rounded outline-none font-mono"
                placeholder="enter the password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={checkPass}
              />
              <p className="text-xs text-red-500 hidden gap-2" id="password-p">
                {" "}
                <MdError size={15} />
                please choose a strong password
              </p>
            </div>
            <div className="flex gap-2 flex-col mt-5">
              <label htmlFor="cpassword" className="ml-1 font-semibold">
                Confirm Password
              </label>
              <input
                type="password"
                id="cpassword"
                className="px-3 py-2 border-2 border-orange-300 rounded outline-none font-mono"
                placeholder="enter the password"
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
                onBlur={checkCpass}
              />
              <p className="text-xs text-red-500 hidden gap-2" id="cpassword-p">
                {" "}
                <MdError size={15} />
                password doesn't matches
              </p>
            </div>
            <div className="text-sm mt-3 ml-2">
                Already have an account ? login <Link to={'/login'} className=' decoration-wavy underline decoration-orange-500 underline-offset-2'>here</Link>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded mt-5 font-semibold bg-orange-500 text-white"
            >
              SignIn
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default SignUp;
