import React, { useState } from 'react';
import './CoachPage.css';

const CoachPage = () => {
  const [formData, setFormData] = useState({
    goal: 'fat_loss',
    minutes: '30',
    place: 'home',
    equipment: 'none',
    level: 'beginner',
    sleep: '7',
    stress: '3',
  });
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const coachMockRecommend = (payload) => {
    const workoutPlans = {
      fat_loss: {
        none: {
          beginner: {
            name: '15-Min Fat Burn Cardio',
            steps: [
              'Warm-up: 3 min light jogging in place',
              '4 rounds: 30s jumping jacks, 30s rest',
              '4 rounds: 30s high knees, 30s rest',
              '4 rounds: 30s butt kicks, 30s rest',
              'Cool-down: 3 min walking and stretching'
            ]
          },
          intermediate: {
            name: '20-Min HIIT Fat Burner',
            steps: [
              'Warm-up: 3 min dynamic stretches',
              '5 rounds: 40s burpees, 20s rest',
              '5 rounds: 40s mountain climbers, 20s rest',
              '5 rounds: 40s jump squats, 20s rest',
              'Cool-down: 5 min stretching'
            ]
          }
        },
        dumbbells: {
          beginner: {
            name: '15-Min Dumbbell Circuit',
            steps: [
              'Warm-up: 3 min arm circles',
              '3 rounds: Goblet Squat x12, rest 45s',
              '3 rounds: Dumbbell Shoulder Press x10, rest 45s',
              '3 rounds: Bent-over Row x12, rest 45s',
              'Cool-down: 3 min stretching'
            ]
          },
          intermediate: {
            name: '25-Min Full Body Strength',
            steps: [
              'Warm-up: 5 min light cardio',
              '4 rounds: Deadlifts x10, rest 60s',
              '4 rounds: Chest Press x12, rest 60s',
              '4 rounds: Lunges x10 each leg, rest 60s',
              '4 rounds: Bicep Curls x12, rest 45s',
              'Cool-down: 5 min stretching'
            ]
          }
        }
      },
      muscle_gain: {
        none: {
          beginner: {
            name: '15-Min Bodyweight Strength',
            steps: [
              'Warm-up: 3 min dynamic stretches',
              '3 rounds: Push-ups x8-10',
              '3 rounds: Squats x15',
              '3 rounds: Plank holds x30s',
              'Cool-down: 2 min stretching'
            ]
          },
          intermediate: {
            name: '25-Min Advanced Bodyweight',
            steps: [
              'Warm-up: 5 min cardio',
              '4 rounds: Diamond push-ups x12',
              '4 rounds: Jump squats x15',
              '4 rounds: Pull-ups x8 (or assisted)',
              '4 rounds: Plank to push-up x10',
              'Cool-down: 5 min stretching'
            ]
          }
        },
        dumbbells: {
          beginner: {
            name: '20-Min Muscle Builder',
            steps: [
              'Warm-up: 5 min light cardio',
              '3 rounds: Dumbbell Squats x12',
              '3 rounds: Shoulder Press x10',
              '3 rounds: Rows x12 each arm',
              '3 rounds: Hammer Curls x12',
              'Cool-down: 3 min stretching'
            ]
          },
          intermediate: {
            name: '30-Min Hypertrophy Session',
            steps: [
              'Warm-up: 5 min cardio + stretches',
              '4 rounds: Romanian Deadlifts x10',
              '4 rounds: Incline Chest Press x12',
              '4 rounds: Bulgarian Split Squats x10 each',
              '4 rounds: Lateral Raises x15',
              '4 rounds: Tricep Extensions x12',
              'Cool-down: 5 min stretching'
            ]
          }
        }
      },
      stay_active: {
        none: {
          beginner: {
            name: '10-Min Gentle Movement',
            steps: [
              'Warm-up: 2 min walking in place',
              '3 min light stretching',
              '3 min gentle yoga poses',
              '2 min breathing exercises'
            ]
          },
          intermediate: {
            name: '15-Min Active Flow',
            steps: [
              'Warm-up: 3 min walking',
              '5 min yoga flow',
              '5 min bodyweight exercises',
              '2 min cool-down stretches'
            ]
          }
        }
      }
    };

    const selectedPlan = workoutPlans[payload.goal]?.[payload.equipment]?.[payload.fitnessLevel] 
      || workoutPlans.fat_loss.none.beginner;

    return {
      date: new Date().toISOString().slice(0, 10),
      workout: {
        id: `workout_${Date.now()}`,
        ...selectedPlan
      },
      sleepTip: {
        id: 's1',
        text: payload.sleepHours < 7 
          ? '💤 Tip: Aim for 7-9 hours of sleep. Try going to bed 30 minutes earlier tonight.' 
          : '💤 Great sleep! Maintain a consistent sleep schedule for best results.'
      },
      fruit: {
        id: 'f1',
        name: payload.goal === 'muscle_gain' ? 'Banana' : 'Apple',
        why: payload.goal === 'muscle_gain'
          ? 'Rich in potassium - great for post-workout recovery and muscle cramps prevention.'
          : 'High in fiber and antioxidants - keeps you full and supports fat loss.'
      },
      habit: {
        id: 'h2',
        text: payload.stress1to5 >= 3
          ? '🧘 Take a 5-minute mindfulness break after lunch to reduce stress.'
          : '💧 Drink a glass of water every time you check your phone.'
      },
      nutrition: {
        protein: payload.goal === 'muscle_gain' ? '1.6-2.0g per kg bodyweight' : '1.2-1.6g per kg bodyweight',
        calories: payload.goal === 'fat_loss' ? 'Slight deficit (300-500 cal below maintenance)' : 
                  payload.goal === 'muscle_gain' ? 'Slight surplus (200-400 cal above maintenance)' : 'Maintenance level',
      },
      difficulty: payload.sleepHours < 6 ? 'easy' : 'moderate',
      whyThis: `Personalized for: ${payload.timePerDay} min, ${payload.place}, ${payload.fitnessLevel} level, ${payload.goal} goal`,
    };
  };

  const handleGetPlan = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const payload = {
        goal: formData.goal,
        timePerDay: parseInt(formData.minutes, 10),
        place: formData.place,
        equipment: formData.equipment,
        fitnessLevel: formData.level,
        sleepHours: parseInt(formData.sleep, 10),
        stress1to5: parseInt(formData.stress, 10),
      };
      const recommendedPlan = coachMockRecommend(payload);
      setPlan(recommendedPlan);
      setLoading(false);
    }, 500);
  };

  const handleSwap = () => {
    const payload = {
      goal: formData.goal,
      timePerDay: parseInt(formData.minutes, 10),
      place: formData.place,
      equipment: formData.equipment,
      fitnessLevel: formData.level,
      sleepHours: parseInt(formData.sleep, 10),
      stress1to5: parseInt(formData.stress, 10),
    };
    const newPlan = coachMockRecommend(payload);
    setPlan(newPlan);
  };

  const handleFeedback = (status) => {
    const feedback = {
      done: '🎉 Awesome! Great job completing your workout!',
      too_hard: '💪 Noted! Next time, we\'ll adjust the intensity down.',
      tired: '😴 Rest is important! Consider a lighter workout tomorrow.',
      pain: '⚠️ Stop immediately if you\'re in pain. Consider consulting a doctor.'
    };
    
    if (status === 'done' && plan) {
      // Add to history
      const completedWorkout = {
        date: new Date().toISOString(),
        name: plan.workout.name,
        duration: formData.minutes,
        goal: formData.goal,
      };
      setWorkoutHistory(prev => [completedWorkout, ...prev]);
    }
    
    alert(feedback[status]);
  };

  return (
    <div id="dashboard-coach" className="dashboard-content active">
      <div className="dashboard-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div>
            <h1>🤖 AI Coach</h1>
            <p>Your personalized fitness coach - workout, nutrition, sleep, and habits</p>
          </div>
          {workoutHistory.length > 0 && (
            <button className="btn btn--outline" onClick={() => setShowHistory(!showHistory)}>
              {showHistory ? 'Hide' : 'View'} History ({workoutHistory.length})
            </button>
          )}
        </div>
      </div>

      {showHistory && workoutHistory.length > 0 && (
        <div className="history-card">
          <h3>Workout History</h3>
          <div className="history-list">
            {workoutHistory.map((workout, idx) => (
              <div key={idx} className="history-item">
                <div className="history-icon">✅</div>
                <div className="history-content">
                  <strong>{workout.name}</strong>
                  <p>{new Date(workout.date).toLocaleDateString()} • {workout.duration} mins • {workout.goal.replace('_', ' ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="coach-card">
        <div className="form-grid">
          <div className="form-row">
            <label>🎯 Goal</label>
            <select name="goal" value={formData.goal} onChange={handleChange}>
              <option value="fat_loss">Fat Loss</option>
              <option value="muscle_gain">Muscle Gain</option>
              <option value="stay_active">Stay Active</option>
              <option value="improve_sleep">Improve Sleep</option>
              <option value="reduce_stress">Reduce Stress</option>
            </select>
          </div>
          <div className="form-row">
            <label>⏱️ Minutes</label>
            <select name="minutes" value={formData.minutes} onChange={handleChange}>
              <option>10</option>
              <option>15</option>
              <option>20</option>
              <option>30</option>
            </select>
          </div>
          <div className="form-row">
            <label>📍 Place</label>
            <select name="place" value={formData.place} onChange={handleChange}>
              <option value="home">Home</option>
              <option value="gym">Gym</option>
              <option value="outdoor">Outdoor</option>
            </select>
          </div>
          <div className="form-row">
            <label>🏋️ Equipment</label>
            <select name="equipment" value={formData.equipment} onChange={handleChange}>
              <option value="none">None</option>
              <option value="dumbbells">Dumbbells</option>
              <option value="resistance_bands">Resistance Bands</option>
            </select>
          </div>
          <div className="form-row">
            <label>📊 Level</label>
            <select name="level" value={formData.level} onChange={handleChange}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
            </select>
          </div>
          <div className="form-row">
            <label>💤 Sleep (hrs)</label>
            <select name="sleep" value={formData.sleep} onChange={handleChange}>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
            </select>
          </div>
          <div className="form-row">
            <label>😰 Stress (1–5)</label>
            <select name="stress" value={formData.stress} onChange={handleChange}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
        </div>

        <div className="coach-actions">
          <button className="btn btn--primary btn--lg" onClick={handleGetPlan} disabled={loading}>
            {loading ? 'Getting Plan...' : "🚀 Get Today's Plan"}
          </button>
          {plan && (
            <button className="btn btn--outline" onClick={handleSwap}>
              🔄 Swap Workout
            </button>
          )}
        </div>
      </div>

      {plan && (
        <div id="coach-plan" className="coach-plan">
          <h3>✨ Today's Health Card</h3>
          
          <div className="plan-section">
            <h4>🏋️ Workout</h4>
            <div className="plan-row">
              <strong>{plan.workout?.name || '—'}</strong>
            </div>
            <ol id="coach-workout-steps" className="plan-steps">
              {(plan.workout?.steps || []).map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="plan-section">
            <h4>💤 Sleep</h4>
            <div className="plan-row">
              <span id="coach-sleep-tip">{plan.sleepTip?.text || '—'}</span>
            </div>
          </div>

          <div className="plan-section">
            <h4>🍎 Nutrition</h4>
            <div className="plan-row">
              <strong>Recommended Fruit:</strong>{' '}
              <span id="coach-fruit">
                {plan.fruit ? `${plan.fruit.name} — ${plan.fruit.why || ''}` : '—'}
              </span>
            </div>
            {plan.nutrition && (
              <>
                <div className="plan-row">
                  <strong>Protein Target:</strong> {plan.nutrition.protein}
                </div>
                <div className="plan-row">
                  <strong>Calories:</strong> {plan.nutrition.calories}
                </div>
              </>
            )}
          </div>

          <div className="plan-section">
            <h4>🎯 Habit</h4>
            <div className="plan-row">
              <span id="coach-habit">{plan.habit?.text || '—'}</span>
            </div>
          </div>

          <div className="plan-row meta">
            <strong>Why this plan:</strong> <span id="coach-why">{plan.whyThis || ''}</span>
          </div>

          <div className="coach-feedback">
            <button className="btn btn--primary" onClick={() => handleFeedback('done')}>
              ✅ Done
            </button>
            <button className="btn btn--outline" onClick={() => handleFeedback('too_hard')}>
              💪 Too Hard
            </button>
            <button className="btn btn--outline" onClick={() => handleFeedback('tired')}>
              😴 I'm Tired
            </button>
            <button className="btn btn--outline" onClick={() => handleFeedback('pain')}>
              ⚠️ Pain
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoachPage;
