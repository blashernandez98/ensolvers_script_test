export async function getNotes() {
  const res = await fetch('http://localhost:3000/api/notes');
  const data = await res.json();
  return data;
}

export async function postNote(note) {
  const res = await fetch('http://localhost:3000/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });
  if (!res.ok) {
    throw new Error(res.status);
  }
  const data = await res.json();
  return data;
}

export async function deleteNoteById(id) {
  const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error(res.status);
  }
  const data = await res.json();
  return data;
}

export async function updateNote(newNote) {
  const res = await fetch(`http://localhost:3000/api/notes/${newNote.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newNote),
  });
  if (!res.ok) {
    throw new Error(res.status);
  }
  const data = await res.json();
  return data;
}

export async function getTags() {
  const res = await fetch('http://localhost:3000/api/tags');
  const data = await res.json();
  console.log(data)
  return data;
}

export async function postTag(tag) {
  const res = await fetch('http://localhost:3000/api/tags', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"tag_name": tag})
  });
  if (!res.ok) {
    throw new Error(res.status);
  }
  const data = await res.json();
  return data;
}

export async function deleteTagById(id) {
  const res = await fetch(`http://localhost:3000/api/tags/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error(res.status);
  }
  const data = await res.json();
  return data;
}

export async function getNotesByTag(tagId) {
  const res = await fetch(`http://localhost:3000/api/tags/${tagId}/notes`);
  const data = await res.json();
  return data;
}

export async function getTagsByNote(noteId) {
  const res = await fetch(`http://localhost:3000/api/notes/${noteId}/tags`);
  const data = await res.json();
  return data;
}

export async function linkTagToNote(tagId, noteId) {
  const res = await fetch('http://localhost:3000/api/note-tags', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tagId, noteId }),
  });
  if (!res.ok) {
    throw new Error(res.status);
  }
  const data = await res.json();
  return data;
}

export async function unlinkTagFromNote(tagId, noteId) {
  const res = await fetch('http://localhost:3000/api/note-tags', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tagId, noteId }),
  });
  if (!res.ok) {
    throw new Error(res.status);
  }
  const data = await res.json();
  return data;
}
