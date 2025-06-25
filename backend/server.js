const app = require('./app');
const PORT = process.env.PORT || 10000; // Port that matches render

// Start the backend server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
