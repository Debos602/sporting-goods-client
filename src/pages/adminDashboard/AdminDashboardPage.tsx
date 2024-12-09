import { FaBox, FaCog, FaShoppingCart, FaUsers } from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, BarElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import Card from './Component/Card';
import { dataBar, dataLine } from './Component/ChartData';
ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement);


const AdminDashboardPage = () => {
    return (
        <div className='pb-10'>
            <div className='container mx-auto text-amber-950'>
                <h2 className='text-xl py-5 font-bold'>Dashboard Overview</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
                    <Card icon={<FaShoppingCart className='text-amber-950' />} title="Orders" value="140" />
                    <Card icon={<FaBox className='text-amber-950' />} title="Products" value="120" />
                    <Card icon={<FaUsers className='text-amber-950' />} title="Users" value="30" />
                    <Card icon={<FaCog className='text-amber-950' />} title="Settings" value="11" />
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <div className='bg-white p-4 dark:bg-gray-800 rounded-lg shadow-md'>
                        <h3 className='text-lg font-semibold mb-4'>Sales Data</h3>
                        <Line data={dataLine} />
                    </div>
                    <div className='bg-white p-4 dark:bg-gray-800 rounded-lg shadow-md'>
                        <h3 className='text-lg font-semibold mb-4'>Products Data</h3>
                        <Bar data={dataBar} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;