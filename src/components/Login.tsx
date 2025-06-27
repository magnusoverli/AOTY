import { useLogto } from '@logto/react'
import { Button } from './ui/button'

export default function Login() {
  const { signIn } = useLogto()
  return (
    <Button onClick={() => signIn(window.location.href)}>Log in</Button>
  )
}
