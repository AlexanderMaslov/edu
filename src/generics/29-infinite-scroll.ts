interface MakeInfiniteScrollParams<TRow> {
  key: keyof TRow;
  initialRows?: TRow[];
  fetchRows: () => Promise<TRow[]> | TRow[];
}

const makeInfiniteScroll = <TRow>(params: MakeInfiniteScrollParams<TRow>) => {
  const data = params.initialRows || [];

  const scroll = async () => {
    const rows = await params.fetchRows();
    data.push(...rows);
  };

  return {
    scroll,
    getRows: () => data,
  };
};

const table = makeInfiniteScroll({
  key: 'id',
  fetchRows: async () => Promise.resolve([{ id: 1, name: 'john' }]),
});

const table2 = makeInfiniteScroll({
  key: 'name',
  initialRows: [
    {
      id: 1,
      name: 'john',
    },
  ],
  fetchRows: () => Promise.resolve([]),
});
