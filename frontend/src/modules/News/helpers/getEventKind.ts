import {kindEnglish, kindRussian} from "@/modules/News/types/INewsItem.ts";

export function getEventKindRussian(value:kindEnglish):kindRussian{
    if(value === "event") return "Ивент"
    if(value === "competition") return "Соревнование"
    return "Образование"
}

export function getEventKindEnglish(value:kindRussian):kindEnglish{
    if(value === "Ивент") return "event"
    if(value === "Соревнование") return "competition"
    return "education"
}