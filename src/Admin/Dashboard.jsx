import React, { useEffect, useState } from 'react';
import { GalleryVertical, Users } from 'lucide-react';
import { Card } from '../Components/UI/Card';
import axios from 'axios';

export default function AdminDashboard() {
    const [staff, setStaff] = useState([]);
    const [gallery, setGallery] = useState([])
    const [events, setEvents] = useState([]);
    const [admin, setAdmin] = useState([]);
    const [students, setStudents] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [pending, setPending] = useState([]);
    const [reviewedBlogs, setReviewedBlogs] = useState([]);
    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URI}/api/staffs`);
                setStaff(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchStaff();
    }, []);

    useEffect(() => {
        const fetchRBlogs = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URI}/api/blogs/reviewed`);
                setReviewedBlogs(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchRBlogs();
    }, []);


    useEffect(() => {
        const blogsFetch = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URI}/api/blogs`);
                setBlogs(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        blogsFetch();
    }, []);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URI}/api/gallery`);
                setGallery(response.data.galleries);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchGallery();
    }, []);

    useEffect(()=>{
        const fetchAdmin = async ()=> {
            try{
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URI}/api/admins`);
                setAdmin(response.data);
            }
        catch(error){
            console.error("Error fetching data:", error);
        }

    };

    fetchAdmin();
    }, [])

    useEffect(()=>{
        const fetchEvent = async ()=> {
            try{
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URI}/api/events`);
                setEvents(response.data);
            }
        catch(error){
            console.error("Error fetching data:", error);
        }

    };

    fetchEvent();
    }, [])

    useEffect(()=>{
        const fetchStudents = async ()=> {
            try{
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URI}/api/students`);
                setStudents(response.data);
            }
        catch(error){
            console.error("Error fetching data:", error);
        }

    };

    fetchStudents();
    }, [])

    useEffect(() => {
        const pending = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URI}/api/blogs/pending`);
                setPending(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        pending();
    }, []);

    const studentCount = students.length;
    const eventCount = events.length;
    const reviewedBlogCount = reviewedBlogs.length; // This will log the count every time the state updates
    const adminCount = admin.length;
    const blogCount = blogs.length; // This will log the count every time the state updates
    const staffCount = staff.length;
    const pendingCount = pending.length;
    console.log(staffCount); // This will log the count every time the state updates

    const galleryCount = gallery.length;
    console.log(galleryCount); // This will log the count every time the state updates
    return (
        <div className="space-y-6 w-full">
            <h1 className="text-3xl font-semibold text-center">Dashboard</h1>
            <div className="flex flex-wrap justify-center w-full gap-5">
                <Card
                    title="Staff Members"
                    value={staffCount} // Displaying the staff count dynamically
                    icon={<Users />}

                    color="blue"
                    trend="up"
                />
                <Card
                    title="Photos uploaded"
                    value={galleryCount} // Displaying the staff count dynamically
                    icon={<GalleryVertical/>}
                    trend="up"
                />
                <Card
                    title="Upcoming Events"
                    value={eventCount} // Displaying the staff count dynamically
                    icon={<Users />}
                    trend="up"
                />
                <Card
                    title="Total Students"
                    value={studentCount} // Displaying the staff count dynamically
                    icon={<Users />}
                    trend="up"
                />
                <Card
                    title="Total Administrators"
                    value={adminCount} // Displaying the staff count dynamically
                    icon={<Users />}
                    trend="up"
                />

                <Card
                    title="Reviewed Blogs"
                    value={reviewedBlogCount} // Displaying the staff count dynamically
                    icon={<Users />}
                    trend="up"
                />
                <Card
                    title="Total Blogs"
                    value={blogCount} // Displaying the staff count dynamically
                    icon={<Users />}
                    trend="up"
                />
                <Card
                    title="Pending Blogs"
                    value={pendingCount} // Displaying the staff count dynamically
                    icon={<Users />}
                    trend="up"
                    />

            </div>
        </div>
    );
}
