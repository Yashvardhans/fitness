import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AdminNav from '../../Admin/AdminNav/AdminNav';

const AllTrainer = () => {
  const baseURL = 'http://localhost:5000';
  const [trainers, setTrainers] = useState([]);
  const [editingTrainer, setEditingTrainer] = useState(null);
  const [updatedTrainerData, setUpdatedTrainerData] = useState({
    name: '',
    email: '',
    mobile: '',
    spec: '',
  });

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/getCoach`);
      setTrainers(response.data);
    } catch (error) {
      console.error('Failed to fetch trainers:', error);
    }
  };

  const deleteTrainer = async (trainerId) => {
    alert('Are you sure?');
    try {
      await axios.delete(`${baseURL}/api/deleteCoach/${trainerId}`);
      fetchTrainers();
    } catch (error) {
      console.error('Failed to delete trainer:', error);
    }
  };

  const handleUpdateTrainer = (trainerId) => {
    const trainerToUpdate = trainers.find((trainer) => trainer._id === trainerId);
    if (trainerToUpdate) {
      setEditingTrainer(trainerId);
      setUpdatedTrainerData({
        name: trainerToUpdate.name,
        email: trainerToUpdate.email,
        mobile: trainerToUpdate.mobile,
        spec: trainerToUpdate.spec,
      });
    }
  };

  const handleCancelUpdate = () => {
    setEditingTrainer(null);
    setUpdatedTrainerData({
      name: '',
      email: '',
      mobile: '',
      spec: '',
    });
  };

  const handleUpdateInputChange = (e) => {
    setUpdatedTrainerData({
      ...updatedTrainerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateSubmit = async (trainerId) => {
    try {
      await axios.patch(`${baseURL}/api/updateCoach/${trainerId}`, {
        name: updatedTrainerData.name,
        email: updatedTrainerData.email,
        mobile: updatedTrainerData.mobile,
        spec: updatedTrainerData.spec,
      });
      fetchTrainers();
      setEditingTrainer(null);
      setUpdatedTrainerData({
        name: '',
        email: '',
        mobile: '',
        spec: '',
      });
    } catch (error) {
      console.error('Failed to update trainer:', error);
    }
  };

  return (
    <div>
      <AdminNav></AdminNav>
      <h2>All Trainers</h2>
      <div className="coach-container">
        {trainers.map((trainer) => (
          <div key={trainer._id} className="trainer-card">
            {editingTrainer === trainer._id ? (
              <form onSubmit={() => handleUpdateSubmit(trainer._id)}>
                <input
                  type="text"
                  name="name"
                  value={updatedTrainerData.name}
                  onChange={handleUpdateInputChange}
                />
                <input
                  type="text"
                  name="email"
                  value={updatedTrainerData.email}
                  onChange={handleUpdateInputChange}
                />
                <input
                  type="text"
                  name="mobile"
                  value={updatedTrainerData.mobile}
                  onChange={handleUpdateInputChange}
                />
                <input
                  type="text"
                  name="spec"
                  value={updatedTrainerData.spec}
                  onChange={handleUpdateInputChange}
                />
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelUpdate}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <h2>{trainer.name}</h2>
                <div>{trainer.email}</div>
                <div>{trainer.mobile}</div>
                <div>{trainer.spec}</div>
                <button onClick={() => deleteTrainer(trainer._id)}>
                  Delete
                </button>
                <button onClick={() => handleUpdateTrainer(trainer._id)}>
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

export default AllTrainer;
