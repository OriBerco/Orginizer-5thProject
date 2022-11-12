const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/TaskManager')
.then(x=> console.log('Connected to DB'))
.catch(x=> console.log('Failed to connect to DB'));