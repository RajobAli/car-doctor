
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/assets/icons/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import axios from 'axios';

const Login = () => {
    const {signIn} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
 



    const handleLogin = (event) =>{
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name,email,password);
        signIn(email,password)
        .then(result =>{
            const loggedInUser = result.user;
            console.log(loggedInUser)
            const user = {email};
            axios.post('http://localhost:5000/jwt',user,{withCredentials:true})
            .then(res =>{
                console.log(res.data)
                if(res.data.success){
                  navigate(location?.state ? location?.state : '/')

                }
            })
         
          

     
          


        })
        .catch(error =>console.log(error))
     


    }

    
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="mr-12 w-1/2">
                    <img src={img} alt="" />
                
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin}>
                    <h1 className="text-3xl font-bold text-center">Login</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                     
                           <input className='btn btn-primary' value="login" type="submit" />
                     
                        </div>
                    </form>
                    <p className='my-4 text-center'>New to car Doctors <Link className='text-orange-500 font-bold' to="/signup">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;