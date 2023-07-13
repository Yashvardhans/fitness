import React, { useState } from 'react';
import axios from 'axios';

const ClassBooking = ({ classId, userId }) => {
  const [bookingError, setBookingError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    try {
      setLoading(true);
      setBookingError('');

      const response = await axios.post(`http://localhost:5000/api/class/${classId}/book`, {
        userId,
      });

      console.log(response.data);
      alert('Class Booked successfully')

      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        setBookingError(error.response.data.error);
      } else {
        setBookingError('Failed to book class');
      }
    }
  };

  return (
    <div>
      {bookingError && <p>{bookingError}</p>}
      <button onClick={handleBooking} disabled={loading} >
        {loading ? 'Booking...' : 'Book class'}
      </button>
    </div>
  );
};

export default ClassBooking;
