import { useState } from 'react'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'

function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleUpdate = () => setRefreshKey(prev => prev + 1)

  return (
    <div className="flex h-screen">
      <Sidebar selectedId={selectedId} onSelect={setSelectedId} refreshKey={refreshKey} />
      <MainContent selectedId={selectedId} onUpdate={handleUpdate} />
    </div>
  )
}

export default App
