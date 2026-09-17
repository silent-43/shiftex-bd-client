import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

import {
  FaArrowRight,
  FaEnvelope,
  FaHeadset,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  FaPaperPlane,
  FaQuestionCircle,
  FaCheckCircle,
  FaBoxOpen,
} from "react-icons/fa";
import Swal from "sweetalert2";

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    setLoading(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        },
      );

      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thank you for contacting ShiftexBD. We'll get back to you soon.",
        confirmButtonColor: "#03373d",
      });

      reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      console.log("Status:", error?.status);
      console.log("Text:", error?.text);

      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: error?.text || "Your message could not be sent.",
        confirmButtonColor: "#03373d",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-[#03373d] via-[#07535b] to-[#03373d] px-6 py-24 rounded-xl lg:px-8">
        {/* Background Shapes */}
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#CAEB66]/20 blur-3xl"></div>

        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl"></div>

        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#CAEB66]/40 bg-[#CAEB66]/10 px-5 py-2 text-sm font-bold text-[#CAEB66]">
            <FaHeadset />
            Get In Touch
          </div>

          <h1 className="mt-6 text-5xl font-black leading-tight text-white md:text-6xl">
            We’re Here to <span className="text-[#CAEB66]">Help</span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300 md:text-xl">
            Have a question about your parcel, delivery service or ShiftexBD?
            Send us a message and our support team will be happy to assist you.
          </p>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="bg-gray-50 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Phone */}
            <div className="group rounded-3xl border border-gray-200 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[#CAEB66] hover:shadow-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#CAEB66] text-xl text-[#03373d] transition-transform duration-300 group-hover:rotate-6">
                <FaPhoneAlt />
              </div>

              <h3 className="mt-5 text-xl font-black text-[#03373d]">
                Call Us
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Need quick assistance? Give us a call.
              </p>

              <a
                href="tel:+8801339524497"
                className="mt-4 inline-block font-bold text-[#03373d] hover:text-[#075d66]"
              >
                +880 1339524497
              </a>
            </div>

            {/* Email */}
            <div className="group rounded-3xl border border-gray-200 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[#CAEB66] hover:shadow-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#CAEB66] text-xl text-[#03373d] transition-transform duration-300 group-hover:rotate-6">
                <FaEnvelope />
              </div>

              <h3 className="mt-5 text-xl font-black text-[#03373d]">
                Email Us
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Send us your questions anytime.
              </p>

              <a
                href="mailto:sohag.karmokar.dev@gmail.com"
                className="mt-4 inline-block whitespace-nowrap font-bold text-[#03373d] hover:text-[#075d66]"
              >
                sohag.karmokar.dev@gmail.com
              </a>
            </div>

            {/* Location */}
            <div className="group rounded-3xl border border-gray-200 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[#CAEB66] hover:shadow-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#CAEB66] text-xl text-[#03373d] transition-transform duration-300 group-hover:rotate-6">
                <FaMapMarkerAlt />
              </div>

              <h3 className="mt-5 text-xl font-black text-[#03373d]">
                Our Location
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Find us at our main service location.
              </p>

              <p className="mt-4 font-bold text-[#03373d]">Dhaka, Bangladesh</p>
            </div>

            {/* Working Hours */}
            <div className="group rounded-3xl border border-gray-200 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[#CAEB66] hover:shadow-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#CAEB66] text-xl text-[#03373d] transition-transform duration-300 group-hover:rotate-6">
                <FaClock />
              </div>

              <h3 className="mt-5 text-xl font-black text-[#03373d]">
                Working Hours
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Our support team is available during these hours.
              </p>

              <p className="mt-4 font-bold text-[#03373d]">
                Sat - Thu: 9AM - 8PM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          {/* LEFT CONTENT */}
          <div>
            <span className="font-bold uppercase tracking-[0.2em] text-[#03373d]">
              Contact ShiftexBD
            </span>

            <h2 className="mt-4 text-4xl font-black leading-tight text-[#03373d] md:text-5xl">
              Let’s talk about your delivery needs
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Whether you have a question about booking a parcel, tracking a
              delivery or using ShiftexBD, we're here to help.
            </p>

            {/* Benefits */}
            <div className="mt-9 space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#CAEB66] text-[#03373d]">
                  <FaCheckCircle />
                </div>

                <div>
                  <h3 className="font-black text-[#03373d]">Quick Response</h3>

                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Our support team aims to respond to your queries as quickly
                    as possible.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#CAEB66] text-[#03373d]">
                  <FaHeadset />
                </div>

                <div>
                  <h3 className="font-black text-[#03373d]">Helpful Support</h3>

                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Get assistance with bookings, tracking and other delivery
                    related questions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#CAEB66] text-[#03373d]">
                  <FaQuestionCircle />
                </div>

                <div>
                  <h3 className="font-black text-[#03373d]">
                    Have a Question?
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Don't hesitate to contact us if you need any information
                    about ShiftexBD.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-[#CAEB66]/20 blur-2xl"></div>

            <div className="relative rounded-[2rem] bg-[#03373d] p-7 shadow-2xl md:p-10">
              <div className="mb-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#CAEB66] text-xl text-[#03373d]">
                  <FaPaperPlane />
                </div>

                <h3 className="mt-5 text-3xl font-black text-white">
                  Send Us a Message
                </h3>

                <p className="mt-2 text-gray-300">
                  Fill out the form and we'll get back to you.
                </p>
              </div>

              <form
                ref={formRef}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* Name + Email */}
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-white">
                      Your Name
                    </label>

                    <input
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                      type="text"
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3.5 text-white outline-none placeholder:text-gray-400 transition-all duration-300 focus:border-[#CAEB66] focus:bg-white/15"
                    />

                    {errors.name && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-white">
                      Email Address
                    </label>

                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email address",
                        },
                      })}
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3.5 text-white outline-none placeholder:text-gray-400 transition-all duration-300 focus:border-[#CAEB66] focus:bg-white/15"
                    />

                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone + Subject */}
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-white">
                      Phone Number
                    </label>

                    <input
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^(?:\+8801|01)[3-9]\d{8}$/,
                          message: "Enter a valid Bangladeshi phone number",
                        },
                      })}
                      type="tel"
                      placeholder="Enter phone number"
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3.5 text-white outline-none placeholder:text-gray-400 transition-all duration-300 focus:border-[#CAEB66] focus:bg-white/15"
                    />

                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-white">
                      Subject
                    </label>

                    <input
                      {...register("subject", {
                        required: "Subject is required",
                        minLength: {
                          value: 3,
                          message: "Subject must be at least 3 characters",
                        },
                      })}
                      type="text"
                      placeholder="Enter subject"
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3.5 text-white outline-none placeholder:text-gray-400 transition-all duration-300 focus:border-[#CAEB66] focus:bg-white/15"
                    />

                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-white">
                    Your Message
                  </label>

                  <textarea
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters",
                      },
                    })}
                    rows="6"
                    placeholder="Write your message here..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/10 px-4 py-3.5 text-white outline-none placeholder:text-gray-400 transition-all duration-300 focus:border-[#CAEB66] focus:bg-white/15"
                  ></textarea>

                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#CAEB66] px-6 py-4 font-black text-[#03373d] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Sending..." : "Send Message"}

                  {!loading && (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#03373d] text-[#CAEB66] transition-transform duration-300 group-hover:translate-x-1">
                      <FaArrowRight className="text-xs" />
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / HELP SECTION */}
      <section className="bg-gray-50 px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-bold uppercase tracking-[0.2em] text-[#03373d]">
              Need More Help?
            </span>

            <h2 className="mt-4 text-4xl font-black text-[#03373d] md:text-5xl">
              We’re ready to assist you
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Before contacting us, you may find the answer to your question
              through our frequently asked questions.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {/* FAQ 1 */}
            <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[#CAEB66] hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#CAEB66] text-[#03373d]">
                <FaBoxOpen />
              </div>

              <h3 className="mt-5 text-xl font-black text-[#03373d]">
                How can I book a parcel?
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Sign in to your ShiftexBD account and provide your parcel,
                pickup and delivery information through the booking process.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[#CAEB66] hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#CAEB66] text-[#03373d]">
                <FaMapMarkerAlt />
              </div>

              <h3 className="mt-5 text-xl font-black text-[#03373d]">
                How can I track my parcel?
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                You can use the tracking feature to check your parcel's current
                delivery progress and status.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[#CAEB66] hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#CAEB66] text-[#03373d]">
                <FaHeadset />
              </div>

              <h3 className="mt-5 text-xl font-black text-[#03373d]">
                Need help with a delivery?
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Contact our support team with your parcel information and we'll
                help you understand the next steps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#03373d] to-[#075d66] px-8 py-16 text-center shadow-2xl md:px-14">
          <div className="mx-auto max-w-3xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#CAEB66] text-2xl text-[#03373d]">
              <FaHeadset />
            </div>

            <p className="mt-6 font-bold uppercase tracking-[0.2em] text-[#CAEB66]">
              ShiftexBD Support
            </p>

            <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">
              Have something to ask?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-300">
              We're always happy to hear from you. Send us your questions,
              suggestions or feedback.
            </p>

            <a
              href="mailto:sohag.karmokar.dev@gmail.com"
              className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-[#CAEB66] px-8 py-4 font-black text-[#03373d] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              Email Support
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-2" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
