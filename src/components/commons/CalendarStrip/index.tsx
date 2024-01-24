'use client'

import { getDayText, getWeekDates } from "@/lib/dateUtils";
import { worshipState } from "@/stores/worshipState";
import { useRecoilState } from "recoil";
import { isAfter } from "date-fns";

type CalendarStripProps = {}

const CalendarStrip = ({}: CalendarStripProps) => {
  const [ worship, setWorship] = useRecoilState(worshipState)
  const weekDates = getWeekDates();

  return (
    <div className="flex justify-between">
      {weekDates.map((date, index) => {
        const isSelected = date.getDate() === worship.selectedDate.getDate()
        return (
          <div key={index} className="group cursor-pointer">
            <button
              disabled={isAfter(date, new Date())}
              onClick={() => setWorship({ selectedDate: date })}
              className="disabled:cursor-not-allowed"
            >
              <span className={`flex justify-center items-center text-sm px-2 py-1`}>{getDayText(date.getDay())}</span>
              <span className={`block text-sm px-4 py-3 mt-1 rounded-full ${isSelected ? 'bg-blue-600 text-white' : 'text-black'} group-hover:bg-gray-200`}>{date.getDate()}</span>
            </button>
          </div>
        )
      })}
    </div>
  );
};

export default CalendarStrip;
