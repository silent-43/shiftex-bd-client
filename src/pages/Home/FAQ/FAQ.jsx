import { useState } from "react";
import { FiChevronDown, FiArrowUpRight } from "react-icons/fi";

const faqData = [
  {
    question: "How can I book a parcel with ShiftexBD?",
    answer:
      "Booking a parcel with ShiftexBD is simple and convenient. You need to provide the pickup location, delivery address, parcel type, weight, and other required information. After confirming your booking, your parcel request will be processed and you will receive a unique tracking ID that you can use to monitor your delivery status.",
  },
  {
    question: "How can I track my parcel?",
    answer:
      "You can easily track your parcel using the unique tracking ID provided after completing your booking. Enter the tracking ID in the ShiftexBD tracking system to view the current delivery status. This allows you to follow your parcel from the pickup stage until it reaches the destination.",
  },
  {
    question: "How much does parcel delivery cost?",
    answer:
      "The delivery cost depends on several factors, including the parcel type, weight, pickup location, and delivery destination. ShiftexBD offers affordable delivery options for both within-city and nationwide services. The final delivery charge will be calculated based on the details provided during the parcel booking process.",
  },
  {
    question: "Is Cash on Delivery (COD) available?",
    answer:
      "Yes, ShiftexBD supports Cash on Delivery for eligible deliveries. With this service, customers can receive their parcel and pay the required amount at the time of delivery. COD availability and applicable charges may depend on the delivery type and booking details.",
  },
  {
    question: "How long does it take to deliver a parcel?",
    answer:
      "Delivery time depends on the pickup and destination locations, parcel type, and delivery route. Within-city deliveries are generally completed faster, while nationwide deliveries may require additional time depending on the destination. You can use your tracking ID to monitor the progress of your parcel throughout the delivery process.",
  },
  {
    question: "What happens if my parcel cannot be delivered?",
    answer:
      "If a parcel cannot be delivered due to an incorrect address, unavailable recipient, or another delivery issue, the parcel status will be updated accordingly. ShiftexBD will take the necessary steps based on the delivery situation, and customers can contact the support team for assistance and further information about their parcel.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="relative overflow-hidden rounded-2xl mb-20 bg-[#eef6f8] px-4 py-10 sm:px-6 lg:px-10 shadow-[0_-10px_20px_rgba(0,0,0,0.15),0_10px_20px_rgba(0,0,0,0.15)]">
      {/* Main Content */}
      <div className="relative mx-auto max-w-[805px]">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#172f36] sm:text-4xl">
            Frequently Asked Questions (FAQ)
          </h2>

          <p className="mx-auto mt-4 max-w-[650px] text-sm leading-5 text-[#777277] sm:text-[13px]">
            Get quick answers to common questions about parcel booking,
            delivery, tracking, pricing, and Cash on Delivery with ShiftexBD. We
            are here to make your delivery experience simple, secure, and
            convenient.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? "border-[#57909a] bg-white shadow-sm"
                    : "border-transparent bg-white/80"
                }`}
              >
                {/* Question */}
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  className="flex min-h-[64px] w-full items-center justify-between px-4 py-3 text-left sm:px-5"
                >
                  <span className="text-[13px] font-semibold text-[#17333b]">
                    {faq.question}
                  </span>

                  <FiChevronDown
                    className={`ml-4 shrink-0 text-xl text-[#57909a] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Answer */}
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5">
                    <p className="max-w-[730px] text-[13px] leading-6 text-[#66777c]">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Button */}
        <div className="mt-8 flex justify-center">
          <button type="button" className="group flex items-center">
            <span className="rounded-l-xl bg-[#57909a] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 group-hover:bg-[#467d86]">
              See More FAQs
            </span>

            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#17333b] text-white transition-transform duration-300 group-hover:rotate-45">
              <FiArrowUpRight size={21} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
