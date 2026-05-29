import type { Job } from "../service/jobs";
import StatusBadge from "./StatusBadge";
type Props = {
    jobData: Job
}

function JobCard({jobData}: Props) {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2  min-h-screen">
            <h2 className="text-lg font-bold">{jobData.company}</h2>
            <p className="text-sm text-gray-500">{jobData.position}</p>
            <StatusBadge status={jobData.status} />
            <p className="text-sm text-gray-500">{jobData.salary}</p>
            <p className="text-sm text-gray-500">{jobData.link}</p>
            <p className="text-sm text-gray-500">{jobData.notes}</p>
        </div>
    )
}
export default JobCard;