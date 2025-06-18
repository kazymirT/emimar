import { useState } from "react";
import { useAppSelect } from "../../hooks/redux";
import {
  useGetProjectFileEntryQuery,
  useGetProjectThreeQuery,
} from "../../store/files/files.api";
import { Files } from "./Files/Files";
import { Three } from "./Three";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const ItemTypes = {
  KNIGHT: 'knight'
}

export const Project = () => {
  const { selectedProject } = useAppSelect((state) => state.auth);
  const [search, onSearch] = useState("");
  const { data: threeData, refetch: refetchThree } =
    useGetProjectThreeQuery(selectedProject);
  const { data, refetch } = useGetProjectFileEntryQuery({ q: search, project_id: selectedProject });
  const [selected, setSelected] = useState();

  const handleSelectFolder = (id) => {
    setSelected(id);
  };

  const handleRefetchData = () => {
    if (data) {
      refetch();
      refetchThree();
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
    <div className="nk-content p-0">
      <div className="nk-content-inner">
        <div className="nk-content-body">
          <div className="nk-fmg">
            <Three
              data={threeData}
              selected={selected}
              onSelect={handleSelectFolder}
            />
            <Files
              data={data}
              selected={selected}
              onSearch={onSearch}
              search={search}
              onRefetchData={handleRefetchData}
              onSelectFolder={(id) => setSelected(id)}
            />
          </div>
        </div>
      </div>
    </div>
  </DndProvider>
  );
};
