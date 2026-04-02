export const validateTitle = (title: string): string => {
  if (title.length < 1 || title.length > 50) {
    return 'タイトルは1文字以上50文字以下で入力してください'
  }
  return ''
}

export const validateBody = (body: string): string => {
  if (body.length < 10 || body.length > 2000) {
    return '本文は10文字以上2000文字以下で入力してください'
  }
  return ''
}
