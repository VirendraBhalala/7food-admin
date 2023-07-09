import { useEffect } from "react";
import { useState } from "react";
import { InfoCircle } from "iconsax-react";

export const InputError = ({ errorTitle, classes }) => {
  return (
    <>
      <div className={`flex items-center text-red text-sm  mt-2 ${classes}`}>
        <span>
          <InfoCircle size="16" />
        </span>
        <p className="ml-1">{errorTitle}</p>
      </div>
    </>
  );
};

export const ButtonTag = ({ className, value, type, ...rest }) => {
  return (
    <>
      <button
        // type={"type"}
        className={`font-semibold xl:text-base text-sm transition duration-500 w-full py-2 lg:px-4 px-2 rounded-md bg-theme/20 ${className}`}
        {...rest}
      >
        {value}
      </button>
    </>
  );
};

export const useDebounce = (value, delay = 500) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handleSearch = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handleSearch);
    };
  }, [delay, value]);
  return debounceValue;
};
