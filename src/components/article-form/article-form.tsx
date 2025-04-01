import classes from './article-form.module.scss'
import SendBtn from '../send-btn/send-btn'
import TagList from '../tag-list/tag-list'
import { createArticleForm, createArticle } from '../../store/blog-slice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ArticleForm() {
  const navigate = useNavigate()
  const dataArticles = useSelector((state) => state.blog)
  const dispatch = useDispatch()
  const sendArticleForm = (evt) => {
    evt.preventDefault()
    dispatch(createArticle(dataArticles.articleForm))
      .then(() => navigate('/'))
      .catch((e) => alert(e))
  }

  const functionValueArticleForm = (evt) => {
    const { name, value } = evt.target
    dispatch(createArticleForm({ [name]: value.trim() }))
  }
  return (
    <div className={classes.wrapper}>
      <form onSubmit={sendArticleForm}>
        <span className={classes['create-article']}>Create new article</span>

        <label htmlFor={'title'} className={classes['label-info']}>
          Title
        </label>
        <input
          className={classes['input-info']}
          type={'text'}
          name={'title'}
          placeholder={'Title'}
          required
          onChange={functionValueArticleForm}
        />

        <label htmlFor={'description'} className={classes['label-info']}>
          Short description
        </label>
        <input
          className={classes['input-info']}
          type={'text'}
          name={'description'}
          placeholder={'Title'}
          required
          onChange={functionValueArticleForm}
        />
        <label htmlFor={'description'} className={classes['label-info']}>
          Text
        </label>
        <input
          className={[classes['input-info'], classes['input-text']].join(' ')}
          type={'text'}
          name={'body'}
          placeholder={'Text'}
          onChange={functionValueArticleForm}
        />

        <TagList />
        <TagList />

        <SendBtn />
      </form>
    </div>
  )
}

export default ArticleForm
