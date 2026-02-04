import { useState } from "react";

export default function CreatePoll() {

    const [error_message, seterror_message] = useState("")
    const [question, setquestion] = useState("")
    const [options, setoptions] = useState([
        {
            num: 1,
            text: ""
        },
        {
            num: 2,
            text: ""
        }
    ])

    const AddOption = () => {
        if (options.length == 5) {
            seterror_message("Maximum 5 options are allowed")
        }
        else {
            setoptions((prev) => ([...prev, { num: prev.length + 1, text: "" }]));
            seterror_message("")
        }
    }

    const HandelDelete = (num) => {
        if (options.length === 2) {
            seterror_message("Minimum 2 options needed !!")
        }
        else {
            setoptions((prev) => (prev.filter((val) => (num !== val.num))))
            seterror_message("")
        }
    }

    const HandelSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="bg-black min-h-100 text-white flex flex-col justify-center items-center" >
            <form className="my-15 border border-zinc-700 flex flex-col rounded-lg p-4 min-w-100 gap-3 transform hover:scale-102 transition-all duration-300 m-4" onSubmit={(e) => HandelSubmit(e)}>
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
                    <div className=" my-1" key={option.num}>
                        <input
                            className="w-70 text-gray-200 border-2 rounded-lg p-2 border-gray-500 transform hover:scale-102 transition-all duration-100 focus:border-white focus:outline-none focus:scale-103 transition-all duration-200"
                            name="option"
                            id={option.num}
                            type="text"
                            placeholder="Enter option.."
                            value={option.text}
                            onChange={(e) => setoptions((prev) => prev.map((val) => val.num === option.num ? { num: option.num, text: e.target.value } : val))}
                        />
                        <input
                            type="button"
                            onClick={() => HandelDelete(option.num)}
                            value="Delete"
                            className="px-3 py-2 ml-1 bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-102 transition-all duration-200"
                        />
                    </div>
                ))}
                <input type="button"
                    className="px-3 py-2 bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-102 transition-all duration-200"
                    onClick={AddOption}
                    value="+ Add Option"
                />
                <button className="px-8 py-3 bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-102 transition-all duration-200" type="submit">Create Poll</button>
                <p className='text-center text-red-500'>{error_message}</p>
            </form>
        </div>
    );
}