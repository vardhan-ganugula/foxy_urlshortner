import React, { useState } from "react";
import Header from "../components/Header";
import { MdError } from "react-icons/md";
import Alert from "../components/Alert";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";



function Login() {

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [alert, setAlert] = useState({ type: "", data: "", visible: false });
  let [proceed, isProceed] = useState(false);
  let cookie = new Cookies();
  let navigate = useNavigate()
  function checkEmail() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const errEmail = document.querySelector("#email-p");
    if (emailPattern.test(email)) {
      errEmail.classList.remove("flex");
      errEmail.classList.add("hidden");
      proceed = true;
    } else {
      errEmail.classList.add("flex");
      errEmail.classList.remove("hidden");
      isProceed(false)
    }
  }
  function checkPass() {
    const errPass = document.querySelector("#password-p");

    if (password.length > 6) {
      errPass.classList.remove("flex");
      errPass.classList.add("hidden");
      isProceed(true)
    } else {
      errPass.classList.add("flex");
      errPass.classList.remove("hidden");
      isProceed(false)
    }
  }

  function handleLogin(e) {
    e.preventDefault();
    if (!proceed ||  !email || !password) {
      if (alert.visible)
        document.querySelector("#alertDiv").style.display = "flex";
      setAlert({ visible: true, data: "fill all the fileds", type: "error" });
      return;
    } else {
      fetch(import.meta.env.VITE_SERVER + "/dashboard/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if (data.status === "success") {
            if (alert.visible)
              document.querySelector("#alertDiv").style.display = "flex";
            setAlert({ type: "success", data: "Login success", visible: true });


          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + 1);
          cookie.set('token', data.token, { expires: expiryDate });
          cookie.set('userId' , data.userId, { expires: expiryDate });

          navigate('/dashboard')
          } else {
            if (alert.visible)
              document.querySelector("#alertDiv").style.display = "flex";
            setAlert({ type: "failed", data: data.msg, visible: true });
          }
        })
        .catch((err) => {
          console.error(err);
          if (alert.visible)
            document.querySelector("#alertDiv").style.display = "flex";
          setAlert({ type: "failed", data: "Login failed", visible: true });
        });
    }
  }

  return (
    <>
      <Header />
      <main className="w-full h-[85vh] flex items-center justify-center">
        {alert.visible && <Alert type={alert.type} data={alert.data} />}

        <div className=" w-[400px] rounded shadow-lg overflow-hidden ">
          <h2 className="w-full py-4 bg-orange-500 text-white text-center text-2xl font-bold">
            Login Form
          </h2>
          <form className="p-4" onSubmit={handleLogin}>
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
            <button
              type="submit"
              className="w-full py-3 rounded mt-5 font-semibold bg-orange-500 text-white"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default Login;
