/**
 * Mock Authentication Middleware
 * In a real application, this would verify JWT tokens, sessions, or cookies
 * and set req.user to the authenticated user object.
 * 
 * Here we mock the user to have user_id = 1.
 */
module.exports = (req, res, next) => {
  // Simulating an authenticated user
  req.user = {
    id: 1,
    username: "bluecollar_john",
    email: "john.doe@example.com"
  };
  
  next();
};
