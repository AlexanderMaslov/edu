const array = [{ name: "John" }, { name: "Steve" }];

const obj = array.reduce<Record<string, { name: string }>>((acc, item) => {
  acc[item.name] = item;
  return acc;
}, {});
