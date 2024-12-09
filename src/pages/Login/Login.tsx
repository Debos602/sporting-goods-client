import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import image from '../../assets/images/loginbg.jpg';
import { FaFacebookSquare } from "react-icons/fa";
import { FaGooglePlus } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";
import { useLogInMutation } from '@/redux/api/baseApi';
import { useAppDispatch } from '@/redux/hooks';
import { toast } from 'sonner';
import { setUser } from '@/redux/authSlice';

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
  credentials?: boolean;
};

const Login = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FieldType>();
  const [userLogin] = useLogInMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit: SubmitHandler<FieldType> = async (data) => {
    try {
      const response = await userLogin(data).unwrap();
      const { data: user, token } = response;
      if (user && token) {
        dispatch(setUser({ user, token }));
        toast.success("Login Successful");

        const redirectPath =
          location.state?.from?.pathname ||
          (user.role === "admin" ? "/admin-dashboard" : "/dashboard");
        navigate(redirectPath, { replace: true });
      } else {
        toast.error("Invalid response from server.");
      }
    } catch (error) {
      toast.error("Login failed, please try again.");
    }
  };

  const handleCredentialFill = () => {
    setValue('email', 'debos.das.02@gmail.com');
    setValue('password', '123456');
  };

  return (
    <div className="min-h-screen h-full flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${image})` }}>
      <div className='absolute top-0 left-0 w-full h-full bg-black opacity-70'></div>
      <div className='grid grid-cols-1 md:grid-cols-2 relative'>
        <div className=' bg-amber-950 bg-opacity-90 p-10 space-y-3' >
          <Link to="/">
            <img src={logo} className="object-cover w-full max-w-24" alt="Logo" />
          </Link>
          <h4 className='text-2xl font-bold text-[#f0edee]'>Welcome to sporting goods</h4>
          <p className='text-sm text-[#e2dbdd]'>Thank you for getting back please login to <br /> your account by filling these form</p>

          <p className='text-sm font-extrabold text-[#e2dbdd]'>Social</p>
          <div className="flex space-x-5 text-3xl">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <FaFacebookSquare className="text-white" />
            </a>
            <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">
              <FaGooglePlus className="text-white" />
            </a>
            <a href="https://www.github.com/" target="_blank" rel="noopener noreferrer">
              <FaGithubSquare className="text-white" />
            </a>
          </div>
          <div className='space-x-4'>
            <Link to="/" className="text-center  text-white mt-2 inline-block underline ">
              Back to Home
            </Link>
            <Link to="/register" className="text-center  text-white mt-2 inline-block underline ">
              Register
            </Link>
          </div>

        </div>
        <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-amber-950">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-amber-950 text-sm font-bold mb-2">
                Email
              </label>
              <input
                {...register("email", { required: "Email is required", pattern: /\S+@\S+\.\S+/ })}
                type="email"
                id="email"
                className="shadow appearance-none border-2 border-amber-950 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#FF8000]"
                placeholder="Enter Email"
              />
              {errors.email && <p className="text-[#FF8000]">{errors.email.message || "Invalid email format"}</p>}
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-amber-950 text-sm font-bold mb-2">
                Password
              </label>
              <input
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })}
                type="password"
                id="password"
                className="shadow appearance-none border-2 border-amber-950 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-[#FF8000]"
                placeholder="Enter Password"
              />
              {errors.password && <p className="text-[#FF8000]">{errors.password.message}</p>}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-amber-700 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
              <button
                type="button"
                onClick={handleCredentialFill}
                className="bg-amber-700 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Credential
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
