import ProfileItem from '../profile-item/profile-item'
import classes from './article-preview-item.module.scss'
import { useDispatch } from 'react-redux'
import { getArticle } from '../../store/blog-slice'
import { Link } from 'react-router-dom'

function ArticlePreviewItem({
  title,
  likes,
  tagList,
  body,
  slugInfo,
  data,
  user,
  imagePath,
  description,
  favoritedInfo,
}) {
  const dispatch = useDispatch()
  const elementsTag =
    tagList && tagList.length > 0
      ? tagList.map((el) => {
          return (
            <div className={classes.tags} key={el.length * Math.random()}>
              {el}
            </div>
          )
        })
      : null

  const likeStatus = favoritedInfo ? 'likes-active' : 'likes'

  return (
    <Link to={`/article/${slugInfo}`} className={classes.link}>
      <div
        className={classes.wrapper}
        onClick={() => dispatch(getArticle(slugInfo))}
      >
        <div className={classes['wrapper-article']}>
          <div className={classes['wrapper-article-title']}>
            <h4>{title}</h4>
            <div className={classes[likeStatus]}>{likes}</div>
          </div>
          {elementsTag}
          <div>
            <p className={classes['article-preview-txt']}>{description}</p>
          </div>
        </div>

        <div className={classes.profile}>
          <ProfileItem user={user} imagePath={imagePath} date={data} />
        </div>
      </div>
    </Link>
  )
}

export default ArticlePreviewItem
