import { Redirect } from 'react-router-dom'
import { Grid, Form, Segment, Message } from 'semantic-ui-react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useState } from 'react'
import { auth } from '../../firebase-config'

const SignInPage = () => {
  const [user, isFirebaseLoading] = useAuthState(auth)

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const [error, setError] = useState<string>()

  if (user)
    return <Redirect to='/' />

  const handleSignIn = async () => {
    setIsLoading(true)

    try {
      await auth.signInWithEmailAndPassword(email, password)

      setError(undefined)
    } catch (e) {
      setError(e.message)
    }

    setIsLoading(false)
  }

  return (
    <Grid className='sign-in-page' verticalAlign='middle' textAlign='center'>
      <Grid.Column>
        {error && <Message error content={error} />}

        <Form onSubmit={handleSignIn} loading={isLoading || isFirebaseLoading}>
          <Segment stacked>
            <Form.Input type='email' placeholder='Адрес e-mail' icon='user' iconPosition='left' value={email} onChange={e => setEmail(e.target.value)} />

            <Form.Input type='password' placeholder='Пароль' icon='lock' iconPosition='left' value={password} onChange={e => setPassword(e.target.value)} />

            <Form.Button icon='sign in' content='Увійти' fluid />
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  )
}

export default SignInPage
