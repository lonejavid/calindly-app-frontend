// i hve code which is fine i wanted taht i am asking you. simple help in this code but please undersatnd the requirement 

import { Link, useParams } from "react-router-dom";
import { ArrowRight, Clock, Calendar, User, Sparkles, Star, CheckCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllPublicEventQueryFn } from "@/lib/api";
import { ErrorAlert } from "@/components/ErrorAlert";
import { Loader } from "@/components/loader";

const UserEventsPage = () => {
  const param = useParams();
  const username = param.username as string;

  const { data, isFetching, isLoading, isError, error } = useQuery({
    queryKey: ["public_events"],
    queryFn: () => getAllPublicEventQueryFn(username),
  });

  const events = data?.events || [];
  const user = data?.user;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950">
        <Loader size="lg" color="white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 text-white overflow-hidden relative">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-tr from-blue-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full opacity-40 animate-ping"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-300 rounded-full opacity-60 animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-50 animate-ping" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="fixed inset-0 bg-gradient-to-br from-transparent via-purple-900/10 to-transparent pointer-events-none"></div>

      <div className="relative z-10 py-8 md:py-12 lg:py-16 px-4 sm:px-6">
        {/* Error Alert */}
        <ErrorAlert isError={isError} error={error} />

        {isFetching ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <Loader size="lg" color="white" />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12 md:mb-16 lg:mb-20">
              {/* Top badge */}
              <div className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-slate-900/90 to-purple-900/90 backdrop-blur-xl rounded-full mb-6 md:mb-8 border border-purple-400/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ring-1 ring-purple-300/30">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-yellow-400 animate-pulse drop-shadow-lg" />
                <span className="text-sm md:text-base font-black text-white tracking-wide drop-shadow-lg">✨ Schedule Your Meeting</span>
                <Star className="w-3 h-3 md:w-4 md:h-4 ml-2 md:ml-3 text-yellow-400 drop-shadow-lg" />
              </div>

              {/* User profile card */}
              <div className="bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-indigo-900/95 backdrop-blur-2xl rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 border border-purple-400/40 max-w-md mx-auto mb-8 md:mb-10 lg:mb-12 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] ring-1 ring-purple-300/20">
                <div className="flex items-center justify-center mb-4 md:mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-violet-600 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-purple-300/30 ring-offset-2 ring-offset-transparent">
                      <User className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white drop-shadow-lg" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-green-500 rounded-full border-2 md:border-3 border-white flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-2 h-2 md:w-3 md:h-3 text-white" />
                    </div>
                  </div>
                </div>
                
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black mb-2 md:mb-3 lg:mb-4 text-white capitalize tracking-tight drop-shadow-2xl text-shadow-lg">
                  {user?.name || 'Professional'}
                </h1>
                
                <p className="text-sm md:text-base lg:text-lg text-gray-100 leading-relaxed font-bold max-w-md mx-auto drop-shadow-xl">
                  🚀 Ready to connect? Choose your preferred meeting type below.
                </p>
              </div>

              {/* Section heading */}
              <div className="space-y-2 md:space-y-3">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-white drop-shadow-2xl">
                  🎯 Available Meeting Options
                </h2>
                <p className="text-sm md:text-base lg:text-lg text-gray-200 font-bold max-w-2xl mx-auto drop-shadow-xl">
                  Select the perfect meeting type that matches your needs.
                </p>
              </div>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 max-w-6xl mx-auto mb-12 md:mb-16">
              {events?.map((event, index) => (
                <Link
                  key={index}
                  to={`/${username}/${event.slug}`}
                  className="group relative transform hover:scale-[1.03] transition-all duration-500 cursor-pointer"
                >
                  {/* Card */}
                  <div className="bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-indigo-900/95 backdrop-blur-2xl rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 border border-purple-400/50 hover:border-purple-300/80 transition-all duration-500 hover:shadow-2xl min-h-[200px] md:min-h-[240px] flex flex-col justify-between relative overflow-hidden ring-1 ring-purple-300/20 hover:ring-purple-300/40">
                    
                    {/* Subtle inner glow for depth */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl md:rounded-3xl"></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4 md:mb-6">
                        <div className="p-3 md:p-4 bg-gradient-to-br from-purple-500/80 to-pink-500/80 rounded-xl md:rounded-2xl border border-purple-300/60 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                          <Calendar className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white drop-shadow-lg" />
                        </div>
                        <div className="flex items-center space-x-1 md:space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                          <span className="text-xs md:text-sm font-black text-purple-200 drop-shadow-lg">Let's go</span>
                          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-purple-200 animate-bounce drop-shadow-lg" />
                        </div>
                      </div>

                      <h3 className="text-lg md:text-xl lg:text-2xl font-black mb-2 md:mb-3 lg:mb-4 text-white group-hover:text-gray-100 transition-colors duration-300 capitalize drop-shadow-2xl" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                        {event.title}
                      </h3>

                      <p className="text-sm md:text-base lg:text-lg text-gray-100 group-hover:text-white transition-colors duration-300 leading-relaxed line-clamp-3 mb-4 md:mb-6 font-bold drop-shadow-xl" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.7)'}}>
                        {event.description || "🎉 Professional meeting session designed to help you achieve your goals."}
                      </p>
                    </div>

                    {/* Duration Badge */}
                    <div className="flex items-center justify-between relative z-10">
                      <div className="inline-flex items-center px-3 py-2 md:px-4 md:py-2 lg:px-5 lg:py-3 bg-gradient-to-r from-slate-800/90 to-indigo-800/90 backdrop-blur-xl rounded-xl md:rounded-2xl border border-blue-400/60 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                        <Clock className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-blue-300 drop-shadow-lg" />
                        <span className="text-sm md:text-base font-black text-white drop-shadow-lg">
                          {event.duration} minutes
                        </span>
                      </div>
                      
                      <div className="text-xs md:text-sm text-gray-200 group-hover:text-white font-black opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 drop-shadow-lg">
                        Book now! 🚀
                      </div>
                    </div>

                    {/* Enhanced hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                </Link>
              ))}
            </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 max-w-6xl mx-auto mb-12 md:mb-16">
              {events?.map((event, index) => (
                <Link
                  key={index}
                  to={`/${username}/${event.slug}`}
                  className="group relative transform hover:scale-[1.03] transition-all duration-500 cursor-pointer"
                >
                  {/* Card */}
                  <div className="bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-indigo-900/95 backdrop-blur-2xl rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 border border-purple-400/50 hover:border-purple-300/80 transition-all duration-500 hover:shadow-2xl min-h-[200px] md:min-h-[240px] flex flex-col justify-between relative overflow-hidden ring-1 ring-purple-300/20 hover:ring-purple-300/40">
                    
                    {/* Subtle inner glow for depth */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl md:rounded-3xl"></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4 md:mb-6">
                        <div className="p-3 md:p-4 bg-gradient-to-br from-purple-500/80 to-pink-500/80 rounded-xl md:rounded-2xl border border-purple-300/60 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                          <Calendar className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white drop-shadow-lg" />
                        </div>
                        <div className="flex items-center space-x-1 md:space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                          <span className="text-xs md:text-sm font-black text-purple-200 drop-shadow-lg">Let's go</span>
                          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-purple-200 animate-bounce drop-shadow-lg" />
                        </div>
                      </div>

                      <h3 className="text-lg md:text-xl lg:text-2xl font-black mb-2 md:mb-3 lg:mb-4 text-white group-hover:text-gray-100 transition-colors duration-300 capitalize drop-shadow-2xl" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                        {event.title}
                      </h3>

                      <p className="text-sm md:text-base lg:text-lg text-gray-100 group-hover:text-white transition-colors duration-300 leading-relaxed line-clamp-3 mb-4 md:mb-6 font-bold drop-shadow-xl" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.7)'}}>
                        {event.description || "🎉 Professional meeting session designed to help you achieve your goals."}
                      </p>
                    </div>

                    {/* Duration Badge */}
                    <div className="flex items-center justify-between relative z-10">
                      <div className="inline-flex items-center px-3 py-2 md:px-4 md:py-2 lg:px-5 lg:py-3 bg-gradient-to-r from-slate-800/90 to-indigo-800/90 backdrop-blur-xl rounded-xl md:rounded-2xl border border-blue-400/60 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                        <Clock className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-blue-300 drop-shadow-lg" />
                        <span className="text-sm md:text-base font-black text-white drop-shadow-lg">
                          {event.duration} minutes
                        </span>
                      </div>
                      
                      <div className="text-xs md:text-sm text-gray-200 group-hover:text-white font-black opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 drop-shadow-lg">
                        Book now! 🚀
                      </div>
                    </div>

                    {/* Enhanced hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                </Link>
              ))}
            </div>
            {/* Empty State */}
            {events.length === 0 && (
              <div className="text-center py-12 md:py-16 lg:py-20">
                <div className="bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-indigo-900/95 backdrop-blur-2xl rounded-2xl md:rounded-3xl p-8 md:p-10 lg:p-12 border border-purple-400/50 max-w-md mx-auto shadow-2xl ring-1 ring-purple-300/20">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-600/80 to-gray-700/80 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-xl">
                    <Calendar className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black mb-2 md:mb-3 lg:mb-4 text-white drop-shadow-2xl">
                    🚧 No Events Yet
                  </h3>
                  <p className="text-sm md:text-base lg:text-lg text-gray-100 font-bold drop-shadow-xl">
                    This user is setting up their calendar. Check back soon!
                  </p>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-slate-900/90 to-purple-900/90 backdrop-blur-xl rounded-full border border-purple-400/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ring-1 ring-purple-300/30">
                <span className="text-xs md:text-sm text-white font-black drop-shadow-lg">
                  ⚡ Powered by <span className="text-purple-300 font-black tracking-wide drop-shadow-lg">Schedley</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserEventsPage;
 