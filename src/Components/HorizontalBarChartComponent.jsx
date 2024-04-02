import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import "./HorizontalBarChartComponent.css"

class HorizontalBarChartComponent extends React.Component {
  render() {
    const { data } = this.props;

    const categories = {

      Entertainment: { name: "Entertainment", value: 0 },
      Food: { name: "Food", value: 0 },
      Travel: { name: "Travel", value: 0 },
    };

    data.forEach((item) => {
      const category = item.category;
      if (categories[category]) {
        categories[category].value += parseInt(item.price, 10); 
      }
    });

    const barData = Object.values(categories);

    return (
      <BarChart width={580} height={350} data={barData} layout="vertical" margin={{ left: 60 }}>
        <XAxis type="number" axisLine={false} tickLine={false} tick={false} />
        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} />
        <Bar dataKey="value" fill="#8884d8" barSize={30} radius={[0, 20, 20, 0]} />
      </BarChart>
    );
  }
}

export default HorizontalBarChartComponent;
