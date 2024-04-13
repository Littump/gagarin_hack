import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import TextInput from "@/ui/TextInput.tsx";
import loginDto from "@/modules/Login/types/login.dto.ts";
import * as yup from "yup";
import YupPassword from "yup-password";
import { useLogin } from "@/modules/Login/api/useLogin.ts";
import { useEffect, useState } from "react";
import AlertComponent from "@/ui/AlertComponent.tsx";
YupPassword(yup);

const validationsSchema = yup.object().shape({
  username: yup.string().required("Введите телефон").min(4, "Слишком короткий"),
  password: yup
    .string()
    .typeError("Должно быть строкой")
    .required("Обязательное поле")
    .min(8, "Слишком простой")
    .minNumbers(1, "Добавьте 1 цифру"),
});
const LoginForm = () => {
  const initialValues: loginDto = {
    username: "89996665544",
    password: "13qwerty13",
  };
  const navigate = useNavigate();
  const { data, isError, isPending, mutate } = useLogin();
  const [alertIsShowing, setAlertIsShowing] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) navigate("/");
    if (!isPending && data) {
      localStorage.setItem("token", data?.data?.auth_token);
      navigate("/");
    } else if (!isPending && isError) {
      setAlertIsShowing(true);
      setTimeout(() => setAlertIsShowing(false), 5000);
    }
  }, [data, isPending, isError]);
  const handleSubmit = (values: loginDto) => {
    mutate(values);
  };
  return (
    <Formik
      validationSchema={validationsSchema}
      initialValues={initialValues}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ errors, touched }) => (
        <Form className="py-10 px-6 bg-gray-100 rounded-xl">
          <h1 className="text-3xl font-semibold">Вход</h1>
          <div className="flex flex-col gap-6 mt-6">
            <TextInput
              name="username"
              isError={!!(errors.username && touched.username)}
              error={errors.username}
              placeholder="телефон"
            />
            <TextInput
              name="password"
              type="password"
              error={errors.password}
              isError={!!(errors.password && touched.password)}
              placeholder="пароль"
            />
            <button type="submit" className={`my-btn`}>
              {isPending ? <span className="loading"></span> : "Войти"}
            </button>
            {isError ? (
              <AlertComponent className={`alert-error`} active={alertIsShowing}>
                <>
                  <h2 className="prose-md font-bold">Не удалось войти!</h2>
                  <p className="prose-sm">{`Проверьте введённые данные ещё раз`}</p>
                </>
              </AlertComponent>
            ) : null}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
