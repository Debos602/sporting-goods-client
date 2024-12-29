import { useGetUserOrderQuery } from "@/redux/api/baseApi";
import { useAppSelector } from "@/redux/hooks";
import { TUser } from "@/types";
import { useState } from "react";
import { Card, Badge } from "@/components/ui/card"; // Example UI components
import { Pagination } from "@/components/ui/pagination"; // Add pagination UI component
import { Input } from "@/components/ui/input"; // For searching

const Notification = () => {
    const user = useAppSelector((state) => state.auth.user) as TUser | null;

    // Fetch user order data with loading and error states
    const { data: userOrder, isLoading, isError } = useGetUserOrderQuery(user?._id || '');

    // State for pagination and search
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const pageSize = 5; // Number of notifications per page

    // Extract notifications and filter based on the search query
    const notifications = userOrder?.data?.flatMap((order) =>
        order.items.map(item => ({
            key: order._id,
            productName: item.name,
            orderDate: new Date(order.createdAt).toLocaleDateString(),
        }))
    ) || [];

    const filteredNotifications = notifications.filter((notification) =>
        notification.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Get paginated notifications
    const paginatedNotifications = filteredNotifications.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="container mx-auto min-h-screen p-4">
            <h2 className="text-lg font-semibold mb-4">Notifications</h2>

            {/* Search Input */}
            <Input
                className="mb-4"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Display loading state */}
            {isLoading ? (
                <div>Loading...</div>
            ) : isError ? (
                <div className="text-red-500">Error fetching notifications</div>
            ) : filteredNotifications.length > 0 ? (
                <ul className="space-y-4">
                    {paginatedNotifications.map((notification) => (
                        <li key={notification.key} className="bg-white p-4 rounded shadow hover:shadow-lg">
                            <h3 className="font-semibold text-xl">{notification.productName}</h3>
                            <p className="text-gray-500 text-sm">Order Date: {notification.orderDate}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">No notifications</p>
            )}

            {/* Pagination */}
            <div className="mt-4">
                <Pagination
                    current={currentPage}
                    total={filteredNotifications.length}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
};

export default Notification;
