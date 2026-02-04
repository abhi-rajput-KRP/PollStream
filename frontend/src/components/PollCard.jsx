export default function PollCard({ author, question, options }) {
    let totalvotes = 0;
    options.forEach(element => (
        totalvotes = totalvotes+element.votes
    ));
    return (
        <div className="p-6 my-4 mb-5 border-b-1 border-zinc-600 w-full">
            <div className="w-100 flex flex-col gap-3">
                <h1 className="font-semibold text-xl">{question}</h1>
                {options.map((option) => (
                    <div key={option.num} className="border-1 p-3 rounded-lg hover:cursor-pointer transform hover:scale-102 transition-all duration-200">
                        <span>{option.text}</span>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div
                                className="bg-gradient-to-r from-pink-600 to-red-600 h-2 rounded-full"
                                style={{ width: `${(option.votes/totalvotes)*100}%` }}
                            ></div>
                        </div>
                        <p className="text-right mt-1 text-zinc-400">{(option.votes/totalvotes)*100}% Votes</p>

                    </div>
                ))}
                <p className="text-right  text-zinc-600">Author : <span className="text-orange-800">{author}</span></p>
            </div>
        </div>
    )
}