export const phoneFiltering = (phone: string) => {
  return phone
    .replaceAll("-", "")
    .replace(/(\d{3})(\d{4})(\d{4})/, "$1-****-$3");
};

export const nameFiltering = (name: string) => {
  if (name.length <= 2) {
    return name[0] + "*";
  }
  if (name.length > 7) {
    return name.replace(/^(.{3})(.*)(.{3})$/, (_, first, middle, last) => {
      return first + "*".repeat(middle.length) + last;
    });
  }
  return name.replace(/^(.)(.*)(.)$/, (_, first, middle, last) => {
    return first + "*".repeat(middle.length) + last;
  });
};

export const emailFiltering = (email: string) => {
  return email.replace(/^(.{4})([^@]*)(@.*)$/, (_, first, hidden, domain) => {
    return first + "*".repeat(hidden.length) + domain;
  });
};
