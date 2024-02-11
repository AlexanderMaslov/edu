type AddRoutePrefix<T extends string> = `/${T}`;

type Example = AddRoutePrefix<"user">;
