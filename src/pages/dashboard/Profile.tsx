import React, { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { TUser } from "@/types";

const Profile = () => {
    // Extract user from the Redux store
    const user = useAppSelector((state) => state.auth.user as TUser | null);

    // State for modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Handle delete profile
    const handleDeleteProfile = () => {
        console.log("Profile Deleted"); // Replace with your delete logic
        setIsModalOpen(false);
    };

    return (
        <div className="container mx-auto">
            {/* Profile Header */}
            <div className="bg-amber-950 bg-opacity-85 text-amber-50 p-5 mt-6 rounded-md shadow-lg flex items-center gap-6">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    className="w-24 h-24 rounded-full object-cover"
                    alt="User Profile"
                />
                {user ? (
                    <div>
                        <h1 className="text-2xl font-semibold">{user.name}</h1>
                        <p className="text-lg">{user.email}</p>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-2xl font-semibold">Guest</h1>
                        <p className="text-lg">No user information available</p>
                    </div>
                )}
            </div>

            {/* Two-Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Form Section */}
                {user && (
                    <form className="bg-white p-6 rounded-md shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

                        {/* Name Field */}
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                defaultValue={user.name}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-400"
                            />
                        </div>

                        {/* Email Field */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                defaultValue={user.email}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-400"
                            />
                        </div>

                        {/* Phone Field */}
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-gray-700 mb-2">
                                Phone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                defaultValue={user.phone || ""}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-400"
                            />
                        </div>

                        {/* NID Field */}
                        <div className="mb-4">
                            <label htmlFor="nid" className="block text-gray-700 mb-2">
                                National ID (NID)
                            </label>
                            <input
                                type="text"
                                id="nid"
                                defaultValue={user.nid || ""}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-400"
                            />
                        </div>

                        {/* Driving License Field */}
                        <div className="mb-4">
                            <label htmlFor="drivingLicense" className="block text-gray-700 mb-2">
                                Driving License
                            </label>
                            <input
                                type="text"
                                id="drivingLicense"
                                defaultValue={user.drivingLicense || ""}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-amber-400"
                            />
                        </div>

                        {/* Save Button */}
                        <button
                            type="submit"
                            className="w-full bg-amber-700 hover:bg-amber-800 text-white py-2 px-4 rounded transition duration-200"
                        >
                            Save Changes
                        </button>

                        {/* Delete Profile Button */}
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-200"
                        >
                            Delete Profile
                        </button>
                    </form>
                )}

                {/* Summary Section */}
                <div className="bg-gray-50 p-6 rounded-md shadow-md">
                    <h2 className="text-xl font-semibold mb-4">User Information</h2>
                    {user ? (
                        <div className="space-y-4">
                            <p>
                                <span className="font-semibold">Name:</span> {user.name}
                            </p>
                            <p>
                                <span className="font-semibold">Email:</span> {user.email}
                            </p>
                            <p>
                                <span className="font-semibold">Phone:</span> {user.phone || "Not provided"}
                            </p>
                            <p>
                                <span className="font-semibold">NID:</span> {user.nid || "Not provided"}
                            </p>
                            <p>
                                <span className="font-semibold">Driving License:</span>{" "}
                                {user.drivingLicense || "Not provided"}
                            </p>
                        </div>
                    ) : (
                        <p>No user data available to display.</p>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">
                            Confirm Deletion
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete your profile? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteProfile}
                                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
