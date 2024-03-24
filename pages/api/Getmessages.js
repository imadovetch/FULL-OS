// pages/api/Getmessages.js

import ConversationModel from '../../data/schema/conversation';
import { Connecttomongodb } from '../../utils/modules';

export default async function handler(req, res) {
    try {
        await Connecttomongodb();

        const { user1, user2 } = req.body;

        const sortedUserIds = [user1, user2].sort();

        const conversationId = `between${sortedUserIds[0]}and${sortedUserIds[1]}`;
        const conversation = await ConversationModel.findOne({ id: conversationId });

        if (!conversation) {

            return res.status(404).json({ messages: [] });
        }


        res.status(200).json({ messages: conversation.msgs });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Server error' });
    }
}
