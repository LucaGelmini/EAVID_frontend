import { Field, Form, Formik } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Input,
  Textarea,
} from "@chakra-ui/react";

type Props = {};

const ContactForm = (props: Props) => {
  function validateName(value: string | undefined) {
    let error;
    if (!value) {
      error = "Name is required";
    } else if (value.toLowerCase() !== "naruto") {
      error = "Jeez! You're not a fan 😱";
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
      initialValues={{ name: "Sasuke" }}
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
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.comentario && form.touched.comentario}
              >
                <FormLabel>Contanos algo</FormLabel>
                <Textarea {...field} lang="es"></Textarea>
                <FormHelperText>No seas tímido</FormHelperText>
                <FormErrorMessage>{form.errors.comentario}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name="name" validate={validateName}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel>First name</FormLabel>
                <Input {...field} placeholder="name" />
                <FormHelperText>aguante Naruto</FormHelperText>
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
