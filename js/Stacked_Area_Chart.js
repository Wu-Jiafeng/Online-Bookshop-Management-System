function lineChart() {
    var _chart = {};
    var _width = screen.width * 0.9, _height = 350,
            _margins = {top: 30, left: 50, right: 130, bottom: 70},  //expand margin for legend rendor
            _legendbottom = 30,   //area for legend in Method 2
            _legendright = 100,  //area for legend in Method 1
            _x, _y,
            _names = [],    //keep name list for the chart
            _data = [],
            //_colors = d3.scale.category10(),
            _colors,    //define colors according to name list
            _svg,
            _bodyG,
            _line;
	var tooltip = d3.select("body")
				.append("div")
				.attr("class","tooltip")
				.style("opacity",0.0);
 
    _chart.render = function () {
        if (!_svg) {
            _svg = d3.select("#svg3").append("div")
            		.style("text-align", "center")
            		.append("svg")
                    .attr("height", _height)
                    .attr("width", _width);
 
            renderAxes(_svg);
 
            defineBodyClip(_svg);
        }
 
        renderBody(_svg);
    };
 
    function renderAxes(svg) {
        var axesG = svg.append("g")
                .attr("class", "axes");
 
        renderxAxis2(axesG);
 
        renderyAxis2(axesG);
    }
    
    function renderxAxis2(axesG){
        var xAxis2 = d3.svg.axis()
                .scale(_x.range([0, quadrantWidth()]))
                .orient("bottom")
                .tickFormat(d3.time.format("%y年%m月"))  //set tick name in Chinese
                .ticks(d3.time.months, 1);  //set ticks for x axis as monthly
 
        axesG.append("g")
                .attr("class", "x1 axis")
                .attr("transform", function () {
                    return "translate(" + xStart() + "," + yStart() + ")";
                })
                .call(xAxis2);
                
        /* d3.selectAll("g.x g.tick")
            .append("line")
                .classed("grid-line", true)
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", 0)
                .attr("y2", - quadrantHeight()); */
        
        d3.select("g.x1.axis")   //add label for x axis
        	.append("text")
            .attr("class", "axislabel")
            .attr("text-anchor", "end")
            .attr("x", quadrantWidth)
            .attr("y", 40)
            .text("日期");
        
        d3.selectAll("g.x1 g.tick text")
        	.attr("x", -24)
        	.attr("transform", "rotate(-30)"); 
    }
    
    function renderyAxis2(axesG){
        var yAxis2 = d3.svg.axis()
                .scale(_y.range([quadrantHeight(), 0]))
                .orient("left");
                
        axesG.append("g")
                .attr("class", "y1 axis")
                .attr("transform", function () {
                    return "translate(" + xStart() + "," + yEnd() + ")";
                })
                .call(yAxis2);
                
         /* d3.selectAll("g.y g.tick")
            .append("line")
                .classed("grid-line", true)
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", quadrantWidth())
                .attr("y2", 0); */
         
         d3.select("g.y1.axis")   //add label for y axis
	     	.append("text")
	        .attr("class", "axislabel")
	        .attr("text-anchor", "start")
	        .attr("x", -_margins.left)
	        .attr("y", -6)
	        .text("总销售额（元）");
    }
 
    function defineBodyClip(svg) {
        var padding = 5;
 
        svg.append("defs")
                .append("clipPath")
                .attr("id", "body-clip")
                .append("rect")
                .attr("x", 0 - padding)
                .attr("y", 0)
                .attr("width", quadrantWidth() + 2 * padding + _legendright)  //expand clip path for legend
                .attr("height", quadrantHeight());
    }
 
    function renderBody(svg) {
        if (!_bodyG)
            _bodyG = svg.append("g")
                    .attr("class", "body")
                    .attr("transform", "translate(" 
                        + xStart() + "," 
                        + yEnd() + ")")
                    .attr("clip-path", "url(#body-clip)");        
 
         var stack = d3.layout.stack()
		        .offset('zero')
		        .order('default');
		stack(_data);
 
        renderLines();
 
        //renderDots(); 
        
        renderAreas();
        
        //Method 2: put legend at the bottom of the chart
        renderLegend(); 
    }
 
    function renderLines() {
        _line = d3.svg.line()
                        .x(function (d) { return _x(d.x); })
                        .y(function (d) {
		                    return _y(d.y + d.y0);
		                });
                        
        _bodyG.selectAll("g.linegroup path.line")
                    .data(_data)
                .enter()
                .append("g")
                .attr("class", "linegroup")
                .append("path")                
                .style("stroke", function (d, i) { 
                    return _colors(_names[i]);
                })
                .attr("class", "line");
        
        _bodyG.selectAll("g.linegroup path.line")
        			.data(_data)
        			.exit()
        			.remove();
 
        _bodyG.selectAll("g.linegroup path.line")
                .transition()
                .duration(1000)
                .attr("d", function (d) { return _line(d); });
        
    }
 
    function renderDots() {
        _data.forEach(function (list, i) {
            _bodyG.selectAll("circle._" + i)
                        .data(list)
                    .enter()
                    .append("circle")
                    .attr("class", "dot _" + i);
            
            _bodyG.selectAll("circle._" + i)
            		.data(list) 
            		.exit()
            		.remove();
 
            _bodyG.selectAll("circle._" + i)
                    .data(list)                    
                    .style("stroke", function (d) { 
                        return _colors(_names[i]);
                    })
                    .transition()
                    .duration(1000)
                    .attr("cx", function (d) { return _x(d.x); })
                    .attr("cy", function (d) { return _y(d.y); })
                    .attr("r", 3.5);
        });
    }
    
    function renderAreas() {
        var area = d3.svg.area()
                .x(function (d) {
                    return _x(d.x);
                })
                .y0(function(d){return _y(d.y0);})
                .y1(function (d) {
                    return _y(d.y + d.y0);
                });
        _bodyG.selectAll("g.areagroup path.area")
					.data(_data)
                .enter()
                .append("g")
                .attr("class", "areagroup")
                .append("path")
                .style("fill", function (d, i) {
                    return _colors(_names[i]);
                })
                .attr("class", "area");
        _bodyG.selectAll("g.areagroup path.area")
					.data(_data)
                .transition()
                .attr("d", function (d) {
                    return area(d);
                });
 
        //Method 1: add legend along with the line
        _bodyG.selectAll("g.areagroup")
        	.append("text")
	        .datum(function(d, i) { 
	        	return {name: _names[i], x: d[d.length - 1].x, y: (d[d.length - 1].y0 + d[d.length - 1].y)};   //get the last point of the line
	        })
	        .attr("transform", function(d) { 
	        	return "translate(" + (_x(d.x) - 5) + "," + _y(d.y) + ")";  //set the legend beside the last point
	        })
	        .attr("x", 3)
	        .attr("dy", "1em")
	        .attr("text-anchor", "end")
	        .attr("font-size", "10px")
	        .text(function(d) { 
	        	return d.name; 
	        });
    }
    
    //render legend at the bottom of the chart
    function renderLegend(){
    	var legend = _svg.selectAll(".legend")
			.data(_colors.domain())
			.enter()
			.append("g")
			.attr("class", "legend")
			.attr("transform", function(d, i) {
				var legendX = i * 120 + _margins.left;   //set position for each legend element
				var legendY = _height - _legendbottom;
				return "translate(" + legendX + ", " + legendY + ")";
			});
		
		legend.append("rect")
			.attr("x", 0)
			.attr("y", 1)
			.attr("width", 16)
			.attr("height", 8)
			.style("fill", _colors)
			.on("mouseover",function(d){
				tooltip.html(d)
				.style("left", (d3.event.pageX) + "px")	
				.style("top", (d3.event.pageY + 20) + "px")
				.style("opacity",1.0);
			})
			.on("mousemove",function(d){ 	
				tooltip.style("left", (d3.event.pageX) + "px")			
					.style("top", (d3.event.pageY + 20) + "px");
			})
			.on("mouseout",function(d){
				tooltip.style("opacity",0.0);
			})
		
		//legend.append("text")
		//	.attr("x", -20)
		//	.attr("y", 25)
		//	.classed("legendtext", true)
		//	.text(function(d) {
		//		return d;
		//	});
    }
 
    function xStart() {
        return _margins.left;
    }
 
    function yStart() {
        return _height - _margins.bottom;
    }
 
    function xEnd() {
        return _width - _margins.right;
    }
 
    function yEnd() {
        return _margins.top;
    }
 
    function quadrantWidth() {
        return _width - _margins.left - _margins.right;
    }
 
    function quadrantHeight() {
        return _height - _margins.top - _margins.bottom;
    }
 
    _chart.width = function (w) {
        if (!arguments.length) return _width;
        _width = w;
        return _chart;
    };
 
    _chart.height = function (h) {
        if (!arguments.length) return _height;
        _height = h;
        return _chart;
    };
 
    _chart.margins = function (m) {
        if (!arguments.length) return _margins;
        _margins = m;
        return _chart;
    };
 
    _chart.colors = function (c) {
        if (!arguments.length) return _colors;
        _colors = c;
        return _chart;
    };
    
    //set name list function
    _chart.names = function (n) {
        if (!arguments.length) return _names;
        _names = n;
        return _chart;
    };
 
    _chart.x = function (x) {
        if (!arguments.length) return _x;
        _x = x;
        return _chart;
    };
 
    _chart.y = function (y) {
        if (!arguments.length) return _y;
        _y = y;
        return _chart;
    };
 
    _chart.addSeries = function (series) {
        _data.push(series);
        return _chart;
    };
 
    return _chart;
}
 
