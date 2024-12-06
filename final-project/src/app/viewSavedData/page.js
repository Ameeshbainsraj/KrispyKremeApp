'use client';

import { useEffect, useState } from 'react';

export default function ViewSavedData() {
  const [sessionData, setSessionData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the session data from the API
    fetch('../viewSavedData/api/route')
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error); // Handle errors returned from the API
        } else if (data.email && data.role) {
          setSessionData(data); // Successfully set session data
        } else {
          setError('Session data not found');
        }
      })
      .catch((error) => {
        console.error('Error fetching session data:', error);
        setError('Failed to load session data');
      });
  }, []);

  return (
    <div>
      <h1>Session Data</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {sessionData ? (
        <div>
          <p>Email: {sessionData.email}</p>
          <p>Role: {sessionData.role}</p>
        </div>
      ) : (
        !error && <p>Loading...</p> // Only show loading if no error exists
      )}
    </div>
  );
}
