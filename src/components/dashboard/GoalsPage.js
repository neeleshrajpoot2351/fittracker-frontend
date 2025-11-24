import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { goalsApi } from '../../services/fitnessApi';
import AddGoalModal from '../modals/AddGoalModal';
import './GoalsPage.css';

const GoalsPage = () => {
  const { user } = useAuth();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchGoals();
  }, [user]);

  const fetchGoals = async () => {
    try {
      if (user?.username) {
        const response = await goalsApi.getGoals(user.username);
        console.log('Goals fetched:', response.data);
        setGoals(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching goals:', error);
      setMessage({ type: 'error', text: 'Failed to load goals. You can still add new goals!' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddGoal = async (goalData) => {
    try {
      if (user?.username) {
        await goalsApi.createGoal({
          ...goalData,
          username: user.username,
        });
        setMessage({ type: 'success', text: 'Goal added successfully!' });
        fetchGoals();
      }
    } catch (error) {
      console.error('Error creating goal:', error);
      setMessage({ type: 'error', text: 'Failed to add goal. Please try again.' });
    }
    setShowModal(false);
  };

  const handleDeleteGoal = async (goalId) => {
    if (!window.confirm('Are you sure you want to delete this goal?')) {
      return;
    }
    
    try {
      await goalsApi.deleteGoal(goalId);
      setMessage({ type: 'success', text: 'Goal deleted successfully!' });
      fetchGoals();
    } catch (error) {
      console.error('Error deleting goal:', error);
      setMessage({ type: 'error', text: 'Failed to delete goal.' });
    }
  };

  const handleToggleStatus = async (goal) => {
    const newStatus = goal.status === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED';
    try {
      await goalsApi.updateGoal(goal.id, {
        ...goal,
        status: newStatus,
      });
      setMessage({ type: 'success', text: 'Goal status updated!' });
      fetchGoals();
    } catch (error) {
      console.error('Error updating goal:', error);
      setMessage({ type: 'error', text: 'Failed to update goal status.' });
    }
  };

  const renderGoalItem = (goal) => {
    const isCompleted = goal.status === 'COMPLETED';
    const targetDate = new Date(goal.targetDate);
    const today = new Date();
    const daysLeft = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));

    return (
      <div
        key={goal.id}
        className={`goal-item ${isCompleted ? 'completed' : ''}`}
      >
        <div className="goal-header">
          <span className="goal-name">{goal.description}</span>
          <div className="goal-actions">
            <button
              className="btn btn--sm"
              onClick={() => handleToggleStatus(goal)}
              style={{ marginRight: '8px' }}
            >
              {isCompleted ? '↺ Reopen' : '✓ Complete'}
            </button>
            <button
              className="btn btn--outline btn--sm"
              onClick={() => handleDeleteGoal(goal.id)}
            >
              Delete
            </button>
          </div>
        </div>
        <div className="goal-details">
          <span className="goal-date">
            Target: {targetDate.toLocaleDateString()}
            {!isCompleted && daysLeft >= 0 && ` (${daysLeft} days left)`}
            {!isCompleted && daysLeft < 0 && ` (${Math.abs(daysLeft)} days overdue)`}
          </span>
        </div>
        {isCompleted && <div className="status status--success">Completed ✓</div>}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="dashboard-content active">
        <div className="loading-message">Loading goals...</div>
      </div>
    );
  }

  const inProgressGoals = goals.filter(g => g.status !== 'COMPLETED');
  const completedGoals = goals.filter(g => g.status === 'COMPLETED');

  return (
    <div id="dashboard-goals" className="dashboard-content active">
      <div className="dashboard-header">
        <div className="header-top">
          <div>
            <h1>Goals</h1>
            <p>Track your daily progress and achievements</p>
          </div>
          <button className="btn btn--primary" onClick={() => setShowModal(true)}>
            Add New Goal
          </button>
        </div>
      </div>

      {message.text && (
        <div className={`message message--${message.type}`} style={{ 
          padding: '12px', 
          marginBottom: '16px', 
          borderRadius: '6px',
          backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
          color: message.type === 'success' ? '#155724' : '#721c24',
          border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          {message.text}
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Goals</h3>
          <div className="stat-value">{goals.length}</div>
          <div className="stat-change">All time</div>
        </div>
        <div className="stat-card">
          <h3>In Progress</h3>
          <div className="stat-value">{inProgressGoals.length}</div>
          <div className="stat-change">Active goals</div>
        </div>
        <div className="stat-card">
          <h3>Goals Achieved</h3>
          <div className="stat-value">{completedGoals.length}</div>
          <div className="stat-change positive">Completed</div>
        </div>
      </div>

      <div className="goals-section">
        <h3>Active Goals</h3>
        {inProgressGoals.length > 0 ? (
          <div className="goals-list">
            {inProgressGoals.map(goal => renderGoalItem(goal))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No active goals. Click "Add New Goal" to get started!</p>
          </div>
        )}
      </div>

      {completedGoals.length > 0 && (
        <div className="goals-section">
          <h3>Completed Goals</h3>
          <div className="goals-list">
            {completedGoals.map(goal => renderGoalItem(goal))}
          </div>
        </div>
      )}

      {showModal && <AddGoalModal onClose={() => setShowModal(false)} onAdd={handleAddGoal} />}
    </div>
  );
};

export default GoalsPage;
