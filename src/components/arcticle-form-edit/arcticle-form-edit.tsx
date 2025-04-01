import classes from './arcticle-form-edit.module.scss'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import TagList from '../tag-list/tag-list'
import { createArticleForm, editArticleItem } from '../../store/blog-slice'

function ArticleFormEdit() {
  const dataArticles = useSelector((store) => store.blog)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { articleForm } = dataArticles
  const { title, body, description, tagList, slug } = dataArticles.openArticle

  const functionValieInputArticleFormEdit = (evt) => {
    const { name, value } = evt.target
    dispatch(createArticleForm({ [name]: value.trim() }))
  }

  useEffect(() => {
    dispatch(createArticleForm({ title, description, body, tagList }))
  }, [title, description, body, tagList, dispatch])

  const editArticle = (evt) => {
    evt.preventDefault()
    const obj = { id: slug, editForm: articleForm }
    dispatch(editArticleItem(obj))
      .then(() => navigate('/'))
      .catch((e) => alert(e))
  }

  return (
    <div className={classes.wrapper}>
      <form onSubmit={editArticle}>
        <span className={classes['create-article']}>Edit article</span>

        <label htmlFor={'title'} className={classes['label-info']}>
          Title
        </label>
        <input
          className={classes['input-info']}
          type={'text'}
          name={'title'}
          value={articleForm.title}
          required
          minLength={3}
          autoComplete={'off'}
          onChange={functionValieInputArticleFormEdit}
        />

        <label htmlFor={'description'} className={classes['label-info']}>
          Short description
        </label>
        <input
          className={classes['input-info']}
          type={'text'}
          name={'description'}
          value={articleForm.description}
          required
          minLength={3}
          autoComplete={'off'}
          onChange={functionValieInputArticleFormEdit}
        />
        <label htmlFor={'description'} className={classes['label-info']}>
          Text
        </label>
        <input
          className={[classes['input-info'], classes['input-text']].join(' ')}
          type={'text'}
          name={'body'}
          value={articleForm.body}
          required
          minLength={3}
          autoComplete={'off'}
          onChange={functionValieInputArticleFormEdit}
        />

        <TagList />
        <button className={classes['send-btn']}>Send</button>
      </form>
    </div>
  )
}

export default ArticleFormEdit
