import Modal from "@/ui/Modal.tsx";
import {useEffect, useState} from "react";
import {Form, Formik} from "formik";
import TextInput from "@/ui/TextInput.tsx";
import * as yup from "yup";
import {useAddProblem} from "@/modules/PortfolioProblems/api/useAddProblem.ts";

const validationsSchema = yup.object().shape({
    name: yup
        .string()
        .required("Введите достижение")
        .min(3, "Неверно введёно"),
    description: yup
        .string()
        .required("Введите место")
        .min(2, "Слишком короткое"),
});
const Button = () => {
  return (
    <div className="bg-orange-300 text-white rounded-full px-12 hover:bg-orange-400 btn">
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
const AddProblem = () => {
    const {mutate, isPending, isSuccess} = useAddProblem()
    const initialValues={
        name:"",
        description:""
    }
    useEffect(() => {
        if(isSuccess) setIsModalOpen(false)
    }, [isSuccess]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
      <Modal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          heading={<Button />}
          className="w-[700px] h-[50vh]"
      >
          <Formik validationSchema={validationsSchema} onSubmit={(values)=>{mutate(values)}} initialValues={initialValues}>
              {({ errors,touched})=>(
                  <Form className="flex flex-col py-6">
                      <h2 className="font-bold text-xl">Добавьте точку роста!</h2>
                      <TextInput label="Точка роста" placeholder="Изучить python" name="name" isError={!!(errors.name && touched.name)}/>
                      <TextInput label="Описание" placeholder="Мне это нужно, чтобы лучше решать задачи по программированию." name="description" isError={!!(errors.description && touched.description)}/>
                      <button type="submit" className="my-4 my-btn w-full">{isPending ? <span className="loading"></span> :"Добавить"} </button>
                  </Form>)}
          </Formik>
      </Modal>
  );
};

export default AddProblem;
