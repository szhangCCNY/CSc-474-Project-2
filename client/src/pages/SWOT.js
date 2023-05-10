import React from "react";
import "./SWOT.css";
// const 

const JsonKeys = [
    "MIN PROB ADJUSTED VALUE",
    "MAX PROB ADJUSTED VALUE",
    "AVERAGE PROB ADJUSTED VALUE",
    "REALISTIC PROB ADJUSTED VALUE",
    "3 POINT BASED PROB ADJUSTED VALUE",
    "PERT BASED PROB ADJUSTED VALUE"
]


const keyAbbrev = [
    "min",
    "max",
    "avg",
    "realistic",
    "3p",
    "pert"
]

const keyColor = [
    "#1f77b4",
    "#ff7f0e",
    "#2ca02c", 
    "#d62728", 
    "#9467bd",
    "#8c564b"
]

class SWOT extends React.Component {
    constructor(props){
        super(props);
    }

    checkValid(json){
        for (var key in json) {
            if (json[key] == 0){
                return true;
            } 
            if (!(json[key])) {
                return false;
            }
        }
        return true
    }

    processData(){
        const processData = {
            Strength: [],
            Weakness: [],
            Opportunity: [],
            Threat: []
        }

        this.props.data.forEach(data => {
            // console.log(data);
            data.forEach(json => {
                // console.log(json);
                if(this.checkValid(json)){
                    const category = json.CATEGORY;
                    // console.log(category);
                    processData[category].push(json);
                }
            })
        });
        return processData
    }

    createChart(list, location){
        let data = []
        list.forEach(element => {
            const key = element["PARAM NAME"];
            const color = "#808080";
            const values = []
            for (let i = 0; i < JsonKeys.length; i += 1){
                const value = {x: keyAbbrev[i], y: element[JsonKeys[i]], color: keyColor[i]};
                values.push(value);
            }
            data.push(
                {key, values, color}
            )
        });
        var chart = window.nv.models.multiBarChart()
                    .reduceXTicks(false)
                    .rotateLabels(0)
                    .showControls(false)
                    .groupSpacing(0.15)
                    .stacked(false)
                    .rotateLabels(-45);
    
        chart.xAxis
            .axisLabel("")
            .tickFormat(function(d) { return d; });
    
        chart.yAxis
            .axisLabel('Dollars ($)')
            .tickFormat(window.d3.format(',.0.04f'));
    
        // Render chart
        // console.log(location);
        window.nv.addGraph(function() {
        window.d3.select(`#${location} svg`)
            .datum(data)
            .transition()
            .duration(500)
            .call(chart);
    
        window.nv.utils.windowResize(chart.update);
    
        return chart;
        });
    }
    render() {
    //     const processData = this.processData();
    //     console.log(processData);
    //     if (processData){
    //         const strengthList = processData["Strength"].map((json) => <li>{json}</li>)
    //         const weakList = processData["Weakness"].map((json) => <li>{json}</li>)
    //         const opportunityList = processData["Opportunity"].map((json) => <li>{json}</li>)
    //         const threatList = processData["Threat"].map((json) => <li>{json}</li>)
    //         console.log("here");
    //         return (
    //             <div>
    //                 <ul>
    //                     {/* {strengthList}
    //                     {weakList}
    //                     {opportunityList}
    //                     {threatList} */}
    //                 </ul>
    //             </div>
    //         )
    //     }
    //     else{
    //         return(
    //             <div>this is the swot page</div>
    //         )
    //     }
    // }
    // Sample data
    // Sample data
    const processData = this.processData();
    const strengthList = processData["Strength"];
    const weakList = processData["Weakness"];
    const opportunityList = processData["Opportunity"];
    const threatList = processData["Threat"];

    this.createChart(strengthList, "chart1");
    this.createChart(weakList, "chart3");
    this.createChart(opportunityList, "chart2");
    this.createChart(threatList, "chart4");

    // console.log(strengthList);
    // let data1 = []
    // strengthList.forEach(element => {
    //     const key = element["PARAM NAME"];
    //     const color = "#808080";
    //     const values = []
    //     for (let i = 0; i < JsonKeys.length; i += 1){
    //         const value = {x: keyAbbrev[i], y: element[JsonKeys[i]], color: keyColor[i]};
    //         values.push(value);
    //     }
    //     data1.push(
    //         {key, values, color}
    //     )
    // });
    // console.log(data1);


      
    // var data = [
    //     {
    //         key: "Category 1",
    //         values: [
    //         { x: "A", y: 10 }
    //         ]
    //     },
    //     {
    //         key: "Category 2",
    //         values: [
    //         { x: "A", y: 12 },
    //         { x: "B", y: 18 },
    //         { x: "C", y: 24 }
    //         ]
    //     },
    //     {
    //         key: "Category 3",
    //         values: [
    //         { x: "A", y: 8 },
    //         { x: "B", y: 12 },
    //         { x: "C", y: 16 }
    //         ]
    //     }
    //     ];
    
    //     // Chart configuration
    //     var chart = window.nv.models.multiBarChart()
    //                 .reduceXTicks(false)
    //                 .rotateLabels(0)
    //                 .showControls(false)
    //                 .groupSpacing(0.15)
    //                 .stacked(false)
    //                 .rotateLabels(-45);
    
    //     chart.xAxis
    //         .tickFormat(function(d) { return d; });
    
    //     chart.yAxis
    //         .tickFormat(window.d3.format(',.1f'));
    
    //     // Render chart
    //     window.nv.addGraph(function() {
    //     window.d3.select('#chart1 svg')
    //         .datum(data1)
    //         .transition()
    //         .duration(500)
    //         .call(chart);
    
    //     window.nv.utils.windowResize(chart.update);
    
    //     return chart;
    //     });
        // return(
        //     <div>
        //         <div id="chart">
        //             <svg></svg>
        //         </div>
        //     </div>
        // )
        return(
            <div className="grid">
                <div id="chart1" className="quadrant one">
                    <div>Positive Strength</div>
                    <svg></svg>
                </div>
                <div id="chart2" className="quadrant two">
                    <div>Positive Opportunity</div>
                    <svg></svg>
                </div>
                <div id="chart3" className="quadrant three">
                    <div>Negative Weakness</div>
                    <svg></svg>
                </div>
                <div id="chart4" className="quadrant four">
                    <div>Negative Threat</div>
                    <svg></svg>
                </div>
            </div>
        )
    }
}

export default SWOT