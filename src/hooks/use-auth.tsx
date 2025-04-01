import { useSelector } from 'react-redux'
import { RootState } from '../store'

function useAuth() {
  const state = useSelector((state: RootState) => state.blog)
  const { email, token, id } = state
  return {
    isAuth: !!email,
    email,
    token,
    id,
  }
}

export default useAuth
