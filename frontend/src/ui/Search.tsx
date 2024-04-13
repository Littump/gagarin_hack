type Props = {
  className?: string;
  setSearch: (val: string) => void;
};

function Search({ setSearch, className }: Props) {
  return (
    <label className={`form-control relative`}>
      <input
        type="search"
        onChange={(e) => setSearch(e.target.value)}
        className={`input input-bordered ${className} rounded-2xl py-2 text-md w-full text-md`}
        placeholder={"Поиск"}
      />
      <span className="prose-sm absolute top-2.5 right-4 text-gray-500 text-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </span>
    </label>
  );
}

export default Search;
