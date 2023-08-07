import { z } from "zod";

const email = z.string().email();

export type EmailValidated = z.infer<typeof email> & { kind: "Email" };

export function isEmail(str: string): str is EmailValidated {
  return email.safeParse(str).success;
}
