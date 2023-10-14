import {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function useAuthFormAndValidation(scheme) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const user = useContext(CurrentUserContext)

  function validateForm() {
    const {error} = scheme.validate(values, {abortEarly: false});
    if (error) {
      const validationErrors = {};
      error.details.forEach((detail) => {
        validationErrors[detail.context.key] = detail.message;
      });
      setErrors(validationErrors);
      setIsValid(false);
    } else {
      setErrors({});
      setIsValid(true);
    }
  }

  function handleChange(e) {
    const {name, value} = e.target;
    setValues((prev) => ({...prev, [name]: value}));
  }

  useEffect(() => {
    validateForm();
    // profile validation
    if ((values["email"] === user.email) && (values["name"] === user.name)) {
      setIsValid(false);
    }
  }, [values]);
  return {values, errors, isValid, handleChange, setValues, setIsValid, setErrors}
}