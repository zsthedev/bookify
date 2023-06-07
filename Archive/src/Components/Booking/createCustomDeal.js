import React from 'react';
import { Button, Form, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import { dealsSchema } from '../../schemas';
import { useDispatch, useSelector } from 'react-redux';
import { clearStore } from '../../redux/slices/User';
import { createCustomDeal } from '../../redux/slices/Deals';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-tagsinput/react-tagsinput.css';
import { generateRandomName } from '../../utils';

// Let's define form initial values for formik here

const initialValues = {
  dealName: '',
  dealPrice: 0,
  dealItems: [],
  dishIds: [],
};

const CreateCustomDeal = ({ handleModal }) => {
  const user = useSelector((state) => state.userReducer.user);
  const loading = useSelector((state) => state.userReducer.loading);
  const dishes = useSelector((state) => state.dishReducer.data);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // initializing formik for form validations
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: dealsSchema,
    onSubmit: (values, action) => {
      // prepare payload

      const payload = {
        user: user?._id,
        dealName: values.dealName,
        dealPrice: values.dealPrice,
        dealItems: values.dishIds,
      };
      dispatch(createCustomDeal(payload))
        .unwrap()
        .then(() => {
          toast.success('Deal Created Succssfully.');
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

  // This function is for handing dishes
  const handleTagChange = (tags) => {
    let totalPrice = tags.reduce((accumulator, currentValue) => {
      return accumulator + Number.parseFloat(currentValue.split('-')[1]);
    }, 0);
    formik.setFieldValue('dealItems', tags);
    formik.setFieldValue(
      'dishIds',
      tags.map((tag) => tag.split('-')[2])
    );
    formik.setFieldValue('dealPrice', totalPrice.toFixed(2));
  };

  // this function is for handling random name generation
  const handleName = () => {
    formik.setFieldValue('dealName', generateRandomName());
  };

  const { errors, touched, handleBlur, handleChange, handleSubmit } = formik;

  return (
    <Container className="h-100">
      <Row className="align-items-center no-gutters h-100">
        <Col className="my-2" xs={12} sm={12}>
          <Form onSubmit={handleSubmit} className="w-100">
            {/* Deal Name Field */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Deal Name</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    name="dealName"
                    value={formik.values.dealName || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Col>
                <Col>
                  <Button onClick={handleName}>Generate Random Name</Button>
                </Col>
              </Row>
              {errors.dealName && touched.dealName ? (
                <Form.Text className="text-danger">{errors.dealName}</Form.Text>
              ) : null}
            </Form.Group>

            {/* Deal Price Field */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Deal Price</Form.Label>
              <Form.Control
                type="number"
                name="dealPrice"
                value={formik.values.dealPrice || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled
              />
              {errors.dealPrice && touched.dealPrice ? (
                <Form.Text className="text-danger">
                  {errors.dealPrice}
                </Form.Text>
              ) : null}
            </Form.Group>

            {/* Selecting Deal Field */}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Choose Dishes</Form.Label>
              {dishes.map((dish, index) => (
                <Form.Check
                  key={index}
                  type="checkbox"
                  label={`${dish.dishName} - Rs-${dish.dishPrice}`}
                  name="dealItems"
                  value={`${dish.dishName}-${dish.dishPrice}-${dish._id}`}
                  onChange={(e) => {
                    const tags = Array.from(
                      e.target.form.querySelectorAll(
                        'input[name="dealItems"]:checked'
                      ),
                      (input) => input.value
                    );
                    handleTagChange(tags);
                  }}
                />
              ))}
              {errors.dealItems && touched.dealItems ? (
                <Form.Text className="text-danger">
                  {errors.dealItems}
                </Form.Text>
              ) : null}
            </Form.Group>

            {/* Button */}
            <Container className="text-center text-md-left text-lg-left">
              <Button variant="warning" type="submit">
                Create
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
      </Row>
    </Container>
  );
};

export default CreateCustomDeal;
