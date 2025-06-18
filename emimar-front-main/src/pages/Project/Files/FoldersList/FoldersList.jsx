import { EmptyMessage } from "../../../../components/EmptyMessage";
import { FileCard } from "../../../../components/FileCard/FileCard";
import { FolderBox } from "../../../../components/FileDnd/FolderBox";
import { FolderDraggable } from "../../../../components/FileDnd/FolderDraggable";
export const FoldersList = ({
  data,
  selected,
  onEdit,
  onDelete,
  onSelectFolder,
  search,
}) => {
  return (
    <div className="nk-files-group">
      <h6 className="title">Folder</h6>
      <div className="nk-files-list">
        {data?.filter(({ parent_id, name }) =>
          search
            ? name.toLowerCase().includes(search)
            : selected
            ? parent_id === selected
            : parent_id === null
        )?.length === 0 ? (
          <EmptyMessage title="Empty" />
        ) : (
          data
            ?.filter(({ parent_id, name }) =>
              search
                ? name.toLowerCase().includes(search)
                : selected
                ? parent_id === selected
                : parent_id === null
            )
            ?.map(({ id, name, size, created_at }) => (
              <FolderBox key={id} id={id}>
                <FolderDraggable id={id}>
                <FileCard
                  isMove
                  name={name}
                  type="folder"
                  size={size}
                  date={created_at}
                  onEdit={() => onEdit({ id, name })}
                  onDelete={() => onDelete({ id, name, type: "folder" })}
                  onSelect={() => onSelectFolder(id)}
                  />
                  </FolderDraggable>
               </FolderBox>
            ))
        )}
      </div>
    </div>
  );
};
