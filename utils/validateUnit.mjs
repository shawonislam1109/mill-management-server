export const validateUnit = (value) => {
  // Define your custom validation logic for unit here
  switch (value) {
    case "carton":
      return ["carton", "box", "pies", "pageUnit"];
    case "box":
      return ["box", "pies", "pageUnit"];
    case "pies":
      return ["pies", "pageUnit"];
    case "pageUnit":
      return ["pageUnit"];
    default:
      return [];
  }
};
