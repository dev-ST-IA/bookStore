import * as Yup from "yup";

export const loginSchema = Yup.object().shape(
  {
    emailAddress: Yup.string()
      .email()
      .when("userName", {
        is: (val) => !val,
        then: Yup.string().email().required("E-mail is Required"),
      }),
    password: Yup.string("Enter A Password").required("Enter A Password"),
    userName: Yup.string().when("emailAddress", {
      is: (val) => !val,
      then: Yup.string("Enter Your Name")
        .min(5, "Too Short!")
        .max(20, "Too Long!")
        .required(),
    }),
  },
  [["emailAddress", "userName"]]
);

// var schema = yup.object().shape(
//   {
//     a: yup.string(),
//     b: yup.string(),
//     c: yup.string().when(["a", "b"], {
//       is: (a, b) => !a && !b,
//       then: yup.string().required(),
//     }),
//   },
//   [["a", "b"]]
// ); // <-- HERE!!!!!!!!
