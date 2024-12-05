import { useEffect, useState } from "react";
import JobListings from "../components/JobListings";

const Home = () => {
  const [jobs, setJobs] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setIsLoggedIn(false);
        setIsPending(false);
        return;
      }

      try {
        const res = await fetch("/api/jobs", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("could not fetch the data for that resource");
        }

        const data = await res.json();
        setIsLoggedIn(true);
        setJobs(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setIsLoggedIn(false);
      } finally {
        setIsPending(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="home">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!isLoggedIn && !isPending && (
        <div>
          <h2>Welcome to Job Search!</h2>
          <p>Please log in to view job listings.</p>
        </div>
      )}
      {isLoggedIn && jobs && <JobListings jobs={jobs} />}
    </div>
  );
};

export default Home;
