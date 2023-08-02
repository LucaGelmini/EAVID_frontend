export type Email<ValidatedEmail> = {
  to: ValidatedEmail;
  from: ValidatedEmail;
  subject: string;
  body: string;
};
