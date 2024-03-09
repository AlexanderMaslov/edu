type TemplateLiteralTypes = `${"user" | "post" | "comment"}${"id" | "Name"}`;

type ObjectOfKeys = Record<TemplateLiteralTypes, string>;
