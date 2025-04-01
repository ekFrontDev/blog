import classes from './delete-btn.module.scss'
import { showPopUp } from '../../store/blog-slice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'

function DeleteBtn() {
  const dispatch = useDispatch<AppDispatch>()
  return (
    <button
      className={classes['delete-btn']}
      onClick={() => dispatch(showPopUp())}
    >
      Delete
    </button>
  )
}

export default DeleteBtn
