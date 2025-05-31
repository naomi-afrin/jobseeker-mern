import React, { useEffect } from 'react';
import {useState} from 'react';

const Applications = ({ user }) => {
  console.log("user info here", user.applied)
  const apps = user.applied;
  const appp = [
    { id: 1, company: 'Company A', position: 'Software Engineer' },
    { id: 2, company: 'Company B', position: 'Frontend Developer' },
    { id: 3, company: 'Company C', position: 'Full Stack Developer' },
  ];

  // console.log(user)

  const [applications, setApplications] = useState(apps||appp);

  useEffect(() => {
    // setApplications(user.applied);
  }, []);

  

  return (
    <div className="mt-7">
      <h1 className="text-2xl font-bold mb-4">Job Applications</h1>
      <p>Your total application: {applications.length}</p>
      <ul className="grid grid-cols-1 gap-4">
        {applications.map((id) => (
          <li
            key={id}
            className="bg-white shadow-md p-4 rounded-md"
          >
            <h2 className="text-lg font-semibold mb-2">
              Job Id
            </h2>
            <p className="text-gray-500">{id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Applications;
