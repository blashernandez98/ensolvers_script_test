import PropTypes from 'prop-types'
import { notePropTypes } from '../prop-types'
import { convertDate } from '../../lib/func'
import { getTagsByNote } from '../../lib/api'
import { useState, useEffect } from 'react'
import deleteIcon from '../img/delete.png'
import editIcon from '../img/edit.png'
import archiveIcon from '../img/archive.png'

export function Note({ note, onDelete, onEdit, openEditor }) {
  const { id, title, content, updated_at, archived } = note
  const formattedDate = convertDate(updated_at)
  const [showDialog, setShowDialog] = useState(false)

  useEffect(() => {
    async function fetchTags() {
      const tags = await getTagsByNote(id)
      note.tags = tags.map((tag) => tag.tag_name)
    }
    fetchTags()
  })

  function handleDelete() {
    setShowDialog(true)
  }

  async function handleArchive() {
    const res = await onEdit({ ...note, archived: !archived })
    console.log(res)
  }

  function handleEdit() {
    openEditor(note)
  }

  function handleConfirmDelete() {
    onDelete(id)
    setShowDialog(false)
  }

  function handleCancelDelete() {
    setShowDialog(false)
  }

  const buttonClasses = 'w-6 h-6'

  return (
    <div className='relative bg-red-100 flex flex-col p-4 w-96'>
      {showDialog ? (
        <div className='fixed top-0 bottom-0 left-0 right-0 z-10 my-auto mx-auto flex flex-col w-96 h-20 p-2 items-center bg-blue-300'>
          <p>Are you sure you want to delete this note?</p>
          <button onClick={handleConfirmDelete}>Yes</button>
          <button onClick={handleCancelDelete}>No</button>
        </div>
      ) : null}
      <h1 className='text-3xl'>{title}</h1>
      <p>{content}</p>
      <p>{formattedDate}</p>
      <div className='flex flex-row w-full items-center justify-end p-2 gap-1'>
        <button className={`${buttonClasses}`} onClick={handleDelete}>
          <img src={deleteIcon} alt='Delete' />
        </button>
        <button className={`${buttonClasses}`} onClick={handleEdit}>
          <img src={editIcon} alt='Edit' />
        </button>
        <button className={`${buttonClasses}`} onClick={handleArchive}>
          <img src={archiveIcon} alt='Archive' />
        </button>
      </div>
    </div>
  )
}

Note.propTypes = {
  note: notePropTypes,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  openEditor: PropTypes.func.isRequired,
}
