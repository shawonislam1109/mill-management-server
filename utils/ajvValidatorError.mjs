export const errorMessageHandleWithAjv = (errors) => {
  const simplifiedErrors = errors?.reduce((acc, error) => {
    const field = error.params.errors[0].params.missingProperty;
    const message = error.message;
    acc.push({ field, message });
    return acc;
  }, []);

  return simplifiedErrors;
};
