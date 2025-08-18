import { format, toZonedTime, fromZonedTime } from 'date-fns-tz';

// Get all valid timezones (with TypeScript workaround)
export const getAllTimeZones = (): string[] => {
  // Type assertion as workaround
  if ('supportedValuesOf' in Intl) {
    return (Intl as any).supportedValuesOf('timeZone');
  }
  

  try {
  
    return [
      'UTC',
      'America/New_York',
      'America/Chicago',
      'America/Denver',
      'America/Los_Angeles',
      'Europe/London',
      'Europe/Paris',
      'Asia/Tokyo',
      'Asia/Shanghai',
      'Australia/Sydney'
    ];
  } catch (error) {
    console.error('Could not get timezones:', error);
    return ['UTC'];
  }
};

// Convert local time to UTC
export const localToUTC = (time: string, timeZone: string): string => {
  if (!time || !timeZone) return time;
  
  try {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    const utcDate = fromZonedTime(date, timeZone);
    return format(utcDate, 'HH:mm');
  } catch (error) {
    console.error('Error converting local to UTC:', error);
    return time;
  }
};

// Convert UTC to local time
export const utcToLocal = (utcTime: string, timeZone: string): string => {
  if (!utcTime || !timeZone) return utcTime;
  
  try {
    const [hours, minutes] = utcTime.split(':').map(Number);
    const date = new Date();
    date.setUTCHours(hours, minutes, 0, 0);
    const zonedDate = toZonedTime(date, timeZone);
    return format(zonedDate, 'HH:mm');
  } catch (error) {
    console.error('Error converting UTC to local:', error);
    return utcTime;
  }
};

// Format time with timezone display
export const formatTimeWithTimeZone = (time: string, timeZone: string): string => {
  if (!time || !timeZone) return time;
  
  try {
    const tzName = timeZone.split('/').pop()?.replace(/_/g, ' ') || timeZone;
    return `${time} (${tzName})`;
  } catch (error) {
    console.error('Error formatting time with timezone:', error);
    return time;
  }
};

// Get user's timezone
export const getUserTimeZone = (): string => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch (error) {
    console.error('Error getting user timezone:', error);
    return 'UTC';
  }
};