import React, { useEffect } from "react";
import { useState } from "react";
import { SearchNormal1 } from "iconsax-react";
import { useDebounce } from "./MicroComponents";

const DebounceSearch = ({
  search,
  handleChange,
  add2Chardelay = true,
  placeholder,
}) => {
  const [searchLocal, setSearchLocal] = useState("");
  const debounceSearch = useDebounce(searchLocal);

  const handleSearch = (e) => {
    const value = e?.target?.value || "";
    setSearchLocal(value);
  };

  useEffect(() => {
    if (
      (add2Chardelay &&
        (debounceSearch?.length === 0 || debounceSearch?.length > 1)) ||
      !add2Chardelay
    ) {
      handleChange(debounceSearch || "");
    }
  }, [debounceSearch]);

  useEffect(() => {
    setSearchLocal(search);
  }, [search]);

  return (
    <>
      <div className="relative w-full max-w-xs">
        <input
          type="search"
          onChange={handleSearch}
          value={searchLocal}
          className="w-full py-2 pl-4 pr-10 bg-white border-2 rounded-full border-theme/20 focus:border-theme/80"
          placeholder={placeholder}
        />
        <SearchNormal1
          size="32"
          className="absolute p-1 transform -translate-y-1/2 rounded-full top-1/2 right-1 bg-theme/20 text-theme"
        />
      </div>
    </>
  );
};

export default DebounceSearch;
