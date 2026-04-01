import { useEffect, useState } from 'react'
import { getContents } from '../api/content'
import type { Content } from '../api/content'
import Button from './Button'

type Props = {
  selectedId: number | null
  onSelect: (id: number) => void
}

const Sidebar = ({ selectedId, onSelect }: Props) => {
  const [contents, setContents] = useState<Content[]>([])
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    getContents().then(data => setContents(data))
  }, [])

  return (
    <div className="w-70 pt-[30px] border-r border-gray-light flex flex-col h-full">
        <div className="flex items-center gap-1 mb-5 pl-10">
            <img src="/src/assets/img/icon/logo.svg" className="h-8" />
            <span className="font-bold text-2xl text-[#1A1A1A]">ServiceName</span>
        </div>
        <ul className='pl-10'>
        {contents.map(content => (
            <li 
                key={content.id} 
                className={`flex justify-between items-center p-2.5  text-base rounded cursor-pointer ${selectedId === content.id ? 'bg-bg-light text-selected font-bold' : 'text-text-regular'}`}
                onClick={() => onSelect(content.id)}
            >
                <span className='truncate'>{content.title}</span>
                {isEditing && (
                <button>
                    <img src="/src/assets/img/icon/delete.svg" className="w-5 h-5" />
                </button>
                )}
            </li>
        ))}
        </ul>
        
        <div className='mt-auto pl-10 p-2.5 bg-gray-light'>
            {isEditing ? (
            <div className='flex gap-2.5 justify-between'>
                <Button variant="secondary" icon="/src/assets/img/icon/+.svg">New page</Button>
                <Button variant="primary" icon="/src/assets/img/icon/done.svg" onClick={() => setIsEditing(false)}>Done</Button>
            </div>
            ) : (
            <div className='flex justify-end'>
                <Button variant="primary" icon="/src/assets/img/icon/edit.svg" onClick={() => setIsEditing(true)}>
                    Edit
                </Button>
            </div>
            )}
        </div>
    </div>
    )
}

export default Sidebar
