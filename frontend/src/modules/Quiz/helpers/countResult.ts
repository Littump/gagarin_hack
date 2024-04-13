import { IQuestion } from "@/modules/Quiz/types/quizTypes.ts";

export function countResult(
  questions: IQuestion[],
  answers: string[][],
): number {
  let count = 0;
  for (let i = 0; i < answers.length; i++) {
    let ans = answers[i];
    let variants = questions[i].variants;
    let variants_text = questions[i].variants.map((el) => el.text);
    let variants_is_answer = variants.reduce(
      (sum, el) => sum + +el.is_answer,
      0,
    );
    let is_good_ans = true;
    for (let i = 0; i < ans.length; i++) {
      //вычислим что количество ответов совпало
      //вычислим что все что есть is_good
      let index = variants_text.indexOf(ans[i]);
      if (!variants[index].is_answer) is_good_ans = false;
    }
    if (variants_is_answer !== ans.length) is_good_ans = false;

    if (is_good_ans) {
      count += 1;
    }
  }
  return (count / questions.length) * 100;
}
