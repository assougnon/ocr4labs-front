import { z } from 'zod'

export const accountFormSchema = z.object({
  name: z.string({
    invalid_type_error: "Le nom doit être une chaîne de caractères",
    required_error: "Le nom est requis"
  }).optional(),

  firstName: z.string({
    invalid_type_error: "Le prénom doit être une chaîne de caractères"
  })
    .min(2, {
      message: "Le prénom doit contenir au moins 2 caractères"
    })
    .optional(),

  lastName: z.string({
    invalid_type_error: "Le nom de famille doit être une chaîne de caractères"
  })
    .min(2, {
      message: "Le nom de famille doit contenir au moins 2 caractères"
    })
    .optional(),

  image: z.custom<File>((file) => {
    if (!file) return false;
    const validTypes = ['image/jpeg', 'image/png'];
    const maxSize = 800 * 1024; // 800 Ko


return validTypes.includes(file.type) && file.size <= maxSize;
  }, {
    message: 'Le fichier doit être un JPG ou PNG et ne pas dépasser 800Ko.',
  })
    .optional()
    
    ,

  birthDate: z.string({
    invalid_type_error: "La date est invalide"
  })
    .transform(val => val === '' ? null : val)
    .pipe(
      z.string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, {
          message: "Le format de date doit être JJ-MM-AAAA"
        })
        .nullable()
        .refine(val => {
          if (!val) return true
          const [day, month, year] = val.split('-')
          const date = new Date(`${year}-${month}-${day}`)


return !isNaN(date.getTime())
        }, {
          message: "Date invalide"
        })
    ),

  email: z.string({
    invalid_type_error: "L'email doit être une chaîne de caractères"
  })
    .email({
      message: "Veuillez entrer un email valide"
    })
    .optional(),

  phone: z.string({
    invalid_type_error: "Le téléphone doit être une chaîne de caractères"
  })
    .regex(/^\+?[0-9\s\-]+$/, {
      message: "Veuillez entrer un numéro de téléphone valide"
    })
    .optional(),

  gender: z.enum(['M', 'F'], {
    invalid_type_error: "Le genre doit être 'M' ou 'F'"
  })
    .optional()
    .nullable()
    .default(null),

  bloodType: z.string({
    required_error: "Le groupe sanguin est requis",
    invalid_type_error: "Veuillez sélectionner un groupe sanguin valide"
  })
    .refine(
      val => ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].includes(val),
      { message: "Veuillez sélectionner un groupe sanguin valide" }
    ),

  emergencyContact: z.object({
    name: z.string({
      invalid_type_error: "Le nom du contact doit être une chaîne de caractères"
    })
      .optional()
      .nullable()
      .default(null),

    phone: z.string({
      invalid_type_error: "Le téléphone du contact doit être une chaîne de caractères"
    })
      .regex(/^\+?[0-9\s\-]+$/, {
        message: "Veuillez entrer un numéro de téléphone valide"
      })
      .optional()
      .nullable()
      .default(null),

    relation: z.string({
      invalid_type_error: "La relation doit être une chaîne de caractères"
    })
      .optional()
      .nullable()
      .default(null)
  })
    .optional()
    .nullable()
    .default(null),

  address: z.object({
    street: z.string({
      invalid_type_error: "La rue doit être une chaîne de caractères"
    })
      .optional()
      .nullable()
      .default(null),

    city: z.string({
      invalid_type_error: "La ville doit être une chaîne de caractères"
    })
      .optional()
      .nullable()
      .default(null),

    state: z.string({
      invalid_type_error: "L'état doit être une chaîne de caractères"
    })
      .optional()
      .nullable()
      .default(null),

    country: z.string({
      required_error: "Veuillez selectionner un pays",
      invalid_type_error: "Le pays doit être une chaîne de caractères"
    }),

    zip: z.string({
      invalid_type_error: "Le code postal doit être une chaîne de caractères"
    })
      .optional()
      .nullable()
      .default(null)
  })
    .optional()
    .nullable()
    .default(null),

  roles: z.array(
    z.string({
      invalid_type_error: "Les rôles doivent être des chaînes de caractères"
    })
  )
    .optional()
    .nullable()
    .default([])
    .transform(val => val === null ? [] : val)
})

export type AccountFormValues = z.infer<typeof accountFormSchema>
