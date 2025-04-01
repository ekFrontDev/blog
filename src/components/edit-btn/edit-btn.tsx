import classes from './edit-btn.module.scss'
import { Link } from 'react-router-dom'

function EditBtn() {
  return (
    <Link to="/edit">
      <button className={classes['edit-btn']}>Edit</button>
    </Link>
  )
}

export default EditBtn
