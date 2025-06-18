import { FileCard } from "../../../../components/FileCard/FileCard";
import { FileBox } from "../../../../components/FileDnd/FileBox";
export const Files = ({ data, selected, onDelete, search }) => {
  if (
    data?.filter(({ parent_id }) =>
      selected ? parent_id === selected : parent_id === null
    )?.length === 0
  ) {
    return null;
  }
  return (
    <div className="nk-files-group">
      <h6 className="title">Files</h6>
      <div className="nk-files-list">
        {data
          ?.filter(({ parent_id, name }) =>
            search
              ? name.toLowerCase().includes(search)
              : selected
              ? parent_id === selected
              : parent_id === null
          )
          ?.map(({ id, name, size, created_at }) => (
            <FileBox key={id} id={id}>
            <FileCard
              isMove
              name={name}
              type={name?.split(".")?.[1]}
              size={size}
              date={created_at}
              onDelete={() => onDelete({ id, name, type: "file" })}
              />
            </FileBox>
          ))}
      </div>
    </div>
  );
};
