import classes from './profile-item.module.scss'
import { format } from 'date-fns'

function ProfileItem({ user, imagePath, date }) {
  const currentDate = date ? format(new Date(date), 'LLLL d, yyyy') : null
  const pathImage = '../../src/assets/profile.svg'
  return (
    <div className={classes['wrapper-profile-item']}>
      <div className={classes['wrapper-profile-info']}>
        <div className={classes['wrapper-profile-name']}>{user}</div>
        {date ? (
          <div className={classes['wrapper-profile-name']}>{currentDate}</div>
        ) : null}
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

export default ProfileItem
