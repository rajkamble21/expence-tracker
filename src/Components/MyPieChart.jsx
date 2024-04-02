import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

class PieRechartComponent extends React.Component {

  COLORS = ["#A000FF", "#FF9304", "#FDE006"];

  render() {
    const { data } = this.props;

    const categories = {
      Food: { name: "Food", value: 0 },
      Entertainment: { name: "Entertainment", value: 0 },
      Travel: { name: "Travel", value: 0 },
    };

    data.forEach((item) => {
      const category = item.category;
      if (categories[category]) {
        categories[category].value += parseInt(item.price, 10); 
      }
    });

    const pieData = Object.values(categories);

    return (
      <PieChart width={290} height={290}>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
        >
          {pieData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={this.COLORS[index % this.COLORS.length]}
            />
          ))}
        </Pie>
        <Legend align="center" verticalAlign="bottom" />
      </PieChart>
    );
  }
}

export default PieRechartComponent;
