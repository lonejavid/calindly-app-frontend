
import { JSX, useState } from 'react';
import {
  X,
  Calendar,
  MapPin,
  Clock,
  Shield,
  Users,
  FileText,
  Bell,
  Check,
  CheckCircle,
  Plus,
  Minus,
  Info,
  Zap,
  Trash2,
  CalendarDays,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkIntegrationQueryFn, CreateEventMutationFn } from "@/lib/api";

import { toast } from 'sonner';
import { PROTECTED_ROUTES } from '@/routes/common/routePaths';

// Enum for video conferencing platforms
enum VideoConferencingPlatform {
  GOOGLE_MEET_AND_CALENDAR = 'GOOGLE_MEET_AND_CALENDAR',
  ZOOM_MEETING = 'ZOOM_MEETING',
  MICROSOFT_TEAMS = 'MICROSOFT_TEAMS',
}

// Types for API functions
interface CreateEventData {
  title: string;
  description: string;
  accessSpecifier: 'allow_all' | 'block_domains';
  locationType: VideoConferencingPlatform; 
  selectedLocationType: string | null;
  appConnected: boolean;
  duration: number;
  bufferBefore: number;
  bufferAfter: number;
  maxBookingsPerDay: number | null;
  allowGuests: boolean;
  timeZoneDisplay: string;
  timeSlotInterval: number;
  blockedDomains: string[];
  questions: Question[];
  notifications: {
    emailConfirmation: boolean;
    emailReminder: boolean;
    calendarInvitation: boolean;
  };
  confirmationMessage: string;
  redirectToUrl: boolean;
  redirectUrl: string | null;
  createdAt: string;

  isActive: boolean;
    minimumNotice: number;
  noticeType: 'minutes' | 'hours' | 'days';
  dateRangeLimit: number;


 
  bookingWindowType: 'fixed' | 'date-range' | 'indefinite';
  dateRangeType: 'calendar days' | 'business days' | 'weeks' | 'months';
}





interface EventCreationSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LocationOption {
  value: string;
  label: string;
  logo: string;
  isAvailable: boolean;
}

interface DomainOption {
  value: string;
  label: string;
}

interface Question {
  id: number;
  question: string;
  type: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox';
  required: boolean;
  options: string[];
}

interface FormData {
  title: string;
  duration: number;
  description: string;
  accessSpecifier: 'allow_all' | 'block_domains';
  locationType: string;
}

interface FormErrors {
  [key: string]: string | null;
}

type SectionAccent = "blue" | "wa" | "amber" | "ink";

interface Section {
  id: string;
  name: string;
  icon: LucideIcon;
  accent: SectionAccent;
}

const TAB_ACCENT_HOVER: Record<
  SectionAccent,
  string
> = {
  blue:
    "hover:border-[color:var(--blue)] hover:bg-[var(--blue-lite)] hover:text-[color:var(--blue)]",
  wa: "hover:border-[color:var(--wa)] hover:bg-[var(--wa-lite)] hover:text-[color:var(--wa-dark)]",
  amber:
    "hover:border-[color:var(--amber)] hover:bg-[var(--amber-lite)] hover:text-[color:var(--amber-dark)]",
  ink: "hover:border-[color:var(--ink-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--ink)]",
};

const TAB_ACCENT_FOCUS: Record<SectionAccent, string> = {
  blue: "focus-visible:outline-[color:var(--blue-deep)]",
  wa: "focus-visible:outline-[color:var(--wa-dark)]",
  amber: "focus-visible:outline-[color:var(--amber-dark)]",
  ink: "focus-visible:outline-[color:var(--ink-mid)]",
};

const TAB_ACCENT_ACTIVE_SHADOW: Record<SectionAccent, string> = {
  blue: "shadow-[var(--sh-blue)]",
  wa: "shadow-[var(--sh-wa)]",
  amber: "shadow-[var(--sh-amber)]",
  ink: "shadow-[var(--sh-sm)]",
};

const TAB_ACCENT_BG: Record<SectionAccent, string> = {
  blue: "var(--blue)",
  wa: "var(--wa)",
  amber: "var(--amber)",
  ink: "var(--ink-mid)",
};

const TAB_ACCENT_ICON: Record<SectionAccent, string> = {
  blue: "var(--blue)",
  wa: "var(--wa-dark)",
  amber: "var(--amber-deep)",
  ink: "var(--ink-soft)",
};

const locationOptions: LocationOption[] = [
  {
    value: VideoConferencingPlatform.GOOGLE_MEET_AND_CALENDAR,
    label: 'Google Meet',
    logo: 'https://img.icons8.com/?size=100&id=9730&format=png&color=000000',
    isAvailable: true,
  },
  {
    value: VideoConferencingPlatform.ZOOM_MEETING,
    label: 'Zoom',
    logo: 'https://img.icons8.com/?size=100&id=5pu47piHKg1I&format=png&color=000000',
    isAvailable: true,
  },
  {
    value: VideoConferencingPlatform.MICROSOFT_TEAMS,
    label: 'Teams',
    logo: 'https://img.icons8.com/?size=100&id=65231&format=png&color=000000',
    isAvailable: true,
  },
];

const commonDomains: DomainOption[] = [
  { value: '@gmail.com', label: 'Gmail (@gmail.com)' },
  { value: '@yahoo.com', label: 'Yahoo (@yahoo.com)' },
  { value: '@outlook.com', label: 'Outlook (@outlook.com)' },
  { value: '@hotmail.com', label: 'Hotmail (@hotmail.com)' },
  { value: '@icloud.com', label: 'iCloud (@icloud.com)' },
  { value: '@aol.com', label: 'AOL (@aol.com)' },
];

const EventCreationSidePanel = ({ isOpen, onClose }: EventCreationSidePanelProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: CreateEventMutationFn,
  });
