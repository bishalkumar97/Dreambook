import React, { useEffect, useState } from 'react'
import Personal from '@/modules/profile/Personal'
import Residential from '@/modules/profile/Residential'
import WorkDetail from '@/modules/profile/WorkDetail'
import Preferred from '@/modules/profile/Preferred'
import Layout from '@/layout/Layout'
import { useRouter } from 'next/router'
import UploadedDocument from '@/modules/profile/UploadedDocument'
import Loader from '@/modules/Loader'
import { getSingleSeeker } from '@/services/APIs/user'
import Button from '@/components/Button'
import Card from '@/modules/books/Card'
import Badge from '@/components/Badge'
import Table from '@/modules/Table'
import { permissionHandler } from '@/Utilities/permissions'
import { editBook, getSingleBook } from '@/services/APIs/books'

export default function Book({role}) {
    const router = useRouter();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const bookType = {
        "paperBack": "Paper Back",
        "hardCover": "Hard Cover",
        "ebook": "Ebook"
    }
    const fetchData = async (book) => {
        setLoading(true);
        const response = await getSingleBook(book);
        if(response.status){
            setData(response.data);
        }
        setLoading(false);
    }

    const updateStatus = async (status) => {
        setLoading(true);
        const bookId = router.query["id"];
        const payload = new FormData();
        payload.append("status", status);
        const response = await editBook(payload, bookId);
        if(response.status){
            fetchData(bookId)
        }
        else{
            setLoading(false);
        }
    }
    useEffect(()=>{
        const bookId = router.query["id"];
        fetchData(bookId);
    }, []);

    return (
        <Layout role={role}>
            <div className='w-full flex flex-wrap items-center'>
                <Button variant="white-border" className="w-fit mr-3 items-center" onClick={() => router.push("/books")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M14 8C14 8.27614 13.7761 8.5 13.5 8.5L2.5 8.5C2.22386 8.5 2 8.27614 2 8C2 7.72386 2.22386 7.5 2.5 7.5L13.5 7.5C13.7761 7.5 14 7.72386 14 8Z" fill="#8C8D8C"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.35355 3.14645C7.54882 3.34171 7.54882 3.65829 7.35355 3.85355L3.20711 8L7.35355 12.1464C7.54881 12.3417 7.54881 12.6583 7.35355 12.8536C7.15829 13.0488 6.84171 13.0488 6.64645 12.8536L2.14645 8.35355C1.95118 8.15829 1.95118 7.84171 2.14645 7.64645L6.64645 3.14645C6.84171 2.95118 7.15829 2.95118 7.35355 3.14645Z" fill="#8C8D8C"/>
                    </svg>
                </Button>
                <h1 className='text-black-4 text-3xl font-semibold'>Book detail</h1>
            </div>
            {loading && <Loader />}
            {!loading && <>
                <div className='w-full bg-[#FDFCFF] mt-5 rounded-lg p-5'>
                    <div className='w-full flex flex-wrap items-start justify-between'>
                        <div className='w-5/12 '>
                            <img src={data.coverImage.url} alt="book-cover" className='rounded-lg object-cover w-full max-h-[600px]' />
                        </div>
                        <div className='w-7/12 pl-3 flex flex-wrap items-center justify-between'>
                            <div className='w-full flex flex-wrap items-center justify-between'>
                                <Badge variant={data.status} />
                                {permissionHandler("editBook",role) && <Button className={"w-fit"} variant={"primary"} onClick={()=> router.push(`/books/${router.query["id"]}/edit`)}>
                                    <svg className='mt-[1px] mr-2' xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M10.6906 1.44064C10.8615 1.26979 11.1385 1.26979 11.3094 1.44064L13.0594 3.19064C13.2302 3.3615 13.2302 3.6385 13.0594 3.80936L7.80936 9.05936C7.72731 9.14141 7.61603 9.1875 7.5 9.1875H5.75C5.50838 9.1875 5.3125 8.99162 5.3125 8.75V7C5.3125 6.88397 5.35859 6.77269 5.44064 6.69064L10.6906 1.44064ZM6.1875 7.18122V8.3125H7.31878L12.1313 3.5L11 2.36872L6.1875 7.18122Z" fill="#FDFCFF"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M9.37814 2.75314C9.549 2.58229 9.826 2.58229 9.99686 2.75314L11.7469 4.50314C11.9177 4.674 11.9177 4.951 11.7469 5.12186C11.576 5.29271 11.299 5.29271 11.1281 5.12186L9.37814 3.37186C9.20729 3.201 9.20729 2.924 9.37814 2.75314Z" fill="#FDFCFF"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M2.50628 2.00628C2.67038 1.84219 2.89294 1.75 3.125 1.75H7.9375C8.17912 1.75 8.375 1.94588 8.375 2.1875C8.375 2.42912 8.17912 2.625 7.9375 2.625L3.125 2.625L3.125 11.375H11.875V6.5625C11.875 6.32088 12.0709 6.125 12.3125 6.125C12.5541 6.125 12.75 6.32088 12.75 6.5625V11.375C12.75 11.6071 12.6578 11.8296 12.4937 11.9937C12.3296 12.1578 12.1071 12.25 11.875 12.25H3.125C2.89294 12.25 2.67038 12.1578 2.50628 11.9937C2.34219 11.8296 2.25 11.6071 2.25 11.375V2.625C2.25 2.39294 2.34219 2.17038 2.50628 2.00628Z" fill="#FDFCFF"/>
                                    </svg>
                                    Edit
                                </Button>}
                            </div>
                            <div className='w-full mt-2 flex flex-wrap'>
                                <h1 className='text-2xl text-black font-bold w-full capitalize'>{data.title}</h1>
                                <p className='text-gray-500 text-sm mt-2 w-full '>
                                    {data.description}
                                </p>
                            </div>
                            <h3 className='text-light-grey mt-6 text-sm font-semibold'>Book Info</h3>
                            <div className='my-3 w-full grid grid-cols-3 gap-3 py-2.5 px-5 border rounded-md border-gray-200'>
                                <div className='w-full'>
                                    <h4 className='text-light-black font-semibold'>Price</h4>
                                    <h4 className='text-light-grey'>₹{data.price}</h4>
                                </div>
                                <div className='w-full'>
                                    <h4 className='text-light-black font-semibold'>Book Genre</h4>
                                    <h4 className='text-light-grey capitalize'>{data.categories[0]}</h4>
                                </div>
                                <div className='w-full'>
                                    <h4 className='text-light-black font-semibold'>Author</h4>
                                    <h4 className='text-light-grey capitalize'>{data.author?.name}</h4>
                                </div>
                                <div className='w-full'>
                                    <h4 className='text-light-black font-semibold'>Book Type</h4>
                                    <h4 className='text-light-grey'>{data.bindingSize.length>0? bookType[data.bindingSize[0]]:"N/A"}</h4>
                                </div>
                                <div className='w-full'>
                                    <h4 className='text-light-black font-semibold'>Language</h4>
                                    <h4 className='text-light-grey capitalize'>{data.language}</h4>
                                </div>
                                <div className='w-full'>
                                    <h4 className='text-light-black font-semibold'>ISBN</h4>
                                    <h4 className='text-light-grey'>{data.isbnNumber}</h4>
                                </div>
                                <div className='w-full'>
                                    <h4 className='text-light-black font-semibold'>Date</h4>
                                    <h4 className='text-light-grey'>10th November, 2024</h4>
                                </div>
                            </div>
                            
                            <div className='my-3 w-full grid grid-cols-3 gap-2'>
                                
                                {data.platforms.map((item, index) =>  <>
                                    {item.platform == "amazon" && <div className='w-full text-light-black flex flex-wrap items-start gap-3 py-2.5 px-5 border rounded-md border-gray-200'>
                                        <img src={"/images/amazon.jpg"} className='size-10 object-cover' alt="Amazon images" />
                                        <div className='flex flex-wrap'>
                                            <span className='w-full text-[10px] font-medium'>Royalty</span>
                                            <span className='w-full text-sm font-bold'>{item.royalty}</span>
                                        </div>
                                    </div>}

                                    {item.platform == "flipkart" && <div className='w-full text-light-black flex flex-wrap items-center gap-3 py-2.5 px-5 border rounded-md border-gray-200'>
                                        <img src={"/images/flipkart.png"} className='size-10 object-cover' alt="Amazon images" />
                                        <div className='flex flex-wrap'>
                                            <span className='w-full text-[10px] font-medium'>Royalty</span>
                                            <span className='w-full text-sm font-bold'>{item.royalty}</span>
                                        </div>
                                    </div>}

                                    {item.platform == "dream" && <div className='w-full text-light-black flex flex-wrap items-center gap-3 py-2.5 px-5 border rounded-md border-gray-200'>
                                        <img src={"/images/dreambooks.png"} className='size-10 object-cover' alt="Amazon images" />
                                        <div className='flex flex-wrap'>
                                            <span className='w-full text-[10px] font-medium'>Royalty</span>
                                            <span className='w-full text-sm font-bold'>{item.royalty}</span>
                                        </div>
                                    </div>}

                                    {item.platform == "kindle" && <div className='w-full text-light-black flex flex-wrap items-center gap-3 py-2.5 px-5 border rounded-md border-gray-200'>
                                        <img src={"/images/kind.png"} className='size-10 object-cover' alt="Amazon images" />
                                        <div className='flex flex-wrap'>
                                            <span className='w-full text-[10px] font-medium'>Royalty</span>
                                            <span className='w-full text-sm font-bold'>{item.royalty}</span>
                                        </div>
                                    </div>}
                                </>)}  
                            </div>

                            {role!="author" && data.status=="pending" && <div className='w-full flex items-center justify-between flex-wrap gap-3 mt-3'>
                                <Button variant={"danger"} className={"w-[150px]"} onClick={()=> updateStatus("rejected")}>Reject</Button>
                                <Button variant={"success"} className={"w-[150px]"} onClick={()=> updateStatus("approved")}>Approve</Button>
                            </div>}
                        </div>
                    </div>
                </div>

                {data.status=="approved" && <div className='w-full bg-white rounded-lg p-4 mt-5'>
                    <div className='w-full flex flex-wrap mb-3 items-center'>
                        <h2 className='font-medium text-sm w-8/12'>Sales Overview</h2>
                        <div className='flex flex-wrap items-center justify-end w-4/12'>
                            <h5 className='w-8/12 text-right pr-3'>Total Amount to pay : <span className='font-semibold'>₹13,500</span></h5>
                            {permissionHandler("payNow", role) && <Button variant={"primary"} className='w-3/12'>Pay Now</Button>}
                        </div>
                    </div>
                    <Table>
                    <thead>
                        <tr className='border-b-1.5'>
                            <th className='w-2/12 text-light-grey text-left'>Platform Name</th>
                            <th className='w-2/12 text-light-grey text-center'>Author Royalty</th>
                            <th className='w-2/12 text-light-grey text-center'>Sales</th>
                            <th className='w-2/12 text-light-grey text-center'>Total Earnings</th>
                            <th className='w-2/12 text-light-grey text-center'>Platform Earnings</th>
                            <th className='w-2/12 text-light-grey text-center'>Total Returned</th>
                            <th className='w-2/12 text-light-grey text-center'>Return Royalty</th>
                            <th className='w-2/12 text-light-grey text-center'>Total to pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='border-b-1.5'>
                            <td className='w-3/12 text-light-black flex flex-wrap items-center gap-3'>
                                <img src={"/images/amazon.jpg"} className='size-9 object-cover' alt="Amazon images" />
                                Amazon
                            </td>
                            <td className='w-2/12 text-light-black text-center'>₹100</td>
                            <td className='w-2/12 text-light-black text-center'>
                                100
                            </td>
                            <td className='w-2/12 text-light-black text-center'>₹20,000</td>
                            <td className='w-2/12 text-light-black text-center'>₹15,000</td>
                            <td className='w-2/12 text-light-black text-center'>10</td>
                            <td className='w-2/12 text-center text-orange'>-₹500</td>
                            <td className='w-2/12 text-light-black text-center '>₹4,500</td>
                        </tr>
                        <tr className='border-b-1.5'>
                            <td className='w-3/12 text-light-black flex flex-wrap items-center gap-3'>
                                <img src={"/images/flipkart.png"} className='size-9 object-cover' alt="Amazon images" />
                                Flipkart
                            </td>
                            <td className='w-2/12 text-light-black text-center'>₹100</td>
                            <td className='w-2/12 text-light-black text-center'>
                                100
                            </td>
                            <td className='w-2/12 text-light-black text-center'>₹20,000</td>
                            <td className='w-2/12 text-light-black text-center'>₹15,000</td>
                            <td className='w-2/12 text-light-black text-center'>10</td>
                            <td className='w-2/12 text-center text-orange'>-₹500</td>
                            <td className='w-2/12 text-light-black text-center '>₹4,500</td>
                        </tr>
                        <tr className=''>
                            <td className='w-2/12 text-light-black flex items-center gap-3'>
                                <img src={"/images/dreambooks.png"} className='size-9 object-cover' alt="Amazon images" />
                                <span className='text-black break-words'>Dreambook <br/> Publishing</span>
                            </td>
                            <td className='w-2/12 text-light-black text-center'>₹100</td>
                            <td className='w-2/12 text-light-black text-center'>
                                100
                            </td>
                            <td className='w-2/12 text-light-black text-center'>₹20,000</td>
                            <td className='w-2/12 text-light-black text-center'>₹15,000</td>
                            <td className='w-2/12 text-light-black text-center'>10</td>
                            <td className='w-2/12 text-center text-orange'>-₹500</td>
                            <td className='w-2/12 text-light-black text-center '>₹4,500</td>
                        </tr>
                    </tbody>
                    </Table>
                </div>}
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