// src/apiService.js
const API_BASE_URL = process.env.REACT_APP_API_ROUTE || 'http://localhost:8000';
const API_KEY = process.env.REACT_APP_API_KEY
class APIService {
  // Register participant
  async register(name, email, mobile) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key':API_KEY,
        },
        body: JSON.stringify({ name, email, mobile }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Registration failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Submit resume
  async submitResume(participantId, file, jobDescription) {
    try {
      const formData = new FormData();
      formData.append('participant_id', participantId);
      formData.append('resume', file);
      formData.append('job_description', jobDescription);

      const response = await fetch(`${API_BASE_URL}/api/submit`, {
        method: 'POST',
        body: formData,
        headers: {
          'X-API-Key':API_KEY,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Submission failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Submission error:', error);
      throw error;
    }
  }

  // Get participant scores
  async getParticipantScores(participantId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/participant/${participantId}/scores`,{
        headers: {
          'X-API-Key':API_KEY,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to fetch scores');
      }

      return await response.json();
    } catch (error) {
      console.error('Get scores error:', error);
      throw error;
    }
  }

  // Get upload count
  async getUploadCount(participantId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/participant/${participantId}/upload-count`,{
        headers: {
          'X-API-Key': API_KEY,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to fetch upload count');
      }

      return await response.json();
    } catch (error) {
      console.error('Get upload count error:', error);
      throw error;
    }
  }

  // Get leaderboard
  async getLeaderboard() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/leaderboard`,{
        headers: {
          'X-API-Key': API_KEY,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to fetch leaderboard');
      }

      return await response.json();
    } catch (error) {
      console.error('Get leaderboard error:', error);
      throw error;
    }
  }

  // Get competition stats
  async getStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/stats`,{
        headers: {
          'X-API-Key': API_KEY,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to fetch stats');
      }

      return await response.json();
    } catch (error) {
      console.error('Get stats error:', error);
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/`,{
        headers: {
          'X-API-Key': API_KEY,
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Health check error:', error);
      return null;
    }
  }
}

export default new APIService();