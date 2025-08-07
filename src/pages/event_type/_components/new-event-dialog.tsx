
// import { JSX, useState } from 'react';
// import {
//   X,
//   Calendar,
//   MapPin,
//   Clock,
//   Shield,
//   Users,
//   FileText,
//   Bell,
//   CheckCircle,
//   Plus,
//   Minus,
//   Info,
//   Sparkles,
//   Zap,
//   Trash2,

// } from 'lucide-react';
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { checkIntegrationQueryFn, CreateEventMutationFn } from "@/lib/api";

// import { toast } from 'sonner';
// import { PROTECTED_ROUTES } from '@/routes/common/routePaths';

// // Enum for video conferencing platforms
// enum VideoConferencingPlatform {
//   GOOGLE_MEET_AND_CALENDAR = 'GOOGLE_MEET_AND_CALENDAR',
//   ZOOM_MEETING = 'ZOOM_MEETING',
//   MICROSOFT_TEAMS = 'MICROSOFT_TEAMS',
// }

// // Types for API functions
// interface CreateEventData {
//   title: string;
//   description: string;
//   accessSpecifier: 'allow_all' | 'block_domains';
//   locationType: VideoConferencingPlatform; 
//   selectedLocationType: string | null;
//   appConnected: boolean;
//   duration: number;
//   bufferBefore: number;
//   bufferAfter: number;
//   maxBookingsPerDay: number | null;
//   allowGuests: boolean;
//   timeZoneDisplay: string;
//   timeSlotInterval: number;
//   blockedDomains: string[];
//   questions: Question[];
//   notifications: {
//     emailConfirmation: boolean;
//     emailReminder: boolean;
//     calendarInvitation: boolean;
//   };
//   confirmationMessage: string;
//   redirectToUrl: boolean;
//   redirectUrl: string | null;
//   createdAt: string;
//   isActive: boolean;
// }





// interface EventCreationSidePanelProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// interface LocationOption {
//   value: string;
//   label: string;
//   logo: string;
//   isAvailable: boolean;
// }

// interface DomainOption {
//   value: string;
//   label: string;
// }

// interface Question {
//   id: number;
//   question: string;
//   type: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox';
//   required: boolean;
//   options: string[];
// }

// interface FormData {
//   title: string;
//   duration: number;
//   description: string;
//   accessSpecifier: 'allow_all' | 'block_domains';
//   locationType: string;
// }

// interface FormErrors {
//   [key: string]: string | null;
// }

// interface Section {
//   id: string;
//   name: string;
//   icon: React.ComponentType<{ className?: string }>;
//   color: string;
// }

// const locationOptions: LocationOption[] = [
//   {
//     value: VideoConferencingPlatform.GOOGLE_MEET_AND_CALENDAR,
//     label: 'Google Meet',
//     logo: 'https://img.icons8.com/?size=100&id=9730&format=png&color=000000',
//     isAvailable: true,
//   },
//   {
//     value: VideoConferencingPlatform.ZOOM_MEETING,
//     label: 'Zoom',
//     logo: 'https://img.icons8.com/?size=100&id=5pu47piHKg1I&format=png&color=000000',
//     isAvailable: true,
//   },
//   {
//     value: VideoConferencingPlatform.MICROSOFT_TEAMS,
//     label: 'Teams',
//     logo: 'https://img.icons8.com/?size=100&id=65231&format=png&color=000000',
//     isAvailable: true,
//   },
// ];

// const commonDomains: DomainOption[] = [
//   { value: '@gmail.com', label: 'Gmail (@gmail.com)' },
//   { value: '@yahoo.com', label: 'Yahoo (@yahoo.com)' },
//   { value: '@outlook.com', label: 'Outlook (@outlook.com)' },
//   { value: '@hotmail.com', label: 'Hotmail (@hotmail.com)' },
//   { value: '@icloud.com', label: 'iCloud (@icloud.com)' },
//   { value: '@aol.com', label: 'AOL (@aol.com)' },
// ];

// const EventCreationSidePanel = ({ isOpen, onClose }: EventCreationSidePanelProps) => {
//   const queryClient = useQueryClient();
//   const { mutate, isPending } = useMutation({
//     mutationFn: CreateEventMutationFn,
//   });

//   const [activeSection, setActiveSection] = useState<string>('basic-info');
//   const [selectedLocationType, setSelectedLocationType] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isChecking, setIsChecking] = useState<boolean>(false);
//   const [appConnected, setAppConnected] = useState<boolean>(false);
//   const [bufferBefore, setBufferBefore] = useState<number>(0);
//   const [bufferAfter, setBufferAfter] = useState<number>(0);
//   const [maxBookingsPerDay, setMaxBookingsPerDay] = useState<number | null>(null);
//   const [allowGuests, setAllowGuests] = useState<boolean>(true);
//   const [timeZoneDisplay, setTimeZoneDisplay] = useState<string>('auto-detect');
//   const [timeSlotInterval, setTimeSlotInterval] = useState<string>('30');
//   const [emailConfirmation, setEmailConfirmation] = useState<boolean>(true);
//   const [emailReminder, setEmailReminder] = useState<boolean>(true);
//   const [calendarInvitation, setCalendarInvitation] = useState<boolean>(true);
//   const [redirectToUrl, setRedirectToUrl] = useState<boolean>(false);
//   const [redirectUrl, setRedirectUrl] = useState<string>('');
//   const [confirmationMessage, setConfirmationMessage] = useState<string>(
//     'Thank you for booking! We look forward to meeting with you.'
//   );
//   const [blockedDomains, setBlockedDomains] = useState<string[]>([]);
//   const [customDomain, setCustomDomain] = useState<string>('');
//   const [questions, setQuestions] = useState<Question[]>([
//     {
//       id: 1,
//       question: 'What is your interest in this meeting?',
//       type: 'text',
//       required: false,
//       options: [],
//     },
//   ]);
//   const [formData, setFormData] = useState<FormData>({
//     title: '',
//     duration: 30,
//     description: '',
//     accessSpecifier: 'allow_all',
//     locationType: '',
//   });
//   const [errors, setErrors] = useState<FormErrors>({});

//   const validateForm = (): boolean => {
//     const newErrors: FormErrors = {};
//     if (!formData.title.trim()) newErrors.title = 'Event name is required';
//     if (!formData.duration || formData.duration < 1) newErrors.duration = 'Duration is required and must be at least 1 minute';
//     if (!formData.locationType) newErrors.locationType = 'Location type is required';
//     if (!formData.description.trim()) newErrors.description = 'Description is required';
//     const hasValidQuestion = questions.some(q => q.question.trim() !== '');
//     if (!hasValidQuestion) newErrors.questions = 'At least one question must be provided';
//     questions.forEach((q, index) => {
//       if (q.required && !q.question.trim()) {
//         newErrors[`question_${q.id}`] = `Question ${index + 1} is marked as required but has no question text`;
//       }
//     });
//     if (customDomain && !customDomain.startsWith('@')) newErrors.customDomain = 'Custom domain must start with @';
//     if (redirectToUrl && !redirectUrl.trim()) newErrors.redirectUrl = 'Redirect URL is required when redirect option is enabled';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (field: keyof FormData, value: string | number): void => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
//   };

