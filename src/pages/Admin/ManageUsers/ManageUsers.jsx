import React, { useState, useEffect } from "react";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../../../services/api-service";
import "./ManageUsers.css";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    salutation: "",
    birthPlace: "",
    birthDate: "",
    address: {
      street: "",
      houseNumber: "",
      postalCode: "",
      city: "",
    },
    email: "",
    username: "",
    phone: "",
    password: "",
  });
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // const fetchUsers = async () => {
  //   const response = await getAllUsers();
  //   if (response.success) {
  //     setUsers(response.data);
  //   }
  // };

  const fetchUsers = async () => {
    const response = await getAllUsers();
    console.log("Full API Response:", response); // Log the entire response

    if (response && response.success) {
      console.log("Users Data:", response.data);
      setUsers(response.data);
    } else {
      console.error("Error: API response was not successful", response);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const addressKey = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [addressKey]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingUserId) {
      await updateUser(editingUserId, formData);
    } else {
      await createUser(formData);
    }
    setFormData({
      firstName: "",
      lastName: "",
      title: "",
      salutation: "",
      birthPlace: "",
      birthDate: "",
      address: {
        street: "",
        houseNumber: "",
        postalCode: "",
        city: "",
      },
      email: "",
      username: "",
      phone: "",
      password: "",
    });
    setEditingUserId(null);
    fetchUsers();
  };

  const handleEdit = async (id) => {
    const response = await getUserById(id);
    if (response.success) {
      setFormData(response.data);
      setEditingUserId(id);
    }
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div className="manage-user">
      <h2>User Management</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="salutation"
          placeholder="Salutation"
          value={formData.salutation}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="birthPlace"
          placeholder="Birth Place"
          value={formData.birthPlace}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address.street"
          placeholder="Street"
          value={formData.address.street}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address.houseNumber"
          placeholder="House Number"
          value={formData.address.houseNumber}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address.postalCode"
          placeholder="Postal Code"
          value={formData.address.postalCode}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address.city"
          placeholder="City"
          value={formData.address.city}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">
          {editingUserId ? "Update User" : "Create User"}
        </button>
      </form>

      <h3>Users List</h3>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.phone}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(user._id)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUser;
