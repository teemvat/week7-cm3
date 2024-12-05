import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const JobPage = ({ authToken }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleteJob = async (id) => {
    try {
      console.log("Deleting job with ID:", id);
      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${authToken}`,
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Server response:", errorData);
        throw new Error(`Failed to delete job: ${res.status} ${res.statusText}`);
      }
      console.log("Job deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  useEffect(() => {
    console.log("Fetching job with ID:", id);
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`, {
          headers: {
            "Authorization": `Bearer ${authToken}`,
          },
        });
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, authToken]);

  const onDeleteClick = (jobId) => {
    if (!jobId) {
      console.error("Invalid job ID");
      return;
    }
    const confirm = window.confirm("Are you sure you want to delete this listing?");
    if (!confirm) return;
    deleteJob(jobId);
  };

  return (
    <div className="job-preview">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : job ? (
        <>
          <h2>{job.title}</h2>
          <p>Type: {job.type}</p>
          <p>Description: {job.description}</p>
          <p>Company: {job.company.name}</p>
          <p>Contact Email: {job.company.contactEmail}</p>
          <p>Contact Phone: {job.company.contactPhone}</p>
          <button onClick={() => navigate(`/edit-job/${job._id}`)}>Edit Job</button>
          <button onClick={() => onDeleteClick(job._id)}>Delete Job</button>
        </>
      ) : (
        <p>Job not found or has been deleted.</p>
      )}
    </div>
  );
};

export default JobPage;
