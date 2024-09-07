export interface Plan {
  activityType: "EXAM" | "STUDY" | "PROBLEM" | "TIME";
  targetValue: number;
  planItemId?: string;
  completedValue?: number;
  descriptionLeft?: string;
  descriptionRight?: string;
  isActive?: boolean;
}

export interface ActivePlanType {
  planId: string;
  certificate: CertificateType;
  endAt: string;
  createdAt: string;
  dailyPlanItems: Plan[];
  weeklyPlanItems: Plan[];
}

export interface MakePlanType {
  endAt: Date;
  dailyPlan: Plan[];
  weeklyPlan: Plan[];
}

export interface ViewPlanType {
  day: string;
  planItems: Plan[];
}

export interface CalendarType {
  year: number;
  month: number;
  dailyProgress: {
    day: string;
    planItems: Plan[];
  }[];
  weeklyProgress: {
    week: number;
    planItems: Plan[];
  }[];
}

export const templan: CalendarType = {
  year: 2024,
  month: 9,
  dailyProgress: [
    {
      day: "2024-09-01",
      planItems: [
        {
          planItemId: "1",
          activityType: "EXAM",
          completedValue: 10,
          targetValue: 10,
        },
        {
          planItemId: "2",
          activityType: "STUDY",
          completedValue: 3,
          targetValue: 5,
        },
      ],
    },
    {
      day: "2024-09-02",
      planItems: [
        {
          planItemId: "3",
          activityType: "PROBLEM",
          completedValue: 5,
          targetValue: 5,
        },
        {
          planItemId: "4",
          activityType: "TIME",
          completedValue: 4,
          targetValue: 6,
        },
      ],
    },
    {
      day: "2024-09-03",
      planItems: [
        {
          planItemId: "5",
          activityType: "STUDY",
          completedValue: 4,
          targetValue: 5,
        },
        {
          planItemId: "6",
          activityType: "EXAM",
          completedValue: 6,
          targetValue: 8,
        },
      ],
    },
    {
      day: "2024-09-04",
      planItems: [
        {
          planItemId: "7",
          activityType: "TIME",
          completedValue: 6,
          targetValue: 6,
        },
        {
          planItemId: "8",
          activityType: "PROBLEM",
          completedValue: 3,
          targetValue: 5,
        },
      ],
    },
    {
      day: "2024-09-05",
      planItems: [
        {
          planItemId: "9",
          activityType: "EXAM",
          completedValue: 5,
          targetValue: 7,
        },
        {
          planItemId: "10",
          activityType: "STUDY",
          completedValue: 5,
          targetValue: 5,
        },
      ],
    },
    {
      day: "2024-09-06",
      planItems: [
        {
          planItemId: "11",
          activityType: "PROBLEM",
          completedValue: 6,
          targetValue: 7,
        },
        {
          planItemId: "12",
          activityType: "TIME",
          completedValue: 5,
          targetValue: 6,
        },
      ],
    },
    {
      day: "2024-09-07",
      planItems: [
        {
          planItemId: "13",
          activityType: "EXAM",
          completedValue: 9,
          targetValue: 10,
        },
        {
          planItemId: "14",
          activityType: "STUDY",
          completedValue: 3,
          targetValue: 5,
        },
      ],
    },
    {
      day: "2024-09-09",
      planItems: [
        {
          planItemId: "15",
          activityType: "TIME",
          completedValue: 7,
          targetValue: 8,
        },
        {
          planItemId: "16",
          activityType: "PROBLEM",
          completedValue: 4,
          targetValue: 5,
        },
      ],
    },
    {
      day: "2024-09-09",
      planItems: [
        {
          planItemId: "17",
          activityType: "EXAM",
          completedValue: 6,
          targetValue: 8,
        },
        {
          planItemId: "18",
          activityType: "STUDY",
          completedValue: 5,
          targetValue: 6,
        },
      ],
    },
    {
      day: "2024-09-10",
      planItems: [
        {
          planItemId: "19",
          activityType: "PROBLEM",
          completedValue: 7,
          targetValue: 8,
        },
        {
          planItemId: "20",
          activityType: "TIME",
          completedValue: 5,
          targetValue: 6,
        },
      ],
    },
    {
      day: "2024-09-11",
      planItems: [
        {
          planItemId: "21",
          activityType: "EXAM",
          completedValue: 8,
          targetValue: 10,
        },
        {
          planItemId: "22",
          activityType: "STUDY",
          completedValue: 4,
          targetValue: 5,
        },
      ],
    },
    {
      day: "2024-09-12",
      planItems: [
        {
          planItemId: "23",
          activityType: "TIME",
          completedValue: 5,
          targetValue: 6,
        },
        {
          planItemId: "24",
          activityType: "PROBLEM",
          completedValue: 6,
          targetValue: 7,
        },
      ],
    },
    {
      day: "2024-09-13",
      planItems: [
        {
          planItemId: "25",
          activityType: "EXAM",
          completedValue: 7,
          targetValue: 8,
        },
        {
          planItemId: "26",
          activityType: "STUDY",
          completedValue: 3,
          targetValue: 4,
        },
      ],
    },
    {
      day: "2024-09-14",
      planItems: [
        {
          planItemId: "27",
          activityType: "TIME",
          completedValue: 6,
          targetValue: 6,
        },
        {
          planItemId: "28",
          activityType: "PROBLEM",
          completedValue: 4,
          targetValue: 5,
        },
      ],
    },
    {
      day: "2024-09-15",
      planItems: [
        {
          planItemId: "29",
          activityType: "EXAM",
          completedValue: 9,
          targetValue: 10,
        },
        {
          planItemId: "30",
          activityType: "STUDY",
          completedValue: 2,
          targetValue: 3,
        },
      ],
    },
    {
      day: "2024-09-16",
      planItems: [
        {
          planItemId: "31",
          activityType: "TIME",
          completedValue: 7,
          targetValue: 8,
        },
        {
          planItemId: "32",
          activityType: "PROBLEM",
          completedValue: 5,
          targetValue: 6,
        },
      ],
    },
    {
      day: "2024-09-17",
      planItems: [
        {
          planItemId: "33",
          activityType: "EXAM",
          completedValue: 6,
          targetValue: 7,
        },
        {
          planItemId: "34",
          activityType: "STUDY",
          completedValue: 4,
          targetValue: 5,
        },
      ],
    },
    {
      day: "2024-09-18",
      planItems: [
        {
          planItemId: "35",
          activityType: "TIME",
          completedValue: 5,
          targetValue: 6,
        },
        {
          planItemId: "36",
          activityType: "PROBLEM",
          completedValue: 6,
          targetValue: 7,
        },
      ],
    },
    {
      day: "2024-09-19",
      planItems: [
        {
          planItemId: "37",
          activityType: "EXAM",
          completedValue: 8,
          targetValue: 9,
        },
        {
          planItemId: "38",
          activityType: "STUDY",
          completedValue: 3,
          targetValue: 4,
        },
      ],
    },
    {
      day: "2024-09-20",
      planItems: [
        {
          planItemId: "39",
          activityType: "TIME",
          completedValue: 7,
          targetValue: 8,
        },
        {
          planItemId: "40",
          activityType: "PROBLEM",
          completedValue: 4,
          targetValue: 5,
        },
      ],
    },
    {
      day: "2024-09-21",
      planItems: [
        {
          planItemId: "41",
          activityType: "EXAM",
          completedValue: 9,
          targetValue: 10,
        },
        {
          planItemId: "42",
          activityType: "STUDY",
          completedValue: 4,
          targetValue: 5,
        },
      ],
    },
    {
      day: "2024-09-22",
      planItems: [
        {
          planItemId: "43",
          activityType: "TIME",
          completedValue: 6,
          targetValue: 7,
        },
        {
          planItemId: "44",
          activityType: "PROBLEM",
          completedValue: 7,
          targetValue: 8,
        },
      ],
    },
    {
      day: "2024-09-23",
      planItems: [
        {
          planItemId: "45",
          activityType: "EXAM",
          completedValue: 7,
          targetValue: 8,
        },
        {
          planItemId: "46",
          activityType: "STUDY",
          completedValue: 5,
          targetValue: 6,
        },
      ],
    },
    {
      day: "2024-09-24",
      planItems: [
        {
          planItemId: "47",
          activityType: "TIME",
          completedValue: 8,
          targetValue: 9,
        },
        {
          planItemId: "48",
          activityType: "PROBLEM",
          completedValue: 3,
          targetValue: 5,
        },
      ],
    },
    {
      day: "2024-09-25",
      planItems: [
        {
          planItemId: "49",
          activityType: "EXAM",
          completedValue: 6,
          targetValue: 7,
        },
        {
          planItemId: "50",
          activityType: "STUDY",
          completedValue: 4,
          targetValue: 5,
        },
      ],
    },
    {
      day: "2024-09-26",
      planItems: [
        {
          planItemId: "51",
          activityType: "TIME",
          completedValue: 5,
          targetValue: 6,
        },
        {
          planItemId: "52",
          activityType: "PROBLEM",
          completedValue: 7,
          targetValue: 8,
        },
      ],
    },
    {
      day: "2024-09-27",
      planItems: [
        {
          planItemId: "53",
          activityType: "EXAM",
          completedValue: 9,
          targetValue: 10,
        },
        {
          planItemId: "54",
          activityType: "STUDY",
          completedValue: 5,
          targetValue: 6,
        },
      ],
    },
    {
      day: "2024-09-28",
      planItems: [
        {
          planItemId: "55",
          activityType: "TIME",
          completedValue: 7,
          targetValue: 8,
        },
        {
          planItemId: "56",
          activityType: "PROBLEM",
          completedValue: 4,
          targetValue: 5,
        },
      ],
    },
    {
      day: "2024-09-29",
      planItems: [
        {
          planItemId: "57",
          activityType: "EXAM",
          completedValue: 6,
          targetValue: 7,
        },
        {
          planItemId: "58",
          activityType: "STUDY",
          completedValue: 5,
          targetValue: 6,
        },
      ],
    },
    {
      day: "2024-09-30",
      planItems: [
        {
          planItemId: "59",
          activityType: "TIME",
          completedValue: 8,
          targetValue: 9,
        },
        {
          planItemId: "60",
          activityType: "PROBLEM",
          completedValue: 7,
          targetValue: 8,
        },
      ],
    },
    {
      day: "2024-09-31",
      planItems: [
        {
          planItemId: "61",
          activityType: "EXAM",
          completedValue: 7,
          targetValue: 8,
        },
        {
          planItemId: "62",
          activityType: "STUDY",
          completedValue: 4,
          targetValue: 5,
        },
      ],
    },
  ],
  weeklyProgress: [
    {
      week: 1,
      planItems: [
        {
          planItemId: "63",
          activityType: "EXAM",
          completedValue: 30,
          targetValue: 25,
        },
        {
          planItemId: "64",
          activityType: "STUDY",
          completedValue: 15,
          targetValue: 20,
        },
      ],
    },
    {
      week: 2,
      planItems: [
        {
          planItemId: "65",
          activityType: "PROBLEM",
          completedValue: 22,
          targetValue: 15,
        },
        {
          planItemId: "66",
          activityType: "TIME",
          completedValue: 14,
          targetValue: 18,
        },
      ],
    },
    {
      week: 3,
      planItems: [
        {
          planItemId: "67",
          activityType: "EXAM",
          completedValue: 35,
          targetValue: 30,
        },
        {
          planItemId: "68",
          activityType: "STUDY",
          completedValue: 38,
          targetValue: 20,
        },
      ],
    },
    {
      week: 4,
      planItems: [
        {
          planItemId: "69",
          activityType: "PROBLEM",
          completedValue: 15,
          targetValue: 20,
        },
        {
          planItemId: "70",
          activityType: "TIME",
          completedValue: 20,
          targetValue: 25,
        },
      ],
    },
    {
      week: 5,
      planItems: [
        {
          planItemId: "71",
          activityType: "EXAM",
          completedValue: 10,
          targetValue: 15,
        },
        {
          planItemId: "72",
          activityType: "STUDY",
          completedValue: 5,
          targetValue: 10,
        },
      ],
    },
  ],
};
