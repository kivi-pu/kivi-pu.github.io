import { useEffect, useState, Fragment } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Redirect, Link } from 'react-router-dom'
import { Segment, Table, Menu, Icon, Message } from 'semantic-ui-react'

import { auth, firestore } from '../../firebase-config'

interface OrderRecord {
  date: Date
  products: { name: string, amount: number }[]
}

async function load(uid: string): Promise<OrderRecord[]> {
  const response = await firestore.collection('orders').where('uid', '==', uid).orderBy('date', 'desc').get()

  const results = response.docs.map(async x => {
    const productsResponse = await x.ref.collection('products').get()

    const products = productsResponse.docs.map(p => ({ name: p.get('name'), amount: p.get('amount') }))

    return { date: x.get('date').toDate(), products }
  })

  return await Promise.all(results)
}

const OrderHistoryPage = () => {
  const [user, isFirebaseLoading] = useAuthState(auth)

  const [records, setRecords] = useState<OrderRecord[]>([])

  const [isLoading, setIsLoading] = useState(true)

  const [error, setError] = useState<string>()

  useEffect(() => {
    if (!user) return

    load(user.uid).then(records => {
      setRecords(records)

      setError(undefined)

      setIsLoading(false)
    }).catch(e => {
      setError(e.message)

      setIsLoading(false)
    })
    // warning on setter functions missing from deps, that should be safe
    // eslint-disable-next-line
  }, [user])

  if (!isFirebaseLoading && !user)
    return <Redirect to='/' />

  return (
    <>
      <Menu secondary attached>
        <Menu.Item as={(props: any) => <Link to='/' {...props} />}>
          <Icon name='arrow left' />

          Назад
        </Menu.Item>
      </Menu>

      <Segment basic attached loading={isLoading || isFirebaseLoading}>
        {error && <Message error content={error} />}

        {records.length === 0
          ? <Message info content='У вас ще немає замовлень' />
          : <Table unstackable compact='very'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Назва</Table.HeaderCell>

                <Table.HeaderCell>Кількість</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            {records.map(({ date, products }, index) => <Fragment key={index}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan={2}>{date.toString()}</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {products.map(({ name, amount }, index) => <Table.Row key={index}>
                  <Table.Cell>{name}</Table.Cell>

                  <Table.Cell>{amount}</Table.Cell>
                </Table.Row>
                )}
              </Table.Body>
            </Fragment>
            )}
          </Table>
        }
      </Segment>
    </>
  )
}

export default OrderHistoryPage
