import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginCode } from "../../redux/Admin/admin.actions";
import GoogleIcon from "@mui/icons-material/Google";

import "./Sign-in.css";

const SignIn = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login?.userInfo?.user);

  // const onPress = () => {};

  // const forgotPassword = () => {};

  const loginToGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => dispatch(loginCode(codeResponse)),
    flow: "auth-code",
  });

  return (
    <div className="mainContainer">
      {user && <Navigate to="/" />}
      <div className="myContainer">
        <div className="container2">
          <img src="Images/maple.png" alt="" />
          <p className="p">Your Growth Partner</p>
          {/* <button onClick={() => loginToGoogle()}> Login</button> */}
          <button className="google-button" onClick={() => loginToGoogle()}>
            {/* <img src="google-icon.png" alt="Google Logo" /> */}
            <GoogleIcon
              style={{ fontSize: 24, color: "white", marginRight: "10px" }}
            />
            Login with Google
          </button>

          {/* <GoogleLogin
            // fetchBasicProfile={false}
            clientId="162519831332-32p47ro0kkv76jjfm11ab5161ls43gsl.apps.googleusercontent.com"
            buttonText="Login With Google"
            onSuccess={responseGoogle}
            onFailure={(err) => console.log("fail", err)}
            cookiePolicy={"single_host_origin"}
            className="cursor-pointer googlelogin"
            // responseType="code"
            // scope="email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.readonly"
            accessType="offline"
            prompt="consent"
            responseType="code"
            isSignedIn={false}
          /> */}
          {/* <div class="sign-in-form-or">
            <hr />
            <span>or</span>
          </div>
          <div className="input-fields">
            <InputField
              type={"text"}
              value={email}
              defaultValue={email}
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              type={"password"}
              value={password}
              defaultValue={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              value="Sign In"
              width={"100%"}
              onPress={onPress}
              backgroundColor="#1eae63"
              color="white"
            />
            <input
              className="forgot"
              type="submit"
              onClick={forgotPassword}
              value="Forgot Password?"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
