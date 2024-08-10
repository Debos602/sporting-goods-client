import useNav from "@/hooks/UserNav";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
    const navigate = useNavigate();
    useNav("SuccessPage");

    const handleGoHome = () => {
        navigate("/", { replace: true });
        window.location.reload(); // Force a page reload
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-amber-100">
            <h1 className="text-3xl font-semibold mb-4">
                Order Placed Successfully!
            </h1>
            <p className="mb-8 text-xl text-center font-serif">
                Your order has been placed successfully. Thank you for shopping
                with us!
            </p>
            <button
                onClick={handleGoHome}
                className="bg-orange-900  px-5 uppercase text-white p-2 hover:bg-white duration-700 border-2 hover:text-orange-900 hover:border-orange-900"
            >
                Go To Home
            </button>
        </div>
    );
};

export default SuccessPage;
