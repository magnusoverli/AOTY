import Layout from '../components/layout'
import LoginForm from '../components/LoginForm'
import Dashboard from '../components/Dashboard'
import { authClient } from '../auth-client'

export default function Home() {
  const { data: session } = authClient.useSession()
  return (
    <Layout showHeader={!!session?.user}>
      {session?.user ? <Dashboard /> : <LoginForm />}
    </Layout>
  )
}
