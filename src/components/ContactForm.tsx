import { Field, Form, Formik, FieldInputProps, FormikProps } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Input,
  Textarea,
} from "@chakra-ui/react";

type FormValues = {
  comentario: string;
  name: string;
};
type FieldCallbackProps = {
  field: FieldInputProps<string>;
  form: FormikProps<FormValues>;
};

// type Props = {};

const ContactForm = () => {
  function validateName(value: string | undefined) {
    let error;
    if (!value?.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      error = "Ingresá un correo válido";
    }
    return error;
  }
  function validateTextArea(value: string | undefined) {
    let error;
    if (!value) {
      error = "Comentanos algo";
    }
    return error;
  }

  return (
    <Formik
      initialValues={{ name: "" }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {(props) => (
        <Form>
          <Field name="comentario" validate={validateTextArea}>
            {({ field, form }: FieldCallbackProps) => (
              <FormControl
                isInvalid={
                  form.touched.comentario &&
                  form.errors.comentario !== undefined
                }
              >
                <FormLabel>Contanos algo</FormLabel>
                <Textarea {...field} lang="es"></Textarea>
                <FormHelperText>No seas tímido</FormHelperText>
                <FormErrorMessage>{form.errors.comentario}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name="name" validate={validateName}>
            {({ field, form }: FieldCallbackProps) => (
              <FormControl
                isInvalid={form.errors.name !== undefined && form.touched.name}
              >
                <FormLabel>First name</FormLabel>
                <Input {...field} placeholder="name" />
                <FormHelperText>Mail válido</FormHelperText>
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
