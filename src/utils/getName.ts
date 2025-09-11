export const getName = (name: string, lastName: string = "") => {
  if (lastName === null) {
    lastName = "";
  }
  const fullName = `${name} ${lastName}`;
  const initials = `${name.charAt(0)}${lastName.charAt(0)}`;
  const nameAndInitial = `${name} ${lastName.charAt(0)}`;

  return {
    fullName: fullName.trim(),
    initials,
    nameAndInitial: nameAndInitial.trim(),
  };
};
