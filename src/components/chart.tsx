import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { Form, Select } from "antd";
import { MoviesFromAPI, HubData, ChartDatatType } from "../types";
import { getDateWithTimeFormat, sortArrayByTime } from '../utils';

type ChartProps = {
  moviesApiData: MoviesFromAPI[];
  moviesVotes: HubData[];
};
const { Option } = Select;

const RenderLineChart = (props: ChartProps) => {
  let [allMoviesVotes, setAllMoviesVotes] = useState<HubData[]>([]);
  const [chartData, setChartData] = useState<ChartDatatType[]>([]);

  /* 
	Add the new data from hub to existing array that contains previous data
  */
  useEffect(() => {
    allMoviesVotes = [...allMoviesVotes, ...props.moviesVotes];
    setAllMoviesVotes(allMoviesVotes);

	if(allMoviesVotes.length > 500){ // to prevent a situation when array is too big (to prevent security and performance issues)
		allMoviesVotes.splice(0, 400);
		setAllMoviesVotes(allMoviesVotes)
	}
  }, [props.moviesVotes]);

/* 
Organize the data for chart when user change selection, we need to go over the whole movies votes because we dont have previous calculated data per movie
*/  
  const handleChange = (movieId: number) => {
    let dataForChart: ChartDatatType[] = [];
    for (let i = 0; i < allMoviesVotes.length; i++) {		
      if (allMoviesVotes[i].itemId === movieId) {
        // I assume that we get different times every time from Hub		
			dataForChart.push({
				name: getDateWithTimeFormat(allMoviesVotes[i].generatedTime),
				votes: allMoviesVotes[i].itemCount,
			});
      }
    }
	
	if(dataForChart.length > 20){ // show the last 20 items
		const indexToSplice = dataForChart.length - 20
		dataForChart = dataForChart.splice(indexToSplice, dataForChart.length);
	}
	dataForChart = sortArrayByTime(dataForChart)	
    setChartData(dataForChart);
  };


  /* 
 	Render options for select 
  */
  const renderOptions = () => {
    return props.moviesApiData.map((item, index) => (
      <Option value={item.id} key={item.id}>
        {item.description}
      </Option>
    ));
  };

  return (
    <div className="container p-10" style={{ width: "100%", height: 300 }}>
	<p className="text-blue-950 font-semibold text-lg text-left">
        Votes by time
      </p>
      <Form
        className="form"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 4 }}
        labelAlign="left"
      >
        <Form.Item label="Select movie" className="form-item">
          <Select
            style={{ width: "200px" }}
            placeholder={"Select movie"}
            onChange={handleChange}
          >
            {renderOptions()}
          </Select>
        </Form.Item>
      </Form>
      <LineChart
        width={730}
        height={250}
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="votes" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};
export default RenderLineChart;
