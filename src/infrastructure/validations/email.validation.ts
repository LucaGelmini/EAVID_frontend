import { z } from "zod";

const email = z.string().email();

export type ZodEmail = z.infer<typeof email> & { kind: "Email" };

export function isEmail(str: string): str is ZodEmail {
  return email.safeParse(str).success;
}
