import PollCard from "./PollCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useNavigate } from "react-router";

const socket = io(localStorage.getItem("Backend_URI"))

export default function MyPolls() {
    const navigate = useNavigate()
    const token = localStorage.getItem("access_token")
    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [])
    const [questions, setquestions] = useState([])

    useEffect(() => {
        axios.post(localStorage.getItem("Backend_URI") + "my_polls",
            { user: localStorage.getItem('user') },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(resp => setquestions(resp.data))
    }, [])

    useEffect(() => {
        socket.on("poll_data", (poll) => {
            setquestions(poll);
        })
        return () => socket.off("poll_data");
    }, []);

    function Selection(question_id, option_id) {
        axios.post(localStorage.getItem("Backend_URI") + "vote", {
            question_id, option_id
        },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
    }

    function HandelDelete(id) {
        axios.post(localStorage.getItem("Backend_URI") + "delete_poll",
            { poll_id: id, author: localStorage.getItem('user') },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
    }

    return (
        <div className="min-h-100 text-white flex flex-wrap gap-3 justify-center items-center" >
            {questions.map((val) => (
                <div key={val.poll_id} id={val.poll_id} className="border border-zinc-700 rounded-lg my-3 bg-zinc-700/20 py-3">
                    <PollCard author={val.author} question={val.question} options={val.options} id={val.poll_id} votes={val.votes} selection={Selection} />
                    <button
                        className="px-3 py-3 bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-102 transition-all duration-200 mx-2"
                        onClick={() => HandelDelete(val.poll_id)}
                    >
                        Delete</button>
                </div>
            ))}
        </div>
    );
}