"use client";

import * as React from "react";
import { format, getMonth, getYear, isAfter } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  date: Date | undefined;
  setDate: (date: Date) => void;
  untilCurrent?: boolean;
};

export default function DatePickerComponent({
  date,
  setDate,
  untilCurrent,
}: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const today = new Date();
  const [month, setMonth] = React.useState(getMonth(new Date()));
  const [year, setYear] = React.useState(getYear(new Date()));

  const currentYear = getYear(new Date());
  const years = Array.from({ length: 101 }, (_, i) => currentYear - 100 + i);
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const handleMonthChange = (value: string) => {
    setMonth(months.indexOf(value));
  };

  const handleYearChange = (value: string) => {
    const selectedYear = parseInt(value);
    setYear(selectedYear);
    if (selectedYear > currentYear) {
      setMonth(0);
    }
  };

  const isDateDisabled = (date: Date) => {
    if (untilCurrent) {
      return isAfter(date, today);
    }
    return false;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP", { locale: es })
          ) : (
            <span>Selecciona una fecha</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex items-center justify-between px-3 pt-2">
          <Select value={months[month]} onValueChange={handleMonthChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Mes" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={year.toString()} onValueChange={handleYearChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue
                placeholder={`${currentYear - 100} - ${currentYear}`}
              />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            if (newDate && !isDateDisabled(newDate)) {
              setDate(newDate);
              setIsOpen(false);
            }
          }}
          month={new Date(year, month)}
          onMonthChange={(newMonth) => {
            setMonth(getMonth(newMonth));
            setYear(getYear(newMonth));
          }}
          disabled={isDateDisabled}
          className="rounded-t-none"
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
