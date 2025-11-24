import api from './api';

// Goals API
export const goalsApi = {
  getGoals: (username) => api.get(`/api/goals/user/${username}`),
  createGoal: (goalData) => api.post('/api/goals', goalData),
  updateGoal: (id, goalData) => api.put(`/api/goals/${id}`, goalData),
  deleteGoal: (id) => api.delete(`/api/goals/${id}`),
};

// Workouts API
export const workoutsApi = {
  logWorkout: (routineId, workoutData) => api.post(`/api/workouts/log/${routineId}`, workoutData),
  getWorkoutHistory: (username) => api.get(`/api/workouts/history/${username}`),
};

// Routines API
export const routinesApi = {
  getRoutines: (username) => api.get(`/api/routines/user/${username}`),
  createRoutine: (routineData) => api.post('/api/routines', routineData),
  updateRoutine: (id, routineData) => api.put(`/api/routines/${id}`, routineData),
  deleteRoutine: (id) => api.delete(`/api/routines/${id}`),
};

// Diet API
export const dietApi = {
  logFood: (foodData) => api.post('/api/diet/log', foodData),
  getFoodLogs: (username, date) => {
    const params = date ? { date } : {};
    return api.get(`/api/diet/log/user/${username}`, { params });
  },
};

// Statistics API
export const statisticsApi = {
  getDashboardStats: (username) => api.get(`/api/stats/dashboard/${username}`),
  getUserHistory: (username) => api.get(`/api/stats/history/${username}`),
};


