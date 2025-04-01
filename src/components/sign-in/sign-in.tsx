import classes from './sign-in.module.scss'
import { Link } from 'react-router-dom'

function SignIn() {
  return (
    <button className={classes['sign-in-btn']}>
      <Link to="/signin" className={classes.link}>
        Sign In
      </Link>
    </button>
  )
}

export default SignIn
