import React from 'react'
import { assets } from '../../assets/assets'
import {faXTwitter,faFacebookF,faLinkedinIn} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.footer} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum in, beatae dolorem non optio cupiditate, quam sunt dicta dolores minima exercitationem ducimus totam aut asperiores inventore harum laudantium. Distinctio, libero.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" className='footer-img'/>
                    <img src={assets.twitter_icon} alt="" className='footer-img'/>
                    <img src={assets.linkedin_icon} alt="" className='footer-img'/>
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
                    <li>+93 456465558</li>
                    <li>randomperson@gmail.com</li>
                </ul>
            </div>
           
        </div>
        <hr />
        <p className="footer-copyright">
            Copyright 2024 &copy; randomerson - All Right Reserved.
        </p>
    </div>
  )
}

export default Footer