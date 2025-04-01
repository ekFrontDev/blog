import HeaderMenu from '../header-menu/header-menu'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
      <HeaderMenu />
      <Outlet />
    </>
  )
}

export default Layout
