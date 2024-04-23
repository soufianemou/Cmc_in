import { useSelector } from "react-redux";

const useIsAuthenticated = (givenRole) => {
  const { user,token, role } = useSelector((data) => data.auth);
  let isAuthenticated  =  token ? true : false
  if (role) {
    isAuthenticated = (user?.role === givenRole || role === givenRole) && token !== null;
  }
  return isAuthenticated ;
};
export default useIsAuthenticated 