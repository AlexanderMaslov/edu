export type CreateDataShape<
  TData,
  TError extends Error | undefined = undefined
> = {
  data: TData;
  error: TError;
};

type T = CreateDataShape<string>;
