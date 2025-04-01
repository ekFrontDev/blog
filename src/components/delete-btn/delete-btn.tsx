import classes from './delete-btn.module.scss'
import { showPopUp } from '../../store/blog-slice'
import { useDispatch } from 'react-redux'

function DeleteBtn() {
  const dispatch = useDispatch()
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
