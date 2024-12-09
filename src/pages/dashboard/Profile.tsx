import { useAppSelector } from "@/redux/hooks";


const Profle = () => {
    const user = useAppSelector((state) => state.auth.user);
    console.log(user);
    return (
        <div className="container mx-auto h-screen">
            <div className="flex justify-center items-center h-screen">
                <h2 className="text-3xl font-bold">This is profile page</h2>
            </div>
        </div>
    );
};

export default Profle;