import d3 from 'd3';

const node = document.createElement('d3ReactDiv')

// need to get project tree in here some how
const root = d3.hierarchy(projectTree);
const tree = d3.tree();

tree.size([800, 850]);
tree(root);

d3.select(node)
  .selectAll('circle.node')
  .data(root.descendants())
  .enter()
  .append('g')
  .classed('node', true)
  .append('circle')
  .classed('node', true)
  .attr('cx', function (d) { return d.x; })
  .attr('cy', function (d) { return d.y; })
  .attr('r', d => d.data.count === 'variable' ? 47.5 : 50)
  .style('stroke-width', 2);

d3.select(node)
  .selectAll('.link')
  .data(root.links())
  .enter()
  .insert('line')
  .classed('link', true)
  .attr('x1', d => d.source.x)
  .attr('y1', d => d.source.y)
  .attr('x2', d => d.target.x)
  .attr('y2', d => d.target.y);

d3.selectAll('circle')
  .style('fill', (d) => {
    if (d.data.stateful) return '#F6E2B7';
    return '#F7F5F4';
  })
  .style('stroke', (d) => {
    if (d.data.stateful) return '#EEC25D';
    return '#CDC5C1';
  })
  .on('click', setViewingNode)

d3.selectAll('g.node')
  .append('text')
  .text(d => d.data.name)
  .attr('width', '10px')
  .classed('stateful', d => d.data.stateful)
  .attr('x', d => d.x)
  .attr('y', d => d.y)
  .attr('dy', '6px')

d3.selectAll('g.node')
  .filter(d => d.data.count === 'variable')
  .insert('circle', 'circle')
  .style('fill', '#FAF9F9')
  .style('stroke', '#E5E1DF')
  .style('stroke-width', 2)
  .attr('cx', d => d.x)
  .attr('cy', d => d.y)
  .attr('r', 52.5)

d3.selectAll('g.node')
  .filter(d => d.data.count === 'variable')
  .insert('circle', 'circle')
  .style('fill', '#FDFDFD')
  .style('stroke', '#F2F0EF')
  .style('stroke-width', 2)
  .attr('cx', d => d.x)
  .attr('cy', d => d.y)
  .attr('r', 57.5);
