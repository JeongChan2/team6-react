import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { authActions } from '../../redux/reducers/authenticateSlice';

const AfterLoginRedirectPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    localStorage.setItem("code", code);
    
    dispatch(authActions.LoginSuccess({id: "", nickname: ""}));
    navigate("/");
  }, [dispatch, location.search, navigate]);

  return (
    <div>
      Loading
    </div>
  );
};

export default AfterLoginRedirectPage;
