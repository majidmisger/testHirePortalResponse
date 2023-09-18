const mongoose = require('mongoose');
const ActiveJob = require('./models/activeJobData');
const CountJob = require('./models/countJobs');

// Establish a connection to your MongoDB database
mongoose.connect('mongodb://localhost:27017/hirePortal', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Create an instance of ActiveJob and insert data
    const activeJobData = new ActiveJob({
      name: "Interventional Cardiologist",
      location: "New York City, USA",
      posted: "25th May",
      status: "Published",
      applied: 98,
      jobViews: 128,
      daysLeft: 2,
      premium: false,
      dateFormat: "2023-05-25"
    });
    
    activeJobData.save()
      .then(() => {
        console.log('ActiveJob data inserted successfully.');
      })
      .catch((err) => {
        console.error('Error inserting ActiveJob data:', err);
      });
    
    // Create an instance of countJob and insert data
    const countJobData = new CountJob({
      type: "Active Jobs",
      countPerDay: {
        Received: [26, 45, 77, 45, 95, 22, 65, 30, 100, 22, 53, 81, 22, 65, 88, 50, 28, 100, 22, 74, 25, 69, 22, 65, 34, 74, 43, 22, 69, 22],
        Applied: [28, 45, 77, 45, 95, 22, 65, 30, 100, 22, 53, 81, 22, 65, 88, 50, 28, 100, 22, 74, 25, 69, 22, 65, 34, 74, 43, 22, 69, 22]
      }
    });
    
    countJobData.save()
      .then(() => {
        console.log('CountJob data inserted successfully.');
      })
      .catch((err) => {
        console.error('Error inserting CountJob data:', err);
      });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
