import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { getTask } from '../../../hooks/api/tasks/tasks'
import { GetTask200Task } from '@/hooks/api/api.schemas'
import dayjs from 'dayjs'

function EditTask() {
  const { id } = useParams()
  const [task, setTask] = useState<GetTask200Task>()

  async function getTaskById(id: string) {
    try {
      const res = await getTask(id)
      setTask(res.data.task)
    } catch (err) {
      console.error('Error fetching task:', err);
    }
  }

  function formatDate(data: string | Date) {
    return dayjs(data).format('DD/MM/YYYY HH:mm:ss');
  }

  useEffect(() => {
    if (id) {
      getTaskById(id)
    }
  }, [id])

  useEffect(() => {
    console.log('Task fetched:', task)
  }, [task])

  return (
    <>
      <h1>Edit Task</h1>
      {task ? (
        <div>
          <p>Title: {task.title}</p>
          <p>Description: {task.description}</p>
          <p>Criação: {formatDate(task.created_at)}</p>
          <p>Atualização: {formatDate(task.updated_at)}</p>
          <p>Conclusão: {task.completed_at ? formatDate(task.completed_at) : 'Pendente'}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}


export default EditTask
