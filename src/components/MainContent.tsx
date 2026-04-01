import { useEffect, useState } from 'react'
import { getContent, updateContent } from '../api/content'
import type { Content } from '../api/content'
import Button from './Button'

type Props = {
  selectedId: number | null
}

const MainContent = ({ selectedId }: Props) => {
  const [content, setContent] = useState<Content | null>(null)
  const [isTitleEditing, setIsTitleEditing] = useState(false)
  const [isBodyEditing, setIsBodyEditing] = useState(false)
  const [titleValue, setTitleValue] = useState('')
  const [bodyValue, setBodyValue] = useState('')

  // タイトルの保存
  const handleTitleSave = async () => {
    if (!content) return
    const updated = await updateContent(content.id, { title: titleValue })
    setContent(updated)
    setIsTitleEditing(false)
  }

  // 本文の保存
  const handleBodySave = async () => {
    if (!content) return
    const updated = await updateContent(content.id, { body: bodyValue })
    setContent(updated)
    setIsBodyEditing(false)
  }

  // 選択ページのコンテンツを取得
  useEffect(() => {
    if (selectedId === null) return
    getContent(selectedId).then(data => {
      setContent(data)
      setTitleValue(data.title)
      setBodyValue(data.body)
    })
  }, [selectedId])

  if (!content) return <div className="flex-1">ページを選択してください</div>

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <div className="flex-1 flex flex-col px-10">
        <div className="w-full flex-1 flex flex-col max-w-[1080px] mt-7.5 mx-auto bg-bg-light rounded-2xl">
          <div className="flex items-center px-[30px] pt-[30px]">
            <div className="flex-1 pr-7.5 min-h-10 flex items-center">
              {isTitleEditing ? (
                <input 
                  className="w-full px-[30px] bg-white border border-brand rounded-lg text-2xl font-bold" 
                  value={titleValue}
                  onChange={(e) => setTitleValue(e.target.value)}
                />
              ) : (
                <h1 className="px-[30px] text-2xl font-bold">{content.title}</h1>
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
          <div className="flex-1 flex px-[30px] pt-5">
            <div className="flex-1 pr-7.5">
              {isBodyEditing ? (
                <textarea 
                  className="block w-full h-full min-w-0 bg-white border border-brand rounded-lg p-7.5"
                  value={bodyValue}
                  onChange={(e) => setBodyValue(e.target.value)}
                />
              ) : (
                <div className="bg-white p-7.5 overflow-auto">{content.body}</div>
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