// added code is here 
const [bookingWindowType, setBookingWindowType] = useState<'fixed' | 'date-range' | 'indefinite'>('fixed');
const [dateRangeType, setDateRangeType] = useState<'calendar days' | 'business days' | 'weeks' | 'months'>('calendar days');
const [minimumNotice, setMinimumNotice] = useState<number>(30); // Default 30 minutes
const [noticeType, setNoticeType] = useState<'minutes' | 'hours' | 'days'>('minutes');
const [dateRangeLimit, setDateRangeLimit] = useState<number>(30); // Default 30 days
  const [activeSection, setActiveSection] = useState<string>('basic-info');
  const [selectedLocationType, setSelectedLocationType] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [appConnected, setAppConnected] = useState<boolean>(false);
  const [bufferBefore, setBufferBefore] = useState<number>(0);
  const [bufferAfter, setBufferAfter] = useState<number>(0);
  const [maxBookingsPerDay, setMaxBookingsPerDay] = useState<number | null>(null);
  const [allowGuests, setAllowGuests] = useState<boolean>(true);
  const [timeZoneDisplay, setTimeZoneDisplay] = useState<string>('auto-detect');
  const [timeSlotInterval, setTimeSlotInterval] = useState<string>('30');
  const [emailConfirmation, setEmailConfirmation] = useState<boolean>(true);
  const [emailReminder, setEmailReminder] = useState<boolean>(true);
  const [calendarInvitation, setCalendarInvitation] = useState<boolean>(true);
  const [redirectToUrl, setRedirectToUrl] = useState<boolean>(false);
  const [redirectUrl, setRedirectUrl] = useState<string>('');
  const [confirmationMessage, setConfirmationMessage] = useState<string>(
    'Thank you for booking! We look forward to meeting with you.'
  );
  const [blockedDomains, setBlockedDomains] = useState<string[]>([]);

  const [customDomain, setCustomDomain] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      question: 'What is your interest in this meeting?',
      type: 'text',
      required: false,
      options: [],
    },
  ]);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    duration: 30,
    description: '',
    accessSpecifier: 'allow_all',
    locationType: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Event name is required';
    if (!formData.duration || formData.duration < 1) newErrors.duration = 'Duration is required and must be at least 1 minute';
    if (!formData.locationType) newErrors.locationType = 'Location type is required';
      if (minimumNotice < 1) newErrors.minimumNotice = 'Minimum notice must be at least 1';
  if (dateRangeLimit < 1 && bookingWindowType === 'fixed') {
    newErrors.dateRangeLimit = 'Date range limit must be at least 1';
  }
    if (!formData.description.trim()) newErrors.description = 'Description is required';
      if (minimumNotice < 1) newErrors.minimumNotice = 'Minimum notice must be at least 1';
  if (dateRangeLimit < 1) newErrors.dateRangeLimit = 'Date range limit must be at least 1 day';
    const hasValidQuestion = questions.some(q => q.question.trim() !== '');
    if (!hasValidQuestion) newErrors.questions = 'At least one question must be provided';
    questions.forEach((q, index) => {
      if (q.required && !q.question.trim()) {
        newErrors[`question_${q.id}`] = `Question ${index + 1} is marked as required but has no question text`;
      }
    });
    if (customDomain && !customDomain.startsWith('@')) newErrors.customDomain = 'Custom domain must start with @';
    if (redirectToUrl && !redirectUrl.trim()) newErrors.redirectUrl = 'Redirect URL is required when redirect option is enabled';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string | number): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const sections: Section[] = [
    { id: "basic-info", name: "Event type", icon: Calendar, accent: "blue" },
    { id: "location", name: "Location", icon: MapPin, accent: "blue" },
    { id: "duration", name: "Duration", icon: Clock, accent: "blue" },
    { id: "buffers", name: "Limits & buffers", icon: Shield, accent: "blue" },
    {
      id: "booking-options",
      name: "Booking page options",
      icon: Users,
      accent: "blue",
    },
    { id: "invitee-form", name: "Invitee form", icon: FileText, accent: "blue" },
    { id: "notifications", name: "Notifications", icon: Bell, accent: "blue" },
    {
      id: "confirmation",
      name: "Confirmation page",
      icon: CheckCircle,
      accent: "blue",
    },
    {
      id: "availability",
      name: "Availability",
      icon: CalendarDays,
      accent: "blue",
    },
  ];


  const formatNoticeDisplay = (): string => {
  if (noticeType === 'minutes') {
    return `${minimumNotice} minute${minimumNotice !== 1 ? 's' : ''}`;
  } else if (noticeType === 'hours') {
    return `${minimumNotice} hour${minimumNotice !== 1 ? 's' : ''}`;
  } else {
    return `${minimumNotice} day${minimumNotice !== 1 ? 's' : ''}`;
  }
};

  const handleLocationTypeChange = async (value: string): Promise<void> => {
    setSelectedLocationType(value);
    setAppConnected(false);
    handleInputChange('locationType', value);
    setError(null);

    if (value === VideoConferencingPlatform.GOOGLE_MEET_AND_CALENDAR) {
      setIsChecking(true);
      try {
        const { isConnected } = await checkIntegrationQueryFn(value as VideoConferencingPlatform);
        if (!isConnected) {
          setError(
            `Google Meet is not connected. <a href="${PROTECTED_ROUTES.INTEGRATIONS}" target="_blank" class="underline text-blue-600 hover:text-blue-800">Visit the integration page</a> to connect your account.`
          );
          return;
        }
        setAppConnected(true);
      } catch (err) {
        setError('Failed to check Google Meet integration status.');
        console.error('Integration error:', err);
      } finally {
        setIsChecking(false);
      }
    } else {
      setAppConnected(true);
    }
  };

  const addQuestion = (): void => {
    const newQuestion: Question = {
      id: Date.now(),
      question: '',
      type: 'text',
      required: false,
      options: [],
    };
    setQuestions([...questions, newQuestion]);
  };
