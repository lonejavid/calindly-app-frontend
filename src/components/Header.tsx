

import { useNavigate } from "react-router-dom";
import { ChevronDown, LogOutIcon, Trash2, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { useStore } from "@/store/store";
import { AUTH_ROUTES } from "@/routes/common/routePaths";
import { SidebarTrigger } from "./ui/sidebar";
import { API} from "../lib/axios-client";
const Header = () => {
  const navigate = useNavigate();
  const { user, setAccessToken, setUser } = useStore();

  const onLogout = () => {
    setUser(null);
    setAccessToken(null);
    navigate(AUTH_ROUTES.SIGN_IN);
  };

  const onDeleteAccount = async() => {
    // Add confirmation dialog logic here
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    
    if (confirmed) {
      // Add delete account API call here
      console.log("Deleting account...");
      
     await  API.delete("/auth/delete-account");
      onLogout();
    }
  };

  const getUserInitials = (name: string | undefined) => {
    if (!name) return "U";
    const nameParts = name.split(" ");
    if (nameParts.length >= 2) {
      return (nameParts[0]?.charAt(0) + nameParts[1]?.charAt(0)).toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  return (
    <header className="flex min-h-12 pt-3 pb-4 shrink-0 items-center transition-all duration-300 ease-in-out bg-gradient-to-r from-slate-50 to-white border-b border-slate-200/60">
      <div className="w-full flex items-center justify-between px-4">
        <div>
          <SidebarTrigger
            className="group -ml-5 cursor-pointer lg:hidden bg-white/80 backdrop-blur-sm border border-slate-200 
                     transform rotate-180 hover:bg-white hover:border-slate-300 hover:shadow-sm 
                     transition-all duration-200 rounded-lg p-2"
          />
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <button className="group flex items-center gap-3 cursor-pointer p-2 rounded-xl 
                           hover:bg-slate-100/80 transition-all duration-200 ease-out
                           focus:outline-none focus:ring-2 focus:ring-blue-500/20">
              <Avatar className="w-9 h-9 ring-2 ring-slate-200 group-hover:ring-blue-300 
                               transition-all duration-200 shadow-sm">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 
                                         text-white font-semibold text-sm">
                  {getUserInitials(user?.name)}
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="w-4 h-4 text-slate-600 group-hover:text-slate-800 
                                   transition-all duration-200 group-hover:rotate-180" />
            </button>
          </PopoverTrigger>
          
          <PopoverContent
            align="end"
            className="w-72 rounded-xl p-0 bg-white/95 backdrop-blur-md border border-slate-200 
                     shadow-xl shadow-slate-900/10 overflow-hidden"
          >
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* User Info Section */}
              <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 ring-2 ring-white shadow-sm">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 
                                             text-white font-semibold">
                      {getUserInitials(user?.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 capitalize truncate">
                      {user?.name || "User"}
                    </h3>
                    <p className="text-sm text-slate-600 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      Teams free trial
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <div className="px-3 py-2">
                  <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                    Account Settings
                  </h3>
                </div>

                <div className="space-y-1">
                  {/* Profile Settings */}
                  <button
                    role="menuitem"
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 
                             rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-all duration-150 
                             focus:outline-none focus:bg-slate-100"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile Settings</span>
                  </button>

                  {/* Account Settings */}
                  <button
                    role="menuitem"
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 
                             rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-all duration-150 
                             focus:outline-none focus:bg-slate-100"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Account Settings</span>
                  </button>

                  <Separator className="my-2" />

                  {/* Logout */}
                  <button
                    role="menuitem"
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 
                             rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-all duration-150 
                             focus:outline-none focus:bg-blue-50"
                    onClick={onLogout}
                  >
                    <LogOutIcon className="w-4 h-4 transform rotate-180" />
                    <span>Logout</span>
                  </button>

                  {/* Delete Account */}
                  <button
                    role="menuitem"
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 
                             rounded-lg hover:bg-red-50 hover:text-red-700 transition-all duration-150 
                             focus:outline-none focus:bg-red-50 group"
                    onClick={onDeleteAccount}
                  >
                    <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-150" />
                    <span>Delete Account</span>
                  </button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default Header;