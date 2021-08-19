import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Debe ingresar un correo electrónico válido.")
    .required("Debe ingresar su correo electrónico."),
  password: yup.string().required("Debe ingresar su contraseña."),
});

export default schema;
