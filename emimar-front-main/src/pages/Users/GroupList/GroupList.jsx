import { useState } from "react";
import { Header } from "./Header/Header";
import { GroupModal } from "./GroupModal";
import { useGetGroupsQuery } from "../../../store/groups/groups.api";
import { Table } from "./Table/Table";

export const GroupList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, refetch, isLoading } = useGetGroupsQuery({ page: currentPage });
  const [showModal, setShowModal] = useState(false);
  const [editGroup, setEditGroup] = useState(null);
  const [search, onSearch] = useState("");

  const handleChangePage = (page) => setCurrentPage(page);
  const handleEdit = (group) => {
    setShowModal(true);
    setEditGroup(group);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setEditGroup(null);
  };
  return (
    <div className="tab-pane fade show active">
      {showModal && (
        <GroupModal
          onClose={handleCloseModal}
          onRefreshData={refetch}
          editData={editGroup}
        />
      )}
      <Header 
        onCreateGroup={() => setShowModal(true)}
        search={search}
        handleSearchChange={(e) => onSearch(e.target.value)}
      />
      <Table
        data={data}
        search={search}
        onRefetch={refetch}
        onEdit={handleEdit}
        isLoading={isLoading}
      />
    </div>
  );
};
