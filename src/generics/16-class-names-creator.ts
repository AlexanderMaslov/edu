const createClassNamesFactory1 =
  <Variant extends string>(classes: Record<Variant, string>) =>
  (type: Variant, ...otherClasses: string[]) => {
    const classList = [classes[type], ...otherClasses];
    return classList.join(' ');
  };

const createClassNamesFactory2 =
  <Classes extends Record<string, string>>(classes: Classes) =>
  (type: keyof Classes, ...otherClasses: string[]) => {
    const classList = [classes[type], ...otherClasses];
    return classList.join(' ');
  };

const getBg1 = createClassNamesFactory1({
  primary: 'bg-blue-500',
  secondary: 'bg-gray-500',
});

const getBg2 = createClassNamesFactory2({
  primary: 'bg-blue-500',
  secondary: 'bg-gray-500',
});
