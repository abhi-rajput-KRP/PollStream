import { useEffect, useState } from "react";
import PollCard from "./PollCard";
import axios from "axios";

export default function AllPolls() {
    const token = localStorage.getItem("access_token")
    if (!token) {
        window.location.href = '/login'
    }
    const [questions,setquestions] = useState([])

    useEffect(()=>{
        axios.get("http://127.0.0.1:5000/all_polls",{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
        .then(resp => setquestions(resp.data))
    },[])

    return (
        <div className="bg-black min-h-100 text-white flex flex-col justify-center items-center" >
            {questions.map((val) => (
                <div key={val.poll_id}>
                    <PollCard author={val.author} question={val.question} options={val.options} />
                </div>
            ))}
        </div>
    );
}