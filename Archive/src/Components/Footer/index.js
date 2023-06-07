import React from 'react';
import { Container } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => (
  <footer
    className="pt-3 pb-1 bg-dark text-white position-fixed bottom-0 w-100"
    style={{
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      color: 'white',
      zIndex: 1
    }}
  >
    <Container className="d-flex justify-content-between align-items-center" style={{fontSize: '0.8rem'}}>
      <div className="small text-muted ">
        Designed by Team1
        <span className="mx-2">|</span>
        © 2023 Bookify.com. All rights reserved.
        <hr className="bg-white" />
      </div>
      <div>
        <a href="http://www.facebook.com" className="text-white mx-2">
          <FaFacebookF size={15} />
        </a>
        <a href="http://www.twitter.com" className="text-white mx-2">
          <FaTwitter size={15} />
        </a>
        <a href="http://www.instagram.com" className="text-white mx-2">
          <FaInstagram size={15} />
        </a>
        <span className="mx-2">|</span>
        Phone: (051) 4622300
        <hr className="bg-white" />
      </div>
      
    </Container>
  </footer>
);

export default Footer;
