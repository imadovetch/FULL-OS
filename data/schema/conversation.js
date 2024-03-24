import mongoose from "mongoose";

// Define a schema for individual messages
const MessageSchema = new mongoose.Schema({
  senderId: String,
  content: String,
  timestamp: { type: Date, default: Date.now }
});

// Define a schema for the conversation
const ConversationSchema = new mongoose.Schema({
  id: String, // Conversation ID
  msgs: [MessageSchema] // Array of messages using the MessageSchema
});

// Create a model based on the ConversationSchema
let ConversationModel;

try {
  // If the model already exists, use it; otherwise, create a new one
  ConversationModel = mongoose.model('conversations');
} catch (error) {
  ConversationModel = mongoose.model('conversations', ConversationSchema);
}

export default ConversationModel;
