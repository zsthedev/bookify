import React from 'react';
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Badge,
  Spinner,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { bookingSchema } from '../../schemas';
import { useDispatch, useSelector } from 'react-redux';
import { clearStore, createBooking } from '../../redux/slices/User';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import CreateCustomDeal from './createCustomDeal';
import { format, isBefore, isToday } from 'date-fns';

// Let's define form initial values for formik here

const initialValues = {
  date: '', // Modified initial value for date
  timeSlot: 0,
  dealId: 0,
  noPersons: 50,
  themeColor: '',
  photographer: '',
  caterer: '',
};

const CreateBooking = ({ handleModal }) => {
  const [totalPrice, setTotalPrice] = React.useState(0);
  const user = useSelector((state) => state.userReducer.user);
  const loading = useSelector((state) => state.userReducer.loading);
  const photographers = useSelector((state) => state.userReducer.photographers);
  const caterers = useSelector((state) => state.userReducer.caterers);
  const deals = useSelector((state) => state.dealsReducer.data);
  const [isCustomDeal, setIsCustomDeal] = React.useState(false);
  const handleCustomDealModal = () => setIsCustomDeal((prev) => !prev);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // initializing formik for form validations
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: bookingSchema,
    onSubmit: (values, action) => {
      // prepare payload

      const payload = {
        userId: user?._id,
        date: new Date(values.date), // Convert to date object
        timeSlot: Number.parseInt(values.timeSlot),
        dealId: Number.parseInt(values.dealId),
        noPersons: values.noPersons,
        themeColor: values.themeColor,
        totalPrice: totalPrice,
      };
      dispatch(createBooking(payload))
        .unwrap()
        .then(() => {
          toast.success('Booking Created Successfully.');
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

  const { errors, touched, handleBlur, handleSubmit } = formik;

  const customHandler = (event) => {
    const { name, value } = event.target;
    if (name === 'dealId') {
      const dealChoosen = Number.parseInt(value);
      if (dealChoosen !== 0) {
        setTotalPrice(
          formik.values.noPersons * deals[dealChoosen - 1].dealPrice
        );
      }
    }
    if (name === 'noPersons') {
      const dealChoosen = Number.parseInt(formik.values.dealId);
      setTotalPrice(Number.parseInt(value) * deals[dealChoosen - 1].dealPrice);
    }
    if (name === 'caterer' || name === 'photographer') {
      if (value.includes('-')) {
        const serviceCharges = value.split('-')[1];
        setTotalPrice((price) => price + parseInt(serviceCharges));
      } else {
        setTotalPrice(
          (price) => price - parseInt(formik.values[name].split('-')[1])
        );
      }
    }
    if (name === 'date') {
      const selectedDate = new Date(value);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1); // Get tomorrow's date

      if (isBefore(selectedDate, tomorrow) || isToday(selectedDate)) {
        return; // Return early if the selected date is before tomorrow or today
      }
    }
    formik.handleChange(event);
  };

  return (
    <Container className="h-100">
      <Row className="align-items-center no-gutters h-100">
        <Col
          className="my-2"
          xs={12}
          sm={12}
          md={totalPrice ? 6 : 12}
          lg={totalPrice ? 6 : 12}
        >
          {isCustomDeal ? (
            <Modal
              show={isCustomDeal}
              handleModal={handleCustomDealModal}
              title="Create Custom Deal"
            >
              <CreateCustomDeal handleModal={handleCustomDealModal} />
            </Modal>
          ) : (
            <>
              {/* Custom Deal Button */}
              <Container className="d-flex justify-content-end">
                <Button variant="warning" onClick={() => setIsCustomDeal(true)}>
                  Create Custom Deal
                </Button>
              </Container>
              <Form onSubmit={handleSubmit} className="w-100">
                {/* Date Field */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Choose Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formik.values.date}
                    onChange={customHandler}
                    onBlur={handleBlur}
                  />
                  {errors.date && touched.date ? (
                    <Form.Text className="text-danger">{errors.date}</Form.Text>
                  ) : null}
                </Form.Group>

                {/* Time Slot field */}
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Choose Time Slot</Form.Label>
                  <Form.Select
                    value={formik.values.timeSlot}
                    aria-label="Choose Time Slots"
                    onChange={customHandler}
                    onBlur={handleBlur}
                    name="timeSlot"
                  >
                    <option value={0}>Choose Timeslot</option>
                    <option value={1}>12am to 3pm</option>
                    <option value={2}>7pm to 11pm</option>
                  </Form.Select>
                  {errors.timeSlot && touched.timeSlot ? (
                    <Form.Text className="text-danger">
                      {errors.timeSlot}
                    </Form.Text>
                  ) : null}
                </Form.Group>

                {/* Selecting Deal Field */}
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Choose Deal</Form.Label>
                  <Form.Select
                    value={formik.values.dealId}
                    aria-label="Choose Deals"
                    onChange={customHandler}
                    onBlur={handleBlur}
                    name="dealId"
                  >
                    <option value={0}>Choose Deal</option>
                    {deals.map((deal, index) => (
                      <option
                        key={index}
                        value={index + 1}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={`${deal.dealName} - ${
                          deal.dealPrice
                        }Rs [${deal.dealItems.map((item) => item.dishName)}]`}
                      >
                        {`${deal.dealName} - Rs ${deal.dealPrice}`}
                      </option>
                    ))}
                  </Form.Select>
                  {errors.dealId && touched.dealId ? (
                    <Form.Text className="text-danger">
                      {errors.dealId}
                    </Form.Text>
                  ) : null}
                </Form.Group>

                {/* No of Guests Fields */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Enter total number of persons</Form.Label>
                  <Form.Control
                    type="number"
                    name="noPersons"
                    min={50}
                    value={formik.values.noPersons}
                    onChange={customHandler}
                    onBlur={handleBlur}
                  />
                  {errors.noPersons && touched.noPersons ? (
                    <Form.Text className="text-danger">
                      {errors.noPersons}
                    </Form.Text>
                  ) : null}
                </Form.Group>

                {/* Theme Color Field */}
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Choose Theme Color</Form.Label>
                  <Form.Select
                    value={formik.values.themeColor}
                    aria-label="Choose Theme Color"
                    onChange={customHandler}
                    onBlur={handleBlur}
                    name="themeColor"
                  >
                    <option>Choose Theme Color</option>
                    <option value="primary">Blue</option>
                    <option value="warning">Orange</option>
                    <option value="Secondary">Custom Colors</option>
                  </Form.Select>
                  {errors.themeColor && touched.themeColor ? (
                    <Form.Text className="text-danger">
                      {errors.themeColor}
                    </Form.Text>
                  ) : null}
                </Form.Group>
                {/* Choose Photographer Field */}
                {photographers.length > 0 && (
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Choose Photographer</Form.Label>
                    <Form.Select
                      value={formik.values.photographer}
                      aria-label="Choose Photographer"
                      onChange={customHandler}
                      onBlur={handleBlur}
                      name="photographer"
                    >
                      <option value="">Choose Photographer</option>
                      {photographers?.map((photographer, idx) => (
                        <option
                          value={`${photographer?.userName}-${photographer?.serviceCharges}`}
                          key={idx}
                        >
                          {photographer?.userName} - Rs {photographer?.serviceCharges}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.photographer && touched.photographer ? (
                      <Form.Text className="text-danger">
                        {errors.photographer}
                      </Form.Text>
                    ) : null}
                  </Form.Group>
                )}
                {/* Choose Caterer Field */}
                {caterers.length > 0 && (
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Choose Caterer</Form.Label>
                    <Form.Select
                      value={formik.values.caterer}
                      aria-label="Choose Caterer"
                      onChange={customHandler}
                      onBlur={handleBlur}
                      name="caterer"
                    >
                      <option value="">Choose Caterer</option>
                      {caterers?.map((caterer, idx) => (
                        <option
                          value={`${caterer?.userName}-${caterer?.serviceCharges}`}
                          key={idx}
                        >
                          {caterer?.userName} - Rs {caterer?.serviceCharges}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.caterer && touched.caterer ? (
                      <Form.Text className="text-danger">
                        {errors.caterer}
                      </Form.Text>
                    ) : null}
                  </Form.Group>
                )}

                {/* Custom Deal Modal */}

                {/* Button */}
                <Container className="text-center text-md-left text-lg-left">
                  <Button variant="warning" type="submit">
                    Book
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
            </>
          )}
        </Col>
        {totalPrice !== 0 && (
          <Col className="my-2" xs={12} sm={12} md={6} lg={6}>
          <div className="d-flex flex-column">
              <p className="fs-4">
                Total Price: <Badge bg="warning">{`${totalPrice} Rs/-`}</Badge>
              </p>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default CreateBooking;
