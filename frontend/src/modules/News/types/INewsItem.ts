
export type kindEnglish = "event" | "competition" | "education"
export type kindRussian = "Ивент" | "Соревнование" | "Образование"
export interface INewsItem{
    id:number;
    name:string;
    description:string;
    date_start:string;
    date_finish:string;
    place:string;
    points:number;
    avatar:string;
    link:string;
    kind:kindEnglish;
}