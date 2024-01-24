import React, { useState } from "react";
import "./css-fragments/auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Auth() {
  const [register, setRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const toggleForm = () => {
    setRegister(!register);
  };

  return (
    <>
      <section>
        <div className={`container ${register ? "active" : ""}`}>
          <Login
            toggleForm={toggleForm}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
          <Register
            toggleForm={toggleForm}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </div>
      </section>
    </>
  );
}

// Login form component
const Login = ({
  toggleForm,
  username,
  password,
  setUsername,
  setPassword,
}) => {
  
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const onSubmition = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });
      if (response.data.message) {
        alert(response.data.message);
      } else {
        setCookies("access_token", response.data.token);
        window.localStorage.setItem("userID", response.data.userID);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="user signinBx">
        <div className="formBx">
          <form action="" id="login" onSubmit={(event) => onSubmition(event)}>
            <h2>Login</h2>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
              required="required"
            />
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              required="required"
            />
            <button type="submit">Login</button>
            <p className="signup">
              Don't have an account ?
              <span onClick={toggleForm}> REGISTER </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

// Registration form component
const Register = ({
  toggleForm,
  username,
  password,
  setUsername,
  setPassword,
}) => {
  const [confirmedpassword, setConfirmedPassword] = useState("");

  const navigate = useNavigate();

  const onSubmition = async (event) => {
    event.preventDefault();

    if (confirmedpassword !== password) {
      alert("Confirmed password is not the same");
    } else {
      try {
        await axios.post("http://localhost:3001/auth/register", {
          username,
          password,
        });
        alert("Registration Completed, Now Login..!");
        setUsername("");
        setPassword("");
        setConfirmedPassword("");
        toggleForm();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="user signupBx">
        <div className="formBx">
          <form action="" id="signin" onSubmit={onSubmition}>
            <h2>Create an account</h2>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
              required="required"
            />
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create Password"
              required="required"
            />
            <input
              type="password"
              value={confirmedpassword}
              onChange={(event) => setConfirmedPassword(event.target.value)}
              placeholder="Confirm Password"
              required="required"
            />
            <button type="submit">Register</button>
            <p className="signup">
              Already have an account ?<span onClick={toggleForm}> LOGIN </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
