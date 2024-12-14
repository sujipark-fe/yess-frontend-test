import { create } from 'zustand';

export interface TimeSlot {
  id: number;
  time: string;
}

interface ScheduleStore {
  times: string[];
  schedule: Record<string, TimeSlot[]>;
  addTime: (day: string) => void;
  deleteTime: (day: string, id: number) => void;
  updateTime: (day: string, id: number, newTime: string) => void;
}

const generateTimeOptions = () => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const formattedTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      options.push(formattedTime);
    }
  }
  return options;
};
const timeOptions = generateTimeOptions();

const useScheduleStore = create<ScheduleStore>((set) => ({
  times: timeOptions,
  schedule: {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  },
  addTime: (day) =>
    set((state) => {
      const newTimeSlot: TimeSlot = { id: Date.now(), time: timeOptions[0] };
      return {
        schedule: {
          ...state.schedule,
          [day]: [...state.schedule[day], newTimeSlot],
        },
      };
    }),
  deleteTime: (day, id) =>
    set((state) => ({
      schedule: {
        ...state.schedule,
        [day]: state.schedule[day].filter((slot) => slot.id !== id),
      },
    })),
  updateTime: (day, id, newTime) =>
    set((state) => ({
      schedule: {
        ...state.schedule,
        [day]: state.schedule[day].map((slot) => (slot.id === id ? { ...slot, time: newTime } : slot)),
      },
    })),
}));

export default useScheduleStore;
