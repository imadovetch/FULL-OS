// pages/api/conversations.js

import ConversationModel from '../../data/schema/conversation';
import { Connecttomongodb } from '../../utils/modules';

export default async function handler(req, res) {
    try {
        // Extract data from the request
        const { user1, user2, senderId, content , type } = req.body;
      
        
        const sortedUserIds = [user1, user2].sort();

      
        const conversationId = `between${sortedUserIds[0]}and${sortedUserIds[1]}`;

        await Connecttomongodb();
        
        let conversation = await ConversationModel.findOne({ id: conversationId });

        if (conversation) {
            conversation.msgs.push({ senderId, content , type });
        } else {
            conversation = await ConversationModel.create({
                id: conversationId,
                msgs: [{ senderId, content , type}]
            });
        }

   
        await conversation.save();


        res.status(200).json({ success: true, message: 'Message added to conversation successfully' });
    } catch (error) {

        console.error('Error handling conversation:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
}
