import { useState } from 'react'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import Modal from './components/Modal'
import { deleteContent } from './api/content'

function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [isNewContent, setIsNewContent] = useState(false)
  const [isTitleEditing, setIsTitleEditing] = useState(false)
  const [isBodyEditing, setIsBodyEditing] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [pendingId, setPendingId] = useState<number | null>(null)
  const [newUnsavedId, setNewUnsavedId] = useState<number | null>(null)

  const handleUpdate = () => setRefreshKey(prev => prev + 1)
  const handleCreateNew = (id: number) => { setIsNewContent(true); setNewUnsavedId(id) }
  const handleNewContentHandled = () => setIsNewContent(false)
  const handleBodySaved = () => setNewUnsavedId(null)

  const handleSelect = (id: number | null) => {
    if (isTitleEditing || isBodyEditing) {
      setPendingId(id)
      setShowModal(true)
      return
    }
    setSelectedId(id)
  }

  // モーダルの確認・キャンセル処理
  const handleModalConfirm = async () => {
    if (newUnsavedId !== null && newUnsavedId === selectedId) {
      await deleteContent(newUnsavedId)
      setNewUnsavedId(null)
      handleUpdate()
    }
    setIsTitleEditing(false)
    setIsBodyEditing(false)
    setSelectedId(pendingId)
    setPendingId(null)
    setShowModal(false)
  }

  const handleModalCancel = () => {
    setPendingId(null)
    setShowModal(false)
  }

  return (
    <div className="flex h-screen">
      <Sidebar 
        selectedId={selectedId} 
        onSelect={handleSelect}
        refreshKey={refreshKey} 
        onCreateNew={handleCreateNew} 
      />
      <MainContent 
        selectedId={selectedId} 
        onUpdate={handleUpdate} 
        isNewContent={isNewContent} 
        onNewContentHandled={handleNewContentHandled}
        isTitleEditing={isTitleEditing}
        setIsTitleEditing={setIsTitleEditing}
        isBodyEditing={isBodyEditing}
        setIsBodyEditing={setIsBodyEditing}
        onBodySaved={handleBodySaved}
      />
      {showModal && (
        <Modal 
          message="編集中の内容が破棄されます。よろしいですか？" 
          onConfirm={handleModalConfirm} 
          onCancel={handleModalCancel}
        />
      )}
    </div>
  )
}

export default App
