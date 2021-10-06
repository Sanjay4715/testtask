export const nameValidator = (value) =>
  !value
    ? "Full Name is required"
    : value.length < 7
    ? "Full Name should be at least 7 characters long."
    : "";

const phoneRegex = new RegExp(/^[0-9 ()+-]+$/);
export const mobileValidator = (value) =>
  !value
    ? "Phone Number is Required"
    : phoneRegex.test(value)
    ? ""
    : "Not a valid phone number.";

const emailRegex = new RegExp(/\S+@\S+\.\S+/);
export const emailValidator = (value) =>
  !value
    ? "Email field is required."
    : emailRegex.test(value)
    ? ""
    : "Email is not in a valid format.";
