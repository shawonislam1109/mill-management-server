const validationError = (data) => {
  if (data) {
    const errors = Object.values(data?.errors || {}).map((error) => {
      return {
        field: error.path,
        value: error.value,
        message: error.message,
      };
    });

    console.log("errors", errors);
    return errors;
  }
};

export default validationError;
