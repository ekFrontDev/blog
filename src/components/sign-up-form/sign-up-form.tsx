import classes from './sign-up-form.module.scss'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userRegistration } from '../../store/blog-slice'

function SignUpForm() {
  const dataArticles = useSelector((state) => state.blog)
  const { status } = dataArticles
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      agree: false,
    },
  })

  const onSubmit = async (data) => {
    const { agree, repeatPassword, ...formData } = data
    try {
      const result = await dispatch(userRegistration(formData)).unwrap()
      if (result.user.token) {
        alert('Регистрация успешна!')
        navigate('/signin')
      }
    } catch (err) {
      const serverErrors = err?.errors || {}
      if (serverErrors.username)
        setError('username', { message: serverErrors.username })
      if (serverErrors.email) setError('email', { message: serverErrors.email })
      if (serverErrors.password)
        setError('password', { message: serverErrors.password })
    }
  }

  const password = watch('password')

  return (
    <div className={classes['wrapper-sign-up-form']}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <span className={classes['create-acc']}>Create new account</span>

        <label htmlFor={'username'} className={classes['label-info']}>
          Username
        </label>
        <input
          {...register('username', {
            required: 'Username is required',
            minLength: { value: 3, message: 'Minimum 3 characters' },
            maxLength: { value: 20, message: 'Maximum 20 characters' },
          })}
          className={classes['input-info']}
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
          Password
        </label>
        <input
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Minimum 6 characters' },
            maxLength: { value: 40, message: 'Maximum 40 characters' },
          })}
          className={classes['input-info']}
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <span className={classes['input-errors']}>
            {errors.password.message}
          </span>
        )}

        <label htmlFor={'repeat password'} className={classes['label-info']}>
          Repeat password
        </label>
        <input
          {...register('repeatPassword', {
            required: 'Repeat password is required',
            validate: (value) => value === password || 'Passwords must match',
          })}
          className={classes['input-info']}
          type="password"
          placeholder="Repeat password"
        />
        {errors.repeatPassword && (
          <span className={classes['input-errors']}>
            {errors.repeatPassword.message}
          </span>
        )}

        <div className={classes['checkbox-wrapper']}>
          <input
            {...register('agree', {
              required: 'You must agree to the terms',
            })}
            type="checkbox"
            name="agree"
          />
          <label htmlFor="agree" className={classes['checkbox-label']}>
            I agree to the processing of my personal information
          </label>
        </div>
        {errors.agree && (
          <span className={classes['input-errors']}>
            {errors.agree.message}
          </span>
        )}

        <button
          className={classes['button-create']}
          disabled={status === 'loading'}
        >
          Create
        </button>

        <span className={classes['have-acc']}>
          Already have an account?{' '}
          <a className={classes['have-acc-src']}>
            <button
              className={classes['sign-up-path']}
              onClick={() => navigate('/signin')}
            >
              Sign In.
            </button>
          </a>
        </span>
      </form>
    </div>
  )
}

export default SignUpForm
