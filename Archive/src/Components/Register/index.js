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
import { registerSchema } from '../../schemas';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../../redux/slices/User';
import 'react-lazy-load-image-component/src/effects/blur.css';
import useAuth from '../../hooks/useAuth';

// Let's define form initial values for formik here

const initialValues = {
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Register = () => {
  const [showPassword, setShowPassword] = React.useState(false); // for showing/hiding password

  const loading = useSelector((state) => state.userReducer.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // initializing formik for form validations
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: registerSchema,
      onSubmit: (values, action) => {
        const { userName, email, password } = values;
        const registerPromise = dispatch(
          register({ userName, email, password })
        );
        registerPromise
          .unwrap()
          .then(() => {
            toast.success('Registered Successfully');
            navigate('/');
            action.resetForm();
          })
          .catch((error) => {
            error.response.data.errors.map((err) => toast.error(err));
          });
      },
    });

  // Calling our authorization hook
  useAuth();
  return (
    <Container className="h-100 d-flex justify-content-center align-items-center">
      <Row className="align-items-center no-gutter h-100">
        <Col className="my-2" xs={12} sm={12} md={6} lg={6}>
          <p className="fs-1 font-roboto text-center">Register</p>
          <Form onSubmit={handleSubmit}>
            {/* User Name Field here */}
            <Form.Group className="mb-3" controlId="userName">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                placeholder="Enter username"
                name="userName"
                value={values.userName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.userName && touched.userName ? (
                <Form.Text className="text-danger">{errors.userName}</Form.Text>
              ) : null}
            </Form.Group>
            {/* Email Field Here */}
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

            {/* Password & Confirm Password */}
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

            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={values.confirmPassword}
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
              {errors.confirmPassword && touched.confirmPassword ? (
                <Form.Text className="text-danger">
                  {errors.confirmPassword}
                </Form.Text>
              ) : null}
            </Form.Group>

            {/* Form Submission */}
            <Container className="text-center text-md-left text-lg-left">
              <Button variant="warning" type="submit">
                Register
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
        {/* Displaying our vector image here */}
        <Col md={6} lg={6} className="d-none d-md-block d-lg-block">
          <LazyLoadImage
            src="/vector1.jpg"
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

export default Register;
