import classes from './style.module.scss';
import '../../app/globals.css';
import Chat from '@/components/molecules/Chat/Chat/Chat';
import cn from 'classnames';

export default function ChatPage() {
  return (
    <div className={cn(classes.ChatPage, 'container')}>
      <Chat />
    </div>
  );
}