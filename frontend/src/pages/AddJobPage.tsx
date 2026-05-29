import { useState } from "react";
import {useNavigate} from "react-router-dom";

function AddJobPage() {
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [status, setStatus] = useState("applied");
    const [salary, setSalary] = useState(0);
    const [link, setLink] = useState("");
    const [notes, setNotes] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async  (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:3000/api/jobs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ company, position, status, salary, link, notes }),
            });
            if(!response.ok){
                throw new Error("Failed to add job");
            }
            const data = await response.json();
            console.log(data);
            setCompany("");
            setPosition("");
            setStatus("applied");
            setSalary(0);
            setLink("");
            setNotes("");
            navigate("/");
        }catch(err){
            if(company === "" || position === "" || salary === 0 || link === "" || notes === ""){
                alert("Please fill in all fields");
                return;
            }
            if(company.length < 1 || company.length > 100){
                alert("Company must be between 1 and 100 characters");
                return;
            }
            if(position.length < 1 || position.length > 100){
                alert("Position must be between 1 and 100 characters");
                return;
            }
            if(salary < 0 || salary > 1000000){
                alert("Salary must be between 0 and 1000000");
                return;
            }
            if(link.length < 1 || link.length > 20){
                alert("Link must be between 1 and 20 characters");
                return;
            }
            if(notes.length < 1 || notes.length > 30){
                alert("Notes must be between 1 and 30 characters");
                return;
            }
        }
    }
    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <header>
        <h1 className="text-3xl font-bold text-slate-900">Add Job</h1>
        <p className="mt-1 text-slate-500">Add a new job</p>
      </header>

      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 text-black p-6 shadow-sm">
      <input
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className='border border-gray-300 rounded-md p-2'
      />

      <input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        className='border border-gray-300 rounded-md p-2'
      />
      <input
        type="number"
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(Number(e.target.value))}
        className='border border-gray-300 rounded-md p-2'
      />
      <input
        type="text"
        placeholder="Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className='border border-gray-300 rounded-md p-2'
      />
      <input
        type="text"
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className='border border-gray-300 rounded-md p-2'
      />
      <button type='submit' className="rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white shadow-sm transition hover:bg-indigo-700">Add Job</button>
      </div>
        </form>
    )
}
export default AddJobPage;