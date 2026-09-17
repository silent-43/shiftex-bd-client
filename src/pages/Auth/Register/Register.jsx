import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";

const Register = () => {
  const location = useLocation();
  // console.log("register location :", location);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();

  const handleRegistration = (data) => {
    console.log("after register : ", data.photo[0]);

    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || "/");

        //store the photo & get the photo url
        const formData = new FormData();
        formData.append("image", profileImg);

        //send the photo to store and get the url
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
        axios.post(image_API_URL, formData).then((res) => {
          console.log("after image upload :", res.data.data.url);

          //udate user profile to firebase
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };
          updateUserProfile(userProfile)
            .then(() => {
              console.log("user profile updated done");
              navigate(location?.state || "/");
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="relative flex items-center justify-center w-full">
      <Link
        to="/"
        className="group absolute right-[calc(50%+220px)] top-1/2 -translate-y-1/2 inline-flex items-center gap-2 overflow-hidden rounded-xl bg-[#03373d] px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-[calc(50%+4px)] hover:shadow-2xl"
      >
        <span className="absolute inset-0 -translate-x-full bg-[#CAEB66] transition-transform duration-500 group-hover:translate-x-0"></span>

        <span className="relative z-10 transition-colors duration-300 group-hover:text-[#03373d]">
          Go to Home
        </span>
      </Link>

      <div className="card w-full mx-auto max-w-sm shrink-0 bg-gradient-to-br from-[#03ff5b] via-[#00cfff] to-[#031bf3] border border-white/70 rounded-3xl shadow-[0_0_70px_rgba(0,0,0,0.65)]">
        <h3 className="text-3xl mt-3 text-center font-bold">
          Welcome to ShiftexBD
        </h3>
        <p className="text-center text-base font-bold">Please Register</p>
        <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
          <fieldset className="fieldset">
            {/* Name */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input"
              placeholder="Your Name"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500 font-bold">Name is Required</p>
            )}

            {/* photo field */}
            <label className="label">Photo</label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input file-input-info"
              placeholder="Your Photo"
            />
            {errors.photo?.type === "required" && (
              <p className="text-red-500 font-bold">Photo is Required</p>
            )}
            {/* email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500 font-bold">Email is Required</p>
            )}

            {/* password */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
              })}
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 font-bold">Password is Required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600 font-bold">
                Password must be 6 Characters or Longer
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600 font-bold">
                Password must Have one uppercase, one lowercase, one special
                character & one number
              </p>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Register</button>
          </fieldset>
          <p>
            <span className="text-back-600 font-bold">
              Already Have an Account ? PLease{"   "}
            </span>
            <Link
              state={location.state}
              to="/login"
              className="text-white text-base font-bold underline"
            >
              Login
            </Link>
          </p>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
