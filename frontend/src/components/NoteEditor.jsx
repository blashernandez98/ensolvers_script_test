import PropTypes from 'prop-types'
import { useState } from 'react'

export function NoteEditor({
  addNote,
  addTagToNote,
  addTag,
  deleteTagFromNote,
  editNote,
  noteToEdit,
  closeEditor,
  tags,
}) {
  const oldTags = noteToEdit?.tags || []
  const [selectedTags, setSelectedTags] = useState(noteToEdit?.tags || [])

  function handleAddTag(e) {
    e.stopPropagation()
    const tag = e.target.textContent.trim() // Trim whitespace from the tag name
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(tag)) {
        return prevSelectedTags.filter((t) => t !== tag)
      } else {
        return [...prevSelectedTags, tag]
      }
    })
  }

  function handleCreateTag(e) {
    addTag(e.target.previousSibling.value)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const title = e.target.title.value
    const content = e.target.content.value
    const note = { title, content }
    if (noteToEdit) {
      note.id = noteToEdit.id
      await editNote(note)
    } else {
      const res = await addNote(note)
      note.id = res.id
    }
    console.log(selectedTags, 'selected tags')
    selectedTags.forEach(async (tag) => {
      if (oldTags.includes(tag)) {
        return
      }
      const tagId = tags.find((t) => t.tag_name === tag).tag_id
      await addTagToNote(tagId, note.id)
    })
    oldTags.forEach(async (tag) => {
      if (!selectedTags.includes(tag)) {
        const tagId = tags.find((t) => t.tag_name === tag).tag_id
        await deleteTagFromNote(tagId, note.id)
      }
    })

    closeEditor()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='absolute top-10 flex flex-col p-2 items-center bg-blue-300 opacity-100'
    >
      <label htmlFor='title'>Title</label>
      <input
        type='text'
        name='title'
        className='bg-zinc-100'
        defaultValue={noteToEdit ? noteToEdit.title : ''}
      />
      <label htmlFor='content'>Content</label>
      <textarea
        name='content'
        cols='30'
        rows='7'
        defaultValue={noteToEdit ? noteToEdit.content : ''}
      ></textarea>
      <label htmlFor='tags' className='text-lg'>
        Tags
      </label>
      <div className='flex flex-row flex-wrap w-60 items-center justify-center p-2'>
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag.tag_name)
          return (
            <a
              key={tag.tag_id}
              className={`rounded-sm p-2 cursor-pointer m-1 ${
                isSelected ? 'bg-green-100' : 'bg-zinc-100'
              }`}
              onClick={handleAddTag}
            >
              {tag.tag_name}
            </a>
          )
        })}
      </div>
      <div className='w-full h-10'>
        <input
          type='text'
          name='newTag'
          className='bg-zinc-100 h-8 text-center'
          placeholder='New Tag'
        />
        <a
          onClick={handleCreateTag}
          className='bg-green-200 rounded-sm p-2 cursor-pointer w-8 h-8'
        >
          Add Tag
        </a>
      </div>
      <div className='flex flex-row justify-center items-center'>
        <button className='bg-red-200 rounded-sm p-2' onClick={closeEditor}>
          Cancel
        </button>
        <button className='bg-green-200 rounded-sm p-2' type='submit'>
          Save
        </button>
      </div>
    </form>
  )
}

NoteEditor.propTypes = {
  addNote: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  addTagToNote: PropTypes.func.isRequired,
  deleteTagFromNote: PropTypes.func.isRequired,
  closeEditor: PropTypes.func.isRequired,
  editNote: PropTypes.func.isRequired,
  noteToEdit: PropTypes.object,
  tags: PropTypes.array.isRequired,
}

export default NoteEditor
