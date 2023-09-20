export interface Months {
  id: number;
  year: number;
  monthOfYear: string;
  dayOfMonth: DayOfMonth[];
}

export interface DayOfMonth {
  day: number;
  semana: string;
}
