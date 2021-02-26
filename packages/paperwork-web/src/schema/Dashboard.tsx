export interface Reminder {
  unreadNotificationCount: number;
  dueFormCount: number;
}

export interface TrendRecord {
  date: string;
  received: number;
  submitted: number;
}

export interface Trend {
  commits: TrendRecord[];
}
