
// Various accessors that specify the four dimensions of data to visualize.
function x(d) { return d.income; }
function y(d) { return d.lifeExpectancy; }
function radius(d) { return d.population; }
function color(d) { return d.region; }
function key(d) { return d.name; }

var monthdata=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// Chart dimensions.
var margin = {top: 19.5, right: 19.5, bottom: 19.5, left: 39.5},
    width = 960 - margin.right,
    height = 500 - margin.top - margin.bottom;


// Load the data.
//d3.json("./nations.json", function(nations) {
d3.json("./sever/currentOrder-Item.php", function(error,nations) {
	// Various scales. These domains make assumptions of data, naturally.
var maxX=0,
	maxY=0,
	maxR=0;

nations.forEach((item,index,array)=>{
	for(var i=0;i<12;i++){
		maxX=Math.max(maxX, item['income'][i][1]);
		maxY=Math.max(maxY, item['lifeExpectancy'][i][1]);
		maxR=Math.max(maxR, item['population'][i][1]);
	}
})
	
var xScale = d3.scale.linear().domain([0, maxX]).range([0, width]),
    yScale = d3.scale.linear().domain([0, maxY]).range([height, 0]),
    radiusScale = d3.scale.sqrt().domain([0, maxR]).range([0, 40]),
    colorScale = d3.scale.category10();

// The x & y axes.
var xAxis = d3.svg.axis().orient("bottom").scale(xScale),
    yAxis = d3.svg.axis().scale(yScale).orient("left");

// Create the SVG container and set the origin.
var svg = d3.select("#chart11").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("class", "gRoot")

// Add the x-axis.
svg.append("g")
    .attr("class", "x axis1")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

// Add the y-axis.
svg.append("g")
    .attr("class", "y axis1")
    .call(yAxis);

// Add an x-axis label.
svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height - 6)
    .text("?????????????????????");

// Add a y-axis label.
svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("?????????????????????");

// Add the year label; the value is set on transition.
var label = svg.append("text")
    .attr("class", "year label")
    .attr("text-anchor", "end")
    .attr("y", height - 70)
    .attr("x", width)
    .text(monthdata[0]);

// Add the country label; the value is set on transition.
var countrylabel = svg.append("text")
    .attr("class", "country label")
    .attr("text-anchor", "start")
    .attr("y", 80)
    .attr("x", 20)
    .text(" ");

var first_time = true;
  // A bisector since many nation's data is sparsely-defined.
  var bisect = d3.bisector(function(d) { return d[0]; });

  // Add a dot per nation. Initialize the data at 1800, and set the colors.
  var dot = svg.append("g")
      .attr("class", "dots")
    .selectAll(".dot")
      .data(interpolateData(1))
    .enter().append("circle")
      .attr("class", "dot")
      .style("fill", function(d) { return colorScale(color(d)); })
      .call(position)
      .on("mousedow", function(d, i) {

      })
      .on("mouseup", function(d, i) {
        dot.classed("selected", false);
        d3.select(this).classed("selected", !d3.select(this).classed("selected"));
        dragit.trajectory.display(d, i, "selected");

        //TODO: test if has been dragged
        // Look at the state machine history and find a drag event in it?

      })
      .on("mouseenter", function(d, i) {
        clear_demo();
        if(dragit.statemachine.current_state == "idle") {
          dragit.trajectory.display(d, i)
          dragit.utils.animateTrajectory(dragit.trajectory.display(d, i), dragit.time.current, 1000)
          countrylabel.text(d.name);
          dot.style("opacity", .4)
          d3.select(this).style("opacity", 1)
          d3.selectAll(".selected").style("opacity", 1)
        }
      })
      .on("mouseleave", function(d, i) {

        if(dragit.statemachine.current_state == "idle") {
          countrylabel.text("");
          dot.style("opacity", 1);
        }
  
        dragit.trajectory.remove(d, i);
      })
      .call(dragit.object.activate)

  // Add a title.
  dot.append("title")
      .text(function(d) { return d.name; });

  // Start a transition that interpolates the data based on year.
  svg.transition()
      .duration(30000)
      .ease("linear")

  // Positions the dots based on data.
  function position(dot) {
    dot.attr("cx", function(d) { return xScale(x(d)); })
       .attr("cy", function(d) { return yScale(y(d)); })
       .attr("r", function(d) { return radiusScale(radius(d)); });
  }

  // Defines a sort order so that the smallest dots are drawn on top.
  function order(a, b) {
    return radius(b) - radius(a);
  }

  // Updates the display to show the specified year.
  function displayYear(year) {
    dot.data(interpolateData(year), key).call(position).sort(order);
    label.text(monthdata[year-1]);
  }

  // Interpolates the dataset for the given (fractional) year.
  function interpolateData(year) {
    return nations.map(function(d) {
      return {
        name: d.name,
        region: d.region,
        income: interpolateValues(d.income, year),
        population: interpolateValues(d.population, year),
        lifeExpectancy: interpolateValues(d.lifeExpectancy, year)
      };
    });
  }

  // Finds (and possibly interpolates) the value for the specified year.
  function interpolateValues(values, year) {
    var i = bisect.left(values, year, 0, values.length - 1),
        a = values[i];
    if (i > 0) {
      var b = values[i - 1],
          t = (year - a[0]) / (b[0] - a[0]);
      return a[1] * (1 - t) + b[1] * t;
    }
    return a[1];
  }
  
  init();

  function update(v, duration) {
    dragit.time.current = v || dragit.time.current;
    displayYear(dragit.time.current)
    d3.select("#slider-time").property("value", dragit.time.current);
  }

  function init() {

    dragit.init(".gRoot");

    dragit.time = {min:1, max:13, step:1, current:1}
    dragit.data = d3.range(nations.length).map(function() { return Array(); })

    for(var yy = 1; yy<13; yy++) {

      interpolateData(yy).filter(function(d, i) { 
        dragit.data[i][yy-dragit.time.min] = [xScale(x(d)), yScale(y(d))];

      })
    }

    dragit.evt.register("update", update);

    //d3.select("#slider-time").property("value", dragit.time.current);

    d3.select("#slider-time")
      .on("mousemove", function() { 
        update(parseInt(this.value), 500);
        clear_demo();
      })

    var end_effect = function() {
      countrylabel.text("");
      dot.style("opacity", 1)
    }

    dragit.evt.register("dragend", end_effect)
  }

function clear_demo() {
  if(first_time) {
     svg.transition().duration(0);
    first_time = false;
    window.clearInterval(demo_interval);
    countrylabel.text("");
    dragit.trajectory.removeAll();
    d3.selectAll(".dot").style("opacity", 1)
  }
}

function play_demo() {

  var ex_nations = ["?????????????????????", "???????????????(?????????)", "???????????????", "?????????", "????????????", "???????????????", "?????????", "???????????????"]
  var index_random_nation = null;
  var random_index = Math.floor(Math.random() * ex_nations.length);
  var random_nation = nations.filter(function(d, i) { 
    if(d.name == ex_nations[random_index]) {
      index_random_nation = i;
      return true;
    }
  })[0];

  var random_nation = nations[index_random_nation];

  dragit.trajectory.removeAll();
  dragit.trajectory.display(random_nation, index_random_nation);
  countrylabel.text(random_nation.name);

  dragit.utils.animateTrajectory(dragit.lineTrajectory, dragit.time.min, 6)

  d3.selectAll(".dot").style("opacity", .4)

  d3.selectAll(".dot").filter(function(d) {
    return d.name == random_nation.name;
  }).style("opacity", 1)
}

var demo_interval = null;

setTimeout(function() {
  if(first_time) {
    play_demo()
    demo_interval = setInterval(play_demo, 3000)
  }
}, 1000);

});

