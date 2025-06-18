import { useDrop } from 'react-dnd'
import { ItemTypes } from './constants'

function selectBackgroundColor(isActive, canDrop) {
  if (isActive) return 'darkgreen'
  else if (canDrop) return 'darkkhaki'
  return 'transparent'
}

export const FolderBox = ({ name, id, children }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: [ItemTypes.FILE, ItemTypes.FOLDER],
    drop: () => ({
      name: `${name} folder`,
      id,
      allowedDropEffect: 'move',
    }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [name, id])

  const isActive = canDrop && isOver
  const backgroundColor = selectBackgroundColor(isActive, canDrop)

  return (
    <div ref={drop} style={{ backgroundColor }} className='nk-file-item nk-file'>
      {children}
    </div>
  )
}
