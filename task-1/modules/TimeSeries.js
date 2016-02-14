d3.timeSeries = function(){

	var w = 800,
		h = 600,
		m = {t:50,r:25,b:50,l:25},
		layout = d3.layout.histogram(),
		chartW = w - m.l - m.r,
		chartH = h - m.t - m.b,
		timeRange = [new Date(), new Date()], //default timeRange
        binSize = d3.time.day,
		maxY = 1000, //maximum number of trips to show on the y axis
		scaleX = d3.time.scale().range([0,chartW]).domain(timeRange),
		scaleY = d3.scale.linear().range([chartH,0]).domain([0,maxY]),
		valueAccessor = function(d){ return d; };
	
	function exports(_selection){
		//recompute internal variables if updated
        var bins = binSize.range(timeRange[0],timeRange[1]);
        bins.unshift(timeRange[0]);
        bins.push(timeRange[1]);

        layout
            .range(timeRange)
            .bins(bins);

		chartW = w - m.l - m.r,
		chartH = h - m.t - m.b;

		scaleX.range([0,chartW]).domain(timeRange);
		scaleY.range([chartH,0]).domain([0,maxY]);

		_selection.each(draw);
	}

	function draw(d){

		var _d = layout(d);
        console.log(_d);

		var line = d3.svg.line()
			.x(function(d){ return scaleX(d.x.getTime() + d.dx/2)})
			.y(function(d){ return scaleY(d.y)})
			.interpolate('basis');
		var area = d3.svg.area()
			.x(function(d){ return scaleX(d.x.getTime() + d.dx/2)})
			.y0(chartH)
			.y1(function(d){ return scaleY(d.y)})
			.interpolate('basis');
        var axisX = d3.svg.axis()
            .orient('bottom')
            .scale(scaleX)
            .ticks(d3.time.year);

		//append and update DOM
		//Step 1: does <svg> element exist? If it does, update width and height; if it doesn't, create <svg>
		var svg = d3.select(this).selectAll('svg')
			.data([d]);

		var svgEnter = svg.enter().append('svg')
		svgEnter.append('g').attr('class','area').attr('transform','translate('+m.l+','+m.t+')').append('path');
		svgEnter.append('g').attr('class','line').attr('transform','translate('+m.l+','+m.t+')').append('path');
		svgEnter.append('g').attr('class','axis').attr('transform','translate('+m.l+','+(m.t+chartH)+')');

		svg.attr('width',w).attr('height',h);

		//Step 2: create layers of DOM individually
		//2.1 line graph
		svg.select('.line')
			.select('path')
			.datum(_d)
			.attr('d',line);
		//2.2 area
		svg.select('.area')
			.select('path')
			.datum(_d)
			.attr('d',area);
        //2.3 horizontal axis
        svg.select('.axis')
            .call(axisX);
	}

	//Getter and setter
	exports.width = function(_v){
		if(!arguments.length) return w;
		w = _v;
		return this;
	}
	exports.height = function(_v){
		if(!arguments.length) return h;
		h = _v;
		return this;
	}
	exports.timeRange = function(_r){
		if(!arguments.length) return timeRange;
		timeRange = _r;
		return this;
	}
	exports.value = function(_v){
		if(!arguments.length) return layout.value();
		valueAccessor = _v;
		layout.value(_v);
		return this;
	}
	exports.maxY = function(_y){
		if(!arguments.length) return maxY;
		maxY = _y;
		return this;
	}
    exports.binSize = function(_b){
        //@param _b: d3.time.interval
        if(!arguments.length) return binSize;
        binSize = _b;
        return this;
    }

	return exports;
}

//1. CREAT A WRAPPER FUNCTION
//2. ORGANIZE HTML TO LOAD D3, then module, then script

