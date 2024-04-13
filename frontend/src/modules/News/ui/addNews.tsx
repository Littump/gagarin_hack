import Modal from "@/ui/Modal.tsx";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { DateType } from "react-tailwindcss-datepicker";
import TextInput from "@/ui/TextInput.tsx";
import DateInput from "@/ui/DateInput.tsx";
import * as yup from "yup";
import { AddNewsDto } from "@/modules/News/types/AddNews.dto.ts";
import { kindRussian } from "@/modules/News/types/INewsItem.ts";
import { getEventKindEnglish } from "@/modules/News/helpers/getEventKind.ts";
import DropdownInput from "@/ui/DropdownInput.tsx";
import { useAddNews } from "@/modules/News/api/useAddNews.ts";
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

interface IAddNews {
  points: number;
  avatar: string;
  kind: kindRussian;
  name: string;
  date: {
    startDate: DateType;
    endDate: DateType;
  };
  place: string;
  link: string;
  description: string;
}

const initialValues: IAddNews = {
  name: "",
  date: {
    startDate: new Date(),
    endDate: new Date(),
  },
  place: "",
  link: "",
  description: "",
  points: 0,
  avatar: "",
  kind: "Соревнование",
};

const convertToRes = (values: IAddNews): AddNewsDto => {
  return {
    ...values,
    kind: getEventKindEnglish(values.kind),
    date_start: values.date.startDate?.toString() as string,
    date_finish: values.date.endDate?.toString() as string,
  };
};

const AddNews = () => {
  const { mutate, isPending, isSuccess } = useAddNews();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(false);
    }
  }, [isSuccess]);
  const kinds: kindRussian[] = ["Соревнование", "Ивент", "Образование"];
  return (
    <Modal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      heading={<Button />}
      className="w-[700px] h-[600px] overflow-y-scroll"
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
            <h2 className="font-bold text-xl mb-4">Добавьте мероприятие!</h2>
            <span className=" font-semibold prose-sm">Картинка</span>
            <input
              className="w-full border border-violet-500 py-2 px-4 rounded-xl mt-1 mb-4"
              name="avatar"
              type="file"
              onChange={(e) => {
                setFieldValue(
                  "avatar",
                  e.currentTarget.files ? e.currentTarget.files[0] : "",
                );
              }}
            />
            <span className=" font-semibold prose-sm mb-1">
              Тип мероприятия
            </span>
            <DropdownInput
              placeholder="Тип мероприятия"
              items={kinds}
              onClick={(item) => setFieldValue("kind", item)}
            >
              {values.kind}
            </DropdownInput>
            <TextInput
              label="Мероприятие"
              placeholder="Спецкурс по программированию"
              name="name"
              isError={!!(errors.name && touched.name)}
            />
            <TextInput
              label="Место"
              placeholder="каб. 2402"
              name="place"
              isError={!!(errors.place && touched.place)}
            />
            <TextInput
              label="Ссылка"
              placeholder="Ссылка на мероприятие"
              name="link"
              isError={!!(errors.link && touched.link)}
            />
            <TextInput
              label="Описание"
              placeholder="Описание"
              name="description"
              isError={!!(errors.description && touched.description)}
            />
            <TextInput
              type="number"
              label="Баллы за посещение"
              placeholder="50"
              name="points"
              isError={!!(errors.points && touched.points)}
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

export default AddNews;
