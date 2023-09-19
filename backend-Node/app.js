require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ActiveJob = require('./models/activeJobData');
const CountJob = require('./models/countJobs')
const cors = require('cors')

//using this file temporary to avoid using db 
const { ActiveJobData, countJob }=require("./tempData/staticData")

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());


if(process.env.dbUrl){

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
  
}


app.get('/api/active-jobs', async (req, res) => {
  try {
  
    // Fetch data from the 'activejobs' collection
  // const activeJobsData = await ActiveJob.find({});                   //for using database 
  const activeJobsData =await ActiveJobData                                    //without database



  // Fetch data from the 'countJobs' collection
  // const countJobsData = await CountJob.findOne({ type: 'Active Jobs' });            //for using database
  const countJobsData = await countJob                                                         //without database


  t
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
