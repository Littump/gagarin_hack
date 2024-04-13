import { RouterProvider, createHashRouter } from "react-router-dom";
import MainLayout from "./ui/MainLayout.tsx";
import Error from "./ui/Error.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import NewsPage from "@/pages/NewsPage.tsx";
import PortfolioPage from "@/pages/PortfolioPage.tsx";
import QuizPage from "@/pages/QuizPage.tsx";
import ServicesPage from "@/pages/ServicesPage.tsx";
import TestQuiz from "@/modules/Quiz/ui/TestQuiz.tsx";
import EnterludeQuiz from "@/modules/Quiz/ui/InterludeQuiz.tsx";
import PortfolioQuiz from "@/modules/Quiz/ui/PortfolioQuiz.tsx";
import InfoQuiz from "@/modules/Quiz/ui/InfoQuiz.tsx";
import ResultQuiz from "@/modules/Quiz/ui/ResultQuiz.tsx";

const router = createHashRouter([
  {
    path: "/login",
    element: (
      <MainLayout title="Вход">
        <LoginPage />
      </MainLayout>
    ),
    errorElement: <Error />,
  },
  {
    path: "/",
    element: (
      <MainLayout title="Сообщество">
        <NewsPage />
      </MainLayout>
    ),
    errorElement: <Error />,
  },
  {
    path: "/test",
    element: (
      <MainLayout title="Введение в функционал платформы">
        <QuizPage />
      </MainLayout>
    ),
    children: [
      {
        path: "",
        element: <InfoQuiz />,
      },
      {
        path: "test/:id",
        element: <TestQuiz />,
      },
      {
        path: "enterlude/:id",
        element: <EnterludeQuiz />,
      },
      {
        path: "portfolio/:id",
        element: <PortfolioQuiz />,
      },
      {
        path: "result",
        element: <ResultQuiz />,
      },
    ],
    errorElement: <Error />,
  },
  {
    path: "/portfolio",
    element: (
      <MainLayout title="Цифровое портфолио">
        <PortfolioPage />
      </MainLayout>
    ),
    errorElement: <Error />,
  },
  {
    path: "/services",
    element: (
      <MainLayout title="Сервисы">
        <ServicesPage />
      </MainLayout>
    ),
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
