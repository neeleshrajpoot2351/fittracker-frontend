import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import DashboardHome from '../components/dashboard/DashboardHome';
import GoalsPage from '../components/dashboard/GoalsPage';
import StatisticsPage from '../components/dashboard/StatisticsPage';
import RecommendationsPage from '../components/dashboard/RecommendationsPage';
import ProfilePage from '../components/dashboard/ProfilePage';
import CoachPage from '../components/dashboard/CoachPage';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div id="dashboard-page" className="dashboard-layout">
      <Sidebar onLogout={handleLogout} user={user} />
      <main className="dashboard-main">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/coach" element={<CoachPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;


