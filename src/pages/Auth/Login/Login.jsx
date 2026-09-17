import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaTimes,
  FaExclamationTriangle,
  FaCheck,
  FaEnvelope,
} from "react-icons/fa";

const Login = () => {
  const { signInUser, resetPassword } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  // Password show/hide
  const [showPassword, setShowPassword] = useState(false);

  // Wrong email/password popup
  const [showLoginError, setShowLoginError] = useState(false);

  // Forgot password popup
  const [showForgotModal, setShowForgotModal] = useState(false);

  // Reset password success popup
  const [showResetSuccess, setShowResetSuccess] = useState(false);

  // Reset email
  const [resetEmail, setResetEmail] = useState("");

  // Reset email loading
  const [resetLoading, setResetLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ================= LOGIN =================
  const handleLogin = (data) => {
    console.log("form data : ", data);

    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);

        // Login successful
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);

        // Wrong email/password
        setShowLoginError(true);
      });
  };

  // ================= FORGOT PASSWORD =================
  const handleForgotPassword = () => {
    if (!resetEmail.trim()) {
      alert("Please enter your email first.");
      return;
    }

    setResetLoading(true);

    resetPassword(resetEmail)
      .then(() => {
        // Forgot password popup close
        setShowForgotModal(false);

        // Success popup show
        setShowResetSuccess(true);
      })
      .catch((error) => {
        console.log(error);

        alert("Failed to send Reset Email.");
      })
      .finally(() => {
        setResetLoading(false);
      });
  };

  return (
    <div className="relative flex items-center justify-center w-full">
      <Link
        to="/"
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-[#03373d] px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      >
        <span className="absolute inset-0 -translate-x-full bg-[#CAEB66] transition-transform duration-500 group-hover:translate-x-0"></span>

        <span className="relative z-10 transition-colors duration-300 group-hover:text-[#03373d]">
          Go to Home
        </span>
      </Link>
      <div className="w-full max-w-md">
        {" "}
        <>
          {/*LOGIN CARD*/}
          <div className="card w-full mx-auto max-w-sm shrink-0 bg-gradient-to-br from-[#03ff5b] via-[#00cfff] to-[#031bf3] border border-white/70 rounded-3xl shadow-[0_0_70px_rgba(0,0,0,0.65)]">
            {/* Heading */}
            <h3 className="text-3xl text-center pt-6 font-bold">
              Welcome Back
            </h3>

            <p className="text-center text-lg text-black-500 mt-1 font-bold">
              Please Login
            </p>

            <form onSubmit={handleSubmit(handleLogin)} className="card-body">
              <fieldset className="fieldset">
                {/*  EMAIL  */}
                <label className="label font-semibold">Email</label>

                <input
                  type="email"
                  {...register("email", {
                    required: true,
                  })}
                  className="input w-full"
                  placeholder="Enter your email"
                />

                {errors.email?.type === "required" && (
                  <p className="text-red-500 font-bold text-sm">
                    Email is Required
                  </p>
                )}

                {/*  PASSWORD  */}
                <label className="label font-semibold mt-2">Password</label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: true,
                      minLength: 6,
                    })}
                    className="input w-full pr-12"
                    placeholder="Enter your password"
                  />

                  {/* Eye Button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#03373d] cursor-pointer"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                </div>

                {errors.password?.type === "required" && (
                  <p className="text-red-500 font-bold text-sm">
                    Password is Required
                  </p>
                )}

                {errors.password?.type === "minLength" && (
                  <p className="text-red-500 font-bold text-sm">
                    Password must have 6 characters or longer
                  </p>
                )}

                {/* FORGOT PASSWORD */}
                <div className="text-right mt-1">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-base font-semibold text-[#03373d] hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* LOGIN BUTTON  */}
                <button className="btn btn-neutral mt-4">Login</button>
              </fieldset>

              {/* REGISTER */}
              <p className="mt-2 text-center">
                <span className="text-back-600 font-bold">
                  New to ShiftexBD? Please{" "}
                </span>

                <Link
                  state={location.state}
                  to="/register"
                  className="text-white text-base font-bold underline"
                >
                  Register
                </Link>
              </p>
            </form>

            {/* SOCIAL LOGIN */}
            <SocialLogin />
          </div>

          {/*WRONG LOGIN ERROR POPUP */}
          {showLoginError && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
              <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-7 text-center">
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setShowLoginError(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 cursor-pointer"
                >
                  <FaTimes size={20} />
                </button>

                {/* Error Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 flex items-center justify-center bg-red-100 text-red-500 rounded-full">
                    <FaExclamationTriangle size={28} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-[#03373d]">
                  Login Failed!
                </h3>

                {/* Message */}
                <p className="text-gray-600 mt-3 leading-relaxed">
                  The email or password you entered is incorrect. Please check
                  your information and try again.
                </p>

                {/* Try Again */}
                <button
                  type="button"
                  onClick={() => setShowLoginError(false)}
                  className="btn mt-6 px-8 bg-[#03373d] hover:bg-[#CAEB66] hover:text-[#03373d] text-white border-none rounded-xl"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* FORGOT PASSWORD POPUP */}
          {showForgotModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
              <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-7">
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(false);
                    setResetEmail("");
                  }}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 cursor-pointer"
                >
                  <FaTimes size={20} />
                </button>

                {/* Lock Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 flex items-center justify-center bg-[#CAEB66] text-[#03373d] rounded-full shadow-md">
                    <FaLock size={24} />
                  </div>
                </div>

                {/* Title */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-[#03373d]">
                    Forgot Password?
                  </h3>

                  <p className="text-gray-500 mt-2 leading-relaxed">
                    Enter your registered email address and we'll send you a
                    password reset link.
                  </p>
                </div>

                {/* Email Input */}
                <div className="mt-6">
                  <label className="block font-semibold mb-2 text-[#03373d]">
                    Email Address
                  </label>

                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="input input-bordered w-full pl-11"
                      placeholder="Enter your registered email"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                  {/* Cancel */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotModal(false);
                      setResetEmail("");
                    }}
                    className="btn flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 border-none rounded-xl"
                  >
                    Cancel
                  </button>

                  {/* Send Link */}
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={resetLoading}
                    className="btn flex-1 bg-[#03373d] hover:bg-[#CAEB66] hover:text-[#03373d] text-white border-none rounded-xl"
                  >
                    {resetLoading ? "Sending..." : "Send Link"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PASSWORD RESET SUCCESS POPUP */}
          {showResetSuccess && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
              <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center">
                {/* Success Icon */}
                <div className="flex justify-center mb-5">
                  <div className="w-20 h-20 flex items-center justify-center bg-green-100 text-green-600 rounded-full">
                    <FaCheck size={38} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-[#03373d]">
                  Reset Link Sent!
                </h3>

                {/* Main Message */}
                <p className="text-gray-600 mt-3 leading-relaxed">
                  We've sent a password reset link to
                </p>

                {/* Email */}
                <p className="font-bold text-[#03373d] mt-2 break-all">
                  {resetEmail}
                </p>

                {/* Instructions */}
                <div className="mt-5 bg-gray-50 rounded-2xl p-5 text-left">
                  <p className="font-bold text-[#03373d] mb-3">
                    What to do next?
                  </p>

                  <ul className="text-sm text-gray-600 space-y-3">
                    <li className="flex gap-2">
                      <span>📧</span>
                      <span>Check your email inbox.</span>
                    </li>

                    <li className="flex gap-2">
                      <span>🔗</span>
                      <span>Open the password reset email.</span>
                    </li>

                    <li className="flex gap-2">
                      <span>🔐</span>
                      <span>
                        Click the reset link and create a new password.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Spam Note */}
                <p className="text-sm text-gray-500 mt-4 leading-relaxed">
                  Didn't receive the email? Please check your
                  <span className="font-semibold"> Spam or Junk folder</span>.
                </p>

                {/* Done Button */}
                <button
                  type="button"
                  onClick={() => {
                    setShowResetSuccess(false);
                    setResetEmail("");
                  }}
                  className="btn w-full mt-6 bg-[#03373d] hover:bg-[#CAEB66] hover:text-[#03373d] text-white border-none rounded-xl"
                >
                  Got it
                </button>
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default Login;
