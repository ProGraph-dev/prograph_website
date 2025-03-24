export default function MicrophoneIcon({ color = 'currentColor' }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 1C10.9 1 10 1.9 10 3V11C10 12.1 10.9 13 12 13C13.1 13 14 12.1 14 11V3C14 1.9 13.1 1 12 1Z" fill={color} />
      <path d="M17.3 11C17.3 14 14.76 16.1 12 16.1C9.24 16.1 6.7 14 6.7 11H5C5 14.41 7.72 17.23 11 17.72V21H13V17.72C16.28 17.23 19 14.41 19 11H17.3Z" fill={color} />
    </svg>
  );
}