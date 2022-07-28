const mongoose = require('mongoose');

const schema = mongoose.Schema;

const taskSchema = new schema({
    body :{
        type:String,
        require:true
    }
}, {timestamp: true});

const task = mongoose.model('tasks', taskSchema);
module.exports = task;