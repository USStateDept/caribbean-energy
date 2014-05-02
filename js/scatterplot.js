var margin = {top: 40, right: 40, bottom: 40, left: 40},
			width = 450 - margin.left - margin.right,
			height = 450 - margin.top - margin.bottom;

			var formatFixedPercent = d3.format(".1%"),
				formatPercent = d3.format(".0%"),
				formatPercentprecise = function(x) { return formatFixedPercent(x).replace(/\.00+%$$/, "%"); };
				formatPercentprecisesmall = function(x) { return formatFixedPercent(x).replace(/\.+%$$/, "%"); };	


			var DebtGDPscale = [0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4], 
				AnnFinscale = [0.0, 0.02, 0.04, 0.06, 0.08], 
				FtoGDPscale = [0.0, 0.001, 0.002, 0.003, 0.004, 0.005]

			// load data
			d3.csv("assets/petro_caribe.csv", function(error, data) {

			// change string (from CSV) into number format
			data.forEach(function(d) {
				d.CountryFixed = d.CountryFixed;
				d.Country = d.Country;
				d.DebtGDP = +d.DebtGDP;
				d.AnnFin = +d.AnnFin;
				d.FtoGDP = +d.FtoGDP;
				d.VoteCoin = +d.VoteCoin;
				d.NomGDP = +d.NomGDP;
				d.AnnFinRaw = +d.AnnFinRaw;
				d.IMF = d.IMF;
				d.CABGDP = +d.CABGDP;
				d.AnnFinRaw = +d.AnnFinRaw;

			//    console.log(d);
			});

			console.log(data);



			var radiusValue = function(d) { return d.AnnFinRaw;},
				size = d3.scale.linear()
				.domain([0, d3.max(data, radiusValue)])
				.range([3, 15]);

			var getGDP = function(d) { return d.NomGDP; };

			var getAnnFinRaw = function(d) { return d.AnnFinRaw; };

			var IMF = function(d) { return d.IMF; };

			//*********************************Debt to Ann Fin********************************

			// setup x 
			var debtxValue = function(d) { return d.DebtGDP;}, // data -> value
				debtxScale = d3.scale.linear().range([0, width]).clamp(true), // value -> display
				debtxMap = function(d) { return debtxScale(debtxValue(d));}, // data -> display
				debtxAxis = d3.svg.axis().scale(debtxScale).orient("bottom").tickFormat(formatPercent).tickValues(DebtGDPscale)
					.outerTickSize([0]).innerTickSize([6]).tickPadding([2]);
				xAxisdummy = d3.svg.axis()
					.scale(debtxScale)
					.orient("bottom")
					.tickValues([])
					.outerTickSize([0])
					.innerTickSize([0])
					.tickPadding([0]);

			// setup y
			var debtyValue = function(d) { return d.AnnFin;}, // data -> value
				debtyScale = d3.scale.linear().range([height, 0]).clamp(true), // value -> display
				debtyMap = function(d) { return debtyScale(debtyValue(d));}, // data -> display
				debtyAxis = d3.svg.axis().scale(debtyScale).orient("left").tickFormat(formatPercent).outerTickSize([0])
					.innerTickSize([4]).tickPadding([2]);
			yAxisdummy = d3.svg.axis()
				.scale(debtxScale)
				.orient("bottom")
				.tickValues([])
				.outerTickSize([0])
				.innerTickSize([0])
				.tickPadding([0]);

			// add the graph canvas to the body of the webpage
			var svg = d3.select("#left").append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.style("float", "left")
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
				.attr("class", "debtarea");

			// add the tooltip area to the webpage
			var tooltip = d3.select("body").append("div")
				.attr("class", "tooltip")
				.style("opacity", 0);

			//left rectangles

			var rectangle = svg.append("rect")
				.attr("x", 1)
				.attr("y", 1)
				.attr("width", 90)
				.attr("height", 263)
				.style("fill", '#fdd782')
				.style("fill-opacity", 1) ;

			var rectangle = svg.append("rect")
				.attr("x", 1)
				.attr("y", 264)
				.attr("width", 90)
				.attr("height", 107)
				.style("fill", '#dbcac1')
				.style("fill-opacity", 1) ;

			//rigth rectangles

			var rectangle = svg.append("rect")
				.attr("x", 91)
				.attr("y", 1)
				.attr("width", 279)
				.attr("height", 263)
				.style("fill", '#da8568')
				.style("fill-opacity", 1) ;

			var rectangle = svg.append("rect")
				.attr("x", 91)
				.attr("y", 264)
				.attr("width", 279)
				.attr("height", 107)
				.style("fill", '#9ec8eb')
				.style("fill-opacity", 1) ;

			// don't want dots overlapping axis, so add in buffer to data domain
  			debtxScale.domain([d3.min(data, debtxValue), d3.max(data, debtxValue)]);
  			debtyScale.domain([d3.min(data, debtyValue), d3.max(data, debtyValue)]);


  
  			// x-axis
  			svg.append("g")
      			.attr("class", "x axis")
      			.attr("transform", "translate(0," + height + ")")
      			.call(debtxAxis)
    			.append("text")
      			.attr("class", "label")
      			.attr("x", width)
      			.attr("y", 35)
      			.attr("dx", -185)
      			.style("text-anchor", "middle")
      			.text("Debt as a Percent of GDP");

			// dummy x-axis to create inner/left label
  			svg.append("g")
      			.attr("class", "dummyaxis")
      			.attr("transform", "translate(0," + height + ")")
      			.call(xAxisdummy)
    			.append("text")
      			.attr("class", "label")
      			.attr("x", width/4)
      			.attr("y", -10)
      			.style("text-anchor", "middle")
      			.text("Less Debt")
      			.style("fill", "#000")
      			.style("font-size", "10px");

			// dummy x-axis to create inner/right label
  			svg.append("g")
				.attr("class", "dummyaxis")
      			.attr("transform", "translate(0," + height + ")")
      			.call(xAxisdummy)
    			.append("text")
      			.attr("class", "label")
      			.attr("x", (width/4)*3)
      			.attr("y", -10)
      			.style("text-anchor", "middle")
      			.text("More Debt")
      			.style("fill", "#000")
      			.style("font-size", "10px");

  			// y-axis
  			svg.append("g")
      			.attr("class", "y axis")
      			.call(debtyAxis)
    			.append("text")
      			.attr("class", "label")
      			.attr("transform", "rotate(-90)")
      			.attr("y", -40)
      			.attr("x", -180)
      			.attr("dy", 12)
      			.style("text-anchor", "middle")
      			.text("Annual Financing as a Percent of GDP");

			// dummy y-axis to create inner/lower label
 			svg.append("g")
      			.attr("class", "dummyaxis")
      			.call(yAxisdummy)
      			.append("text")
      			.attr("class", "label")
      			.attr("transform", "rotate(-90)")
			    .attr("y", 0)
      			.attr("dy", 15)
      			.attr("x", - height/2 - 35 )
      			.style("text-anchor", "end")
      			.text("Less Petrocaribe Financing")
      			.style("fill", "#000")
      			.style("font-size", "10px");

 			// dummy y-axis to create inner/upper label
 			svg.append("g")
      			.attr("class", "dummyaxis")
      			.call(yAxisdummy)
      			.append("text")
      			.attr("class", "label")
      			.attr("transform", "rotate(-90)")
      			.attr("y", 0)
      			.attr("dy", 15)
      			.attr("x", - 25)
      			.style("text-anchor", "end")
      			.text("More Petrocaribe Financing")
      			.style("fill", "#000")
      			.style("font-size", "10px");
	
			// draw dots
  			svg.selectAll(".dot")
      			.data(data)
    			.enter().append("circle")
			    .attr("class", "dot")
      			.attr("class", function(d) { return d.CountryFixed ;})
      			.attr("r", function(d) { return size(radiusValue(d));})
      			.attr("cx", debtxMap )
      			.attr("cy", debtyMap )
      			.style("fill", '#525252') 
      			.on("mouseover", function(d) {
          			tooltip.transition()
               			.duration(200)
               			.style("opacity", .9);
          			tooltip.html("<strong>" + d["Country"] + "</strong>" + "<br/> " 
						+ "Debt to GDP: " + formatPercent(debtxValue(d)) 
						+ "<br/> " + "Ann. Financing: " + formatPercentprecisesmall(debtyValue(d))
						+ "<br/> " + "GDP (bil USD): " + getGDP(d)
						+ "<br/> " + "Ann Fin (mil USD): " + getAnnFinRaw(d)
						+ "<br/> " + "IMF Program: " + IMF(d))
               		.style("left", (d3.event.pageX + 15) + "px")
               		.style("top", (d3.event.pageY - 28) + "px")

					var circleUnderMouse = this.getAttribute("class");
						d3.selectAll('circle').transition().
						style('opacity',function () {
							return (this.getAttribute("class") === circleUnderMouse) ? 1 : 0.3;
						})
						.style('fill',function () {
							return (this.getAttribute("class") === circleUnderMouse) ? "#54278f" : 
							function(d) { return color(cValue(d));};
						});    		
					;
				})
				
				.on("mouseout", function(d) {
					tooltip.transition()
					.duration(500)
					.style("opacity", 0);
					d3.selectAll('circle').transition().style('opacity', 1)
					.style("fill", '#525252'); 
				});

//*********************************Vote Coin to F ********************************




// setup x 
var votexValue = function(d) { return d.VoteCoin;}, // data -> value
    votexScale = d3.scale.linear().range([0, width]).clamp(true), // value -> display
    votexMap = function(d) { return votexScale(votexValue(d));}, // data -> display
    votexAxis = d3.svg.axis().scale(votexScale).orient("bottom").outerTickSize([0])
		.innerTickSize([6]).tickPadding([2]);
   xAxisdummy = d3.svg.axis()
    	.scale(debtxScale)
    	.orient("bottom")
		.tickValues([])
		.outerTickSize([0])
		.innerTickSize([0])
		.tickPadding([0]);

// setup y
var voteyValue = function(d) { return d.FtoGDP;}, // data -> value
    voteyScale = d3.scale.linear().range([height, 0]).clamp(true), // value -> display
    voteyMap = function(d) { return voteyScale(voteyValue(d));}, // data -> display
    voteyAxis = d3.svg.axis().scale(voteyScale).orient("left").outerTickSize([0])
		.tickValues(FtoGDPscale).tickFormat(formatPercentprecisesmall)
		.innerTickSize([4]).tickPadding([0]);
   yAxisdummy = d3.svg.axis()
    	.scale(debtxScale)
    	.orient("bottom")
		.tickValues([])
		.outerTickSize([0])
		.innerTickSize([0])
		.tickPadding([0]);


// add the graph canvas to the body of the webpage
var svg = d3.select("#right").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("float", "left")
  .append("g")
    .attr("transform", "translate(" + 50 + "," + margin.top + ")")
    .attr("class", "debtarea");

// add the tooltip area to the webpage
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


//left rectangles

//var rectangle = svg.append("rect")
//	.attr("x", 1)
//	.attr("y", 1)
//	.attr("width", 185)
//	.attr("height", 185)
//	.style("fill", '#fecc5c')
//	.style("fill-opacity", 0.75) ;

//var rectangle = svg.append("rect")
//	.attr("x", 1)
//	.attr("y", 186)
//	.attr("width", 185)
//	.attr("height", 185)
//	.style("fill", '#bdd7e7')
//	.style("fill-opacity", 0.75) ;

//rigth rectangles

//var rectangle = svg.append("rect")
//	.attr("x", 186)
//	.attr("y", 1)
//	.attr("width",185)
//	.attr("height", 185)
//	.style("fill", '#f68c3f')
//	.style("fill-opacity", 0.75) ;

//var rectangle = svg.append("rect")
//	.attr("x", 186)
//	.attr("y", 186)
//	.attr("width", 185)
//	.attr("height", 185)
//	.style("fill", '#6aadd5')
//	.style("fill-opacity", 0.75) ;



  // don't want dots overlapping axis, so add in buffer to data domain
  votexScale.domain([d3.min(data, votexValue), d3.max(data, votexValue)]);
  voteyScale.domain([d3.min(data, voteyValue), 0.005]);


  // x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(votexAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", 35)
      .attr("dx", -185)
      .style("text-anchor", "middle")
      .text("Distance from U.S. Voting Position in the U.N.");


 // dummy x-axis to create inner/left label
  svg.append("g")
      .attr("class", "dummyaxis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxisdummy)
    .append("text")
      .attr("class", "label")
      .attr("x", width/4)
      .attr("y", -10)
      .style("text-anchor", "middle")
      .text("Closer to U.S. Position")
      .style("fill", "#000")
      .style("font-size", "10px");

 // dummy x-axis to create inner/right label
  svg.append("g")
      .attr("class", "dummyaxis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxisdummy)
    .append("text")
      .attr("class", "label")
      .attr("x", (width/4)*3)
      .attr("y", -10)
      .style("text-anchor", "middle")
      .text("Further from U.S. Position")
      .style("fill", "#000")
      .style("font-size", "10px");




  // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(voteyAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", -45)
      .attr("x", -180)
      .attr("dy", 12)
      .attr("line-height", "20px")
      .style("text-anchor", "middle")
      .text("U.S. Foreign Assistance as a Percent of GDP");


 // dummy y-axis to create inner/lower label
 svg.append("g")
      .attr("class", "dummyaxis")
      .call(yAxisdummy)
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("dy", 15)
      .attr("x", - height/2 - 35 )
      .style("text-anchor", "end")
      .text("Less U.S. Aid")
      .style("fill", "#000")
      .style("font-size", "10px");

 // dummy y-axis to create inner/upper label
 svg.append("g")
      .attr("class", "dummyaxis")
      .call(yAxisdummy)
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("dy", 15)
      .attr("x", - 25)
      .style("text-anchor", "end")
      .text("More U.S. Aid")
      .style("fill", "#000")
      .style("font-size", "10px");




  // draw dots
  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("class", function(d) { return d.CountryFixed ;})
      .attr("r", function(d) { return size(radiusValue(d));})
      .attr("cx", votexMap )
      .attr("cy", voteyMap )
      .style("fill", '#525252') 
      .on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", .9);
          tooltip.html("<strong>" + d["Country"] + "</strong>" + "<br/> " 
	+ "Voting Coincidence: " + (votexValue(d)) 
	        + "<br/> " + "Foreign Assistance: " + formatPercentprecisesmall(voteyValue(d))
		+ "<br/> " + "GDP (bil USD): " + getGDP(d)
		+ "<br/> " + "Ann Fin (mil USD): " + getAnnFinRaw(d)
		+ "<br/> " + "IMF Program: " + IMF(d))
               .style("left", (function() { return (d3.event.pageX > 800) ? d3.event.pageX - 175 + "px": d3.event.pageX + 15 + "px";}))
               .style("top", (d3.event.pageY - 28) + "px")


var circleUnderMouse = this.getAttribute("class");
    			d3.selectAll('circle').transition().
    			style('opacity',function () {
        		return (this.getAttribute("class") === circleUnderMouse) ? 1 : 0.3;
    			})
    			.style('fill',function () {
        		return (this.getAttribute("class") === circleUnderMouse) ? "#54278f" : 
			function(d) { return color(cValue(d));};
    			});    		


;
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
	d3.selectAll('circle').transition().style('opacity', 1)
            	.style("fill", '#525252'); 
      });




d3.selectAll(".tick")
  .style("font-size", "10px");


});