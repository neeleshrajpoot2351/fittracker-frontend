import React, { useState } from 'react';
import './RecommendationsPage.css';

const RecommendationsPage = () => {
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [activePlan, setActivePlan] = useState(null);

  const exerciseRecommendations = [
    {
      id: 1,
      name: 'Upper Body Strength Circuit',
      rating: 4.8,
      duration: '30 mins',
      level: 'Intermediate',
      equipment: 'Dumbbells',
      description: 'Perfect for your current fitness level',
      steps: [
        'Warm-up: 5 min light cardio',
        '3 sets of Push-ups (10-12 reps)',
        '3 sets of Dumbbell Rows (10 reps each arm)',
        '3 sets of Shoulder Press (10 reps)',
        '3 sets of Bicep Curls (12 reps)',
        'Cool-down: 5 min stretching'
      ]
    },
    {
      id: 2,
      name: 'HIIT Cardio Blast',
      rating: 4.9,
      duration: '20 mins',
      level: 'Advanced',
      equipment: 'No equipment',
      description: 'Boost your cardiovascular endurance',
      steps: [
        'Warm-up: 3 min jumping jacks',
        '4 rounds of: 30s burpees, 30s rest',
        '4 rounds of: 30s high knees, 30s rest',
        '4 rounds of: 30s mountain climbers, 30s rest',
        'Cool-down: 3 min walking'
      ]
    },
    {
      id: 3,
      name: 'Flexibility & Mobility',
      rating: 4.7,
      duration: '15 mins',
      level: 'Beginner',
      equipment: 'Yoga mat',
      description: 'Improve your range of motion',
      steps: [
        'Child\'s pose: 1 min',
        'Cat-Cow stretches: 10 reps',
        'Downward Dog: 1 min',
        'Hip flexor stretches: 30s each side',
        'Hamstring stretches: 30s each leg',
        'Shoulder rolls: 10 reps each direction'
      ]
    },
  ];

  const dietRecommendations = [
    {
      id: 1,
      name: 'High Protein Breakfast Bowl',
      calories: 420,
      protein: '28g protein',
      prepTime: '10 mins',
      description: 'Fuel your morning workouts',
      recipe: {
        ingredients: [
          '2 eggs',
          '1/2 cup oats',
          '1 scoop protein powder',
          '1 banana',
          'Handful of berries',
          '1 tbsp almond butter'
        ],
        instructions: [
          'Cook oats according to package',
          'Scramble eggs separately',
          'Mix protein powder into oats',
          'Top with eggs, sliced banana, berries, and almond butter',
          'Enjoy immediately'
        ]
      }
    },
    {
      id: 2,
      name: 'Post-Workout Smoothie',
      calories: 280,
      protein: '22g protein',
      prepTime: '5 mins',
      description: 'Perfect recovery nutrition',
      recipe: {
        ingredients: [
          '1 scoop protein powder',
          '1 banana',
          '1 cup spinach',
          '1 cup almond milk',
          '1 tbsp peanut butter',
          'Ice cubes'
        ],
        instructions: [
          'Add all ingredients to blender',
          'Blend until smooth',
          'Add more milk if too thick',
          'Serve immediately'
        ]
      }
    },
    {
      id: 3,
      name: 'Lean Muscle Building Dinner',
      calories: 520,
      protein: '35g protein',
      prepTime: '25 mins',
      description: 'Support your strength goals',
      recipe: {
        ingredients: [
          '6oz chicken breast',
          '1 cup brown rice',
          '2 cups broccoli',
          'Olive oil',
          'Garlic and spices'
        ],
        instructions: [
          'Cook brown rice according to package',
          'Season and grill chicken breast',
          'Steam broccoli until tender',
          'Plate everything together',
          'Drizzle with olive oil'
        ]
      }
    },
  ];

  const fitnessPlans = [
    {
      id: 1,
      name: '12-Week Transformation',
      description: 'Complete body recomposition program',
      duration: '12 weeks',
      frequency: '4x per week',
      category: 'Strength & Fat Loss',
    },
    {
      id: 2,
      name: "Beginner's Journey",
      description: 'Start your fitness journey right',
      duration: '8 weeks',
      frequency: '3x per week',
      category: 'Foundation Building',
    },
    {
      id: 3,
      name: 'Athletic Performance',
      description: 'Take your fitness to the next level',
      duration: '16 weeks',
      frequency: '5x per week',
      category: 'Performance & Power',
    },
  ];

  const youtubeVideos = [
    {
      id: 1,
      title: 'Perfect Push-Up Form Tutorial',
      channel: 'FitnessBlender',
      duration: '8:32',
      views: '2.1M views',
      url: 'https://www.youtube.com/results?search_query=perfect+push-up+form'
    },
    {
      id: 2,
      title: '20-Minute Full Body HIIT',
      channel: 'Calisthenic Movement',
      duration: '20:15',
      views: '850K views',
      url: 'https://www.youtube.com/results?search_query=20+minute+full+body+hiit'
    },
    {
      id: 3,
      title: 'Beginner Yoga Flow',
      channel: 'Yoga with Adriene',
      duration: '15:45',
      views: '1.5M views',
      url: 'https://www.youtube.com/results?search_query=beginner+yoga+flow'
    },
  ];

  const workoutMusic = [
    {
      id: 1,
      name: 'High Energy Workout Mix',
      genre: 'Electronic/Pop',
      duration: '45 mins',
      bpm: '128-140 BPM',
    },
    {
      id: 2,
      name: 'Strength Training Beats',
      genre: 'Hip-Hop/Rock',
      duration: '60 mins',
      bpm: '90-110 BPM',
    },
    {
      id: 3,
      name: 'Cardio Pump Playlist',
      genre: 'Dance/EDM',
      duration: '30 mins',
      bpm: '140-160 BPM',
    },
  ];

  const handleStartWorkout = (exercise) => {
    setActiveWorkout(exercise);
  };

  const handleViewRecipe = (diet) => {
    setActiveRecipe(diet);
  };

  const handleStartPlan = (plan) => {
    setActivePlan(plan);
    alert(`🎯 Starting "${plan.name}"!\n\nYou'll receive daily workout notifications and progress tracking for the next ${plan.duration}.`);
  };

  const handleWatchVideo = (video) => {
    window.open(video.url, '_blank');
  };

  const handlePlayPlaylist = (music) => {
    alert(`🎵 Playing "${music.name}"!\n\nGenre: ${music.genre}\nDuration: ${music.duration}`);
  };

  return (
    <div id="dashboard-recommendations" className="dashboard-content active">
      <div className="dashboard-header">
        <h1>AI Recommendations</h1>
        <p>Personalized suggestions based on your progress and goals</p>
      </div>

      {/* Active Workout Details */}
      {activeWorkout && (
        <div className="active-detail-card">
          <div className="detail-header">
            <h3>🏋️ Active Workout: {activeWorkout.name}</h3>
            <button className="btn btn--outline btn--sm" onClick={() => setActiveWorkout(null)}>
              Close
            </button>
          </div>
          <div className="detail-body">
            <p><strong>Duration:</strong> {activeWorkout.duration}</p>
            <p><strong>Level:</strong> {activeWorkout.level}</p>
            <p><strong>Equipment:</strong> {activeWorkout.equipment}</p>
            <h4>Workout Steps:</h4>
            <ol>
              {activeWorkout.steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
            <button className="btn btn--primary" onClick={() => alert('Workout completed! Great job! 🎉')}>
              Mark as Complete
            </button>
          </div>
        </div>
      )}

      {/* Active Recipe Details */}
      {activeRecipe && (
        <div className="active-detail-card">
          <div className="detail-header">
            <h3>🍽️ Recipe: {activeRecipe.name}</h3>
            <button className="btn btn--outline btn--sm" onClick={() => setActiveRecipe(null)}>
              Close
            </button>
          </div>
          <div className="detail-body">
            <p><strong>Calories:</strong> {activeRecipe.calories} cal</p>
            <p><strong>Protein:</strong> {activeRecipe.protein}</p>
            <p><strong>Prep Time:</strong> {activeRecipe.prepTime}</p>
            <h4>Ingredients:</h4>
            <ul>
              {activeRecipe.recipe.ingredients.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
            <h4>Instructions:</h4>
            <ol>
              {activeRecipe.recipe.instructions.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      )}

      <div className="recommendations-section">
        <h3>Exercise Recommendations</h3>
        <div className="exercise-recommendations">
          {exerciseRecommendations.map((exercise) => (
            <div key={exercise.id} className="recommendation-item">
              <div className="recommendation-header">
                <div className="recommendation-title">{exercise.name}</div>
                <div className="recommendation-rating">★ {exercise.rating}</div>
              </div>
              <div className="recommendation-details">
                {exercise.duration} • {exercise.level} • {exercise.equipment}
              </div>
              <div className="recommendation-description">{exercise.description}</div>
              <button
                className="btn btn--primary btn--sm"
                onClick={() => handleStartWorkout(exercise)}
              >
                Start Workout
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="recommendations-section">
        <h3>Diet Recommendations</h3>
        <div className="diet-recommendations">
          {dietRecommendations.map((diet) => (
            <div key={diet.id} className="recommendation-item">
              <div className="recommendation-title">{diet.name}</div>
              <div className="recommendation-details">
                {diet.calories} cal • {diet.protein} • {diet.prepTime}
              </div>
              <div className="recommendation-description">{diet.description}</div>
              <button
                className="btn btn--primary btn--sm"
                onClick={() => handleViewRecipe(diet)}
              >
                View Recipe
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="recommendations-section">
        <h3>Fitness Plans</h3>
        <div className="fitness-plans">
          {fitnessPlans.map((plan) => (
            <div key={plan.id} className="recommendation-item">
              <div className="recommendation-title">{plan.name}</div>
              <div className="recommendation-details">
                {plan.duration} • {plan.frequency} • {plan.category}
              </div>
              <div className="recommendation-description">{plan.description}</div>
              <button
                className="btn btn--primary btn--sm"
                onClick={() => handleStartPlan(plan)}
              >
                Start Plan
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="recommendations-section">
        <h3>YouTube Videos</h3>
        <div className="youtube-videos">
          {youtubeVideos.map((video) => (
            <div key={video.id} className="recommendation-item">
              <div className="recommendation-title">{video.title}</div>
              <div className="recommendation-details">
                {video.channel} • {video.duration} • {video.views}
              </div>
              <button
                className="btn btn--primary btn--sm"
                onClick={() => handleWatchVideo(video)}
              >
                Watch Now
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="recommendations-section">
        <h3>Workout Music</h3>
        <div className="workout-music">
          {workoutMusic.map((music) => (
            <div key={music.id} className="recommendation-item">
              <div className="recommendation-title">{music.name}</div>
              <div className="recommendation-details">
                {music.genre} • {music.duration} • {music.bpm}
              </div>
              <button
                className="btn btn--primary btn--sm"
                onClick={() => handlePlayPlaylist(music)}
              >
                Play Playlist
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage;
