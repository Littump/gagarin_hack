import Modal from "@/ui/Modal.tsx";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import TextInput from "@/ui/TextInput.tsx";
import * as yup from "yup";
import { useAddService } from "@/modules/Services/api/useAddService.ts";

const validationsSchema = yup.object().shape({
  name: yup.string().required("Введите достижение").min(3, "Неверно введёно"),
  description: yup
    .string()
    .required("Введите место")
    .min(2, "Слишком короткое"),
});
const Button = () => {
  return (
    <div className="bg-violet-400 text-white rounded-full px-12 hover:bg-violet-600 btn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 font-bold"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
      Добавить
    </div>
  );
};
const AddService = () => {
  const { mutate, isPending, isSuccess } = useAddService();
  const initialValues = {
    name: "",
    description: "",
    link: "",
    image: "",
  };
  useEffect(() => {
    if (isSuccess) setIsModalOpen(false);
  }, [isSuccess]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Modal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      heading={<Button />}
      className="w-[700px] h-[80vh]"
    >
      <Formik
        validationSchema={validationsSchema}
        onSubmit={(values) => {
          mutate(values);
        }}
        initialValues={initialValues}
      >
        {({ errors, setFieldValue, touched }) => (
          <Form className="flex flex-col py-6">
            <h2 className="font-bold text-xl">Добавьте сервис!</h2>
            <span className=" font-semibold prose-sm mt-4">Картинка</span>
            <input
              className="w-full border border-violet-500 py-2 px-4 rounded-xl mt-1 "
              name="image"
              type="file"
              onChange={(e) => {
                setFieldValue(
                  "image",
                  e.currentTarget.files ? e.currentTarget.files[0] : "",
                );
              }}
            />
            <TextInput
              label="Название сервиса"
              placeholder="ООО тест"
              name="name"
              isError={!!(errors.name && touched.name)}
            />
            <TextInput
              label="Описание"
              placeholder="Какую пользу студентам принесёт этот сервис."
              name="description"
              isError={!!(errors.description && touched.description)}
            />
            <TextInput
              label="Ссылка на сервис"
              placeholder="Ссылка"
              name="link"
              isError={!!(errors.link && touched.link)}
            />
            <button type="submit" className="my-4 my-btn w-full">
              {isPending ? <span className="loading"></span> : "Добавить"}{" "}
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddService;
