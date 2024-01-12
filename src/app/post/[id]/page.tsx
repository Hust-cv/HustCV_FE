"use client";
import {
  useApplyRecruitment,
  useGetDetailRecruitmentPost,
} from "../../../service/recruitmentPost.service";
import { useMutation } from "@tanstack/react-query";
import { Badge, Button, Form, message, Space, UploadProps } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import UploadFileInput from "../../components/UploadFileInput";

const PostDetail = () => {
  const [form] = useForm();
  const path = usePathname();
  const [idPost, setIdPost] = useState(Number(path.split("/")[2]));
  const { data: recruitmentPostData } = useGetDetailRecruitmentPost(
    idPost || NaN
  );
  const props: UploadProps = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  useEffect(() => {
    setIdPost(Number(path.split("/")[2]));
  }, [path]);
  const doApply = useApplyRecruitment();
  function handleApplication(value: any) {
    const body = {
      recruitmentPost_id: Number(idPost) as number,
      content: value.content as string,
      CV: value.CV as string,
    };
    console.log(body);
    doApply.mutate(body);
  }
  if (!recruitmentPostData) return <></>;
  return (
    <div className="min-h-[100vh] !text-black">
      <div className="search pt-16 mt-[88px]"></div>
      <div className="mt-10 px-10 mx-auto w-full">
        <h1 className="text-6xl font-bold">{recruitmentPostData.title}</h1>
        <div className="mt-3 flex justify-between items-center gap-5">
          <h2>Vị trí: {recruitmentPostData.level}</h2>
          <h2>Thành phố/Tỉnh: {recruitmentPostData.location}</h2>
        </div>
        <div className="mt-3 w-full flex justify-between items-start gap-5 border-t border-t-slate-400">
          <p>Mức lương: {recruitmentPostData.salary}</p>
          <div className="flex justify-center items-center gap-2">
            <p>Kỹ năng:</p>
            <Space>
              {recruitmentPostData?.skills.map((skill: any) => (
                <Badge
                  className="site-badge-count-109"
                  count={skill.name}
                  style={{ backgroundColor: "#52c41a" }}
                  key = {1000}
                />
              ))}
            </Space>
          </div>
        </div>
        <p className="mt-3 w-full">Mô tả: {recruitmentPostData.describe}</p>
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={handleApplication}
          autoComplete="off"
          layout="horizontal"
          className="w-full mt-10"
        >
          <Form.Item
            label="Nội dung:"
            name="content"
            className="flex flex-col"
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="File CV:  " name="CV" className="flex flex-col">
            <UploadFileInput />
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <Button htmlType="submit">Đăng ký</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default PostDetail;
