'use client'
import React, { useEffect, useState } from 'react';
import http from '../utils/http';
import ApplicationInfoModal from './applicationDetail'

interface JobApplication {
    id: number;
    content: string;
    status: string;
    cv: string;
    recruitmentPost: {
        title: string;
        describe: string;
        level: string;
        location: string;
        salary: string;
        form:string;
    };
}
interface Props {
    blogs: JobApplication[];
    customFunction: () => void;
}

const ApplicationList: React.FC<Props> =(props) => {
    const { blogs, customFunction } = props;
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [selectedAppli, setSelectedAppli] = useState<JobApplication | null>(null);

    useEffect(() => {
    }, []);
    const handleCloseModal = () => {
        setSelectedAppli(null);
    };

    const fetchApplications = async () => {
        try {
            const response = await http.getWithAutoRefreshToken(
                'api/manageApplication',
                { useAccessToken: true }
            );
            setApplications(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách đơn xin việc:', error);
        }
    };
    const handleUserNameClick = (appli: JobApplication) => {
        setSelectedAppli(appli);
    };
    const refreshData = () => {
        fetchApplications()
    };
    const handleDeleteClick = async (applicationId: number) => {
        try {
            // xoa don
            const updatedApplications = http.deleteWithAutoRefreshToken('api/manageApplication/'+applicationId,{ useAccessToken: true })
            refreshData();
            customFunction();
        } catch (error) {
            console.error('Lỗi khi rút đơn:', error);
        }
    };
    const handleWithdrawClick = async (applicationId: number) => {
        try {
            // rut don
            const updatedApplications = http.putWithAutoRefreshToken('api/manageApplication/updateApplication/'+applicationId,{},{ useAccessToken: true })
            refreshData();
            customFunction();
        } catch (error) {
            console.error('Lỗi khi xóa đơn:', error);
        }
    };
    const handleRefreshClick = async () => {
        try {
            await fetchApplications();
        } catch (error) {
            console.error('Lỗi khi làm mới danh sách đơn xin việc:', error);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Đã chấp nhận':
                return '#33FF66';
            case 'Đang chờ':
                return '#FFFF33';
            case 'Từ chối':
                return '#CC3300';
            case 'Rút đơn':
                return '#66FFFF';
        }
    };

    return (

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ textAlign: 'left', marginLeft: '10px', marginBottom: '10px', fontSize: '24px', marginTop: '5px' }}>
                Tất cả việc làm ({applications.length})
            </div>
            <button onClick={handleRefreshClick}>Làm mới</button>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {applications.map((application) => (
                    <div
                        key={application.id}
                        onClick={() => handleUserNameClick(application)}
                        style={{
                            border: '2px solid black',
                            padding: '10px',
                            margin: '10px',
                            width: '900px',
                        }}
                    >
                        <p style={{ textAlign: 'left' }}>Tên: {application.content}</p>
                        <p style={{ textAlign: 'left' }}>CV: {application.cv}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p style={{ textAlign: 'left' }}>Địa điểm: {application.recruitmentPost.location}</p>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <p style={{ backgroundColor: getStatusColor(application.status),border: '1px solid black', display: 'inline', padding: '5px', marginRight: '10px' }}>Trạng thái: {application.status}</p>
                                {application.status === 'Đang chờ' ? (
                                    <button style={{ backgroundColor : "#CC6699", border: '1px solid black', color: 'white', padding: '5px' }} onClick={() => handleWithdrawClick(application.id)}>Rút đơn</button>
                                ) : (
                                    <button style={{ backgroundColor: "#555555", border: '1px solid black', color: 'white', padding: '5px' }} onClick={() => handleDeleteClick(application.id)}>Xóa đơn</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <ApplicationInfoModal application={selectedAppli} show={selectedAppli !== null} handleClose={handleCloseModal}/>
        </div>


    );
};

export default ApplicationList;