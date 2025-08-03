// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { ENV } from "@/lib/get-env";
// import NewEventDialog from "./new-event-dialog";
// import { useStore } from "@/store/store";

// const UserSection = (props: { username: string }) => {
//   const { user } = useStore();
//   const username = props.username || user?.username;
//   const my_link = `${ENV.VITE_APP_ORIGIN}/${username}`;
//   return (
//     <div
//       className="w-full flex flex-wrap items-center justify-between 
//     mb-5 border-b border-[#D4E162] "
//     >
//       <div className="flex items-center p-[16px_0_8px] gap-3">
//         <div className="w-[54px] h-[54px] flex items-center justify-center">
//           <Avatar className="!w-[45px] !h-[45px] !p-px border-2 border-[#CCCCCC] transition-colors">
//             <AvatarFallback className="bg-[#e7edf6] uppercase">
//               {user?.name?.charAt(0)}
//             </AvatarFallback>
//           </Avatar>
//         </div>
//         <div className="flex flex-col">
//           <div className="flex">
            
//             <span
//               className="block max-w-[340px] capitalize whitespace-nowrap 
//             overflow-hidden truncate line-clamp-1 text-sm font-normal"
//             >
//               {user?.name}
//             </span>
//           </div>
//           <div className="flex">
//             <a target="_blank" href={my_link} className="text-[#004eba]">
           
//               <span
//                 className="block max-w-[340px] whitespace-nowrap 
//             overflow-hidden truncate line-clamp-1 text-sm font-normal"
//               >
//                 {my_link}
//               </span>
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* {Create Event } */}
//       <div className="flex items-center p-[18px_0]">
//         <NewEventDialog />
//       </div>
//     </div>
//   );
// };

// export default UserSection;


// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { ENV } from "@/lib/get-env";
// import NewEventDialog from "./new-event-dialog";
// import { useStore } from "@/store/store";

// const UserSection = (props: { username: string }) => {
//   const { user } = useStore();
//   const username = props.username || user?.username;
//   const my_link = `${ENV.VITE_APP_ORIGIN}/${username}`;
//   console.log(my_link);
//   return (
//     <div
//       className="w-full flex flex-wrap items-center justify-between 
//      mb-5 border-b border-[#D4E162] "
//     >
//       <div className="flex items-center p-[16px_0_8px] gap-3">
//         <div className="w-[54px] h-[54px] flex items-center justify-center">
//           <Avatar className="!w-[45px] !h-[45px] !p-px border-2 border-[#CCCCCC] transition-colors">
//             <AvatarFallback className="bg-[#e7edf6] uppercase">
//               {user?.name?.charAt(0)}
//             </AvatarFallback>
//           </Avatar>
//         </div>
//         <div className="flex flex-col">
//           <div className="flex">                       
//             <span
//               className="block max-w-[340px] capitalize whitespace-nowrap
//              overflow-hidden truncate line-clamp-1 text-sm font-normal"
//             >
//               {user?.name}
//             </span>
//           </div>
//           <div className="flex">
//             <span className="text-[#666666] text-sm font-normal">
//               Your personalized booking page is ready to share with clients and colleagues
//             </span>
//           </div>
//         </div>
//       </div>
       
//       {/* {Create Event } */}
//       <div className="flex items-center p-[18px_0]">
//         <NewEventDialog />
//       </div>
//     </div>
//   );
// };

// export default UserSection;



import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ENV } from "@/lib/get-env";
import NewEventDialog from "./new-event-dialog";
import { useStore } from "@/store/store";

const UserSection = (props: { username: string }) => {
  const { user } = useStore();
  const username = props.username || user?.username;
  const my_link = `${ENV.VITE_APP_ORIGIN}/${username}`;
  
  return (
    <div className="w-full flex flex-wrap items-center justify-between mb-6 pb-6 border-b border-gradient-to-r from-[#D4E162]/30 via-[#D4E162] to-[#D4E162]/30">
      <div className="flex items-center gap-4 p-2">
        {/* Enhanced Avatar */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-sm opacity-20 animate-pulse"></div>
          <Avatar className="relative w-14 h-14 border-3 border-white shadow-lg ring-2 ring-blue-100 transition-all duration-300 hover:ring-4 hover:ring-blue-200 hover:scale-105">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg uppercase shadow-inner">
              {user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {/* Online indicator */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full shadow-sm"></div>
        </div>

        {/* Enhanced User Info */}
        <div className="flex flex-col space-y-1">
          {/* Username with gradient effect */}
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent capitalize tracking-tight">
              {user?.name}
            </h2>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
          
          {/* Enhanced description */}
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
            <p className="text-sm text-gray-600 font-medium leading-relaxed">
              Your personalized booking page is 
              <span className="text-blue-600 font-semibold"> ready to share </span>
              with clients and colleagues
            </p>
          </div>
          
          {/* URL display with copy functionality styling */}
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 transition-all duration-200 hover:bg-gray-100 hover:border-gray-300">
              <span className="text-xs text-gray-500 font-mono tracking-wide truncate max-w-[280px]">
                {my_link}
              </span>
            </div>
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
       
      {/* Enhanced Create Event Button Area */}
      <div className="flex items-center p-2">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg blur-sm opacity-10 pointer-events-none"></div>
          <div className="relative z-10">
            <NewEventDialog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSection;