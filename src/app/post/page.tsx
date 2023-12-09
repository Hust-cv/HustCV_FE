'use client'
import React, { useState } from 'react';
import {
    Button,
    Modal,
    Cascader,
    Checkbox,
    ColorPicker,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Slider,
    Switch,
    TreeSelect,
    Upload,
} from 'antd';
import type { SelectProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const Post = () => {
    //hook
    const [isModalOpen, setIsModalOpen] = useState(false);


    //component require
    const options: SelectProps['options'] = [
        {
            value: 'nodejs',
            label: 'NodeJS',
        },
        {
            value: 'reacjs',
            label: 'ReactJS',
        },
        {
            value: 'nextjs',
            label: 'NextJS'
        },
        {
            value: 'figma',
            label: 'Figma'
        },
        {
            value: 'express',
            label: 'ExpressJS'
        },
        {
            value: 'mysql',
            label: 'MySQL'
        },
        {
            value: 'mongodb',
            label: 'Mongo DB'
        }
    ];

    // for (let i = 10; i < 36; i++) {
    //     options.push({
    //         label: i.toString(36) + i,
    //         value: i.toString(36) + i,
    //     });
    // }


    //logic
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
    };
    return (
        <>
            <div className="container mx-auto">
                <div>
                    <Button type="primary" className='bg-blue-600' onClick={showModal}>
                        Open Modal
                    </Button>
                    <Modal title="Tạo bài đăng tuyển" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <Form
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            layout="horizontal"
                            // disabled={componentDisabled}
                            style={{ maxWidth: 800 }}
                            className='w-800px'
                        >
                            <Form.Item label="Tiêu đề bài đăng">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Mô tả bài đăng tuyển">
                                <TextArea rows={4} />
                            </Form.Item>
                            <Form.Item label="Yêu cầu">
                                <TextArea rows={4} />
                            </Form.Item>
                            <Form.Item label="Hình thức">
                                <Radio.Group>
                                    <Radio value="onsite"> Onsite </Radio>
                                    <Radio value="hybrid"> Hybrid </Radio>
                                    <Radio value="remote"> Remote </Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label='Kỹ năng'>
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Please select"
                                    defaultValue={['a10', 'c12']}
                                    onChange={handleChange}
                                    options={options}
                                />
                            </Form.Item>
                            <Form.Item label="DatePicker">
                                <DatePicker />
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </div>
        </>
    )
}

export default Post