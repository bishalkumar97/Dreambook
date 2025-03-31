import Button from '@/components/Button'
import Input from '@/components/Input'
import Password from '@/components/Password'
import Toggler from '@/components/Toggler'
import Layout from '@/layout/Layout'
import Card from '@/modules/books/Card'
import SmallCard from '@/modules/books/SmallCard'
import FilterBar from '@/modules/FilterBar'
import Loader from '@/modules/Loader'
import Pagination from '@/modules/Pagination'
import SingleUser from '@/modules/SingleUser'
import Table from '@/modules/Table'
import { editAuthor, getSingleAuthor } from '@/services/APIs/author'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
export default function Index({role}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [filters,setFilters] = useState({
    keyword:'',
    status:'',
    page:1,
    limit:10
  })
  const filterHandler = (keyword,status,page,limit,sort) => {
    setFilters({
      keyword:keyword,
      status:status,
      sort:sort,
      page:page,
      limit:limit
    })
    let query = '?page='+page+"&limit="+limit

    if(sort != ''){
      query = query+'&sort='+sort
    }
    if(status != ''){
        query = query+'&is_verify='+status
      }
    if(keyword != ''){
      query = query+'&search='+keyword
    }
    dataSetter(query)
  }
  const fetchData = async () => {
    setLoading(true);
    const response = await getSingleAuthor(router.query["id"])
    if(response.status){
      setData(response.data);
      setLoading(false);
    }else{
      setLoading(false)
    }
  }
  const authorStatusHandler = async (status) => {
    const payload = {
      isBlocked: !status
    }
    const res = await editAuthor(payload, router.query["id"]);
    if(res.status){

    }
  }
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <Layout role={role}>
      <div className='w-full flex flex-wrap items-center'>
        <div className='flex flex-wrap items-center w-3/4'>
          <Button variant="white-border" className="w-fit mr-3 items-center" onClick={() => router.push("/authors")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M14 8C14 8.27614 13.7761 8.5 13.5 8.5L2.5 8.5C2.22386 8.5 2 8.27614 2 8C2 7.72386 2.22386 7.5 2.5 7.5L13.5 7.5C13.7761 7.5 14 7.72386 14 8Z" fill="#8C8D8C"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.35355 3.14645C7.54882 3.34171 7.54882 3.65829 7.35355 3.85355L3.20711 8L7.35355 12.1464C7.54881 12.3417 7.54881 12.6583 7.35355 12.8536C7.15829 13.0488 6.84171 13.0488 6.64645 12.8536L2.14645 8.35355C1.95118 8.15829 1.95118 7.84171 2.14645 7.64645L6.64645 3.14645C6.84171 2.95118 7.15829 2.95118 7.35355 3.14645Z" fill="#8C8D8C"/>
              </svg>
          </Button>
          <h1 className='text-black-4 text-3xl font-semibold'>Author Details</h1>
        </div>
        {!loading && <div className='w-1/4 flex flex-wrap items-center justify-end'>
          {/* <span className='w-3/12 text-right font-semibold'>Status:</span> */}
          <div className='w-full max-w-64'>
            <Toggler isSelected={data && !data.isBlocked} color="white" callback={authorStatusHandler} label1={"Active"} label2={"Suspended"} />
          </div>
        </div>}
      </div>
      {loading?<div className='w-full bg-[#FFF] mt-5 rounded-xl p-5 flex-wrap'><Loader /></div> : <>
        <div className='w-full bg-[#FFF] mt-5 rounded-xl p-5 flex-wrap'>
          <div className='w-full flex flex-wrap mb-5'>
              <label className='w-full text-[#555555] font-medium mb-2 text-sm'>Author Name</label>
              <Input type={"text"} readOnly={true} placeholder={"Enter author name"} defaultValue={data && data.name} />
          </div>
          <div className='w-full flex flex-wrap mb-5'>
              <label className='w-full text-[#555555] font-medium mb-2 text-sm'>Author Email</label>
              <Input type={"email"} readOnly={true} placeholder={"Enter auhtor email"} defaultValue={data && data.email} />
          </div>

          <div className='w-full grid grid-cols-2 gap-x-4'>
            <div className='w-full flex flex-wrap mb-5'>
                <label className='w-full text-[#555555] font-medium mb-2 text-sm'>Account Holder Name</label>
                <Input type={"text"} readOnly={true} placeholder={"Enter Account Holder Name"} defaultValue={data && data.accountHolderName} />
            </div>
            <div className='w-full flex flex-wrap mb-5'>
                <label className='w-full text-[#555555] font-medium mb-2 text-sm'>Account Number</label>
                <Input type={"text"} readOnly={true} placeholder={"Enter Account Number"} defaultValue={data && data.accountNumber} />
            </div>
            <div className='w-full flex flex-wrap mb-5'>
                <label className='w-full text-[#555555] font-medium mb-2 text-sm'>Bank Name</label>
                <Input type={"text"} readOnly={true} placeholder={"Enter Bank Name"} defaultValue={data && data.bankName} />
            </div>
            <div className='w-full flex flex-wrap mb-5'>
                <label className='w-full text-[#555555] font-medium mb-2 text-sm'>IFSC Code</label>
                <Input type={"text"} readOnly={true} placeholder={"IFSC Code"} defaultValue={data && data.ifscCode} />
            </div>
          </div>
        </div>

        <div className='w-full bg-white rounded-lg p-4 mt-5'>
          <h2 className='font-medium mb-3 text-sm'>Payments History</h2>
          <Table>
            <thead>
              <tr className='border-b-1.5'>
                <th className='w-2/12 text-light-grey text-left'>Payment Date</th>
                <th className='w-2/12 text-light-grey text-center'>Total Sales</th>
                <th className='w-2/12 text-light-grey text-center'>Total Earnings</th>
                <th className='w-2/12 text-light-grey text-center'>Total Returned</th>
                <th className='w-2/12 text-light-grey text-center'>Return Royalty</th>
                <th className='w-2/12 text-light-grey text-center'>Total to pay</th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b-1.5'>
                <td className='w-2/12 text-light-black text-left'>10/11/2024</td>
                <td className='w-2/12 text-light-black text-center'>100</td>
                <td className='w-2/12 text-light-black text-center'>
                  ₹20,000
                </td>
                <td className='w-2/12 text-light-black text-center'>10</td>
                <td className='w-2/12 text-light-black text-center text-orange'>-₹500</td>
                <td className='w-2/12 text-light-black text-center '>₹4,500</td>
              </tr>
              <tr className='border-b-1.5'>
                <td className='w-2/12 text-light-black text-left'>10/11/2024</td>
                <td className='w-2/12 text-light-black text-center'>100</td>
                <td className='w-2/12 text-light-black text-center'>
                  ₹20,000
                </td>
                <td className='w-2/12 text-light-black text-center'>10</td>
                <td className='w-2/12 text-light-black text-center text-orange'>-₹500</td>
                <td className='w-2/12 text-light-black text-center '>₹4,500</td>
              </tr>
              <tr className='border-b-1.5'>
                <td className='w-2/12 text-light-black text-left'>10/11/2024</td>
                <td className='w-2/12 text-light-black text-center'>100</td>
                <td className='w-2/12 text-light-black text-center'>
                  ₹20,000
                </td>
                <td className='w-2/12 text-light-black text-center'>10</td>
                <td className='w-2/12 text-center text-orange'>-₹500</td>
                <td className='w-2/12 text-light-black text-center '>₹4,500</td>
              </tr>
              <tr className=''>
                <td className='w-2/12 text-light-black text-left'>10/11/2024</td>
                <td className='w-2/12 text-light-black text-center'>100</td>
                <td className='w-2/12 text-light-black text-center'>
                  ₹20,000
                </td>
                <td className='w-2/12 text-light-black text-center'>10</td>
                <td className='w-2/12 text-center text-orange'>-₹500</td>
                <td className='w-2/12 text-light-black text-center '>₹4,500</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </>}
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