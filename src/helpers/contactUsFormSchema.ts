import * as z from 'zod';

const phoneNumberRegex = /^\+?\d{1,3}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;


export const contactUsFormSchema = z.object({
  name: z.string().min(3, { message: 'Name should be at least 3 characters long' }),
  email: z.string().email({message: 'Please enter a valid email address' }),
  subject: z.string().min(3, { message: 'Subject must no be empty' }),
  yourMessage: z
   .string()
});

export type ContactUsFormSchemaType = z.infer<typeof contactUsFormSchema>;

