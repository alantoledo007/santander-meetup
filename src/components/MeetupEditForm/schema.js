import * as yup from "yup";

const date_message = "Se requiere una fecha de la meetup.";

const schema = yup.object().shape({
  datetime: yup
    .string()
    .min(16, date_message)
    .max(16, date_message)
    .required(date_message),
  check_in_code: yup
    .string()
    .min(4, "Ingresa 4 caracteres como mínimo.")
    .max(8, "Como máximo se permiten 8 caracteres.")
    .required("Debe ingresar un código."),
});

export default schema;
