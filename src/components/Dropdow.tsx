import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { signOut } from 'next-auth/react'
import { HiBars3 } from 'react-icons/hi2'

export function Dropdown() {
  function handleLogoutClick() {
    signOut()
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button aria-label="Opções de conta">
          <HiBars3 size={24} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className='p-2 bg-white rounded-md shadow-md'>
          <DropdownMenu.Item>
            <button className='text-primary text-sm font-semibold hover:border-0 hover:text-primaryDarker' onClick={handleLogoutClick}>
              Logout
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}