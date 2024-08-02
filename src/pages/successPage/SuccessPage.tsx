import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/", { replace: true });
        window.location.reload(); // Force a page reload
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-semibold mb-4">
                Order Placed Successfully!
            </h1>
            <p className="mb-8 text-center">
                Your order has been placed successfully. Thank you for shopping
                with us!
            </p>
            <button
                onClick={handleGoHome}
                className="bg-blue-500 text-white p-2 rounded"
            >
                Go To Home
            </button>
        </div>
    );
};

export default SuccessPage;
