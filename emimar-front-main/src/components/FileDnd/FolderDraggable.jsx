import { useDrag } from 'react-dnd'
import { ItemTypes } from './constants'
import { toast } from "react-toastify";
import { useMoveFolderMutation } from '../../store/files/files.api';

export const FolderDraggable = ({ children, id }) => {
  const [moveFolder] = useMoveFolderMutation();
  const [{ opacity }, drag] = useDrag(() => ({
    type: ItemTypes.FOLDER,
    item: { id },
    async end(item, monitor) {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        if (item.id === dropResult.id) {
          toast.error("Не можна перемістити папку саму в себе")
          return
        }
        try {
          await moveFolder({ folder_id: item.id, new_parent_id: dropResult.id }).unwrap()
          toast.success("Папка переміщена")
        } catch {
          toast.error("Помилка при переміщенні папки")
        }
      }
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 1 : 1,
    }),
  }), [id])

  return <div ref={drag} style={{ opacity }}>{children}</div>
}
