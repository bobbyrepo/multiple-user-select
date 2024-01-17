import React from "react";

function FilteredUsers({
  filteredUsers,
  setSearch,
  setShowFilter,
  setSelected,
  selected,
}) {
  const selectUser = (user) => {
    setSearch("");
    setShowFilter(false);
    setSelected([...selected, user]);
  };

  return (
    <div className="w-[350px] max-h-[400px] h-fit bg-red-300 rounded-xl overflow-auto">
      {filteredUsers.map((user) => (
        <div
          key={user.id}
          className="grid grid-cols-2 sm:gap-5 sm:text-lg px-3 sm:py-1 py-[2px] hover:bg-red-400"
          onClick={() => selectUser(user)}
        >
          <h1 className="">{user.username}</h1>
          <h1 className="">{user.email}</h1>
        </div>
      ))}
    </div>
  );
}

export default FilteredUsers;
