import React from "react";
import './Footer.css'
import footer from '../../assets/images/footer.png';

export const Footer = () => {
    return (
        <div className={'footer'}>
            <img src={footer} alt={''} />
        </div>
    )
}