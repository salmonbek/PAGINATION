import * as yup from "yup";

const categorySchema = yup.object().shape({
  name: yup.string("Name must be string !").required("Please fill!"),
  image: yup
    .string("img string bo'lishi kerak!")
    .url("This field must be valid url!"),
});

export default categorySchema;
