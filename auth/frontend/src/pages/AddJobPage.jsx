import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddJobPage = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Full-Time");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [postedDate, setPostedDate] = useState("");
  const [status, setStatus] = useState("open"); // open/close
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [requirements, setRequirements] = useState("");

  const navigate = useNavigate();

  const addJob = async (newJob) => {
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Server response:", errorData);
        throw new Error(`Failed to add job: ${res.status} ${res.statusText}`);
      }
      return true;
    } catch (error) {
      console.error(error);
      alert("Failed to add job");
      return false;
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

    const newJob = {
      title,
      type,
      description,
      company: {
        name: companyName,
        contactEmail,
        contactPhone,
        website,
      },
      location,
      salary,
      postedDate,
      status,
      applicationDeadline,
      requirements
    };
    const success = addJob(newJob);
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Add a New Job</h2>
      <form onSubmit={submitForm}>

        <label>Job title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Job type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label>Company Name:</label>
        <input
          type="text"
          required
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <label>Contact Email:</label>
        <input
          type="email"
          required
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />

        <label>Contact Phone:</label>
        <input
          type="text"
          required
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />

        <label>Website:</label>
        <input
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />

        <label>Location:</label>
        <input
          type="text"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label>Salary:</label>
        <input
          type="number"
          required
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <label>Posted Date:</label>
        <input
          type="date"
          value={postedDate}
          onChange={(e) => setPostedDate(e.target.value)}
        />

        <label>Job Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>

        <label>Application Deadline:</label>
        <input
          type="date"
          value={applicationDeadline}
          onChange={(e) => setApplicationDeadline(e.target.value)}
        />

        <label>Requirements:</label>
        <input
          type="text"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
        />

        <button>Add Job</button>
      </form>
    </div>
  );
};

export default AddJobPage;
