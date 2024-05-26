import React, { createContext, useState, useContext } from 'react';

// Creating the context object
const CollegeContext = createContext();

// Custom hook to use the context
export const useColleges = () => useContext(CollegeContext);

// Provider component that encapsulates children components,
// providing them access to the context
export const CollegeProvider = ({ children }) => {
    // State to store the list of colleges
    const [myColleges, setMyColleges] = useState([]);

    // State to track added college IDs
    const [addedCollegeIds, setAddedCollegeIds] = useState(new Set());

    // Function to add a new college to the list and track its ID
    const addCollege = college => {
        setMyColleges(prevColleges => [...prevColleges, college]);
        setAddedCollegeIds(prevIds => new Set(prevIds.add(college.college_id)));
    };

    // Function to check if a college has been added
    const isCollegeAdded = (collegeId) => {
        return addedCollegeIds.has(collegeId);
    };

    // Context provider with value containing both the list of colleges
    // and the functions to modify it and check addition status
    return (
        <CollegeContext.Provider value={{ myColleges, addCollege, isCollegeAdded }}>
            {children}
        </CollegeContext.Provider>
    );
};

export default CollegeContext;
