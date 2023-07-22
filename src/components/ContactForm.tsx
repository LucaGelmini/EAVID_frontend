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
import { useState } from "react";
import mailMutation from "../graphql/mailMutation.graphql";
import client from "../graphql/apolloClient.ts";

type FormValues = {
  body: string;
  email: string;
  subject: string;
};
type FieldCallbackProps = {
  field: FieldInputProps<string>;
  form: FormikProps<FormValues>;
};

type Props = {
  contactMail: string;
};

const ContactForm = ({ contactMail }: Props) => {
  const [formErrors, setFormErrors] = useState<Map<string, string>>(
    new Map([
      ["email", ""],
      ["body", ""],
      ["subject", ""],
    ])
  );

  const validations = {
    validateEmail: (value: string | undefined) => {
      let error;
      if (!value?.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
        error = "Ingresá un correo válido";
        formErrors.set("email", error);
      } else {
        formErrors.delete("email");
      }
      setFormErrors(formErrors);
      return error;
    },
    validateTextArea: (value: string | undefined) => {
      let error;
      if (!value) {
        error = "Comentanos algo";
        formErrors.set("body", error);
      } else {
        formErrors.delete("body");
      }
      setFormErrors(formErrors);
      return error;
    },
    validateSubject: (value: string | undefined) => {
      let error;
      if (!value) {
        error = "¿De qué quiere hablar?";
        formErrors.set("subject", error);
      } else {
        formErrors.delete("subject");
      }
      setFormErrors(formErrors);
      return error;
    },
  };

  return (
    <Formik
      initialValues={{ body: "", email: "", subject: "" }}
      onSubmit={(values, actions) => {
        client
          .mutate({
            mutation: mailMutation,
            variables: {
              to: contactMail,
              from: values.email,
              subject: values.subject,
              body: values.body,
            },
          })
          .then((res) => {
            if (res.data.sendEmail.sent) {
              alert("Correo enviado");
              console.log(res.data);
              actions.setSubmitting(false);
            } else {
              throw new Error("Mail not sent");
            }
          })
          .catch((error) => {
            console.error(error);
            actions.setSubmitting(false);
            alert("Correo NO enviado");
          });
      }}
    >
      {(props) => (
        <Form>
          <Field name="email" validate={validations.validateEmail}>
            {({ field, form }: FieldCallbackProps) => (
              <FormControl
                isInvalid={
                  form.errors.email !== undefined && form.touched.email
                }
              >
                <FormLabel>Correo</FormLabel>
                <Input {...field} placeholder="mail@ejemplo.com" />
                <FormHelperText>Inserte un email válido</FormHelperText>
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name="subject" validate={validations.validateSubject}>
            {({ field, form }: FieldCallbackProps) => (
              <FormControl
                isInvalid={
                  form.errors.subject !== undefined && form.touched.subject
                }
              >
                <FormLabel>Asunto</FormLabel>
                <Input {...field} placeholder="Contacto" />
                <FormHelperText>Inserte un asunto</FormHelperText>
                <FormErrorMessage>{form.errors.subject}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name="body" validate={validations.validateTextArea}>
            {({ field, form }: FieldCallbackProps) => (
              <FormControl
                isInvalid={form.touched.body && form.errors.body !== undefined}
              >
                <FormLabel>Contanos algo</FormLabel>
                <Textarea {...field} lang="es"></Textarea>
                <FormHelperText>No seas tímido</FormHelperText>
                <FormErrorMessage>{form.errors.body}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <FormControl isInvalid={formErrors.size !== 0}>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Enviar
            </Button>
            <FormErrorMessage>{"Hay campos inválidos"}</FormErrorMessage>
          </FormControl>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
