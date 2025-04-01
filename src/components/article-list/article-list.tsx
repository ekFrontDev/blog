import ArticlePreviewItem from '../article-preview-item/article-preview-item'
import PaginationItem from '../pagination/pagination'
import { useSelector } from 'react-redux'

function ArticleList() {
  const totalData = useSelector((store) => store.blog)
  const { dataArticles } = totalData

  const elements = dataArticles.map((el) => {
    const {
      slug,
      title,
      body,
      description,
      author,
      createdAt,
      favorited,
      favoritesCount,
      tagList,
    } = el

    const { username, image } = author
    return (
      <ArticlePreviewItem
        key={slug}
        title={title}
        likes={favoritesCount}
        tagList={tagList}
        body={body}
        description={description}
        user={username}
        imagePath={image}
        data={createdAt}
        slugInfo={slug}
        favoritedInfo={favorited}
      />
    )
  })

  return (
    <div>
      {elements}
      <PaginationItem />
    </div>
  )
}

export default ArticleList
