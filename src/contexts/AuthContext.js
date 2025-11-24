import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('fittracker_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const storedToken = localStorage.getItem('fittracker_token');
    const storedUser = localStorage.getItem('fittracker_user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await api.post('/api/auth/login', { username, password });
      const { token: jwtToken, username: responseUsername, name, email } = response.data;
      
      // Store user info including name
      const userData = { 
        username: responseUsername || username, 
        name: name || responseUsername,
        email: email || username 
      };
      
      setToken(jwtToken);
      setUser(userData);
      localStorage.setItem('fittracker_token', jwtToken);
      localStorage.setItem('fittracker_user', JSON.stringify(userData));
      localStorage.setItem('fittracker_logged_in', 'true');
      
      api.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed. Please check your credentials.' 
      };
    }
  };

  const signup = async (username, name, email, password) => {
    try {
      console.log('Signing up with:', { username, name, email }); // Debug log
      const response = await api.post('/api/auth/signup', { username, name, email, password });
      console.log('Signup response:', response.data); // Debug log
      
      // Auto-login after signup
      return await login(username, password);
    } catch (error) {
      console.error('Signup error:', error);
      console.error('Error response:', error.response?.data); // Debug log
      
      // Extract error message from response
      let errorMessage = 'Signup failed. Please try again.';
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      }
      
      return { 
        success: false, 
        error: errorMessage
      };
    }
  };

  const updateProfile = async (updates) => {
    try {
      if (!user?.username) {
        throw new Error('No user logged in');
      }
      
      const response = await api.put(`/api/users/${user.username}`, updates);
      const updatedUserData = { ...user, ...response.data };
      
      setUser(updatedUserData);
      localStorage.setItem('fittracker_user', JSON.stringify(updatedUserData));
      
      return { success: true, data: updatedUserData };
    } catch (error) {
      console.error('Profile update error:', error);
      return { 
        success: false, 
        error: error.response?.data || 'Failed to update profile.' 
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('fittracker_token');
    localStorage.removeItem('fittracker_user');
    localStorage.removeItem('fittracker_logged_in');
    delete api.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    token,
    login,
    signup,
    logout,
    updateProfile,
    isAuthenticated: !!token,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


