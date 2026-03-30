export type Content = {
  id: number
  title: string
  body: string
  createdAt: string
  updatedAt: string
}

export const getContents = async (): Promise<Content[]> => {
  const response = await fetch('http://localhost:3000/content')
  const data = await response.json()
  return data
}
