'use client'
import React, { useState } from 'react';
import Education from '../components/education'
import Project from '../components/project';
import Certification from '../components/certification';
import UserInfor from '../components/userInfor'
import SkillProfile from '../components/skillProfile';
import ManageCV from '../components/manageCV';
import CriterionJob from '../components/criterionJob'
import { Descriptions, Empty } from 'antd';
import {
    Button,
    Modal,
    DatePicker,
    Form,
    Input,
    Checkbox,
    Radio,
    Select,
    message,
    Card,
    Popover,
    Avatar,
    Tabs,
    TabsProps
} from 'antd';
import { MoreOutlined, CheckOutlined, FireOutlined, ReadOutlined, FormOutlined, TagOutlined, EditOutlined, DeleteOutlined, UserOutlined, HomeOutlined, MoneyCollectOutlined, FieldTimeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import type { SelectProps, DatePickerProps } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import http from '../utils/http';
import moment from 'moment'
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;


const candidateProfile = () => {
    const profile1 = () => {
        return(
            <>
                <div className='mx-[300px]'>
                    <UserInfor></UserInfor>
                    <br></br>
                    <Education></Education>
                    <br></br>
                    <Certification></Certification>
                    <br></br>
                    <Project></Project>
                    <br></br>
                    <SkillProfile></SkillProfile>
                </div >
            </>
        )
    }

    const manageCv = () => {
        return(
            <>
                <div className='mx-[300px]'>
                    <ManageCV></ManageCV>
                </div>
            </>
        )
    }

    const jobPreferences = () => {
        return(
            <>
                <div className='mx-[300px]'>
                    <CriterionJob></CriterionJob>
                </div>
            </>
        )
    }

    return (
        <>
            <Tabs
                defaultActiveKey='1'
                size='large'
                tabBarStyle={{
                    marginRight: 50,
                    marginLeft: 50,
                }}
                tabBarGutter={50}
                items = {[
                    {
                        label: 'Profile',
                        key: '1',
                        children: profile1(),
                    },
                    {
                        label: 'Manage CVs',
                        key: '2',
                        children: manageCv()
                    },
                    {
                        label: 'Job Preferences',
                        key: '3',
                        children: jobPreferences()
                    },
                ]}
            />
        </>
    )
}

export default candidateProfile