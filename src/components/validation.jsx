import react from "react";
import * as yup from "yup";

const schemaSignup = yup.object().shape({
  name: yup
    .string()
    .min(2)
    .required("Name should be at least 2 characters long"),
  email: yup.string().email().required("Email is not correct"),
  password: yup
    .string()
    .min(6)
    .max(10)
    .required("Password should have between 6 and 10 characters"),
  passwordConfirm: yup.string().oneOf([yup.ref("password"), null]),
});

export { schemaSignup };
