import React from 'react';
import { Button, Form, Container, InputGroup, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useFormik } from 'formik';
import { updateUserSchema } from '../../../schemas';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { updateUser, clearStore } from '../../../redux/slices/Admin';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Let's define form initial values for formik here

const UpdateUser = ({ handleModal }) => {
  const [showPassword, setShowPassword] = React.useState(false); // for showing/hiding password

  const userDetails = useSelector((state) => state.adminReducer.foundedUser);

  const loading = useSelector((state) => state.userReducer.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // let's define initial values for formik form
  const initialValues = {
    userName: userDetails?.userName || '',
    email: userDetails?.email || '',
    password: '',
    confirmPassword: '',
    role: userDetails?.role || 'default',
    yearOfExperience: userDetails?.yearOfExperience || 0,
    serviceCharges: userDetails?.serviceCharges || 0,
  };

  // initializing formik for form validations
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: updateUserSchema,
      onSubmit: (values, action) => {
        const payload =
          values.role === 'default'
            ? {
                id: userDetails?._id,
                userName: values.userName,
                email: values.email,
                password: values.password,
              }
            : {
                id: userDetails?._id,
                userName: values.userName,
                email: values.email,
                password: values.password,
                role: values.role,
                yearOfExperience: Number.parseInt(values.yearOfExperience),
                serviceCharges: Number.parseInt(values.serviceCharges),
              };

        const updateUserPromise = dispatch(updateUser(payload));
        updateUserPromise
          .unwrap()
          .then(() => {
            toast.success('Updated Successfully');
            action.resetForm();
            handleModal();
          })
          .catch((err) => {
            err?.response?.data.errors.map((err) => {
              if (err === 'Your session has been expired.') {
                dispatch(clearStore());
                navigate('/login');
              }
              return toast.error(err);
            });
          });
      },
    });

  return (
    <Container className="h-100 ">
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

        {/* Role Field */}
        <Form.Group className="mb-3" controlId="role">
          <Form.Label>Choose Role</Form.Label>
          <Form.Select
            value={values.role}
            aria-label="Choose Role"
            onChange={handleChange}
            onBlur={handleBlur}
            name="role"
          >
            <option value="">Select Role</option>
            <option value="default">Default</option>
            <option value="photographer">Photographer</option>
            <option value="caterer">Caterer</option>
          </Form.Select>
          {errors.role && touched.role ? (
            <Form.Text className="text-danger">{errors.role}</Form.Text>
          ) : null}
        </Form.Group>

        {values.role === 'photographer' || values.role === 'caterer' ? (
          <>
            {/* year of experience Field */}
            <Form.Group className="mb-3" controlId="yearOfExperience">
              <Form.Label>Year of Experience</Form.Label>
              <Form.Control
                placeholder="Enter experience"
                name="yearOfExperience"
                value={values.yearOfExperience}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.yearOfExperience && touched.yearOfExperience ? (
                <Form.Text className="text-danger">
                  {errors.yearOfExperience}
                </Form.Text>
              ) : null}
            </Form.Group>
            {/* Service Charges Field */}
            <Form.Group className="mb-3" controlId="serviceCharges">
              <Form.Label>Service Charges</Form.Label>
              <Form.Control
                placeholder="Enter service charges"
                name="serviceCharges"
                value={values.serviceCharges}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.serviceCharges && touched.serviceCharges ? (
                <Form.Text className="text-danger">
                  {errors.serviceCharges}
                </Form.Text>
              ) : null}
            </Form.Group>
          </>
        ) : null}

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
              disabled={true}
            />

            <InputGroup.Text onClick={() => setShowPassword((prev) => !prev)}>
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
              disabled={true}
            />
            <InputGroup.Text onClick={() => setShowPassword((prev) => !prev)}>
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
            Update
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
    </Container>
  );
};

export default UpdateUser;
