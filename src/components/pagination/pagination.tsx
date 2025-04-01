import { Pagination } from 'antd'
import { GetTicketsPage } from '../../store/blog-slice'
import { useSelector, useDispatch } from 'react-redux'
import './pagination.scss'

function PaginationItem() {
  const dataArticles = useSelector((store) => store.blog)

  const dispatch = useDispatch()

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
