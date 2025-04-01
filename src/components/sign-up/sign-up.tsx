import classes from './sign-up.module.scss'
import { Link } from 'react-router-dom'

function SignUp() {
  return (
    <button className={classes['sign-up-btn']}>
      <Link to="/signup" className={classes.link}>
        Sign Up
      </Link>
    </button>
  )
}

export default SignUp
