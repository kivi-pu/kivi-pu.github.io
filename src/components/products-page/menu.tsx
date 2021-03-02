import { memo } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import useWindowSize from '../../hooks/use-window-size'
import { auth } from '../../firebase-config'

interface MenuProps {
  isLoggedIn: boolean
  hasOrder: boolean
}

const MenuComponent = ({ isLoggedIn, hasOrder }: MenuProps) => {
  const { width } = useWindowSize()

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

            {width > 600 ? 'Перейти до замовлення' : 'Замовлення'}
          </Menu.Item>
        }

        <Menu.Item as={(props: any) => <Link to='/orders' {...props} />}>
          <Icon name='history' />

          {width > 600 ? 'Історія замовлень' : 'Історія'}
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default memo(MenuComponent)
