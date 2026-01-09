import React, { useState } from "react";
import "./Signup.css";

function Signup() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  const handleNext = () => {
    if (mobile.length === 10) setStep(2);
    else alert("Enter valid 10-digit mobile number");
  };

  const handleVerify = () => {
    if (otp.length === 6) alert("Signup completed!");
    else alert("Enter valid 6-digit OTP");
  };

  return (
    <div className="signup-wrapper">

      {/* LEFT SIDE IMAGE + TEXT */}
      <div className="signup-left">
        <h1 className="big-title">
          Open a free demat and trading account online
        </h1>
        <p className="sub-title">
          Start investing brokerage free and join a community of 1.6+ crore investors and traders
        </p>

        <img 
          src="/media/account_open.svg" 
          alt="signup"
          className="signup-left-img"
        />
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="signup-right">

        {step === 1 && (
          <>
            <h2 className="form-title">Signup now</h2>
            <p className="track-text">Or track your existing application</p>

            {/* MOBILE INPUT ROW */}
            <div className="mobile-row">
              <span className="flag-box">🇮🇳 +91</span>

              <input
                type="number"
                placeholder="Enter your mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="mobile-input"
              />
            </div>

            <button className="otp-btn" onClick={handleNext}>Get OTP</button>

            <p className="terms">
              By proceeding, you agree to the Zerodha 
              <a href="#"> terms</a> & <a href="#">privacy policy</a>
            </p>
          </>
        )}

        {/* STEP 2 → OTP VERIFICATION */}
        {step === 2 && (
          <>
            <h2 className="form-title">Verify OTP</h2>
            <p className="track-text">OTP sent to +91 {mobile}</p>

            <input
              type="number"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="otp-input-box"
            />

            <button className="otp-btn" onClick={handleVerify}>
              Verify OTP
            </button>

            <button className="change-btn" onClick={() => setStep(1)}>
              Change mobile number
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default Signup;
