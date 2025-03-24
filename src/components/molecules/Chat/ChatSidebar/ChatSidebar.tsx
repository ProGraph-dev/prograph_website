import { useState } from 'react';
import Image from 'next/image';
import classes from './style.module.scss';
import { IChatRoom } from '@/pages/chat';
import SearchIcon from '@/components/atoms/Icons/SearchIcon';

interface IChatSidebarProps {
  chatRooms: IChatRoom[];
  onChatSelect: (chatId: string) => void;
  activeChat: string;
}

export default function ChatSidebar({ chatRooms, onChatSelect, activeChat }: IChatSidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredRooms = chatRooms.filter(room => 
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className={classes.ChatSidebar}>
      <div className={classes.ChatSidebar__header}>
        <div className={classes.ChatSidebar__logo}>
          <Image 
            src="/images/logo.png" 
            alt="ProGraph Logo" 
            width={180} 
            height={40} 
            className={classes.ChatSidebar__logoImage}
          />
        </div>
        <h1 className={classes.ChatSidebar__title}>Chats</h1>
        <div className={classes.ChatSidebar__search}>
          <SearchIcon />
          <input 
            type="text" 
            placeholder="Search" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={classes.ChatSidebar__searchInput}
          />
        </div>
      </div>
      
      <div className={classes.ChatSidebar__chatList}>
        {filteredRooms.map(room => (
          <div 
            key={room.id}
            className={`${classes.ChatSidebar__chatItem} ${room.id === activeChat ? classes.ChatSidebar__chatItem_active : ''}`}
            onClick={() => onChatSelect(room.id)}
          >
            <div className={classes.ChatSidebar__chatAvatar}>
              <Image 
                src={room.avatar || "/images/default-avatar.png"} 
                alt={room.name} 
                width={40} 
                height={40} 
                className={classes.ChatSidebar__avatarImage}
              />
              {room.isOnline && (
                <span className={classes.ChatSidebar__onlineIndicator}></span>
              )}
            </div>
            <div className={classes.ChatSidebar__chatInfo}>
              <div className={classes.ChatSidebar__chatName}>
                {room.name}
              </div>
              <div className={classes.ChatSidebar__chatLastMessage}>
                <div className={classes.ChatSidebar__messagePreview}>
                  {room.lastMessage?.startsWith('🎤') ? (
                    <div className={classes.ChatSidebar__audioPreview}>
                      <span className={classes.ChatSidebar__audioIcon}>🎤</span>
                      <span>Audio message</span>
                    </div>
                  ) : (
                    <span>{room.lastMessage}</span>
                  )}
                </div>
              </div>
            </div>
            <div className={classes.ChatSidebar__chatMeta}>
              <span className={classes.ChatSidebar__chatStatus}>
                {room.isOnline ? 'Online' : 'Offline'}
              </span>
              {room.unreadCount && (
                <span className={classes.ChatSidebar__unreadBadge}>
                  {room.unreadCount}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}