import * as yup from "yup";

const personSchema = yup.object().shape({
  name: yup.string("Name must be string !").required("Please fill!"),
  age: yup
    .number()
    .required()
    .positive("Age must be a positive number !")
    .integer("Age must be integer!"),
  email: yup.string().email("This field must be valid email!"),
  website: yup.string().url("This field must be valid url!"),
  date: yup.date().default(function () {
    return new Date();
  }),
});

export default personSchema;
