import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

export const SnapchatIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2C7.5 2 5 5 5 8.5c0 1.5-.2 2.8-1.2 3.5-.4.3-.8.5-.8 1 0 .4.4.7.8.8 1.2.3 1.8.6 2 1.3.1.4 0 .8 0 1-.2.6-.5 1-.5 1.2 0 .4.3.7.8.7.3 0 .7-.1 1.2-.3.8-.3 1.5-.5 2.2-.2 1 .4 1.8 1.5 3.5 1.5s2.5-1.1 3.5-1.5c.7-.3 1.4-.1 2.2.2.5.2.9.3 1.2.3.5 0 .8-.3.8-.7 0-.2-.3-.6-.5-1.2 0-.2-.1-.6 0-1 .2-.7.8-1 2-1.3.4-.1.8-.4.8-.8 0-.5-.4-.7-.8-1C18.2 11.3 19 10 19 8.5 19 5 16.5 2 12 2z" />
  </svg>
);

export const TelegramIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21.2 4.4L2.4 11.1c-.6.2-.6 1.1 0 1.3l4.5 1.7 1.7 5.5c.2.5.8.7 1.2.4l2.5-2 4.9 3.6c.5.4 1.2.1 1.3-.5L21.9 5.4c.2-.7-.5-1.2-1-.9z" />
    <path d="M8.9 14.1l-.5 4.2" />
    <path d="M8.9 14.1L17 7.5" />
  </svg>
);

export const TiktokIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);
