import { useDeleteUserMutation, useGetAllUserQuery } from "@/redux/api/baseApi";
import { toast } from "sonner";
interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    phone: string;
    features: string[];
}

const UserManagement = () => {
    const { data: response, isLoading, error } = useGetAllUserQuery("", {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    });

    const [DeleteUser] = useDeleteUserMutation();

    // Check if response is available and log it
    if (response) {
        console.log(response.data);
    }

    // If response is undefined, use an empty array
    const userData = response?.data || [];

    const handleDelete = async (userId: string) => {
        try {
            await DeleteUser(userId).unwrap();
            // Refetch data to update the list after deletion
            toast.success("User deleted successfully");
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Error deleting user");
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data!</div>;

    return (
        <div className="">
            <div className="pb-10">
                <div className="container mx-auto">
                    <h1 className="text-amber-950 text-xl font-bold py-5">User Overview</h1>
                    <div className="overflow-x-auto">
                        <table className="shadow-2xl border-2 border-amber-950 w-full">
                            <thead className="bg-amber-950 text-amber-50 text-left">
                                <tr>
                                    <th className="py-2 ps-3">#</th>
                                    <th className="py-2">Name</th>
                                    <th className="py-2">Email</th>
                                    <th className="py-2">Phone</th>
                                    <th className="py-2">Role</th>
                                    <th className="py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {userData?.map((user: User, index: number) => (
                                    <tr key={user._id} className="text-left cursor-pointer">
                                        <td className="ps-3 py-2 pr-6 whitespace-nowrap">{index + 1}.</td>
                                        <td className="py-2 pr-6 whitespace-nowrap">{user.name}</td>
                                        <td className="py-2 pr-6 whitespace-nowrap">{user.email}</td>
                                        <td className="py-2 pr-6 whitespace-nowrap">{user.phone}</td>
                                        <td className="py-2 pr-6 whitespace-nowrap">{user.role}</td>
                                        <td className="py-2 pr-6 whitespace-nowrap flex gap-4">

                                            <button
                                                className="text-amber-950 border-2 border-amber-950 hover:bg-amber-50 px-2 py-1"
                                                onClick={() => handleDelete(user._id)} // Call delete handler
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
