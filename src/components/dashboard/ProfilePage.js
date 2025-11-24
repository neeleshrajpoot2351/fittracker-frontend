import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    dateOfBirth: '',
    height: '',
    weight: '',
    targetWeight: '',
    fitnessLevel: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        height: user.height || '',
        weight: user.weight || '',
        targetWeight: user.targetWeight || '',
        fitnessLevel: user.fitnessLevel || '',
      });
    }
  }, [user]);

  const getUserName = () => {
    return user?.name || user?.username || 'User';
  };

  const getUserEmail = () => {
    return user?.email || 'user@example.com';
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const calculateBMI = () => {
    if (user?.height && user?.weight) {
      const heightInMeters = user.height / 100;
      const bmi = user.weight / (heightInMeters * heightInMeters);
      return bmi.toFixed(1);
    }
    return 'N/A';
  };

  const getBMIStatus = () => {
    const bmi = calculateBMI();
    if (bmi === 'N/A') return 'Add height and weight';
    const bmiNum = parseFloat(bmi);
    if (bmiNum < 18.5) return 'Underweight';
    if (bmiNum < 25) return 'Normal weight';
    if (bmiNum < 30) return 'Overweight';
    return 'Obese';
  };

  const getWeightProgress = () => {
    if (user?.weight && user?.targetWeight) {
      const diff = user.weight - user.targetWeight;
      if (diff === 0) return 'Target reached!';
      if (diff > 0) return `${Math.abs(diff).toFixed(1)} kg to lose`;
      return `${Math.abs(diff).toFixed(1)} kg to gain`;
    }
    return 'Set target weight';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - reset form
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        phone: user?.phone || '',
        dateOfBirth: user?.dateOfBirth || '',
        height: user?.height || '',
        weight: user?.weight || '',
        targetWeight: user?.targetWeight || '',
        fitnessLevel: user?.fitnessLevel || '',
      });
      setMessage({ type: '', text: '' });
    }
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // Build updates object
    const updates = {};
    if (formData.name && formData.name !== user.name) updates.name = formData.name;
    if (formData.email && formData.email !== user.email) updates.email = formData.email;
    if (formData.password && formData.password.trim() !== '') updates.password = formData.password;
    if (formData.phone !== user.phone) updates.phone = formData.phone || null;
    if (formData.dateOfBirth !== user.dateOfBirth) updates.dateOfBirth = formData.dateOfBirth || null;
    if (formData.height !== user.height) updates.height = formData.height ? parseFloat(formData.height) : null;
    if (formData.weight !== user.weight) updates.weight = formData.weight ? parseFloat(formData.weight) : null;
    if (formData.targetWeight !== user.targetWeight) updates.targetWeight = formData.targetWeight ? parseFloat(formData.targetWeight) : null;
    if (formData.fitnessLevel !== user.fitnessLevel) updates.fitnessLevel = formData.fitnessLevel || null;

    if (Object.keys(updates).length === 0) {
      setMessage({ type: 'info', text: 'No changes to save.' });
      setLoading(false);
      return;
    }

    const result = await updateProfile(updates);
    setLoading(false);

    if (result.success) {
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
      setFormData((prev) => ({ ...prev, password: '' }));
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to update profile.' });
    }
  };

  return (
    <div id="dashboard-profile" className="dashboard-content active">
      <div className="dashboard-header">
        <h1>Profile</h1>
        <p>Manage your account settings and fitness information</p>
      </div>

      <div className="profile-section">
        <div className="profile-main">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar-large">{getInitials(getUserName())}</div>
              <div className="profile-info">
                <h3>{getUserName()}</h3>
                <p>{getUserEmail()}</p>
                <button className="btn btn--primary btn--sm" onClick={handleEditToggle}>
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>
            </div>

            {message.text && (
              <div className={`message message--${message.type}`} style={{ 
                padding: '12px', 
                marginBottom: '16px', 
                borderRadius: '6px',
                backgroundColor: message.type === 'success' ? '#d4edda' : message.type === 'error' ? '#f8d7da' : '#d1ecf1',
                color: message.type === 'success' ? '#155724' : message.type === 'error' ? '#721c24' : '#0c5460',
                border: `1px solid ${message.type === 'success' ? '#c3e6cb' : message.type === 'error' ? '#f5c6cb' : '#bee5eb'}`
              }}>
                {message.text}
              </div>
            )}

            {isEditing ? (
              <form onSubmit={handleSubmit} className="profile-edit-form">
                <div className="form-row-two">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row-two">
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row-two">
                  <div className="form-group">
                    <label>Height (cm)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="form-control"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      placeholder="175"
                    />
                  </div>
                  <div className="form-group">
                    <label>Fitness Level</label>
                    <select
                      className="form-control"
                      name="fitnessLevel"
                      value={formData.fitnessLevel}
                      onChange={handleChange}
                    >
                      <option value="">Select level</option>
                      <option value="BEGINNER">Beginner</option>
                      <option value="INTERMEDIATE">Intermediate</option>
                      <option value="ADVANCED">Advanced</option>
                    </select>
                  </div>
                </div>

                <div className="form-row-two">
                  <div className="form-group">
                    <label>Current Weight (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="form-control"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="72"
                    />
                  </div>
                  <div className="form-group">
                    <label>Target Weight (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="form-control"
                      name="targetWeight"
                      value={formData.targetWeight}
                      onChange={handleChange}
                      placeholder="70"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>New Password (leave blank to keep current)</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn--primary" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button type="button" className="btn btn--outline" onClick={handleEditToggle}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-details">
                <div className="detail-item">
                  <label>Username</label>
                  <span>{user?.username || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <label>Full Name</label>
                  <span>{user?.name || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <label>Email</label>
                  <span>{user?.email || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <label>Phone</label>
                  <span>{user?.phone || 'Not set'}</span>
                </div>
                <div className="detail-item">
                  <label>Date of Birth</label>
                  <span>{user?.dateOfBirth || 'Not set'}</span>
                </div>
                <div className="detail-item">
                  <label>Height</label>
                  <span>{user?.height ? `${user.height} cm` : 'Not set'}</span>
                </div>
                <div className="detail-item">
                  <label>Current Weight</label>
                  <span>{user?.weight ? `${user.weight} kg` : 'Not set'}</span>
                </div>
                <div className="detail-item">
                  <label>Target Weight</label>
                  <span>{user?.targetWeight ? `${user.targetWeight} kg` : 'Not set'}</span>
                </div>
                <div className="detail-item">
                  <label>Fitness Level</label>
                  <span>{user?.fitnessLevel || 'Not set'}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="profile-sidebar">
          <div className="profile-card">
            <h3>Body Stats</h3>
            <div className="fitness-stats">
              <div className="stat-item">
                <span className="stat-label">Current BMI</span>
                <span className="stat-number">{calculateBMI()}</span>
                <span className="stat-status">{getBMIStatus()}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Weight Goal</span>
                <span className="stat-number">{user?.targetWeight ? `${user.targetWeight} kg` : 'Not set'}</span>
                <span className="stat-status">{getWeightProgress()}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Fitness Level</span>
                <span className="stat-number">{user?.fitnessLevel || 'Not set'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
