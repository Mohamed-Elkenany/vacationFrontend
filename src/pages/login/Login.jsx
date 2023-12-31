import React, { useEffect, useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../slices/appApiSlice';
import { loginInitState, reducer } from '../../services/LoginREducer';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Loading from '../../components/loading/Loading';
const Login = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, loginInitState);
  const { email, password } = state;
  const [login, { error, isLoading, isSuccess, isError }] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const user = useSelector(state => state.user);
  const handleLogin = async (e) => {
    e.preventDefault();
    await login({ email, password })
      .then(res => res.data)
  }
  useEffect(() => {
    user && navigate('/');
  }, [user])
  useEffect(() => {
    setErrorMessage(error?.data?.message);
  }, [error])
  return (
    <div className='login relative w-full min-h-screen bg-slate-100 flex items-center justify-center max-sm:px-[50px] sm:px-[30px] lg:px-0'>
      <div className=''>
        <h1 className=' text-center hidden max-sm:block text-5xl font-lobster font-medium'>Vacation</h1>
        <div className="h-full card mt-4 flex lg:w-2/3  mx-auto rounded-md  overflow-hidden max-sm:w-full max-sm:items-center max-sm:justify-center sm:w-full">
          <div className="left flex-1 h-full flex flex-col gap-[10] px-[50px] py-[20px] max-sm:hidden">
            <div className='flex flex-col gap-10 my-[40px]'>
              <h1 className='text-slate-100 font-lobster lg:text-4xl sm:text-2xl'>Vacation</h1>
              <p className='text-slate-100 font-lobster tracking-widest lg:text-[13px] sm:text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore placeat sequi quia itaque ipsam, esse voluptates eligendi dolorem dicta reprehenderit sit nulla earum libero consectetur laudantium nam ullam repudiandae. Labore.</p>
            </div>
            <div className=''>
              <span className='text-slate-100 font-lobster tracking-widest lg:text-[15px] sm:text-sm'>You don't have an account ?</span>
              <Link to="/register"><button className='w-2/3 mt-4 py-1 text-xl text-slate-100 border font-lobster tracking-widest rounded-sm hover:bg-slate-900 hover:border-slate-900 border-b sm:text-sm sm:py-2 lg:text-[20px]'>Register</button></Link>
            </div>
          </div>
          <div className="right flex-1  flex flex-col bg-white max-sm:px-[30px] sm:px-[50px] pb-[25px] pt-[60px] max-sm:h-[350px]">
            { errorMessage &&
              <div className='text-center'>
                <h1 className='whitespace-nowrap text-sm border p-1 bg-red-800 text-white font-lobster font-medium rounded-md'>{errorMessage}</h1>
              </div>
            }
          <div className='h-full w-full flex flex-col'>
            <form className='flex flex-1 flex-col justify-between' onSubmit={handleLogin}>
              <h1 className='text-slate-900 font-lobster text-4xl text-center sm:text-3xl lg:text-4xl'>Login</h1>
              <input type="email" placeholder='Enter your email' className='border-b border-slate-300 p-1 outline-none' onChange={e => dispatch({ type: 'EMAIL', email: e.target.value })} />
              <input type="password" placeholder='Enter your password' className='border-b border-slate-300 p-1 outline-none' onChange={e => dispatch({ type: 'PASSWORD', password: e.target.value })} />
                <button disabled={isLoading || !email || !password} className={`${isLoading ? 'border-none' : 'border border-slate-900'} py-1 w-1/2 mx-auto text-xl font-lobster rounded-sm hover:bg-slate-900 hover:text-slate-100 sm:text-sm sm:py-2 lg:text-[25px]`}>{isLoading ? <div className='flex items-center justify-center'><Loading/></div> : 'Login'}</button>
            </form>
            <div className='text-sm hidden max-sm:flex items-center gap-1 mt-5 font-lobster tracking-wider'>
              <span className=' whitespace-nowrap'>You don't have an account ?</span> <Link to="/register" className={`${isLoading && 'cursor-default'}`} disabled={isLoading}><button className=' underline text-blue-600'>Register</button></Link>
            </div>
          </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
