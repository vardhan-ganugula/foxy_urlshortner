import React, { useState } from "react";
import { MdError } from "react-icons/md";
import { useParams } from "react-router-dom";
function ResetPassword() {
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
  let [password, setPassword] = useState("");
  let [cpassword, setCpassword] = useState("");
  let { id } = useParams();
  let [proceed, isProceed] = useState(false);
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

  function handleSetPassword(e) {
    e.preventDefault();

    if (proceed && password && cpassword) {
      fetch(import.meta.env.VITE_SERVER + "/auth/reset-password/" + id, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            if(data.status === 'success'){
                alert('password set successfully')
            }else{
                alert(data.msg)
            }
        })
        .catch((err) => {
          alert('failed to reset password');
          console.error(err);
        });
    }
  }
  return (
    <main className="w-full h-[85vh] flex items-center justify-center">
      <div className=" w-[400px] rounded shadow-lg overflow-hidden ">
        <h2 className="w-full py-4 bg-orange-500 text-white text-center text-2xl font-bold">
          Reset Password
        </h2>
        <form className="p-4" onSubmit={handleSetPassword}>
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

          <button
            type="submit"
            className="w-full py-3 rounded mt-5 font-semibold bg-orange-500 text-white"
          >
            SignIn
          </button>
        </form>
      </div>
    </main>
  );
}

export default ResetPassword;