//   const sections: Section[] = [
//     { id: 'basic-info', name: 'Event type', icon: Calendar, color: 'bg-purple-500' },
//     { id: 'location', name: 'Location', icon: MapPin, color: 'bg-blue-500' },
//     { id: 'duration', name: 'Duration', icon: Clock, color: 'bg-green-500' },
//     { id: 'buffers', name: 'Limits & buffers', icon: Shield, color: 'bg-orange-500' },
//     { id: 'booking-options', name: 'Booking page options', icon: Users, color: 'bg-pink-500' },
//     { id: 'invitee-form', name: 'Invitee form', icon: FileText, color: 'bg-indigo-500' },
//     { id: 'notifications', name: 'Notifications', icon: Bell, color: 'bg-red-500' },
//     { id: 'confirmation', name: 'Confirmation page', icon: CheckCircle, color: 'bg-teal-500' },
//   ];

//   const handleLocationTypeChange = async (value: string): Promise<void> => {
//     setSelectedLocationType(value);
//     setAppConnected(false);
//     handleInputChange('locationType', value);
//     setError(null);

//     if (value === VideoConferencingPlatform.GOOGLE_MEET_AND_CALENDAR) {
//       setIsChecking(true);
//       try {
//         const { isConnected } = await checkIntegrationQueryFn(value as VideoConferencingPlatform);
//         if (!isConnected) {
//           setError(
//             `Google Meet is not connected. <a href="${PROTECTED_ROUTES.INTEGRATIONS}" target="_blank" class="underline text-blue-600 hover:text-blue-800">Visit the integration page</a> to connect your account.`
//           );
//           return;
//         }
//         setAppConnected(true);
//       } catch (err) {
//         setError('Failed to check Google Meet integration status.');
//         console.error('Integration error:', err);
//       } finally {
//         setIsChecking(false);
//       }
//     } else {
//       setAppConnected(true);
//     }
//   };

//   const addQuestion = (): void => {
//     const newQuestion: Question = {
//       id: Date.now(),
//       question: '',
//       type: 'text',
//       required: false,
//       options: [],
//     };
//     setQuestions([...questions, newQuestion]);
//   };
// const updateQuestionOption = (questionId: number, optionIndex: number, value: string): void => {
//     setQuestions(questions.map(q => {
//       if (q.id === questionId) {
//         const newOptions = [...q.options];
//         newOptions[optionIndex] = value;
//         return { ...q, options: newOptions };
//       }
//       return q;
//     }));
    
//     // Clear related errors when updating options
//     if (errors[`question_options_${questionId}`]) {
//       setErrors(prev => ({ ...prev, [`question_options_${questionId}`]: null }));
//     }
//   };

//   const updateQuestion = (id: number, field: keyof Question, value: string | boolean): void => {
//     setQuestions(questions.map(q => (q.id === id ? { ...q, [field]: value } : q)));
//   };

//   const removeQuestion = (id: number): void => {
//     setQuestions(questions.filter(q => q.id !== id));
//   };

//   const handleDomainToggle = (domain: string): void => {
//     setBlockedDomains(prev =>
//       prev.includes(domain) ? prev.filter(d => d !== domain) : [...prev, domain]
//     );
//   };

//   const addCustomDomain = (): void => {
//     if (customDomain && customDomain.startsWith('@') && !blockedDomains.includes(customDomain)) {
//       setBlockedDomains(prev => [...prev, customDomain]);
//       setCustomDomain('');
//       setErrors(prev => ({ ...prev, customDomain: null }));
//     }
//   };
//     const addQuestionOption = (questionId: number): void => {
//     setQuestions(questions.map(q => {
//       if (q.id === questionId) {
//         return { ...q, options: [...q.options, ''] };
//       }
//       return q;
//     }));
//   };

//   const removeQuestionOption = (questionId: number, optionIndex: number): void => {
//     setQuestions(questions.map(q => {
//       if (q.id === questionId) {
//         const newOptions = q.options.filter((_, index) => index !== optionIndex);
//         return { ...q, options: newOptions };
//       }
//       return q;
//     }));
//   };

//   const removeCustomDomain = (domain: string): void => {
//     setBlockedDomains(prev => prev.filter(d => d !== domain));
//   };

//   const handleSubmit = (): void => {
//     if (!validateForm()) {
//       const errorKeys = Object.keys(errors);
//       if (errorKeys.some(key => ['title', 'description', 'accessSpecifier'].includes(key))) {
//         setActiveSection('basic-info');
//       } else if (errorKeys.includes('locationType')) {
//         setActiveSection('location');
//       } else if (errorKeys.includes('duration')) {
//         setActiveSection('duration');
//       } else if (errorKeys.some(key => key.startsWith('question_') || key === 'questions')) {
//         setActiveSection('invitee-form');
//       } else if (errorKeys.includes('redirectUrl')) {
//         setActiveSection('confirmation');
//       }
//       return;
//     }

//     const eventData: CreateEventData = {
//       title: formData.title,
//       description: formData.description,
//       accessSpecifier: formData.accessSpecifier,
//       locationType: formData.locationType as VideoConferencingPlatform,
//       selectedLocationType,
//       appConnected,
//       duration: formData.duration,
//       bufferBefore,
//       bufferAfter,
//       maxBookingsPerDay: maxBookingsPerDay ? parseInt(maxBookingsPerDay.toString()) : null,
//       allowGuests,
//       timeZoneDisplay,
//       timeSlotInterval: parseInt(timeSlotInterval),
//       blockedDomains,
//       questions: questions.filter(q => q.question.trim() !== ''),
//       notifications: { emailConfirmation, emailReminder, calendarInvitation },
//       confirmationMessage,
//       redirectToUrl,
//       redirectUrl: redirectToUrl ? redirectUrl : null,
//       createdAt: new Date().toISOString(),
//       isActive: true,
//     };

//     mutate(eventData, {
//       onSuccess: () => {
//         console.log("working",eventData);
//         queryClient.invalidateQueries({ queryKey: ['event_list'] });
//         toast.success('Event created successfully');
//         onClose();
//         setFormData({
//           title: '',
//           duration: 30,
//           description: '',
//           accessSpecifier: 'allow_all',
//           locationType: '',
//         });
//         setSelectedLocationType(null);
//         setAppConnected(false);
//         setActiveSection('basic-info');
//       },
//       onError: (error: Error) => {
//         toast.error(error.message || 'Failed to create event');
//         console.error('API Error:', error);
//       },
//     });
//   };

