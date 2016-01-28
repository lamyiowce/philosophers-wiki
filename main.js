var nodes, links, margin = 20;




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
			.on("click", function () {
		    	if (forceStopped == 1) {
		    		forceStopped = 0;
		    		force.start();
		    	}
		    	else {
		    		forceStopped = 1;
		    		force.stop();
		    	}
		    })

	/*	var timeline = svg.append("path")
			.attr("d", "M" + (width/10) + (height-margin/2) + 
						"L" + (width*0.9) + (height-margin/2) +
						"L" + (width*0.9-30) + (height-margin/2+10) +
						"L" + (width*0.9-30) + (height-margin/2-10) +
						"L" + (width*0.9) + (height-margin/2))
			.attr("stroke", "black")
			.attr("stroke-weight", 3);
*/
		var xAxis = d3.svg.axis()
            .scale(axisScale);

		var force = d3.layout.force()
		    .size([width, height])
			.linkDistance(50)
			.charge(function(d) { return -20*d.inf;})
		    .nodes(nodes)
		    .links(links);

		var link = svg.selectAll('.link')
		    .data(links)
		    .enter().append('line')
		    .attr('class', 'link');

		var forceStopped = 1;

		var colors = d3.scale.linear()
		//	.domain([#393b79, #9c9ede])
			.domain([0, d3.max(nodes, function (d) { return d.inf; })])
			.range(["#17becf", "#ffff00"]);

			console.log(colors(3));

		var rscale = d3.scale.linear()
			.domain([0, d3.max(nodes, function (d) { return d.inf; })])
			.range([3,10])

		var node = svg.selectAll('.node')
		    .data(nodes)
		    .enter().append('circle')
		    .attr('class', 'node')
		    .attr('r', function (d) { 
		    	return rscale(d.inf);
		    })
		    .style("fill", function (d) {
		    	return colors(d.inf);

		    })
		    .on("mouseover", function (d, i) {
		    	node.attr("class", function (t, j) {
		    		return i == j ? "node" : "node unselected";
		    	})
		    	link.attr("class", function (t, j) {
		    		if (t.source.index == i || t.target.index == i)
		    			return "link selected";
		    		else
		    			return "link unselected";

		    	})
		    })
		    .on("mouseout", function (d, i) {
		    	node.attr("class", function () {
		    		 return "node";
		    	})
		    	link.attr("class", function (t, j) {
		    		return "link";
		    	})
		    })
		    .on("dblclick", function (d) {
		    	window.location.assign(d.wiki, '_blank');
		    });
/*
		var xscale =  d3.scale.log()
			.range([width*0.1, width*0.9])
			.domain([10, d3.max(nodes, function(d) { return d.yearsAgo; })]);*/

		var xord =  d3.scale.linear()
			.range([width*0.05, width*0.95])
			.domain([0, 690]);

		force.on('tick', function () {
			node.attr("cx", function (d, i) { 
					return d.x=xord(i);
				})
				.attr("cy", function (d) { return d.y = Math.min(height-margin-Math.random(0, 8), Math.max(5+Math.random(0, 8), d.y))} )
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

function typeLines (d) {
	d.source = +d.source;
	d.target = +d.target;
	return d;
}

function typeNodes (d) {
	d.year = +d.year;
	d.inf = +d.inf;
	return d;
}