//d3.TimeSeries = function(){
//    
//    //3. INTERNAL VARIALBES w/ defaults if needed
////    var w           = 600,
////        h           = 400,
////        m           = {t: 20, r: 20, b: 20, l: 20},
////        chartH      = h-m.t-m.b,
////        chartW      = w-m.l-m.r,
////        maxY        = 900,                         //maximum number of trips to show on the y axis
////        timeRange   = [new Date(), new Date()],     //time variables
////        binSize     = d3.time.day,                  //bin size variable
////        valAccess   = function (d) { return d },    //value accessor
////        scaleX      = d3.time.scale().range([0,chartW]).domain(timeRange),
////		scaleY      = d3.scale.linear().range([chartH,0]).domain([0,maxY]),
////        layout      = d3.layout.histogram();        //move layout up to global to access in exports and draw
////    
//    	var w = 800,
//		h = 600,
//		m = {t:50,r:25,b:50,l:25},
//		layout = d3.layout.histogram(),
//		chartW = w - m.l - m.r,
//		chartH = h - m.t - m.b,
//		timeRange = [new Date(), new Date()], //default timeRange
//        binSize = d3.time.day,
//		maxY = 1000, //maximum number of trips to show on the y axis
//		scaleX = d3.time.scale().range([0,chartW]).domain(timeRange),
//		scaleY = d3.scale.linear().range([chartH,0]).domain([0,maxY]),
//		valueAccessor = function(d){ return d; };
//    
//    //4. CUSTOM FUNCTION or "exports"
//    //gets returned when TimeSeries() is called, leave empty for now
//    function exports(_selection) {
////        //9. test skeleton with logged message
////        console.log('begin to draw');
////        
////        //17.begin to append, generally
////        //EXAMPLE:
//////        selection.append('svg')
//////                    .attr('width', w)
//////                    .attr('height', h)
//////                    .append('circle').attr('r', 50);
////        var bins = binSize.range(timeRange[0],timeRange[1]);
////        
////        
////        //20. histogram
////        layout      .range(timeRange)
////                    //21. Bins from d3.time.interval API
////                    //22. d3.time.interval.range(date1,date2);
////                    .bins(bins);
////        
////        //updae chartH and chartW
////        chartH      = h-m.t-m.b,
////        chartW      = w-m.l-m.r;
////        
////        //scale each graph width to be same as range of time, height to be a set number of trips
////        scaleX.range([0,chartW]).domain(timeRange);
////		scaleY.range([chartH,0]).domain([0,maxY]);
////
////		selection.each(draw);
//        
//        //recompute internal variables if updated
//        var bins = binSize.range(timeRange[0],timeRange[1]);
//        bins.unshift(timeRange[0]);
//        bins.push(timeRange[1]);
//
//        layout
//            .range(timeRange)
//            .bins(bins);
//
//		chartW = w - m.l - m.r,
//		chartH = h - m.t - m.b;
//
//		scaleX.range([0,chartW]).domain(timeRange);
//		scaleY.range([chartH,0]).domain([0,maxY]);
//
//		_selection.each(draw);
//            
//    }
//    
//    function draw(data){
//        
//        console.log(data)       //142 objects grouped by startStation
//        var _d = layout(data);
//        console.log(_d);
//        
//    }
//    
//    //6. GETTER & SETTER FUNCTIONS
//    //width, height, value(accessor), timeRange([s,e]), binSize(interval)
//    
//    exports.width = function(_x) {
//        //8. Getter, returns current value of width when no arguments passed
//        //reminder: a "return" in a function stops all other functionality
//        if (!arguments.length) return w;
//        //7. Setter, set width to user input (aka _x)
//        w = _x;
//        return this;
//    }
//    
//    //8. exports.height()
//    exports.height = function(_y) {
//        if (!arguments.length) return h;
//        //7. Setter, set width to user input (aka _x)
//        h = _y;
//        return this;
//    }
//    
//    //10.exports.timeRange
//    exports.timeRange = function(_t) {
//        //11. no time in variables, create some
//        //12. finish function
//        if(!arguments.length) return timeRange;
//        timeRange = _t;
//        return this;
//    }
//    
//    //13. exports.binSize
//    exports.binSize = function(_b) {
//        if(!arguments.length) return binSize;
//        binSize = _b;
//        return this;
//    }
//    
//    //14. value(accessor)
//    exports.value = function(_v) {
//        if(!arguments.length) return valAccess;
//        valAccess = _v;
//        return this;
//    }
//    
//    exports.maxY = function(_y){
//		if(!arguments.length) return maxY;
//		maxY = _y;
//		return this;
//	}
//    
//    //5. return explorts
//    return exports;
//    
//};