import { useEffect, useState } from "react";
import PollCard from "./PollCard";
import axios from "axios";

export default function AllPolls() {
    const token = localStorage.getItem("access_token")
    if (!token) {
        window.location.href = '/'
    }
    const [questions, setquestions] = useState([])

    useEffect(() => {
        axios.get("https://pollstream-cqof.onrender.com/all_polls", {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(resp => setquestions(resp.data))
    }, [Selection])

    function Selection(question_id,option_id) {
        axios.post("https://pollstream-cqof.onrender.com/vote", {
            question_id, option_id
        },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
    }

    return (
        <div className="bg-black min-h-100 text-white flex flex-col justify-center items-center" >
            {questions.map((val) => (
                <div key={val.poll_id} className="border border-zinc-700 rounded-lg my-3 bg-zinc-700/20">
                    <PollCard author={val.author} question={val.question} options={val.options} id={val.poll_id} selection={Selection} />
                </div>
            ))}
        </div>
    );
}