import classes from './profile-item-header.module.scss'
import { Link } from 'react-router-dom'

function ProfileItemHeader({ user, imagePath }) {
  const pathImage = '/profile.svg'
  return (
    <div className={classes['wrapper-profile-item']}>
      <div className={classes['wrapper-profile-info']}>
        <div className={classes['wrapper-profile-name-header']}>
          <Link to="/profile" className={classes.link}>
            {user}
          </Link>
        </div>
      </div>
      <div className={classes['wrapper-profile-img']}>
        <img
          src={imagePath ? imagePath : pathImage}
          width={'46px'}
          height={'46px'}
        />
      </div>
    </div>
  )
}

export default ProfileItemHeader
