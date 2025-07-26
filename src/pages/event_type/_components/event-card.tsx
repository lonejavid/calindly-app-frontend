// import { Loader } from "@/components/loader";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { ENV } from "@/lib/get-env";
// import { cn } from "@/lib/utils";
// import { CopyIcon } from "lucide-react";
// import { FC, useState } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "sonner";
// import { Trash2 } from "lucide-react"; 

// interface PropsType {
//   id: string;
//   title: string;
//   slug: string;
//   duration: number;
//   isPrivate: boolean;
//   username: string;
//   isPending: boolean;
//   onToggle: () => void;
//   onDelete: () => void; 
// }

// const EventCard: FC<PropsType> = ({
//   title,
//   duration,
//   slug,
//   isPrivate = false,
//   username,
//   isPending,
//   onToggle,
//   onDelete, 
// }) => {
//   const [isCopied, setIsCopied] = useState(false);
//   const event_link = `${ENV.VITE_APP_ORIGIN}/${username}/${slug}`;

//   const handleCopyLink = () => {
//     navigator.clipboard
//       .writeText(event_link)
//       .then(() => {
//         setIsCopied(true);
//         setTimeout(() => setIsCopied(false), 2000);
//         toast.success("Event link copied");
//       })
//       .catch((error) => {
//         console.error("Failed to copy link:", error);
//         console.log("eddited");
//         console.log("added");
//       });
//   };

//   return (
//     <div>
//       <Card
//         className={cn(
//           `!p-0 !ring-0 w-full max-w-[400px]
//         box-border min-h-[220px] border border-[#CCCCCC)] bg-white rounded-[4px]
//         shadow-[0_1px_6px_0_rgb(0_0_0_/_10%)]`,
//           isPrivate && "bg-transparent"
//         )}
//       >
//         <CardContent className="relative flex flex-col p-0">
//           <div
//             className={cn(
//               `bg-[rgb(130,71,245)]
//           h-[6px] -mt-[1px] -mr-[1px] -ml-[1px] rounded-tl-[4px] rounded-tr-[4px]
//           `,
//               isPrivate && "bg-[#B2B2B2]"
//             )}
//           ></div>
//           <div className="flex items-center justify-between p-[12px_16px]">
//             <div>
//                     <Button
//           variant="outline"
//           size="sm"
//           disabled={isPending}
//           onClick={onDelete}
//           className="text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white flex items-center gap-1"
//           title="Delete event"
//         >
//           <Trash2 className="w-4 h-4" />
//           Delete
//         </Button>
//             </div>
//           </div>

//           {/* {Event details} */}
//           <div className="w-full flex flex-col p-[5px_16px_18px_16px]">
//             <h2
//               className={cn(
//                 `text-lg font-normal`,
//                 isPrivate && "text-[rgba(26,26,26,0.61)]"
//               )}
//             >
//               {title}
//             </h2>
//             <p className="text-[#476788]">{duration} minutes</p>
//             <Link
//               target="_blank"
//               to={event_link}
//               rel="noopener noreferrer"
//               className={cn(
//                 `pt-2 text-[#004eba]`,
//                 isPrivate && "pointer-events-none opacity-60"
//               )}
//             >
//               View booking page
//             </Link>
//           </div>
//         </CardContent>
//         <CardFooter
//           className="p-[12px_8px_12px_16px] 
//         border-t border-[#D4E162] h-full flex items-center justify-between"
//         >
//           <Button
//             variant="ghost"
//             disabled={isPrivate}
//             className="flex items-center gap-2 cursor-pointer font-light text-sm text-[rgb(0,105,255)]
//             disabled:text-[rgba(26,26,26,0.61)] disabled:bg-[#e7edf6] disabled:opacity-100
//                       "
//             onClick={handleCopyLink}
//           >
//             <CopyIcon className="w-4 h-4" />
//             <span>{isCopied ? "Copied!" : "Copy link"}</span>
//           </Button>

