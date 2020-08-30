<template>
  
  <svg :width="width" :height="height" class="pb-0">
    <defs>
      <linearGradient id="Gradient1" x1="0" x2="0" y1="0" y2="1">
         <stop offset="0%" stop-color="#f72047" />
         <stop offset="30%" stop-color="#ffd200" />
         <stop offset="100%" stop-color="#1feaea" />
       </linearGradient>
    </defs>
    <g ref="chart" >
      <rect
        v-for="(d, i) in data"
        :key="i"
        :width="w"
        :height="calcHeight(d)"
        :x="xScale(d)"
        :y=300-calcHeight(d)
        stroke="#ff6347"
        strokeWidth="3"
        fill="url(#Gradient1)"/>
    </g>
    <g ref="axis"></g>
  </svg>
</template>

<script>
import * as d3 from 'd3';

const xSelector = d => d.x;
const ySelector = d => d.y;

export default {
  name: 'BarChart',
  props: ['data', 'width', 'height', 'ok'],
  data() {
    return {
      w: 0
    }
  },
  mounted() {
    const xScale = d3
      .scaleBand()
      .range([0, 400])
      .domain(this.data.map(d => xSelector(d)))
      .padding(0.3);
    const yScale = d3
      .scaleLinear()
      .range([300, 0])
      .domain([0, 240]);
    const margin = { top: 40, left: 40, bottom: 40, right: 0 };
    const yAxis = d3.axisLeft(yScale).tickSizeInner(-400);
    const xAxis = d3.axisBottom(xScale);
    const chartWidth = this.width - (margin.left + margin.right);
    const chartHeight = this.height - (margin.top + margin.bottom);
    this.w = xScale.bandwidth();
    d3
      .select(this.$refs.chart)
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
    d3
      .select(this.$refs.axis)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .attr('class', 'axis y')
      .call(yAxis);
    d3
      .select(this.$refs.axis)
      .append('g')
      .attr(
        'transform',
        `translate(${margin.left}, ${300 + margin.top})`
      )
      .attr('class', 'axis x')
      .call(xAxis);
  },
  methods: {
    yScale(d) {
      const yScale = d3
        .scaleLinear()
        .range([300, 0])
        .domain([0, 240]);
      return yScale(ySelector(d));
    },
    xScale(d) {
      const xScale = d3
        .scaleBand()
        .range([0, 400])
        .domain(this.data.map(d => xSelector(d)))
        .padding(0.3);
      return xScale(xSelector(d));
    },
    calcHeight(d) {
      const yScale = d3
        .scaleLinear()
        .range([300, 0])
        .domain([0, 240]);
      const margin = { top: 40, left: 100, bottom: 40, right: 0 };
      const chartHeight = this.height - (margin.top + margin.bottom);
      const yValue = yScale(ySelector(d));
      const barHeight = chartHeight - yValue;
      return barHeight - 20;
    },
    // color() {
    //   let COLOR = "#f72047";
    //   if(this.ok === 1) {
    //     COLOR = "";
    //   }
    //   return COLOR;
    // }
  }
}
</script>

<style>
.tick line {
  stroke-dasharray: 2 2;
  stroke: #ccc;
}
.axis {
  margin-bottom: 0px;
}
</style>