import { useEffect, useState } from "react";

const useInput = (validateValue: (value: string) => {}) => {
  const [enteredValue, setEnteredValue] = useState("");
  const valueIsValid = validateValue(enteredValue);

  const [isTouched, setIsTouched] = useState(false);
  const hasError = !valueIsValid && isTouched;

  useEffect(() => {
    setIsTouched(true);
  }, [enteredValue]);

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.currentTarget.value);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
  };
};

export default useInput;