//           <Button
//             variant="outline"
//             className={cn(
//               "!p-[8px_16px] text-sm font-normal !h-[37px] cursor-pointer disabled:pointer-events-none",
//               isPrivate && "!border-[#445d76] !text-[#0a2540] z-30 "
//             )}
//             disabled={isPending}
//             onClick={onToggle}
//           >
//             {isPending ? (
//               <Loader size="sm" color="black" />
//             ) : (
//               <span>Turn {isPrivate ? "On" : "Off"}</span>
//             )}
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default EventCard;
// Simple utility function to combine class names
// import { Copy, Settings, Edit3, Trash2, Power } from "lucide-react";
// import { FC, useState, useRef, useEffect } from "react";

// // Simple utility function to combine class names
// const cn = (...classes: (string | boolean | undefined)[]) => {
//   return classes.filter(Boolean).join(' ');
// };

// // Simple loader component
// const Loader: FC<{ size?: 'sm' | 'md'; color?: string }> = ({ size = 'md'}) => (
//   <div className={`inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent ${size === 'sm' ? 'h-4 w-4' : 'h-6 w-6'}`}>
//     <span className="sr-only">Loading...</span>
//   </div>
// );

// // Simple button component
// const Button: FC<{
//   children: React.ReactNode;
//   variant?: 'ghost' | 'outline';
//   size?: 'sm' | 'md';
//   className?: string;
//   disabled?: boolean;
//   onClick?: () => void;
// }> = ({ children, variant = 'outline', size = 'md', className = '', disabled = false, onClick }) => {
//   const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
//   const variants = {
//     ghost: 'hover:bg-gray-100',
//     outline: 'border border-gray-300 bg-white hover:bg-gray-50'
//   };
//   const sizes = {
//     sm: 'px-3 py-1.5 text-sm rounded-md',
//     md: 'px-4 py-2 text-sm rounded-md'
//   };
  
//   return (
//     <button
//       className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
//       disabled={disabled}
//       onClick={onClick}
//     >
//       {children}
//     </button>
//   );
// };

// // Simple card components
// const Card: FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
//   <div className={`rounded-lg border bg-white shadow-sm ${className}`}>
//     {children}
//   </div>
// );

// const CardContent: FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
//   <div className={`p-6 ${className}`}>
//     {children}
//   </div>
// );

// const CardFooter: FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
//   <div className={`flex items-center p-6 pt-0 ${className}`}>
//     {children}
//   </div>
// );

// // Simple toast function
// const showToast = (message: string, type: 'success' | 'error' = 'success') => {
//   // Create a simple toast notification
//   const toast = document.createElement('div');
//   toast.className = `fixed top-4 right-4 px-4 py-2 rounded-md text-white z-50 ${
//     type === 'success' ? 'bg-green-500' : 'bg-red-500'
//   }`;
//   toast.textContent = message;
//   document.body.appendChild(toast);
  
//   setTimeout(() => {
//     document.body.removeChild(toast);
//   }, 3000);
// };

// interface PropsType {
//   id: string;
//   title: string;
//   slug: string;
//   duration: number;
//   isPrivate: boolean;
//   username: string;
//   isPending: boolean;
//   onToggle: () => void;
//   onDelete: () => void;
//   onEdit?: () => void;
//   onClone?: () => void;
// }

// const EventCard: FC<PropsType> = ({
//   title,
//   duration,
//   slug,
//   isPrivate = false,
//   username,
//   isPending,
//   onToggle,
//   onDelete,
//   onEdit,
//   onClone,
// }) => {
//   const [isCopied, setIsCopied] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const event_link = `https://www.schedley.com/${username}/${slug}`;

