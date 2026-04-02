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
  onBack: () => void
}

const MainContent = ({ selectedId, onUpdate, isNewContent, onNewContentHandled, isTitleEditing, setIsTitleEditing, isBodyEditing, setIsBodyEditing, onBodySaved, onBack }: Props) => {
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
    <div className="flex-1 flex flex-col overflow-hidden min-h-0">
      <div className="flex-1 flex flex-col px-4 md:px-6 lg:px-10 min-h-0">
        <div className="w-full flex-1 flex flex-col max-w-[1080px] mt-7.5 mx-auto bg-bg-light rounded-2xl">
          <div className="flex-1 flex items-center justify-center text-text-light">
            ページを作成してください
          </div>
        </div>
      </div>
      <footer className="shrink-0 h-15 flex justify-between items-center px-4 md:px-10 text-xs">
        <span>Copyright © 2021 Sample</span>
        <span>運営会社</span>
      </footer>
    </div>
  )

  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-0">
      <div className="flex-1 flex flex-col px-4 md:px-6 lg:px-10 min-h-0">
        <div className="w-full flex-1 flex flex-col max-w-[1080px] mt-5 md:mt-7.5 mx-auto pb-7.5 bg-bg-light rounded-2xl min-h-0">
          <div className="flex flex-col md:flex-row px-5 md:px-7.5 pt-7.5">
            <button onClick={onBack} className="md:hidden self-start flex items-center gap-1 text-brand text-sm mb-2">
              ← 戻る
            </button>
            <div className="flex-1 md:pr-7.5 min-h-10 flex items-center">
              {isTitleEditing ? (
                <div className="w-full">
                  <input 
                    className="w-full px-5 md:px-7.5 bg-white border border-brand rounded-lg text-2xl font-bold" 
                    value={titleValue}
                    onChange={(e) => setTitleValue(e.target.value)}
                  />
                  {titleError && <p className="text-red-500 text-sm mt-1">{titleError}</p>}
                </div>
              ) : (
                <h1 className="md:px-7.5 text-2xl font-bold break-words">{content.title}</h1>
              )}
            </div>
            <div className="w-[90px] shrink-0 mt-3 md:mt-0 self-end md:self-auto">
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
          <div className="flex-1 flex flex-col md:flex-row px-5 md:px-7.5 pt-5 min-h-0 overflow-hidden">
            <div className="flex-1 pr-0 md:pr-7.5 min-h-0 overflow-hidden">
              {isBodyEditing ? (
                <div className="h-full flex flex-col">
                  <textarea
                    className="flex-1 block w-full min-w-0 bg-white border border-brand rounded-lg p-4 md:p-7.5"
                    value={bodyValue}
                    onChange={(e) => setBodyValue(e.target.value)}
                  />
                  {bodyError && <p className="text-red-500 text-sm mt-1 rounded-lg">{bodyError}</p>}
                </div>
              ) : (
                <div className="h-full bg-white p-4 md:p-7.5 overflow-auto whitespace-pre-wrap">{content.body}</div>
              )}
            </div>
            <div className="w-[90px] shrink-0 mt-3 md:mt-0 self-end md:self-auto">
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
      <footer className="shrink-0 h-15 flex justify-between items-center px-4 md:px-10 text-xs">
        <span>Copyright © 2021 Sample</span>
        <span>運営会社</span>
      </footer>
    </div>
  )
}

export default MainContent
