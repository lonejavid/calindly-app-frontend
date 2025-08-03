import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import PageContainer from "./_components/page-container";
import { getSinglePublicEventBySlugQueryFn, scheduleMeetingMutationFn } from "@/lib/api";
import { ErrorAlert } from "@/components/ErrorAlert";
import { Loader } from "@/components/loader";
import { 
  Clock, 
  Calendar, 
  ChevronLeft, 
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isToday, 
  startOfWeek, 
  endOfWeek,
  addMinutes,
} from 'date-fns';
import { toast } from "sonner";

const UserSingleEventPage = () => {
  const param = useParams();
  const username = param.username as string;
  const slug = param.slug as string;

  const { mutate, isPending } = useMutation({
    mutationFn: scheduleMeetingMutationFn,
  });

  // Local state for calendar and form
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: [],
    answers: {}
  });
  const [errors, setErrors] = useState({});
  const [showGuests, setShowGuests] = useState(false);

  const { data, isFetching, isLoading, isError, error } = useQuery({
    queryKey: ["public_single_event"],
    queryFn: () =>
      getSinglePublicEventBySlugQueryFn({
        username,
        slug,
      }),
  });

  const event = data?.event;
  console.log("event data is", event);

  // Generate time slots based on event configuration
  const generateTimeSlots = () => {
    if (!event) return [];
    const slots = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM
    const interval = event.timeSlotInterval || 30; // minutes

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = format(new Date(2000, 0, 1, hour, minute), 'h:mma');
        slots.push({ time, display: displayTime });
      }
    }
    return slots;
  };

  // Extract domain from email
  const getEmailDomain = (email: string) => {
    const match = email.match(/@(.+)$/);
    return match ? match[1].toLowerCase() : '';
  };

  // Check if domain is blocked
  const isDomainBlocked = (email: string) => {
    if (!event?.blockedDomains) return false;
    const domain = getEmailDomain(email);
    return event.blockedDomains.some((blocked: string) => 
      domain === blocked.toLowerCase() || 
      domain.endsWith('.' + blocked.toLowerCase())
    );
  };

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear errors when user starts typing


    // Validate email domain in real-time
    if (field === 'email' && value) {
      if (isDomainBlocked(value)) {
        setErrors(prev => ({
          ...prev,
          email: `This domain is not allowed. Please use a different email address.`
        }));
      }
    }
  };

  // Handle question answers
  const handleQuestionAnswer = (questionId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: value
      }
    }));


  };

  // Validate form
  const validateForm = () => {
    if (!selectedDay || !selectedTimeSlot) {
      alert('Please select a date and time first');
      return false;
    }

    const newErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    } else if (isDomainBlocked(formData.email)) {
      newErrors.email = 'This domain is not allowed. Please use a different email address.';
    }

    // Validate required questions
    if (event?.questions) {
      event.questions.forEach((question: { required: boolean; id: string | number; question: string; }) => {
        if (question.required) {
          const answer = formData.answers[question.id];
          if (!answer || !answer.toString().trim()) {
            newErrors[`question_${question.id}`] = `${question.question} is required`;
          }
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (!event?.id || !selectedTimeSlot || !selectedDay) {
      toast.error("Missing required data for booking");
      return;
    }

    try {
      // Create the start date/time by combining selected date and time
      const [hours, minutes] = selectedTimeSlot.time.split(':').map(Number);
      const startDateTime = new Date(selectedDay);
      startDateTime.setHours(hours, minutes, 0, 0);
      
      // Calculate end time
      const endDateTime = addMinutes(startDateTime, event.duration || 30);

      // Prepare payload for API
      const payload = {
        eventId: event.id,
        guestName: formData.name,
        guestEmail: formData.email,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        guests: formData.guests,
        answers: formData.answers,
        // Additional fields that might be needed
        duration: event.duration || 30,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };

      console.log("Booking payload:", payload);

      // Submit the booking
      mutate(payload, {
        onSuccess: (response) => {
          console.log("Booking successful:", response);
          toast.success("Meeting scheduled successfully!");
          
          // You can redirect or show success message here
          if (response?.data?.meetLink) {
            console.log("Meeting link:", response.data.meetLink);
            // Optionally redirect to success page or show meeting link
          }
          
          // Reset form
          setFormData({
            name: '',
            email: '',
            guests: [],
            answers: {}
          });
          setSelectedDay(null);
          setSelectedTimeSlot(null);
          setShowForm(false);
        },
        onError: (error: any) => {
          console.error("Booking failed:", error);
          toast.error(error?.message || "Failed to schedule event. Please try again.");
        },
      });
    } catch (error) {
      console.error("Error preparing booking data:", error);
      toast.error("An error occurred while preparing your booking. Please try again.");
    }
  };

  // Handle back to calendar
  const handleBackToCalendar = () => {
    setShowForm(false);
    setSelectedTimeSlot(null);
  };

  const timeSlots = generateTimeSlots();

  // Get calendar days
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  
  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd
  });

  // Navigation handlers
  const goToPreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Day selection handler
  const handleDayClick = (day) => {
    if (!isSameMonth(day, currentMonth) || day < new Date()) {
      return; // Don't allow selection of past dates or dates from other months
    }
    setSelectedDay(day);
    setSelectedTimeSlot(null); // Reset time selection when date changes
    setShowForm(false); // Hide form when date changes
  };

  // Time slot selection handler
  const handleTimeSlotClick = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    // Automatically show form when time slot is selected
    setShowForm(true);
  };

  // Check if day is selectable
  const isDaySelectable = (day) => {
    return isSameMonth(day, currentMonth) && day >= new Date().setHours(0, 0, 0, 0);
  };

  // Check if day is selected
  const isDaySelected = (day) => {
    return selectedDay && day.toDateString() === selectedDay.toDateString();
  };

  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  if (isLoading || isFetching) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      </PageContainer>
    );
  }

  if (isError) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-screen">
          <ErrorAlert error={error} />
        </div>
      </PageContainer>
    );
  }

  if (!event) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900">Event not found</h2>
            <p className="text-gray-600 mt-2">The event you're looking for doesn't exist.</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-gray-600">Menu</div>
          <div className="text-sm text-gray-600">
            Powered by <span className="text-blue-600 font-medium">Schedley</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Event Details (1/3 width) */}
          <div className="space-y-6">
            {/* Event Details Card */}
            <div className="bg-white rounded-lg border p-6">
              <div className="text-sm text-gray-600 mb-2">{event.user.name}</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-6">{event.title}</h1>
              
              <div className="flex items-center space-x-2 text-gray-700 mb-6">
                <Clock className="w-5 h-5 text-gray-600" />
                <span>{event.duration} min</span>
              </div>
              
              {event.description && (
                <p className="text-gray-700 leading-relaxed">{event.description}</p>
              )}
            </div>
          </div>

          {/* Right Column - Booking Interface (2/3 width) */}
          <div className="bg-white rounded-lg shadow-lg border relative lg:col-span-2">
            {/* "Powered by Calendly" ribbon */}
            <div className="absolute top-0 right-0">
              <div className="bg-gray-600 text-white text-xs px-3 py-1 transform rotate-45 translate-x-6 translate-y-2">
                Calendly
              </div>
            </div>
            
            <div className="p-6">
              {!showForm ? (
                /* Calendar and Time Selection View */
                <>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Select a Date & Time
                  </h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Calendar Section */}
                    <div>
                      {/* Calendar Header */}
                      <div className="flex items-center justify-between mb-4">
                        <button
                          onClick={goToPreviousMonth}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        
                        <h3 className="text-lg font-semibold text-gray-900">
                          {format(currentMonth, 'MMMM yyyy')}
                        </h3>
                        
                        <button
                          onClick={goToNextMonth}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <ChevronRight className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>

                      {/* Calendar Grid */}
                      <div className="grid grid-cols-7 gap-1 mb-4">
                        {/* Week day headers */}
                        {weekDays.map((day) => (
                          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                            {day}
                          </div>
                        ))}
                        
                        {/* Calendar days */}
                        {calendarDays.map((day, index) => {
                          const isSelectable = isDaySelectable(day);
                          const isSelected = isDaySelected(day);
                          const isCurrentMonth = isSameMonth(day, currentMonth);
                          const isTodayDate = isToday(day);
                          
                          return (
                            <button
                              key={index}
                              onClick={() => handleDayClick(day)}
                              disabled={!isSelectable}
                              className={`
                                h-10 w-10 rounded-full text-sm font-medium transition-colors
                                ${isSelected 
                                  ? 'bg-blue-600 text-white' 
                                  : isSelectable 
                                    ? 'hover:bg-blue-50 hover:text-blue-600 text-gray-900'
                                    : 'text-gray-400 cursor-not-allowed'
                                }
                                ${!isCurrentMonth ? 'text-gray-300' : ''}
                                ${isTodayDate && !isSelected ? 'bg-gray-100' : ''}
                              `}
                            >
                              {format(day, 'd')}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time Slots Section */}
                    <div>
                      {selectedDay ? (
                        <div>
                          <h4 className="text-base font-medium text-gray-900 mb-3">
                            {format(selectedDay, 'EEEE, MMMM d')}
                          </h4>
                          
                          {/* Time Slots */}
                          <div className="space-y-2 max-h-80 overflow-y-auto">
                            {timeSlots.map((slot, index) => (
                              <button
                                key={index}
                                onClick={() => handleTimeSlotClick(slot)}
                                className={`
                                  w-full p-3 text-sm font-medium rounded border transition-colors text-center
                                  ${selectedTimeSlot?.time === slot.time
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
                                  }
                                `}
                              >
                                {slot.display}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center text-gray-500 mt-8">
                          <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                          <p>Please select a date to see available times</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Time zone */}
                  <div className="mt-6 text-sm">
                    <div className="text-gray-600 font-medium mb-1">Time zone</div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span className="text-gray-700">India Standard Time (1:50pm) ▼</span>
                    </div>
                  </div>

                  {/* Troubleshoot */}
                  <div className="flex items-center justify-center mt-6">
                    <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-full px-4 py-2">
                      <span>🔧</span>
                      <span>Troubleshoot</span>
                    </button>
                  </div>
                </>
              ) : (
                /* Form View */
                <>
                  {/* Back Button */}
                  <div className="flex items-center mb-6">
                    <button
                      onClick={handleBackToCalendar}
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span className="text-sm font-medium">Back</span>
                    </button>
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Enter Details
                  </h2>

                  {/* Selected Date and Time Display */}
                  {selectedDay && selectedTimeSlot && (
                    <div className="bg-blue-50 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-2 text-blue-800">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {format(selectedDay, 'EEEE, MMMM d, yyyy')} at {selectedTimeSlot.display}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.name ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder=""
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.email ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder=""
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>

                    {/* Add Guests Button */}
                    {event.allowGuests && (
                      <div>
                        <button
                          type="button"
                          onClick={() => setShowGuests(!showGuests)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Add Guests
                        </button>
                      </div>
                    )}

                    {/* Dynamic Questions */}
                    {event.questions?.map((question, index) => (
                      <div key={question.id}>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          {question.question} {question.required && '*'}
                        </label>
                        
                        {question.type === 'text' && (
                          <textarea
                            value={formData.answers[question.id] || ''}
                            onChange={(e) => handleQuestionAnswer(question.id, e.target.value)}
                            className={`w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                              errors[`question_${question.id}`] ? 'border-red-300' : 'border-gray-300'
                            }`}
                            rows={3}
                            placeholder=""
                          />
                        )}

                        {question.type === 'select' && (
                          <select
                            value={formData.answers[question.id] || ''}
                            onChange={(e) => handleQuestionAnswer(question.id, e.target.value)}
                            className={`w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors[`question_${question.id}`] ? 'border-red-300' : 'border-gray-300'
                            }`}
                          >
                            <option value="">Select an option</option>
                            {question.options?.map((option, optIndex) => (
                              <option key={optIndex} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        )}

                        {errors[`question_${question.id}`] && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors[`question_${question.id}`]}
                          </p>
                        )}
                      </div>
                    ))}

                    {/* Terms and Privacy */}
                    <div className="text-sm text-gray-600">
                      By proceeding, you confirm that you have read and agree to{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-800">
                        Calendly's Terms of Use
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-800">
                        Privacy Notice
                      </a>
                      .
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      {isPending ? 'Scheduling...' : 'Schedule Event'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-800">Cookie settings</a>
              <a href="#" className="hover:text-gray-800">Report abuse</a>
            </div>
            <div className="text-sm text-gray-600">
              Powered by <span className="text-blue-600 font-medium">Schedley</span>
            </div>
          </div>
          <div className="text-center mt-6">
            <div className="text-sm text-gray-600">
              Create your own booking page with{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                Schedley
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default UserSingleEventPage;



