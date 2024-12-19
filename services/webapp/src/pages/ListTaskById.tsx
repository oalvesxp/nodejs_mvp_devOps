import { useParams } from 'react-router-dom'
import '../Styles.css'

function ListTaskById() {
  const { slug } = useParams()

  return (
    <>
      <h1>Tasks by ID</h1>
      <p>This is the content of the blog post with slug {slug}.</p>
    </>
  )
}

export default ListTaskById
