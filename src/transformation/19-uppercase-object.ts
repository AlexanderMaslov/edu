export type Event = "log_in" | "log_out" | "sign_up";

export type ObjectOfKeys = Record<Uppercase<Event>, string>;
