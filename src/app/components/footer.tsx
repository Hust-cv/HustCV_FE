import { PhoneOutlined, MailOutlined, SendOutlined } from '@ant-design/icons';

const Footer = () => {
    return (
        <>
            <div className="footer divide-y divide-gray-700">
                <div className="grid grid-cols-4 pt-16 pb-16">
                    <div className='pl-3'>
                        <p className="text-white text-3xl font-bold cursor-pointer">Hust<span className="text-[#f0101a]">CV</span></p>
                        <p className='text-white'>Hút việc về nào</p>
                        <div>
                            <div className='inline-flex gap-2 mt-8'>
                                <a href='' className='cursor-pointer w-7 h-7 flex items-center justify-center hover:bg-black hover:border-none text-white rounded-full border-white border-2'>
                                    <img className='w-4 h-4' src="/socials/tiktok.png" alt="tiktok" />
                                </a>
                                <a href='' className='cursor-pointer w-7 h-7 flex items-center justify-center hover:bg-[#2478ba] hover:border-none text-white rounded-full border-white border-2'>
                                    <img className='w-4 h-4' src="/socials/twitter.png" alt="twitter" />
                                </a>
                                <a href='' className='cursor-pointer w-7 h-7 flex items-center justify-center hover:bg-[#0072b7] hover:border-none text-white rounded-full border-white border-2'>
                                    <img className='w-4 h-4' src="/socials/linkedin.png" alt="linkedin" />
                                </a>
                                <a href='' className='cursor-pointer w-7 h-7 flex items-center justify-center hover:bg-[#c33223] hover:border-none text-white rounded-full border-white border-2'>
                                    <img className='w-4 h-4' src="/socials/youtube.png" alt="youtube" />
                                </a>
                                <a href='' className='cursor-pointer w-7 h-7 flex items-center justify-center hover:bg-[#9146fe] hover:border-none text-white rounded-full border-white border-2'>
                                    <img className='w-4 h-4' src="/socials/twitch.png" alt="twitch" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 grid grid-cols-3">
                        <div>
                            <h3 className="text-white font-semibold">Về HustCV</h3>
                            <p className='text-[#a6a6a6] text-sm py-2 cursor-pointer hover:text-white'>Trang chủ</p>
                            <p className='text-[#a6a6a6] text-sm py-2 cursor-pointer hover:text-white'>Về HustCV.com</p>
                            <p className='text-[#a6a6a6] text-sm py-2 cursor-pointer hover:text-white'>Dịch vụ gợi ý ứng viên</p>
                            <p className='text-[#a6a6a6] text-sm py-2 cursor-pointer hover:text-white'>Liên hệ</p>
                            <p className='text-[#a6a6a6] text-sm py-2 cursor-pointer hover:text-white'>Việc làm IT</p>
                            <p className='text-[#a6a6a6] text-sm py-2 cursor-pointer hover:text-white'>Câu hỏi thường gặp</p>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold">Chương trình </h3>
                            <p className='text-[#a6a6a6] text-sm py-2 cursor-pointer hover:text-white'>Chuyện IT</p>
                            <p className='text-[#a6a6a6] text-sm py-2 cursor-pointer hover:text-white'>Cuộc thi viết</p>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold">Điều khoản chung</h3>
                            <p className='text-[#a6a6a6] text-sm py-2 cursor-pointer hover:text-white'>Quy định bảo mật</p>
                            <p className='text-[#a6a6a6] text-sm py-2 cursor-pointer hover:text-white'>Quy chế hoạt động</p>
                            <p className='text-[#a6a6a6] text-sm py-2 cursor-pointer hover:text-white'>Giải quyết khiếu nại</p>
                            <p className='text-[#a6a6a6] text-sm py-2 cursor-pointer hover:text-white'>Thỏa thuận sử dụng</p>
                            <p className='text-[#a6a6a6] text-sm py-2 cursor-pointer hover:text-white'>Thông cáo báo chí</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">Liên hệ để đăng tin tuyển dụng tại:</h3>
                        <p className='text-[#a6a6a6] text-sm py-2 cursor-pointer hover:text-white'><PhoneOutlined className='mr-2' />Hà Nội: (+84) 983 131 351</p>
                        <p className='text-[#a6a6a6] text-sm py-2 cursor-pointer hover:text-white'><MailOutlined className='mr-2' />Email: hustcv@gmail.com</p>
                        <p className='text-[#a6a6a6] text-sm py-2 cursor-pointer hover:text-white'><SendOutlined className='mr-2' />Gửi thông tin liên hệ</p>
                    </div>
                </div>
                <div className='text-center text-white py-6'>
                    <p>Copyright © HustCV</p>
                </div>
            </div>
        </>

    )
}

export default Footer