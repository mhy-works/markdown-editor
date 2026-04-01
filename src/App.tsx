import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Main from './components/Main'

function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  return (
    <div className="flex h-screen">
      <Sidebar selectedId={selectedId} onSelect={setSelectedId} />
      {/* <Main selectedId={selectedId} /> */}
    </div>
  )
}

export default App
