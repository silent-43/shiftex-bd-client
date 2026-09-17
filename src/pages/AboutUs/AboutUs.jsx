import React from "react";
import {
  FaArrowRight,
  FaBoxOpen,
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaTruck,
  FaUsers,
  FaWarehouse,
  FaHeadset,
  FaRoute,
  FaStar,
} from "react-icons/fa";

const AboutUs = () => {
  const [selectedFeature, setSelectedFeature] = React.useState(null);

  const features = [
    {
      icon: <FaTruck />,
      title: "Fast & Reliable Delivery",
      description:
        "We focus on delivering parcels safely and efficiently while maintaining a smooth delivery experience from booking to final handover.",
      details:
        "ShiftexBD is designed to make parcel delivery fast and reliable. From the initial booking to the final handover, every stage of the delivery process is organized to reduce unnecessary delays. Customers can provide parcel information, pickup details and destination information through a simple booking workflow.",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Wide Coverage",
      description:
        "ShiftexBD is designed to connect customers and businesses with delivery services across different districts and service areas.",
      details:
        "ShiftexBD provides coverage across different districts and service areas of Bangladesh. Customers can check available service areas and use the platform to manage parcel deliveries according to their pickup and destination locations.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Safe & Secure",
      description:
        "Your parcel matters to us. Our delivery process is designed with secure handling and reliable parcel management in mind.",
      details:
        "Parcel safety is an important part of the ShiftexBD delivery workflow. Parcel information is organized throughout the process, while administrators and riders can manage their assigned responsibilities through the platform. This structured approach helps keep parcel handling clear and organized.",
    },
    {
      icon: <FaClock />,
      title: "On-Time Service",
      description:
        "We aim to make parcel delivery predictable by organizing bookings, routes, riders and delivery statuses in one connected system.",
      details:
        "ShiftexBD connects bookings, delivery routes, riders and parcel statuses in one system. By keeping these parts connected, the platform helps organize the delivery process and makes it easier to follow the progress of a parcel from pickup to destination.",
    },
    {
      icon: <FaRoute />,
      title: "Smart Parcel Management",
      description:
        "From booking information to delivery progress, ShiftexBD helps keep parcel-related information organized and easy to manage.",
      details:
        "Smart parcel management allows important parcel information to remain organized throughout the delivery journey. Customers can manage their parcel information, while administrators can manage deliveries and riders from the management system.",
    },
    {
      icon: <FaHeadset />,
      title: "Customer Support",
      description:
        "We believe a good delivery service should be easy to use and easy to understand whenever customers need assistance.",
      details:
        "ShiftexBD focuses on creating a simple and user-friendly delivery experience. Customers can easily understand the booking and tracking process, while the platform provides a structured system for handling delivery-related information and assistance.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Book Your Parcel",
      description:
        "Provide your parcel details, pickup information and delivery destination through our simple booking process.",
      icon: <FaBoxOpen />,
    },
    {
      number: "02",
      title: "Parcel Processing",
      description:
        "Your booking information is organized so that the parcel can move through the appropriate delivery process.",
      icon: <FaWarehouse />,
    },
    {
      number: "03",
      title: "Rider Assignment",
      description:
        "A suitable rider can be assigned to handle the pickup and delivery according to the delivery workflow.",
      icon: <FaUsers />,
    },
    {
      number: "04",
      title: "Track & Deliver",
      description:
        "Follow the delivery progress and receive your parcel through a structured and transparent delivery process.",
      icon: <FaCheckCircle />,
    },
  ];

  const stats = [
    {
      value: "64",
      title: "District Coverage",
      icon: <FaMapMarkerAlt />,
    },
    {
      value: "24/7",
      title: "System Access",
      icon: <FaClock />,
    },
    {
      value: "100%",
      title: "Parcel Focused",
      icon: <FaBoxOpen />,
    },
    {
      value: "3",
      title: "User Roles",
      icon: <FaUsers />,
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[600px] flex items-center bg-gradient-to-br from-[#03373d] via-[#07535b] to-[#03373d]">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#CAEB66]/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl"></div>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8">
          {/* Hero Content */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#CAEB66]/40 bg-[#CAEB66]/10 px-5 py-2 text-sm font-bold text-[#CAEB66]">
              <FaBoxOpen />
              About ShiftexBD
            </div>

            <h1 className="text-5xl font-black leading-tight text-white md:text-6xl lg:text-7xl">
              Moving Parcels.
              <br />
              <span className="text-[#CAEB66]">Connecting People.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-200 md:text-xl">
              ShiftexBD is a modern parcel delivery and management platform
              designed to make sending and receiving parcels easier, faster,
              safer and more organized.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-300">
              From the moment a customer books a parcel to the moment it reaches
              its destination, ShiftexBD brings the essential parts of the
              delivery process together in one convenient platform.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="/"
                className="group inline-flex items-center gap-3 rounded-xl bg-[#CAEB66] px-7 py-4 font-bold text-[#03373d] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                Explore ShiftexBD
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="/coverage"
                className="inline-flex items-center gap-3 rounded-xl border border-white/30 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#03373d]"
              >
                <FaMapMarkerAlt />
                View Coverage
              </a>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-0 rounded-[3rem] bg-[#CAEB66]/20 blur-3xl"></div>

              <div className="relative rounded-[3rem] border border-white/20 bg-white/10 p-8 shadow-[0_0_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <div className="rounded-[2rem] bg-gradient-to-br from-[#CAEB66] to-[#9fd936] p-8 shadow-2xl">
                  <div className="flex h-64 items-center justify-center rounded-3xl bg-[#03373d]">
                    <FaTruck className="text-[9rem] text-[#CAEB66] drop-shadow-2xl" />
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-white/80 p-4">
                      <FaBoxOpen className="text-2xl text-[#03373d]" />
                      <p className="mt-2 text-sm font-bold text-[#03373d]">
                        Easy Booking
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white/80 p-4">
                      <FaMapMarkerAlt className="text-2xl text-[#03373d]" />
                      <p className="mt-2 text-sm font-bold text-[#03373d]">
                        Parcel Tracking
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-5 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#CAEB66] text-[#03373d]">
                    <FaCheckCircle />
                  </div>

                  <div>
                    <p className="font-black text-[#03373d]">Reliable</p>
                    <p className="text-sm text-gray-500">Delivery Service</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <span className="font-bold uppercase tracking-[0.2em] text-[#03373d]">
                Who We Are
              </span>

              <h2 className="mt-4 text-4xl font-black leading-tight text-[#03373d] md:text-5xl">
                A smarter way to manage your parcel delivery
              </h2>

              <div className="mt-7 space-y-5 text-lg leading-8 text-gray-600">
                <p>
                  ShiftexBD is built around a simple idea: parcel delivery
                  should not feel complicated. Customers should be able to book
                  a parcel easily, understand its progress and receive reliable
                  service without unnecessary hassle.
                </p>

                <p>
                  Our platform connects customers, administrators and riders
                  through a structured delivery management system. Each role has
                  its own responsibilities, helping the entire process stay
                  organized from booking to delivery.
                </p>

                <p>
                  Whether you are sending a personal package or managing
                  multiple deliveries, ShiftexBD aims to provide a smooth,
                  transparent and user-friendly experience.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-xl text-[#03373d]" />
                  <span className="font-semibold text-gray-700">
                    Simple parcel booking
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-xl text-[#03373d]" />
                  <span className="font-semibold text-gray-700">
                    Organized delivery workflow
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-xl text-[#03373d]" />
                  <span className="font-semibold text-gray-700">
                    Delivery status tracking
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-xl text-[#03373d]" />
                  <span className="font-semibold text-gray-700">
                    Rider management
                  </span>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="relative">
              <div className="absolute -inset-5 rounded-[2rem] bg-[#CAEB66]/30 blur-2xl"></div>

              <div className="relative rounded-[2rem] bg-[#03373d] p-8 shadow-2xl md:p-10">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-[#CAEB66]">
                      Our Approach
                    </p>

                    <h3 className="mt-2 text-3xl font-black text-white">
                      Simple. Secure. Connected.
                    </h3>
                  </div>

                  <div className="hidden h-16 w-16 items-center justify-center rounded-2xl bg-[#CAEB66] text-3xl text-[#03373d] sm:flex">
                    <FaRoute />
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#CAEB66] text-[#03373d]">
                        <FaUsers />
                      </div>

                      <div>
                        <h4 className="font-bold text-white">
                          Connected Users
                        </h4>

                        <p className="mt-1 text-sm leading-6 text-gray-300">
                          Customers, admins and riders work within one organized
                          ecosystem.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#CAEB66] text-[#03373d]">
                        <FaBoxOpen />
                      </div>

                      <div>
                        <h4 className="font-bold text-white">
                          Organized Parcels
                        </h4>

                        <p className="mt-1 text-sm leading-6 text-gray-300">
                          Parcel information and delivery progress stay
                          organized throughout the workflow.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#CAEB66] text-[#03373d]">
                        <FaShieldAlt />
                      </div>

                      <div>
                        <h4 className="font-bold text-white">Secure Process</h4>

                        <p className="mt-1 text-sm leading-6 text-gray-300">
                          We focus on structured handling and clear delivery
                          stages for a dependable experience.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-gradient-to-r from-[#CAEB66] to-[#b7e94e] px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="font-bold uppercase tracking-[0.2em] text-[#03373d]">
              ShiftexBD At A Glance
            </p>

            <h2 className="mt-3 text-4xl font-black text-[#03373d] md:text-5xl">
              Built around modern delivery needs
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="group rounded-3xl bg-white/80 p-7 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-2xl"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#03373d] text-2xl text-[#CAEB66] transition-transform duration-300 group-hover:rotate-6">
                  {stat.icon}
                </div>

                <h3 className="mt-5 text-4xl font-black text-[#03373d]">
                  {stat.value}
                </h3>

                <p className="mt-2 font-semibold text-gray-600">{stat.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-gray-50 px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-bold uppercase tracking-[0.2em] text-[#03373d]">
              Why ShiftexBD
            </span>

            <h2 className="mt-4 text-4xl font-black text-[#03373d] md:text-5xl">
              Everything you need for a smoother delivery experience
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              ShiftexBD brings essential parcel delivery features together in
              one modern platform, making the process easier for customers,
              riders and administrators.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[#CAEB66] hover:shadow-2xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#CAEB66] text-2xl text-[#03373d] transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                  {feature.icon}
                </div>

                <h3 className="mt-6 text-2xl font-black text-[#03373d]">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {feature.description}
                </p>

                {/* Learn More Button */}
                <button
                  onClick={() => setSelectedFeature(feature)}
                  className="group/btn relative mt-7 inline-flex items-center gap-3 overflow-hidden rounded-xl bg-[#03373d] px-5 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Animated Background */}
                  <span className="absolute inset-0 translate-y-full bg-[#CAEB66] transition-transform duration-300 ease-out group-hover/btn:translate-y-0"></span>

                  {/* Button Text */}
                  <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-[#03373d]">
                    Learn More
                  </span>

                  {/* Animated Arrow */}
                  <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[#CAEB66] text-[#03373d] transition-all duration-300 group-hover/btn:translate-x-1 group-hover/btn:rotate-[-45deg]">
                    <FaArrowRight className="text-xs" />
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <span className="font-bold uppercase tracking-[0.2em] text-[#03373d]">
                How It Works
              </span>

              <h2 className="mt-4 text-4xl font-black leading-tight text-[#03373d] md:text-5xl">
                From your hands to the destination
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                Our delivery workflow is designed to keep every important stage
                connected. Customers can create bookings, administrators can
                manage deliveries and riders can complete assigned tasks through
                a structured system.
              </p>

              <div className="mt-8 rounded-3xl bg-[#03373d] p-7 text-white shadow-xl">
                <FaStar className="text-3xl text-[#CAEB66]" />

                <p className="mt-4 text-lg font-semibold leading-8">
                  “A delivery platform should make sending a parcel feel
                  simple—not complicated.”
                </p>

                <p className="mt-4 text-sm text-gray-300">
                  — ShiftexBD approach
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="group flex gap-5 rounded-3xl border border-gray-200 bg-gray-50 p-6 transition-all duration-300 hover:-translate-x-2 hover:border-[#CAEB66] hover:bg-white hover:shadow-xl"
                >
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#03373d] text-2xl text-[#CAEB66] transition-transform duration-300 group-hover:scale-110">
                    {step.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-xl font-black text-[#03373d]">
                        {step.title}
                      </h3>

                      <span className="text-sm font-black text-[#03373d]/40">
                        {step.number}
                      </span>
                    </div>

                    <p className="mt-2 leading-7 text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROLES SECTION */}
      <section className="bg-[#03373d] px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="font-bold uppercase tracking-[0.2em] text-[#CAEB66]">
              One Platform
            </span>

            <h2 className="mt-4 text-4xl font-black text-white md:text-5xl">
              Designed for every part of the delivery journey
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-300">
              ShiftexBD brings different delivery roles together so that each
              person can focus on the part of the process that matters to them.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {/* Customers */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white/10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#CAEB66] text-3xl text-[#03373d]">
                <FaUsers />
              </div>

              <h3 className="mt-6 text-2xl font-black text-white">Customers</h3>

              <p className="mt-4 leading-7 text-gray-300">
                Book parcels, manage delivery information, make payments, track
                delivery progress and share feedback.
              </p>
            </div>

            {/* Administrators */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white/10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#CAEB66] text-3xl text-[#03373d]">
                <FaWarehouse />
              </div>

              <h3 className="mt-6 text-2xl font-black text-white">
                Administrators
              </h3>

              <p className="mt-4 leading-7 text-gray-300">
                Manage parcels, users, riders, warehouses and delivery
                operations through the administration system.
              </p>
            </div>

            {/* Riders */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white/10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#CAEB66] text-3xl text-[#03373d]">
                <FaTruck />
              </div>

              <h3 className="mt-6 text-2xl font-black text-white">Riders</h3>

              <p className="mt-4 leading-7 text-gray-300">
                Handle assigned deliveries, follow the delivery workflow and
                complete parcel handovers efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="bg-gradient-to-br from-gray-50 to-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#CAEB66] text-4xl text-[#03373d] shadow-lg">
            <FaBoxOpen />
          </div>

          <p className="mt-8 font-bold uppercase tracking-[0.2em] text-[#03373d]">
            Our Mission
          </p>

          <h2 className="mt-4 text-4xl font-black leading-tight text-[#03373d] md:text-6xl">
            Making parcel delivery simpler, safer and more connected.
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-gray-600">
            ShiftexBD aims to create a reliable digital delivery experience
            where customers can send parcels with confidence, riders can manage
            their responsibilities efficiently and administrators can keep the
            entire operation organized.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#03373d] to-[#075d66] px-8 py-16 shadow-2xl md:px-14">
          <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
            <div>
              <p className="font-bold uppercase tracking-[0.2em] text-[#CAEB66]">
                Ready to get started?
              </p>

              <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">
                Send your parcel with ShiftexBD
              </h2>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-300">
                Experience a simple and organized way to manage your parcel
                delivery journey.
              </p>
            </div>

            <a
              href="/"
              className="group inline-flex shrink-0 items-center gap-3 rounded-xl bg-[#CAEB66] px-8 py-4 font-black text-[#03373d] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              Get Started
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-2" />
            </a>
          </div>
        </div>
      </section>

      {/* FEATURE DETAILS MODAL */}
      {selectedFeature && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 px-5 backdrop-blur-sm"
          onClick={() => setSelectedFeature(null)}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#03373d] px-7 py-7 md:px-9">
              <div className="flex items-start justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#CAEB66] text-2xl text-[#03373d]">
                    {selectedFeature.icon}
                  </div>

                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-[#CAEB66]">
                      ShiftexBD Feature
                    </p>

                    <h3 className="mt-1 text-2xl font-black text-white md:text-3xl">
                      {selectedFeature.title}
                    </h3>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-xl font-bold text-white transition-all duration-300 hover:rotate-90 hover:bg-[#CAEB66] hover:text-[#03373d]"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="px-7 py-8 md:px-9 md:py-10">
              <p className="text-lg leading-8 text-gray-600">
                {selectedFeature.details}
              </p>

              <div className="mt-7 rounded-2xl border border-[#CAEB66]/40 bg-[#CAEB66]/10 p-5">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#CAEB66] text-[#03373d]">
                    <FaCheckCircle />
                  </div>

                  <div>
                    <h4 className="font-black text-[#03373d]">
                      ShiftexBD Approach
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      We keep the delivery process simple, organized and
                      connected for customers, administrators and riders.
                    </p>
                  </div>
                </div>
              </div>

              {/* Close Details Button */}
              <button
                onClick={() => setSelectedFeature(null)}
                className="mt-7 w-full rounded-xl bg-[#03373d] px-6 py-4 font-bold text-white transition-all duration-300 hover:bg-[#CAEB66] hover:text-[#03373d]"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUs;
