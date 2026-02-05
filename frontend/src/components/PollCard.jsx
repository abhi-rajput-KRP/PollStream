import { useState } from "react";

export default function PollCard({ author, question, options, id, selection }) {
    let totalvotes = 0;
    options.forEach(element => (
        totalvotes = totalvotes + element.votes
    ));
    // const HandleSelection = (option_id) => {
    //     // const updated = selection(id, option_id);
    //     // if (updated){
    //         options.forEach((option)=>{
    //             const butt = document.getElementById(option.id);
    //             butt.disabled = true;
    //         })
    //     }

    return (
        <div className="p-6 mb-4 rounded-lg w-full">
            <div className="w-100 flex flex-col gap-3">
                <h1 className="font-semibold text-xl">{question}</h1>
                {options.map((option) => (
                    <button onClick={()=>selection(id,option.id)} key={option.id} id={option.id} className="border-1 border-zinc-700 p-3 rounded-lg hover:cursor-pointer transform hover:scale-102 transition-all duration-200 active:scale-98 active:border-2">
                        <span>{option.text}</span>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div
                                className="bg-gradient-to-r from-pink-600 to-red-600 h-2 rounded-full"
                                style={{ width: `${totalvotes !== 0 ? (option.votes / totalvotes) * 100 : 0}%` }}
                            ></div>
                        </div>
                        <p className="text-right mt-1 text-zinc-400">{totalvotes !== 0 ? Math.round((option.votes / totalvotes) * 100) : 0}% Votes</p>
                    </button>
                ))}
                <p className="text-right  text-zinc-600">Author : <span className="text-orange-800">{author}</span></p>
            </div>
        </div>
    )
}