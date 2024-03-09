type CreateDataShape<TData, TError> = {
  data: TData;
  error: TError;
};

type T = CreateDataShape<string, TypeError>;
