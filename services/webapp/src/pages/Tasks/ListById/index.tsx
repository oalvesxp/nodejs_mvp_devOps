import { useParams } from 'react-router-dom'

function ListTaskById() {
  const { id } = useParams()

  return (
    <>
      <h1>Tasks by ID</h1>
      <p>This is the content of the blog post with slug {id}.</p>
    </>
  )
}

export default ListTaskById
