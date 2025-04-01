import classes from './header-menu.module.scss'
import SignIn from '../sign-in/sign-in'
import SignUp from '../sign-up/sign-up'
import CreateArticle from '../create-article-btn/create-article-btn'
import LogOut from '../log-out-btn/log-out-btn'
import ProfileItemHeader from '../profile-item-header/profile-item-header'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function HeaderMenu() {
  const dataArticles = useSelector((state) => state.blog)
  const { username, avatarImage, token, isLoggedIn } = dataArticles
  return (
    <header className={classes.header}>
      <span className={classes.blogName}>
        <Link to="/">Realworld Blog</Link>
      </span>
      <CreateArticle />
      {isLoggedIn && token ? (
        <ProfileItemHeader user={username} imagePath={avatarImage} />
      ) : null}
      {!token ? <SignIn /> : null}
      {!token ? <SignUp /> : null}
      {isLoggedIn && token ? <LogOut /> : null}
    </header>
  )
}

export default HeaderMenu
