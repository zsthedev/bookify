import React from 'react';
import Table from '../Table';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Spinner, Badge } from 'react-bootstrap';
import Modal from './Modal';
import CreateBooking from './CreateBooking';

import {
  findBookings,
  clearStore,
  getPhotographers,
  getCaterers,
  makePayment,
} from '../../redux/slices/User';
import StripeCheckoutButton from '../../Services/Stripe';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Bookings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userReducer.user);
  const loading = useSelector((state) => state.userReducer.loading);

  // For Handling Create booking Modal
  const [show, setShow] = React.useState(false);
  const handleModal = () => setShow((prev) => !prev);

  /**
   * Fetching bookings data from store and defining columns to display table
   */
  const BOOKINGS = useSelector((state) => state.userReducer.bookings);
  const COLUMNS = [
    {
      Header: 'ID',
      accessor: '_id',
    },
    {
      Header: 'User Name',
      accessor: 'user.userName',
    },
    {
      Header: 'Email',
      accessor: 'user.email',
    },
    {
      Header: 'Date',
      accessor: 'date',
      Cell: ({ value }) => new Date(value).toISOString().slice(0, 10),
    },
    {
      Header: 'No# Persons',
      accessor: 'noPersons',
    },
    {
      Header: 'Deal Id',
      accessor: 'deal',
    },
    {
      Header: 'Total Price',
      accessor: 'totalPrice',
    },
    {
      Header: 'Status',
      accessor: 'isBooked',
      Cell: ({ value }) => (
        <Badge bg={value ? 'secondary' : 'danger'}>
          {value ? 'Accepted' : 'Pending'}
        </Badge>
      ),
    },
    {
      Header: 'Operations',
      accessor: 'operations',
      Cell: ({ row }) => {
        const { _id, isBooked, totalPrice } = row.values;
        const handlePayment = () => {
          dispatch(makePayment({ bookingID: _id }))
            .unwrap()
            .then((response) => {
              toast.success(response.message);
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
        };

        const handleViewReport = () => {
          // Add your code here to generate and display the receipt of the booking details
          // You can access the booking details using the row.values object
          console.log('Viewing report for booking:', row.values);
        };

        return (
          <>
            {isBooked ? (
              <>
                <Button variant="success" disabled>
                  Paid
                </Button>
                <Button variant="primary" onClick={handleViewReport}>
                  View Report
                </Button>
              </>
            ) : (
              <>
                <StripeCheckoutButton
                  amt={parseInt(totalPrice)}
                  bookingID={_id}
                  handlePayment={handlePayment}
                />
              </>
            )}
          </>
        );
      },
    },
  ];

  /**
   * Fetching Data from api
   */
  React.useEffect(() => {
    dispatch(findBookings(user?._id))
      .unwrap()
      .catch((err) => {
        err?.response?.data.errors.map((err) => {
          if (err === 'Your session has been expired.') {
            dispatch(clearStore());
            navigate('/login');
          }
          return toast.error(err);
        });
      });
  }, []);

  /**
   * Fetching Photographers Data
   */
  React.useEffect(() => {
    dispatch(getPhotographers())
      .unwrap()
      .catch((err) => {
        err?.response?.data.errors.map((err) => {
          if (err === 'Your session has been expired.') {
            dispatch(clearStore());
            navigate('/login');
          }
          return toast.error(err);
        });
      });
  }, []);

  /**
   * Fetching Caterers Data
   */
  React.useEffect(() => {
    dispatch(getCaterers())
      .unwrap()
      .catch((err) => {
        err?.response?.data.errors.map((err) => {
          if (err === 'Your session has been expired.') {
            dispatch(clearStore());
            navigate('/login');
          }
          return toast.error(err);
        });
      });
  }, []);

  if (loading)
    return (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <Spinner />
      </div>
    );

  return (
    <div className="my-2">
      <Container className="text-end">
        <Button variant="warning" className="text-center" onClick={handleModal}>
          Create Booking
        </Button>
      </Container>
      <Table COLUMNS={COLUMNS} DATA={BOOKINGS} />
      {show && (
        <Modal show={show} handleModal={handleModal} title="Create Booking">
          <CreateBooking handleModal={handleModal} />
        </Modal>
      )}
    </div>
  );
};

export default Bookings;
