import { memo } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { auth } from '../../firebase-config'

interface MenuProps {
  isLoggedIn: boolean
  hasOrder: boolean
}

const MenuComponent = ({ isLoggedIn, hasOrder } : MenuProps) => {
  if (!isLoggedIn)
    return null

  return (
    <Menu secondary attached>
      <Menu.Item onClick={() => auth.signOut()}>
        <Icon name='sign out' />

        Вийти
      </Menu.Item>

      <Menu.Menu className='right'>
        {
          hasOrder && <Menu.Item as={(props: any) => <Link to='/order' {...props} />}>
            <Icon name='shop' />

            Перейти до замовлення
          </Menu.Item>
        }

        <Menu.Item as={(props: any) => <Link to='/orders' {...props} />}>
          <Icon name='history' />

          Історія замовлень
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default memo(MenuComponent)
