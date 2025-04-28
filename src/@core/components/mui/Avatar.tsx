'use client'

// React Imports
import { forwardRef, useState } from 'react'

// MUI Imports
import MuiAvatar from '@mui/material/Avatar'
import { lighten, styled } from '@mui/material/styles'
import type { AvatarProps } from '@mui/material/Avatar'

// Type Imports
import type { ThemeColor } from '@core/types'

export type CustomAvatarProps = AvatarProps & {
  color?: ThemeColor
  skin?: 'filled' | 'light' | 'light-static'
  size?: number
}

const Avatar = styled(MuiAvatar)<CustomAvatarProps>(({ skin, color, size, theme }) => ({
  ...(color &&
    skin === 'light' && {
      backgroundColor: `var(--mui-palette-${color}-lightOpacity)`,
      color: `var(--mui-palette-${color}-main)`
    }),
  ...(color &&
    skin === 'light-static' && {
      backgroundColor: lighten(theme.palette[color as ThemeColor].main, 0.84),
      color: `var(--mui-palette-${color}-main)`
    }),
  ...(color &&
    skin === 'filled' && {
      backgroundColor: `var(--mui-palette-${color}-main)`,
      color: `var(--mui-palette-${color}-contrastText)`
    }),
  ...(size && {
    height: size,
    width: size
  })
}))

const CustomAvatar = forwardRef<HTMLDivElement, CustomAvatarProps>((props: CustomAvatarProps, ref) => {
  const { color, skin = 'filled', src, alt, ...rest } = props

  // 👇 Gestion du fallback
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Avatar
      ref={ref}
      color={color}
      skin={skin}
      alt={alt}
      src={imgSrc}
      {...rest}
      imgProps={{
        onError: () => setImgSrc('/default-avatar.png') // chemin local de ton avatar par défaut
      }}
    />
  )
})

export default CustomAvatar
