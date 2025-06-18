import { useDrag } from 'react-dnd'
import { ItemTypes } from './constants'
import { toast } from "react-toastify";
import { useMoveFileMutation } from '../../store/files/files.api';

export const FileBox = ({ children, id }) => {
  const [moveFile] = useMoveFileMutation();
  const [{opacity}, drag] = useDrag(() => ({
    type: ItemTypes.FILE,
    item: { id },
    async end(item, monitor) {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        try {
          await moveFile({ file_id: item.id, new_parent_id: dropResult.id }).unwrap()
          toast.success("Файл переміщено")
        } catch {
          toast.error("Помилка при переміщенні файлу")
        }
      }
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.1 : 1,
    }),
  }), [id])
  return <div ref={drag} style={{ opacity }} className="nk-file-item nk-file">{children}</div>
}