//   const handleCopyLink = () => {
//     navigator.clipboard
//       .writeText(event_link)
//       .then(() => {
//         setIsCopied(true);
//         setTimeout(() => setIsCopied(false), 2000);
//         showToast("Event link copied", "success");
//       })
//       .catch((error) => {
//         console.error("Failed to copy link:", error);
//       });
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleDropdownAction = (action: () => void) => {
//     action();
//     setIsDropdownOpen(false);
//   };

//   return (
//     <div>
//       <Card
//         className={cn(
//           `!p-0 !ring-0 w-full max-w-[400px]
//         box-border min-h-[220px] border border-[#CCCCCC)] bg-white rounded-[4px]
//         shadow-[0_1px_6px_0_rgb(0_0_0_/_10%)] hover:shadow-[0_4px_12px_0_rgb(0_0_0_/_15%)]
//         transition-all duration-300 group relative`,
//           isPrivate && "bg-transparent opacity-75"
//         )}
//       >
//         <CardContent className="relative flex flex-col p-0">
//           {/* Header with colored bar */}
//           <div
//             className={cn(
//               `bg-gradient-to-r from-purple-500 to-pink-500
//           h-[6px] -mt-[1px] -mr-[1px] -ml-[1px] rounded-tl-[4px] rounded-tr-[4px]
//           `,
//               isPrivate && "from-gray-400 to-gray-500"
//             )}
//           ></div>

//           {/* Settings dropdown in top right - HIGHLY VISIBLE */}
//           <div className="absolute top-2 right-2 z-20" ref={dropdownRef}>
//             <button
//               className={cn(
//                 "w-10 h-10 rounded-full bg-white border-2 border-gray-300 shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 hover:border-purple-400 hover:scale-110",
//                 isDropdownOpen && "border-purple-500 shadow-xl scale-110 bg-purple-50"
//               )}
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             >
//               <Settings className="w-5 h-5 text-gray-700 hover:text-purple-600" />
//             </button>

//             {/* Dropdown Menu */}
//             {isDropdownOpen && (
//               <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-200 py-3 z-30 animate-in fade-in duration-200">
//                 {/* Edit Event */}
//                 <button
//                   onClick={() => handleDropdownAction(onEdit || (() => {}))}
//                   className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-3 transition-all duration-150"
//                   disabled={!onEdit}
//                 >
//                   <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
//                     <Edit3 className="w-4 h-4 text-blue-600" />
//                   </div>
//                   <span className="font-medium">Edit Event</span>
//                 </button>

//                 {/* Clone Event */}
//                 <button
//                   onClick={() => handleDropdownAction(onClone || (() => {}))}
//                   className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 flex items-center gap-3 transition-all duration-150"
//                   disabled={!onClone}
//                 >
//                   <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
//                     <Copy className="w-4 h-4 text-green-600" />
//                   </div>
//                   <span className="font-medium">Clone Event</span>
//                 </button>

//                 {/* Divider */}
//                 <div className="border-t border-gray-100 my-2 mx-3"></div>

//                 {/* Toggle On/Off */}
//                 <button
//                   onClick={() => handleDropdownAction(onToggle)}
//                   className={cn(
//                     "w-full px-4 py-3 text-left text-sm text-gray-700 flex items-center gap-3 transition-all duration-150",
//                     isPrivate 
//                       ? "hover:bg-green-50 hover:text-green-700" 
//                       : "hover:bg-orange-50 hover:text-orange-700"
//                   )}
//                   disabled={isPending}
//                 >
//                   <div className={cn(
//                     "w-8 h-8 rounded-full flex items-center justify-center",
//                     isPrivate ? "bg-green-100" : "bg-orange-100"
//                   )}>
//                     <Power className={cn(
//                       "w-4 h-4",
//                       isPrivate ? "text-green-600" : "text-orange-600"
//                     )} />
//                   </div>
//                   <span className="font-medium flex items-center gap-2">
//                     Turn {isPrivate ? "On" : "Off"}
//                     {isPending && <Loader size="sm" color="gray" />}
//                   </span>
//                 </button>

//                 {/* Divider */}
//                 <div className="border-t border-gray-100 my-2 mx-3"></div>

//                 {/* Delete Event */}
//                 <button
//                   onClick={() => handleDropdownAction(onDelete)}
//                   className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center gap-3 transition-all duration-150"
//                   disabled={isPending}
//                 >
//                   <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
//                     <Trash2 className="w-4 h-4 text-red-600" />
//                   </div>
//                   <span className="font-medium">Delete Event</span>
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Event details */}
//           <div className="w-full flex flex-col p-[18px_16px] pr-14">
//             <h2
//               className={cn(
//                 `text-lg font-semibold text-gray-800 mb-1`,
//                 isPrivate && "text-gray-500"
//               )}
//             >
//               {title}
//             </h2>
//             <div className="flex items-center gap-2 mb-3">
//               <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
//               <p className="text-sm text-gray-600 font-medium">{duration} minutes</p>
//             </div>
//             <a
//               target="_blank"
//               href={event_link}
//               rel="noopener noreferrer"
//               className={cn(
//                 `text-sm text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2 transition-colors duration-200`,
//                 isPrivate && "pointer-events-none opacity-60 no-underline"
//               )}
//             >
//               View booking page →
//             </a>
//           </div>
//         </CardContent>

