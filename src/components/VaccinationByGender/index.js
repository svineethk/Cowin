// Write your code here
import './index.css'

import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const VaccinationByGender = props => {
  const {data} = props

  return (
    <ResponsiveContainer width="100%" height={500}>
      <PieChart>
        <Pie
          cx="50%"
          cy="50%"
          data={data}
          startAngle={0}
          endAngle={360}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default VaccinationByGender
