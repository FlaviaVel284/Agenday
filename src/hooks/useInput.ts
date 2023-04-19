import { useState } from "react";

const useInput = (validateValue: (value: string) => {}) => {
  const [enteredValue, setEnteredValue] = useState("");
  const valueIsValid = validateValue(enteredValue);

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.currentTarget.value);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    valueChangeHandler,
  };
};

export default useInput;
