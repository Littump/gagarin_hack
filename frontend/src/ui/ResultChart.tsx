import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
export default function ResultChart({
  result,
  width,
}: {
  result: number;
  width?: number;
}) {
  const colors = [
    result <= 80 ? "#FE5E48" : result <= 50 ? "#fde047" : "#22c55e",
    "#e2e8f0",
  ];
  const options: ApexOptions = {
    chart: { type: "donut" },
    legend: { show: false },
    dataLabels: { enabled: false },
    tooltip: { enabled: false },
    fill: { colors },
    states: {
      hover: { filter: { type: "none", value: 0 } },
      active: { filter: { type: "none", value: 0 } },
    },
    stroke: { width: 0 },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: "80%",
          labels: {
            show: true,
            name: { show: false },
            value: {
              fontSize: "32px",
            },
            total: {
              show: true,
              showAlways: true,
              formatter: function () {
                return result + "%";
              },
            },
          },
        },
      },
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={[result, 100 - result]}
      type="donut"
      width={width ? width : 300}
    />
  );
}
