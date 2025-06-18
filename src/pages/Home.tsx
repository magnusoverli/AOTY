import Layout from '../components/layout'
import LoginForm from '../components/LoginForm'
import AuthHome from '../components/Home'
import { authClient } from '../auth-client'

export default function Home() {
  const { data: session } = authClient.useSession()
  return (
    <Layout showHeader={!!session?.user}>
      {session?.user ? <AuthHome /> : <LoginForm />}
    </Layout>
  )
}
