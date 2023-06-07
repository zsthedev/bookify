import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const useAuth = () => {
  const user = useSelector((state) => state.userReducer.user);
  const location = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (Object.keys(user).length === 0) {
      if (location.pathname !== '/register') navigate('/login');
    } else navigate(location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
export default useAuth;
