import React, { useState } from "react";
import Header from "../components/Header";
import { MdError } from "react-icons/md";
import Alert from "../components/Alert";
function ForgotPassword() {
  const navlinks = [
    {
      'name': "Home",
      'link': "/"
    },
    {
      'name': "About",
      'link': "/about"
    },
    {
      'name': "Signup",
      'link': "/signup"
    }
  ]
  let [email, setEmail] = useState("");
  let [proceed, isProceed] = useState(false);
  let [alert, setAlert] = useState({ type: "", data: "", visible: false });
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
      isProceed(false);
    }
  }
  function handleReset(e) {
    e.preventDefault();
    if (!(email && proceed)) {
      if (alert.visible)
        document.querySelector("#alertDiv").style.display = "flex";
      setAlert({
        visible: true,
        data: "Enter the email address",
        type: "error",
      });
    }
    fetch(import.meta.env.VITE_SERVER + "/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      })})
        .then((res) => res.json())
        .then((data) => {
            if(data.status === 'success'){
                if (alert.visible)
                    document.querySelector("#alertDiv").style.display = "flex";
                setAlert({
                    visible: true,
                    data: "Email sent successfully",
                    type: "success",
                  });
            }else{
                if (alert.visible)
                    document.querySelector("#alertDiv").style.display = "flex";
                setAlert({
                    visible: true,
                    data: data.msg,
                    type: "error",
                  });
            }
        })
        .catch((err) => console.error(err))
    
  }
  return (
    <>
      <Header navlinks={navlinks} />
      <main className="w-full h-[85vh] flex items-center justify-center">
        {alert.visible && <Alert type={alert.type} data={alert.data} />}

        <div className=" w-[400px] rounded shadow-lg overflow-hidden ">
          <h2 className="w-full py-4 bg-orange-500 text-white text-center text-2xl font-bold">
            Reset Password
          </h2>
          <form className="p-4" onSubmit={handleReset}>
            <div className="flex gap-2 flex-col mt-5 relative">
              <label htmlFor="email" className="ml-1 font-semibold">
                Email Address
              </label>
              <input
                required
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

export default ForgotPassword;
