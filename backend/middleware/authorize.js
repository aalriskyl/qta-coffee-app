// // authorize.js

// // Middleware function for role-based access control
// const authorize = (allowedRoles) => {
//   return (req, res, next) => {
//     const userRole = req.user.role; // Assuming you have a "role" property in your user object

//     // Check if the user's role is allowed to access the route
//     if (allowedRoles.includes(userRole)) {
//       next(); // Allow access to the route
//     } else {
//       res.status(403).json({ message: 'Unauthorized' }); // User's role is not allowed
//     }
//   };
// };

// module.exports = authorize;
