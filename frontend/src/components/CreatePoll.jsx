import axios from "axios";
import { useState } from "react";

export default function CreatePoll() {
    const token = localStorage.getItem('access_token');
    if (!token) {
        window.location.href = '/'
    }
    const author = localStorage.getItem("user")

    function simpleUID(length = 8) {
        return crypto.getRandomValues(new Uint8Array(length))
            .reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '');
    }


    const [error_message, seterror_message] = useState("")
    const [question, setquestion] = useState("")
    const [options, setoptions] = useState([
        {
            id: simpleUID(),
            text: "",
            votes: 0
        },
        {
            id: simpleUID(),
            text: "",
            votes: 0
        }
    ])

    const AddOption = () => {
        if (options.length == 5) {
            seterror_message("Maximum 5 options are allowed")
        }
        else {
            setoptions((prev) => ([...prev, { id: simpleUID(), text: "" }]));
            seterror_message("")
        }
    }

    const HandelDelete = (id) => {
        if (options.length === 2) {
            seterror_message("Minimum 2 options needed !!")
        }
        else {
            setoptions((prev) => (prev.filter((val) => (id !== val.id))))
            seterror_message("")
        }
    }

    const HandelSubmit = (e) => {
        e.preventDefault();
        let validate = 0
        options.forEach((element) => {
            if (element.text.length === 0) {
                seterror_message("No option feild can be empty !!")
                validate = validate+1;
                return;
            }
        })
        if(!validate){
        axios.post('https://pollstream-cqof.onrender.com/create_poll',
            { author, question, options }, // request body
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(r => 
                window.location.href = '/my-polls'
            )
            .catch(e => {
                seterror_message("Poll Creation failed !! ");
            });
        }

    }

    return (
        <div className="bg-black min-h-100 text-white flex flex-col justify-center items-center" >
            <form className="my-15 border border-zinc-700 bg-zinc-700/20 flex flex-col rounded-lg p-4 min-w-100 gap-3 transform hover:scale-102 transition-all duration-300 m-4" onSubmit={(e) => HandelSubmit(e)}>
                <h2 className="text-center text-4xl font-bold">Create Poll</h2>
                <label className="text-gray-300 mt-2" htmlFor="question">Question : </label>
                <input
                    className="text-gray-200 border-2 rounded-lg p-4 border-gray-500 transform hover:scale-102 transition-all duration-100 focus:border-white focus:outline-none focus:scale-103 transition-all duration-200 "
                    name="question"
                    id="question"
                    type="text-area"
                    placeholder="Enter Question.."
                    value={question}
                    onChange={(e) => setquestion(e.target.value)}
                />
                <label className="text-gray-300 mt-2" htmlFor="option">Options : </label>
                {options.map((option) => (
                    <div className=" my-1" key={option.id}>
                        <input
                            className="w-70 text-gray-200 border-2 rounded-lg p-2 border-gray-500 transform hover:scale-102 transition-all duration-100 focus:border-white focus:outline-none focus:scale-103 transition-all duration-200"
                            name="option"
                            id={option.id}
                            type="text"
                            placeholder="Enter option.."
                            value={option.text}
                            onChange={(e) => setoptions((prev) => prev.map((val) => val.id === option.id ? { id: option.id, text: e.target.value, votes: 0 } : val))}
                        />
                        <input
                            type="button"
                            onClick={() => HandelDelete(option.id)}
                            value="Delete"
                            className="px-3 py-2 ml-1 bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-102 transition-all duration-200"
                        />
                    </div>
                ))}
                <input type="button"
                    className="px-3 py-2 bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-102 transition-all duration-200 active:scale-98"
                    onClick={AddOption}
                    value="+ Add Option"
                />
                <button className="px-8 py-3 bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-102 transition-all duration-200 active:scale-98" type="submit">Create Poll</button>
                <p className='text-center text-red-500'>{error_message}</p>
            </form>
        </div>
    );
}