import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useLoaderData } from "react-router";
import { FiMapPin, FiSearch, FiNavigation } from "react-icons/fi";
import "leaflet/dist/leaflet.css";

const Coverage = () => {
  const position = [23.685, 90.3563];

  const serviceCenterData = useLoaderData();

  const mapRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();

    const location = e.target.location.value.trim();

    if (!location) return;

    const district = serviceCenterData.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase()),
    );

    if (district) {
      const coordinate = [district.latitude, district.longitude];

      mapRef.current.flyTo(coordinate, 12, {
        duration: 1.5,
      });
    }
  };

  return (
    <section className="bg-base-200 px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl">
        {/* ================= Heading ================= */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Small Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 text-sm font-semibold text-secondary">
            <FiMapPin className="text-lg" />
            Nationwide Coverage
          </div>

          <h1 className="text-3xl font-bold leading-tight text-secondary sm:text-4xl lg:text-5xl">
            We Are Available in{" "}
            <span className="text-secondary">64 Districts</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Find our service centers across Bangladesh and explore the areas
            covered by ShiftexBD. Search for your district to quickly locate the
            nearest service area.
          </p>
        </div>

        {/* ================= Search Box ================= */}
        <div className="mx-auto mt-8 max-w-2xl">
          <form
            onSubmit={handleSearch}
            className="rounded-2xl bg-white p-2 shadow-md ring-1 ring-gray-200"
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              {/* Input */}
              <div className="flex flex-1 items-center gap-3 rounded-xl bg-base-200 px-4 py-3 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary">
                <FiSearch className="shrink-0 text-xl text-gray-400" />

                <input
                  type="search"
                  name="location"
                  placeholder="Search your district..."
                  className="w-full bg-transparent text-sm text-secondary outline-none placeholder:text-gray-400"
                />
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="btn min-h-[48px] rounded-xl border-none bg-secondary px-7 text-white hover:bg-secondary/90"
              >
                <FiSearch className="text-lg" />
                Search
              </button>
            </div>
          </form>

          {/* Search Hint */}
          <p className="mt-3 text-center text-xs text-gray-400">
            Try searching for Dhaka, Chittagong, Sylhet, Rajshahi or any
            district name.
          </p>
        </div>

        {/* ================= Map ================= */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-gray-200 bg-white p-2 shadow-lg sm:p-3 lg:mt-12">
          <div className="relative overflow-hidden rounded-2xl">
            {/* Map Label */}
            <div className="absolute left-4 top-4 z-[1000]">
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary shadow-md">
                <FiNavigation className="text-primary" />
                Service Centers
              </div>
            </div>

            <MapContainer
              center={position}
              zoom={8}
              scrollWheelZoom={false}
              className="h-[500px] w-full sm:h-[600px] lg:h-[700px]"
              ref={mapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {serviceCenterData.map((center, index) => (
                <Marker
                  key={index}
                  position={[center.latitude, center.longitude]}
                >
                  <Popup>
                    <div className="min-w-[180px]">
                      <h3 className="text-base font-bold text-secondary">
                        {center.district}
                      </h3>

                      <div className="my-2 border-t border-gray-200"></div>

                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Service Areas:</span>
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {center.covered_area.join(", ")}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* ================= Bottom Info ================= */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl bg-secondary px-6 py-5 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="font-bold text-white">
              Delivering Across Bangladesh
            </h3>

            <p className="mt-1 text-sm text-gray-300">
              Our growing service network helps us reach customers nationwide.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-secondary">
            <FiMapPin />
            64 Districts Covered
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coverage;
