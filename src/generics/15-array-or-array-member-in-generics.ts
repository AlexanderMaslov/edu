const makeStatus = <T extends string>(statuses: T[]) => {
  return statuses;
};

const statuses = makeStatus(['INFO', 'DEBUG', 'ERROR', 'WARNING']);
