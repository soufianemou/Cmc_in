import { Chart as ChartJS } from "chart.js/auto";
import { useEffect, useState } from "react";
import { PolarArea } from "react-chartjs-2";
import customAxios from "../../api/axios";
export default function PolarChart() {
  const [fetchedData, setFetchedData] = useState([]);
  useEffect(() => {
    customAxios
      .get("/admin/topCommenters")
      .then((res) => setFetchedData(res.data));
  }, []);
  return (
    <div>
      <PolarArea
        data={{
          labels: fetchedData?.map((elem) => elem.name) || [],
          datasets: [
            {
              label: "Posts",
              data: fetchedData?.map((elem) => elem.count) || [],
              backgroundColor: [
                "rgba(75, 192, 92, 0.8)",
                "rgba(155, 139, 208, 0.8)",
                "rgba(175, 109, 132, 0.8)",
              ],
              borderRadius: 7,
            },
          ],
        }}
      />
    </div>
  );
}
