export const programModelEnumMap = {
  GROUP: "group",
  ANNONCEMENT: "annoncement",
  ONE_ON_ONE: "1on1",
  SELF_DIRECTED: "selfDirected",
  PLANNED_ONE_ON_ONE: "planned1on1",
  PLANNED_SELF_DIRECTED: "plannedSelfDireted",
} as const;

type IndividualProgram = (typeof programModelEnumMap)[
  | "ONE_ON_ONE"
  | "SELF_DIRECTED"
  | "PLANNED_ONE_ON_ONE"
  | "PLANNED_SELF_DIRECTED"];

type IndividualProgram2 = (typeof programModelEnumMap)[Exclude<
  keyof typeof programModelEnumMap,
  "GROUP" | "ANNONCEMENT"
>];
