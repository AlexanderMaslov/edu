const fetchData = async <T>(url: string) => {
  const data: T = await fetch(url).then((res) => res.json());
  return data;
};

void (async function () {
  const data = await fetchData<{ name: string }>(
    "https://swapi.dev/api/people"
  );
  data.name;
})();
