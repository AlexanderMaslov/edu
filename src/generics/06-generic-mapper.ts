export const concatenateFirstNameAndLastName = <
  User extends { firstName: string; lastName: string }
>(
  user: User
) => {
  return {
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
  };
};

const users = [
  {
    firstName: "Matt",
    lastName: "Pocock",
  },
];

const newUsers = users.map(concatenateFirstNameAndLastName);
