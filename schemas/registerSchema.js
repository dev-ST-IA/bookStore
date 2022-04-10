import * as Yup from "yup";

let minDate = new Date();
let maxDate = new Date();
minDate.setFullYear(minDate.getFullYear() - 70, 0, 1);
maxDate.setFullYear(maxDate.getFullYear() - 18, 0, 1);

export const registerSchema = Yup.object({
  firstName: Yup.string("Enter Your Name")
    .min(2, "Too Short!")
    .max(60, "Too Long!")
    .required("Required"),
  lastName: Yup.string("Enter Your Name")
    .min(2, "Too Short!")
    .max(60, "Too Long!")
    .required("Required"),
  phoneNumber: Yup.string("Enter Your Date Of Contact Number")
    .min(9, "Enter a Valid Number")
    .max(14, "Enter a Valid Number")
    .required("Phone Number is Required"),

  emailAddress: Yup.string().email().required("E-mail is Required"),

  password: Yup.string("Enter A Password")
    .min(7, "Too Short")
    .required("Enter A Password"),

  cPassword: Yup.string("Enter A Same Password")
    .oneOf([Yup.ref("password"), null], "Passwords Must Match")
    .required("Required Field & Passwords Must Match"),

  userName: Yup.string("Enter Your Name")
    .min(5, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
});
