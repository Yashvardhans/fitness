import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClassBooking from '../User/ClassBooking/ClassBooking';
import AdminNav from './AdminNav/AdminNav';

import './Admin.css';

const Admin = () => {
  const baseURL = 'http://localhost:5000';

  const [classes, setClasses] = useState([]);
  const [editingClass, setEditingClass] = useState(null); // Track the class being edited
  const [updatedClassData, setUpdatedClassData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/class/getClass`);
      setClasses(response.data);
    } catch (error) {
      console.error('Failed to fetch classes:', error);
    }
  };

  const deleteClass = async (classId) => {
    try {
      await axios.delete(`${baseURL}/api/class/deleteClass/${classId}`);
      fetchClasses();
    } catch (error) {
      console.error('Failed to delete class:', error);
    }
  };

  const handleUpdateClass = (classId) => {
    const classToUpdate = classes.find((cl) => cl._id === classId);
    if (classToUpdate) {
      setEditingClass(classId);
      setUpdatedClassData({
        name: classToUpdate.name,
        description: classToUpdate.description,
      });
    }
  };

  const handleCancelUpdate = () => {
    setEditingClass(null);
    setUpdatedClassData({ name: '', description: '' });
  };

  const handleUpdateInputChange = (e) => {
    setUpdatedClassData({
      ...updatedClassData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateSubmit = async (classId) => {
    try {
      await axios.patch(`${baseURL}/api/class/updateClass/${classId}`, {
        name: updatedClassData.name,
        description: updatedClassData.description,
      });
      fetchClasses();
      setEditingClass(null);
      setUpdatedClassData({ name: '', description: '' });
    } catch (error) {
      console.error('Failed to update class:', error);
    }
  };

  return (
    <div>
      <AdminNav></AdminNav>
      <h2>All Classes</h2>
      <div className="class-container">
        {classes.map((cl) => (
          <div key={cl._id} className="class-card">
            {editingClass === cl._id ? (
              <form onSubmit={() => handleUpdateSubmit(cl._id)}>
                <input
                  type="text"
                  name="name"
                  value={updatedClassData.name}
                  onChange={handleUpdateInputChange}
                />
                <input
                  type="text"
                  name="description"
                  value={updatedClassData.description}
                  onChange={handleUpdateInputChange}
                />
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelUpdate}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <h2>{cl.name}</h2>
                <p>{cl.description}</p>
                <button onClick={() => deleteClass(cl._id)}>Delete</button>
                <button onClick={() => handleUpdateClass(cl._id)}>
                  Update
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;

