// Functions
const generateUID = () => {
  return Math.random().toString(16).slice(2);
};

// Export
export { generateUID };
