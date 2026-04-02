export type Content = {
  id: number
  title: string
  body: string
  createdAt: string
  updatedAt: string
}

// sidebar
export const getContents = async (): Promise<Content[]> => {
  const response = await fetch('http://localhost:3000/content')
  const data = await response.json()
  return data
}

export const deleteContent = async (id: number): Promise<void> => {
  await fetch(`http://localhost:3000/content/${id}`, {
    method: 'DELETE',
  })
}

// MainContent
export const getContent = async (id: number): Promise<Content> => {
  const response = await fetch(`http://localhost:3000/content/${id}`)
  const data = await response.json()
  return data
}

export const updateContent = async (id: number, data: { title?: string; body?: string }): Promise<Content> => {
  const response = await fetch(`http://localhost:3000/content/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

// 新規作成
export const createContent = async (data: { title?: string; body?: string }): Promise<Content> => {
  const response = await fetch('http://localhost:3000/content', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return response.json()
}
