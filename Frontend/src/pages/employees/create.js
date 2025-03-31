import Button from '@/components/Button'
import Input from '@/components/Input'
import Password from '@/components/Password'
import Layout from '@/layout/Layout'
import Card from '@/modules/books/Card'
import SmallCard from '@/modules/books/SmallCard'
import FilterBar from '@/modules/FilterBar'
import Loader from '@/modules/Loader'
import Pagination from '@/modules/Pagination'
import SingleUser from '@/modules/SingleUser'
import { addAuthor } from '@/services/APIs/author'
import { addEmployees } from '@/services/APIs/employees'
import { getAllSeekers } from '@/services/APIs/user'
import { comparePasswords, generatePassword, isRequired } from '@/Utilities/helpers'
import { successMessage } from '@/Utilities/toasters'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
export default function Index({role}) {
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const router = useRouter();
  const generatePasswordHandler = () => {
    const password = generatePassword();
    const passwordInput = document.getElementsByName("author_password")[0];
    if (passwordInput) {
      passwordInput.value = password;
    }
    const passwordInput2 = document.getElementsByName("author_confirm_password")[0];
    if (passwordInput2) {
      passwordInput2.value = password;
    }
    return true;
  }
  const formHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("author_name");
    const email = formData.get("author_email");
    const password = formData.get("author_password");
    const confirm_password = formData.get("author_confirm_password");
    
    if(isRequired(name, "Employee Name") && isRequired(email, "Employee Email") && isRequired(password, "Password") && isRequired(confirm_password, "Confirm Password") && comparePasswords(password, confirm_password)){
      setLoading(true);
      const response = await addEmployees({name, email, password});
      if(response.status){
        router.push("/employees")
      }
      setLoading(false);
    }
  }
  return (
    <Layout role={role}>
      <div className='w-full flex flex-wrap items-center'>
        <Button variant="white-border" className="w-fit mr-3 items-center" onClick={() => router.push("/employees")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M14 8C14 8.27614 13.7761 8.5 13.5 8.5L2.5 8.5C2.22386 8.5 2 8.27614 2 8C2 7.72386 2.22386 7.5 2.5 7.5L13.5 7.5C13.7761 7.5 14 7.72386 14 8Z" fill="#8C8D8C"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M7.35355 3.14645C7.54882 3.34171 7.54882 3.65829 7.35355 3.85355L3.20711 8L7.35355 12.1464C7.54881 12.3417 7.54881 12.6583 7.35355 12.8536C7.15829 13.0488 6.84171 13.0488 6.64645 12.8536L2.14645 8.35355C1.95118 8.15829 1.95118 7.84171 2.14645 7.64645L6.64645 3.14645C6.84171 2.95118 7.15829 2.95118 7.35355 3.14645Z" fill="#8C8D8C"/>
            </svg>
        </Button>
        <h1 className='text-black-4 text-3xl font-semibold'>Add Employee</h1>
      </div>
      <form onSubmit={formHandler} className='w-full bg-[#FFF] mt-5 rounded-xl p-5 flex-wrap'>
        <div className='w-full flex flex-wrap mb-5'>
            <label className='w-full text-[#555555] font-medium mb-2 text-sm'>Employee Name<span className='text-red-500'>*</span></label>
            <Input type={"text"} placeholder={"Enter Employee name"} autoComplete="off" name={"author_name"} />
        </div>
        <div className='w-full flex flex-wrap mb-5'>
            <label className='w-full text-[#555555] font-medium mb-2 text-sm'>Employee Email<span className='text-red-500'>*</span></label>
            <Input type={"email"} autoComplete="off" placeholder={"Enter Employee email"} name={"author_email"} />
        </div>
        <div className='w-full flex flex-wrap mb-5'>
            <label className='w-full text-[#555555] font-medium mb-2 text-sm'>Password<span className='text-red-500'>*</span></label>
            <div className='w-full flex flex-wrap'>
                <div className="w-10/12">
                  <Password placeholder={"Enter Password"} autoComplete="off" name={"author_password"} />
                </div>
                <div className='w-2/12 pl-5 flex'>
                    <span role="button" aria-label='Generate Password Button' className="font-normal rounded-md flex items-center justify-center text-primary bg-white border-primary border text-sm px-4 py-2.5 w-full" onClick={generatePasswordHandler}>Generate Password</span>
                </div>
            </div>
        </div>
        <div className='w-full flex flex-wrap mb-5'>
            <label className='w-full text-[#555555] font-medium mb-2 text-sm'>Confirm Password<span className='text-red-500'>*</span></label>
            <Password placeholder={"Confirm Password"} name={"author_confirm_password"} />
        </div>
        <div className='w-full gap-5 flex items-end justify-end'>
            {/* <Button className="w-fit" variant={"outline-primary"} >Cancel</Button> */}
            <Button className="w-fit" type="submit" loading={loading} variant={"primary"} >Add Employee</Button>
        </div>
      </form>
    </Layout>
  )
}

export async function getServerSideProps({ req, res }) {
  const role = req.cookies._r || null;
  return {
    props: {
      role: role,
    },
  };
}
