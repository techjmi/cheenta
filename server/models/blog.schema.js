const mongoose= require('mongoose')
const blogSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    tags: [{
      type: String
    }],
  image: {
      type: String
    },
    category: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ch_User',
      required: true
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ch_User'
    }]
  }, { timestamps: true });
  const Ch_Blog = mongoose.model('Ch_Blog', blogSchema);
  module.exports= Ch_Blog