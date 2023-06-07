import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getRevenue, clearStore } from '../../../redux/slices/Admin';
import { useNavigate } from 'react-router-dom';
import { Badge, Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const chartOptions = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const Revenue = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const revenue = useSelector((state) => state.adminReducer.revenue);
  const totalBookings = useSelector(
    (state) => state.adminReducer.totalBookings
  );
  const totalRevenue = useSelector((state) => state.adminReducer.totalRevenue);
  const chartData = {
    labels: revenue.map((rev) => rev.month),
    datasets: [
      {
        label: 'Revenue',
        data: revenue.map((rev) => rev.revenue),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
  const memoizedChartData = useMemo(
    () => {
      return chartData;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [revenue]
  );

  React.useEffect(() => {
    dispatch(getRevenue())
      .unwrap()
      .catch((err) => {
        err?.response?.data.errors.map((err) => {
          if (err === 'Your session has been expired.') {
            dispatch(clearStore());
            navigate('/login');
          }
          return toast.error(err);
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-100 d-flex flex-column align-items-center justify-content-center" style={{paddingTop: '10px'}}>
      <div className="my-2" style={{ width: '600px', height: '400px' }}>
        <Bar data={memoizedChartData} options={chartOptions} />
      </div>
      <Card className="shadow w-50 text-center p-4">
        <Card.Title>Stats</Card.Title>
        <Card.Body>
          <Card.Text>
            Total Bookings:{' '}
            <Badge pill bg="warning">
              {totalBookings}
            </Badge>
          </Card.Text>
          <Card.Text>
            Total Revenue:{' '}
            <Badge pill bg="warning">
              {totalRevenue}$
            </Badge>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Revenue;
