import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authorization } from '../../store/blog-slice'
import classes from '../sign-up-form/sign-up-form.module.scss'
import { RootState, AppDispatch } from '../../store'

function SignInForm() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { status } = useSelector((state: RootState) => state.blog)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(authorization(data)).unwrap()
      if (result.user.token) {
        navigate('/')
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('email', { message: 'Invalid email or password' })
      setError('password', { message: 'Invalid email or password' })
    }
  }

  return (
    <div className={classes['wrapper-sign-in-form']}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <span className={classes['create-acc']}>Sign In</span>

        <label htmlFor="email" className={classes['label-info']}>
          Email address
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

        <label htmlFor="password" className={classes['label-info']}>
          Password
        </label>
        <input
          {...register('password', {
            required: 'Password is required',
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

        <button
          className={classes['button-create']}
          disabled={status === 'loading'}
        >
          Login
        </button>

        <span className={classes['have-acc']}>
          Don't have an account?{' '}
          <a className={classes['have-acc-src']}>
            <button
              className={classes['sign-up-path']}
              onClick={() => navigate('/signup')}
            >
              Sign Up.
            </button>
          </a>
        </span>
      </form>
    </div>
  )
}

export default SignInForm
