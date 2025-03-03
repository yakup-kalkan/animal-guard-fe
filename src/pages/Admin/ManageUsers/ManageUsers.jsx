import React, { useState, useEffect, useContext } from "react";
import { ToasterContext } from "../../../context/ToasterContext";
import { userService } from "../../../services/api-service";
import "./ManageUsers.css";

const ManageUsers = () => {
  const { toaster } = useContext(ToasterContext);
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
    isAdmin: false,
  });
  const [editingUserId, setEditingUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await userService.getAll();
      setUsers(response);
    } catch (error) {
      toaster.error("An error occurred while fetching users!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingUserId) {
        await userService.update(editingUserId, formData);
      } else {
        await userService.create(formData);
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
        isAdmin: false,
      });
      setEditingUserId(null);
      fetchUsers();
    } catch (error) {
      toaster.error("An error occurred while saving the user!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    setLoading(true);
    try {
      const response = await userService.getById(id);
      setFormData(response);
      setEditingUserId(id);
    } catch (error) {
      toaster.error("An error occurred while fetching user!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await userService.delete(id);
      fetchUsers();
    } catch (error) {
      toaster.error("An error occurred while deleting the user!");
      console.error(error);
    } finally {
      setLoading(false);
    }
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
          name="street"
          placeholder="Street"
          value={formData.address.street}
          onChange={handleAddressChange}
        />
        <input
          type="text"
          name="houseNumber"
          placeholder="House Number"
          value={formData.address.houseNumber}
          onChange={handleAddressChange}
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={formData.address.postalCode}
          onChange={handleAddressChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.address.city}
          onChange={handleAddressChange}
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
        <label>
          <input
            type="checkbox"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={() =>
              setFormData((prev) => ({ ...prev, isAdmin: !prev.isAdmin }))
            }
          />
          Is Admin
        </label>
        <button type="submit" className="btn-save">
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
                  className="btn-edit"
                  //onClick={() => handleEdit(user._id)}
                  onClick={() => {
                    console.log("Editing user ID:", user._id);
                    handleEdit(user._id);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
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

export default ManageUsers;
