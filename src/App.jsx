import React from "react";
import { scaleBand, scaleLinear } from "d3-scale";

const data = [
  { country: "United States", students: 68 },
  { country: "France", students: 21 },
  { country: "United Kingdom", students: 21 },
  { country: "Germany", students: 20 },
  { country: "Switzerland", students: 13 },
  { country: "Spain", students: 10 },
  { country: "Netherlands", students: 9 },
  { country: "India", students: 9 },
  { country: "Singapore", students: 8 },
  { country: "Ireland", students: 8 },
  { country: "Sweden", students: 7 },
  { country: "Australia", students: 7 },
  { country: "Canada", students: 6 },
  { country: "Finland", students: 5 },
  { country: "Mexico", students: 4 },
  { country: "Brazil", students: 4 },
  { country: "Saudi Arabia", students: 3 },
  { country: "Romania", students: 3 },
  { country: "Philippines", students: 3 },
  { country: "New Zealand", students: 3 },
];

function BarChart() {
  const sortedData = [...data].sort((a, b) => b.students - a.students);

  // Chart dimensions
  const width = 900;
  const margin = {
    top: 15,
    right: 55,
    bottom: 45,
    left: 155,
  };

  const barHeight = 25;
  const barGap = 10;

  const chartHeight = sortedData.length * (barHeight + barGap);

  const height = chartHeight + margin.top + margin.bottom;

  const innerWidth = width - margin.left - margin.right;

  const innerHeight = chartHeight;

  // D3 is used ONLY for scale calculations.
  const xScale = scaleLinear().domain([0, 70]).range([0, innerWidth]);

  const yScale = scaleBand()
    .domain(sortedData.map((d) => d.country))
    .range([0, innerHeight])
    .padding(0.28);

  // Manually generated tick positions.
  const ticks = [0, 10, 20, 30, 40, 50, 60, 70];

  return (
    <div className="chart-scroll">
      <svg
        className="bar-chart"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Horizontal bar chart showing student counts by country"
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Vertical gridlines */}
          {ticks.map((tick) => (
            <g key={tick}>
              <line
                x1={xScale(tick)}
                x2={xScale(tick)}
                y1={0}
                y2={innerHeight}
                className="gridline"
              />

              <text
                x={xScale(tick)}
                y={innerHeight + 28}
                textAnchor="middle"
                className="axis-tick"
              >
                {tick}
              </text>
            </g>
          ))}

          {/* Bars */}
          {sortedData.map((d, index) => {
            const y = yScale(d.country);
            const barWidth = xScale(d.students);

            return (
              <g key={d.country} className="bar-group">
                {/* Country labels */}
                <text
                  x={-15}
                  y={y + yScale.bandwidth() / 2}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="country-label"
                >
                  {d.country}
                </text>

                {/* Bar */}
                <rect
                  x={0}
                  y={y}
                  width={barWidth}
                  height={yScale.bandwidth()}
                  rx={2}
                  className={index === 0 ? "bar bar-highlight" : "bar"}
                />

                {/* Value labels */}
                <text
                  x={barWidth + 9}
                  y={y + yScale.bandwidth() / 2}
                  dominantBaseline="middle"
                  className="value-label"
                >
                  {d.students}
                </text>
              </g>
            );
          })}

          {/* X axis title */}
          <text
            x={innerWidth / 2}
            y={innerHeight + 45}
            textAnchor="middle"
            className="axis-title"
          >
            Number of students
          </text>
        </g>
      </svg>
    </div>
  );
}

export default function App() {
  const totalStudents = data.reduce((sum, d) => sum + d.students, 0);

  return (
    <main className="page">
      <section className="visualization">
        <div className="eyebrow">STUDENT DISTRIBUTION</div>

        <h1>Where students come from</h1>

        <p className="subtitle">Number of students by country of origin</p>

        <div className="chart-container">
          <div className="chart-header">
            <span>COUNTRY</span>
            <span>STUDENTS</span>
          </div>

          <BarChart />
        </div>

        <div className="chart-footer">
          <div>
            <span className="footer-label">COUNTRIES</span>
            <strong>{data.length}</strong>
          </div>

          <div>
            <span className="footer-label">TOTAL STUDENTS</span>
            <strong>{totalStudents}</strong>
          </div>

          <div>
            <span className="footer-label">TOP COUNTRY</span>
            <strong>United States</strong>
          </div>
        </div>

        <p className="source">Source: Provided student country dataset</p>
      </section>
    </main>
  );
}
