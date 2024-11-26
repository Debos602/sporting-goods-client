// Sample image URL
import sportsImage from "../../../assets/images/image8.jpg";
import { ImCircleDown } from "react-icons/im";

const ManagImage = () => {
    return (
        <div className="mt-[94.59px] relative w-full h-[500px] overflow-hidden">
            <img
                src={sportsImage}
                alt="Background"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-orange-900 opacity-50 mix-blend-multiply"></div>
            <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="flex flex-col items-center justify-center h-[300px] w-[800px] bg-black bg-opacity-50 text-white text-center rounded-lg border-2 border-gray-500 shadow-lg">
                    <h1 className="text-3xl font-bold animate__animated animate__fadeInUp ">
                        Manage Sports Goods!
                    </h1>
                    <p className="mt-2 font-bold text-xl mb-4 animate__animated animate__fadeInUp animate__delay-1s">
                        🚴 Manage all Sports Goods and check bellow requirements
                        ! ⚡
                    </p>
                    <span className="flex justify-center text-orange-500 animate__animated animate__fadeInUp animate__delay-1s">
                        <ImCircleDown className="text-3xl" />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ManagImage;
