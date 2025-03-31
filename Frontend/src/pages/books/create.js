import Button from '@/components/Button'
import DropdownMultiSelector from '@/components/DropdownMultiSelector'
import Input from '@/components/Input'
import Layout from '@/layout/Layout'
import Uploader from '@/modules/Uploader'
import { getAllAuthors } from '@/services/APIs/author'
import { addBook } from '@/services/APIs/books'
import { isRequired } from '@/Utilities/helpers'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { categories } from '@/Utilities/positions'


export default function Create({role, user}) {
    const fileRef = useRef(null);
    const [authors, setAuthors] = useState();
    const [loading, setLoading] = useState(false);
    const [bindingType, setBindingType] = useState(0);
    const [cover, setCover] = useState(null);
    const router = useRouter();
    const formRef = useRef(null);
    
    const fetchAuthors = async () => {
        setLoading(true);
        const paylaod = {
            page:1,
            limit:100,
            role:"author"
        }
        const response = await getAllAuthors(paylaod)
        if(response.status){
            setAuthors(response.data.results);
            setLoading(false);
        }else{
            setLoading(false)
        }
    }

    const handleCover = (val) => {
        console.log(val)
        setCover(val);
    }

    const saveBookDetails = async (e) => {
        e.preventDefault();
        setLoading(true);
        const payload = new FormData();
        const formData = new FormData(e.target);
        const title = formData.get("title");
        const subtitle = formData.get("sub-title");
        const description = formData.get("description");
        const isbn = formData.get("isbn");
        let author;
        if(role!="author"){
            author = formData.get("author");
        }
        else{
            author = user._id;
        }
        const category = formData.get("category");
        const language = formData.get("language");
        const price = formData.get("price");
        const platforms = [];

        if(bindingType==0){
            payload.append("bindingSize[0]", "paperBack");
            if(document.getElementById("dreambookpublication").checked){
                const royalty = document.getElementById("dreambookpublicationvalue").value;
                platforms.push({
                    "platform":"dream",
                    "royalty": parseInt(royalty)
                })
            }
            
            if(document.getElementById("amazonpublication").checked){
                const royalty = document.getElementById("amazonpublicationvalue").value;
                platforms.push({
                    "platform":"amazon",
                    "royalty": parseInt(royalty)
                })
            }
            
            if(document.getElementById("flipkartpublication").checked){
                const royalty = document.getElementById("flipkartpublicationvalue").value;
                platforms.push({
                    "platform":"flipkart",
                    "royalty": parseInt(royalty)
                })
            }
            payload.append("platforms", JSON.stringify(platforms));
        }
        else if(bindingType==1){
            payload.append("bindingSize[0]", "hardCover");
            payload.append("bindingSize[0]", "paperBack");
            if(document.getElementById("dreambookpublication").checked){
                const royalty = document.getElementById("dreambookpublicationvalue").value;
                platforms.push({
                    "platform":"dream",
                    "royalty": parseInt(royalty)
                })
            }
            
            if(document.getElementById("amazonpublication").checked){
                const royalty = document.getElementById("amazonpublicationvalue").value;
                platforms.push({
                    "platform":"amazon",
                    "royalty": parseInt(royalty)
                })
            }
            
            if(document.getElementById("flipkartpublication").checked){
                const royalty = document.getElementById("flipkartpublicationvalue").value;
                platforms.push({
                    "platform":"flipkart",
                    "royalty": parseInt(royalty)
                })
            }
            payload.append("platforms", JSON.stringify(platforms));
        }
        else{
            payload.append("bindingSize[0]", "ebook");
            const royalty = document.getElementById("kindle-royalty").value;
            platforms.push({
                "platform":"kindle",
                "royalty": parseInt(royalty)
            })
            payload.append("platforms", JSON.stringify(platforms));
        }

        console.log(author)
        if(isRequired(title, "Title") && isRequired(description, "Description") && isRequired(isbn, "ISBN") && isRequired(author, "Author") && isRequired(price, "Price") ){
            payload.append("title", title);
            payload.append("author", author);
            payload.append("description", description);
            payload.append("language", language);
            payload.append("isbnNumber", isbn);
            payload.append("price", price);
            payload.append("subtitle", subtitle);
            payload.append("coverImage", cover);
            payload.append("categories[0]", category);
            const response = await addBook(payload);
            if(response.status){
                setLoading(false);
                router.push("/books");
            }
        }
        else{
            setLoading(false)
        }
    }
    useEffect(()=>{
        if(role!="author"){
            fetchAuthors();
        }
    },[])
    return (
        <Layout role={role} >
            <div className='w-full flex flex-wrap items-center'>
                <Button variant="white-border" className="w-fit mr-3 items-center" onClick={() => router.push("/books")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M14 8C14 8.27614 13.7761 8.5 13.5 8.5L2.5 8.5C2.22386 8.5 2 8.27614 2 8C2 7.72386 2.22386 7.5 2.5 7.5L13.5 7.5C13.7761 7.5 14 7.72386 14 8Z" fill="#8C8D8C"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.35355 3.14645C7.54882 3.34171 7.54882 3.65829 7.35355 3.85355L3.20711 8L7.35355 12.1464C7.54881 12.3417 7.54881 12.6583 7.35355 12.8536C7.15829 13.0488 6.84171 13.0488 6.64645 12.8536L2.14645 8.35355C1.95118 8.15829 1.95118 7.84171 2.14645 7.64645L6.64645 3.14645C6.84171 2.95118 7.15829 2.95118 7.35355 3.14645Z" fill="#8C8D8C"/>
                    </svg>
                </Button>
                <h1 className='text-black-4 text-3xl font-semibold'>Create New Book</h1>
            </div>
            <form onSubmit={saveBookDetails} ref={formRef} className='w-full bg-[#FDFCFF] mt-5 rounded-lg p-5'>
                <div className='grid grid-cols-2 gap-x-3'>
                    <div className='w-full flex flex-wrap mb-5'>
                        <label className='w-full text-[#555555] font-medium mb-2 text-sm'>Book Title<span className='text-red-500'>*</span></label>
                        <Input type={"text"} placeholder={"Enter book title"} name="title" />
                    </div>
                    <div className='w-full flex flex-wrap mb-5'>
                        <label className='w-full text-[#555555] font-medium mb-2 text-sm'>Book Subtitle<span className='opacity-50'>(Optional)</span></label>
                        <Input type={"text"} placeholder={"Enter book subtitle "} name="sub-title" />
                    </div>
                </div>

                <div className='w-full flex flex-wrap mb-5'>
                    <label className='w-full text-[#555555] font-medium mb-2 text-sm'>Book Short Description<span className='text-red-500'>*</span></label>
                    <textarea row="8" placeholder={"Enter short description"} name="description" className='w-full bg-[#F3F3F3] peer focus:outline-none font-inter rounded-lg px-3 py-2.5 font-normal text-sm text-black placeholder-shown:text-placeholder' />
                </div>

                <div className={`grid grid-cols-${role!="author"?2:1} gap-x-3`}>
                    <div className='w-full flex flex-wrap mb-5'>
                        <label className='w-full text-[#555555] font-medium mb-2 text-sm'>Book ISBN Number<span className='text-red-500'>*</span></label>
                        <Input type={"text"} name="isbn" placeholder={"Enter book ISBN number"} />
                    </div>
                    {role!="author" && <div className='w-full flex flex-wrap mb-5'>
                        <label className='w-full text-[#555555] font-medium mb-2 text-sm'>Book Author<span className='text-red-500'>*</span></label>
                        <select type={"text"} name="author" placeholder={"Enter author name"} className='w-full bg-[#F3F3F3] peer focus:outline-none font-inter rounded-lg px-3 py-2.5 font-normal text-sm text-light-grey placeholder-shown:text-placeholder'>
                            {authors && authors.map((item, index)=> <option value={item._id} key={`Author-${index}`}>{item.name}</option>)}
                        </select>
                    </div>}
                </div>

                <div className='grid grid-cols-2 gap-x-3'>
                    <div className='w-full flex flex-wrap mb-5'>
                    <label className='w-full text-[#555555] font-medium mb-2 text-sm'>Book Category<span className='text-red-500'>*</span></label>
                        <select defaultValue="Poetry" type={"text"} name="category" className='w-full bg-[#F3F3F3] peer focus:outline-none font-inter rounded-lg px-3 py-2.5 font-normal text-sm text-light-grey placeholder-shown:text-placeholder'>
                            
                            {categories.map((item, index)=> <option key={`category-${index}`} value={item.value}>{item.value}</option>)}
                        </select>
                    </div>
                    <div className='w-full flex flex-wrap mb-5'>
                        <label className='w-full text-[#555555] font-medium mb-2 text-sm'>Language<span className='text-red-500'>*</span></label>
                        <select type={"text"} defaultValue={"English"} name='language' className='w-full bg-[#F3F3F3] peer focus:outline-none font-inter rounded-lg px-3 py-2.5 font-normal text-sm text-light-grey placeholder-shown:text-placeholder'>
                            <option value={"English"}>English</option>
                            <option value={"Punjabi"}>Punjabi</option>
                            <option value={"Hindi"}>Hindi</option>
                            <option value={"Telgu"}>Telgu</option>
                            <option value={"Tamil"}>Tamil</option>
                            <option value={"Urdu"}>Urdu</option>
                        </select>
                    </div>
                </div>

                <div className='w-full flex flex-wrap mb-5'>
                    <div className='w-full flex flex-wrap'>
                        <label className='w-full text-[rgb(85,85,85)] font-medium mb-2 text-sm'>Upload Cover File<sup className='text-red-500'>*</sup> ( max size 1mb in Jpeg or Png format only)</label>
                        <Uploader handler={handleCover} title={"Upload Book Cover"} />
                    </div>
                </div>

                <div className='w-full flex flex-wrap mb-5'>
                    <label className='w-full text-[#555555] font-medium mb-2 text-sm'>Book Price<sup className='text-red-500'>*</sup></label>
                    <Input type={"number"} name={"price"} placeholder={"₹50"} />
                </div>

                <div className='w-full flex flex-wrap mb-5'>
                    <label className='w-full text-[rgb(85,85,85)] font-medium mb-2 text-sm'>Choose Binding Size<span className='text-red-500'>*</span></label>
                    <div className='bg-white px-2.5 py-3.5 border rounded-md w-full flex flex-wrap items-center gap-8'>
                        <div className='flex items-center'>
                            <input type='radio' className='size-5 mr-3 accent-primary' id="paperback-checkbox" name="book-binding" defaultChecked={true} onChange={()=> setBindingType(0)} />
                            <label className='w-fit text-[#8C8D8C] font-medium text-sm cursor-pointer select-none' htmlFor='paperback-checkbox' >Paper Back</label>
                        </div>

                        <div className='flex items-center'>
                            <input type='radio' className='size-5 mr-3' id="hardcover-checkbox" name="book-binding" onChange={()=> setBindingType(1)} />
                            <label className='w-fit text-[#8C8D8C] font-medium text-sm cursor-pointer select-none' htmlFor='hardcover-checkbox'>Hard Cover</label>
                        </div>

                        <div className='flex items-center '>
                            <input type='radio' className='size-5 mr-3' id="ebookcover-checkbox" name="book-binding" onChange={()=> setBindingType(2)} />
                            <label className='w-fit text-[#8C8D8C] font-medium text-sm cursor-pointer select-none' htmlFor='ebookcover-checkbox' >Ebook</label>
                        </div>
                    </div>
                </div>

                <div className='w-full flex flex-wrap mb-5'>
                    <label className='w-full text-[#555555] font-medium mb-2 text-sm'>Choose publication<span className='text-red-500'>*</span></label>
                    <div className='grid grid-cols-3 gap-3 w-full'>
                        {bindingType==0 || bindingType==1?<>
                            <div className='w-full flex flex-wrap px-2.5 pb-5 pt-2 rounded-lg border border-[#e1e1e1] items-start'>
                                <div className='w-full flex items-center'>
                                    <input type='checkbox' id="dreambookpublication" className='mr-3 size-6 accent-primary' />
                                    <label htmlFor="dreambookpublication" className='cursor-pointer'>
                                        <Image alt="dream-book-logo" src='/images/amazon-big.png' width={126} height={56} />
                                    </label>
                                </div>
                                <div className='w-full flex flex-wrap mt-5'>
                                    <label className='w-full text-[#555555] font-medium mb-2 text-sm'>Royalty<sup className='text-red-500'>*</sup></label>
                                    <Input type={"number"} id="dreambookpublicationvalue" placeholder={"₹50"} />
                                </div>
                            </div>

                            <div className='w-full flex flex-wrap px-2.5 pb-5 pt-2 rounded-lg border border-[#e1e1e1] items-start'>
                                <div className='w-full flex items-center'>
                                    <input type='checkbox' id="amazonpublication" className='size-6 accent-primary' />
                                    <label htmlFor="amazonpublication" className='cursor-pointer'>
                                        <img src='/images/dream-big.png' width={126} height={56} />
                                    </label>
                                </div>
                                <div className='w-full flex flex-wrap mt-5'>
                                    <label className='w-full text-[#555555] font-medium mb-2 text-sm'>Royalty<sup className='text-red-500'>*</sup></label>
                                    <Input type={"number"} placeholder={"₹50"} id="amazonpublicationvalue" />
                                </div>
                            </div>

                            <div className='w-full flex flex-wrap px-2.5 pb-5 pt-0 rounded-lg border border-[#e1e1e1] items-start'>
                                <div className='w-full flex items-center'>
                                    <input type='checkbox' id="flipkartpublication" className='size-6 accent-primary mr-3' />
                                    <label htmlFor="flipkartpublication" className='cursor-pointer'>
                                        <img src='/images/flipkart-logo.png' width={126} height={56} />
                                    </label>
                                </div>
                                <div className='w-full flex flex-wrap mt-5'>
                                    <label className='w-full text-[#555555] font-medium mb-2 text-sm'>Royalty<sup className='text-red-500'>*</sup></label>
                                    <Input type={"number"} placeholder={"₹50"} id="flipkartpublicationvalue" />
                                </div>
                            </div>
                        </>:<>
                        <div className='w-full flex flex-wrap px-2.5 pb-5 pt-0 rounded-lg border border-[#e1e1e1] items-start'>
                            <div className='w-full flex items-center'>
                                {/* <input type='checkbox' id="flipkartpublication" name="kindleCheckbox" className='size-6 accent-primary mr-3' /> */}
                                <label>
                                    <img src='/images/kindle.png' className='-ml-2.5' width={126} height={56} />
                                </label>
                            </div>
                            <div className='w-full flex flex-wrap mt-5'>
                                <label className='w-full text-[#555555] font-medium mb-2 text-sm'>Royalty<sup className='text-red-500'>*</sup></label>
                                <Input type={"number"} id="kindle-royalty" defaultValue="0" placeholder={"₹50"} />
                            </div>
                        </div>
                        </>}
                    </div>
                    <div className='w-full flex items-center justify-end mt-8'>
                        <Button type={"submit"} variant={"primary"} loading={loading} className={"w-fit"}>Save & Send for review</Button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
export async function getServerSideProps({ req, res }) {
    const role = req.cookies._r || null;
    const user = req.cookies.user || null;
    return {
      props: {
        role: role,
        user: await JSON.parse(user)
      },
    };
}
