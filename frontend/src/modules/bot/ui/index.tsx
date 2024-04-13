import TextInput from "@/ui/TextInput.tsx";
import { Form, Formik } from "formik";
import { useGetAnswer } from "@/modules/bot/api/useGetAnswer.ts";

const Bot = () => {
  const { mutate, data, isPending } = useGetAnswer();
  const handleGetAnswer = (q: string) => {
    mutate(q);
  };
  return (
    <Formik
      onSubmit={(values) => {
        handleGetAnswer(values.question);
      }}
      initialValues={{ question: "" }}
    >
      {() => {
        return (
          <Form className="flex flex-col gap-8 mt-10 mb-12">
            <h2 className="text-2xl font-bold">Виртуальный помощник</h2>
            <div className="flex gap-2 items-end">
              <TextInput
                name="question"
                isError={false}
                className="w-[400px]"
                label="Ваш вопрос"
                placeholder="Что вас интересуют?"
              />
              <button type="submit" className="my-btn w-40">
                {isPending ? <span className="loading"></span> : "Узнать"}
              </button>
            </div>
            {data && (
              <div className="text-xl py-3 px-6 bg-violet-100 text-violet-600 w-[570px] rounded-xl">
                {data.data.text}
              </div>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default Bot;
