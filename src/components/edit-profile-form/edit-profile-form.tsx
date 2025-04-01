import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { updateCurrentUser } from '../../store/blog-slice'
import { useNavigate } from 'react-router-dom'
import classes from '../sign-up-form/sign-up-form.module.scss'
import { RootState, AppDispatch } from '../../store'

function EditProfileForm() {
  const { username, email, avatarImage, status } = useSelector(
    (state: RootState) => state.blog,
  )
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username: username || '',
      email: email || '',
      password: '',
      image: avatarImage || '',
    },
  })

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(updateCurrentUser(data)).unwrap()
      if (result.user.token) {
        alert('Profile updated successfully!')
        navigate('/')
      }
    } catch (err) {
      const serverErrors = err?.errors || {}
      if (serverErrors.username)
        setError('username', { message: serverErrors.username })
      if (serverErrors.email) setError('email', { message: serverErrors.email })
      if (serverErrors.password)
        setError('password', { message: serverErrors.password })
      if (serverErrors.image) setError('image', { message: serverErrors.image })
    }
  }

  return (
    <div className={classes['wrapper-edit-form']}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <span className={classes['create-acc']}>Edit profile</span>

        <label htmlFor={'username'} className={classes['label-info']}>
          Username
        </label>
        <input
          {...register('username', {
            required: 'Username is required',
          })}
          className={classes['input-info']}
          type="text"
          placeholder="Username"
        />
        {errors.username && (
          <span className={classes['input-errors']}>
            {errors.username.message}
          </span>
        )}

        <label htmlFor={'email'} className={classes['label-info']}>
          Email adress
        </label>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
          })}
          className={classes['input-info']}
          type="email"
          placeholder="Email address"
        />
        {errors.email && (
          <span className={classes['input-errors']}>
            {errors.email.message}
          </span>
        )}

        <label htmlFor={'password'} className={classes['label-info']}>
          New password
        </label>
        <input
          {...register('password', {
            minLength: { value: 6, message: 'Minimum 6 characters' },
            maxLength: { value: 40, message: 'Maximum 40 characters' },
          })}
          className={classes['input-info']}
          type="password"
          placeholder="New password"
        />
        {errors.password && (
          <span className={classes['input-errors']}>
            {errors.password.message}
          </span>
        )}

        <label htmlFor={'repeat password'} className={classes['label-info']}>
          Avatar image (url)
        </label>
        <input
          {...register('image', {
            pattern: {
              value: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/,
              message: 'Invalid URL',
            },
          })}
          className={classes['input-info']}
          type="text"
          placeholder="Avatar image"
        />
        {errors.image && (
          <span className={classes['input-errors']}>
            {errors.image.message}
          </span>
        )}

        <button
          className={classes['button-create']}
          disabled={status === 'loading'}
        >
          Save
        </button>
      </form>
    </div>
  )
}

export default EditProfileForm
