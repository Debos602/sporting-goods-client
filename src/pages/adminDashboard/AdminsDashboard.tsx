
import Sidebar from './Component/Sidebar';
import DashBar from './Component/DashBar';
import { Outlet } from 'react-router-dom';



const AdminsDashboard = () => {
    return (
        <div className='flex'>
            <Sidebar />
            <div className='ml-16 md:ml-64 w-[calc(100%-4rem)] bg-gray-100 text-amber-950
        dark:bg-gray-900 dark:text-white'>
                <DashBar />
                <main className="">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminsDashboard;