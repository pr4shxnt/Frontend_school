import React, { useState, useEffect } from "react";

const AdminEvents = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        location: "",
        category: "",
        image: null,
    });

    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URI}/api/events`);
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error("Failed to fetch events:", error);
        }
    };

    const openCreateModal = () => {
        setFormData({
            title: "",
            description: "",
            date: "",
            location: "",
            category: "",
            image: null,
        });
        setIsCreateModalOpen(true);
    };

    const openEditModal = (event) => {
        setSelectedEvent(event);
        setFormData({
            title: event.title,
            description: event.description,
            date: new Date(event.date).toISOString().split("T")[0],
            location: event.location,
            category: event.category,
            image: null,
        });
        setIsEditModalOpen(true);
    };

    const closeModals = () => {
        setIsCreateModalOpen(false);
        setIsEditModalOpen(false);
        setSelectedEvent(null);
        setFormData({
            title: "",
            description: "",
            date: "",
            location: "",
            category: "",
            image: null,
        });
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        });
    };

    const handleSave = async () => {
        try {
            const formattedDate = new Date(formData.date).toISOString().split("T")[0];
            const eventFormData = new FormData();
            eventFormData.append("title", formData.title);
            eventFormData.append("description", formData.description);
            eventFormData.append("date", formattedDate);
            eventFormData.append("location", formData.location);
            eventFormData.append("category", formData.category);

            if (formData.image) {
                eventFormData.append("image", formData.image);
            }

            if (selectedEvent) {
                await fetch(`${import.meta.env.VITE_BACKEND_API_URI}/api/events/${selectedEvent._id}`, {
                    method: "PUT",
                    body: eventFormData,
                });
            } else {
                await fetch(`${import.meta.env.VITE_BACKEND_API_URI}/api/events/create`, {
                    method: "POST",
                    body: eventFormData,
                });
            }

            getEvents();
            closeModals();
        } catch (error) {
            console.error("Failed to save event:", error);
        }
    };

    const handleDelete = async (eventId) => {
        try {
            await fetch(`${import.meta.env.VITE_BACKEND_API_URI}/api/events/${eventId}`, {
                method: "DELETE",
            });
            getEvents();
        } catch (error) {
            console.error("Failed to delete event:", error);
        }
    };

    return (
        <div className="md:p-8 w-full flex flex-col items-center">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Event Management</h1>

            <button
                onClick={openCreateModal}
                className="mb-6 px-6 py-3 md:w-1/2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
                Create New Event
            </button>

            <div className="grid grid-cols-1 w-full justify-start sm:grid-cols-2 md:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div
                        key={event._id}
                        className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition"
                    >
                        <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                        <p className="text-gray-700 mt-2">{event.description}</p>
                        <p className="text-gray-600 mt-2">
                            Date: {new Date(event.date).toLocaleDateString("en-CA")}
                        </p>
                        <p className="text-gray-600">Location: {event.location}</p>
                        <p className="text-gray-600">Category: {event.category}</p>
                        <div className="mt-4 flex justify-between items-center">
                            <button
                                onClick={() => openEditModal(event)}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                Edit
                            </button>
                            <button
    onClick={() => {
        setSelectedEvent(event);  // Set the selected event
        setIsDeleteModalOpen(true); // Open the delete modal
    }}
    className="text-red-600 hover:text-red-800"
>
    Delete
</button>

                        </div>
                    </div>
                ))}
            </div>

            {/* Create Modal */}
            {isCreateModalOpen && (
                <EventModal
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleFileChange={handleFileChange}
                    handleSave={handleSave}
                    closeModal={closeModals}
                    title="Create Event"
                    isEditMode={false}
                />
            )}

{isDeleteModalOpen && selectedEvent && (
    <div className="">
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white rounded-xl p-6 flex flex-col gap-6">
                <div className="text-center">
                    <h2 className="text-xl text-gray-800">
                        Are you sure you want to delete this event?
                    </h2>
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={() => {
                            handleDelete(selectedEvent._id);
                            setIsDeleteModalOpen(false);
                        }}
                        className="bg-red-500 py-2 px-6 text-white rounded-lg"
                    >
                        Yes, Delete
                    </button>
                    <button
                        onClick={() => { setIsDeleteModalOpen(false); }}
                        className="bg-green-500 px-6 py-2 text-white rounded-lg"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    </div>
)}


            {/* Edit Modal */}
            {isEditModalOpen && (
                <EventModal
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleFileChange={handleFileChange}
                    handleSave={handleSave}
                    closeModal={closeModals}
                    title="Edit Event"
                    isEditMode={true}
                />
            )}
        </div>
    );
};

const EventModal = ({
    formData,
    handleInputChange,
    handleFileChange,
    handleSave,
    closeModal,
    title,
    isEditMode,
}) => (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg w-full max-w-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">{title}</h2>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Event Title"
                className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Event Description"
                className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
             <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Event Location"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
            {/* Only show Date and Category for Create Modal */}
            {!isEditMode && (
                <>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />

                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        placeholder="Event Category"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </>
            )}
            {/* File Input */}
            {!isEditMode && (
                <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
            )}
            <div className="flex justify-between">
                <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
                >
                    Save
                </button>
                <button
                    onClick={closeModal}
                    className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition"
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
);

export default AdminEvents;