//   if (!isOpen) return null;

//   const renderSectionContent = (): JSX.Element | null => {
//     switch (activeSection) {
//       case 'basic-info':
//         return (
//           <div className="space-y-6">
//             <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
//               <div className="flex items-center space-x-2 mb-2">
//                 <Sparkles className="w-5 h-5 text-purple-600" />
//                 <h3 className="font-semibold text-purple-900">Event Basics</h3>
//               </div>
//               <p className="text-sm text-purple-700">Create your perfect event template</p>
//             </div>
//             <div>
//               <label className="block text-sm font-semibold mb-3 text-gray-800">
//                 Event name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 value={formData.title}
//                 onChange={(e) => handleInputChange('title', e.target.value)}
//                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white shadow-sm"
//                 placeholder="Enter event name"
//               />
//               {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-semibold mb-3 text-gray-800">
//                 Description <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 value={formData.description}
//                 onChange={(e) => handleInputChange('description', e.target.value)}
//                 rows={4}
//                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white shadow-sm resize-none"
//                 placeholder="Tell your invitees what this meeting is about"
//               />
//               {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-semibold mb-3 text-gray-800">Access Control</label>
//               <select
//                 value={formData.accessSpecifier}
//                 onChange={(e) => handleInputChange('accessSpecifier', e.target.value as 'allow_all' | 'block_domains')}
//                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white shadow-sm"
//               >
//                 <option value="allow_all">Allow all email domains to book</option>
//                 <option value="block_domains">Block specific email domains</option>
//               </select>
//             </div>
//             {formData.accessSpecifier === 'block_domains' && (
//               <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-5">
//                 <h4 className="font-semibold text-yellow-900 mb-4 flex items-center">
//                   <Shield className="w-4 h-4 mr-2" />
//                   Block Email Domains
//                 </h4>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-2 text-yellow-800">Common Email Domains</label>
//                     <div className="grid grid-cols-2 gap-2">
//                       {commonDomains.map((domain) => (
//                         <label key={domain.value} className="flex items-center space-x-2 bg-white p-3 rounded-lg border cursor-pointer hover:bg-yellow-50">
//                           <input
//                             type="checkbox"
//                             checked={blockedDomains.includes(domain.value)}
//                             onChange={() => handleDomainToggle(domain.value)}
//                             className="rounded text-yellow-600 focus:ring-yellow-500"
//                           />
//                           <span className="text-sm text-gray-700">{domain.label}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2 text-yellow-800">Add Custom Domain</label>
//                     <div className="flex space-x-2">
//                       <input
//                         type="text"
//                         value={customDomain}
//                         onChange={(e) => setCustomDomain(e.target.value)}
//                         className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
//                         placeholder="@company.com"
//                       />
//                       <button
//                         type="button"
//                         onClick={addCustomDomain}
//                         className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
//                       >
//                         Add
//                       </button>
//                     </div>
//                     {errors.customDomain && <p className="mt-1 text-sm text-red-600">{errors.customDomain}</p>}
//                   </div>
//                   {blockedDomains.length > 0 && (
//                     <div>
//                       <label className="block text-sm font-medium mb-2 text-yellow-800">Blocked Domains</label>
//                       <div className="flex flex-wrap gap-2">
//                         {blockedDomains.map((domain) => (
//                           <span
//                             key={domain}
//                             className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
//                           >
//                             {domain}
//                             <button
//                               type="button"
//                               onClick={() => removeCustomDomain(domain)}
//                               className="ml-2 text-red-600 hover:text-red-800"
//                             >
//                               <X className="w-3 h-3" />
//                             </button>
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         );
//       case 'location':
//         return (
//           <div className="space-y-6">
//             <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100">
//               <div className="flex items-center space-x-2 mb-2">
//                 <MapPin className="w-5 h-5 text-blue-600" />
//                 <h3 className="font-semibold text-blue-900">Meeting Location</h3>
//               </div>
//               <p className="text-sm text-blue-700">Choose where your meeting will take place</p>
//             </div>
//             <div>
//               <label className="block text-sm font-semibold mb-3 text-gray-800">
//                 Location Type <span className="text-red-500">*</span>
//               </label>
//               <div className="space-y-3">
//                 {locationOptions.map((option) => (
//                   <div
//                     key={option.value}
//                     className={`border-2 rounded-xl p-5 cursor-pointer transition-all duration-300 hover:shadow-lg ${
//                       selectedLocationType === option.value
//                         ? appConnected
//                           ? 'border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg transform scale-[1.02]'
//                           : error
//                           ? 'border-red-400 bg-gradient-to-r from-red-50 to-pink-50 shadow-lg'
//                           : 'border-blue-400 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg'
//                         : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
//                     }`}
//                     onClick={() => handleLocationTypeChange(option.value)}
//                   >
//                     <div className="flex items-center space-x-4">
//                       <div className="p-2 bg-white rounded-lg shadow-sm">
//                         <img src={option.logo} alt={option.label} className="w-6 h-6" />
//                       </div>
//                       <div className="flex-1">
//                         <h4 className="font-semibold text-gray-900">{option.label}</h4>
//                         <p className="text-sm text-gray-600">
//                           {option.value === VideoConferencingPlatform.GOOGLE_MEET_AND_CALENDAR
//                             ? 'Google Meet video conference'
//                             : option.value === VideoConferencingPlatform.ZOOM_MEETING
//                             ? 'Zoom video conference'
//                             : 'Microsoft Teams video conference'}
//                         </p>
//                       </div>
//                       {isChecking && selectedLocationType === option.value && (
//                         <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
//                       )}
//                       {appConnected && selectedLocationType === option.value && (
//                         <div className="bg-green-500 rounded-full p-1">
//                           <CheckCircle className="w-5 h-5 text-white" />
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               {error && (
//                 <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl">
//                   <p
//                     className="text-sm text-red-700 flex items-center"
//                     dangerouslySetInnerHTML={{ __html: error }}
//                   />
//                 </div>
//               )}
//               {errors.locationType && <p className="mt-1 text-sm text-red-600">{errors.locationType}</p>}
//             </div>
//           </div>
//         );
//       case 'duration':
//         return (
//           <div className="space-y-6">
//             <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-xl border border-green-100">
//               <div className="flex items-center space-x-2 mb-2">
//                 <Clock className="w-5 h-5 text-green-600" />
//                 <h3 className="font-semibold text-green-900">Event Duration</h3>
//               </div>
//               <p className="text-sm text-green-700">Set the perfect time for your meetings</p>
//             </div>
//             <div>
//               <label className="block text-sm font-semibold mb-3 text-gray-800">
//                 Duration (minutes) <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="number"
//                 value={formData.duration}
//                 onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 0)}
//                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white shadow-sm"
//                 placeholder="30"
//                 min="1"
//               />
//               {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
//             </div>
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-5">
//               <div className="flex items-start space-x-3">
//                 <div className="bg-blue-500 rounded-full p-1 mt-0.5">
//                   <Info className="w-4 h-4 text-white" />
//                 </div>
//                 <div className="text-sm">
//                   <p className="font-semibold text-blue-900 mb-1">Duration affects scheduling</p>
//                   <p className="text-blue-700">This duration will be used to block time on your calendar and determine available time slots.</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       case 'buffers':
//         return (
//           <div className="space-y-6">
//             <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-xl border border-orange-100">
//               <div className="flex items-center space-x-2 mb-2">
//                 <Shield className="w-5 h-5 text-orange-600" />
//                 <h3 className="font-semibold text-orange-900">Smart Buffers</h3>
//               </div>
//               <p className="text-sm text-orange-700">Add breathing room between meetings</p>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-6 text-gray-800">Buffer times</h3>
//               <div className="space-y-6">
//                 <div className="bg-white p-5 rounded-xl border-2 border-gray-100 shadow-sm">
//                   <label className="block text-sm font-semibold mb-3 text-gray-800">Buffer before event (minutes)</label>
//                   <div className="flex items-center space-x-3">
//                     <button
//                       type="button"
//                       onClick={() => setBufferBefore(Math.max(0, bufferBefore - 5))}
//                       className="p-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
//                     >
//                       <Minus className="w-4 h-4" />
//                     </button>
//                     <input
//                       type="number"
//                       value={bufferBefore}
//                       onChange={(e) => setBufferBefore(parseInt(e.target.value) || 0)}
//                       className="w-24 px-3 py-3 border-2 border-gray-200 rounded-xl text-center font-semibold text-lg bg-gradient-to-r from-gray-50 to-white"
//                       min="0"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setBufferBefore(bufferBefore + 5)}
//                       className="p-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:from-green-600 hover:to-teal-600 transition-all duration-200 shadow-md hover:shadow-lg"
//                     >
//                       <Plus className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="bg-white p-5 rounded-xl border-2 border-gray-100 shadow-sm">
//                   <label className="block text-sm font-semibold mb-3 text-gray-800">Buffer after event (minutes)</label>
//                   <div className="flex items-center space-x-3">
//                     <button
//                       type="button"
//                       onClick={() => setBufferAfter(Math.max(0, bufferAfter - 5))}
//                       className="p-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
//                     >
//                       <Minus className="w-4 h-4" />
//                     </button>
//                     <input
//                       type="number"
//                       value={bufferAfter}
//                       onChange={(e) => setBufferAfter(parseInt(e.target.value) || 0)}
//                       className="w-24 px-3 py-3 border-2 border-gray-200 rounded-xl text-center font-semibold text-lg bg-gradient-to-r from-gray-50 to-white"
//                       min="0"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setBufferAfter(bufferAfter + 5)}
//                       className="p-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:from-green-600 hover:to-teal-600 transition-all duration-200 shadow-md hover:shadow-lg"
//                     >
//                       <Plus className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white p-5 rounded-xl border-2 border-gray-100 shadow-sm">
//               <h3 className="text-lg font-semibold mb-4 text-gray-800">Booking limits</h3>
//               <div>
//                 <label className="block text-sm font-semibold mb-3 text-gray-800">Maximum bookings per day</label>
//                 <input
//                   type="number"
//                   value={maxBookingsPerDay ?? ''}
//                   onChange={(e) => setMaxBookingsPerDay(e.target.value ? parseInt(e.target.value) : null)}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white shadow-sm"
//                   placeholder="No limit"
//                   min="1"
//                 />
//               </div>
//             </div>
//           </div>
//         );
//       case 'booking-options':
//         return (
//           <div className="space-y-6">
//             <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl border border-pink-100">
//               <div className="flex items-center space-x-2 mb-2">
//                 <Users className="w-5 h-5 text-pink-600" />
//                 <h3 className="font-semibold text-pink-900">Booking Experience</h3>
//               </div>
//               <p className="text-sm text-pink-700">Customize how invitees book your events</p>
//             </div>
//             <div>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between py-4 px-5 bg-white rounded-xl border-2 border-gray-100 shadow-sm">
//                   <div>
//                     <h4 className="font-semibold text-gray-900">Allow guests</h4>
//                     <p className="text-sm text-gray-600">Let invitees add guests to the meeting</p>
//                   </div>
//                   <label className="relative inline-flex items-center cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={allowGuests}
//                       onChange={(e) => setAllowGuests(e.target.checked)}
//                       className="sr-only peer"
//                     />
//                     <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-pink-500 peer-checked:to-purple-500 shadow-lg"></div>
//                   </label>
//                 </div>
//                 <div className="py-4 px-5 bg-white rounded-xl border-2 border-gray-100 shadow-sm">
//                   <h4 className="font-semibold mb-3 text-gray-900">Time zone display</h4>
//                   <select
//                     value={timeZoneDisplay}
//                     onChange={(e) => setTimeZoneDisplay(e.target.value)}
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 bg-white shadow-sm"
//                   >
//                     <option value="auto-detect">Auto-detect invitee time zone</option>
//                     <option value="use-mine">Use my time zone</option>
//                     <option value="let-choose">Let invitee choose</option>
//                   </select>
//                 </div>
//                 <div className="py-4 px-5 bg-white rounded-xl border-2 border-gray-100 shadow-sm">
//                   <h4 className="font-semibold mb-3 text-gray-900">Time slot intervals</h4>
//                   <select
//                     value={timeSlotInterval}
//                     onChange={(e) => setTimeSlotInterval(e.target.value)}
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 bg-white shadow-sm"
//                   >
//                     <option value="15">15 minutes</option>
//                     <option value="30">30 minutes</option>
//                     <option value="60">60 minutes</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );

//        case 'invitee-form':
//         return (
//           <div className="space-y-6">
//             <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-xl border border-indigo-100">
//               <div className="flex items-center space-x-2 mb-2">
//                 <FileText className="w-5 h-5 text-indigo-600" />
//                 <h3 className="font-semibold text-indigo-900">Invitee Form</h3>
//               </div>
//               <p className="text-sm text-indigo-700">Collect the information you need</p>
//             </div>
//             <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-gray-200 rounded-xl p-5">
//               <p className="text-sm text-gray-700 flex items-center">
//                 <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
//                 Name and email are always collected. Add custom questions below.
//               </p>
//             </div>
//             <div>
//               <div className="flex items-center justify-between mb-4">
//                 <h4 className="font-semibold text-gray-900">Custom questions</h4>
//                 <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
//                   {questions.length} question{questions.length !== 1 ? 's' : ''}
//                 </span>
//               </div>
//               {errors.questions && <p className="mb-4 text-sm text-red-600">{errors.questions}</p>}
//               <div className="space-y-4">
//                 {questions.map((question, index) => (
//                   <div key={question.id} className="border-2 border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all duration-200">
//                     <div className="flex items-center justify-between mb-4">
//                       <span className="font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full text-sm">Question {index + 1}</span>
//                       {questions.length > 1 && (
//                         <button
//                           type="button"
//                           onClick={() => removeQuestion(question.id)}
//                           className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-full p-2 transition-all duration-200"
//                         >
//                           <X className="w-4 h-4" />
//                         </button>
//                       )}
//                     </div>
//                     <div className="space-y-4">
//                       <div>
//                         <input
//                           type="text"
//                           value={question.question}
//                           onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
//                           className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white shadow-sm"
//                           placeholder="Enter your question"
//                         />
//                         {errors[`question_${question.id}`] && (
//                           <p className="mt-1 text-sm text-red-600">{errors[`question_${question.id}`]}</p>
//                         )}
//                       </div>
//                       <div className="flex items-center space-x-4">
//                         <select
//                           value={question.type}
//                           onChange={(e) => updateQuestion(question.id, 'type', e.target.value as Question['type'])}
//                           className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white shadow-sm"
//                         >
//                           <option value="text">Text</option>
//                           <option value="textarea">Long text</option>
//                           <option value="select">Dropdown</option>
//                           <option value="radio">Radio buttons</option>
//                           <option value="checkbox">Checkboxes</option>
//                         </select>
//                         <label className="flex items-center space-x-2 bg-gray-50 px-4 py-3 rounded-xl">
//                           <input
//                             type="checkbox"
//                             checked={question.required}
//                             onChange={(e) => updateQuestion(question.id, 'required', e.target.checked)}
//                             className="rounded text-indigo-600 focus:ring-indigo-500"
//                           />
//                           <span className="text-sm font-medium text-gray-700">Required</span>
//                         </label>
//                       </div>

//                       {/* Options section for select, radio, and checkbox types */}
//                       {['select', 'radio', 'checkbox'].includes(question.type) && (
//                         <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-xl p-4">
//                           <div className="flex items-center justify-between mb-3">
//                             <h5 className="font-semibold text-indigo-900">Answer Options</h5>
//                             <button
//                               type="button"
//                               onClick={() => addQuestionOption(question.id)}
//                               className="flex items-center space-x-1 px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
//                             >
//                               <Plus className="w-3 h-3" />
//                               <span>Add Option</span>
//                             </button>
//                           </div>
//                           {errors[`question_options_${question.id}`] && (
//                             <p className="mb-3 text-sm text-red-600">{errors[`question_options_${question.id}`]}</p>
//                           )}
//                           <div className="space-y-2">
//                             {question.options.map((option, optionIndex) => (
//                               <div key={optionIndex} className="flex items-center space-x-2">
//                                 <span className="text-sm font-medium text-indigo-700 w-8 text-center">
//                                   {optionIndex + 1}.
//                                 </span>
//                                 <input
//                                   type="text"
//                                   value={option}
//                                   onChange={(e) => updateQuestionOption(question.id, optionIndex, e.target.value)}
//                                   className="flex-1 px-3 py-2 border-2 border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white"
//                                   placeholder={`Option ${optionIndex + 1}`}
//                                 />
//                                 {question.options.length > 3 && (
//                                   <button
//                                     type="button"
//                                     onClick={() => removeQuestionOption(question.id, optionIndex)}
//                                     className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
//                                   >
//                                     <Trash2 className="w-4 h-4" />
//                                   </button>
//                                 )}
//                               </div>
//                             ))}
//                           </div>
//                           {question.options.length < 10 && (
//                             <div className="mt-3 text-center">
//                               <p className="text-xs text-indigo-600">
//                                 You can add up to 10 options. Currently have {question.options.length} option{question.options.length !== 1 ? 's' : ''}.
//                               </p>
//                             </div>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={addQuestion}
//                   className="w-full border-2 border-dashed border-indigo-300 rounded-xl p-6 text-indigo-600 hover:border-indigo-400 hover:text-indigo-700 hover:bg-indigo-50 transition-all duration-200 flex items-center justify-center space-x-2 group"
//                 >
//                   <Plus className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
//                   <span className="font-medium">Add question</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         );
//       case 'notifications':
//         return (
//           <div className="space-y-6">
//             <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-xl border border-red-100">
//               <div className="flex items-center space-x-2 mb-2">
//                 <Bell className="w-5 h-5 text-red-600" />
//                 <h3 className="font-semibold text-red-900">Smart Notifications</h3>
//               </div>
//               <p className="text-sm text-red-700">Keep everyone in the loop</p>
//             </div>
//             <div>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between py-4 px-5 bg-white rounded-xl border-2 border-gray-100 shadow-sm">
//                   <div>
//                     <h4 className="font-semibold text-gray-900">Email confirmation to invitee</h4>
//                     <p className="text-sm text-gray-600">Send booking confirmation email</p>
//                   </div>
//                   <label className="relative inline-flex items-center cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={emailConfirmation}
//                       onChange={(e) => setEmailConfirmation(e.target.checked)}
//                       className="sr-only peer"
//                     />
//                     <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-red-500 peer-checked:to-pink-500 shadow-lg"></div>
//                   </label>
//                 </div>
//                 <div className="flex items-center justify-between py-4 px-5 bg-white rounded-xl border-2 border-gray-100 shadow-sm">
//                   <div>
//                     <h4 className="font-semibold text-gray-900">Email reminder to invitee</h4>
//                     <p className="text-sm text-gray-600">Send reminder before the meeting</p>
//                   </div>
//                   <label className="relative inline-flex items-center cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={emailReminder}
//                       onChange={(e) => setEmailReminder(e.target.checked)}
//                       className="sr-only peer"
//                     />
//                     <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-red-500 peer-checked:to-pink-500 shadow-lg"></div>
//                   </label>
//                 </div>
//                 <div className="flex items-center justify-between py-4 px-5 bg-white rounded-xl border-2 border-gray-100 shadow-sm">
//                   <div>
//                     <h4 className="font-semibold text-gray-900">Calendar invitation</h4>
//                     <p className="text-sm text-gray-600">Add to invitee's calendar</p>
//                   </div>
//                   <label className="relative inline-flex items-center cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={calendarInvitation}
//                       onChange={(e) => setCalendarInvitation(e.target.checked)}
//                       className="sr-only peer"
//                     />
//                     <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-red-500 peer-checked:to-pink-500 shadow-lg"></div>
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       case 'confirmation':
//         return (
//           <div className="space-y-6">
//             <div className="bg-gradient-to-r from-teal-50 to-green-50 p-4 rounded-xl border border-teal-100">
//               <div className="flex items-center space-x-2 mb-2">
//                 <CheckCircle className="w-5 h-5 text-teal-600" />
//                 <h3 className="font-semibold text-teal-900">Confirmation Page</h3>
//               </div>
//               <p className="text-sm text-teal-700">Create a memorable booking experience</p>
//             </div>
//             <div>
//               <div className="space-y-6">
//                 <div className="bg-white p-5 rounded-xl border-2 border-gray-100 shadow-sm">
//                   <label className="block text-sm font-semibold mb-3 text-gray-800">Confirmation message</label>
//                   <textarea
//                     rows={4}
//                     value={confirmationMessage}
//                     onChange={(e) => setConfirmationMessage(e.target.value)}
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 bg-white shadow-sm resize-none"
//                     placeholder="Thank you for booking! We look forward to meeting with you."
//                   />
//                 </div>
//                 <div className="flex items-center justify-between py-4 px-5 bg-white rounded-xl border-2 border-gray-100 shadow-sm">
//                   <div>
//                     <h4 className="font-semibold text-gray-900">Redirect to external URL</h4>
//                     <p className="text-sm text-gray-600">Redirect invitees after booking</p>
//                   </div>
//                   <label className="relative inline-flex items-center cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={redirectToUrl}
//                       onChange={(e) => setRedirectToUrl(e.target.checked)}
//                       className="sr-only peer"
//                     />
//                     <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-teal-500 peer-checked:to-green-500 shadow-lg"></div>
//                   </label>
//                 </div>
//                 {redirectToUrl && (
//                   <div className="bg-white p-5 rounded-xl border-2 border-gray-100 shadow-sm">
//                     <label className="block text-sm font-semibold mb-3 text-gray-800">
//                       Redirect URL <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="url"
//                       value={redirectUrl}
//                       onChange={(e) => setRedirectUrl(e.target.value)}
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 bg-white shadow-sm"
//                       placeholder="https://example.com/thank-you"
//                     />
//                     {errors.redirectUrl && <p className="mt-1 text-sm text-red-600">{errors.redirectUrl}</p>}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex">
//       <div className="flex-1 bg-transparent" onClick={onClose}></div>
//       <div className="w-96 bg-gradient-to-b from-white to-gray-50 shadow-2xl flex flex-col h-full border-l-4 border-purple-500">
//         <div className="flex items-center justify-between p-6 border-b-2 border-gray-100 bg-gradient-to-r from-purple-500 to-pink-500">
//           <div className="flex items-center space-x-3">
//             <div className="bg-white bg-opacity-20 rounded-full p-2">
//               <Zap className="w-5 h-5 text-green-500" />
//             </div>
//             <h2 className="text-xl font-bold text-white">Create Event Type</h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-white hover:bg-opacity-20 rounded-xl transition-all duration-200 group"
//           >
//             <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-200" />
//           </button>
//         </div>
//         <div className="border-b border-gray-200 bg-white">
//           <div className="px-4 py-3">
//             <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
//               {sections.map((section) => {
//                 const Icon = section.icon;
//                 const isActive = activeSection === section.id;
//                 return (
//                   <button
//                     key={section.id}
//                     onClick={() => setActiveSection(section.id)}
//                     className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
//                       isActive
//                         ? `${section.color} text-white shadow-lg transform scale-105`
//                         : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:shadow-md'
//                     }`}
//                   >
//                     <Icon className="w-4 h-4" />
//                     <span>{section.name}</span>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//         <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white">
//           {renderSectionContent()}
//         </div>
//         <div className="border-t-2 border-gray-100 p-6 bg-white">
//           <div className="flex space-x-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSubmit}
//               disabled={isPending}
//               className={`flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold flex items-center justify-center space-x-2 ${
//                 isPending ? 'opacity-50 cursor-not-allowed' : 'hover:from-purple-600 hover:to-pink-600'
//               }`}
//             >
//               <Zap className="w-4 h-4" />
//               <span>Create Event</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Demo = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);

//   return (
//     <div >
//       <div >
//         <button
//           onClick={() => setIsOpen(true)}
//           className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
//         >
//           <Plus className="h-4 w-4" />
//           <span>Create Event</span>
//         </button>
//       </div>
//       <EventCreationSidePanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
//     </div>
//   );
// };

// export default Demo;


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
  CheckCircle,
  Plus,
  Minus,
  Info,
  Sparkles,
  Zap,
  Trash2,
} from 'lucide-react';

// Mock functions for demo purposes
const checkIntegrationQueryFn = async (platform: VideoConferencingPlatform) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { isConnected: Math.random() > 0.5 };
};