//         {/* Footer */}
//         <CardFooter
//           className="p-[12px_16px] border-t border-gray-100 h-full flex items-center justify-between bg-gray-50/50"
//         >
//           <Button
//             variant="ghost"
//             disabled={isPrivate}
//             className={cn(
//               "flex items-center gap-2 cursor-pointer font-medium text-sm px-3 py-2 rounded-lg transition-all duration-200",
//               isPrivate 
//                 ? "text-gray-400 cursor-not-allowed" 
//                 : "text-blue-600 hover:text-blue-700 hover:bg-blue-50"
//             )}
//             onClick={handleCopyLink}
//           >
//             <Copy className="w-4 h-4" />
//             <span>{isCopied ? "Copied!" : "Copy link"}</span>
//           </Button>

//           {/* Status indicator */}
//           <div className="flex items-center gap-2">
//             <div className={cn(
//               "w-2 h-2 rounded-full transition-colors duration-200",
//               isPrivate ? "bg-gray-400" : "bg-green-500"
//             )}></div>
//             <span className={cn(
//               "text-xs font-medium",
//               isPrivate ? "text-gray-500" : "text-green-600"
//             )}>
//               {isPrivate ? "Private" : "Public"}
//             </span>
//           </div>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default EventCard;
import { Copy, Settings, Edit3, Trash2, Power, X, Clock, Users, FileText, Shield, Calendar } from "lucide-react";
import { FC, useState, useRef, useEffect } from "react";

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
    primary: 'bg-blue-600 text-white hover:bg-blue-700'
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-sm rounded-md'
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Simple card components
const Card: FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`rounded-lg border bg-white shadow-sm ${className}`}>
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

// Simple toast function
const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  const toast = document.createElement('div');
  toast.className = `fixed top-4 right-4 px-4 py-2 rounded-md text-white z-50 ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  }`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    document.body.removeChild(toast);
  }, 3000);
};

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
  onSave: (data: any) => void;
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

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    showToast('Event updated successfully!');
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
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Slider */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out",
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

// DEFINE THE PROPS INTERFACE - THIS IS CRUCIAL
export interface EventCardProps {
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
}

