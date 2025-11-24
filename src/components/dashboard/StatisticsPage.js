import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { statisticsApi } from '../../services/fitnessApi';
import MonthlyProgressChart from '../charts/MonthlyProgressChart';
import './StatisticsPage.css';

const StatisticsPage = () => {
  const { user } = useAuth();
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistics();
  }, [user]);

  const fetchStatistics = async () => {
    try {
      if (user?.username || user?.email) {
        const username = user.username || user.email;
        const [dashboardResponse, historyResponse] = await Promise.all([
          statisticsApi.getDashboardStats(username),
          statisticsApi.getUserHistory(username),
        ]);
        setStatsData({
          dashboard: dashboardResponse.data,
          history: historyResponse.data,
        });
      } else {
        setStatsData(getMockData());
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
      setStatsData(getMockData());
    } finally {
      setLoading(false);
    }
  };

  const getMockData = () => ({
    dashboard: {
      totalWorkouts: 127,
      caloriesBurned: 45280,
      activeDaysPercentage: 89,
      personalRecords: 12,
    },
    history: {
      workoutCalendar: {
        month: 'September 2025',
        workoutDays: [1, 3, 5, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30],
      },
      activityBreakdown: [
        { name: 'Strength Training', sessions: 45, percentage: 35 },
        { name: 'Cardio', sessions: 38, percentage: 30 },
        { name: 'HIIT', sessions: 25, percentage: 20 },
        { name: 'Yoga/Flexibility', sessions: 19, percentage: 15 },
      ],
      monthlyProgress: [28, 21, 14, 7, 0, 28],
      recentWorkouts: [
        { type: 'Cardio', date: '2024-01-15', duration: '45 min', calories: '420 cal', exercises: '6 exercises' },
        { type: 'Strength', date: '2024-01-14', duration: '60 min', calories: '380 cal', exercises: '8 exercises' },
        { type: 'Yoga', date: '2024-01-13', duration: '30 min', calories: '150 cal', exercises: '12 exercises' },
        { type: 'HIIT', date: '2024-01-12', duration: '25 min', calories: '320 cal', exercises: '5 exercises' },
        { type: 'Strength', date: '2024-01-11', duration: '55 min', calories: '400 cal', exercises: '7 exercises' },
        { type: 'Cardio', date: '2024-01-10', duration: '40 min', calories: '360 cal', exercises: '4 exercises' },
      ],
    },
  });

  const renderWorkoutCalendar = () => {
    const workoutDays = statsData?.history?.workoutCalendar?.workoutDays || [1, 3, 5, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];
    const daysInMonth = 30;
    const calendarDays = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const isWorkoutDay = workoutDays.includes(day);
      calendarDays.push(
        <div
          key={day}
          className={`calendar-day ${isWorkoutDay ? 'workout-day' : ''}`}
          title={isWorkoutDay ? 'Workout completed' : ''}
        >
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const data = statsData || getMockData();

  return (
    <div id="dashboard-statistics" className="dashboard-content active">
      <div className="dashboard-header">
        <h1>Statistics</h1>
        <p>Detailed analytics and comprehensive fitness insights</p>
      </div>

      <div className="stats-overview-grid">
        <div className="stat-card">
          <h3>Total Workouts</h3>
          <div className="stat-value">{data.dashboard?.totalWorkouts || 127}</div>
          <div className="stat-change positive">All time</div>
        </div>
        <div className="stat-card">
          <h3>Calories Burned</h3>
          <div className="stat-value">{data.dashboard?.caloriesBurned?.toLocaleString() || '45,280'}</div>
          <div className="stat-change">Total calories</div>
        </div>
        <div className="stat-card">
          <h3>Active Days</h3>
          <div className="stat-value">{data.dashboard?.activeDaysPercentage || 89}%</div>
          <div className="stat-change positive">This month</div>
        </div>
        <div className="stat-card">
          <h3>Personal Records</h3>
          <div className="stat-value">{data.dashboard?.personalRecords || 12}</div>
          <div className="stat-change">Achievements</div>
        </div>
      </div>

      <div className="statistics-grid">
        <div className="stats-card">
          <h3>Workout Calendar - {data.history?.workoutCalendar?.month || 'September 2025'}</h3>
          <div className="calendar-grid">{renderWorkoutCalendar()}</div>
        </div>

        <div className="stats-card">
          <h3>Activity Breakdown</h3>
          <div className="activity-breakdown">
            {(data.history?.activityBreakdown || []).map((item, index) => (
              <div key={index} className="breakdown-item">
                <span className="breakdown-label">{item.name}</span>
                <span className="breakdown-value">
                  {item.sessions} sessions ({item.percentage}%)
                </span>
                <div className="breakdown-bar">
                  <div
                    className="breakdown-fill"
                    style={{
                      width: `${item.percentage}%`,
                      background:
                        index === 0
                          ? '#22c55e'
                          : index === 1
                          ? '#3b82f6'
                          : index === 2
                          ? '#f59e0b'
                          : '#8b5cf6',
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="stats-card">
        <h3>Monthly Progress Chart</h3>
        <div className="chart-container" style={{ position: 'relative', height: '300px' }}>
          <MonthlyProgressChart data={data.history?.monthlyProgress || [28, 21, 14, 7, 0, 28]} />
        </div>
      </div>

      <div className="stats-card">
        <h3>Recent Workout History</h3>
        <div className="workout-history">
          {(data.history?.recentWorkouts || []).map((workout, index) => (
            <div key={index} className="workout-item">
              <div className="workout-details">
                <h4>{workout.type} Workout</h4>
                <p className="workout-meta">
                  {workout.date} • {workout.duration} • {workout.calories} • {workout.exercises}
                </p>
              </div>
              <button className="btn btn--outline btn--sm">View Details</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;


