import { Link } from 'react-router';
import { useState } from 'react';

export default function Register() {

    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")

    const HandelSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className="bg-black text-white h-screen flex flex-col justify-center items-center">
            <form className=" border border-zinc-700 flex flex-col rounded-lg p-4 w-100 gap-3" onSubmit={(e) => HandelSubmit(e)}>
                <h2 className="text-center text-4xl bold">Register</h2>
                <label className="text-gray-300 mt-2" htmlFor="usernme">Username: </label>
                <input 
                className="text-gray-200 border-b-2 border-gray-500 transform hover:scale-102 transition-all duration-100" 
                name="username" 
                id="username" 
                type="text" 
                placeholder="Set a username of your choice.." 
                value={username}
                onChange={(e)=> setusername(e.target.value)}
                />
                <label className="text-gray-300 mt-2" htmlFor="password">Password: </label>
                <input 
                className="text-gray-200 border-b-2 border-gray-500 transform hover:scale-102 transition-all duration-100" 
                name="password" id="password" 
                type="password" 
                placeholder="Set your password.." 
                value={password}
                onChange={(e)=>setpassword(e.target.value)}
                />
                <button className="px-8 py-4 bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 m-4" type="submit">Register</button>
                <p className='text-center'>Already Registered ? <Link to='/login' className='text-orange-600'>LogIn</Link></p>
            </form>
        </div>
    );
}