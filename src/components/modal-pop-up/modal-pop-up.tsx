import classes from './modal-pop-up.module.scss'
import { showPopUp, deleteArticleItem } from '../../store/blog-slice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../../store'

function ModalPopUp({ slugID }) {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const deleteArticle = async () => {
    try {
      await dispatch(deleteArticleItem(slugID)).unwrap()
      navigate('/')
    } catch (e) {
      alert(e)
    }
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes['pop-up-question']}>
        <p>Are you sure to delete this article?</p>
      </div>
      <div className={classes['pop-up-btns']}>
        <button
          className={classes['pop-up-btn-no']}
          onClick={() => dispatch(showPopUp())}
        >
          No
        </button>
        <button className={classes['pop-up-btn-yes']} onClick={deleteArticle}>
          Yes
        </button>
      </div>
    </div>
  )
}

export default ModalPopUp
