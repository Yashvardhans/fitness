import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClassBooking from '../User/ClassBooking/ClassBooking';
import AdminNav from './AdminNav/AdminNav';

import './Admin.css';

const Admin = () => {
  const baseURL = 'http://localhost:5000';

  const [classes, setClasses] = useState([]);
  

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

  
  return (
    <div>
      <AdminNav></AdminNav>
      <h2>All Classes</h2>
      <div className="class-container">
        {classes.map((cl) => (
          <div key={cl._id} className='class-card'>
            <h2>{cl.name}</h2>
            <p>{cl.description}</p>
            <button onClick={() => deleteClass(cl._id)}>Delete</button>
            
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default Admin;
