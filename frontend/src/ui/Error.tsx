import { NavLink } from "react-router-dom";

function Error() {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center ">
      <div className="flex flex-col text-center gap-4">
        <span className="text-5xl">😿</span>
        <h1 className="text-3xl">Не удалось найти страницу!</h1>
        <NavLink to="/" className="link-error">
          На главную
        </NavLink>
      </div>
    </div>
  );
}

export default Error;
