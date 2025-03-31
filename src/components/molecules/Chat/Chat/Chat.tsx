import { useState } from 'react';
import classes from './style.module.scss';
import ChatSidebar from '@/components/molecules/Chat/ChatSidebar/ChatSidebar';
import ChatContent from '@/components/molecules/Chat/ChatContent/ChatContent';

// Update the IChatMessage interface
export interface IChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: string;
  isRead?: boolean;
  type?: 'text' | 'audio';
  audioData?: string;
  duration?: string;
}

export interface IChatRoom {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: string;
  unreadCount?: number;
  isOnline?: boolean;
  lastMessageTime?: string;
  messages?: IChatMessage[];
}

export default function Chat() {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [chatRooms, setChatRooms] = useState<IChatRoom[]>([
    {
      id: '1',
      name: 'John Doe',
      avatar: '/images/avatars/avatar-1.jpg',
      lastMessage: 'Hey, how are you?',
      unreadCount: 3,
      isOnline: true,
      lastMessageTime: '10:30 AM',
      messages: [
        {
          id: '1-1',
          text: 'Hey there!',
          sender: 'other',
          timestamp: '10:15 AM',
        },
        {
          id: '1-2',
          text: 'How are you doing today?',
          sender: 'other',
          timestamp: '10:16 AM',
        },
        {
          id: '1-3',
          text: 'I\'m doing great, thanks for asking!',
          sender: 'user',
          timestamp: '10:18 AM',
        },
        {
          id: '1-4',
          text: '',
          sender: 'other',
          timestamp: '10:20 AM',
          type: 'audio',
          audioData: 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA',
          duration: '0:07'
        },
        {
          id: '1-5',
          text: 'Check out this voice message I sent',
          sender: 'other',
          timestamp: '10:22 AM',
        },
        {
          id: '1-6',
          text: '',
          sender: 'user',
          timestamp: '10:25 AM',
          type: 'audio',
          audioData: 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA',
          duration: '0:12'
        },
      ]
    },
    {
      id: '2',
      name: 'Project name',
      avatar: '/images/chat/avatar2.png',
      lastMessage: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      isOnline: false,
      messages: []
    },
    {
      id: '3',
      name: 'Project name',
      avatar: '/images/chat/avatar3.png',
      lastMessage: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      isOnline: true,
      messages: []
    },
    {
      id: '4',
      name: 'Project name',
      avatar: '/images/chat/avatar4.png',
      lastMessage: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      isOnline: false,
      messages: []
    },
    {
      id: '5',
      name: 'Project name',
      avatar: '/images/chat/avatar5.png',
      lastMessage: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      isOnline: true,
      messages: []
    },
    {
      id: '6',
      name: 'Project name',
      avatar: '/images/chat/avatar6.png',
      lastMessage: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      isOnline: false,
      messages: []
    },
    {
      id: '7',
      name: 'Project name',
      avatar: '/images/chat/avatar7.png',
      lastMessage: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      isOnline: true,
      messages: []
    },
    {
      id: '8',
      name: 'Project name',
      avatar: '/images/chat/avatar8.png',
      lastMessage: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      isOnline: false,
      messages: []
    },
    {
      id: '9',
      name: 'Project name',
      avatar: '/images/chat/avatar9.png',
      lastMessage: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      isOnline: true,
      messages: []
    },
    {
      id: '10',
      name: 'Project name',
      avatar: '/images/chat/avatar10.png',
      lastMessage: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      isOnline: false,
      messages: []
    }
  ]);

  const handleChatSelect = (chatId: string) => {
    setActiveChat(chatId);
    
    // Update the active state for all chat rooms
    setChatRooms(prevRooms => 
      prevRooms.map(room => ({
        ...room,
        isActive: room.id === chatId
      }))
    );
  };

  const handleSendMessage = (chatId: string, text: string, type: 'text' | 'audio' = 'text', audioData?: string) => {
    if (type === 'text' && !text.trim()) return;
    
    const newMessage: IChatMessage = {
      id: `${chatId}-${Date.now()}`,
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type,
      audioData,
      duration: type === 'audio' ? '0:07' : undefined
    };
    
    setChatRooms(prevRooms => 
      prevRooms.map(room => {
        if (room.id === chatId) {
          return {
            ...room,
            messages: [...(room.messages || []), newMessage],
            lastMessage: type === 'audio' ? '🎤 Audio message' : text,
            lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        }
        return room;
      })
    );
  };

  // Find the active room
  const activeRoom = chatRooms.find(room => room.id === activeChat) || chatRooms[0];

  return (
    <div className={classes.Chat}>
      <ChatSidebar 
        chatRooms={chatRooms} 
        onChatSelect={handleChatSelect} 
        activeChat={activeChat || chatRooms[0]?.id}
      />
      <ChatContent 
        activeRoom={activeRoom}
        onSendMessage={(text) => handleSendMessage(activeRoom.id, text)}
      />
    </div>
  );
}