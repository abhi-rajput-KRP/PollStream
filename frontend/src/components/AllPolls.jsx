import PollCard from "./PollCard";

export default function AllPolls(){

    const questions = [
        {author : "abhi" , question:'How Are You ?', options:[
            {num:1,text:"fine",votes:3},
            {num:2,text:"good",votes:2},
        ]},
        {author : "anu" , question:'Where ?', options:[
            {num:1,text:"Home",votes:4},
            {num:2,text:"Outside",votes:1},
        ]},
    ];

    return(
        <div  className="bg-black min-h-100 text-white flex flex-col justify-center items-center" >
            {questions.map((val)=>(
                <div key={val.author}>
                    <PollCard author={val.author} question={val.question} options={val.options}/>
                </div>
            ))}
        </div>
    );
}