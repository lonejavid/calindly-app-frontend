"use client";

import React, { useState } from "react";
import { Check, ChevronsUpDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { TIMEZONE_OPTIONS, getCurrentTimeInTimezone } from "@/lib/timezone";

interface TimezoneSelectorProps {
  value: string;
  onValueChange: (timezone: string) => void;
  className?: string;
}

export const TimezoneSelector = ({
  value,
  onValueChange,
  className,
}: TimezoneSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const selectedTimezone = TIMEZONE_OPTIONS.find((tz) => tz.value === value);
  const currentTime = getCurrentTimeInTimezone(value);

  // Group timezones
  const groupedTimezones = TIMEZONE_OPTIONS.reduce(
    (acc, timezone) => {
      if (!acc[timezone.group]) {
        acc[timezone.group] = [];
      }
      acc[timezone.group].push(timezone);
      return acc;
    },
    {} as Record<string, typeof TIMEZONE_OPTIONS>
  );

  // Filter timezones based on search
  const filteredTimezones = searchValue
    ? TIMEZONE_OPTIONS.filter(
        (tz) =>
          tz.label.toLowerCase().includes(searchValue.toLowerCase()) ||
          tz.value.toLowerCase().includes(searchValue.toLowerCase())
      )
    : TIMEZONE_OPTIONS;

  const handleTimezoneSelect = (timezoneValue: string) => {
    onValueChange(timezoneValue);
    setOpen(false);
    setSearchValue("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "justify-between min-w-[300px] h-auto p-3 w-full",
            className
          )}
        >
          <div className="flex items-start gap-2 text-left">
            <Globe className="h-4 w-4 mt-0.5 shrink-0" />
            <div className="flex flex-col gap-1">
              <span className="font-medium">
                {selectedTimezone?.label || "Select timezone..."}
              </span>
              {currentTime && (
                <span className="text-xs text-muted-foreground">
                  Current time: {currentTime}
                </span>
              )}
            </div>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search timezone..."
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList className="max-h-[300px]">
            <CommandEmpty>No timezone found.</CommandEmpty>
            {searchValue ? (
              <CommandGroup>
                {filteredTimezones.map((timezone) => (
                  <CommandItem
                    key={timezone.value}
                    value={timezone.value}
                    onSelect={() => handleTimezoneSelect(timezone.value)}
                    className="flex items-center justify-between py-2 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Check
                        className={cn(
                          "h-4 w-4",
                          value === timezone.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <span className="text-sm">{timezone.label}</span>
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">
                      {getCurrentTimeInTimezone(timezone.value)}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              <>
                {Object.entries(groupedTimezones).map(([groupName, timezones]) => (
                  <CommandGroup
                    key={groupName}
                    heading={groupName.replace("_", " & ")}
                  >
                    {timezones.map((timezone) => (
                      <CommandItem
                        key={timezone.value}
                        value={timezone.value}
                        onSelect={() => handleTimezoneSelect(timezone.value)}
                        className="flex items-center justify-between py-2 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Check
                            className={cn(
                              "h-4 w-4",
                              value === timezone.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          <span className="text-sm">{timezone.label}</span>
                        </div>
                        <span className="text-xs text-muted-foreground ml-2">
                          {getCurrentTimeInTimezone(timezone.value)}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TimezoneSelector;