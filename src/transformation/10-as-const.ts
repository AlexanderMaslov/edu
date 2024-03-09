const programModelEnumMap = {
  GROUP: "group",
  ANNONCEMENT: "annoncement",
  ONE_ON_ONE: "1on1",
  SELF_DIRECTED: "selfDirected",
  PLANNED_ONE_ON_ONE: "planned1on1",
  PLANNED_SELF_DIRECTED: "plannedSelfDireted",
} as const;

type GroupProgram = (typeof programModelEnumMap)["GROUP"];
type AnnoncementProgram = (typeof programModelEnumMap)["ANNONCEMENT"];
type OneOnOneProgram = (typeof programModelEnumMap)["ONE_ON_ONE"];
type SelfDiredtedProgram = (typeof programModelEnumMap)["SELF_DIRECTED"];
type PlannedOneOnOneProgram =
  (typeof programModelEnumMap)["PLANNED_ONE_ON_ONE"];
type PlannedSelfDirectedProgram =
  (typeof programModelEnumMap)["PLANNED_SELF_DIRECTED"];