const CreateEventMutationFn = async (data: CreateEventData) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return data;
};

const toast = {
  success: (message: string) => console.log('Success:', message),
  error: (message: string) => console.log('Error:', message),
};

const PROTECTED_ROUTES = {
  INTEGRATIONS: '/integrations'
};

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

interface Section {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

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
  const [isPending, setIsPending] = useState<boolean>(false);

  const sections: Section[] = [
    { id: 'basic-info', name: 'Event type', icon: Calendar, color: 'bg-purple-500' },
    { id: 'location', name: 'Location', icon: MapPin, color: 'bg-blue-500' },
    { id: 'duration', name: 'Duration', icon: Clock, color: 'bg-green-500' },
    { id: 'buffers', name: 'Limits & buffers', icon: Shield, color: 'bg-orange-500' },
    { id: 'booking-options', name: 'Booking page options', icon: Users, color: 'bg-pink-500' },
    { id: 'invitee-form', name: 'Invitee form', icon: FileText, color: 'bg-indigo-500' },
    { id: 'notifications', name: 'Notifications', icon: Bell, color: 'bg-red-500' },
    { id: 'confirmation', name: 'Confirmation page', icon: CheckCircle, color: 'bg-teal-500' },
  ];

  // Function to check if a section is completed
  // const isSectionCompleted = (sectionId: string): boolean => {
  //   switch (sectionId) {
  //     case 'basic-info':
  //       return !!(formData.title.trim() && formData.description.trim());
  //     case 'location':
  //       return !!(formData.locationType && appConnected);
  //     case 'duration':
  //       return formData.duration > 0;
  //     case 'buffers':
  //       return true; // Always considered complete as it has default values
  //     case 'booking-options':
  //       return true; // Always considered complete as it has default values
  //     case 'invitee-form':
  //       return questions.some(q => q.question.trim() !== '');
  //     case 'notifications':
  //       return true; // Always considered complete as it has default values
  //     case 'confirmation':
  //       return !!confirmationMessage.trim();
  //     default:
  //       return false;
  //   }
  // };
  const isSectionCompleted = (sectionId: string): boolean => {
  switch (sectionId) {
    case 'basic-info':
      return !!(formData.title.trim() && formData.description.trim());
    case 'location':
      return !!(formData.locationType && appConnected);
    case 'duration':
      return formData.duration > 0;
    case 'buffers':
      // Changed from always true to check if buffers have been modified from defaults
      return bufferBefore !== 0 || bufferAfter !== 0 || maxBookingsPerDay !== null;
    case 'booking-options':
      // Changed from always true to check if options have been modified from defaults
      return !allowGuests || timeZoneDisplay !== 'auto-detect' || timeSlotInterval !== '30';
    case 'invitee-form':
      return questions.some(q => q.question.trim() !== '');
    case 'notifications':
      // Changed from always true to check if notifications have been modified from defaults
      return !emailConfirmation || !emailReminder || !calendarInvitation;
    case 'confirmation':
      return !!confirmationMessage.trim() && 
             (!redirectToUrl || (redirectToUrl && redirectUrl.trim() !== ''));
    default:
      return false;
  }
};

