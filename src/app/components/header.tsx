"use client";
import { useGetListBusiness } from "@/src/service/business.service";
import { useGetListProvinces } from "@/src/service/provinces.service";
import { useGetListRecruitmentPost } from "@/src/service/recruitmentPost.service";
import { useGetListSkills } from "@/src/service/skill.service";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Button } from "antd";
import { useRouter } from "next/navigation";

const Header = () => {
  const { data: provincesData } = useGetListProvinces();
  const { data: skillsData } = useGetListSkills();
  const { data: levelData } = useGetListRecruitmentPost();
  const { data: businessData } = useGetListBusiness();
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };
  const handleRegisterClick = () => {
    router.push("/signup");
  };
  const items: MenuProps["items"] = [
    {
      label: "All Jobs",
      key: "All Job",
      children: [
        {
          label: "Việc làm IT theo kĩ năng",
          key: "job by skills",
          children: skillsData?.map(skill => ({
            label: skill.name,
            key: skill.name,
          }))
        },
        {
          label: "Việc làm IT theo cấp bậc",
          key: "job by Title",
          children: levelData?.filter(item => item.level)?.map(role => ({
            label: role.level,
            key: role.level,
          }))
        },
        {
          label: "Việc làm IT theo công ty",
          key: "job by company",
          children: businessData?.map(role => ({
            label: role.businessName,
            key: role.businessName,
          }))
        },
        {
          label: "Việc làm IT theo thành phố",
          key: "job by cities",
          children: provincesData?.data.map((item) => ({
            label: item.name,
            key: item.name,
          })),
        },
      ],
    },
    {
      label: "Top Công ty IT",
      key: "app",
      children: [
        {
          label: "Công ty tốt nhất",
          key: "best companies",
          children: [
            {
              label: "Công ty 1",
              key: "company 1",
            },
            {
              label: "Công ty 2",
              key: "company 2",
            },
          ],
        },
        {
          label: "Review công ty",
          key: "review",
        },
      ],
    },
    {
      label: "Blogs",
      key: "SubMenu",
      children: [
        {
          label: "Báo cáo lương IT",
          key: "report",
          children: [
            {
              label: "Option 1",
              key: "setting:1",
            },
            {
              label: "Option 2",
              key: "setting:2",
            },
          ],
        },
        {
          label: "Sự nghiệp IT",
          key: "career",
          children: [
            {
              label: "Option 3",
              key: "setting:3",
            },
            {
              label: "Option 4",
              key: "setting:4",
            },
          ],
        },
        {
          label: "Ứng tuyển và thăng tiến",
          key: "apply",
          children: [
            {
              label: "Option 3",
              key: "setting:5",
            },
            {
              label: "Option 4",
              key: "setting:6",
            },
          ],
        },
        {
          label: "Chuyên môn IT",
          key: "major",
          children: [
            {
              label: "Option 3",
              key: "setting:7",
            },
            {
              label: "Option 4",
              key: "setting:8",
            },
          ],
        },
      ],
    },
  ];
  const onNavigate: MenuProps['onClick'] = (e) => {
    router.push(`/?key=${e.key}`)
    setTimeout(() => {
      window.location.reload()
    }, 500)
  };
  
  return (
    <div className="header min-h-[88px] border-b border-b-gray-800 fixed z-10 top-0 left-0 right-0">
      <div className="container min-h-[88px] mx-auto flex items-center">
        <div>
          <p className="text-white text-3xl font-bold">
            Hust<span className="text-[#f0101a]">CV</span>
          </p>
        </div>
        <div className="ml-48 flex-1">
          <div className="flex items-center gap-6 ">
            <Menu
              className="bg-transparent min-w-[400px] text-xl text-[#a6a6a6]"
              mode="horizontal"
              items={items}
              onClick={onNavigate}
            />
          </div>
        </div>
        <div className="pr-14">
          <button
            className="text-[#a6a6a6] hover:text-white"
            onClick={handleLoginClick}
          >
            Đăng nhập
          </button>
          <span className="text-[#a6a6a6] mx-2">/</span>
          <button
            className="text-[#a6a6a6] hover:text-white"
            onClick={handleRegisterClick}
          >
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
