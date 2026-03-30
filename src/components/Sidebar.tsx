import { useEffect, useState } from 'react'
import { getContents } from '../api/content'
import type { Content } from '../api/content'

const Sidebar = () => {
  const [contents, setContents] = useState<Content[]>([])
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    getContents().then(data => setContents(data))
  }, [])

  return (
    <div className="w-70 pl-10 pt-[30px] border-r border-[#F6F8FA]">
        <div className="flex items-center gap-1 mb-5">
            <img src="/src/assets/img/icon/logo.svg" className="h-8" />
            <span className="font-bold text-2xl text-[#1A1A1A]">ServiceName</span>
        </div>
        <ul>
        {contents.map(content => (
            <li key={content.id} className="flex justify-between">
                <span>{content.title}</span>
                {isEditing && <button>🗑</button>}
            </li>
        ))}
        </ul>
        {isEditing ? (
        <div>
            <button>New page</button>
            <button onClick={() => setIsEditing(false)}>Done</button>
        </div>
        ) : (
        <div>
            <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
        )}
    </div>
    )
}

export default Sidebar
