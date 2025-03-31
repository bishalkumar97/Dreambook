import React, { useState } from 'react'
import Input from './Input'
import Option from './Option';
import { cn } from '@/Utilities/cn';

export default function Select({placeholder, className, options, handler}) {
    const [showOptions, setShowOptions] = useState(false)
    const [addedTags, setAddedTags] = useState([]);
    const [dummy, setDummy]= useState(options);

    const selectorHandler = (e) => {
        const selectedTag = e.target.getAttribute("value");
        const tag = options.filter((item, index) => item._id == selectedTag);
        console.log(selectedTag);
        console.log(tag);
        const filteredTags = addedTags.filter((item, index) => item._id == selectedTag);
        if(filteredTags.length == 0){
            setAddedTags([...addedTags, ...tag]);
            handler([...addedTags, ...tag]);
        }
    }
    const searchFilter = (e) => {
        let keyword = e.target.value.toLowerCase();
        const filterData = options.filter((item, index) => item.name.toLowerCase().includes(keyword));
        setDummy(filterData);
    }
    const deleteTagHandler = (id) => {
        let keyword = id;
        const filterData = addedTags.filter((item, index) => item._id != keyword);
        setAddedTags(filterData);
        handler(filterData);
    }
    return (
        <>
            <div className={cn('w-full flex flex-wrap', className)}>
                {addedTags.map((item, index) => <Option value={item._id} className="m-1 py-2 px-3 text-sm" onClick={() => deleteTagHandler(item._id)} key={`Added-tags-${index}-${Math.random()}`}>
                    {item.name}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M11.5999 4.40002L4.3999 11.6" stroke="#1c1c1c" strokeWidth="1.2" strokeinecap="round" strokeLinejoin="round"/>
                        <path d="M4.3999 4.40002L11.5999 11.6" stroke="#1c1c1c" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </Option>)}

                <Input className="mt-1" placeholder={placeholder} readOnly={false}  onChange={searchFilter} onFocus={() => setShowOptions(true)} />
                {showOptions && dummy && dummy.length>0 && <>                    
                    <ul className=' w-full mt-2 border rounded-md max-h-40 overflow-y-scroll relative flex flex-wrap justify-end transition'>
                        <button className='text-xs border border-primary3 bg-primary3 py-0.5 px-2 rounded mt-2 absolute z-50 top-1 right-2 hover:scale-110' onClick={() => setShowOptions(false)}>ESC</button>
                        {dummy.map((item, index)=> <li onClick={selectorHandler} value={item._id} key={`Option-${index}`} className='w-full select-none py-1.5 px-2 cursor-pointer text-blue hover:text-primary hover:bg-primary3'>{item.name}</li>)}
                    </ul>
                </>}
            </div>
        </>
    )
}
