import React from 'react';

function Hero() {
    return (
        <div class="container p-5">
            <div class="row text-center">
                <div class="col">
                <img src= 'media/homehero.png' alt='heroimage'className='mb-5' style={{width:"90%"}}/>
                <h1>Invest in everything</h1>
                <p>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>
                <button className="p-2 btn btn-primary fs-5 mb-5"style={{width:"50%",margin:" 0 auto"}}>Sign up Now</button>
                </div>
                </div>
            </div>

    );
}

export default Hero;