import { useEffect, useState } from "react";
import JobListings from "../components/JobListings";

const Home = ({ authToken }) => {
  const [jobs, setJobs] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authToken) {
      setIsPending(false);
      return;
    }

    const fetchJobs = async () => {
      setIsPending(true);
      try {
        const res = await fetch("/api/jobs", {
          headers: {
            "Authorization": `Bearer ${authToken}`,
          },
        });

        if (!res.ok) {
          throw new Error("could not fetch the data for that resource");
        }

        const data = await res.json();
        setJobs(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsPending(false);
      }
    };

    fetchJobs();
  }, [authToken]);

  return (
    <div className="home">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!authToken && !isPending && (
        <div>
          <h3>Welcome to Job Search!</h3>
          <p>Please log in to view job listings.</p>
        </div>
      )}
      {authToken && jobs && <JobListings jobs={jobs} />}
    </div>
  );
};

export default Home;
