import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Menu } from 'lucide-react';
import {jwtDecode} from 'jwt-decode'; // Correct default import

const AdminPageLayout = () => {
  const [isToggled, setIsToggled] = useState(false);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem('token');

    if (!token) {

      // If no token, user is not authenticated
      setIsAuthenticated(false); 

      // Redirect to login page if not authenticated
      navigate('/admin/login'); 
    } else {


      try {

        
        // Decode the token (assuming it's a JWT)
        const decodedToken = jwtDecode(token);




        // Check if the token has expired
        if (decodedToken.exp * 1000 < Date.now()) {

          // If expired, log out the user
          setIsAuthenticated(false); 

          // Optionally remove the expired token
          localStorage.removeItem('token'); 

           // Redirect to login page if token is expired
          navigate('/admin/login');
        } else {

           // Set authentication status if token is valid
          setIsAuthenticated(true);
        }
      } catch (error) {

        // If there's any error decoding the token, treat it as invalid
        setIsAuthenticated(false); 

         // Optionally remove the invalid token
        localStorage.removeItem('token');

        // Redirect to login page if token is invalid
        navigate('/admin/login'); 
      }
    }
  }, [navigate]);

  // Return nothing or show a loading state if authentication is still being checked
  if (isAuthenticated === false) {
    return null; // or a loading spinner could be returned while the auth check happens
  }

  return (
    <div className="relative">
      <div className="flex gap-3 md:m-4">
        <div
          onClick={() => {
            setIsToggled(!isToggled);
          }}
          className={`${isToggled ? 'hidden' : 'fixed'} md:hidden opacity-50 bg-gray-700 p-1 rounded-full`}
        >
          <Menu />
        </div>
        <div className="absolute md:relative">
          <AdminSidebar isToggled={isToggled} setIsToggled={setIsToggled} />
        </div>
        <div className="p-4 w-full md:p-0">
        <Outlet /></div>
      </div>
    </div>
  );
};

export default AdminPageLayout;