  // Calculate progress
  const completedSections = sections.filter(section => isSectionCompleted(section.id)).length;
  const totalSections = sections.length;
  const progressPercentage = (completedSections / totalSections) * 100;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Event name is required';
    if (!formData.duration || formData.duration < 1) newErrors.duration = 'Duration is required and must be at least 1 minute';
    if (!formData.locationType) newErrors.locationType = 'Location type is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
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

  const handleSubmit = async (): Promise<void> => {
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
    };

    setIsPending(true);
    try {
      await CreateEventMutationFn(eventData);
      console.log("working", eventData);
      toast.success('Event created successfully');
      onClose();
      // Reset form
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
    } catch (error: any) {
      toast.error(error.message || 'Failed to create event');
      console.error('API Error:', error);
    } finally {
      setIsPending(false);
    }
  };

  if (!isOpen) return null;

  const renderSectionContent = (): JSX.Element | null => {
    switch (activeSection) {
      case 'basic-info':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-purple-900">Event Basics</h3>
              </div>
              <p className="text-sm text-purple-700">Create your perfect event template</p>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-800">
                Event name <span className="text-red-500">*</span>
              </label>
              <input
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white shadow-sm"
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
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white shadow-sm resize-none"
                placeholder="Tell your invitees what this meeting is about"
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-800">Access Control</label>
              <select
                value={formData.accessSpecifier}
                onChange={(e) => handleInputChange('accessSpecifier', e.target.value as 'allow_all' | 'block_domains')}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white shadow-sm"
              >
                <option value="allow_all">Allow all email domains to book</option>
                <option value="block_domains">Block specific email domains</option>
              </select>
            </div>
            {formData.accessSpecifier === 'block_domains' && (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-5">
                <h4 className="font-semibold text-yellow-900 mb-4 flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Block Email Domains
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-yellow-800">Common Email Domains</label>
                    <div className="grid grid-cols-2 gap-2">
                      {commonDomains.map((domain) => (
                        <label key={domain.value} className="flex items-center space-x-2 bg-white p-3 rounded-lg border cursor-pointer hover:bg-yellow-50">
                          <input
                            type="checkbox"
                            checked={blockedDomains.includes(domain.value)}
                            onChange={() => handleDomainToggle(domain.value)}
                            className="rounded text-yellow-600 focus:ring-yellow-500"
                          />
                          <span className="text-sm text-gray-700">{domain.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-yellow-800">Add Custom Domain</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={customDomain}
                        onChange={(e) => setCustomDomain(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                        placeholder="@company.com"
                      />
                      <button
                        type="button"
                        onClick={addCustomDomain}
                        className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    {errors.customDomain && <p className="mt-1 text-sm text-red-600">{errors.customDomain}</p>}
                  </div>
                  {blockedDomains.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium mb-2 text-yellow-800">Blocked Domains</label>
                      <div className="flex flex-wrap gap-2">
                        {blockedDomains.map((domain) => (
                          <span
                            key={domain}
                            className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                          >
                            {domain}
                            <button
                              type="button"
                              onClick={() => removeCustomDomain(domain)}
                              className="ml-2 text-red-600 hover:text-red-800"
                            >
                              <X className="w-3 h-3" />
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
      case 'location':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-blue-900">Meeting Location</h3>
              </div>
              <p className="text-sm text-blue-700">Choose where your meeting will take place</p>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-800">
                Location Type <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {locationOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`border-2 rounded-xl p-5 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selectedLocationType === option.value
                        ? appConnected
                          ? 'border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg transform scale-[1.02]'
                          : error
                          ? 'border-red-400 bg-gradient-to-r from-red-50 to-pink-50 shadow-lg'
                          : 'border-blue-400 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => handleLocationTypeChange(option.value)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <img src={option.logo} alt={option.label} className="w-6 h-6" />
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
                        <div className="bg-green-500 rounded-full p-1">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {error && (
                <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl">
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
            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-xl border border-green-100">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-green-900">Event Duration</h3>
              </div>
              <p className="text-sm text-green-700">Set the perfect time for your meetings</p>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-800">
                Duration (minutes) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white shadow-sm"
                placeholder="30"
                min="1"
              />
              {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-5">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-500 rounded-full p-1 mt-0.5">
                  <Info className="w-4 h-4 text-white" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-blue-900 mb-1">Duration affects scheduling</p>
                  <p className="text-blue-700">This duration will be used to block time on your calendar and determine available time slots.</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'buffers':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-xl border border-orange-100">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-5 h-5 text-orange-600" />
                <h3 className="font-semibold text-orange-900">Smart Buffers</h3>
              </div>
              <p className="text-sm text-orange-700">Add breathing room between meetings</p>
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
                      className="p-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
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
                      className="p-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:from-green-600 hover:to-teal-600 transition-all duration-200 shadow-md hover:shadow-lg"
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
                      className="p-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
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
                      className="p-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:from-green-600 hover:to-teal-600 transition-all duration-200 shadow-md hover:shadow-lg"
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white shadow-sm"
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
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl border border-pink-100">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-pink-600" />
                <h3 className="font-semibold text-pink-900">Booking Experience</h3>
              </div>
              <p className="text-sm text-pink-700">Customize how invitees book your events</p>
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
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-pink-500 peer-checked:to-purple-500 shadow-lg"></div>
                  </label>
                </div>
                <div className="py-4 px-5 bg-white rounded-xl border-2 border-gray-100 shadow-sm">
                  <h4 className="font-semibold mb-3 text-gray-900">Time zone display</h4>
                  <select
                    value={timeZoneDisplay}
                    onChange={(e) => setTimeZoneDisplay(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 bg-white shadow-sm"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 bg-white shadow-sm"
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
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-xl border border-indigo-100">
              <div className="flex items-center space-x-2 mb-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                <h3 className="font-semibold text-indigo-900">Invitee Form</h3>
              </div>
              <p className="text-sm text-indigo-700">Collect the information you need</p>
            </div>
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-gray-200 rounded-xl p-5">
              <p className="text-sm text-gray-700 flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Name and email are always collected. Add custom questions below.
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">Custom questions</h4>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {questions.length} question{questions.length !== 1 ? 's' : ''}
                </span>
              </div>
              {errors.questions && <p className="mb-4 text-sm text-red-600">{errors.questions}</p>}
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <div key={question.id} className="border-2 border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full text-sm">Question {index + 1}</span>
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
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white shadow-sm"
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
                          className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white shadow-sm"
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
                            className="rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-sm font-medium text-gray-700">Required</span>
                        </label>
                      </div>

                      {/* Options section for select, radio, and checkbox types */}
                      {['select', 'radio', 'checkbox'].includes(question.type) && (
                        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h5 className="font-semibold text-indigo-900">Answer Options</h5>
                            <button
                              type="button"
                              onClick={() => addQuestionOption(question.id)}
                              className="flex items-center space-x-1 px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
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
                                <span className="text-sm font-medium text-indigo-700 w-8 text-center">
                                  {optionIndex + 1}.
                                </span>
                                <input
                                  type="text"
                                  value={option}
                                  onChange={(e) => updateQuestionOption(question.id, optionIndex, e.target.value)}
                                  className="flex-1 px-3 py-2 border-2 border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white"
                                  placeholder={`Option ${optionIndex + 1}`}
                                />
                                {question.options.length > 1 && (
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
                              <p className="text-xs text-indigo-600">
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
                  className="w-full border-2 border-dashed border-indigo-300 rounded-xl p-6 text-indigo-600 hover:border-indigo-400 hover:text-indigo-700 hover:bg-indigo-50 transition-all duration-200 flex items-center justify-center space-x-2 group"
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
            <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-xl border border-red-100">
              <div className="flex items-center space-x-2 mb-2">
                <Bell className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-red-900">Smart Notifications</h3>
              </div>
              <p className="text-sm text-red-700">Keep everyone in the loop</p>
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
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-red-500 peer-checked:to-pink-500 shadow-lg"></div>
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
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-red-500 peer-checked:to-pink-500 shadow-lg"></div>
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
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-red-500 peer-checked:to-pink-500 shadow-lg"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      case 'confirmation':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-teal-50 to-green-50 p-4 rounded-xl border border-teal-100">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-teal-600" />
                <h3 className="font-semibold text-teal-900">Confirmation Page</h3>
              </div>
              <p className="text-sm text-teal-700">Create a memorable booking experience</p>
            </div>
            <div>
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-xl border-2 border-gray-100 shadow-sm">
                  <label className="block text-sm font-semibold mb-3 text-gray-800">Confirmation message</label>
                  <textarea
                    rows={4}
                    value={confirmationMessage}
                    onChange={(e) => setConfirmationMessage(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 bg-white shadow-sm resize-none"
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
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-teal-500 peer-checked:to-green-500 shadow-lg"></div>
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 bg-white shadow-sm"
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
      <div className="w-96 bg-gradient-to-b from-white to-gray-50 shadow-2xl flex flex-col h-full border-l-4 border-purple-500">
        <div className="flex items-center justify-between p-6 border-b-2 border-gray-100 bg-gradient-to-r from-purple-500 to-pink-500">
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 rounded-full p-2">
              <Zap className="w-5 h-5 text-green-500" />
            </div>
            <h2 className="text-xl font-bold text-white">Create Event Type</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-xl transition-all duration-200 group"
          >
            <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </div>

        {/* Progress Indicator */}
        {/* <div className="px-6 py-4 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Setup Progress</span>
            <span className="text-sm font-bold text-blue-600">
              {completedSections}/{totalSections}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Complete all sections to create your event
          </p>
        </div> */}
        <div className="px-6 py-4 bg-white border-b border-gray-200">
  <div className="flex items-center justify-between mb-2">
    <span className="text-sm font-semibold text-gray-700">Setup Progress</span>
    <span className="text-sm font-bold text-blue-600">
      {completedSections}/{totalSections}
    </span>
  </div>
  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
    <div
      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
      style={{ width: `${progressPercentage}%` }}
    />
  </div>
  
  {/* New informational message */}
  <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
    <div className="flex items-start">
      <Info className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
      <p className="text-xs text-blue-700">
        Some sections (Duration, Invitee Form, Confirmation) are pre-filled with default values. 
        Please review and adjust them as needed or keep the defaults.
      </p>
    </div>
  </div>
  
  <p className="text-xs text-gray-500 mt-2">
    Complete all sections to create your event
  </p>
</div>

        <div className="border-b border-gray-200 bg-white">
          <div className="px-4 py-3">
            <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                const isCompleted = isSectionCompleted(section.id);
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 relative ${
                      isActive
                        ? `${section.color} text-white shadow-lg transform scale-105`
                        : isCompleted
                        ? 'text-green-700 bg-green-50 border-2 border-green-200 hover:bg-green-100 shadow-md'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:shadow-md'
                    }`}
                  >
                    {isCompleted && !isActive && (
                      <div className="absolute -top-1 -right-1">
                        <CheckCircle className="w-4 h-4 text-green-500 bg-white rounded-full" />
                      </div>
                    )}
                    <Icon className="w-4 h-4" />
                    <span>{section.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white">
          {renderSectionContent()}
        </div>
        <div className="border-t-2 border-gray-100 p-6 bg-white">
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className={`flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold flex items-center justify-center space-x-2 ${
                isPending ? 'opacity-50 cursor-not-allowed' : 'hover:from-purple-600 hover:to-pink-600'
              }`}
            >
              <Zap className="w-4 h-4" />
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
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Event Creation Demo</h1>
          <p className="text-gray-600 mb-6">Create professional event types with our step-by-step wizard</p>
          <button
            onClick={() => setIsOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 mx-auto hover:from-purple-600 hover:to-pink-600 transform hover:scale-105"
          >
            <Plus className="h-5 w-5" />
            <span className="font-semibold">Create Event Type</span>
          </button>
        </div>
      </div>
      <EventCreationSidePanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default Demo;