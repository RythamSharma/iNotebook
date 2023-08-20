const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
  userid:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  title:{
    type: String,
    required:[true,'Title is Required']
  },
  description:{
    type: String,
    required:[true,'description is Required']
  },
  tag:{
    type: String,
    required:[true,'Tag is Required']
  },
  date:{
    type: Date,
    default: Date.now
  }
  });

  module.exports = mongoose.model('Notes',NotesSchema)
