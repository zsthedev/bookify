import React from 'react';
import Table from '../../Table';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Spinner } from 'react-bootstrap';
import Modal from '../../Modals';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';

import {
  getUsers,
  clearStore,
  deleteUser,
  findUser,
} from '../../../redux/slices/Admin';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //const user = useSelector((state) => state.userReducer.user);
  const loading = useSelector((state) => state.userReducer.loading);

  // For Handling Create booking Modal
  const [show, setShow] = React.useState(false);
  const [updateModal, setUpdateModal] = React.useState(false);
  const handleModal = () => setShow((prev) => !prev);

  // handle user Deletion
  const handleDelete = (id) => {
    dispatch(deleteUser(id))
      .unwrap()
      .then((res) => toast.success('Deleted Successfully'))
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

  // Handle user update
  const handleUpdate = (id) => {
    // Dispatch findUserApi
    dispatch(findUser(id))
      .then(() => {
        setUpdateModal(true);
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

  /**
   * Fetching bookings data from store and defining columns to display table
   */
  const USERS = useSelector((state) => state.adminReducer.users);
  const COLUMNS = [
    {
      Header: 'ID',
      accessor: '_id',
    },
    {
      Header: 'Profile',
      accessor: 'profileImageUrl',
      Cell: ({ value }) => (
        <img
          src={value}
          alt="Profile"
          className="thumbnail roundedCircle"
          style={{ width: '50px', height: '50px' }}
        />
      ),
    },
    {
      Header: 'User Name',
      accessor: 'userName',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },

    {
      Header: 'Operations',
      Cell: ({ row }) => (
        <div className="d-flex justify-content-around">
          <Button
            variant="secondary"
            onClick={() => handleUpdate(row.values._id)}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </Button>
          <Button variant="danger" onClick={() => handleDelete(row.values._id)}>
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
    dispatch(getUsers())
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
        <Button variant="warning" className="text-center" onClick={handleModal}>
          Create User
        </Button>
      </Container>
      <Table COLUMNS={COLUMNS} DATA={USERS} />
      {show && (
        <Modal show={show} handleModal={handleModal} title="Create User">
          <CreateUser handleModal={handleModal} />
        </Modal>
      )}
      {updateModal && (
        <Modal
          show={updateModal}
          handleModal={() => setUpdateModal(false)}
          title="Update User"
        >
          <UpdateUser handleModal={() => setUpdateModal(false)} />
        </Modal>
      )}
    </div>
  );
};

export default Users;
