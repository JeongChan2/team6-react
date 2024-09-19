import React, { useEffect } from 'react'
import { useCurrentUserProfileQuery } from '../../hooks/useCurrentUserProfile';
import { useDispatch } from 'react-redux';
import { authActions } from '../../redux/reducers/authenticateSlice';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data,
    isLoading,
    isError,
    error,
  } = useCurrentUserProfileQuery();

  console.log(data);
  
  
  return (
    <div>
      {data.display_name}
    </div>
  )
}

export default UserPage
