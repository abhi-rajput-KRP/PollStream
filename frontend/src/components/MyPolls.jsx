import PollCard from "./PollCard";

export default function MyPolls() {
    const questions = [
        {
            author: "abhi", question: 'How Are You ?', options: [
                { num: 1, text: "fine", votes: 3 },
                { num: 2, text: "good", votes: 2 },
            ]
        },
    ];

    const HandelDelete = () => {
        console.log("Hello")
    }

    return (
        <div className="bg-black min-h-100 text-white flex flex-col justify-center items-center" >
            {questions.map((val) => (
                <div key={val.author}>
                    <button
                        className="px-3 py-3 bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-102 transition-all duration-200 mx-2"
                        onClick={HandelDelete}
                    >
                        Delete</button>
                    <PollCard author={val.author} question={val.question} options={val.options} />
                </div>
            ))}
        </div>
    );
}