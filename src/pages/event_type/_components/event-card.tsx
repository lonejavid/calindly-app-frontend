import { EventType } from "@/types/api.type";
import { ENV } from "@/lib/get-env";
import { toast } from "sonner";
import { Copy, Settings, Edit3, Trash2, Power, X, Clock, Users, FileText, Shield, Calendar } from "lucide-react";
import { FC, useState, useRef, useEffect, type CSSProperties } from "react";

// Simple utility function to combine class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Simple loader component
const Loader: FC<{ size?: 'sm' | 'md'; color?: string }> = ({ size = 'md'}) => (
  <div className={`inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent ${size === 'sm' ? 'h-4 w-4' : 'h-6 w-6'}`}>
    <span className="sr-only">Loading...</span>
  </div>
);

// Simple button component
const Button: FC<{
  children: React.ReactNode;
  variant?: 'ghost' | 'outline' | 'primary';
  size?: 'sm' | 'md';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}> = ({ children, variant = 'outline', size = 'md', className = '', disabled = false, onClick }) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const variants = {
    ghost: 'hover:bg-gray-100',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50',
    primary: 'text-white hover:opacity-95',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-sm rounded-md'
  };
  
  return (
    <button
      type="button"
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      style={
        variant === 'primary'
          ? { backgroundColor: 'var(--blue)', boxShadow: 'var(--sh-blue)' }
          : undefined
      }
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Card: FC<{
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}> = ({ children, className = '', style }) => (
  <div className={`rounded-lg border bg-white shadow-sm ${className}`} style={style}>
    {children}
  </div>
);

const CardContent: FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const CardFooter: FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`flex items-center p-6 pt-0 ${className}`}>
    {children}
  </div>
);

// Input component
const Input: FC<{
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  min?: string;
}> = ({ type = 'text', placeholder, value, onChange, className = '', min }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    min={min}
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
  />
);

