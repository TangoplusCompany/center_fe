export const usePhoneFiltering = (phone: string) => {
  return phone.replace(/(\d{3})-(\d{4})-(\d{4})/, "$1-****-$3");
};

export const useNameFiltering = (name: string) => {
  if (name.length <= 2) {
    return name[0] + "*";
  }

  return name.replace(/^(.)(.*)(.)$/, (_, first, middle, last) => {
    return first + "*".repeat(middle.length) + last;
  });
};

export const useEmailFiltering = (email: string) => {
  return email.replace(/^(.{4})([^@]*)(@.*)$/, (_, first, hidden, domain) => {
    return first + "*".repeat(hidden.length) + domain;
  });
};
