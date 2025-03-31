import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

export default function Datepicker() {
    const dateRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false)
    const clickHandler = () => {
        if(dateRef.current){
            console.log(dateRef)
            dateRef.current.click();
        }
    }
    return (
        <div onClick={clickHandler} className='cursor-pointer w-full flex flex-wrap justify-between font-jakarta text-base select-none bg-white text-black rounded-md border-2 border-[rgba(0, 0, 0, 0.05)] px-4 py-2 placeholder-shown:text-neutral4'>
            <div className="">
                <span className="text-neutral-700">mm/dd/yyyy</span>
                <span className="ml-4 text-neutral-700">hh:mm aa</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19.5 2.625H17.625V1.875C17.625 1.57663 17.5065 1.29048 17.2955 1.0795C17.0845 0.868526 16.7984 0.75 16.5 0.75C16.2016 0.75 15.9155 0.868526 15.7045 1.0795C15.4935 1.29048 15.375 1.57663 15.375 1.875V2.625H8.625V1.875C8.625 1.57663 8.50647 1.29048 8.2955 1.0795C8.08452 0.868526 7.79837 0.75 7.5 0.75C7.20163 0.75 6.91548 0.868526 6.7045 1.0795C6.49353 1.29048 6.375 1.57663 6.375 1.875V2.625H4.5C4.00348 2.62746 3.528 2.8258 3.1769 3.1769C2.8258 3.528 2.62746 4.00348 2.625 4.5V19.5C2.62746 19.9965 2.8258 20.472 3.1769 20.8231C3.528 21.1742 4.00348 21.3725 4.5 21.375H19.5C19.9965 21.3725 20.472 21.1742 20.8231 20.8231C21.1742 20.472 21.3725 19.9965 21.375 19.5V4.5C21.3725 4.00348 21.1742 3.528 20.8231 3.1769C20.472 2.8258 19.9965 2.62746 19.5 2.625ZM19.125 4.875V7.125H4.875V4.875H19.125ZM4.875 19.125V9.375H19.125V19.125H4.875Z" fill="#525257"/>
            </svg>
            <input ref={dateRef} className="" type="datetime-local" />
        </div>
  )
}