// Textarea component
const Textarea: FC<{
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  className?: string;
}> = ({ placeholder, value, onChange, rows = 3, className = '' }) => (
  <textarea
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    rows={rows}
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical ${className}`}
  />
);

// Toggle component
const Toggle: FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}> = ({ checked, onChange, disabled = false }) => (
  <button
    type="button"
    className={cn(
      'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      checked ? 'bg-blue-600' : 'bg-gray-200',
      disabled && 'opacity-50 cursor-not-allowed'
    )}
    onClick={() => !disabled && onChange(!checked)}
    disabled={disabled}
  >
    <span
      className={cn(
        'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
        checked ? 'translate-x-6' : 'translate-x-1'
      )}
    />
  </button>
);

// Edit Event Slider Component
const EditEventSlider: FC<{
  isOpen: boolean;
  onClose: () => void;
  eventData: {
    title: string;
    duration: number;
    description: string;
    location: string;
  };
  onSave: (data: unknown) => void;
}> = ({ isOpen, onClose, eventData, onSave }) => {
  const [formData, setFormData] = useState({
    title: eventData.title,
    duration: eventData.duration,
    description: eventData.description || '',
    location: eventData.location || 'Google Meet',
    bufferTimeBefore: 0,
    bufferTimeAfter: 0,
    maxInviteesPerEvent: 1,
    enableInviteeQuestions: true,
    requireInviteeDetails: true,
    allowRescheduling: true,
    allowCancellation: true,
    confirmationRedirect: '',
    customMessage: ''
  });

  const [activeSection, setActiveSection] = useState('basic');

  const handleInputChange = (field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    toast.success("Event updated successfully!");
    onClose();
  };

  const sections = [
    { id: 'basic', label: 'Basic Info', icon: FileText },
    { id: 'duration', label: 'Duration & Buffers', icon: Clock },
    { id: 'limits', label: 'Limits', icon: Users },
    { id: 'form', label: 'Invite Form', icon: Calendar },
    { id: 'policies', label: 'Policies', icon: Shield }
  ];

  return (
    <>
      {/* Transparent backdrop - keeps content visible but handles clicks */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Slider */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-gray-200",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit Event</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                    activeSection === section.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeSection === 'basic' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Name
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter event name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Add a description for your event..."
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Google Meet">Google Meet</option>
                  <option value="Microsoft Teams">Microsoft Teams</option>
                  <option value="Zoom">Zoom</option>
                  <option value="Phone Call">Phone Call</option>
                  <option value="In Person">In Person</option>
                </select>
              </div>
            </div>
          )}

          {activeSection === 'duration' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes)
                </label>
                <Input
                  type="number"
                  value={formData.duration.toString()}
                  onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 0)}
                  placeholder="30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buffer Time Before (minutes)
                </label>
                <Input
                  type="number"
                  value={formData.bufferTimeBefore.toString()}
                  onChange={(e) => handleInputChange('bufferTimeBefore', parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Time to prepare before the meeting
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buffer Time After (minutes)
                </label>
                <Input
                  type="number"
                  value={formData.bufferTimeAfter.toString()}
                  onChange={(e) => handleInputChange('bufferTimeAfter', parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Time to wrap up after the meeting
                </p>
              </div>
            </div>
          )}

          {activeSection === 'limits' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Invitees Per Event
                </label>
                <Input
                  type="number"
                  value={formData.maxInviteesPerEvent.toString()}
                  onChange={(e) => handleInputChange('maxInviteesPerEvent', parseInt(e.target.value) || 1)}
                  placeholder="1"
                  min="1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Maximum number of people who can book this event
                </p>
              </div>
            </div>
          )}

          {activeSection === 'form' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Enable Invitee Questions
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Ask invitees questions when they book
                  </p>
                </div>
                <Toggle
                  checked={formData.enableInviteeQuestions}
                  onChange={(checked) => handleInputChange('enableInviteeQuestions', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Require Invitee Details
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Require name and email from invitees
                  </p>
                </div>
                <Toggle
                  checked={formData.requireInviteeDetails}
                  onChange={(checked) => handleInputChange('requireInviteeDetails', checked)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Message for Invitees
                </label>
                <Textarea
                  value={formData.customMessage}
                  onChange={(e) => handleInputChange('customMessage', e.target.value)}
                  placeholder="Add a custom message that invitees will see..."
                  rows={3}
                />
              </div>
            </div>
          )}

          {activeSection === 'policies' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Allow Rescheduling
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Let invitees reschedule their appointments
                  </p>
                </div>
                <Toggle
                  checked={formData.allowRescheduling}
                  onChange={(checked) => handleInputChange('allowRescheduling', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Allow Cancellation
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Let invitees cancel their appointments
                  </p>
                </div>
                <Toggle
                  checked={formData.allowCancellation}
                  onChange={(checked) => handleInputChange('allowCancellation', checked)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmation Redirect URL
                </label>
                <Input
                  type="url"
                  value={formData.confirmationRedirect}
                  onChange={(e) => handleInputChange('confirmationRedirect', e.target.value)}
                  placeholder="https://example.com/thank-you"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Redirect invitees to this page after booking
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex gap-3 justify-end">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

interface PropsType {
  id: string;
  title: string;
  slug: string;
  duration: number;
  isPrivate: boolean;
  username: string;
  isPending: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onEdit?: () => void;
  onClone?: () => void;
  event: EventType; 
}

const EventCard: FC<PropsType> = ({
  title,
  duration,
  slug,
  isPrivate = false,
  username,
  isPending,
  onToggle,
  onDelete,
  event,
  onEdit,
  onClone,
  
}) => {
  //  console.log("Received event prop in EventCard:", event); 
  const [isCopied, setIsCopied] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditSliderOpen, setIsEditSliderOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const event_link = `${ENV.VITE_APP_ORIGIN || "http://localhost:3000"}/${username}/${slug}`;

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(event_link)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        toast.success("Event link copied");
      })
      .catch((error) => {
        console.error("Failed to copy link:", error);
      });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDropdownAction = (action: () => void) => {
    action();
    setIsDropdownOpen(false);
  };

  const handleEditClick = () => {
      console.log("Full event object:", event);
    setIsEditSliderOpen(true);
    if (onEdit) onEdit();
  };

  const handleSaveEvent = (formData: unknown) => {
    console.log('Saving event data:', formData);
   
  };

  return (
    <>
      <div>
        <Card
          className={cn(
            `group relative box-border min-h-[220px] w-full !max-w-none !p-0 !ring-0 rounded-[var(--r-s)] border bg-white shadow-[var(--sh-xs)] transition-all duration-300 hover:shadow-[var(--sh-sm)]`,
            isPrivate && "bg-transparent opacity-75"
          )}
          style={{ borderColor: 'var(--line-strong)' }}
        >
          <CardContent className="relative flex flex-col p-0">
            <div
              className={cn(
                'h-1.5 rounded-t-[calc(var(--r-s)-1px)]',
                isPrivate ? 'bg-gray-400' : '',
              )}
              style={
                isPrivate
                  ? undefined
                  : {
                      background: `linear-gradient(90deg, var(--blue) 0%, var(--blue-mid) 100%)`,
                    }
              }
            />

            {/* Settings dropdown in top right */}
            <div className="absolute top-2 right-2 z-20" ref={dropdownRef}>
              <button
                type="button"
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg',
                  isDropdownOpen && 'scale-105 shadow-lg',
                )}
                style={{
                  borderColor: 'var(--line-strong)',
                  ...(isDropdownOpen
                    ? { borderColor: 'var(--blue)', backgroundColor: 'var(--blue-lite)' }
                    : {}),
                }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Settings
                  className="h-5 w-5 text-[var(--ink-soft)]"
                  style={{ color: isDropdownOpen ? 'var(--blue)' : undefined }}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  className="absolute right-0 top-full z-30 mt-2 w-52 rounded-[var(--r-m)] border bg-white py-3 shadow-[var(--sh-md)] animate-in fade-in duration-200"
                  style={{ borderColor: 'var(--line-strong)' }}
                >
                  <button
                    type="button"
                    onClick={() => handleDropdownAction(handleEditClick)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-all duration-150 hover:bg-[var(--blue-lite)]"
                    style={{ color: 'var(--ink)' }}
                  >
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full"
                      style={{ backgroundColor: 'var(--blue-ghost)' }}
                    >
                      <Edit3 className="h-4 w-4" style={{ color: 'var(--blue)' }} />
                    </div>
                    <span className="font-medium">Edit Event</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDropdownAction(onClone || (() => {}))}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-all duration-150 hover:bg-[var(--wa-ghost)] disabled:opacity-50"
                    style={{ color: 'var(--ink)' }}
                    disabled={!onClone}
                  >
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full"
                      style={{ backgroundColor: 'var(--wa-ghost)' }}
                    >
                      <Copy className="h-4 w-4" style={{ color: 'var(--wa-dark)' }} />
                    </div>
                    <span className="font-medium">Clone Event</span>
                  </button>

                  {/* Divider */}
                  <div className="border-t border-gray-100 my-2 mx-3"></div>

                  {/* Toggle On/Off */}
                  <button
                    type="button"
                    onClick={() => handleDropdownAction(onToggle)}
                    className={cn(
                      'flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-all duration-150',
                      isPrivate ? 'hover:bg-[var(--wa-ghost)]' : 'hover:bg-[var(--amber-ghost)]',
                    )}
                    style={{ color: 'var(--ink)' }}
                    disabled={isPending}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      isPrivate ? "bg-green-100" : "bg-orange-100"
                    )}>
                      <Power className={cn(
                        "w-4 h-4",
                        isPrivate ? "text-green-600" : "text-orange-600"
                      )} />
                    </div>
                    <span className="font-medium flex items-center gap-2">
                      Turn {isPrivate ? "On" : "Off"}
                      {isPending && <Loader size="sm" color="gray" />}
                    </span>
                  </button>

                  {/* Divider */}
                  <div className="border-t border-gray-100 my-2 mx-3"></div>

                  {/* Delete Event */}
                  <button
                    type="button"
                    onClick={() => handleDropdownAction(onDelete)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 transition-all duration-150 hover:bg-red-50 hover:text-red-700"
                    disabled={isPending}
                  >
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </div>
                    <span className="font-medium">Delete Event</span>
                  </button>
                </div>
              )}
            </div>

            {/* Event details */}
            <div className="w-full flex flex-col p-[18px_16px] pr-14">
              <h2
                className={cn(
                  'mb-1 text-lg font-semibold',
                  isPrivate ? 'text-gray-500' : '',
                )}
                style={!isPrivate ? { color: 'var(--ink)' } : undefined}
              >
                {title}
              </h2>
              <div className="mb-3 flex items-center gap-2">
                <div
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{
                    background: isPrivate
                      ? '#9ca3af'
                      : `linear-gradient(90deg, var(--blue), var(--blue-mid))`,
                  }}
                />
                <p className="text-sm font-medium text-[var(--ink-soft)]">{duration} minutes</p>
              </div>
              <a
                target="_blank"
                href={event_link}
                rel="noopener noreferrer"
                className={cn(
                  'text-sm underline decoration-1 underline-offset-2 transition-colors duration-200',
                  isPrivate && 'pointer-events-none no-underline opacity-60',
                )}
                style={{ color: 'var(--blue)' }}
              >
                View booking page →
              </a>
            </div>
          </CardContent>

          {/* Footer */}
          <CardFooter
            className="flex h-full items-center justify-between border-t p-3 sm:p-[12px_16px]"
            style={{ borderColor: 'var(--line)', backgroundColor: 'var(--surface)' }}
          >
            <Button
              variant="ghost"
              disabled={isPrivate}
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                isPrivate ? 'cursor-not-allowed text-gray-400' : 'hover:bg-[var(--blue-lite)]',
              )}
              style={!isPrivate ? { color: 'var(--blue)' } : undefined}
              onClick={handleCopyLink}
            >
              <Copy className="w-4 h-4" />
              <span>{isCopied ? "Copied!" : "Copy link"}</span>
            </Button>

            {/* Status indicator */}
            <div className="flex items-center gap-2">
              <div className={cn(
                "w-2 h-2 rounded-full transition-colors duration-200",
                isPrivate ? "bg-gray-400" : "bg-green-500"
              )}></div>
              <span
                className={cn('text-xs font-medium', isPrivate ? 'text-gray-500' : '')}
                style={!isPrivate ? { color: 'var(--wa-dark)' } : undefined}
              >
                {isPrivate ? "Private" : "Public"}
              </span>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Edit Event Slider */}
      <EditEventSlider
        isOpen={isEditSliderOpen}
        onClose={() => setIsEditSliderOpen(false)}
        eventData={{
          title,
          duration,
          description: "A brief description of the event",
          location: "Google Meet"
        }}
        onSave={handleSaveEvent}
      />
    </>
  );
};


export default EventCard; 





