export const TIMEZONE_OPTIONS = [
  // US & Canada
  { value: 'America/New_York', label: 'Eastern Time - US & Canada', group: 'US/CANADA' },
  { value: 'America/Chicago', label: 'Central Time - US & Canada', group: 'US/CANADA' },
  { value: 'America/Denver', label: 'Mountain Time - US & Canada', group: 'US/CANADA' },
  { value: 'America/Los_Angeles', label: 'Pacific Time - US & Canada', group: 'US/CANADA' },
  { value: 'America/Anchorage', label: 'Alaska Time', group: 'US/CANADA' },
  { value: 'Pacific/Honolulu', label: 'Hawaii Time', group: 'US/CANADA' },
  { value: 'America/Toronto', label: 'Eastern Time - Toronto', group: 'US/CANADA' },
  { value: 'America/Vancouver', label: 'Pacific Time - Vancouver', group: 'US/CANADA' },
  
  // Europe
  { value: 'Europe/London', label: 'Greenwich Mean Time - London', group: 'EUROPE' },
  { value: 'Europe/Paris', label: 'Central European Time - Paris', group: 'EUROPE' },
  { value: 'Europe/Berlin', label: 'Central European Time - Berlin', group: 'EUROPE' },
  { value: 'Europe/Rome', label: 'Central European Time - Rome', group: 'EUROPE' },
  { value: 'Europe/Madrid', label: 'Central European Time - Madrid', group: 'EUROPE' },
  { value: 'Europe/Amsterdam', label: 'Central European Time - Amsterdam', group: 'EUROPE' },
  
  // Asia
  { value: 'Asia/Tokyo', label: 'Japan Standard Time - Tokyo', group: 'ASIA' },
  { value: 'Asia/Shanghai', label: 'China Standard Time - Shanghai', group: 'ASIA' },
  { value: 'Asia/Kolkata', label: 'India Standard Time - Kolkata', group: 'ASIA' },
  { value: 'Asia/Dubai', label: 'Gulf Standard Time - Dubai', group: 'ASIA' },
  { value: 'Asia/Singapore', label: 'Singapore Standard Time', group: 'ASIA' },
  { value: 'Asia/Hong_Kong', label: 'Hong Kong Time', group: 'ASIA' },
  
  // Australia & Pacific
  { value: 'Australia/Sydney', label: 'Australian Eastern Time - Sydney', group: 'AUSTRALIA' },
  { value: 'Australia/Melbourne', label: 'Australian Eastern Time - Melbourne', group: 'AUSTRALIA' },
  { value: 'Australia/Perth', label: 'Australian Western Time - Perth', group: 'AUSTRALIA' },
  { value: 'Pacific/Auckland', label: 'New Zealand Standard Time - Auckland', group: 'AUSTRALIA' },
];

export const detectUserTimezone = (): string => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return 'UTC';
  }
};

export const getTimezoneLabel = (timezone: string): string => {
  const option = TIMEZONE_OPTIONS.find(tz => tz.value === timezone);
  return option?.label || timezone;
};

export const getCurrentTimeInTimezone = (timezone: string): string => {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    return formatter.format(now);
  } catch {
    return '';
  }
};

export const convertTimeToUTC = (time: string, timezone: string, date: Date = new Date()): string => {
  try {
    const [hours, minutes] = time.split(':').map(Number);
    const localDate = new Date(date);
    localDate.setHours(hours, minutes, 0, 0);
    
    // Create a date string that represents the local time in the given timezone
    const localTimeString = localDate.toLocaleString('en-CA', { timeZone: timezone });
    const utcTimeString = localDate.toLocaleString('en-CA', { timeZone: 'UTC' });
    
    // Calculate the offset and convert to UTC
    const localTime = new Date(localTimeString);
    const utcTime = new Date(utcTimeString);
    const offset = localTime.getTime() - utcTime.getTime();
    
    const utcDate = new Date(localDate.getTime() - offset);
    const utcHours = utcDate.getUTCHours().toString().padStart(2, '0');
    const utcMinutes = utcDate.getUTCMinutes().toString().padStart(2, '0');
    
    return `${utcHours}:${utcMinutes}`;
  } catch (error) {
    console.error('Error converting time to UTC:', error);
    return time;
  }
};

export const convertTimeFromUTC = (utcTime: string, timezone: string, date: Date = new Date()): string => {
  try {
    const [hours, minutes] = utcTime.split(':').map(Number);
    const utcDate = new Date(date);
    utcDate.setUTCHours(hours, minutes, 0, 0);
    
    const localDate = new Date(utcDate.toLocaleString('en-US', { timeZone: timezone }));
    const localHours = localDate.getHours().toString().padStart(2, '0');
    const localMinutes = localDate.getMinutes().toString().padStart(2, '0');
    
    return `${localHours}:${localMinutes}`;
  } catch (error) {
    console.error('Error converting time from UTC:', error);
    return utcTime;
  }
};