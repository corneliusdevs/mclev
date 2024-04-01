import * as z from 'zod';

const phoneNumberRegex = /^\+?\d{1,3}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const ukAndEuropePostalCodeRegex = /^(GIR 0AA|[A-PR-UWYZ](?:\d{0,2}|[A-HK-Y]\d{0,1}|[A-HK-Y]\d[A-Z])? ?\d[A-Z]{2}|(F-)?\d{4})$/i;

const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])(?:-(\d{2}))?$/;


export const personalDetailsSchema = z.object({
  name: z.string().min(3, { message: 'Name should be at least 3 characters long' }),
  phoneNumber: z.string().regex(phoneNumberRegex, { message: 'Invalid phone number'}),
  email: z.string().email({message: 'Please enter a valid email address' }),
  postcode: z.string().regex(ukAndEuropePostalCodeRegex, { message: 'Seems like the code entered is incorrect, please try another format'}),
  prefferedDate: 
  z.string().regex(dateRegex, "Date should be in DD-MM or DD-MM-YY format." ),
  // prefferedTime: z.string().optional(),
  additionalNotes: z
   .string()
//    .min(8, { message: 'Password should be at least 8 characters long' })
//    .regex(/^\S*$/, { message: 'Password should not contain white spaces' })
//    .regex(/^[a-zA-Z0-9!@#$%&*_?]+$/, {
//      message: 'Password should only contain letters, numbers, and special characters like ! @ # $ % & * _?',
//    }),
});

export type PersonalDetailsSchemaType = z.infer<typeof personalDetailsSchema>;

