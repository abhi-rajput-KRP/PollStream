import { Link } from 'react-router';
import { use, useState } from 'react';
import axios from 'axios';

export default function Register() {

    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [confirm_password, setconfirm_password] = useState("")
    const [error_message, seterror_message] = useState("")

    const HandelSubmit = (e) => {
        e.preventDefault();
        // Validating the values
        if (username.length < 5) {
            seterror_message("Usename can't be smaller than 5 characters !!")
        }
        else if (password.length < 6) {
            seterror_message("Password can't be smaller than 6 characters !!")
        }
        else if (password !== confirm_password) {
            seterror_message("Password and Confirm password are not same !!")
        }
        else (
            axios.post("http://127.0.0.1:5000/register", {
                username: username,
                password: password
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
        )
    }
    return (
        <div className="bg-black text-white h-screen flex flex-col justify-center items-center">
            <form className=" border border-zinc-700 flex flex-col rounded-lg p-4 w-100 gap-3 transform hover:scale-102 transition-all duration-300" onSubmit={(e) => HandelSubmit(e)}>
                <h2 className="text-center text-4xl font-bold">Register</h2>
                <label className="text-gray-300 mt-2" htmlFor="username">Username: </label>
                <input
                    className="text-gray-200 border-b-2 border-gray-500 transform hover:scale-102 transition-all duration-100 focus:border-white focus:outline-none focus:scale-103 transition-all duration-200 "
                    name="username"
                    id="username"
                    type="text"
                    placeholder="Set a username of your choice.."
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                />
                <label className="text-gray-300 mt-2" htmlFor="password">Password: </label>
                <input
                    className="text-gray-200 border-b-2 border-gray-500 transform hover:scale-102 transition-all duration-100 focus:border-white focus:outline-none focus:scale-103 transition-all duration-200 "
                    name="password" id="password"
                    type="password"
                    placeholder="Set your password.."
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                />
                <label className="text-gray-300 mt-2" htmlFor="confirm_password"> Confirm Password: </label>
                <input
                    className="text-gray-200 border-b-2 border-gray-500 transform hover:scale-102 transition-all duration-100 focus:border-white focus:outline-none focus:scale-103 transition-all duration-200 "
                    name="password" id="password"
                    type="password"
                    placeholder="Enter your password again.."
                    value={confirm_password}
                    onChange={(e) => setconfirm_password(e.target.value)}
                />
                <button className="px-8 py-4 bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-102 transition-all duration-200 m-4" type="submit">Register</button>
                <p className='text-center'>Already Registered ? <Link to='/login' className='bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent'>LogIn</Link></p>
                <p className='text-center text-red-500'>{error_message}</p>
            </form>
        </div>
    );
}