const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Job Search</h1>
      <div className="links">
        <a href="/">Home</a>
        <a href="/jobs/add-job">Add Job</a>
        <a href="/signup">Signup</a>
        <a href="/login">Login</a>
      </div>
    </nav>
  );
}
 
export default Navbar;