import { useState } from "react";
import { useGetUsersQuery } from "../../../store/auth/auth.api";
import { Header } from "./Header/Header";
import { Table } from "./Table/Table";
import { UserModal } from "./UserModal";
import { ChangePasswordModal } from "./ChangePasswordModal";

export const UsersList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, refetch, isLoading } = useGetUsersQuery({ page: currentPage });
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [changePassword, setChangePassword] = useState(null);
  const [search, onSearch] = useState("");

  const handleChangePage = (page) => setCurrentPage(page);
  const handleEditUser = (user) => {
    setShowModal(true);
    setEditUser(user);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setEditUser(null);
    setChangePassword(null);
  };
  const handleChangePassword = (user) => {
    setShowModal(true);
    setChangePassword(user);
  }

  return (
    <div className="tab-pane fade show active">
      {showModal && (
        changePassword ? 
        <ChangePasswordModal 
          onClose={handleCloseModal}
          onRefetchUser={refetch}
          user={changePassword} /> 
        :
        <UserModal
          onClose={handleCloseModal}
          onRefetchUser={refetch}
          editUser={editUser}
        />
      )}
      <Header 
        onCreateUser={() => setShowModal(true)}
        search={search}
        handleSearchChange={(e) => onSearch(e.target.value)}
      />
      <Table
        data={data}
        search={search}
        onChangePage={handleChangePage}
        onRefetchUser={refetch}
        onEdit={handleEditUser}
        onChangePassword={handleChangePassword}
        isLoading={isLoading}
      />
    </div>
  );
};
