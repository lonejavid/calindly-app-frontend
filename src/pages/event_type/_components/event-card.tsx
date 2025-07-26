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
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Simple loader component
const Loader: FC<{ size?: 'sm' | 'md'; color?: string }> = ({ size = 'md' }) => (
  <div className={`inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent ${size === 'sm' ? 'h-4 w-4' : 'h-6 w-6'}`}>
    <span className="sr-only">Loading...</span>
  </div>
);

// Simple button component
const Button: FC<{
  children: React.ReactNode;
  variant?: 'ghost' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}> = ({ children, variant = 'outline', size = 'md', className = '', disabled = false, onClick }) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const variants = {
    ghost: 'hover:bg-gray-100',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50'
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

// Simple toast function
const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  // Create a simple toast notification
  const toast = document.createElement('div');
  toast.className = `fixed top-4 right-4 px-4 py-2 rounded-md text-white z-50 ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  }`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    document.body.removeChild(toast);
  }, 3000);
};import { Copy,  Edit3, Trash2, Power, MoreVertical } from "lucide-react";
import { FC, useState, useRef, useEffect } from "react";

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
  onEdit,
  onClone,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  return (
    <div>
      <Card
        className={cn(
          `!p-0 !ring-0 w-full max-w-[400px]
        box-border min-h-[220px] border border-[#CCCCCC)] bg-white rounded-[4px]
        shadow-[0_1px_6px_0_rgb(0_0_0_/_10%)] hover:shadow-[0_4px_12px_0_rgb(0_0_0_/_15%)]
        transition-all duration-300 group`,
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
          <div className="absolute top-3 right-3 z-10" ref={dropdownRef}>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "w-8 h-8 p-0 rounded-full hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-200",
                isDropdownOpen && "opacity-100 bg-gray-100"
              )}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </Button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                {/* Edit Event */}
                <button
                  onClick={() => handleDropdownAction(onEdit || (() => {}))}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors duration-150"
                  disabled={!onEdit}
                >
                  <Edit3 className="w-4 h-4 text-blue-500" />
                  <span>Edit Event</span>
                </button>

                {/* Clone Event */}
                <button
                  onClick={() => handleDropdownAction(onClone || (() => {}))}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors duration-150"
                  disabled={!onClone}
                >
                  <Copy className="w-4 h-4 text-green-500" />
                  <span>Clone Event</span>
                </button>

                {/* Divider */}
                <div className="border-t border-gray-100 my-1"></div>

                {/* Toggle On/Off */}
                <button
                  onClick={() => handleDropdownAction(onToggle)}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors duration-150"
                  disabled={isPending}
                >
                  <Power className={cn(
                    "w-4 h-4",
                    isPrivate ? "text-green-500" : "text-orange-500"
                  )} />
                  <span className="flex items-center gap-2">
                    Turn {isPrivate ? "On" : "Off"}
                    {isPending && <Loader size="sm" color="gray" />}
                  </span>
                </button>

                {/* Divider */}
                <div className="border-t border-gray-100 my-1"></div>

                {/* Delete Event */}
                <button
                  onClick={() => handleDropdownAction(onDelete)}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors duration-150"
                  disabled={isPending}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                  <span>Delete Event</span>
                </button>
              </div>
            )}
          </div>

          {/* Event details */}
          <div className="w-full flex flex-col p-[18px_16px]">
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
  );
};

export default EventCard;