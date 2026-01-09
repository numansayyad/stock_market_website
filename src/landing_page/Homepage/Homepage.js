import React from 'react';
import Awards from './Awards';
import Hero from './Hero';
import Stats from './Stats';
import Pricing from './Pricing';
import Education from './Education';
import Openaccount from '../../Openaccount';
import Navbar from '../../Navbar';
import Footer from '../../Footer';

function Homepage() {
    return (
        <>
            <Navbar/>
            <Hero />
            <Awards />
            <Stats/>
            <Pricing/>
            <Education/>
            <Openaccount/>
        </>
    );
}

export default Homepage;