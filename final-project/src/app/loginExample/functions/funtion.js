// Import the useState hook to manage local state
import { useState } from 'react';



const useLogin = (router) => {
  // State to hold the email entered by the user
  const [email, setEmail] = useState('');
  
  // State to hold the password entered by the user
  const [password, setPassword] = useState('');
  
  // State to manage any error messages
  const [error, setError] = useState('');
  
  // State to indicate if login was successful
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Function to handle the login process
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setError(''); // Reset any previous errors
    setLoginSuccess(false); // Reset the login success state

    try {
      // Make a POST request to the login API with email and password
      const response = await fetch('../../api/apiLogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      // If the response is not OK, set an error message
      if (!response.ok) {
        setError('An error occurred. Please try again.');
        return;
      }

      // Parse the JSON response
      const data = await response.json();
      
      console.log(data); // Log the response data for debugging

      // Check if the login credentials are valid
      if (data.data === 'valid') {
        setLoginSuccess(true); // Mark login as successful

        // Store the user session data in sessionStorage
        sessionStorage.setItem(
          'user',
          JSON.stringify({ email, role: data.role })
        );

        // Determine the user role and redirect accordingly
        const userRole = data.role.toLowerCase();
        if (userRole === 'customer') {
          router.push('/customer'); // Redirect to customer page
        } else if (userRole === 'manager') {
          router.push('/manager'); // Redirect to manager page
        }
      } else {
        // Set an error message for invalid credentials
        setError('Invalid credentials');
      }
    } catch (err) {
      // Handle any errors that occur during the login process
      setError('An error occurred. Please try again.');
    }
  };

  // Return the state and the handleLogin function to be used in the component
  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loginSuccess,
    handleLogin,
  };
};

export default useLogin;
