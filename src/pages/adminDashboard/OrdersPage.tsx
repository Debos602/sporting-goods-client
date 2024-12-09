import { useGetAllOrderQuery } from "@/redux/api/baseApi";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";


const OrdersPage = () => {
    const { data: response } = useGetAllOrderQuery("", {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    });
    const orders = response?.data || [];
    console.log(orders);

    return (
        <div className="pb-10">
            <div className=" container mx-auto">
                <h1 className="text-amber-950 text-xl font-bold py-5">Order Overview</h1>
                <div className="overflow-x-auto">
                    <table className="shadow-2xl border-2 border-amber-950 w-full">
                        <thead className="bg-amber-950 text-amber-50 text-left">
                            <tr>
                                <th className="ps-3 py-3">#</th>
                                <th className="ps-3 py-3">Name</th>
                                <th className="py-3">Email</th>
                                <th className="py-3">phone</th>
                                <th className="py-3">product name</th>
                                <th className="py-3">payment method</th>
                                <th className="py-3">Status</th>
                                <th className="py-3">Total Price </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {orders.map(({ items, totalPriceWithVAT, userDetails, status }, index) => {
                                console.log(status);
                                const { name, email, phone, paymentMethod } = userDetails;

                                // Create orderItems array with product names, prices, and stocks
                                const orderItems = items.map(({ name, price, stock }) => ({
                                    ProductName: name,
                                    price,
                                    stock
                                }));

                                console.log(orderItems, totalPriceWithVAT, name, email);

                                return (
                                    <tr key={index} className="text-left cursor-pointer">
                                        <td className="ps-3 py-3 pr-6 whitespace-nowrap">{index + 1}.</td>
                                        <td className="ps-3 py-3 pr-6 whitespace-nowrap">{name}</td>
                                        <td className="py-3 pr-6 whitespace-nowrap">{email}</td>
                                        <td className="py-3 pr-6 whitespace-nowrap">{phone}</td>
                                        <td className="flex py-3 pr-6 whitespace-nowrap">
                                            <Popover >
                                                <PopoverTrigger>Open</PopoverTrigger>
                                                <PopoverContent className="bg-amber-800 text-white " >
                                                    {orderItems.map((item, itemIndex) => (

                                                        <ul>
                                                            <li key={itemIndex}>{itemIndex + 1}.{item.ProductName}</li>
                                                        </ul>

                                                    ))}
                                                </PopoverContent>
                                            </Popover>
                                        </td>
                                        <td className="py-3 pr-6 whitespace-nowrap">{paymentMethod}</td>
                                        <td className="py-3 pr-6 whitespace-nowrap">{status}</td>
                                        <td className="py-3 pr-6 whitespace-nowrap">{totalPriceWithVAT.toFixed(2)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>

                    </table>
                </div>
            </div>
        </div >
    );
};

export default OrdersPage;
