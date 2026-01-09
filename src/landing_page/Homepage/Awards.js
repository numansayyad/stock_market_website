import React from 'react';

function Awards() {
  return (
    <div className="container mt-5 mb-5">
      <div className="row align-items-center">

        {/* LEFT IMAGE */}
        <div className="col-md-6 text-center mb-4 p-5">
          <img 
            src="media/largestBroker.svg" 
            alt="Largest Broker"
            className="img-fluid"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="col-md-6 p-5 mt-3">

          <h1>Largest stock broker in India</h1>

          <p className='mb-5'>
            2+ million Zerodha clients contribute to over 15% of all retail
            order volumes in India daily by trading and investing in:
          </p>

          {/* LIST ROW */}
          <div className="row">

            <div className="col-6">
              <ul>
                <li>Futures and Options</li>
                <li>Commodity derivatives</li>
                <li>Currency derivatives</li>
              </ul>
            </div>

            <div className="col-6">
              <ul>
                <li>Stocks & IPOs</li>
                <li>Direct mutual funds</li>
                <li>Bonds and Govt. securities</li>
              </ul>
            </div>

          </div>

          {/* PRESS LOGOS */}
          <img 
            src="media/pressLogos.png"
            alt="Press Logos"
            className="img-fluid mt-4"
            style={{width:"90%"}}
          />

        </div>
      </div>
    </div>
  );
}

export default Awards;

