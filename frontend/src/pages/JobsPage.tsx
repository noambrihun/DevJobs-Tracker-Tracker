import { useState, useEffect } from "react";
import type { Job } from "../service/jobs";
import JobCard from "../components/JobCard";
function JobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    useEffect(() => {
        fetch("http://localhost:3000/api/jobs")
        .then(res => res.json())
        .then(data => setJobs(data))
        .catch(err => console.error(err,"error fetching jobs"));
    }, []);
    return (
        <div>
            <h1>JobsPage</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobs.map((job) => (
                    <JobCard key={job._id} jobData={job} />
                ))}
            </div>
        </div>
    )
}
export default JobsPage;