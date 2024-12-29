import { useAppSelector } from "@/redux/hooks";
import { TUser } from "@/types";
import { useState, useEffect } from "react";

const DashboardOverview = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const user = useAppSelector((state) => state.auth.user as TUser | null);

    // Update current time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="container mx-auto min-h-screen px-6 py-8 bg-gray-100">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white shadow-md p-4 rounded-md">
                {/* Greeting Message */}
                <div className="text-2xl font-semibold text-gray-800">
                    Welcome, {user?.name || "Guest"}!
                </div>
                {/* User Profile Info */}

            </div>

            {/* Date & Time Display */}
            <div className="text-center text-lg text-gray-600 mb-8">
                {currentTime.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}{" "}
                - {currentTime.toLocaleTimeString()}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-4 rounded-md shadow hover:shadow-lg cursor-pointer">
                    <div className="text-lg font-semibold text-blue-600">My Tasks</div>
                    <div className="text-gray-500 text-sm">View and manage your tasks</div>
                </div>
                <div className="bg-white p-4 rounded-md shadow hover:shadow-lg cursor-pointer">
                    <div className="text-lg font-semibold text-green-600">Upcoming Events</div>
                    <div className="text-gray-500 text-sm">Check your upcoming events</div>
                </div>
                <div className="bg-white p-4 rounded-md shadow hover:shadow-lg cursor-pointer">
                    <div className="text-lg font-semibold text-purple-600">Notifications</div>
                    <div className="text-gray-500 text-sm">View new notifications</div>
                </div>
                <div className="bg-white p-4 rounded-md shadow hover:shadow-lg cursor-pointer">
                    <div className="text-lg font-semibold text-red-600">Support</div>
                    <div className="text-gray-500 text-sm">Contact support or view FAQs</div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-md shadow-md">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
                <ul className="list-disc list-inside text-gray-600">
                    <li>Completed "Task A" on 17th June, 2024</li>
                    <li>Attended "Team Meeting" on 16th June, 2024</li>
                    <li>Uploaded new document: "Report.pdf"</li>
                    <li>Updated profile picture</li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardOverview;
