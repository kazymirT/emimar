
export const Header = ({ onCreateGroup, search, handleSearchChange }) => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="title">Group List</h5>
                <div className="nk-block-head-content d-flex align-items-center gap-2">
          <div className="form-control-wrap">
              <input
                type="text"
                className="form-control"
                placeholder="Search groups..."
                value={search}
                onChange={handleSearchChange}
              />
            </div>
        <button className="btn btn-primary" onClick={onCreateGroup}>
          + Create Group
        </button>
            </div>
      </div>
    </div>
  );
};
