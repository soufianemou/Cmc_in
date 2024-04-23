import { Chart as ChartJS } from "chart.js/auto";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import customAxios from "../../api/axios";
export default function LineChart() {
  const { poles } = useSelector((state) => state.pole);
  const [fetchedData, setFetchedData] = useState([]);
  useEffect(() => {
    customAxios
      .get("/admin/totalCommentsPerPole")
      .then((res) => setFetchedData(res.data));
  }, []);
  return (
    <div>
      <Line
        data={{
          labels: poles?.map((elem) => elem.name) || [],
          datasets: [
            {
              label:'comments',
              
              data: fetchedData?.map((elem) => elem.total_comments) || [],
              backgroundColor: [
                "rgba(255, 99, 132, 0.8)",
                "rgba(153, 102, 255, 0.8)",
                "rgba(54, 162, 235, 0.8)",
                "rgba(255, 206, 86, 0.8)",
                "rgba(105, 89, 164, 0.8)",
                "rgba(155, 129, 208, 0.8)",
                "rgba(75, 192, 192, 0.8)",
                "rgba(255, 109, 64, 0.8)",
              ],
              borderRadius: 7,
            },
          ],
        }}
      />
    </div>
  );
}
