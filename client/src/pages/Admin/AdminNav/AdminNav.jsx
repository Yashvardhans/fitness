import React from 'react';

import {Link} from 'react-router-dom'
import './AdminNav.css'

const AdminNav = () => {
    return (
        <div className='admin-nav-bar'>
               
          <div className='link-container'>
            <Link to="/admin" className='side-links'>View Classes</Link>
          </div>
          <div className='link-container'>
            <Link to="/admin/trainers " className='side-links'>View Trainers</Link>
          </div>
        
      </div>
        
    );
};

export default AdminNav;