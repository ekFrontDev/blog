import { Pagination } from 'antd'
import { GetTicketsPage } from '../../store/blog-slice'
import { useSelector, useDispatch } from 'react-redux'
import './pagination.scss'
import { RootState, AppDispatch } from '../../store'

function PaginationItem() {
  const dataArticles = useSelector((store: RootState) => store.blog)

  const dispatch = useDispatch<AppDispatch>()

  const changePage = (pageNumber) => {
    dispatch(GetTicketsPage(pageNumber))
  }

  return (
    <Pagination
      defaultCurrent={1}
      total={dataArticles.articlesCount}
      onChange={changePage}
      align="center"
    />
  )
}

export default PaginationItem
