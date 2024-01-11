'use client'
import Image from 'next/image'
import { Badge, Button, Card, MenuProps, Select, Slider, Space } from "antd";
import { SearchOutlined } from '@ant-design/icons'
import { Menu } from 'antd';
import {
  Form,
  Input,
} from 'antd';
import {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";

import { useGetListProvinces } from "../service/provinces.service";
import {
  useGetListRecruitmentPost,
  useSearchRecruitmentPost,
} from "../service/recruitmentPost.service";
import { useGetListSkills } from "../service/skill.service";
import { IRecruitmentPost } from "../@types/recruitmentPost.type";

import http from "@/app/utils/http";

function hasLogin() {
  return localStorage.getItem('accessToken') ? true : false
}

export default function Home() {
  const router = useRouter();

  const [key, setKey] = useState("");
  const { data: provincesData, refetch } = useGetListProvinces();
  const { data: recruitmentPostData } = useGetListRecruitmentPost();
  const [searchValue, setSearchValue] = useState("");
  const [recruitmentPostFilterData, setRecruitmentPostFilterData] = useState<
    IRecruitmentPost[] | undefined
  >();
  const [checkFilter, setCheckFilter] = useState(false);
  const [filterLevel, setFilterLevel] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [filterSalary, setFilterSalary] = useState<string[]>([]);
  const [filterSkills, setFilterSkills] = useState<string[]>();

  const { data: skillsData } = useGetListSkills();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const keyValue = params.get("key");
    setKey(keyValue || "");
  }, []);
  const handleInputChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  useEffect(()=> {
    if(hasLogin())
      // An dang ki dang nhap , them anh dai dien
      // http.getWithAutoRefreshToken('/api/auth/logout',  {useAccessToken: true})
      // http.postWithAutoRefreshToken('/api/do-something', {useAccessToken: true});
    console.log('User has login');
  }, []);
  const items: MenuProps['items'] = [
    {
      label: "Tất cả thành phố",
      key: "cities",
      children: provincesData?.data.map((item) => ({
        label: item.name,
        key: item.codename,
      })),
    },
  ]

  const handleChange = (value: string) => {
    setFilterLevel(value);
  };
  const handleChangeSalary = (value: string[]) => {
    setFilterSalary(value);
  };
  const handleChangeMultiple = (value: string[]) => {
    setFilterSkills(value);
  };
  const handleChangeCountry = (value: string) => {
    setFilterCountry(value);
  };

  const onSearch = async () => {
    router.push(`/?key=${searchValue.toLowerCase()}`);
    refetch();
    setTimeout(() => {
      window.location.reload();
    }, 500);
    // const result = await doSearch.mutate({ value: searchValue });
  };
  const handleFilterMultiple = () => {
    const body = {
      level: filterLevel,
      skills: filterSkills,
      location: filterCountry,
      salary: filterSalary,
    };
    if (recruitmentPostData) {
      const filterData = recruitmentPostData.filter(
        (item) =>
          item.level === body.level &&
          item.location === body.location &&
          +body.salary[0] <= +item.salary &&
          +item.salary <= +body.salary[1] &&
          item.skills.every((skill1) =>
            body.skills!.some((skill2) => skill1.name === skill2)
          )
      );
      setRecruitmentPostFilterData(filterData);
    }
    setCheckFilter(true);
  };
  return (
    <div className="min-h-[100vh]">
      <div className="search text-white pt-16 mt-[88px]">
        <div className="mx-80">
          <h2 className='text-3xl pb-8 font-bold'>773 Việc làm IT cho Developer &quot;Chất&quot;</h2>
          <div className="flex gap-4">
            <div className='w-[240px]'>
              <Menu className='rounded-sm' mode="horizontal" items={items} />
            </div>
            <div className='w-[526px]'>
              <input type="text" 
              className='h-12 rounded-sm p-2 w-full text-black' 
              placeholder='Nhập từ khóa theo kỹ năng, chức vụ, công ty' 
              value={searchValue}
              onChange={handleInputChange}/>
            </div>
            <div>
              <button 
                onClick={onSearch} 
                className='bg-[#ed1b2f] w-[240px] h-12 rounded-sm font-semibold text-lg'>
                <SearchOutlined className='p-2' /> Tìm kiếm
              </button>
            </div>
          </div>
          <div className='mt-8 flex items-center pb-16'>
            <p className='text-white mr-4'>Mọi người đang tìm kiếm:</p>
            <div className='inline-flex'>
              <button className='bg-transparent rounded-full border border-gray-600 px-4 py-2 hover:bg-slate-600 mx-2'>Java</button>
              <button className='bg-transparent rounded-full border border-gray-600 px-4 py-2 hover:bg-slate-600 mx-2'>ReactJS</button>
              <button className='bg-transparent rounded-full border border-gray-600 px-4 py-2 hover:bg-slate-600 mx-2'>.NET</button>
              <button className='bg-transparent rounded-full border border-gray-600 px-4 py-2 hover:bg-slate-600 mx-2'>Tester</button>
              <button className='bg-transparent rounded-full border border-gray-600 px-4 py-2 hover:bg-slate-600 mx-2'>PHP</button>
              <button className='bg-transparent rounded-full border border-gray-600 px-4 py-2 hover:bg-slate-600 mx-2'>Business Analytic</button>
              <button className='bg-transparent rounded-full border border-gray-600 px-4 py-2 hover:bg-slate-600 mx-2'>NodeJS</button>
            </div>
          </div>
        </div>
      </div>
      <Space
        wrap
        className="mt-10 px-10 mx-auto w-full flex flex-col flex-wrap justify-start items-start"
      >
        <h2 className="text-black">Bộ lọc: </h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 justify-start">
          <div className="w-full flex gap-3 justify-start items-center">
            <span className="text-black">Cấp bậc</span>
            <Select
              defaultValue="Cấp bậc"
              onChange={handleChange}
              options={recruitmentPostData
                ?.filter((item) => item.level)
                ?.map((role) => ({
                  label: role.level,
                  value: role.level,
                }))}
            />
          </div>
          <div className="min-w-[200px] flex gap-3 justify-start items-center">
            <span className="text-black">Kỹ năng</span>
            <Select
              mode="multiple"
              placeholder="Kỹ năng"
              onChange={handleChangeMultiple}
              style={{ width: "100%" }}
              options={
                skillsData &&
                skillsData?.map((skill) => ({
                  label: skill.name,
                  value: skill.id,
                }))
              }
            />
          </div>
          <div className="min-w-[200px] flex gap-3 justify-start items-center">
            <span className="text-black">Thành phố/tỉnh</span>
            <Select
              placeholder="Thành phố/tỉnh"
              onChange={handleChangeCountry}
              style={{ width: "100%" }}
              options={
                provincesData &&
                provincesData?.data.map((item) => ({
                  label: item.name,
                  value: item.name,
                }))
              }
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-3">
          <span className="text-black">Mức lương</span>
          <Slider
            className="min-w-[400px]"
            range={{ draggableTrack: true }}
            min={0}
            max={100000}
            onChange={(e: any) => handleChangeSalary(e)}
            defaultValue={[2000, 100000]}
          />
        </div>
        <Button onClick={handleFilterMultiple}>Lọc</Button>
      </Space>
      <div className="my-10 px-10 mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-5">
        {recruitmentPostData && !checkFilter
          ? recruitmentPostData
              .filter((item) => {
                if (key !== "") {
                  return (
                    item.title.toLowerCase() === key ||
                    item.location.toLowerCase() === key ||
                    item.level.toLowerCase() === key ||
                    item.skills.some((skill) => skill.name.toLowerCase() === key)
                  );
                } else {
                  return item;
                }
              })
              .map((item) => (
                <Card
                  title={item.title}
                  extra={
                    <p
                      className="hover:text-green-400 cursor-pointer"
                      onClick={() => router.push(`/post/${item.id}`)}
                    >
                      Chi tiết
                    </p>
                  }
                  key = {1000}
                >
                  <p>Mức lương: {item.salary}</p>
                  <Space className="mt-3">
                    {item.skills.map((skill) => (
                      <Badge
                        className="site-badge-count-109"
                        count={skill.name}
                        style={{ backgroundColor: "#52c41a" }}
                        key = {1000}
                      />
                    ))}
                  </Space>
                </Card>
              ))
          : recruitmentPostData &&
            recruitmentPostFilterData &&
            checkFilter &&
            recruitmentPostFilterData
              .filter((item) => {
                if (key !== "") {
                  return (
                    item.title === key ||
                    item.location === key ||
                    item.level === key ||
                    item.skills.some((skill) => skill.name === key)
                  );
                } else {
                  return item;
                }
              })
              .map((item) => (
                <Card
                  title={item.title}
                  extra={
                    <p
                      className="hover:text-green-400 cursor-pointer"
                      onClick={() => router.push(`/post/${item.id}`)}
                    >
                      Chi tiết
                    </p>
                  }
                  key = {1000}
                >
                  <p>Mức lương: {item.salary}</p>
                  <Space className="mt-3">
                    {item.skills.map((skill) => (
                      <Badge
                        className="site-badge-count-109"
                        count={skill.name}
                        style={{ backgroundColor: "#52c41a" }}
                        key = {1000}
                      />
                    ))}
                  </Space>
                </Card>
              ))}
      </div>
    </div>
  );
}

