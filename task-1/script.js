var w = d3.select('.plot').node().clientWidth,
    h = d3.select('.plot').node().clientHeight; 

var timeSeries = d3.timeSeries()
    .width(w)
    .height(h)
    .timeRange([new Date(2011,6,16),new Date(2013,11,15)])
    .value(function(d){ return d.startTime; })
    .maxY(80)
    .binSize(d3.time.day);


d3.csv('../data/hubway_trips_reduced.csv',parse,dataLoaded);

function dataLoaded(err,rows){


    //create nested hierarchy based on stations
    var tripsByStation = d3.nest()
        .key(function(d){return d.startStation})
        .entries(rows);

    //create a <div> for each station
    //bind trips data to each station
    var plots = d3.select('.container').selectAll('.plot')
        .data(tripsByStation);

    plots
        .enter()
        .append('div').attr('class','plot');

    plots
        .each(function(d){
            d3.select(this).datum(d.values)
                .call(timeSeries)
                .append('h2')
                .text(d.key);

        })
}

function parse(d){
    if(+d.duration<0) return;

    return {
        duration: +d.duration,
        startTime: parseDate(d.start_date),
        endTime: parseDate(d.end_date),
        startStation: d.strt_statn,
        endStation: d.end_statn
    }
}

function parseDate(date){
    var day = date.split(' ')[0].split('/'),
        time = date.split(' ')[1].split(':');

    return new Date(+day[2],+day[0]-1, +day[1], +time[0], +time[1]);
}


//var w = d3.select('.plot').node().clientWidth,
//    h = d3.select('.plot').node().clientHeight;
//
////18. check w and h
//console.log(w+", "+h);
////19. go to css and make plot have a dimension
//
//var timeSeries = d3.TimeSeries()
//    .width(w)
//    .height(h)
//    .timeRange([new Date(2011,6,16),new Date(2013,11,15)])
//    .value(function(d){ return d.startTime; })
//    .maxY(80)
//    .binSize(d3.time.day);
//
//
//d3.csv('../data/hubway_trips_reduced.csv',parse,dataLoaded);
//
//function dataLoaded(err,rows){
//    
////    //console.log(rows);
////    
////    var nested_data = d3.nest()
////                        .key(function(d) { return d.startStation; })
////                        .entries(rows);
////    
////    //console.log(nested_data);
////    
////    //create a <div> for each station
////    //bind trips data to each station
////    var plots = d3.select('.container').selectAll('.plot')
////        .data(nested_data);
////    
////    console.log(plots);
////    
////    
////    
////    //15. make a new instance of time series, and populate the width and height
////    var timeSeries1 = d3.TimeSeries()
////                        .width(w)
////                        .height(h)
////                        .timeRange([new Date(2011,6,16),new Date(2013,11,15)])
////                        .value(function(d){ return d.startTime; })
////                        .maxY(80)
////                        .binSize(d3.time.day);
////    
////    //16. make a selection, join with data, call module
////    plots
////        .enter()
////        .append('div').attr('class','plot');
//    //create nested hierarchy based on stations
//    var tripsByStation = d3.nest()
//        .key(function(d){return d.startStation})
//        .entries(rows);
//
//    //create a <div> for each station
//    //bind trips data to each station
//    var plots = d3.select('.container').selectAll('.plot')
//        .data(tripsByStation);
//
//    plots
//        .enter()
//        .append('div').attr('class','plot');
//
//    plots
//        .each(function(d){
//            d3.select(this).datum(d.values)
//                .call(timeSeries)
//                .append('h2')
//                .text(d.key);
//
//        })
//
//}
//              
//
//function parse(d){
//    if(+d.duration<0) return;
//
//    return {
//        duration: +d.duration,
//        startTime: parseDate(d.start_date),
//        endTime: parseDate(d.end_date),
//        startStation: d.strt_statn,
//        endStation: d.end_statn
//    }
//}
//
//function parseDate(date){
//    var day = date.split(' ')[0].split('/'),
//        time = date.split(' ')[1].split(':');
//
//    return new Date(+day[2],+day[0]-1, +day[1], +time[0], +time[1]);
//}
//
