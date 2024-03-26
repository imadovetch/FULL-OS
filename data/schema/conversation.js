import mongoose from "mongoose";


const MessageSchema = new mongoose.Schema({
  senderId: String,
  content: String,
  type: String,
  timestamp: { type: Date, default: Date.now }
});


const ConversationSchema = new mongoose.Schema({
  id: String, 
  msgs: [MessageSchema] 
});


let ConversationModel;

try {

  ConversationModel = mongoose.model('conversations');
} catch (error) {
  ConversationModel = mongoose.model('conversations', ConversationSchema);
}

export default ConversationModel;
