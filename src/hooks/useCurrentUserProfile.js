import { useQuery } from "@tanstack/react-query"
import api from '../utils/api';

const fetchCurrentUserProfile=()=>{
  return api.get(`/me`);
}

export const useCurrentUserProfileQuery=() => {
  return useQuery({
    queryKey:['current-user-profile'],
    queryFn: () => fetchCurrentUserProfile(),
    select:(result)=>result.data,
  })
}

