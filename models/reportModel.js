const mongoose = require('mongoose');

const dayEnum = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  day: {
    type: String,
    enum: dayEnum
  }
}, {
  timestamps: true
});

reportSchema.pre('save', function (next) {
  const dayIndex = new Date().getDay(); // getDay() returns 0-6, with 0=Sunday and 6=Saturday
  console.log(dayIndex)
  this.day = dayEnum[dayIndex];
  next();
})

module.exports = mongoose.model('Report', reportSchema);
