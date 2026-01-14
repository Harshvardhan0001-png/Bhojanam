import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
        <div className="logo">Bhoja<span>Nam</span></div>
           <p>Bhojanam is built for people who value good food and great convenience. From everyday comfort meals to special treats, Bhojanam connects you with trusted kitchens and restaurants, delivering fresh, flavorful dishes straight to your home. With a focus on quality, speed, and reliability, Bhojanam makes every meal effortless and enjoyable.</p>
           <div className="footer-social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><img src={assets.facebook_icon} alt="" /></a>
            <a href="https://www.linkedin.com/in/harshvardhan-dubey-68b711328/" target="_blank" rel="noopener noreferrer"> <img src={assets.linkedin_icon} alt="" /></a>
            
           
            
           </div>
        </div>
        <div className="footer-content-center">
             <h2>COMPANY</h2>
             <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
             </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-434-234-97593</li>
            <li>contact@Bhojanam.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2025 &copy; Bhojanam.com - All rights are reserved.
      </p>
    </div>
  )
}

export default Footer