//load data
var timeformat = d3.time.format("%Y-%m");
 
var chart;
 
//d3.text("data/health-service-quantity-2.json", function(rawdatastr){
d3.json("./sever/currentOrder-Time.php", function(error,nations) {
	var names=[];
	for(var i=0;i<nations.length;i++){
		names.push(nations[i].name);
		(nations[i].population).forEach(function(d){
			d.date=timeformat.parse(d.date);
		});
	}
	//var names = d3.keys(rawdata);
	
	//get date range
	var dateRange = d3.extent(nations[0].population, function(d){
		return d.date;
	})
	
	//get value range
	var valueSum = [];
	for(var i=0;i<nations.length;i++){
		valueSum.push(d3.extent(nations[i].population, function(d){
			return d.value;
		})[1]);
	}
	var maxValue = d3.sum(valueSum);	
	
	chart = lineChart()
			.x(d3.time.scale().domain(dateRange))
			.y(d3.scale.linear().domain([0, maxValue]));   //adjust domain for y axis
	
	for(var i=0;i<nations.length;i++){
	    chart.addSeries((nations[i].population).map(function(d){
	    	return {
	    		x: d.date, 
	    		y: d.value
	    	};
	    }));
	}
	
	//set name list to the chart
	chart.names(names);
	//define colors according to name list
	chart.colors(d3.scale.category10().domain(names));
	
	chart.render();
});
 