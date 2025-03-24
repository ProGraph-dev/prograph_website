import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import classes from './style.module.scss';
import { IChatRoom } from '@/pages/chat';
import SendIcon from '@/components/atoms/Icons/SendIcon';
import EmojiIcon from '@/components/atoms/Icons/EmojiIcon';
import AttachmentIcon from '@/components/atoms/Icons/AttachmentIcon';
import MoreVerticalIcon from '@/components/atoms/Icons/MoreVerticalIcon';
import MicrophoneIcon from '@/components/atoms/Icons/MicrophoneIcon';
import SearchIcon from '@/components/atoms/Icons/SearchIcon';
import NotificationIcon from '@/components/atoms/Icons/NotificationIcon';
import SettingsIcon from '@/components/atoms/Icons/SettingsIcon';
import EmojiPicker from '@/components/molecules/Chat/EmojiPicker/EmojiPicker';
import PlayIcon from '@/components/atoms/Icons/PlayIcon';
import PauseIcon from '@/components/atoms/Icons/PauseIcon';
import FileUploadModal from '../FileUploadModal/FileUploadModal';

interface IChatContentProps {
  activeRoom: IChatRoom;
  onSendMessage: (text: string, type?: 'text' | 'audio', audioData?: string) => void;
}

export default function ChatContent({ activeRoom, onSendMessage }: IChatContentProps) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioVolume, setAudioVolume] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState<string | null>(null);

  // Add this state in your component
  const [showFileUpload, setShowFileUpload] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioElementsRef = useRef<Record<string, HTMLAudioElement>>({});

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeRoom.messages]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Add this handler
  const handleFileUpload = (files: File[]) => {
    // Handle file upload logic here
    console.log('Files to upload:', files);
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Set up audio context for volume visualization
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;

      // Set up media recorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);

        // Update volume visualization
        if (analyserRef.current) {
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(dataArray);

          // Calculate volume level (0-100)
          const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
          const volume = Math.min(100, Math.round((average / 255) * 100));
          setAudioVolume(volume);
        }
      }, 1000);

    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);

        // Convert to base64 for storage/transmission
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64data = reader.result as string;
          onSendMessage('', 'audio', base64data);
        };

        // Clean up
        if (mediaRecorderRef.current && mediaRecorderRef.current.stream) {
          mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }

        if (timerRef.current) {
          clearInterval(timerRef.current);
        }

        if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }
      };

      setIsRecording(false);
      setAudioVolume(0);
    }
  };

  const handleStartRecording = () => {
    startRecording();
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  const handleEmojiSelect = (emoji: string) => {
    // Insert emoji at cursor position or append to end
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const newMessage = message.substring(0, start) + emoji + message.substring(end);
      setMessage(newMessage);

      // Focus back on textarea and set cursor position after the inserted emoji
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.selectionStart = start + emoji.length;
          textareaRef.current.selectionEnd = start + emoji.length;
        }
      }, 10);
    } else {
      setMessage(message + emoji);
    }
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handlePlayAudio = (audioId: string, audioData: string) => {
    // Stop any currently playing audio
    if (audioPlaying) {
      const currentAudio = audioElementsRef.current[audioPlaying];
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    }

    // Play the selected audio
    if (audioPlaying === audioId) {
      setAudioPlaying(null);
    } else {
      let audioElement = audioElementsRef.current[audioId];

      if (!audioElement) {
        audioElement = new Audio(audioData);
        audioElementsRef.current[audioId] = audioElement;

        audioElement.addEventListener('ended', () => {
          setAudioPlaying(null);
        });
      }

      audioElement.play();
      setAudioPlaying(audioId);
    }
  };

  return (
    <>
      <div className={classes.ChatContent}>
        <div className={classes.ChatContent__header}>
          <div className={classes.ChatContent__headerInfo}>
            <div className={classes.ChatContent__avatar}>
              <div className={classes.ChatContent__avatarFallback}>
                <Image 
                  src={activeRoom.avatar || "/images/default-avatar.png"} 
                  alt={activeRoom.name} 
                  width={40} 
                  height={40} 
                  className={classes.ChatContent__avatarImage}
                  onError={(e: any) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.style.backgroundColor = '#e0e0e0';
                  }}
                />
              </div>
            </div>
            <div className={classes.ChatContent__headerText}>
              <h2 className={classes.ChatContent__headerTitle}>{activeRoom.name}</h2>
            </div>
          </div>
          <div className={classes.ChatContent__headerActions}>
            <div className={classes.ChatContent__search}>
              <SearchIcon />
              <input type="text" placeholder="Search..." />
            </div>
            <button className={classes.ChatContent__actionButton}>
              <NotificationIcon />
            </button>
            <button className={classes.ChatContent__actionButton}>
              <SettingsIcon />
            </button>
          </div>
        </div>

        <div className={classes.ChatContent__messages}>
          <div className={classes.ChatContent__date}>
            Today
          </div>

          {activeRoom.messages && activeRoom.messages.map((msg) => (
            <div
              key={msg.id}
              className={`${classes.ChatContent__messageWrapper} ${msg.sender === 'user' ? classes.ChatContent__messageWrapper_user : ''}`}
            >
              {msg.sender !== 'user' && (
                <div className={classes.ChatContent__messageAvatar}>
                  <div className={classes.ChatContent__avatarFallback}>
                    <Image 
                      src={activeRoom.avatar || "/images/default-avatar.png"} 
                      alt={activeRoom.name} 
                      width={30} 
                      height={30} 
                      className={classes.ChatContent__messageAvatarImage}
                      onError={(e: any) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.style.backgroundColor = '#e0e0e0';
                      }}
                    />
                  </div>
                </div>
              )}
              <div
                className={`${classes.ChatContent__message} ${msg.sender === 'user' ? classes.ChatContent__message_user : ''}`}
              >
                {msg.type === 'audio' ? (
                  <div className={classes.ChatContent__audioMessage}>
                    <button
                      className={classes.ChatContent__audioPlayButton}
                      onClick={() => handlePlayAudio(msg.id, msg.audioData || '')}
                    >
                      {audioPlaying === msg.id ? <PauseIcon /> : <PlayIcon />}
                    </button>
                    <div className={classes.ChatContent__audioWaveform}>
                      <div className={classes.ChatContent__audioWaveformBar}></div>
                      <div className={classes.ChatContent__audioWaveformBar}></div>
                      <div className={classes.ChatContent__audioWaveformBar}></div>
                      <div className={classes.ChatContent__audioWaveformBar}></div>
                      <div className={classes.ChatContent__audioWaveformBar}></div>
                    </div>
                    <span className={classes.ChatContent__audioDuration}>{msg.duration || '0:07'}</span>
                  </div>
                ) : (
                  <div className={classes.ChatContent__messageText}>
                    {msg.text}
                  </div>
                )}
                <div className={classes.ChatContent__messageTime}>
                  {msg.timestamp}
                </div>
              </div>
              <button className={classes.ChatContent__messageOptions}>
                <MoreVerticalIcon />
              </button>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className={classes.ChatContent__inputArea}>
          {isRecording ? (
            <div className={classes.ChatContent__recordingIndicator}>
              <div className={classes.ChatContent__recordingPulse}></div>
              <span className={classes.ChatContent__recordingTime}>{formatTime(recordingTime)}</span>
              <span className={classes.ChatContent__recordingLabel}>Recording...</span>
              <button
                className={classes.ChatContent__recordingCancel}
                onClick={handleStopRecording}
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <div className={classes.ChatContent__inputActions}>
                <button
                  className={classes.ChatContent__inputButton}
                  onClick={toggleEmojiPicker}
                >
                  <EmojiIcon />
                </button>

                <button
                  className={classes.ChatContent__inputButton}
                  onClick={() => setShowFileUpload(true)}
                >
                  <AttachmentIcon />
                </button>

                <FileUploadModal
                  isOpen={showFileUpload}
                  onClose={() => setShowFileUpload(false)}
                  onSend={handleFileUpload}
                />
              </div>

              <div className={classes.ChatContent__inputWrapper}>
                <textarea
                  ref={textareaRef}
                  className={classes.ChatContent__input}
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
              </div>
            </>
          )}

          <div className={classes.ChatContent__sendActions}>
            <button
              className={`${classes.ChatContent__micButton} ${isRecording ? classes.ChatContent__micButton_active : ''}`}
              style={{
                boxShadow: isRecording ? `0 0 ${10 + audioVolume / 5}px ${audioVolume / 10}px rgba(0, 152, 121, ${audioVolume / 100})` : 'none'
              }}
              onMouseDown={handleStartRecording}
              onMouseUp={handleStopRecording}
              onMouseLeave={isRecording ? handleStopRecording : undefined}
            >
              <MicrophoneIcon />
            </button>

            {!isRecording && message.trim() && (
              <button
                className={`${classes.ChatContent__sendButton} ${message.trim() ? classes.ChatContent__sendButton_active : ''}`}
                onClick={handleSend}
                disabled={!message.trim()}
              >
                <SendIcon />
              </button>
            )}
          </div>

          {/* Emoji Picker */}
          <EmojiPicker
            isOpen={showEmojiPicker}
            onClose={() => setShowEmojiPicker(false)}
            onEmojiSelect={handleEmojiSelect}
          />
        </div>
      </div>

      <FileUploadModal
        isOpen={showFileUpload}
        onClose={() => setShowFileUpload(false)}
        onSend={handleFileUpload}
      />
    </>
  );
}