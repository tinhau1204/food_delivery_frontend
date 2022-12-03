const requirements = [
  { regex: /[0-9]/, label: "Includes number" },
  { regex: /[a-z]/, label: "Includes lowercase letter" },
  { regex: /[A-Z]/, label: "Includes uppercase letter" },
  { regex: /.{8,}$/, label: "Includes at least 8 characters" },
];

export default requirements;
