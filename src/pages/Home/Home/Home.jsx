import React from "react";
import Banner from "../Banner/Banner";
import CardSection from "../CardSection/CardSection";
import BigSectionCard from "../BigSectionCard/BigSectionCard";
import Brands from "../Brands/Brands";
import VerticalSectionCard from "../VerticalSectionCard/VerticalSectionCard";
import Reviews from "../Reviews/Reviews";
import MerchantCustomerSection from "../MerchantCustomerSection/MerchantCustomerSection";
import FAQ from "../FAQ/FAQ";

const reviewsPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <CardSection></CardSection>
      <BigSectionCard></BigSectionCard>
      <Brands></Brands>
      <VerticalSectionCard></VerticalSectionCard>
      <MerchantCustomerSection></MerchantCustomerSection>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
      <FAQ></FAQ>
    </div>
  );
};

export default Home;
