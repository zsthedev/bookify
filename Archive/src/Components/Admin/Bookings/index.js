import React from 'react';
import Table from '../../Table';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Spinner, Badge } from 'react-bootstrap';
import Modal from '../../Modals';
import CreateBooking from '../../Booking/CreateBooking';
import {
  getBookings,
  clearStore,
  deleteBooking,
} from '../../../redux/slices/Admin';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { acceptBooking } from '../../../redux/slices/Admin';
import useAuth from '../../../hooks/useAuth';

const Bookings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userReducer.user);
  const loading = useSelector((state) => state.userReducer.loading);

  // For Handling Create booking Modal
  const [show, setShow] = React.useState(false);
  const handleModal = () => setShow((prev) => !prev);

  // Operations Handlers
  const handleAccept = (id) => {
    dispatch(acceptBooking(id))
      .then((res) => {
        console.log(res);
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

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete?');
    if (confirmDelete) {
      dispatch(deleteBooking(id))
        .then((res) => {
          console.log(res);
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
    }
  };

  /**
   * Fetching bookings data from store and defining columns to display table
   */
  const BOOKINGS = useSelector((state) => state.adminReducer.bookings);
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
      Cell: ({ value }) => <span>Rs-{value}</span>,
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
      Cell: ({ row }) => (
        <div className="d-flex justify-content-around">
          <Button
            variant="success"
            onClick={() => handleAccept(row.values?._id)}
            disabled={row.values?.isBooked}
          >
            <i className="fa-solid fa-square-check"></i>
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDelete(row.values?._id)}
          >
            <i className="fa-solid fa-xmark"></i>
          </Button>
        </div>
      ),
    },
  ];

  /**
   * Fetching Data from api
   */

  React.useEffect(() => {
    dispatch(getBookings(user?._id))
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useAuth();
  if (loading) return <Spinner />;
  return (
    <div className="my-2">
      <Container className="text-end">
        <Button
          variant="warning"
          className="text-center"
          onClick={handleModal}
          disabled={user?.role === 'admin'}
        >
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
