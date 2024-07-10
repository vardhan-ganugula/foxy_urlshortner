const express = require('express');
const app = express();

// Middleware to log request details
app.use((req, res, next) => {
  console.log(`Client IP Address: ${req.ip}`);
  

  const userAgent = req.headers['user-agent'];

  
  // Determine the operating system based on user-agent
  let operatingSystem;
  if (/android/i.test(userAgent)) {
    operatingSystem = 'Android';
  } else if (/linux/i.test(userAgent)) {
    operatingSystem = 'Linux';
  } else if (/windows/i.test(userAgent)) {
    operatingSystem = 'Windows';
  } else if (/mac/i.test(userAgent)) {
    operatingSystem = 'macOS';
  } else {
    operatingSystem = 'Unknown';
  }
  
  console.log(`Operating System: ${operatingSystem}`);
  
  next();
});

// Your routes here
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
