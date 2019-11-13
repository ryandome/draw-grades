var penguinPromise = d3.json("penguins/classData.json")

penguinPromise.then
(
function(penguins)
    {
        //imgLegend(penguins);
        
        setup(penguins);
        
        console.log(getClassQuiz(penguins).pic[0])
        
        //console.log(getQuiz(penguins));
        
        //console.log(getImage(penguins));
        
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
        return  penguin.quizes.map(getGrade)
    }

var getGrade = function(quiz)
    {
        return quiz.grade
    }

// array we want to work with going forward
var getClassQuiz = function(penguins)
    {
        return {quiz: penguins.map(getQuiz),pic: penguins.map(getImage)}
    }

var getImage = function(penguins)
    {
        return penguins.picture
    }




var screen = {width:1200,height:900}
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
        //imgLegend(penguins);
    }



var drawArray = function(penguins,xScale,yScale)
    {
        var quizes = d3.select("#quizLines")
                        .selectAll("g")
                        .data(getClassQuiz(penguins).quiz)
                        .enter()
                        .append("g")
                        .attr("fill","none")
                        .attr("stroke","#4169e1")
                        .attr("stroke-width",2)
                        //.attr("opacity",0.3);
        
        
        
        var lineGenerator = d3.line()
            .x(function(num,index){return xScale(index)})
            .y(function(num){return yScale(num)})
            .curve(d3.curveMonotoneX)
        
        
        quizes.data(getClassQuiz(penguins).quiz)
                .append("path")
                .attr("d",lineGenerator)
                .on("mouseover",mouseover)
                .on("mouseout",mouseout)
                //.on("mouseover",imgLegend)
        
        
    }

var mouseover = function(d,i)
    {
        d3.select(this)
            .style("stroke","black")
            //.attr("opacity",1)
            .attr("stroke-width",5)
        
        
        /*var penImage = d3.select("div")
                        .selectAll("img")
                        .data(getClassQuiz(penguins))
                        .enter()
                        .append("img")
                        .attr("src",function(penguin)
                            {
                                return "penguin/"+ penguin.pic;
                            })*/
        
        
        /* d3.select("svg")
            .append("g")
            .attr("id","imgPenguin")
            .attr("transform","translate("+(screen.width-margins.right)+","+ (margins.top)+")")
    
        var imgP = d3.select("#imgPenguin")
                    .selectAll("image")
                    .data(getClassQuiz(penguins).pic)
                    .enter()
                    .append("image").attr("width",10).attr("height",10)
                    .attr("transform",function(penguin,i)
                            {
                                return "translate(0, "+(i*14)+")";
                            })
                    .attr("xlink:href",function(p)
                        {
                        return "penguins/"+p.pic;
                        })
                    .attr("width",50).attr("height",50) */
            
    }

var mouseout = function(d,i)
    {
        d3.select(this).style("stroke","#4169e1")
        //.style("opacity",0.3)
        .attr("stroke-width",2)
    }


/*var imgLegend = function(penguins)
    {
        d3.select("svg")
            .append("g")
            .attr("id","imgPenguin")
            .attr("transform","translate("+(screen.width-margins.right)+","+ (margins.top)+")")
    
        var imgP = d3.selectAll("#imgPenguin")
                    .selectAll("image")
                    .data(getClassQuiz(penguins).pic)
                    .enter()
                    .append("image").attr("width",10).attr("height",10)
                    .attr("transform",function(penguin,i)
                            {
                                return "translate(0, "+(i*14)+")";
                            })
                    .attr("xlink:href",function(p)
                        {
                        return "penguins/"+p.picture;
                        })
                    .attr("width",50).attr("height",50)   
    }
*/



/*
   var penImage = d3.select("div")
                        .selectAll("img")
                        .data(d)
                        .enter()
                        .append("img")
                        .attr("src",function(penguin)
                            {
                                return penguin.picture;
                            })
*/
















