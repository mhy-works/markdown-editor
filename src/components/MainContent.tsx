import { useEffect, useState } from 'react'
import { getContent, updateContent } from '../api/content'
import type { Content } from '../api/content'
import Button from './Button'
import { validateTitle, validateBody } from '../utils/validation'

type Props = {
  selectedId: number | null
  onUpdate: () => void
  isNewContent: boolean
  onNewContentHandled: () => void
  isTitleEditing: boolean
  setIsTitleEditing: (value: boolean) => void
  isBodyEditing: boolean
  setIsBodyEditing: (value: boolean) => void
  onBodySaved: () => void
}

const MainContent = ({ selectedId, onUpdate, isNewContent, onNewContentHandled, isTitleEditing, setIsTitleEditing, isBodyEditing, setIsBodyEditing, onBodySaved }: Props) => {
  const [content, setContent] = useState<Content | null>(null)
  const [titleValue, setTitleValue] = useState('')
  const [bodyValue, setBodyValue] = useState('')
  const [titleError, setTitleError] = useState('')
  const [bodyError, setBodyError] = useState('')

  // タイトルの保存
  const handleTitleSave = async () => {
    if (!content) return
    const error = validateTitle(titleValue)
    if (error) {
      setTitleError(error)
      return
    }
    setTitleError('')
    const updated = await updateContent(content.id, { title: titleValue })
    setContent(updated)
    setIsTitleEditing(false)
    onUpdate()
  }

  // 本文の保存
  const handleBodySave = async () => {
    if (!content) return
    const error = validateBody(bodyValue)
    if (error) {
      setBodyError(error)
      return
    }
    setBodyError('')
    const updated = await updateContent(content.id, { body: bodyValue })
    setContent(updated)
    setIsBodyEditing(false)
    onBodySaved()
    onUpdate()
  }

  // 選択ページのコンテンツを取得
  useEffect(() => {
    if (selectedId === null) {
      setContent(null)
      return
    }
    getContent(selectedId).then(data => {
      setContent(data)
      setTitleValue(data.title)
      setBodyValue(data.body)
    })
  }, [selectedId])

  useEffect(() => {
    if (isNewContent) {
      setIsBodyEditing(true)
      onNewContentHandled()
    }
  }, [isNewContent])

  if (!content) return (
    <div className="flex-1 flex flex-col overflow-auto">
      <div className="flex-1 flex flex-col px-10">
        <div className="w-full flex-1 flex flex-col max-w-[1080px] mt-7.5 mx-auto bg-bg-light rounded-2xl">
          <div className="flex-1 flex items-center justify-center text-text-light">
            ページを作成してください
          </div>
        </div>
      </div>
      <footer className="shrink-0 h-15 flex justify-between items-center px-10">
        <span>Copyright © 2021 Sample</span>
        <span>運営会社</span>
      </footer>
    </div>
  )

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <div className="flex-1 flex flex-col px-10">
        <div className="w-full flex-1 flex flex-col max-w-[1080px] mt-7.5 mx-auto pb-7.5 bg-bg-light rounded-2xl">
          <div className="flex px-7.5 pt-7.5">
            <div className="flex-1 pr-7.5 min-h-10 flex items-center">
              {isTitleEditing ? (
                <div className="w-full">
                  <input 
                    className="w-full px-7.5 bg-white border border-brand rounded-lg text-2xl font-bold" 
                    value={titleValue}
                    onChange={(e) => setTitleValue(e.target.value)}
                  />
                  {titleError && <p className="text-red-500 text-sm mt-1">{titleError}</p>}
                </div>
              ) : (
                <h1 className="px-7.5 text-2xl font-bold">{content.title}</h1>
              )}
            </div>
            <div className="w-[90px] shrink-0">
              {isTitleEditing ? (
                <div className="flex gap-[10px]">
                  <Button variant="normal" icon="/src/assets/img/icon/cancel.svg" onClick={() => setIsTitleEditing(false)}>Cancel</Button>
                  <Button variant="primary" icon="/src/assets/img/icon/save.svg" onClick={handleTitleSave}>Save</Button>
                </div>
              ) : (
                <Button variant="primary" icon="/src/assets/img/icon/edit.svg" onClick={() => setIsTitleEditing(true)}>Edit</Button>
              )}
            </div>
          </div>
          <div className="flex-1 flex px-7.5 pt-5">
            <div className="flex-1 pr-7.5">
              {isBodyEditing ? (
                <div className="w-full h-full flex flex-col flex-1">
                  <textarea 
                    className="flex-1 block w-full h-full min-w-0 bg-white border border-brand rounded-lg p-7.5"
                    value={bodyValue}
                    onChange={(e) => setBodyValue(e.target.value)}
                  />
                  {bodyError && <p className="text-red-500 text-sm mt-1 rounded-lg">{bodyError}</p>}
                </div>
              ) : (
                <div className="bg-white p-7.5 overflow-auto whitespace-pre-wrap">{content.body}</div>
              )}
            </div>
            <div className="w-[90px] shrink-0">
              {isBodyEditing ? (
                <div className="flex gap-[10px]">
                  <Button variant="normal" icon="/src/assets/img/icon/cancel.svg" onClick={() => setIsBodyEditing(false)}>Cancel</Button>
                  <Button variant="primary" icon="/src/assets/img/icon/save.svg" onClick={handleBodySave}>Save</Button>
                </div>
              ) : (
                <Button variant="primary" icon="/src/assets/img/icon/edit.svg" onClick={() => setIsBodyEditing(true)}>Edit</Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <footer className="shrink-0 h-15 flex justify-between items-center px-10">
        <span>Copyright © 2021 Sample</span>
        <span>運営会社</span>
      </footer>
    </div>
  )
}

export default MainContent
