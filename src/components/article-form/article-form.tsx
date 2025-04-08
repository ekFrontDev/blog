import classes from './article-form.module.scss'
import SendBtn from '../send-btn/send-btn'
import TagList from '../tag-list/tag-list'
import { createArticleForm, createArticle } from '../../store/blog-slice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState, AppDispatch } from '../../store'
import { useForm } from 'react-hook-form'

function ArticleForm() {
  const navigate = useNavigate()
  const dataArticles = useSelector((state: RootState) => state.blog)
  const dispatch = useDispatch<AppDispatch>()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      description: '',
      body: '',
      tags: '',
    },
  })
  //   evt: React.FormEvent

  const sendArticleForm = async () => {
    //  evt.preventDefault()
    try {
      await dispatch(createArticle(dataArticles.articleForm)).unwrap()
      localStorage.removeItem('title')
      localStorage.removeItem('description')
      localStorage.removeItem('body')
      navigate('/')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      setError('title', { message: 'Invalid title or description or text' })
      setError('description', {
        message: 'Invalid title or description or text',
      })
      setError('tags', {
        message: 'Invalid title or description or text',
      })
    }
  }

  const functionValueArticleForm = (evt) => {
    const { name, value } = evt.target
    localStorage.setItem(name, value.trim())
    dispatch(createArticleForm({ [name]: value.trim() }))
  }

  const titleLocalStorage = localStorage.getItem('title') ? null : 'Title'
  const valueTitleLocalStorage = localStorage.getItem('title')
    ? localStorage.getItem('title')
    : null

  const descriptionLocalStorage = localStorage.getItem('description')
    ? null
    : 'Title'
  const valueDescriptionLocalStorage = localStorage.getItem('description')
    ? localStorage.getItem('description')
    : null

  const bodyLocalStorage = localStorage.getItem('body') ? null : 'Text'
  const valueBodyLocalStorage = localStorage.getItem('body')
    ? localStorage.getItem('body')
    : null

  return (
    <div className={classes.wrapper}>
      <form onSubmit={handleSubmit(sendArticleForm)}>
        <span className={classes['create-article']}>Create new article</span>

        <label htmlFor={'title'} className={classes['label-info']}>
          Title
        </label>
        <input
          {...register('title', {
            required: 'Title is required',
            pattern: {
              value: /^[a-zа-яё0-9]/,
              message: 'Invalid title. Title cannot start with a space.',
            },
          })}
          className={classes['input-info']}
          type={'text'}
          placeholder={titleLocalStorage}
          value={valueTitleLocalStorage}
          onChange={functionValueArticleForm}
        />
        {errors.title && (
          <span className={classes['input-errors']}>
            {errors.title.message}
          </span>
        )}

        <label htmlFor={'description'} className={classes['label-info']}>
          Short description
        </label>
        <input
          {...register('description', {
            required: 'Description is required',
            pattern: {
              value: /^[a-zа-яё0-9]/,
              message:
                'Invalid description. Description cannot start with a space.',
            },
          })}
          className={classes['input-info']}
          type={'text'}
          placeholder={descriptionLocalStorage}
          value={valueDescriptionLocalStorage}
          onChange={functionValueArticleForm}
        />
        {errors.description && (
          <span className={classes['input-errors']}>
            {errors.description.message}
          </span>
        )}

        <label htmlFor={'description'} className={classes['label-info']}>
          Text
        </label>
        <input
          {...register('body', {
            required: 'Text is required',
            pattern: {
              value: /^[a-zа-яё0-9]/,
              message: 'Invalid text. Text cannot start with a space.',
            },
          })}
          className={[classes['input-info'], classes['input-text']].join(' ')}
          type={'text'}
          placeholder={bodyLocalStorage}
          value={valueBodyLocalStorage}
          onChange={functionValueArticleForm}
        />
        {errors.body && (
          <span className={classes['input-errors']}>{errors.body.message}</span>
        )}

        <TagList />

        <SendBtn />
      </form>
    </div>
  )
}

export default ArticleForm
