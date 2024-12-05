import { useNavigate } from "react-router-dom";

const Navbar = ({ authToken, logout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h1>Job Search</h1>
      <div className="links">
        <a href="/">Home</a>
        {!authToken ? (
          <>
            <a href="/signup">Signup</a>
            <a href="/login">Login</a>
          </>
        ) : (
          <>
          <a href="/jobs/add-job">Add Job</a>
          <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
