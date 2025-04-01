import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getArticles, checkToken } from './store/blog-slice'
import { Routes, Route } from 'react-router-dom'
import { RootState, AppDispatch } from './store'
import SignUpForm from './components/sign-up-form/sign-up-form'
import SignInForm from './components/sign-in-form/sign-in-form'
import ArticleItemCard from './components/article-item-card/article-item-card'
import ArticleForm from './components/article-form/article-form'
import ArticleFormEdit from './components/arcticle-form-edit/arcticle-form-edit'
import ArticleList from './components/article-list/article-list'
import EditProfileForm from './components/edit-profile-form/edit-profile-form'
import SpinItem from './components/spin-item/spin-item'
import Layout from './components/layout/layuot'
import './App.module.scss'

function App() {
  const totalData = useSelector((store: RootState) => store.blog)
  const { dataArticles, status } = totalData

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getArticles())
  }, [dispatch])

  useEffect(() => {
    dispatch(checkToken())
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="profile" element={<EditProfileForm />} />

          <Route
            index
            element={dataArticles.length > 0 ? <ArticleList /> : <SpinItem />}
          />
          <Route path="create" element={<ArticleForm />} />
          <Route path="signin" element={<SignInForm />} />
          <Route path="signup" element={<SignUpForm />} />
          <Route
            path="logout"
            element={dataArticles.length > 0 ? <ArticleList /> : <SpinItem />}
          />
          <Route
            path="article/:slug"
            element={status === 'resolved' ? <ArticleItemCard /> : <SpinItem />}
          />
          <Route path="edit" element={<ArticleFormEdit />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
