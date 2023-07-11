import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
}
interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexChart
          type="line"
          series={[{ name: "sales", data: data?.map((d) => Number(d.close)) ?? [] }]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            yaxis: { show: false },
            xaxis: {
              labels: { show: false },
              categories: data?.map((val) => new Date(val.time_close * 1000).toUTCString()),
            },
            stroke: {
              curve: "smooth",
            },
            fill: { type: "gradient", gradient: { gradientToColors: ["blue"] } },
            colors: ["red"],
            tooltip: {
              y: {
                formatter: (val) => `$${val.toFixed(3)}`,
              },
            },
          }}
        ></ApexChart>
      )}
    </div>
  );
}
export default Chart;
