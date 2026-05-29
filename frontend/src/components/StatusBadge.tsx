import type { Job } from "../service/jobs"
type Props = {
    status: Job["status"]
  }
  
  function StatusBadge({ status }: Props) {
  
    let color = ""
  
    if (status === "applied") {
      color = "bg-blue-500"
    }
  
    if (status === "interview") {
      color = "bg-yellow-500"
    }
  
    if (status === "rejected") {
      color = "bg-red-500"
    }
  
    if (status === "accepted") {
      color = "bg-green-500"
    }
  
    return (
      <span className={`${color} text-white px-3 py-1 rounded`}>
        {status}
      </span>
    )
  }
  
  export default StatusBadge