const mongoose= require('mongoose')
const commentSchema = new mongoose.Schema({
    content: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ch_User',
      required: true
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ch_Blog',
      required: true
    }
  }, { timestamps: true });
  const Ch_Comment = mongoose.model('Ch_Comment', commentSchema);
  module.exports=Ch_Comment