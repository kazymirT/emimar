import { useState } from "react";
import { useGetProjectsQuery } from "../../store/projects/projects.api";
import { Header } from "./Header/Header";
import { Table } from "./Table/Table";
import { CreateProject } from "./CreateProject";


export const Projects = () => {
  const [search, setSearch] = useState("");
  const { data, refetch, isLoading } = useGetProjectsQuery({ q: search });
  const [modal, setModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleSearch = (val) => setSearch(val);

  const handleCloseModal = () => {
    setModal(false);
    setEditData(null);
  };

  const handleEdit = (data) => {
    setModal(true);
    setEditData(data);
  };

  return (
    <div className="nk-content p-0">
      {modal ? (
        <CreateProject
          onClose={handleCloseModal}
          editData={editData}
          onRefetchData={refetch}
          total={data?.response?.projects?.length}
        />
      ) : null}
      <div className="nk-content-inner">
        <div className="nk-content-body">
          <div className="nk-content">
            <div className="container-fluid">
              <div className="nk-content-inner">
                <div className="nk-content-body">
                  <Header
                    search={search}
                    onSearch={handleSearch}
                    onCreate={() => setModal(true)}
                    total={
                      data?.response?.count
                    }
                  />
                  <Table
                    data={data}
                    onEdit={handleEdit}
                    onRefetchData={refetch}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
