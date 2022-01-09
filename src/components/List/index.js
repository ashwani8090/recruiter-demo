import Card from '@mui/material/Card';
import Pagination from '@mui/material/Pagination';
import './styles.css';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const List = ({ listData = [], count = 0, handlePageChange = () => { } }) => {

    return (<div>
        <div className='list'>
            {listData?.map((item, index) => {

                return (<Card
                    className="card"
                    key={index}
                    sx={{ width: 260, maxWidth: 260, height: 162, marginBottom: 1, marginTop: 1 }} >
                    <div style={{ overflow: 'hidden', minHeight: 100 }}>
                        <div>{item?.title}</div>
                        <div className='content'>{item?.description}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: "center" }}>
                        <LocationOnOutlinedIcon />
                        {item?.location}
                    </div>
                </Card>)
            })}
        </div>
        <Pagination style={{ display: 'flex', justifyContent: 'center' }} count={count} variant="outlined" shape="rounded" onChange={handlePageChange} />
    </div>
    )
}

export default List;