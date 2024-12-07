import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignupPage.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    phone_number: "",
    gender: "",
    date_of_birth: "",
    membership_status: "",
    address: "",
    profile_picture: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const validatePhoneNumber = (e) => {
    const { name, value } = e.target;
    const phoneNumberPattern = /^\+?\d{0,13}$/;
    if (phoneNumberPattern.test(value) || value === "") {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(formData)); // Simulate signup
    navigate("/");
    window.location.reload(); // Reload to update Navbar
  };

  return (
    <div className="signup-page">
      <h2>Signup</h2>
      <form onSubmit={submitForm}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label htmlFor="phone_number">Phone number</label>
        <input
          type="tel"
          name="phone_number"
          value={formData.phone_number}
          onChange={validatePhoneNumber}
          required
        />
        <label htmlFor="gender">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <label htmlFor="date_of_birth">Date of Birth</label>
        <input
          type="date"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleChange}
          required
        />
        <label htmlFor="membership_status">Membership Status</label>
        <select
          name="membership_status"
          value={formData.membership_status}
          onChange={handleChange}
          required
        >
          <option value="">Select status</option>
          <option value="Member">Member</option>
          <option value="Non-member">Non-member</option>
        </select>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <label htmlFor="profile_picture">Profile Picture</label>
        <input
          type="file"
          name="profile_picture"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignupPage;