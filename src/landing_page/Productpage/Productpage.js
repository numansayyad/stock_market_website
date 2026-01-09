import React from "react";

import Hero from "./Hero";
import LeftSection from "./Leftpage"; 
import Rightpage from "./Rightpage";
import ApiSection from "./ApiSection";
import VarsitySection from "./VarsitySection";
import Universe from "./Universe";
import CoinSection from "./coinSection";

function Productpage() {
  return (
    <div style={{ paddingTop: "120px" }}>
      <Hero />

      <LeftSection
        imageURL="media/kite.png"
        productName="Kite"
        productDescription="Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices."
        tryDemo="#"
        learnMore="#"
        googlePlay="#"
        appStore="#"
      />

<Rightpage
  imageURL="media/console-app.png"
  productName="Console"
  productDescription="The central dashboard for your Zerodha account. Gain insights into your trades and investments with in-depth reports and visualisations."
  learnMore="#"
/>

<CoinSection
  imageURL="media/coin.png"
  productName="Coin"
  productDescription="Buy direct mutual funds online, commission-free..."
  learnMore="#"
  googlePlay="#"
  appStore="#"
/>

<ApiSection
  imageURL="/media/api.svg"         // <-- put your actual API image here
  productName="Kite Connect API"
  productDescription="Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase."
  learnMore="#"
/>

<VarsitySection
  imageURL="/media/varsity.svg"
  productName="Varsity mobile"
  productDescription="An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go."
  googlePlay="#"
  appStore="#"
/>
      <Universe />
    </div>
  );
}

export default Productpage;
