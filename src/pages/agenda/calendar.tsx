import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

type Props = {
  isSameDay: (date_1: Date | undefined, date_2: Date) => boolean;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
};

export default function CalendarComponent({
  isSameDay,
  selectedDate,
  setSelectedDate,
}: Props) {
  function handleChangeCalendarDate(date: Date) {
    if (isSameDay(date, selectedDate) || date === undefined) {
      return;
    }
    setSelectedDate(date);
  }

  return (
    <motion.div
      key="calendar"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground p-6">
          <CardTitle className="flex items-center space-x-4 text-2xl">
            <CalendarIcon className="h-6 w-6" />
            <span>Calendario</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => handleChangeCalendarDate(date as Date)}
            className="rounded-none border-none p-4"
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
