import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AdminNav from '../../Admin/AdminNav/AdminNav';


const AllTrainer = () => {
    const baseURL = 'http://localhost:5000';
    const [trainers, setTrainers] = useState([]);

    useEffect(()=>{
        fetchTrainers();
    })
    const fetchTrainers = async () => {
        try {
          const response = await axios.get(`${baseURL}/api/getCoach`);
          setTrainers(response.data);
        } catch (error) {
          console.error('Failed to fetch trainers:', error);
        }
      };

      const deleteTrainer = async (trainerId) => {
        alert('are you sure')
        try {
          await axios.delete(`${baseURL}/api/deleteCoach/${trainerId}`);
          fetchTrainers();
        } catch (error) {
          console.error('Failed to delete trainer:', error);
        }
      };
    
    return (
        <div>
            <AdminNav></AdminNav>
             <h2>All Trainers</h2>
      <div className="coach-container">
        {trainers.map((trainer) => (
          <div key={trainer._id} className='trainer-card'>
            <h2>{trainer.name}</h2>
            <div>{trainer.email}</div>
            <div>{trainer.mobile}</div>
            <div>{trainer.spec}</div>
            <button onClick={() => deleteTrainer(trainer._id)}>Delete</button>
          </div>
        ))}
      </div>
        </div>
    );
};

export default AllTrainer;