import React, { useEffect, useState, useContext } from "react";
import AuthService from "../services/auth.service";

import { useNavigate, Link } from "react-router-dom";
import { userDetailsTemplate } from "../templates/Templates";

//google apis
import jwt_decode from "jwt-decode";
import userService from "../services/user.service";

import toast from "react-hot-toast";
import HomeContext from "../context/HomeContext"

function Login() {

  const { currentUser, setCurrentUser, mySocket, setMySocket, players, setPlayers } = useContext(HomeContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [massege, setMassege] = useState("");

  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(credential) {
    setMassege("");
    setLoading(true);

    if (credential) {
      if (credential.email_verified) {
        setMassege(
          "Your Email address is not verified by google please verify first to open account"
        );
        setLoading(false);
        return;
      }
    } else {
      credential = {
        number: number,
        password: password,
        web: true,
      };
    }

    const loginPromise = AuthService.loginService(credential);
    loginPromise.then((data) => {
      if (data.status == 1) {
        document.cookie = `token=${JSON.stringify(data.token)}`;
        setCurrentUser(data.userDetails);
        window.alert("you login succesfull");
        navigate("/home");
      }
    })
      .catch((error) => {

      });

    toast.promise(
      loginPromise,
      {
        loading: 'updating contacts...',
        success: (data) => data.message,
        error: (err) => err.toString(),
      },
      {
        success: {
          duration: 500,
        },
        error: {
          duration: 2000,
        },
      }
    );

  }

  useEffect(() => {
    if (currentUser !== userDetailsTemplate) {
      navigate("/home");
      console.log("login.js currentUser : ", currentUser);
    }
  }, []);

  return (
    <>
      <div className="container ">
        <div className="container MyLoginStyle">
          <div className="FormTag   ml-auto mr-auto">
            <div className="login-card card-container p-5">
              <div className="form-group text-lg-center text-success">
                Login Into Massenger
              </div>
              <div className="form-group">
                <label htmlFor="number">Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="number"
                  value={number}
                  onChange={(e) => {
                    setNumber(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  disabled={loading}
                  onClick={() => {
                    handleLogin();
                  }}
                >
                  Login
                </button>
              </div>

              {massege && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {massege}
                  </div>
                </div>
              )}
              {/* <div className="form-group text-center" htmlFor="loginWithGoogle">
                Or
              </div>
              <div
                className="form-group text-center mr-auto ml-auto"
                name="loginWithGoogle"
              >
                <GoogleLogin
                  onSuccess={responseMessage}
                  onError={errorMessage}
                  responseType="code"
                  scope="openid profile email"
                  buttonText="Sign in with Google"
                  cookiePolicy={"single_host_origin"}
                  uxMode={"popup"}
                />
              </div> */}
              {/* <div className="form-group text-center  mt-5">
                if you not register? <Link to="/signup">Sing Up</Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
