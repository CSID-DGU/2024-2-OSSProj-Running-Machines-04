import { ReactComponent as SearchIcon } from "@/assets/icons/SearchIcon.svg";

const Searchbar = () => {
  return (
    <div className="z-10 w-11/12 bg-white rounded-md m-4 p-3 shadow-searchbarShadow flex items-center gap-4">
      <SearchIcon />
      <input type="text" placeholder="장소를 입력해주세요" />
    </div>
  );
};

export default Searchbar;
