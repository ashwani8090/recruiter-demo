import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getJobConfig } from '../../utils/api';
import useAxios from 'axios-hooks';
import { setLoading } from '../../redux/slices/sessionSlice';
import { HomeFilled } from '@ant-design/icons';
import "./styles.css";
import { List } from '../../components'

const Home = () => {
    const dispatch = useDispatch();
    const [{ data: jobs, loading: jobsLoading, error: jobsError }, executeUserInfo] = useAxios(getJobConfig, { manual: true })

    useEffect(() => {
        dispatch(setLoading(false))
    }, [jobsError?.response?.data?.errorName])

    useEffect(() => {
        dispatch(setLoading(true))
        dispatch(setLoading(false))
    }, [jobsLoading])

    useEffect(() => {
        executeUserInfo({ data: { page: 0 } })
    }, [])

    const handlePageChange = (event, page) => {
        executeUserInfo({ params: { page } })
    }

    return (
        <div style={{ display: 'flex', padding: 50, flexDirection: 'column', alignItems: 'flex-start' }}>
            <div>
                <HomeFilled style={{ color: "#ffffff", marginRight: 10 }} /><span style={{ color: '#ffffff' }}>Home</span>
            </div>
            <div className='home-title'>Jobs posted by you</div>
            <List listData={jobs?.data} handlePageChange={handlePageChange} count={Number(jobs?.metadata?.count / 20).toFixed(0)} />
        </div>)
}

export default Home;