const Navbar = () => {
  const authToken = localStorage.getItem("authToken");

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
          <a href="/jobs/add-job">Add Job</a>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
