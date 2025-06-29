import Layout from '../components/layout'
import Dashboard from '../components/Dashboard'
import Login from '../components/Login'
import { useLogto } from '@logto/react'

export default function Home() {
  const { isAuthenticated } = useLogto()
  return (
    <Layout showHeader={isAuthenticated}>
      {isAuthenticated ? <Dashboard /> : <Login />}
    </Layout>
  )
}
