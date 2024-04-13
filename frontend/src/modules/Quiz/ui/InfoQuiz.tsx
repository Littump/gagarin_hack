import logo from "@/assets/logo.png";
import { NavLink } from "react-router-dom";
const InfoQuiz = () => {
  return (
    <>
      <div className="flex gap-10 items-center">
        <img src={logo} alt="" className="w-64" />
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-xl">О колледже</h2>
          <p className="text-sm text-gray-600">
            IThub college — колледж информационных технологий, где готовят
            лидеров цифрового мира! В колледже 6 кафедр: информационных
            технологий, дизайна, информационной безопасности и
            администрирования, маркетинга и коммерции, разработки игр и
            кинопроизводства. На базе каждой кафедры действует инкубатор —
            организация, где студенты выполняют заказы бизнес-партнёров. В
            колледже развёрнуто волонтёрское движение и создано сообщество
            IT-амбассадоров
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-6">
        <h2 className="font-bold text-xl">О платформе</h2>
        <p className="text-sm text-gray-600">
          LXP IThub — уникальная образовательная онлайн-платформа, меняющая
          парадигму IT-образования. Бизнес-ориентированное обучение стирает
          границы между теорией и практикой, между обучением и работой. На
          платформе студенты формируют портфолио, связываются с будущими
          работодателями и зарабатывают.
        </p>
      </div>
      <div className="flex flex-col gap-4 mt-6">
        <h2 className="font-bold text-xl">Адаптационные курсы</h2>
        <p className="text-sm text-gray-600">
          Познакомьтесь со всеми возможностями колледжа и информационной
          системы, используйте свои возможности по максимуму!
        </p>
      </div>
      <NavLink
        to="enterlude/1"
        className="btn bg-violet-500 hover:bg-violet-600 text-white mt-6 rounded-full"
      >
        Познакомиться с правилами
      </NavLink>
    </>
  );
};

export default InfoQuiz;
