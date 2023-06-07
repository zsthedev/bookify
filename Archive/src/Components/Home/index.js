import React, { useState } from 'react';
import { Container, Card, Badge } from 'react-bootstrap';
import customers from '../../db/mock_customers';
import OwlCarousel from 'react-owl-carousel';
import { FaArrowUp } from 'react-icons/fa';
import { ContactUs } from '../';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchDeals } from '../../redux/slices/Deals';
import { fetchDishes } from '../../redux/slices/Dishes';
import DEALS from '../Booking/deals';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './index.css';

const carouselOptions = {
  items: 3,
  loop: true,
  margin: 10,
  autoplay: true,
  autoplayTimeout: 2000,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 1,
    },
    576: {
      items: 2,
    },
    768: {
      items: 3,
    },
    992: {
      items: 3,
    },
  },
};

const Home = () => {
  const dispatch = useDispatch();

  // State for showing/hiding the arrow button
  const [showArrowButton, setShowArrowButton] = useState(false);

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Check if the user has scrolled enough to show/hide the arrow button
  const handleScroll = () => {
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    setShowArrowButton(scrollPosition > windowHeight);
  };

  // Fetch Deals here
  React.useEffect(() => {
    dispatch(fetchDeals())
      .unwrap()
      .catch((err) => {
        toast.error(err);
      });
  }, [dispatch]);

  // Fetch Dishes here
  React.useEffect(() => {
    dispatch(fetchDishes())
      .unwrap()
      .catch((err) => {
        toast.error(err);
      });
  }, [dispatch]);

  // Add scroll event listener
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div>
      {/* Hero Section */}
      <div className="position-relative hero-section">
        <img src="./images/hall_5.jpg" className="img-fluid" alt="" />
        <p className="fs-1 position-absolute text-white top-50  px-4">
          Bookify{' '}
          <span className="fs-6 d-none d-sm-none d-md-block w-50">
            Host your dream event with our expert hall management services. We
            take care of every detail, from decor to cuisine, so you can relax
            and enjoy your special day. Let us help you create unforgettable
            memories.
          </span>
          <span className="fs-6 d-block d-sm-block d-md-none w-100 w-sm-70 w-md-50 w-lg-50">
            Create unforgettable events with our expert hall management services.
          </span>
        </p>
      </div>

      {/* Deals Section */}
      <Container className="text-center my-2">
        <p className="fs-2">Our Deals</p>
        <OwlCarousel className="owl-theme" {...carouselOptions}>
          {DEALS.map((deal, index) => (
            <div key={index} className="mb-2">
              <Card>
                <Card.Img
                  variant="top"
                  src={deal.image}
                  className="position-relative"
                />
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute"
                  style={{ top: 0, right: 0 }}
                >
                  {deal.Text}
                  {deal.price}
                </Badge>
                <Card.Body>
                  <Card.Title>{deal.dealName}</Card.Title>
                  <div className="w-100 mw-100">
                    {deal.dishes.map((item, index) => (
                      <Badge
                        key={index}
                        pill
                        bg="secondary"
                        style={{ maxWidth: '100%', textOverflow: 'ellipsis' }}
                        className="px-2"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </OwlCarousel>
      </Container>
       {/* Theme Images Section */}
       <Container className="text-center my-3">
        <p className="fs-2">Theme Options</p>
        <OwlCarousel className="owl-theme" {...carouselOptions}>
          {/* Add your theme images */}
          <div className="mb-2">
            <Card>
              <Card.Img variant="top" src="./images/hall_1.jpg" />
              <Card.Body>
                {/* Add any additional information or content here */}
                <span style={{fontWeight:'bold',fontFamily:'sans-serif'}}>Orange</span>
              </Card.Body>
            </Card>
          </div>
          <div className="mb-2">
            <Card>
              <Card.Img variant="top" src="./images/hall_2.jpg" style={{ width: 'fixed', height: '242px' }}/>
              <Card.Body>
              <span style={{fontWeight:'bold',fontFamily:'sans-serif'}}>Blue</span>
              </Card.Body>
            </Card>
          </div>
          <div className="mb-2">
            <Card>
              <Card.Img variant="top" src="./images/hall_5.jpg" />
              <Card.Body>
              <span style={{fontWeight:'bold',fontFamily:'sans-serif'}}>Custom Colors</span>
              </Card.Body>
            </Card>
          </div>
          {/* Add more theme images */}
        </OwlCarousel>
      </Container>
      {/* About Us Section */}
      <Container className="text-center my-2" id="aboutUs">
        <p className="fs-2">About Us</p>
        <p style={{ textAlign: 'justify' }}>
          We are dedicated to providing you with the best experience in finding
          and booking the perfect event venue. Our platform connects you with a
          vast network of halls and event spaces across the country, ensuring
          that you find the perfect venue that meets your specific requirements.
          Our team is comprised of experienced professionals who are passionate
          about delivering exceptional customer service. We understand that
          finding the perfect event venue can be overwhelming, and we are here
          to make the process as easy and seamless as possible. From small
          meetings to large corporate events, weddings, and other social
          gatherings, we have the expertise to help you find the ideal venue for
          your event. At our Hall Booking website, we are committed to providing
          you with a personalized experience that caters to your individual
          needs. Our platform features a wide range of halls and event spaces,
          each with its unique features and amenities, ensuring that you have a
          variety of options to choose from. We also provide you with all the
          necessary information you need to make an informed decision, such as
          pricing, availability, and photos of the venue. We value our customers
          and are committed to providing the highest level of service possible.
          Whether you are a first-time user or a seasoned event planner, we are
          here to help you every step of the way. Our goal is to ensure that
          your event is a success and that you have a positive experience with
          our platform. Thank you for choosing our Hall Booking website. We look
          forward to helping you find the perfect venue for your next event!
        </p>
      </Container>

      {/* Customers Section */}
      <Container className="text-center my-2">
        <p className="fs-2">Our Customers</p>
        <OwlCarousel className="owl-theme" {...carouselOptions}>
          {customers.map((customer, index) => (
            <div key={index} className="mb-2">
              <Card>
                <Card.Body>
                  <div className="d-flex w-100 align-items-center justify-content-around">
                    <div style={{ width: '70px', height: '70px' }}>
                      <img
                        src={customer.image}
                        className="avatar"
                        alt="Customer"
                      />
                    </div>
                    <div>
                      <p>
                        {customer.name}{' '}
                        <span className="d-block">
                          {Array.from(
                            Array(Math.round(customer.rating)).keys()
                          ).map((val, idx) => (
                            <span key={idx} className="text-warning">
                              <i className="fa-solid fa-star"></i>
                            </span>
                          ))}
                        </span>
                        <span className="">
                          {`${customer.description.substring(0, 50)}...`}
                        </span>
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </OwlCarousel>
      </Container>

      {/* Contact Us Section */}
      <ContactUs />
      {showArrowButton && (
        <div className="arrow-up-button" onClick={scrollToTop}>
          <FaArrowUp />
        </div>
      )}
    </div>
  );
};

export default Home;
