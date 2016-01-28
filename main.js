  /*
  var svg = d3.select("body").append("svg")
    .attr("width", 500)
    .attr("height", 500);
  
  var pierwiastki = svg.selectAll(".node")
    .data([4, 4, 4,43, 4]);
   	
  pierwiastki.enter()
    .append("circle")
      .attr("cx", function (d) { return 40 * d; })
      .attr("cy", function (d) { return 40; })
      .attr("r", 4);
      */
var nodes, links;


d3.tsv("nodes.tsv",  typeNodes, function(error, data) {
	console.log(error);
	console.log(data);
	nodes = data;
	nodes.forEach( function(d) {
		d.yearsAgo = 2016 - d.year;

	});
	d3.tsv("links.tsv", typeLines, function(error, data) {
		console.log(error);
		console.log(data);
		links = data;
		callback();
	});

	function callback () {
		var width = 1200, height = 800;

		var svg = d3.select("body").append("svg")
			.attr("width", width)
			.attr("height", height) 

		var force = d3.layout.force()
		    .size([width, height])
			.linkDistance(0)
			.charge(-50)
		    .nodes(nodes)
		    .links(links);

		var link = svg.selectAll('.link')
		    .data(links)
		    .enter().append('line')
		    .attr('class', 'link');


		var node = svg.selectAll('.node')
		    .data(nodes)
		    .enter().append('circle')
		    .attr('class', 'node')
		    .attr('r', 4)


		    .on("mouseover", function (d, i) {
		    	node.attr("class", function (t, j) {
		    		return i == j ? "node selected" : "node";
		    	})
		    	link.attr("class", function (t, j) {
		    		if (t.source.index == i || t.target.index == i)
		    			return "link selected";
		    		else
		    			return "link unselected";

		    	})


/*		    	link.each(function (t, j) {
		    		if (t.source.index == i || t.target.index == i) {
		    			this.attr("stroke", "black")
		    				.attr("opacity", 1)
		    		}
		    		else
		    			this.attr("opacity", 0.6)
		    				.attr("stroke", "gray")

		    	})
		    	link.attr("opacity", function (t, j) {
		    		console.log(t);
		    		if (t.source.index == i || t.target.index == i)
		    			return 1
		    		else
		    			return 0.6
		    	})
		    	link.attr("stroke", function (t, j) {
		    		console.log(t);
		    		if (t.source.index == i || t.target.index == i)
		    			return "black"
		    		else
		    			return "gray"
		    	})*/


		    })


		var xscale =  d3.scale.log()
			.range([width*0.1, width*0.9])
			.domain([10, d3.max(nodes, function(d) { return d.yearsAgo; })]);

	/*	var yscale = d3.scale.linear()
			.range([height*0.1, height*0.9])
			.domain([])
*/
		force.on('tick', function () {

			node.attr("cx", function (d) { 
				//	console.log(d.year) 
					d.x = xscale(d.yearsAgo)
					return d.x //zmienić skalę
				})
				.attr("cy", function (d) { return d.y = Math.min(height, Math.max(0, d.y))} )
				.append("title")
		    		.text( function (d) { return d.name } )

			 link.attr('x1', function (d) { return d.source.x; })
			 	.attr('y1', function (d) { return d.source.y; })
			 	.attr('x2', function (d) { return d.target.x; })
			 	.attr('y2', function (d) { return d.target.y; })
		})

		force.start();
	}
})

/*
function draw(dane) {
	var WID = 1200, HEI = 600;
	var svg = d3.select("body").append("svg")
		.attr("width", WID)
		.attr("height", HEI) 

	var	timeline = svg.append("line")
		.attr("class", "arrow")
	 	.attr("x1", svg.attr("width")/10)
		.attr("x2", 0.9*svg.attr("width"))
		.attr("y1", 0.9*svg.attr("height"))
		.attr("y2", 0.9*svg.attr("height"))

	var xscale =  d3.scale.linear()
		.range([svg.attr("width")*0.1, svg.attr("width")*0.9])
		.domain([-1000, 2000])

	nodes.enter()
		.append("circle")
			.attr("class", "node")
			.attr("cx", function(d, i) {  return xscale(d.YA) })
			.attr("cy", function(d, i) { return 500 })
			.attr("r", 5)
}
*/
function typeLines (d) {
	d.source = +d.source;
	d.target = +d.target;
	return d;
}

function typeNodes (d) {
	d.year = +d.year;
	return d;
}
