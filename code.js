var penguinPromise = d3.json("penguins/classData.json")

penguinPromise.then
(
function(penguins)
    {
        setup(penguins);
        
        console.log(getClassQuiz(penguins));
        
        console.log("works",penguins);
    },
function(errs)
    {
        console.log("broken",errs);
    }
)

// get the quiz grades for every penguin
var getQuiz = function(penguin)
    {
        return penguin.quizes.map(getGrade)
    }

var getGrade = function(quiz)
    {
        return quiz.grade
    }

// array we want to work with going forward
var getClassQuiz = function(penguins)
    {
        return penguins.map(getQuiz)
    }

var screen = {width:800,height:500}
var margins = {top:10,right:50,bottom:50,left:50}

var setup = function(penguins)
    {
        d3.select("svg")
            .attr("width",screen.width)
            .attr("height",screen.height)
            .append("g")
            .attr("id","quizLines")
            .attr("transform", "translate("+margins.left+","+margins.top+")");
        
        var width = screen.width - margins.left - margins.right;
        var height = screen.height - margins.top - margins.bottom;
        
        
        var xScale = d3.scaleLinear()
                        .domain([0,40])
                        .range([0,width])
        
        var yScale = d3.scaleLinear()
                        .domain([0,10])
                        .range([height,0])
        
        var xAxis = d3.axisBottom(xScale)
        var yAxis = d3.axisLeft(yScale)
        
        d3.select("svg")
            .append("g")
            .classed("axis",true);
        
        d3.select(".axis")
            .append("g")
            .attr("id","xAxis")
            .attr("transform","translate("+margins.left+","+(margins.top+height) +")")
            .call(xAxis)
        
        d3.select(".axis")
            .append("g")
            .attr("id","yAxis")
            .attr("transform", "translate(25,"+margins.top+")")
            .call(yAxis)  
        
        
        drawArray(penguins,xScale,yScale);
    }



var drawArray = function(penguins,xScale,yScale)
    {
        var quizes = d3.select("#quizLines")
                        .selectAll("g")
                        .data(getClassQuiz(penguins))
                        .enter()
                        .append("g")
                        .attr("fill","none")
                        .attr("stroke","black")
                        .attr("stroke-width",3)
        
        
        
        var lineGenerator = d3.line()
            .x(function(num,index){return xScale(index)})
            .y(function(num){return yScale(num)})
            .curve(d3.curveMonotoneX)
        
        
        quizes.data(getClassQuiz(penguins))
                .append("path")
                .attr("d",lineGenerator)
        
        
    }

























