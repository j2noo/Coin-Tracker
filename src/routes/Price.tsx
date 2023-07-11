import { PriceData } from "./Coin";
import ApexChart from "react-apexcharts";

interface PriceProps {
  priceData: PriceData;
}
function Price({ priceData }: PriceProps) {
  console.log(priceData);
  return (
    <div>
      <ApexChart
        type="bar"
        series={[
          {
            name: "Inflation",
            data: [
              priceData.quotes.USD.percent_change_15m,
              priceData.quotes.USD.percent_change_30m,
              priceData.quotes.USD.percent_change_1h,
              priceData.quotes.USD.percent_change_12h,
              priceData.quotes.USD.percent_change_24h,
              priceData.quotes.USD.percent_change_7d,
              priceData.quotes.USD.percent_change_30d,
              priceData.quotes.USD.percent_change_1y,
            ],
          },
        ]}
        options={{
          chart: {
            height: 350,
            type: "bar",
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: {
                position: "top", // top, center, bottom
              },
            },
          },
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return val + "%";
            },
            offsetY: -20,
            style: {
              fontSize: "12px",
              colors: ["#304758"],
            },
          },

          xaxis: {
            categories: ["15분", "30분", "1시간", "12시간", "24시간", "7일", "30일", "365일"],
            position: "top",
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
            crosshairs: {
              fill: {
                type: "gradient",
                gradient: {
                  colorFrom: "#D8E3F0",
                  colorTo: "#BED1E6",
                  stops: [0, 100],
                  opacityFrom: 0.4,
                  opacityTo: 0.5,
                },
              },
            },
            tooltip: {
              enabled: true,
            },
          },
          yaxis: {
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
            labels: {
              show: false,
              formatter: function (val) {
                return val + "%";
              },
            },
          },
          title: {
            text: "Monthly Inflation in Argentina, 2002",
            floating: true,
            offsetY: 330,
            align: "center",
            style: {
              color: "#444",
            },
          },
        }}
      ></ApexChart>
    </div>
  );
}
export default Price;
