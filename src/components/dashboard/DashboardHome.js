import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { statisticsApi } from '../../services/fitnessApi';
import ActivityChart from '../charts/ActivityChart';
import MoodChart from '../charts/MoodChart';
import './DashboardHome.css';

const DashboardHome = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (user?.username || user?.email) {
          const username = user.username || user.email;
          const response = await statisticsApi.getDashboardStats(username);
          setDashboardData(response.data);
        } else {
          // Fallback to mock data if no user
          setDashboardData(getMockData());
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setDashboardData(getMockData());
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const getMockData = () => ({
    dailyStats: {
      calories: 420,
      caloriesChange: '+2%',
      sleepHours: 7.5,
      sleepQuality: 'Good quality sleep',
      workoutsThisWeek: 3,
      activeDays: 15,
    },
    weeklyActivity: [450, 380, 420, 350, 480, 390, 410],
    dailyMood: [4, 3, 4, 5, 3, 4, 4],
    sleepData: {
      lastNight: '7.5 hours',
      quality: '85%',
      wakeTime: '06:30 AM',
      alarmTime: '06:30',
      alarmStatus: 'Active',
      alarmSound: 'Gentle Wake',
    },
    weeklyGoalsProgress: {
      overall: 75,
      cardio: { current: 4, target: 5 },
      strength: { current: 3, target: 5 },
    },
    recentActivity: [
      { type: 'workout', title: 'Morning Cardio', details: '30 minutes • 280 calories burned', time: 'Today 7:30 AM' },
      { type: 'achievement', title: 'Weekly Goal Achieved!', details: 'Completed 5 strength training sessions', time: 'Yesterday 6:45 PM' },
      { type: 'workout', title: 'Full Body Workout', details: '45 minutes • 8 exercises completed', time: '2 days ago 8:15 PM' },
    ],
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const data = dashboardData || getMockData();
  const userName = user?.name || user?.username || 'Alex';

  return (
    <div id="dashboard-home" className="dashboard-content active">
      <div className="dashboard-header">
        <h1>Welcome back, {userName}!</h1>
        <p>Ready to crush your fitness goals today?</p>
        <div className="motivational-quote">
          <em>"The groundwork for all happiness is good health." - Leigh Hunt</em>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Today's Calories</h3>
          <div className="stat-value">{data.dailyStats?.calories || 420}</div>
          <div className="stat-change positive">
            {data.dailyStats?.caloriesChange || '+2%'} from yesterday
          </div>
        </div>
        <div className="stat-card">
          <h3>Sleep Quality</h3>
          <div className="stat-value">{data.dailyStats?.sleepHours || 7.5}h</div>
          <div className="stat-change">{data.dailyStats?.sleepQuality || 'Good quality sleep'}</div>
        </div>
        <div className="stat-card">
          <h3>Workouts</h3>
          <div className="stat-value">{data.dailyStats?.workoutsThisWeek || 3}</div>
          <div className="stat-change">This week</div>
        </div>
        <div className="stat-card">
          <h3>Streak</h3>
          <div className="stat-value">{data.dailyStats?.activeDays || 15}</div>
          <div className="stat-change positive">Days active</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Weekly Activity Overview</h3>
          <div className="chart-container" style={{ position: 'relative', height: '300px' }}>
            <ActivityChart data={data.weeklyActivity || [450, 380, 420, 350, 480, 390, 410]} />
          </div>
        </div>
        <div className="chart-card">
          <h3>Daily Mood Tracker</h3>
          <div className="chart-container" style={{ position: 'relative', height: '300px' }}>
            <MoodChart data={data.dailyMood || [4, 3, 4, 5, 3, 4, 4]} />
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button className="btn btn--primary btn--lg">Start Workout</button>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <h3>Sleep Schedule</h3>
          <div className="sleep-info">
            <p>
              <strong>Last Night:</strong> {data.sleepData?.lastNight || '7.5 hours'}
            </p>
            <p>
              <strong>Sleep Quality:</strong> {data.sleepData?.quality || '85%'}
            </p>
            <p>
              <strong>Wake up:</strong> {data.sleepData?.wakeTime || '06:30 AM'}
            </p>
          </div>
        </div>
        <div className="info-card">
          <h3>Weekly Goals</h3>
          <div className="weekly-progress">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${data.weeklyGoalsProgress?.overall || 75}%` }}
              ></div>
            </div>
            <p>{data.weeklyGoalsProgress?.overall || 75}% progress</p>
            <p>
              <strong>Cardio:</strong> {data.weeklyGoalsProgress?.cardio?.current || 4}/
              {data.weeklyGoalsProgress?.cardio?.target || 5} sessions
            </p>
            <p>
              <strong>Strength:</strong> {data.weeklyGoalsProgress?.strength?.current || 3}/
              {data.weeklyGoalsProgress?.strength?.target || 5} sessions
            </p>
          </div>
        </div>
        <div className="info-card">
          <h3>Wake Up Alarm</h3>
          <div className="alarm-info">
            <p>
              <strong>{data.sleepData?.alarmTime || '06:30'}</strong> Tomorrow morning
            </p>
            <p>
              <strong>Alarm Status:</strong> {data.sleepData?.alarmStatus || 'Active'}
            </p>
            <p>
              <strong>Sound:</strong> {data.sleepData?.alarmSound || 'Gentle Wake'}
            </p>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          {(data.recentActivity || []).map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-icon">
                {activity.type === 'workout' ? '🏃' : activity.type === 'achievement' ? '🏆' : '💪'}
              </div>
              <div className="activity-content">
                <h4>{activity.title}</h4>
                <p>{activity.details}</p>
                <span className="activity-time">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;


