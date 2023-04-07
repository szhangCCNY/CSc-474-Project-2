import React from "react";
import "./Summation.css";
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

class Summation extends React.Component {
    constructor(props){
        super(props);
    }

    checkValid(json){
        for (var key in json) {
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
                    .stacked(true)
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

    createVisualization1(data, location){
        const summation = {
            "MIN PROB ADJUSTED VALUE": 0,
            "MAX PROB ADJUSTED VALUE": 0,
            "AVERAGE PROB ADJUSTED VALUE": 0,
            "REALISTIC PROB ADJUSTED VALUE": 0,
            "3 POINT BASED PROB ADJUSTED VALUE": 0,
            "PERT BASED PROB ADJUSTED VALUE": 0
        }

        for(var category in data){
            const categoryList = data[category];
            console.log(categoryList);
            categoryList.forEach(element => {
                for(let i = 0; i < JsonKeys.length; i += 1){
                    summation[JsonKeys[i]] += element[JsonKeys[i]]
                }
            });
        }
        console.log(summation);
        let sumData = []

        for (let i = 0; i < JsonKeys.length; i += 1){
            const values = {x: keyAbbrev[i], y: summation[JsonKeys[i]], color: keyColor[i]};
            sumData.push(values);
        }


        const chartData = [{key: "summation", values: sumData}];
        console.log(chartData);

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
            .datum(chartData)
            .transition()
            .duration(500)
            .call(chart);
    
        window.nv.utils.windowResize(chart.update);
    
        return chart;
        });
        
    }

    createVisualization2(data, location){
        const summation_pos = {
            "MIN PROB ADJUSTED VALUE": 0,
            "MAX PROB ADJUSTED VALUE": 0,
            "AVERAGE PROB ADJUSTED VALUE": 0,
            "REALISTIC PROB ADJUSTED VALUE": 0,
            "3 POINT BASED PROB ADJUSTED VALUE": 0,
            "PERT BASED PROB ADJUSTED VALUE": 0
        }

        const summation_neg = {
            "MIN PROB ADJUSTED VALUE": 0,
            "MAX PROB ADJUSTED VALUE": 0,
            "AVERAGE PROB ADJUSTED VALUE": 0,
            "REALISTIC PROB ADJUSTED VALUE": 0,
            "3 POINT BASED PROB ADJUSTED VALUE": 0,
            "PERT BASED PROB ADJUSTED VALUE": 0
        }

        const strength = data["Strength"]
        const opportunity = data["Opportunity"]
        const weakness = data["Weakness"]
        const threat = data["Threat"]

        strength.forEach(element => {
            for(let i = 0; i < JsonKeys.length; i += 1){
                summation_pos[JsonKeys[i]] += element[JsonKeys[i]]
            }
        });
        opportunity.forEach(element => {
            for(let i = 0; i < JsonKeys.length; i += 1){
                summation_pos[JsonKeys[i]] += element[JsonKeys[i]]
            }
        });
        weakness.forEach(element => {
            for(let i = 0; i < JsonKeys.length; i += 1){
                summation_neg[JsonKeys[i]] += element[JsonKeys[i]]
            }
        });
        threat.forEach(element => {
            for(let i = 0; i < JsonKeys.length; i += 1){
                summation_neg[JsonKeys[i]] += element[JsonKeys[i]]
            }
        });
        console.log(summation_pos, summation_neg);


        let pos_values = []
        for (let i = 0; i < JsonKeys.length; i += 1){
            const value = {x: keyAbbrev[i], y: summation_pos[JsonKeys[i]], color: "black"};
            pos_values.push(value)
        }
        let neg_values = []
        for (let i = 0; i < JsonKeys.length; i += 1){
            const value = {x: keyAbbrev[i], y: summation_neg[JsonKeys[i]], color: "red"};
            neg_values.push(value)
        }
        let diff_values = []
        for (let i = 0; i < JsonKeys.length; i += 1){
            const value = {x: keyAbbrev[i], y: summation_pos[JsonKeys[i]] + summation_neg[JsonKeys[i]], color: "blue"};
            diff_values.push(value)
        }

        const chartData = [
            {key: "Positive Effect", values: pos_values, color: "gray"},
            {key: "Negative Effect", values: neg_values, color: "gray"},
            {ket: "Difference", values:diff_values, color: "gray"}
        ]
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
            .datum(chartData)
            .transition()
            .duration(500)
            .call(chart);
    
        window.nv.utils.windowResize(chart.update);
    
        return chart;
        });   
    }
    createVisualization3(data, location){
        const strength = data["Strength"]
        const opportunity = data["Opportunity"]
        const weakness = data["Weakness"]
        const threat = data["Threat"]

        let Positive = 0;
        let Negative = 0;
        console.log(strength);
        strength.forEach(element => {
            for (let i = 0; i < JsonKeys.length; i += 1){
                Positive += element[JsonKeys[i]]
            }    
        });
        opportunity.forEach(element => {
            for (let i = 0; i < JsonKeys.length; i += 1){
                Positive += element[JsonKeys[i]]
            }    
        });
        weakness.forEach(element => {
            for (let i = 0; i < JsonKeys.length; i += 1){
                Negative += element[JsonKeys[i]]
            }    
        });
        threat.forEach(element => {
            for (let i = 0; i < JsonKeys.length; i += 1){
                Negative += element[JsonKeys[i]]
            }    
        });   
        
        const diff = Positive + Negative;

        let chartData = [{key: "V2", values: [{x: "Positive", y: Positive, color: "#222222"},
                         {x: "Negative", y: Negative, color: "#8a0c23"}, {x: "Differential", y: diff, color: "#000080"}]}]
            var chart = window.nv.models.multiBarChart()
            .reduceXTicks(false)
            .rotateLabels(0)
            .showControls(false)
            .groupSpacing(0.15)
            .stacked(false);
         
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
                 .datum(chartData)
                 .transition()
                 .duration(500)
                 .call(chart);
         
             window.nv.utils.windowResize(chart.update);
         
             return chart;
             });

    }



    render() {
        const processData = this.processData();
        const vis1 = this.createVisualization1(processData, "chart1")
        const vis2 = this.createVisualization2(processData, "chart2")
        const vis3 = this.createVisualization3(processData, "chart3")


        // const vis2 = createVisualization2()
        // const vis3 = createVisualization3()
        // const vis4 = createMonteCarlos()
        
        return(
            <div className="grid">
                <div id="chart1" className="quadrant one">
                    <div>Visualization 1</div>
                    <svg></svg>
                </div>
                <div id="chart2" className="quadrant two">
                    <div>Visualization 2</div>
                    <svg></svg>
                </div>
                <div id="chart3" className="quadrant three">
                    <div>Visualization 3</div>
                    <svg></svg>
                </div>
                <div id="chart4" className="quadrant four">
                    <div>Visualization 4</div>
                    <svg></svg>
                </div>
            </div>
        )
    }
}
export default Summation