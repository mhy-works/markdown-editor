import { useState } from 'react'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'

function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  return (
    <div className="flex h-screen">
      <Sidebar selectedId={selectedId} onSelect={setSelectedId} />
      <MainContent selectedId={selectedId} />
    </div>
  )
}

export default App
