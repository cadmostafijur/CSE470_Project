import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import toast from "react-hot-toast";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { loading, login } = useLogin();

    useEffect(() => {
        const message = localStorage.getItem("toastMessage");
        if (message) {
          toast.success(message);
          localStorage.removeItem("toastMessage");
        }
      }, []);
      

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    };

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Login
                    <span className='text-blue-500'> BRACU Chatting App</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter username'
                            className='w-full input input-bordered h-10'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className='label'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            className='w-full input input-bordered h-10'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-between mt-2">
                        <Link to='/signup' className='text-sm hover:underline hover:text-blue-600'>
                            {"Don't"} have an account?
                        </Link>
                        <Link to='/forget-password' className='text-sm hover:underline hover:text-blue-600'>
                            Forget password
                        </Link>
                    </div>

                    <div>
                        <button className='btn btn-block btn-sm mt-2' disabled={loading}>
                            {loading ? <span className='loading loading-spinner'></span> : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;