const EventCard: FC<EventCardProps> = ({
  title,
  duration,
  slug,
  isPrivate = false,
  username,
  isPending,
  onToggle,
  onDelete,
  onEdit,
  onClone,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditSliderOpen, setIsEditSliderOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const event_link = `https://www.schedley.com/${username}/${slug}`;

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(event_link)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        showToast("Event link copied", "success");
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
    setIsEditSliderOpen(true);
    if (onEdit) onEdit();
  };

  const handleSaveEvent = (formData: any) => {
    console.log('Saving event data:', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <>
      <div>
        <Card
          className={cn(
            `!p-0 !ring-0 w-full max-w-[400px]
          box-border min-h-[220px] border border-[#CCCCCC)] bg-white rounded-[4px]
          shadow-[0_1px_6px_0_rgb(0_0_0_/_10%)] hover:shadow-[0_4px_12px_0_rgb(0_0_0_/_15%)]
          transition-all duration-300 group relative`,
            isPrivate && "bg-transparent opacity-75"
          )}
        >
          <CardContent className="relative flex flex-col p-0">
            {/* Header with colored bar */}
            <div
              className={cn(
                `bg-gradient-to-r from-purple-500 to-pink-500
            h-[6px] -mt-[1px] -mr-[1px] -ml-[1px] rounded-tl-[4px] rounded-tr-[4px]
            `,
                isPrivate && "from-gray-400 to-gray-500"
              )}
            ></div>

            {/* Settings dropdown in top right */}
            <div className="absolute top-2 right-2 z-20" ref={dropdownRef}>
              <button
                className={cn(
                  "w-10 h-10 rounded-full bg-white border-2 border-gray-300 shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 hover:border-purple-400 hover:scale-110",
                  isDropdownOpen && "border-purple-500 shadow-xl scale-110 bg-purple-50"
                )}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Settings className="w-5 h-5 text-gray-700 hover:text-purple-600" />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-200 py-3 z-30 animate-in fade-in duration-200">
                  {/* Edit Event */}
                  <button
                    onClick={() => handleDropdownAction(handleEditClick)}
                    className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-3 transition-all duration-150"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Edit3 className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="font-medium">Edit Event</span>
                  </button>

                  {/* Clone Event */}
                  <button
                    onClick={() => handleDropdownAction(onClone || (() => {}))}
                    className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 flex items-center gap-3 transition-all duration-150"
                    disabled={!onClone}
                  >
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Copy className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="font-medium">Clone Event</span>
                  </button>

                  {/* Divider */}
                  <div className="border-t border-gray-100 my-2 mx-3"></div>

                  {/* Toggle On/Off */}
                  <button
                    onClick={() => handleDropdownAction(onToggle)}
                    className={cn(
                      "w-full px-4 py-3 text-left text-sm text-gray-700 flex items-center gap-3 transition-all duration-150",
                      isPrivate 
                        ? "hover:bg-green-50 hover:text-green-700" 
                        : "hover:bg-orange-50 hover:text-orange-700"
                    )}
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
                    onClick={() => handleDropdownAction(onDelete)}
                    className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center gap-3 transition-all duration-150"
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
                  `text-lg font-semibold text-gray-800 mb-1`,
                  isPrivate && "text-gray-500"
                )}
              >
                {title}
              </h2>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <p className="text-sm text-gray-600 font-medium">{duration} minutes</p>
              </div>
              <a
                target="_blank"
                href={event_link}
                rel="noopener noreferrer"
                className={cn(
                  `text-sm text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2 transition-colors duration-200`,
                  isPrivate && "pointer-events-none opacity-60 no-underline"
                )}
              >
                View booking page →
              </a>
            </div>
          </CardContent>

          {/* Footer */}
          <CardFooter
            className="p-[12px_16px] border-t border-gray-100 h-full flex items-center justify-between bg-gray-50/50"
          >
            <Button
              variant="ghost"
              disabled={isPrivate}
              className={cn(
                "flex items-center gap-2 cursor-pointer font-medium text-sm px-3 py-2 rounded-lg transition-all duration-200",
                isPrivate 
                  ? "text-gray-400 cursor-not-allowed" 
                  : "text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              )}
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
              <span className={cn(
                "text-xs font-medium",
                isPrivate ? "text-gray-500" : "text-green-600"
              )}>
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