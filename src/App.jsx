import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RootComp from "./Root/RootComp";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Login from "./Admin/Login";
import AdminPageLayout from "./Admin/Admin-Panel/AdminPageLayout";
import Dashboard from "./Admin/Dashboard";
import AdminHandling from "./Admin/Admin-Panel/AdminHandeling";
import Gallery from "./Admin/AdminGallery";
import GalleryContainer from "./Pages/GalleryContainer";
import StaffMngmt from "./Admin/StaffList";
import StaffList from "./Admin/StaffList";
import StaffManagement from "./Admin/StaffList";
import StaffsContainer from "./Pages/StaffsContainer";
import Events from "./Admin/AdminEvents";
import AdminEvents from "./Admin/AdminEvents";
import AdminStudents from "./Admin/AdminStudents";
import StudentCardAccess from "./Components/StudentCardAccess";
import BlogCreator from "./Pages/BlogCreator";
import ReviewedBlogs from "./Admin/reviewedBlogs";
import PendingBlog from "./Admin/pendingBlogs";
import Blogs from "./Pages/Blogs";
import IndividualBlogs from "./Pages/IndividualBlogs";
import About from "./Pages/About";
import AdmissionInquiryForm from "./Components/AdmissionInquiryForm";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootComp />, // Wraps Navbar, Footer, and renders children using <Outlet>
      children: [
        {
          path: "/", // Default route
          element: <Home />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
            path: "gallery",
            element: <GalleryContainer/>
        },
        {
            path: "staff",
            element: <StaffsContainer/>
        },
        {
            path: "students-card",
            element: <StudentCardAccess/>
        },
        {
            path: "blogs/create-new",
            element: <BlogCreator/>,
        },
        {
            path: "blogs",
            element: <Blogs/>,
        },
        {
            path: "blogs/:_id",
            element: <IndividualBlogs/>
        },
        {
            path: "about",
            element: <About/>,
        },
        {
          path: "admission/inquiry",
          element: <AdmissionInquiryForm/>
        }

      ],
    },
    {
      path: "/admin",
      element: <AdminPageLayout/>,
      children: [
        {
            path: "", // Admin panel route
            element: <Dashboard/>

        },
    {
        path: "dashboard", // Admin panel route
        element: <Dashboard/>,

      },
      {
        path: "settings", // Admin panel route
        element: <AdminHandling/>,
      },
      {
        path : "gallery",
        element: <Gallery/>
      },
      {
        path: "staff",
        element: <StaffManagement/>
      },
      {
        path: "events",
        element: <AdminEvents/>
      },
      {
        path: "students",
        element: <AdminStudents/>
      },
      {
        path: "blogs/reviewed",
        element: <ReviewedBlogs/>
      },
      {
        path: "blogs/pending",
        element: <PendingBlog/>,
      }



      ],
    },
    {
      path: "admin/login",
      element: <Login />,
    },

  ]);

  return <RouterProvider router={router} />;
}
