import React from "react";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import InputField from "../../components/input-field/Input-field";
import { loginGoogle } from "../../redux/Admin/admin.actions";
import "./Sign-in.css";

const SignIn = () => {
  const dispatch = useDispatch();
  const responseGoogle = (response) => {
    dispatch(loginGoogle(response));
  };

  const user = useSelector((state) => state.login?.userInfo?.user);

  // const onPress = () => {};

  // const forgotPassword = () => {};

  return (
    <div className="mainContainer">
      {user && <Navigate to="/" />}
      <div className="myContainer">
        <div className="container2">
          <img src="Images/maple.png" alt="" />
          <p className="p">Your Growth Partner</p>
          <GoogleLogin
            // fetchBasicProfile={false}
            clientId="659064580758-8tlei4488ec2npdcd7pvlkn8inc4tesc.apps.googleusercontent.com"
            buttonText="Login With Google"
            onSuccess={responseGoogle}
            onFailure={(err) => console.log("fail", err)}
            cookiePolicy={"single_host_origin"}
            className="cursor-pointer googlelogin"
          />
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