const updateQuestionOption = (questionId: number, optionIndex: number, value: string): void => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
    
    // Clear related errors when updating options
    if (errors[`question_options_${questionId}`]) {
      setErrors(prev => ({ ...prev, [`question_options_${questionId}`]: null }));
    }
  };

  const updateQuestion = (id: number, field: keyof Question, value: string | boolean): void => {
    setQuestions(questions.map(q => (q.id === id ? { ...q, [field]: value } : q)));
  };

  const removeQuestion = (id: number): void => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleDomainToggle = (domain: string): void => {
    setBlockedDomains(prev =>
      prev.includes(domain) ? prev.filter(d => d !== domain) : [...prev, domain]
    );
  };

  const addCustomDomain = (): void => {
    if (customDomain && customDomain.startsWith('@') && !blockedDomains.includes(customDomain)) {
      setBlockedDomains(prev => [...prev, customDomain]);
      setCustomDomain('');
      setErrors(prev => ({ ...prev, customDomain: null }));
    }
  };
    const addQuestionOption = (questionId: number): void => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return { ...q, options: [...q.options, ''] };
      }
      return q;
    }));
  };

  const removeQuestionOption = (questionId: number, optionIndex: number): void => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newOptions = q.options.filter((_, index) => index !== optionIndex);
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const removeCustomDomain = (domain: string): void => {
    setBlockedDomains(prev => prev.filter(d => d !== domain));
  };

  const handleSubmit = (): void => {
    if (!validateForm()) {
      const errorKeys = Object.keys(errors);
      if (errorKeys.some(key => ['title', 'description', 'accessSpecifier'].includes(key))) {
        setActiveSection('basic-info');
      } else if (errorKeys.includes('locationType')) {
        setActiveSection('location');
      } else if (errorKeys.includes('duration')) {
        setActiveSection('duration');
      } else if (errorKeys.some(key => key.startsWith('question_') || key === 'questions')) {
        setActiveSection('invitee-form');
      } else if (errorKeys.includes('redirectUrl')) {
        setActiveSection('confirmation');
      }
        if (errorKeys.some(key => ['minimumNotice', 'dateRangeLimit'].includes(key))) {
    setActiveSection('availability');
  }
      return;
    }

    const eventData: CreateEventData = {
      title: formData.title,
      description: formData.description,
      accessSpecifier: formData.accessSpecifier,
      locationType: formData.locationType as VideoConferencingPlatform,
      selectedLocationType,
      appConnected,
      duration: formData.duration,
      bufferBefore,
      bufferAfter,
      maxBookingsPerDay: maxBookingsPerDay ? parseInt(maxBookingsPerDay.toString()) : null,
      allowGuests,
      timeZoneDisplay,
      timeSlotInterval: parseInt(timeSlotInterval),
      blockedDomains,
      questions: questions.filter(q => q.question.trim() !== ''),
      notifications: { emailConfirmation, emailReminder, calendarInvitation },
      confirmationMessage,
      redirectToUrl,
      redirectUrl: redirectToUrl ? redirectUrl : null,
      createdAt: new Date().toISOString(),
      isActive: true,
        minimumNotice,
  noticeType,
  dateRangeLimit,


  bookingWindowType,
  dateRangeType,

    };
        console.log("event data sent is ",eventData);

    mutate(eventData, {
      onSuccess: () => {
        console.log("event data sent is ",eventData);
        queryClient.invalidateQueries({ queryKey: ['event_list'] });
        toast.success('Event created successfully');
        onClose();
        setFormData({
          title: '',
          duration: 30,
          description: '',
          accessSpecifier: 'allow_all',
          locationType: '',
        });
        setSelectedLocationType(null);
        setAppConnected(false);
        setActiveSection('basic-info');
      },
      onError: (error: Error) => {
        toast.error(error.message || 'Failed to create event');
        console.error('API Error:', error);
      },
    });
  };

  if (!isOpen) return null;

  const renderSectionContent = (): JSX.Element | null => {
    switch (activeSection) {
      case 'basic-info':
        return (
          <div className="space-y-6">
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "var(--blue-lite)",
                borderColor: "var(--line-strong)",
              }}
            >
              <div className="mb-2 flex items-center space-x-2">
                <Sparkles className="h-5 w-5" style={{ color: "var(--blue)" }} />
                <h3 className="font-semibold" style={{ color: "var(--ink)" }}>
                  Event Basics
                </h3>
              </div>
              <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
                Create your perfect event template
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-800">
                Event name <span className="text-red-500">*</span>
              </label>
              <input
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[color:var(--blue)] focus:border-[color:var(--blue)] transition-all duration-200 bg-white shadow-sm"
                placeholder="Enter event name"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-800">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[color:var(--blue)] focus:border-[color:var(--blue)] transition-all duration-200 bg-white shadow-sm resize-none"
                placeholder="Tell your invitees what this meeting is about"
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-800">Access Control</label>
              <select
                value={formData.accessSpecifier}
                onChange={(e) => handleInputChange('accessSpecifier', e.target.value as 'allow_all' | 'block_domains')}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[color:var(--blue)] focus:border-[color:var(--blue)] transition-all duration-200 bg-white shadow-sm"
              >
                <option value="allow_all">Allow all email domains to book</option>
                <option value="block_domains">Block specific email domains</option>
              </select>
            </div>
            {formData.accessSpecifier === 'block_domains' && (
              <div
                className="rounded-xl border-2 p-5"
                style={{
                  backgroundColor: "var(--blue-lite)",
                  borderColor: "var(--line-strong)",
                }}
              >
                <h4
                  className="mb-4 flex items-center font-semibold"
                  style={{ color: "var(--ink)" }}
                >
                  <Shield className="mr-2 h-4 w-4" style={{ color: "var(--blue)" }} />
                  Block Email Domains
                </h4>
                <div className="space-y-4">
                  <div>
                    <label
                      className="mb-2 block text-sm font-medium"
                      style={{ color: "var(--ink-mid)" }}
                    >
                      Common Email Domains
                    </label>
                    <div className="grid grid-cols-1 gap-2.5 xs:grid-cols-2">
                      {commonDomains.map((domain) => {
                        const isOn = blockedDomains.includes(domain.value);
                        return (
                          <label
                            key={domain.value}
                            className="flex min-h-[48px] cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-3 hover:bg-[var(--blue-ghost)] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[color:var(--blue-glow)] has-[:focus-visible]:ring-offset-2"
                          >
                            <input
                              type="checkbox"
                              checked={isOn}
                              onChange={() => handleDomainToggle(domain.value)}
                              className="sr-only"
                            />
                            <span
                              className="flex h-4 w-4 shrink-0 items-center justify-center rounded transition-colors"
                              style={{
                                backgroundColor: isOn ? "var(--blue)" : "var(--surface-2)",
                              }}
                              aria-hidden
                            >
                              {isOn ? (
                                <Check className="h-3 w-3 text-white" strokeWidth={3} />
                              ) : null}
                            </span>
                            <span className="text-sm text-gray-700">{domain.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label
                      className="mb-2 block text-sm font-medium"
                      style={{ color: "var(--ink-mid)" }}
                    >
                      Add Custom Domain
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={customDomain}
                        onChange={(e) => setCustomDomain(e.target.value)}
                        className="flex-1 rounded-sm border border-gray-300 px-3 py-2 focus:border-[color:var(--blue)] focus:ring-2 focus:ring-[color:var(--blue-glow)]"
                        placeholder="@company.com"
                      />
                      <button
                        type="button"
                        onClick={addCustomDomain}
                        className="rounded-sm px-4 py-2 font-medium text-white transition-colors hover:opacity-95"
                        style={{ backgroundColor: "var(--blue)" }}
                      >
                        Add
                      </button>
                    </div>
                    {errors.customDomain && <p className="mt-1 text-sm text-red-600">{errors.customDomain}</p>}
                  </div>
                  {blockedDomains.length > 0 && (
                    <div>
                      <label
                        className="mb-2 block text-sm font-medium"
                        style={{ color: "var(--ink-mid)" }}
                      >
                        Blocked Domains
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {blockedDomains.map((domain) => (
                          <span
                            key={domain}
                            className="inline-flex items-center rounded-full bg-[var(--blue-lite)] px-3 py-1 text-sm"
                            style={{ color: "var(--blue-deep)" }}
                          >
                            {domain}
                            <button
                              type="button"
                              onClick={() => removeCustomDomain(domain)}
                              className="ml-2 transition-colors hover:opacity-80"
                              style={{ color: "var(--blue-deep)" }}
                              aria-label={`Remove ${domain}`}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      case "availability":
  return (
    <div className="space-y-4">
      {/* Header */}
      <div
        className="rounded-lg border p-3"
        style={{
          backgroundColor: "var(--blue-lite)",
          borderColor: "var(--line-strong)",
        }}
      >
        <div className="mb-1 flex items-center space-x-2">
          <CalendarDays className="h-4 w-4" style={{ color: "var(--blue)" }} />
          <h3 className="font-semibold" style={{ color: "var(--ink)" }}>
            Booking Availability
          </h3>
        </div>
        <p className="text-xs" style={{ color: "var(--ink-soft)" }}>
          Control when people can book meetings
        </p>
      </div>

      {/* Minimum Notice */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center space-x-2 mb-3">
          <Clock className="h-4 w-4" style={{ color: "var(--blue)" }} />
          <h4 className="font-medium text-gray-900">Minimum Notice</h4>
        </div>
        
        <div className="flex items-center space-x-2 mb-3">
          <input
            type="number"
            value={minimumNotice}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 1;
              setMinimumNotice(Math.max(1, value));
            }}
            className="w-16 rounded border border-gray-300 px-2 py-1.5 text-center text-sm focus:border-[color:var(--blue)] focus:ring-1 focus:ring-[color:var(--blue-glow)]"
            min="1"
          />
          <select
            value={noticeType}
            onChange={(e) => setNoticeType(e.target.value as 'minutes' | 'hours' | 'days')}
            className="rounded border border-gray-300 px-2 py-1.5 text-sm focus:border-[color:var(--blue)] focus:ring-1 focus:ring-[color:var(--blue-glow)]"
          >
            <option value="minutes">min</option>
            <option value="hours">hrs</option>
            <option value="days">days</option>
          </select>
          <span className="text-sm text-gray-600">before meeting</span>
        </div>

        {errors.minimumNotice && (
          <p className="text-xs text-red-600 mb-2">{errors.minimumNotice}</p>
        )}

        {/* Quick presets */}
        <div className="flex flex-wrap gap-1">
          {[
            { value: 30, type: 'minutes', label: '30m' },
            { value: 1, type: 'hours', label: '1h' },
            { value: 4, type: 'hours', label: '4h' },
            { value: 1, type: 'days', label: '1d' },
            { value: 2, type: 'days', label: '2d' }
          ].map((preset) => (
            <button
              key={`${preset.value}-${preset.type}`}
              type="button"
              onClick={() => {
                setMinimumNotice(preset.value);
                setNoticeType(preset.type as 'minutes' | 'hours' | 'days');
              }}
              className={`rounded px-2 py-1 text-xs transition-colors ${
                minimumNotice === preset.value && noticeType === preset.type
                  ? "text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              style={
                minimumNotice === preset.value && noticeType === preset.type
                  ? { backgroundColor: "var(--blue)" }
                  : undefined
              }
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Booking Window */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center space-x-2 mb-3">
          <Calendar className="h-4 w-4" style={{ color: "var(--blue)" }} />
          <h4 className="font-medium text-gray-900">Booking Window</h4>
        </div>

        <div className="space-y-2">
          {/* Fixed Duration */}
          <label className="flex items-start space-x-2 cursor-pointer p-2 rounded hover:bg-gray-50">
            <input
              type="radio"
              name="bookingWindow"
              value="fixed"
              checked={bookingWindowType === 'fixed'}
              onChange={(e) => setBookingWindowType(e.target.value as 'fixed' | 'date-range' | 'indefinite')}
              className="mt-0.5 h-3 w-3"
              style={{ accentColor: "var(--blue)" }}
            />
            <div className="flex-1 min-w-0">
              <div className="mb-1">
                <span className="text-sm font-medium text-gray-900">**Fixed duration**</span>
                <p className="text-xs text-gray-600">Invitees can schedule</p>
              </div>
              <div className="flex items-center space-x-2 mb-1">
                <input
                  type="number"
                  value={dateRangeLimit}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    setDateRangeLimit(Math.max(1, value));
                  }}
                  className="w-16 rounded border border-gray-300 px-2 py-1 text-center text-sm focus:border-[color:var(--blue)] focus:ring-1 focus:ring-[color:var(--blue-glow)] disabled:bg-gray-100"
                  min="1"
                  disabled={bookingWindowType !== 'fixed'}
                />
                <select
                  value={dateRangeType}
                  onChange={(e) => setDateRangeType(e.target.value as 'calendar days' | 'business days' | 'weeks' | 'months')}
                  disabled={bookingWindowType !== 'fixed'}
                  className="rounded border border-gray-300 px-2 py-1 text-sm focus:border-[color:var(--blue)] focus:ring-1 focus:ring-[color:var(--blue-glow)] disabled:bg-gray-100"
                >
                  <option value="calendar days">days</option>
                  <option value="weeks">weeks</option>
                  <option value="months">months</option>
                </select>
                <span className="text-xs text-gray-600">into the future</span>
              </div>
              <p className="text-xs text-gray-600">
                with at least <span className="font-medium text-gray-900">**{formatNoticeDisplay()}**</span> notice
              </p>
            </div>
          </label>
          <label className="flex items-start space-x-2 cursor-pointer p-2 rounded hover:bg-gray-50">
            <input
              type="radio"
              name="bookingWindow"
              value="indefinite"
              checked={bookingWindowType === 'indefinite'}
              onChange={(e) => setBookingWindowType(e.target.value as 'fixed' | 'date-range' | 'indefinite')}
              className="mt-0.5 h-3 w-3"
              style={{ accentColor: "var(--blue)" }}
            />
            <div>
              <span className="text-sm font-medium text-gray-900">**No limit**</span>
              <p className="text-xs text-gray-600">Invitees can schedule indefinitely into the future</p>
            </div>
          </label>
        </div>

        {/* Date Range option additional info */}
        {bookingWindowType === 'date-range' && (
          <div
            className="ml-5 mt-2 rounded p-2 text-xs"
            style={{ backgroundColor: "var(--blue-lite)", color: "var(--ink-soft)" }}
          >
            <p>
              with at least{" "}
              <span className="font-medium" style={{ color: "var(--ink)" }}>
                {formatNoticeDisplay()}
              </span>{" "}
              notice
            </p>
          </div>
        )}

        {bookingWindowType === 'indefinite' && (
          <div
            className="ml-5 mt-2 rounded p-2 text-xs"
            style={{ backgroundColor: "var(--blue-lite)", color: "var(--ink-soft)" }}
          >
            <p>
              with at least{" "}
              <span className="font-medium" style={{ color: "var(--ink)" }}>
                {formatNoticeDisplay()}
              </span>{" "}
              notice
            </p>
          </div>
        )}

        {errors.dateRangeLimit && (
          <p className="text-xs text-red-600 mt-2">{errors.dateRangeLimit}</p>
        )}

        {/* Quick presets for fixed */}
        {bookingWindowType === 'fixed' && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-600 mb-2">Quick settings:</p>
            <div className="flex flex-wrap gap-1">
              {[
                { value: 30, type: 'calendar days', label: '30d' },
                { value: 60, type: 'calendar days', label: '60d' },
                { value: 3, type: 'months', label: '3m' },
                { value: 6, type: 'months', label: '6m' }
              ].map((preset) => (
                <button
                  key={`range-${preset.value}-${preset.type}`}
                  type="button"
                  onClick={() => {
                    setDateRangeLimit(preset.value);
                    setDateRangeType(preset.type as 'calendar days' | 'business days' | 'weeks' | 'months');
                  }}
                  className={`rounded px-2 py-1 text-xs transition-colors ${
                    dateRangeLimit === preset.value && dateRangeType === preset.type
                      ? "text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  style={
                    dateRangeLimit === preset.value && dateRangeType === preset.type
                      ? { backgroundColor: "var(--blue)" }
                      : undefined
                  }
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Current Settings Summary */}
      <div
        className="rounded-lg border p-3"
        style={{
          backgroundColor: "var(--blue-lite)",
          borderColor: "var(--line-strong)",
        }}
      >
        <div className="flex items-start space-x-2">
          <CheckCircle className="mt-0.5 h-4 w-4" style={{ color: "var(--blue)" }} />
          <div className="text-sm" style={{ color: "var(--ink-mid)" }}>
            <p className="font-medium mb-1">Current settings:</p>
            <ul className="space-y-1 text-xs">
              <li>• Min notice: {formatNoticeDisplay()}</li>
              <li>• Window: {bookingWindowType === 'indefinite' 
                ? 'No limit' 
                : bookingWindowType === 'date-range' 
                ? 'Date range (coming soon)'
                : `${dateRangeLimit} ${dateRangeType}`}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

 
      case 'location':
        return (
          <div className="space-y-6">
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "var(--blue-lite)",
                borderColor: "var(--line-strong)",
              }}
            >
              <div className="mb-2 flex items-center space-x-2">
                <MapPin className="h-5 w-5" style={{ color: "var(--blue)" }} />
                <h3 className="font-semibold" style={{ color: "var(--ink)" }}>
                  Meeting Location
                </h3>
              </div>
              <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
                Choose where your meeting will take place
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-800">
                Location Type <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {locationOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`cursor-pointer rounded-xl border-2 p-5 transition-all duration-300 hover:shadow-lg ${
                      selectedLocationType === option.value
                        ? appConnected
                          ? "scale-[1.02] shadow-lg"
                          : error
                            ? "border-red-400 bg-red-50 shadow-lg"
                            : "shadow-lg"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                    }`}
                    style={
                      selectedLocationType === option.value
                        ? appConnected
                          ? {
                              borderColor: "var(--blue)",
                              backgroundColor: "var(--blue-lite)",
                            }
                          : error
                            ? undefined
                            : {
                                borderColor: "var(--blue)",
                                backgroundColor: "var(--blue-lite)",
                              }
                        : undefined
                    }
                    onClick={() => handleLocationTypeChange(option.value)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <img
                          src={option.logo}
                          alt={option.label}
                          className="w-6 h-6"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{option.label}</h4>
                        <p className="text-sm text-gray-600">
                          {option.value === VideoConferencingPlatform.GOOGLE_MEET_AND_CALENDAR
                            ? 'Google Meet video conference'
                            : option.value === VideoConferencingPlatform.ZOOM_MEETING
                            ? 'Zoom video conference'
                            : 'Microsoft Teams video conference'}
                        </p>
                      </div>
                      {isChecking && selectedLocationType === option.value && (
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                      )}
                      {appConnected && selectedLocationType === option.value && (
                        <div
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: "var(--blue)" }}
                        >
                          <Check className="h-4 w-4 text-white" strokeWidth={2.5} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {error && (
                <div className="mt-4 rounded-xl border-2 border-red-200 bg-red-50 p-4">
                  <p
                    className="text-sm text-red-700 flex items-center"
                    dangerouslySetInnerHTML={{ __html: error }}
                  />
                </div>
              )}
              {errors.locationType && <p className="mt-1 text-sm text-red-600">{errors.locationType}</p>}
            </div>
          </div>
        );
      case 'duration':
        return (
          <div className="space-y-6">
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "var(--blue-lite)",
                borderColor: "var(--line-strong)",
              }}
            >
              <div className="mb-2 flex items-center space-x-2">
                <Clock className="h-5 w-5" style={{ color: "var(--blue)" }} />
                <h3 className="font-semibold" style={{ color: "var(--ink)" }}>
                  Event Duration
                </h3>
              </div>
              <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
                Set the perfect time for your meetings
              </p>
            </div>
            <div>
              <label className="mb-3 block text-sm font-semibold text-gray-800">
                Duration (minutes) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 0)}
                className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 shadow-sm transition-all duration-200 focus:border-[color:var(--blue)] focus:ring-2 focus:ring-[color:var(--blue-glow)]"
                placeholder="30"
                min="1"
              />
              {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
            </div>
            <div
              className="rounded-xl border-2 p-5"
              style={{
                backgroundColor: "var(--blue-lite)",
                borderColor: "var(--line-strong)",
              }}
            >
              <div className="flex items-start space-x-3">
                <div
                  className="mt-0.5 rounded-full p-1"
                  style={{ backgroundColor: "var(--blue)" }}
                >
                  <Info className="h-4 w-4 text-white" />
                </div>
                <div className="text-sm">
                  <p className="mb-1 font-semibold" style={{ color: "var(--ink)" }}>
                    Duration affects scheduling
                  </p>
                  <p style={{ color: "var(--ink-soft)" }}>
                    This duration will be used to block time on your calendar and determine available
                    time slots.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'buffers':
        return (
          <div className="space-y-6">
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "var(--blue-lite)",
                borderColor: "var(--line-strong)",
              }}
            >
              <div className="mb-2 flex items-center space-x-2">
                <Shield className="h-5 w-5" style={{ color: "var(--blue)" }} />
                <h3 className="font-semibold" style={{ color: "var(--ink)" }}>
                  Smart Buffers
                </h3>
              </div>
              <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
                Add breathing room between meetings
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6 text-gray-800">Buffer times</h3>
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-xl border-2 border-gray-100 shadow-sm">
                  <label className="block text-sm font-semibold mb-3 text-gray-800">Buffer before event (minutes)</label>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => setBufferBefore(Math.max(0, bufferBefore - 5))}
                      className="rounded-full p-3 text-white shadow-md transition-all duration-200 hover:opacity-95 hover:shadow-lg"
                      style={{ backgroundColor: "var(--blue)" }}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      value={bufferBefore}
                      onChange={(e) => setBufferBefore(parseInt(e.target.value) || 0)}
                      className="w-24 px-3 py-3 border-2 border-gray-200 rounded-xl text-center font-semibold text-lg bg-gradient-to-r from-gray-50 to-white"
                      min="0"
                    />
                    <button
                      type="button"
                      onClick={() => setBufferBefore(bufferBefore + 5)}
                      className="rounded-full p-3 text-white shadow-md transition-all duration-200 hover:opacity-95 hover:shadow-lg"
                      style={{ backgroundColor: "var(--blue)" }}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-xl border-2 border-gray-100 shadow-sm">
                  <label className="block text-sm font-semibold mb-3 text-gray-800">Buffer after event (minutes)</label>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => setBufferAfter(Math.max(0, bufferAfter - 5))}
                      className="rounded-full p-3 text-white shadow-md transition-all duration-200 hover:opacity-95 hover:shadow-lg"
                      style={{ backgroundColor: "var(--blue)" }}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      value={bufferAfter}
                      onChange={(e) => setBufferAfter(parseInt(e.target.value) || 0)}
                      className="w-24 px-3 py-3 border-2 border-gray-200 rounded-xl text-center font-semibold text-lg bg-gradient-to-r from-gray-50 to-white"
                      min="0"
                    />
                    <button
                      type="button"
                      onClick={() => setBufferAfter(bufferAfter + 5)}
                      className="rounded-full p-3 text-white shadow-md transition-all duration-200 hover:opacity-95 hover:shadow-lg"
                      style={{ backgroundColor: "var(--blue)" }}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border-2 border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Booking limits</h3>
              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-800">Maximum bookings per day</label>
                <input
                  type="number"
                  value={maxBookingsPerDay ?? ''}
                  onChange={(e) => setMaxBookingsPerDay(e.target.value ? parseInt(e.target.value) : null)}
                  className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 shadow-sm transition-all duration-200 focus:border-[color:var(--blue)] focus:ring-2 focus:ring-[color:var(--blue-glow)]"
                  placeholder="No limit"
                  min="1"
                />
              </div>
            </div>
          </div>
        );
      case 'booking-options':
        return (
          <div className="space-y-6">
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "var(--blue-lite)",
                borderColor: "var(--line-strong)",
              }}
            >
              <div className="mb-2 flex items-center space-x-2">
                <Users className="h-5 w-5" style={{ color: "var(--blue)" }} />
                <h3 className="font-semibold" style={{ color: "var(--ink)" }}>
                  Booking Experience
                </h3>
              </div>
              <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
                Customize how invitees book your events
              </p>
            </div>
            <div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-4 px-5 bg-white rounded-xl border-2 border-gray-100 shadow-sm">
                  <div>
                    <h4 className="font-semibold text-gray-900">Allow guests</h4>
                    <p className="text-sm text-gray-600">Let invitees add guests to the meeting</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={allowGuests}
                      onChange={(e) => setAllowGuests(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[color:var(--blue-glow)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[color:var(--blue)] shadow-lg"></div>
                  </label>
                </div>
                <div className="py-4 px-5 bg-white rounded-xl border-2 border-gray-100 shadow-sm">
                  <h4 className="font-semibold mb-3 text-gray-900">Time zone display</h4>
                  <select
                    value={timeZoneDisplay}
                    onChange={(e) => setTimeZoneDisplay(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[color:var(--blue)] focus:border-[color:var(--blue)] transition-all duration-200 bg-white shadow-sm"
                  >
                    <option value="auto-detect">Auto-detect invitee time zone</option>
                    <option value="use-mine">Use my time zone</option>
                    <option value="let-choose">Let invitee choose</option>
                  </select>
                </div>
                <div className="py-4 px-5 bg-white rounded-xl border-2 border-gray-100 shadow-sm">
                  <h4 className="font-semibold mb-3 text-gray-900">Time slot intervals</h4>
                  <select
                    value={timeSlotInterval}
                    onChange={(e) => setTimeSlotInterval(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[color:var(--blue)] focus:border-[color:var(--blue)] transition-all duration-200 bg-white shadow-sm"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">60 minutes</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

       case 'invitee-form':
        return (
          <div className="space-y-6">
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "var(--blue-lite)",
                borderColor: "var(--line-strong)",
              }}
            >
              <div className="mb-2 flex items-center space-x-2">
                <FileText className="h-5 w-5" style={{ color: "var(--blue)" }} />
                <h3 className="font-semibold" style={{ color: "var(--ink)" }}>
                  Invitee Form
                </h3>
              </div>
              <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
                Collect the information you need
              </p>
            </div>
            <div
              className="rounded-xl border-2 p-5"
              style={{
                backgroundColor: "var(--blue-lite)",
                borderColor: "var(--line-strong)",
              }}
            >
              <p className="flex items-center text-sm" style={{ color: "var(--ink-mid)" }}>
                <CheckCircle className="mr-2 h-4 w-4" style={{ color: "var(--blue)" }} />
                Name and email are always collected. Add custom questions below.
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">Custom questions</h4>
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: "var(--blue-ghost)",
                    color: "var(--blue-deep)",
                  }}
                >
                  {questions.length} question{questions.length !== 1 ? 's' : ''}
                </span>
              </div>
              {errors.questions && <p className="mb-4 text-sm text-red-600">{errors.questions}</p>}
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <div key={question.id} className="border-2 border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="rounded-full px-3 py-1 text-sm font-semibold"
                        style={{
                          backgroundColor: "var(--blue-ghost)",
                          color: "var(--blue-deep)",
                        }}
                      >
                        Question {index + 1}
                      </span>
                      {questions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeQuestion(question.id)}
                          className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-full p-2 transition-all duration-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <input
                          type="text"
                          value={question.question}
                          onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                          className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 shadow-sm transition-all duration-200 focus:border-[color:var(--blue)] focus:ring-2 focus:ring-[color:var(--blue-glow)]"
                          placeholder="Enter your question"
                        />
                        {errors[`question_${question.id}`] && (
                          <p className="mt-1 text-sm text-red-600">{errors[`question_${question.id}`]}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-4">
                        <select
                          value={question.type}
                          onChange={(e) => updateQuestion(question.id, 'type', e.target.value as Question['type'])}
                          className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 shadow-sm transition-all duration-200 focus:border-[color:var(--blue)] focus:ring-2 focus:ring-[color:var(--blue-glow)]"
                        >
                          <option value="text">Text</option>
                          <option value="textarea">Long text</option>
                          <option value="select">Dropdown</option>
                          <option value="radio">Radio buttons</option>
                          <option value="checkbox">Checkboxes</option>
                        </select>
                        <label className="flex items-center space-x-2 bg-gray-50 px-4 py-3 rounded-xl">
                          <input
                            type="checkbox"
                            checked={question.required}
                            onChange={(e) => updateQuestion(question.id, 'required', e.target.checked)}
                            className="rounded focus:ring-[color:var(--blue)]"
                            style={{ accentColor: "var(--blue)" }}
                          />
                          <span className="text-sm font-medium text-gray-700">Required</span>
                        </label>
                      </div>

                      {/* Options section for select, radio, and checkbox types */}
                      {['select', 'radio', 'checkbox'].includes(question.type) && (
                        <div
                          className="rounded-xl border-2 p-4"
                          style={{
                            backgroundColor: "var(--blue-lite)",
                            borderColor: "var(--line-strong)",
                          }}
                        >
                          <div className="mb-3 flex items-center justify-between">
                            <h5 className="font-semibold" style={{ color: "var(--ink)" }}>
                              Answer Options
                            </h5>
                            <button
                              type="button"
                              onClick={() => addQuestionOption(question.id)}
                              className="flex items-center space-x-1 rounded-lg px-3 py-1 text-sm text-white transition-colors hover:opacity-95"
                              style={{ backgroundColor: "var(--blue)" }}
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add Option</span>
                            </button>
                          </div>
                          {errors[`question_options_${question.id}`] && (
                            <p className="mb-3 text-sm text-red-600">{errors[`question_options_${question.id}`]}</p>
                          )}
                          <div className="space-y-2">
                            {question.options.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex items-center space-x-2">
                                <span
                                  className="w-8 text-center text-sm font-medium"
                                  style={{ color: "var(--ink-soft)" }}
                                >
                                  {optionIndex + 1}.
                                </span>
                                <input
                                  type="text"
                                  value={option}
                                  onChange={(e) => updateQuestionOption(question.id, optionIndex, e.target.value)}
                                  className="flex-1 rounded-lg border-2 border-gray-200 bg-white px-3 py-2 transition-all duration-200 focus:border-[color:var(--blue)] focus:ring-2 focus:ring-[color:var(--blue-glow)]"
                                  placeholder={`Option ${optionIndex + 1}`}
                                />
                                {question.options.length > 3 && (
                                  <button
                                    type="button"
                                    onClick={() => removeQuestionOption(question.id, optionIndex)}
                                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                          {question.options.length < 10 && (
                            <div className="mt-3 text-center">
                              <p className="text-xs" style={{ color: "var(--blue)" }}>
                                You can add up to 10 options. Currently have {question.options.length} option{question.options.length !== 1 ? 's' : ''}.
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addQuestion}
                  className="group flex w-full items-center justify-center space-x-2 rounded-xl border-2 border-dashed p-6 transition-all duration-200 hover:bg-[var(--surface-2)]"
                  style={{
                    borderColor: "var(--line-strong)",
                    color: "var(--blue)",
                  }}
                >
                  <Plus className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">Add question</span>
                </button>
              </div>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "var(--blue-lite)",
                borderColor: "var(--line-strong)",
              }}
            >
              <div className="mb-2 flex items-center space-x-2">
                <Bell className="h-5 w-5" style={{ color: "var(--blue)" }} />
                <h3 className="font-semibold" style={{ color: "var(--ink)" }}>
                  Smart Notifications
                </h3>
              </div>
              <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
                Keep everyone in the loop
              </p>
            </div>
            <div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-4 px-5 bg-white rounded-xl border-2 border-gray-100 shadow-sm">
                  <div>
                    <h4 className="font-semibold text-gray-900">Email confirmation to invitee</h4>
                    <p className="text-sm text-gray-600">Send booking confirmation email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailConfirmation}
                      onChange={(e) => setEmailConfirmation(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="peer h-7 w-14 rounded-full bg-gray-200 shadow-lg after:absolute after:left-[2px] after:top-[2px] after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[color:var(--blue)] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[color:var(--blue-glow)]"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between py-4 px-5 bg-white rounded-xl border-2 border-gray-100 shadow-sm">
                  <div>
                    <h4 className="font-semibold text-gray-900">Email reminder to invitee</h4>
                    <p className="text-sm text-gray-600">Send reminder before the meeting</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailReminder}
                      onChange={(e) => setEmailReminder(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="peer h-7 w-14 rounded-full bg-gray-200 shadow-lg after:absolute after:left-[2px] after:top-[2px] after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[color:var(--blue)] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[color:var(--blue-glow)]"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between py-4 px-5 bg-white rounded-xl border-2 border-gray-100 shadow-sm">
                  <div>
                    <h4 className="font-semibold text-gray-900">Calendar invitation</h4>
                    <p className="text-sm text-gray-600">Add to invitee's calendar</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={calendarInvitation}
                      onChange={(e) => setCalendarInvitation(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="peer h-7 w-14 rounded-full bg-gray-200 shadow-lg after:absolute after:left-[2px] after:top-[2px] after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[color:var(--blue)] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[color:var(--blue-glow)]"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      case 'confirmation':
        return (
          <div className="space-y-6">
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "var(--blue-lite)",
                borderColor: "var(--line-strong)",
              }}
            >
              <div className="mb-2 flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" style={{ color: "var(--blue)" }} />
                <h3 className="font-semibold" style={{ color: "var(--ink)" }}>
                  Confirmation Page
                </h3>
              </div>
              <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
                Create a memorable booking experience
              </p>
            </div>
            <div>
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-xl border-2 border-gray-100 shadow-sm">
                  <label className="block text-sm font-semibold mb-3 text-gray-800">Confirmation message</label>
                  <textarea
                    rows={4}
                    value={confirmationMessage}
                    onChange={(e) => setConfirmationMessage(e.target.value)}
                    className="w-full resize-none rounded-xl border-2 border-gray-200 bg-white px-4 py-3 shadow-sm transition-all duration-200 focus:border-[color:var(--blue)] focus:outline-none focus:ring-2 focus:ring-[color:var(--blue-glow)]"
                    placeholder="Thank you for booking! We look forward to meeting with you."
                  />
                </div>
                <div className="flex items-center justify-between py-4 px-5 bg-white rounded-xl border-2 border-gray-100 shadow-sm">
                  <div>
                    <h4 className="font-semibold text-gray-900">Redirect to external URL</h4>
                    <p className="text-sm text-gray-600">Redirect invitees after booking</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={redirectToUrl}
                      onChange={(e) => setRedirectToUrl(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="peer h-7 w-14 rounded-full bg-gray-200 shadow-lg after:absolute after:left-[2px] after:top-[2px] after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[color:var(--blue)] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[color:var(--blue-glow)]"></div>
                  </label>
                </div>
                {redirectToUrl && (
                  <div className="bg-white p-5 rounded-xl border-2 border-gray-100 shadow-sm">
                    <label className="block text-sm font-semibold mb-3 text-gray-800">
                      Redirect URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      value={redirectUrl}
                      onChange={(e) => setRedirectUrl(e.target.value)}
                      className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 shadow-sm transition-all duration-200 focus:border-[color:var(--blue)] focus:outline-none focus:ring-2 focus:ring-[color:var(--blue-glow)]"
                      placeholder="https://example.com/thank-you"
                    />
                    {errors.redirectUrl && <p className="mt-1 text-sm text-red-600">{errors.redirectUrl}</p>}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-transparent" onClick={onClose}></div>
      <div
        className="flex h-full w-[min(100vw,36rem)] flex-col border-l-4 bg-white shadow-2xl sm:w-[30rem] lg:w-[32rem]"
        style={{ borderLeftColor: "var(--blue)" }}
      >
        <div
          className="flex items-center justify-between border-b-2 border-[var(--line)] p-4.5"
          style={{
            background: `linear-gradient(135deg, var(--blue) 0%, var(--blue-dark) 100%)`,
            boxShadow: "var(--sh-blue)",
          }}
        >
          <div className="flex items-center space-x-3">
            <div className="rounded-full bg-white/20 p-2">
              <Zap className="h-5 w-5 text-white" strokeWidth={2} />
            </div>
            <h2 className="text-xl font-bold text-white">Create Event Type</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="group shrink-0 rounded-full border-2 border-transparent p-2 transition-all duration-200 hover:border-gray-200"
          >
            <X className="h-5 w-5 text-white transition-transform duration-200 group-hover:rotate-90" />
          </button>
        </div>
        <div className="border-b border-[var(--line)] bg-[var(--surface)]">
          <div className="px-2 pb-2 pt-2 sm:px-3 sm:pb-3 sm:pt-3">
            <div className="scrollbar-hide -mx-1 overflow-x-auto overflow-y-hidden px-1">
              <div className="flex min-h-[48px] items-center gap-1.5 pb-1 sm:min-h-[52px] sm:gap-2 sm:pb-0">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  const a = section.accent;
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setActiveSection(section.id)}
                      className={`flex shrink-0 items-center space-x-2 whitespace-nowrap rounded-[var(--r-m)] px-3 py-2.5 text-xs font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-4 sm:py-3 sm:text-sm ${
                        isActive
                          ? `scale-[1.02] text-white ${TAB_ACCENT_ACTIVE_SHADOW[a]} ${TAB_ACCENT_FOCUS[a]}`
                          : `border border-[var(--line-strong)] bg-white text-[var(--ink-mid)] ${TAB_ACCENT_HOVER[a]} ${TAB_ACCENT_FOCUS[a]}`
                      }`}
                      style={
                        isActive
                          ? { backgroundColor: TAB_ACCENT_BG[a] }
                          : undefined
                      }
                    >
                      <span
                        className="inline-flex shrink-0"
                        style={{ color: isActive ? "#fff" : TAB_ACCENT_ICON[a] }}
                      >
                        <Icon className="h-4 w-4" strokeWidth={2} />
                      </span>
                      <span>{section.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex-1 overflow-y-auto p-4 sm:p-6"
          style={{
            background: `linear-gradient(180deg, var(--surface) 0%, #ffffff 40%)`,
          }}
        >
          {renderSectionContent()}
        </div>
        <div className="border-t-2 border-[var(--line)] bg-white p-4 sm:p-6">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-sm border-2 px-6 py-3 font-semibold transition-all duration-200 hover:bg-[var(--surface)]"
              style={{ borderColor: "var(--line-strong)", color: "var(--ink-mid)" }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isPending}
              className={`flex flex-1 items-center justify-center space-x-2 rounded-sm px-6 py-3 font-semibold text-white transition-all duration-200 ${
                isPending
                  ? "cursor-not-allowed opacity-50"
                  : "hover:opacity-[0.96] active:scale-[0.99]"
              }`}
              style={{
                backgroundColor: "var(--blue)",
                boxShadow: "var(--sh-blue)",
              }}
            >
              <Zap className="h-4 w-4" />
              <span>Create Event</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Demo = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div >
      <div >
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex cursor-pointer items-center gap-2 rounded-sm px-4 py-3 font-semibold text-white transition-all duration-200 hover:opacity-[0.96] active:scale-[0.99]"
          style={{
            backgroundColor: "var(--blue)",
            boxShadow: "var(--sh-blue)",
          }}
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          <span>Create Event</span>
        </button>
      </div>
      <EventCreationSidePanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default Demo;



