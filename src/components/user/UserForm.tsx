'use client'

import React, { useState, useMemo, useEffect } from 'react'
import type { ChangeEvent } from 'react'


import { fr } from 'date-fns/locale'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { format } from 'date-fns'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import type { SelectChangeEvent } from '@mui/material/Select'

// Schemas
import Divider from '@mui/material/Divider'

import { CardActions } from '@mui/material'

import axios from 'axios'

import type { AccountFormValues} from '../../schemas/account.schema';
import { accountFormSchema } from '../../schemas/account.schema'

import { CountrySelect } from '@components/country/ContrySelect'

// Components
import CustomTextField from '@core/components/mui/TextField'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'





const AccountDetails = () => {
  // Form setup
  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      gender: '',
      bloodType: '',
      birthDate: '',
      roles: [],
      address: {},
      emergencyContact: {}
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/user/profile')
      const userData = response.data

      reset({
        ...userData,
        // Convert API date (likely yyyy-MM-dd) to display format (dd-MM-yyyy)
        birthDate: userData.birthDate
          ? format(new Date(userData.birthDate), 'dd-MM-yyyy')
          : '',
        address: userData.address || {},
        emergencyContact: userData.emergencyContact || {},
      })
    }

    fetchData()
  }, [reset])


  // States
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')






  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    const files = e.target.files

    if (files && files.length !== 0) {
      reader.onload = () => {
        const result = reader.result as string

        setImgSrc(result)
        setValue('image', result)
      }

      reader.readAsDataURL(files[0])
    }
  }

  const handleImageReset = () => {
    setImgSrc('/images/avatars/1.png')
    setValue('image', '')
  }

  const onSubmit = async (data: AccountFormValues) => {


    console.log('Données validées:', data);

  }
  const onError = (errors: any) => {
    console.error("Erreurs de validation:", errors);
  };


  return (
    <Card>
      <CardContent className='mbe-4'>
        <div className='flex max-sm:flex-col items-center gap-6'>
          <img
            height={100}
            width={100}
            className='rounded'
            src={imgSrc}
            alt='Profile'
          />
          <div className='flex flex-grow flex-col gap-4'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button
                component='label'
                variant='contained'
                htmlFor='account-settings-upload-image'
              >
                Changer la photo
                <input
                  hidden
                  type='file'
                  accept='image/png, image/jpeg'
                  onChange={handleImageUpload}
                  id='account-settings-upload-image'
                />
              </Button>
              <Button
                variant='tonal'
                color='secondary'
                onClick={handleImageReset}
              >
                Réinitialiser
              </Button>
            </div>
            <Typography>{errors.lastName?.message}leon </Typography> <Typography>Formats acceptés : JPG, PNG. Taille max : 800Ko</Typography>

          </div>
        </div>
      </CardContent>

      <Grid size={{ xs: 12 }}>
        <Divider />
      </Grid>


      <form  onSubmit={handleSubmit(onSubmit, onError)}>


        <CardContent>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12 }}>
              <Typography variant='body2' className='font-medium'>
                1. Détail du Compte
              </Typography>
            </Grid>

            {/* Informations personnelles */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='Prénom'
                {...register('firstName')}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='Nom'
                {...register('lastName')}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="birthDate"
                control={control}
                render={({ field }) => {
                  // Convert display format (dd-MM-yyyy) to Date object
                  const parseDate = (value: string): Date | null => {
                    if (!value) return null
                    const [day, month, year] = value.split('-')
                    return new Date(`${year}-${month}-${day}`)
                  }

                  // Convert Date to display format (dd-MM-yyyy)
                  const formatDate = (date: Date | null): string => {
                    if (!date || isNaN(date.getTime())) return ''
                    return format(date, 'dd-MM-yyyy')
                  }

                  return (
                    <AppReactDatepicker
                      selected={parseDate(field.value)}
                      onChange={(date: Date | null) => {
                        field.onChange(formatDate(date))
                      }}
                      showYearDropdown
                      showMonthDropdown
                      dropdownMode="select"
                      placeholderText="JJ-MM-AAAA"
                      dateFormat="dd-MM-yyyy"
                      customInput={
                        <CustomTextField
                          fullWidth
                          label="Date de naissance"
                          error={!!errors.birthDate}
                          helperText={errors.birthDate?.message}
                        />
                      }
                      locale={fr}
                      peekNextMonth
                      showMonthYearPicker={false}
                    />
                  )
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='Email'
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>


            <Grid size={{ xs: 12 }}>
              <Divider />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant='body2' className='font-medium'>
                2. données personnelles
              </Typography>
            </Grid>


            {/* Coordonnées */}

            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                select
                fullWidth
                label='Genre'
                value={watch('gender') ?? ''}
                {...register('gender')}
              >
                <MenuItem value='M'>Homme</MenuItem>
                <MenuItem value='F'>Femme</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='Téléphone'
                {...register('phone')}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>

            {/* Adresse */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                select
                fullWidth
                defaultValue=""
                label='Groupe Sanguin'
                value={watch('bloodType') ?? ''}
                {...register('bloodType')}
                error={!!errors.bloodType}
                helperText={errors.bloodType?.message}
              >
                <MenuItem value='A+'>Groupe A+</MenuItem>
                <MenuItem value='A-'>Groupe A-</MenuItem>
                <MenuItem value='B+'>Groupe B+</MenuItem>
                <MenuItem value='B-'>Groupe B-</MenuItem>
                <MenuItem value='AB+'>Groupe AB+</MenuItem>
                <MenuItem value='AB-'>Groupe AB-</MenuItem>
                <MenuItem value='O+'>Groupe O+</MenuItem>
                <MenuItem value='O-'>Groupe O-</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CountrySelect
                control={control}
                name="address.country"
                required
                label="Pays de résidence*"
                {...register('address.country')}
                error={!!errors.address?.message}
                helperText={errors.address?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='Ville'
                {...register('address.city')}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='Région'
                {...register('address.state')}
              />
            </Grid>


            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='Code postal'
                {...register('address.zip')}
              />
            </Grid>

            {/* Contact d'urgence */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='Nom du contact'
                {...register('emergencyContact.name')}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='Téléphone du contact'
                {...register('emergencyContact.phone')}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='Relation'
                {...register('emergencyContact.relation')}
              />
            </Grid>


            <Divider />
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button type='submit' variant='contained' className='mie-2'>
            Submit
          </Button>

        </CardActions>


      </form>
    </Card>
  )
}

export default AccountDetails
