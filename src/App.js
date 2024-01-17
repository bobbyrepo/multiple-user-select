import { useEffect, useState, useRef } from "react";
import "./App.css";
import FilteredUsers from "./components/filteredUsers";
import { userData } from "./dummydata";
import { IoMdClose } from "react-icons/io";

function App() {
  const inputRef = useRef();

  const [all, setAll] = useState(userData);
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [last, setLast] = useState("");

  useEffect(() => {
    const list = all
      .filter((user) => !selected.includes(user))
      .filter((user) =>
        user.username.toLowerCase().includes(search.toLowerCase())
      );

    setFilteredUsers(list);
  }, [search, all, selected]);

  useEffect(() => {
    if (!search) setShowFilter(false);
  }, [search]);

  const focusInput = () => {
    inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Backspace" &&
      e.target.value.length === 0 &&
      selected.length
    ) {
      if (last) setSelected(selected.filter((user) => user.id != last));
      setLast(selected[selected.length - 1].id);
    }
  };

  const handleInputChange = (e) => {
    setShowFilter(true);
    setSearch(e.target.value);
    setLast("");
  };

  return (
    <div className="sm:w-[80%] w-[96%] mx-auto h-screen">
      <h1 className="sm:text-2xl text-xl font-semibold text-center sm:pt-14 pt-8 sm:mb-6 mb-4">
        Select Users
      </h1>
      <div
        onClick={focusInput}
        className="bg-red-1 w-full flex flex-wrap gap-2"
      >
        {selected.map((user) => (
          <div
            key={user.id}
            className={`w-fit sm:py-2 py-1 sm:px-5 px-3 border  border-[2px] rounded-full flex sm:gap-2 gap-1 items-center
            ${user.id == last ? "border-red-400" : "border-gray-700"} 
            `}
          >
            <h1 className="sm:text-[16px] text-sm font-medium">
              {user.username}
            </h1>
            <IoMdClose
              className="sm:text-xl text-lg sm:-mr-2 -mr-1"
              onClick={() =>
                setSelected(selected.filter((item) => item != user))
              }
            />
          </div>
        ))}
        <div className="relative">
          <input
            ref={inputRef}
            className="px-3 sm:py-2 py-1 w-[350px] sm:text-[16px] text-sm focus:outline-none font-medium"
            type="text"
            value={search}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <div className="absolute">
            {showFilter && (
              <FilteredUsers
                filteredUsers={filteredUsers}
                setSearch={setSearch}
                setShowFilter={setShowFilter}
                setSelected={setSelected}
                selected={selected}
              />
            )}
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-700 h-[1.2px] mt-2 rounded-fill"></div>
    </div>
  );
}

export default App;
