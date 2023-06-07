import { Button } from 'react-bootstrap';
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { clearStore, makePayment } from '../../redux/slices/User';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const StripeCheckoutButton = ({ amt, bookingID, isBooked }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
  const onToken = async (token) => {
    const payload = { token, amount: amt, bookingID };
    dispatch(makePayment(payload))
      .unwrap()
      .then(() => toast.success('payment successfull'))
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

  return (
    <StripeCheckout
      label="Pay Now"
      name="Bookify"
      billingAddress
      shippingAddress
      description="Online Hall Booking Platform Solution"
      
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
      disabled={isBooked}
    >
      <Button className="w-100" variant="secondary" disabled={isBooked}>
        Pay Now
      </Button>
    </StripeCheckout>
  );
};

export default StripeCheckoutButton;
