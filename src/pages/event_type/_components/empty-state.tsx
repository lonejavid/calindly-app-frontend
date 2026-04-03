import eventImage from "@/assets/event-type.svg";
import NewEventDialog from "./new-event-dialog";
import { CalendarPlus, Link2, Users } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full px-4 py-8 min-h-0">
      <div className="w-full max-w-2xl mx-auto">
        {/* Main visual card */}
        <div
          className="relative overflow-hidden rounded-2xl border-2 px-8 py-10 text-center"
          style={{
            borderColor: "var(--blue)",
            backgroundColor: "var(--surface)",
            boxShadow: "0 4px 24px rgba(0, 122, 255, 0.12)",
          }}
        >
          {/* Top blue accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-1.5"
            style={{ backgroundColor: "var(--blue)" }}
            aria-hidden
          />

          <div className="flex flex-col items-center">
            {/* Icon with blue ring */}
            <div className="relative mb-6">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto"
                style={{ backgroundColor: "var(--blue-ghost)" }}
              >
                <img
                  src={eventImage}
                  alt=""
                  className="w-12 h-12 object-contain"
                  aria-hidden
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-14 h-1 rounded-full"
                style={{ backgroundColor: "var(--blue)" }}
                aria-hidden
              />
            </div>

            <h2 className="text-2xl font-bold text-[var(--ink)] mb-2">
              Create scheduling links with event types
            </h2>
            <p className="text-slate-600 text-sm max-w-md mb-6 leading-relaxed">
              Create events for scheduled meetings like customer calls, interviews, and more. Share a link and let others book time with you.
            </p>

            <NewEventDialog />
          </div>
        </div>

        {/* Visual hints row */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Link2, label: "One link per event type", color: "var(--blue)" },
            { icon: CalendarPlus, label: "Set duration & availability", color: "var(--blue)" },
            { icon: Users, label: "Meetings show up in one place", color: "var(--blue)" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl px-4 py-3 border border-slate-200/80 bg-white/80"
            >
              <span
                className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0"
                style={{ backgroundColor: "var(--blue-ghost)", color: "var(--blue)" }}
              >
                <Icon className="w-4 h-4" strokeWidth={2} />
              </span>
              <span className="text-sm font-medium text-slate-700">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
