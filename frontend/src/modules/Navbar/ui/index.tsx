import {NavLink} from "react-router-dom";
import user from '@/assets/user.png'
interface Props{
  title:string;
}

const Navbar = ({title}:Props) => {
  const handleLeave = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <header className="w-[100vw] bg-gray-100 z-10 flex justify-between items-center py-3 pl-[6vw] pr-8 fixed top-0 left-0 ">
      <h3 className="text-xl">{title}</h3>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component" src={user} />
          </div>
        </div>
        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow flex flex-col gap-1 dropdown-content bg-base-100 rounded-box w-52">
          <li className="w-full">
            <NavLink to="/portfolio" className="block w-full px-2 py-1 rounded-md hover:bg-violet-50">
              Профиль
            </NavLink>
          </li>
          <li className="w-full flex justify-start text-start"><button type="button" className="text-start w-full px-2 py-1 rounded-md text-violet-600 hover:bg-violet-50" onClick={handleLeave}>Выйти</button></li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
