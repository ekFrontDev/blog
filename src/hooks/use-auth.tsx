import { useSelector } from 'react-redux'

function useAuth() {
  const state = useSelector((state) => state.blog)
  const { email, token, id } = state
  return {
    isAuth: !!email,
    email,
    token,
    id,
  }
}

export default useAuth
