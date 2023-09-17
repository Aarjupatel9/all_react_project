// import logo from './logo.svg';
import "./App.css";
import Match from "./Match.jsx";
import Notmatch from "./Notmatch.jsx";
import firebase from "./firebase";
import { useState } from "react";

const SlotM = (props) => {
  const x = props.x;
  const y = props.y;
  const z = props.z;

  if (y == z && x == y) {
    return (
      <>
        <Match props={{ x, y, z }} />
      </>
    );
  } else {
    return (
      <>
        <Notmatch props={{ x, y, z }} />
      </>
    );
  }
};

// -------------------------------------- otp --------------------------------------------------------------------------
//npm i firebase@8.6.2  with react version 17.0.2

function App() {

  const [otp, setOtp] = useState('')
  const [mobile, setMobile] = useState('')

  const onSignInSubmit = (e) => {
    // e.preventDefault();
    // console.log('object :>> ', e.target.value);

    configureCaptcha();
    const phoneNumber = "+91" + mobile;
    console.log('number :>> ', mobile);
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("otp sent")
        // ...
      }).catch((error) => {
        // Error; SMS not sent
        if (error) console.log("otp not sent ");
        // ...
      });
  }
  // const handleChange = (e) => {
  //   console.log('e.target.value', e.target.value)
  //   setName(e.target.value);
  // }

  const onSubmitOTP = (e) => {
    e.preventDefault();
    const code = otp;
    console.log('otp', otp)
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log('user :>> ', JSON.stringify(user));
      alert("user verified");
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
      alert("!!! not verified")
    });
  }

  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        onSignInSubmit();
        console.log("recaptcha verified")
      },
      defaultCountry: 'IN'
    });
    // window.recaptchaVerifier.g().then((widgetId) => {
    //   window.recaptchaWidgetId = widgetId;
    //   const recaptchaResponse = window.grecaptcha.getResponse(window.recaptchaWidgetId);
    // });



  }
  return (
    <>
      {/* <h1 className="heading">
        🎰 Welcome to{" "}
        <span style={{ color: "red" }}> &nbsp;slot Machine 🎰</span>
      </h1>

      <div className="slotmachine">
        <SlotM x="😊" y="😍" z="😊" />
        <SlotM x="😊" y="😊" z="😊" />
        <SlotM x="😊" y="😊" z="😊" />
        <SlotM x="😊" y="😍" z="👩‍🦰" />
      </div> */}

      <div>
        <h2>Login Form</h2>
        <form>
          <div id="sign-in-button"></div>
          <input type="number" name="mobile" placeholder="Mobile number" required onChange={(e) => { setMobile(e.target.value); }} />
          <button type="button" onClick={onSignInSubmit}>Submit</button>
        </form>

        <h2>Enter OTP</h2>
        <form onSubmit={onSubmitOTP}>
          <input type="number" name="otp" placeholder="OTP Number" required onChange={(e) => setOtp(e.target.value)} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default App;
