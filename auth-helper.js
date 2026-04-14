// Auth Helper - Include this script on all pages that need auth protection
(function() {
  
  // Check if user is logged in and token hasn't expired
  function isAuthenticated() {
    const token = localStorage.getItem('authToken');
    const expiry = localStorage.getItem('authExpiry');
    
    if (!token || !expiry) {
      return false;
    }
    
    // Check if token has expired (24 hours)
    if (new Date().getTime() > parseInt(expiry)) {
      clearAuth();
      return false;
    }
    
    return true;
  }
  
  // Get stored auth token
  function getAuthToken() {
    return localStorage.getItem('authToken');
  }
  
  // Get username
  function getUsername() {
    return localStorage.getItem('authUser') || 'User';
  }
  
  // Clear auth (logout)
  function clearAuth() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authExpiry');
    localStorage.removeItem('authUser');
  }
  
  // Redirect to login if not authenticated
  function requireAuth() {
    if (!isAuthenticated()) {
      window.location.href = 'login.html';
    }
  }
  
  // Add logout button functionality
  function addLogoutButton() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function() {
        clearAuth();
        window.location.href = 'login.html';
      });
    }
  }
  
  // Expose functions globally
  window.Auth = {
    isAuthenticated: isAuthenticated,
    getAuthToken: getAuthToken,
    getUsername: getUsername,
    clearAuth: clearAuth,
    requireAuth: requireAuth,
    addLogoutButton: addLogoutButton
  };
  
  // Auto-check auth on page load
  document.addEventListener('DOMContentLoaded', function() {
    Auth.requireAuth();
    Auth.addLogoutButton();
  });
  
})();
