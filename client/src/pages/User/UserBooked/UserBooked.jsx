import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideNav from '../SideNavBar/SideNavBar';
import './UserBooked.css'

import moment from 'moment'; 

const UserBooking = () => {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem('userId'); // Get the userId from local storage

  useEffect(() => {
    fetchUserBookings();
  }, [userId]);

  const fetchUserBookings = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
      const { bookings } = response.data;
      setBookings(bookings);
    } catch (error) {
      console.error('Failed to fetch user bookings:', error);
    }
  };

  return (
    <div>
      <SideNav></SideNav>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <ul className='booking-container'>
          {bookings.map(booking => (
            <li className='booking-list' >
              <p>Class Name : {booking.class.name}</p>
              <p>Start Time : {moment(booking.class.startTime).format("MMMM DD, YYYY, h:mm A")}</p>
              <p>End Time : { moment(booking.class.endTime).format("MMMM DD, YYYY, h:mm A")}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserBooking;
