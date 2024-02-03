const myFunc = () => {
  return "hello";
};

type MyFuncReturn = ReturnType<typeof myFunc>;
