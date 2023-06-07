import React from 'react';
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  InputGroup,
  Spinner,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useFormik } from 'formik';
import { loginSchema } from '../../schemas';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/slices/User';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';

// Let's define form initial values for formik here

const initialValues = {
  email: '',
  password: '',
};

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false); // for showing/hiding password
  const loading = useSelector((state) => state.userReducer.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // initializing formik for form validations
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,

      // Let's handle form Submission
      onSubmit: (values, action) => {
        dispatch(login(values))
          .unwrap()
          .then((res) => {
            toast.success('Logged in Successfully.');
            // Let's store access Token in local Storage
            localStorage.setItem('accessToken', res.accessToken);
            // Clearing Form State
            action.resetForm();
            // Navigating to Home Page
            navigate('/');
          })
          .catch((err) => {
            err?.response?.data.errors.map((err) => toast.error(err));
          });
      },
    });

  // calling our authorization hook
  useAuth();
  return (
    <Container className="h-100 d-flex justify-content-center align-items-center">
      <Row className="align-items-center no-gutters h-100">
        <Col className="my-2" xs={12} sm={12} md={6} lg={6}>
          <p className="fs-1 font-roboto text-center">Login</p>
          <Form onSubmit={handleSubmit} className="w-100">
            {/* email field */}
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
            {/* Password field */}
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <InputGroup.Text
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <FontAwesomeIcon icon={icon({ name: 'eye' })} />
                  ) : (
                    <FontAwesomeIcon icon={icon({ name: 'eye-slash' })} />
                  )}
                </InputGroup.Text>
              </InputGroup>
              {errors.password && touched.password ? (
                <Form.Text className="text-danger">{errors.password}</Form.Text>
              ) : null}
            </Form.Group>
            {/* Button */}
            <Container className="text-center text-md-left text-lg-left">
              <Button variant="warning" type="submit">
                Login
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
        {/* Displaying our vector image */}
        <Col
          md={6}
          lg={6}
          className="d-none d-md-block d-lg-block justify-content-end"
        >
          <LazyLoadImage
            src="/vector2.jpg"
            alt="Login SVG"
            effect="blur"
            width={500}
            height={500}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
