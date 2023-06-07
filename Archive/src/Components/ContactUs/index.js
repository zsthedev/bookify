import React from 'react';
import { Button, Form, Container, Spinner, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import { contactUsSchema } from '../../schemas';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import './index1.css';

const initialValues = {
  name: '',
  email: '',
  query: '',
};

const ContactUs = () => {
  const loading = useSelector((state) => state.userReducer.loading);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: contactUsSchema,

      onSubmit: (values, action) => {
        toast.success("Thanks for contacting us. We'll get back to you soon");
        action.resetForm();
      },
    });

  return (
    <Container
      className="my-2 d-flex justify-content-center align-items-center"
      id="contactUs"
      style={{ paddingBottom: '6rem', zIndex: 999, maxWidth: '900px' }}
    >
      <Row>
        <Col md={6}>
          <Form onSubmit={handleSubmit} className="mb-4">
            <p className="fs-2 font-roboto text-center">Contact Us</p>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name ? (
                <Form.Text className="text-danger">{errors.name}</Form.Text>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email ? (
                <Form.Text className="text-danger">{errors.email}</Form.Text>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Enter your query here</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                placeholder="Enter query here"
                name="query"
                value={values.query}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.query && touched.query ? (
                <Form.Text className="text-danger">{errors.query}</Form.Text>
              ) : null}
            </Form.Group>

            <Container className="text-center text-md-left">
              <Button variant="warning" type="submit">
                Submit Query
                {loading && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}
              </Button>
            </Container>
          </Form>
        </Col>

        <Col md={6}>
          <div className="map-container" style={{ marginLeft: "70px", marginTop: "40px" }}>
            <a href="https://www.google.com/maps/place/Wah+Continental+Hotel/@33.7984009,72.7125702,15z/data=!4m6!3m5!1s0x38dfa7f8d55ae023:0x5f80067262694568!8m2!3d33.7984009!4d72.7125702!16s%2Fg%2F1trxc1zr?hl=en"
              target="_blank" rel="noopener noreferrer">
              <img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjGAhwPyBjm1W8CNYH4_tWpeWjkiiO497iBeYcn8rGt8N4gS8QWdQD11QXaRxa1WxC13uyEEYdgKqNuZ9e3_F2r2TaU7dLgdhragdPEkFt6m-Yu1HpgiYavju-JZZ5lpaGx6a7rRrneKguLCmtfKMXCmoDd4_gP2FQruVedEXNKkcfAgS3KKszklIcz/s600/Wah_Cantonment.png"
                alt="map"
                style={{ borderRadius: "10px" }}
              />
            </a>
          </div>

        </Col>

      </Row>
    </Container >
  );
};

export default ContactUs;
