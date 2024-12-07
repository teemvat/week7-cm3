import { Link, useNavigate } from "react-router-dom";

const JobListings = ({ jobs }) => {
  const navigate = useNavigate();

  const deleteJob = async (id) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete job");
      }
      window.location.reload(); // Reload the page to update the job list
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <div className="job-preview" key={job.id}>
          <Link to={`/jobs/${job.id}`}>
            <h2>{job.title}</h2>
          </Link>
          <p>Type: {job.type}</p>
          <p>Company: {job.company.name}</p>
          <button onClick={() => navigate(`/edit-job/${job.id}`)}>Edit Job</button>
          <button onClick={() => deleteJob(job.id)}>Delete Job</button>
        </div>
      ))}
    </div>
  );
};

export default JobListings;