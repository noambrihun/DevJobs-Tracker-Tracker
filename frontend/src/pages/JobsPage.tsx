import { useState, useEffect } from "react";
import type { Job } from "../service/jobs";
import JobCard from "../components/JobCard";
function JobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [search, setSearch] = useState("");
    useEffect(() => {
        fetch("http://localhost:3000/api/jobs")
        .then(res => res.json())
        .then(data => setJobs(data.jobs))
        .catch(err => console.error(err,"error fetching jobs"));
    }, []);
    const handleDelete = async (id: string) => {
        try{
             await fetch(`http://localhost:3000/api/jobs/${id}`, {
                method: "DELETE",
            });
            setJobs(jobs.filter(job => job._id !== id));
        }
        catch(err){
            console.error(err,"error deleting job");
        }
    }
    const updateJob = async (id: string, job: Job) => {
        try {
            const { company, position, status, salary, link, notes } = job;
            const res = await fetch(`http://localhost:3000/api/jobs/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ company, position, status, salary, link, notes }),
            });
            if (!res.ok) throw new Error("Update failed");
            const data = await res.json();
            setJobs((prev) =>
                prev.map((oldJob) => (oldJob._id === id ? data.updatedJob : oldJob))
            );
        } catch (err) {
            console.error(err, "error updating job");
        }
    };
    return (
        <div className="flex flex-col gap-8">
            <header className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">My Jobs</h1>
                    <p className="mt-1 text-slate-500">Track and manage your job applications</p>
                </div>
            </header>

            <div className="relative">
                <svg
                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
                </svg>
                <input
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-slate-900 shadow-sm placeholder:text-slate-400 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    type="text"
                    placeholder="Search by company"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {jobs.filter((job) => job.company.toLowerCase().includes(search.toLowerCase())).map((job) => (
                    <JobCard
                        key={job._id}
                        jobData={job}
                        onDelete={() => handleDelete(job._id)}
                        onUpdate={(id: string, newJob: Job) => updateJob(id, newJob)}
                    />
                ))}
            </div>
        </div>
    );
}
export default JobsPage;