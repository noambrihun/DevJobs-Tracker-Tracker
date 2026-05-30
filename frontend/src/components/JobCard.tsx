import type { Job } from "../service/jobs";
import StatusBadge from "../components/StatusBadge";
import { useState, useEffect } from "react";
type Props = {
    jobData: Job
    onDelete: (id: string) => void
    onUpdate: (id: string, job: Job) => void
}

function JobCard({jobData, onDelete, onUpdate}: Props) {
    const [company, setCompany] = useState(jobData.company)
    const [position, setPosition] = useState(jobData.position)
    const [salary, setSalary] = useState(jobData.salary)
    const [notes, setNotes] = useState(jobData.notes)
    const [link, setLink] = useState(jobData.link)
    const [status, setStatus] = useState(jobData.status)

    useEffect(() => {
        setCompany(jobData.company);
        setPosition(jobData.position);
        setSalary(jobData.salary);
        setNotes(jobData.notes);
        setLink(jobData.link);
        setStatus(jobData.status);
    }, [jobData]);

    return (
        <div className="bg-gray-100 shadow-md border text-black border-gray-300 rounded-lg p-4 flex flex-col gap-2 ">
            <h2 className="text-lg font-bold"> Company: {company}</h2>
            <input value={company} onChange={(e) => setCompany(e.target.value)} />
            <input value={position} onChange={(e) => setPosition(e.target.value)} />           
             <StatusBadge status={status} />
                <select className="border border-gray-300 rounded-md p-2"
                  value={status}
                 onChange={(e) => setStatus(e.target.value)}>
                 <option value="applied">Applied</option>
                 <option value="interview">Interview</option>
                 <option value="accepted">Accepted</option>
                 <option value="rejected">Rejected</option>
                 </select>
                        <input value={salary}onChange={(e) => setSalary(Number(e.target.value))}/>           
                       <input value={link} onChange={(e) => setLink(e.target.value)}/>           
            <input value={notes} onChange={(e) => setNotes(e.target.value)}/>           
            <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => onDelete(jobData._id)}>Delete</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => onUpdate(jobData._id, {...jobData, company,position, salary,notes,link, status})}>Update</button>
        </div>
    )
}
export default JobCard;