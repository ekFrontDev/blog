import ProfileItem from '../profile-item/profile-item'
import classes from './article-item-card.module.scss'
import DeleteBtn from '../delete-btn/delete-btn'
import EditBtn from '../edit-btn/edit-btn'
import ModalPopUp from '../modal-pop-up/modal-pop-up'
import Markdown from 'markdown-to-jsx'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {
  likeStatusFavorited,
  likeStatusUnfavorited,
  getArticle,
} from '../../store/blog-slice'
import { useParams } from 'react-router-dom'
import SpinItem from '../spin-item/spin-item'
import { RootState, AppDispatch } from '../../store'

function ArticleItemCard() {
  const dataArticles = useSelector((store: RootState) => store.blog)
  const { username, popUp, likes, token, status } = dataArticles
  const dispatch = useDispatch<AppDispatch>()
  const { slug } = useParams()
  const {
    title,
    slug: articleSlug,
    body,
    description,
    author,
    createdAt,
    favoritesCount,
    tagList,
  } = dataArticles.openArticle

  useEffect(() => {
    if (!articleSlug && slug) {
      dispatch(getArticle(slug))
    }
  }, [articleSlug, slug, dispatch])

  const authorName = author ? author.username : null
  const imageProfile = author ? author.image : null
  const likeStatus = likes ? 'likes-active' : 'likes'
  const functionChangeLikesStatus = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !likes
      ? dispatch(likeStatusFavorited(slug))
      : dispatch(likeStatusUnfavorited(slug))
  }
  const activeStatus = token ? functionChangeLikesStatus : null

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

  if (status === 'loading' || (!articleSlug && slug)) {
    return <SpinItem />
  }

  if (!articleSlug) {
    return <div>Article not found</div>
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes['wrapper-article']}>
        <div className={classes['wrapper-article-title']}>
          <h4>{title}</h4>
          <div className={classes[likeStatus]} onClick={activeStatus}>
            {favoritesCount}
          </div>
        </div>
        {elementsTag}
        <div>
          <p className={classes['article-preview-txt']}>{description}</p>
        </div>
        <div className={classes['article-txt-wrapper']}>
          <Markdown>{body}</Markdown>
        </div>
      </div>

      <div className={classes.profile}>
        <ProfileItem
          user={authorName}
          imagePath={imageProfile}
          date={createdAt}
        />
        {username && author.username === username ? <DeleteBtn /> : null}
        {username && author.username === username ? <EditBtn /> : null}
      </div>
      {popUp ? <ModalPopUp slugID={slug} /> : null}
    </div>
  )
}

export default ArticleItemCard
