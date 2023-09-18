require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ActiveJob = require('./models/activeJobData');
const CountJob = require('./models/countJobs')
const cors = require('cors')

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());



mongoose.connect(process.env.dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.error('Error In MongoDB:', err);
  });



app.get('/api/active-jobs', async (req, res) => {
  try {
  // Fetch data from the 'activejobs' collection
  const activeJobsData = await ActiveJob.find({});

  // Fetch data from the 'countJobs' collection
  const countJobsData = await CountJob.findOne({ type: 'Active Jobs' });

  // Create the desired response format
  const response = {
    type: countJobsData.type,
    countPerDay: countJobsData.countPerDay,
    jobData: activeJobsData,
  };

  res.json(response);
  } catch (error) {
    console.error('Error fetching ActiveJobData:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
