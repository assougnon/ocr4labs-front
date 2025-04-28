'use client'

import { useRef, useState, useEffect } from 'react'
import type { MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuList from '@mui/material/MenuList'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import { signOut, useSession } from 'next-auth/react'
import { useSettings } from '@core/hooks/useSettings'

const BadgeContentSpan = styled('span')({
  width: 8,
  height: 8,
  borderRadius: '50%',
  cursor: 'pointer',
  backgroundColor: 'var(--mui-palette-success-main)',
  boxShadow: '0 0 0 2px var(--mui-palette-background-paper)'
})

const UserDropdown = () => {
  // States
  const [open, setOpen] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string>('')
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(0)

  // Refs
  const anchorRef = useRef<HTMLDivElement>(null)

  // Hooks
  const router = useRouter()
  const { data: session } = useSession()
  const { settings } = useSettings()

  // Cache duration (24 hours)
  const CACHE_DURATION = 24 * 60 * 60 * 1000

  useEffect(() => {
    const initializeAvatar = async () => {
      if (!session?.user?.image) {
        setAvatarUrl('/images/avatars/1.png')
        setIsImageLoaded(true)
        return
      }

      // Check cache first
      const cachedAvatar = localStorage.getItem('cachedAvatar')
      const cacheTime = localStorage.getItem('avatarCacheTime')
      const now = Date.now()

      if (cachedAvatar && cacheTime && now - parseInt(cacheTime) < CACHE_DURATION) {
        setAvatarUrl(cachedAvatar)
        setIsImageLoaded(true)
        return
      }

      // Optimize Google avatar URL
      const optimizedUrl = session.user.image.includes('googleusercontent.com')
        ? session.user.image.replace(/=s\d+-c$/, '=s384-c')
        : session.user.image

      // Verify image availability
      try {
        await verifyImageAvailability(optimizedUrl)
        setAvatarUrl(optimizedUrl)
        localStorage.setItem('cachedAvatar', optimizedUrl)
        localStorage.setItem('avatarCacheTime', now.toString())
      } catch {
        setAvatarUrl('/images/avatars/1.png')
      } finally {
        setIsImageLoaded(true)
      }
    }

    initializeAvatar()
  }, [session?.user?.image])

  const verifyImageAvailability = (url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = url
      img.onload = () => resolve()
      img.onerror = () => reject()
      // Timeout after 3 seconds
      setTimeout(() => reject(), 3000)
    })
  }

  const handleDropdownOpen = () => {
    setOpen(prev => !prev)
  }

  const handleDropdownClose = (event?: MouseEvent<HTMLLIElement> | (MouseEvent | TouchEvent), url?: string) => {
    if (url) {
      router.push(url)
    }

    if (anchorRef.current && anchorRef.current.contains(event?.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  const handleUserLogout = async () => {
    try {
      // Clear avatar cache on logout
      localStorage.removeItem('cachedAvatar')
      localStorage.removeItem('avatarCacheTime')

      await signOut({ callbackUrl: '/login' })
    } catch (error) {
      console.error(error)
    }
  }

  const handleAvatarError = () => {
    setAvatarUrl('/images/avatars/1.png')
    localStorage.removeItem('cachedAvatar')
    localStorage.removeItem('avatarCacheTime')
  }

  return (
    <>
      <Badge
        ref={anchorRef}
        overlap='circular'
        badgeContent={<BadgeContentSpan onClick={handleDropdownOpen} />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        className='mis-2'
      >
        <div className='relative bs-[38px] is-[38px]'>
          {/* Fallback avatar */}
          {!isImageLoaded && (
            <Avatar
              className='absolute bs-[38px] is-[38px]'
              src='/images/avatars/1.png'
              alt='Loading'
            />
          )}

          {/* Main avatar with smooth transition */}
          <Avatar
            ref={anchorRef}
            alt={session?.user?.name || 'User Avatar'}
            src={avatarUrl}
            onClick={handleDropdownOpen}
            className='cursor-pointer bs-[38px] is-[38px]'
            style={{
              opacity: isImageLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease',
              position: isImageLoaded ? 'relative' : 'absolute'
            }}
            imgProps={{
              onError: handleAvatarError,
              loading: 'eager',
              decoding: 'async'
            }}
          />
        </div>
      </Badge>

      <Popper
        open={open}
        transition
        disablePortal
        placement='bottom-end'
        anchorEl={anchorRef.current}
        className='min-is-[240px] !mbs-3 z-[1]'
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top'
            }}
          >
            <Paper className={settings.skin === 'bordered' ? 'border shadow-none' : 'shadow-lg'}>
              <ClickAwayListener onClickAway={e => handleDropdownClose(e as MouseEvent | TouchEvent)}>
                <MenuList>
                  <div className='flex items-center plb-2 pli-6 gap-2' tabIndex={-1}>
                    <Avatar
                      alt={session?.user?.name || 'User Avatar'}
                      src={avatarUrl}
                      imgProps={{
                        onError: handleAvatarError
                      }}
                    />
                    <div className='flex items-start flex-col'>
                      <Typography className='font-medium' color='text.primary'>
                        {session?.user?.name || 'User'}
                      </Typography>
                      <Typography variant='caption'>{session?.user?.email || ''}</Typography>
                    </div>
                  </div>
                  <Divider className='mlb-1' />
                  <MenuItem className='mli-2 gap-3' onClick={e => handleDropdownClose(e, '/pages/user-profile')}>
                    <i className='tabler-user' />
                    <Typography color='text.primary'>My Profile</Typography>
                  </MenuItem>
                  <MenuItem className='mli-2 gap-3' onClick={e => handleDropdownClose(e, '/account/details')}>
                    <i className='tabler-settings' />
                    <Typography color='text.primary'>Settings</Typography>
                  </MenuItem>
                  <MenuItem className='mli-2 gap-3' onClick={e => handleDropdownClose(e, '/pages/pricing')}>
                    <i className='tabler-currency-dollar' />
                    <Typography color='text.primary'>Pricing</Typography>
                  </MenuItem>
                  <MenuItem className='mli-2 gap-3' onClick={e => handleDropdownClose(e, '/pages/faq')}>
                    <i className='tabler-help-circle' />
                    <Typography color='text.primary'>FAQ</Typography>
                  </MenuItem>
                  <div className='flex items-center plb-2 pli-3'>
                    <Button
                      fullWidth
                      variant='contained'
                      color='error'
                      size='small'
                      endIcon={<i className='tabler-logout' />}
                      onClick={handleUserLogout}
                      sx={{ '& .MuiButton-endIcon': { marginInlineStart: 1.5 } }}
                    >
                      Logout
                    </Button>
                  </div>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default UserDropdown
