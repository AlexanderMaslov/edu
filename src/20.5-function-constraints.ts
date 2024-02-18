export type GetParametersAndReturnType<T extends (...args: any) => any> = {
  params: Parameters<T>;
  returValue: ReturnType<T>;
};

type T = GetParametersAndReturnType<(a: number, b: string) => void>;
