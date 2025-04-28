import { useMemo } from 'react'

import type { FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form'


import { countries } from 'countries-list'

import ReactCountryFlag from 'react-country-flag'

import CustomAutocomplete from '@core/components/mui/Autocomplete'
import CustomTextField from '@core/components/mui/TextField'

export function CountrySelect<T extends FieldValues>({
                                                       control,
                                                       name,
                                                       required = false,
                                                       label = 'Pays'
                                                     }: CountrySelectProps<T>) {
  const countryOptions = useMemo(() => {
    return Object.entries(countries).map(([code, data]) => ({
      code,
      name: data.name,
      phone: data.phone,
      emoji: data.emoji
    }))
  }, [])

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? 'Ce champ est obligatoire' : false }}
      render={({ field, fieldState }) => {
        // Trouve l'option correspondant à la valeur actuelle
        const currentValue = countryOptions.find(option =>
          option.code === field.value || option.name === field.value
        ) || null

        return (
          <CustomAutocomplete
            options={countryOptions}
            value={currentValue}
            getOptionLabel={(option) => `${option.name} (${option.code})`}
            isOptionEqualToValue={(option, value) => option.code === value?.code}
            renderOption={(props, option) => {
              const { key, ...restProps } = props


return (
                <li key={key} {...restProps} className="flex items-center gap-3 ml-3">
                  <ReactCountryFlag
                    countryCode={option.code}
                    svg
                    style={{ width: '1.5em', height: '1.5em' }}
                    aria-label={option.name}
                  />
                  <div>
                    <div className="font-medium">{option.name}</div>
                  </div>
                </li>
              )
            }}
            onChange={(_, newValue) => {
              // Stocke le code du pays plutôt que le nom
              field.onChange(newValue?.code || '')
            }}
            renderInput={(params) => (
              <CustomTextField
                {...params}
                fullWidth
                label={label}
                placeholder="Rechercher un pays..."
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
            noOptionsText="Aucun pays trouvé"
          />
        )
      }}
    />
  )
}
