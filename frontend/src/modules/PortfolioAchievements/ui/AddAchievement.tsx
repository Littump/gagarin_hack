import Modal from "@/ui/Modal.tsx";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useAddAchievement } from "@/modules/PortfolioAchievements/api/useAddAchievement.ts";
import { DateType } from "react-tailwindcss-datepicker";
import { AddAchievementDto } from "@/modules/PortfolioAchievements/types/addAchievement.dto.ts";
import TextInput from "@/ui/TextInput.tsx";
import DateInput from "@/ui/DateInput.tsx";
import * as yup from "yup";

const validationsSchema = yup.object().shape({
  name: yup.string().required("Введите достижение").min(3, "Неверно введёно"),
  place: yup.string().required("Введите место").min(2, "Неверно введёно"),
  link: yup.string().required("Введите ссылку").min(4, "Неверно введёно"),
  description: yup
    .string()
    .required("Введите описание")
    .min(6, "Слишком короткое"),
});
const Button = () => {
  return (
    <div className="bg-blue-500 text-white rounded-full px-12 hover:bg-blue-600 btn">
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

interface IAddAchievement {
  name: string;
  date: {
    startDate: DateType;
    endDate: DateType;
  };
  place: string;
  link: string;
  description: string;
}

const initialValues: IAddAchievement = {
  name: "",
  date: {
    startDate: new Date(),
    endDate: new Date(),
  },
  place: "",
  link: "",
  description: "",
};

const convertToRes = (values: IAddAchievement): AddAchievementDto => {
  return {
    name: values.name,
    place: values.place,
    description: values.description,
    link: values.link,
    date_start: values.date.startDate?.toString() as string,
    date_finish: values.date.endDate?.toString() as string,
  };
};

const AddAchievement = () => {
  const { mutate, isPending, isSuccess } = useAddAchievement();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (isSuccess) setIsModalOpen(false);
  }, [isSuccess]);
  return (
    <Modal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      heading={<Button />}
      className="w-[700px] h-[90vh]"
    >
      <Formik
        validationSchema={validationsSchema}
        onSubmit={(values) => {
          console.log(convertToRes(values));
          mutate(convertToRes(values));
        }}
        initialValues={initialValues}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form className="flex flex-col py-6">
            <h2 className="font-bold text-xl">Добавьте достижение!</h2>
            <TextInput
              label="Достижение"
              placeholder="Достижение"
              name="name"
              isError={!!(errors.name && touched.name)}
            />
            <TextInput
              label="Место"
              placeholder="Где проводилось"
              name="place"
              isError={!!(errors.place && touched.place)}
            />
            <TextInput
              label="Ссылка"
              placeholder="Ссылка на достижение"
              name="link"
              isError={!!(errors.link && touched.link)}
            />
            <TextInput
              label="Описание"
              placeholder="Описание"
              name="description"
              isError={!!(errors.description && touched.description)}
            />
            <span className="font-semibold prose-sm my-2">
              Время провидения
            </span>
            <DateInput
              name="date"
              value={values.date}
              setFieldValue={setFieldValue}
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

export default AddAchievement;
