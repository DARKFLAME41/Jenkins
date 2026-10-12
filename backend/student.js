const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  rollNo: {
    type: String,
    required: true,
    trim: true
  },
  marks: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  }
}, { timestamps: true });

// Support legacy rollno field if passed
StudentSchema.pre('validate', function() {
  if (!this.rollNo && this.rollno) {
    this.rollNo = String(this.rollno);
  }
});

module.exports = mongoose.model('Student', StudentSchema);