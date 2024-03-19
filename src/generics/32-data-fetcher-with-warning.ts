const fetchData = async <
  TResult = 'you must pass a type argument to fetchData',
>(
  url: string,
): Promise<TResult> => {
  const data = await fetch(url).then((response) => response.json());
  return data;
};

void (async function () {
  const data = await fetchData<{ name: string }>(
    'https://swapi.dev/api/people/1',
  );
})();

void (async function () {
  const data = await fetchData('https://swapi.dev/api/people/1');
})();
