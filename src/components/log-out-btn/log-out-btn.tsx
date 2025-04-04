import classes from './log-out-btn.module.scss'
import { Link } from 'react-router-dom'
import { logOutProfile } from '../../store/blog-slice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'

function LogOut() {
  const dispatch = useDispatch<AppDispatch>()
  return (
    <button
      className={classes['log-out-btn']}
      onClick={() => dispatch(logOutProfile())}
    >
      <Link to="/logout" className={classes.link}>
        Log Out
      </Link>
    </button>
  )
}

export default LogOut
