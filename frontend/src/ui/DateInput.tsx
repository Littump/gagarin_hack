import Datepicker, {DateValueType} from "react-tailwindcss-datepicker";

interface Props {
    name:string;
    value:DateValueType;
    setFieldValue:(name:string,val:DateValueType)=>void
}

function DateInput({name,value,setFieldValue}: Props) {
  return (
      <Datepicker
          classNames={{input:()=>"border border-violet-400 w-full py-2 px-4 rounded-xl"}}
          i18n={"ru"}
          separator={":"}
          primaryColor={"violet"}
          displayFormat={"DD/MM/YYYY"}
          value={value}
          onChange={(value)=>setFieldValue(name,value)}
      />
  );
}

export default DateInput;
