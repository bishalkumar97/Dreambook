import Button from '@/components/Button'
import Layout from '@/layout/Layout'
import SmallCard from '@/modules/books/SmallCard'
import FilterBar from '@/modules/FilterBar'
import Loader from '@/modules/Loader'
import Pagination from '@/modules/Pagination'
import { getAllEmployees } from '@/services/APIs/employees'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
export default function Index({role}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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
    // dataSetter(query)
  }
  const fetchData = async () => {
    setLoading(true);
    const paylaod = {
      page:1,
      limit:24,
      role:"employee"
    }
    const response = await getAllEmployees(paylaod)
    if(response.status){
      setData(response.data.results);
      setLoading(false);
    }else{
      setLoading(false)
    }
  }
  useEffect(()=>{
    fetchData();
  },[])
  return (
    <Layout role={role}>
      <div className='w-full flex flex-wrap items-center justify-between'>
        <h1 className='text-black-4 text-3xl font-semibold'>Employees</h1>
        <Button variant="primary" className="w-fit items-center" onClick={() => router.push("/employees/create")}>
          <svg className='mr-2 mt-[1px]' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.625 7C2.625 6.75838 2.78823 6.5625 2.98958 6.5625H11.0104C11.2118 6.5625 11.375 6.75838 11.375 7C11.375 7.24162 11.2118 7.4375 11.0104 7.4375H2.98958C2.78823 7.4375 2.625 7.24162 2.625 7Z" fill="#FDFCFF"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M7 2.625C7.24162 2.625 7.4375 2.78823 7.4375 2.98958V11.0104C7.4375 11.2118 7.24162 11.375 7 11.375C6.75838 11.375 6.5625 11.2118 6.5625 11.0104V2.98958C6.5625 2.78823 6.75838 2.625 7 2.625Z" fill="#FDFCFF"/>
          </svg>
          Add Employee
        </Button>
      </div>
      <div className='w-full bg-[#FDFCFF] mt-5 rounded-md'>
        <FilterBar data={data} sort={true} handler={filterHandler} />
        {loading && <Loader/>}
        <div className='w-full bg-[#FDFCFF] grid grid-cols-5 gap-4 px-5 py-3 mb-4'>
          {!loading && data && data.length>0 && data.map((item, index) =>  <SmallCard key={`Employee-${index}`} url={`/employees/${item._id}`} variant={!item.isBlocked} name={item.name} description={item.email} />)}
        </div>
        {/* {data && <Pagination filters={filters} data={data} handler={filterHandler} />} */}
      </div>
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