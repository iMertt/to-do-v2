import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      // For now, we'll just simulate a user
      // In a real app, you would verify the token with your backend
      setCurrentUser({
        id: "1",
        name: "Elif Yılmaz",
        email: "elif@example.com",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      // In a real app, this would be an API call
      // const response = await axios.post('/api/auth/login', { email, password });
      // localStorage.setItem('token', response.data.token);

      // Simulating successful login
      localStorage.setItem("token", "fake-jwt-token");
      setCurrentUser({
        id: "1",
        name: "Elif Yılmaz",
        email: email,
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      });
      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      // In a real app, this would be an API call
      // const response = await axios.post('/api/auth/register', { name, email, password });
      // localStorage.setItem('token', response.data.token);

      // Simulating successful registration
      localStorage.setItem("token", "fake-jwt-token");
      setCurrentUser({
        id: "1",
        name: name,
        email: email,
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      });
      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, loading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
