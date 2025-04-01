import classes from './create-article-btn.module.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

export default function CreateArticle() {
  const dataArticles = useSelector((state: RootState) => state.blog)
  const { token } = dataArticles
  const pathBtn = token ? '/create' : '/signin'
  return (
    <button className={classes['create-article-btn']}>
      <Link to={pathBtn} className={classes.link}>
        Create article
      </Link>
    </button>
  )
}
