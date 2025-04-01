import classes from '../article-form/article-form.module.scss'
import DeleteBtnNewArticle from '../delete-btn-new-article/delete-btn-new-article'
import AddTagBtn from '../add-tag-btn/add-tag-btn'
import { useDispatch } from 'react-redux'
import { createArticleFormTags } from '../../store/blog-slice'
import { useState } from 'react'
import { AppDispatch } from '../../store'

export default function TagList() {
  const [tag, setTag] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const handleChange = (evt) => {
    setTag('')
    setTag(evt.target.value)
  }
  const handleAddTag = () => {
    if (tag.trim()) {
      dispatch(createArticleFormTags(tag.trim()))
      setTag('')
    }
  }
  return (
    <>
      <label htmlFor={'description'} className={classes['label-info']}>
        Tags
      </label>
      <div>
        <input
          className={[classes['input-info'], classes['input-tags']].join(' ')}
          type={'text'}
          name={'tag'}
          placeholder={'Tag'}
          value={tag}
          onChange={handleChange}
          onBlur={handleAddTag}
        />
        <DeleteBtnNewArticle />
        <AddTagBtn />
      </div>
    </>
  )
}
