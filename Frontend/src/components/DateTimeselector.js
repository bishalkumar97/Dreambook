import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

export default function DateTimeselector({handler, ...attributes}) {
  return (
    // <div className='cursor-pointer w-full flex flex-wrap justify-between font-jakarta text-base select-none bg-white text-black rounded-md border-2 border-[rgba(0, 0, 0, 0.05)] px-4 py-2 placeholder-shown:text-neutral4'>
        <DatePicker 
            format="MM - DD - YYYY, HH:mm:ss"
            minDate={new Date()}
            placeholder="mm/dd/yyyy hh:mm:ss"
            plugins={[
                <TimePicker key="Time-picker" position="bottom" />
            ]}
            onChange={handler}
            {...attributes}
          />
    // </div>
  )
}
