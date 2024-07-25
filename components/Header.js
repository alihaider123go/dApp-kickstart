import React from 'react';
import { MenuMenu, MenuItem, Menu,Icon,Button } from 'semantic-ui-react'
import { useRouter } from 'next/navigation'

const Header = (props) => {
  const router = useRouter()

  return (
    <Menu style={{marginTop:'10px'}}>
        <MenuItem
          name='Kickstart'
          href='/'
        >
          Kickstart
        </MenuItem>
        <MenuMenu position='right'>
          <MenuItem
            name='campaigns'
            href='/'
          >
            Campaigns
          </MenuItem>

          <MenuItem
            name='add'
          >
            <Button icon='add circle' primary onClick={() => router.push('/campaigns/new')}/>
          </MenuItem>
        </MenuMenu>
      </Menu>
  );
};

export default Header;