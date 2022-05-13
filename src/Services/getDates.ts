const days = [] as String[];

for (let i = 1; i < 32; i++)
  if (i < 10) days.push("0" + i);
  else days.push(i.toString());

const years = () => {
  const year = new Date().getFullYear();
  return Array.from({ length: 100 }, (v, i) => year - 100 + i + 1);
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export { days, years, months };
