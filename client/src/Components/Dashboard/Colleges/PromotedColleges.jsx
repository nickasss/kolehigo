import React, { useState, useEffect } from 'react';
import Axios from 'axios';


const PromotedColleges = ({ addToColleges }) => { // Accept addToColleges function as a prop
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3010/colleges')
      .then(response => {
        setColleges(response.data);
      })
      .catch(error => {
        console.error('Error fetching colleges:', error);
      });
  }, []);

  const handleAddToColleges = (college) => {
    addToColleges(college); // Call the addToColleges function with the selected college
  };

  return (
    <div className='Promoted-colleges'>
      {colleges.map((college) => (
        <div className='college' key={college.id}>
          <div className='Left'>
            <img src={college.logo} alt={college.name} className='logo'/>
            <h5>{college.name}</h5>
            <p>{college.address}</p>
          </div>
          <div className="Right">
            {/* Pass the college object to the handleAddToColleges function */}
            <button className='Add-colleges' onClick={() => handleAddToColleges(college)}>Add to Colleges</button>
            <button className='view'>View</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromotedColleges;