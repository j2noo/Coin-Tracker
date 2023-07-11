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
  //console.log(data?.map((d) => [d.time_open, [+d.open, +d.high, +d.low, +d.close]]));
  console.log(data);

  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data:
                data?.map((d) => ({
                  x: new Date(d.time_open),
                  y: [+d.open, +d.high, +d.low, +d.close],
                })) || [],
            },
          ]}
          options={{
            chart: {
              type: "candlestick",
              height: 350,
            },
            title: {
              text: "CandleStick Chart",
              align: "left",
            },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
          }}
        ></ApexChart>
      )}
    </div>
  );
}
export default Chart;
