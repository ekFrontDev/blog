import { Pagination } from 'antd'
import { GetTicketsPage, changePaginationPage } from '../../store/blog-slice'
import { useSelector, useDispatch } from 'react-redux'
import './pagination.scss'
import { RootState, AppDispatch } from '../../store'
import { useEffect } from 'react'

function PaginationItem() {
  const dataArticles = useSelector((store: RootState) => store.blog)
  const { paginationPage } = dataArticles

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(GetTicketsPage(paginationPage))
  }, [paginationPage, dispatch])

  const changePage = async (pageNumber) => {
    dispatch(changePaginationPage(pageNumber))
    dispatch(GetTicketsPage(paginationPage))
  }

  const defaultPage = localStorage.getItem('page')
    ? Number(localStorage.getItem('page'))
    : paginationPage
  return (
    <Pagination
      defaultCurrent={defaultPage}
      total={dataArticles.articlesCount}
      onChange={changePage}
      align="center"
    />
  )
}

export default PaginationItem
