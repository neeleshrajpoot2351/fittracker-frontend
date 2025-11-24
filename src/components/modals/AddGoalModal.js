import React, { useState } from 'react';
import './AddGoalModal.css';

const AddGoalModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    description: '',
    targetDate: '',
    status: 'IN_PROGRESS',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.description && formData.targetDate) {
      onAdd({
        description: formData.description,
        targetDate: formData.targetDate,
        status: formData.status || 'IN_PROGRESS',
      });
      setFormData({ description: '', targetDate: '', status: 'IN_PROGRESS' });
    }
  };

  return (
    <div id="add-goal-modal" className="modal">
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add New Goal</h3>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <form id="add-goal-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Goal Description</label>
              <textarea
                className="form-control"
                name="description"
                placeholder="e.g., Run 5K in under 30 minutes"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Target Date</label>
              <input
                type="date"
                className="form-control"
                name="targetDate"
                value={formData.targetDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-control"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="PENDING">Pending</option>
              </select>
            </div>
            <div className="modal-actions">
              <button type="button" className="btn btn--outline" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn--primary">
                Add Goal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddGoalModal;
