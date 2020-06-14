
var app = new Vue({
  el: "#app",
  data(){
    return {
    webURL:[{URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/districts/Andhra%20Pradesh.json"},
            {URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/districts/Arunachal%20Pradesh.json"},
            {URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/districts/Assam.json"},
            {URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/districts/Bihar.json"},
            {URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/districts/Chhattisgarh.json"},
            {URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/districts/Delhi.json"},
            {URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/districts/Goa.json"},
            {URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/districts/Gujarat.json"},
            {URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/districts/Haryana.json"},
            {URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/districts/Himachal%20Pradesh.json"},
            {URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/districts/Jammu%20%26%20Kashmir.json"},
            {URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/districts/Jharkhand.json"},
            {URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/districts/Karnataka.json"},
            {URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/districts/Kerala.json"},
            {URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/districts/Madhya%20Pradesh.json"},
            {URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/districts/Maharashtra.json"},
            {URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/districts/Manipur.json"},
            {URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/districts/Meghalaya.json"},
            {URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/districts/Mizoram.json"},
            {URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/districts/Nagaland.json"},
            {URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/districts/Orissa.json"},
            {URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/districts/Punjab.json"},
            {URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/districts/Rajasthan.json"},
            {URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/districts/Sikkim.json"},
            {URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/districts/Tamil%20Nadu.json"},
            {URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/districts/Tripura.json"},
            {URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/districts/Uttar%20Pradesh.json"},
            {URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/districts/Uttaranchal.json"},
            {URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/districts/West%20Bengal.json"},
    ],
    selectedState:0,
    selectedCity:0,
    cityJson: null,
    statesJson: null,
    xyz: null,
    age: '',
    selectedIndex: '',
    set1:null,
    set2:null,
    stateGDP: null,
    options: ["1999-00","2000-01","2001-02","2002-03","2003-04","2004-05","2005-06","2006-07","2007-08","2008-09"],
    stateId:null,
    IndexId:null,
    x:'1999-00',
    startTime: "1999-00",
endTime: "2008-09",
    opened:[],
    data1: [{
        ser1: 0.3,
        ser2: 4
      },
      {
        ser1: 2,
        ser2: 16
      },
      {
        ser1: 3,
        ser2: 8
      }
    ],
    data2: [{
        ser1: 1,
        ser2: 7
      },
      {
        ser1: 4,
        ser2: 1
      },
      {
        ser1: 6,
        ser2: 8
      }
    ],
    margin: {top: 50, right: 50, bottom: 50, left: 50},
    xAxis:null,
    yAxis:null,
    max:null
  }},
  methods:{
    updateData(data) {

          var width = 460 - this.margin.left - this.margin.right;
          var height = 400 - this.margin.top - this.margin.bottom;


          var xScale = d3.scaleLinear()
            .domain([0, Math.max.apply(Math, data.map(x => x.ser1))])
            .range([0, width]);

          var yScale = d3.scaleLinear()
            .domain([0, Math.max.apply(Math, data.map(x => x.ser2))])
            .range([height, 0]);


          // Select the section we want to apply our changes to


          var line = d3.line()
            .x(function(d) {
              return xScale(d.ser1);
            }) // set the x values for the line generator
            .y(function(d) {
              return yScale(d.ser2);
            }) // set the y values for the line generator

          let svg = d3.select("#graph").transition().duration(750);

          // Make the changes
          svg.select(".line") // change the line
            .duration(750)
            .attr("d", line(data));

          svg.select(".x.axis") // change the x axis
            .duration(750)
            .call(d3.axisBottom(xScale));

          svg.select(".y.axis") // change the y axis
            .duration(750)
            .call(d3.axisLeft(yScale));

          d3.select("svg").selectAll(".dot")
            .data(data)
            .transition()
            .duration(750)
            .attr("cx", function(d) {
              return xScale(d.ser1)
            })
            .attr("cy", function(d) {
              return yScale(d.ser2)
            })

        },
        createSvg(data) {
          var width = 460 - this.margin.left - this.margin.right;
          var height = 400 - this.margin.top - this.margin.bottom;

          var xScale = d3.scaleLinear()
            .domain([0, Math.max.apply(Math, data.map(x => x.ser1))])
            .range([0, width]);

          var yScale = d3.scaleLinear()
            .domain([0, Math.max.apply(Math, data.map(x => x.ser2))])
            .range([height, 0]);

          // 7. d3's line generator
          var line = d3.line()
            .x(function(d) {
              return xScale(d.ser1);
            }) // set the x values for the line generator
            .y(function(d) {
              return yScale(d.ser2);
            }) // set the y values for the line generator

          // 1. Add the SVG to the page and employ #2
          var svg = d3.select("#graph").append("svg")
            .attr("width", width + this.margin.left + this.margin.right)
            .attr("height", height + this.margin.top + this.margin.bottom)
            .attr("fill", "blue")
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");


          // 3. Call the x axis in a group tag
          this.xAxis = svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

          this.yAxis = svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale));

          svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);

          svg.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", function(d, i) {
              return xScale(d.ser1)
            })
            .attr("cy", function(d) {
              return yScale(d.ser2)
            })
            .attr("r", 5);
        },
    toggle:function(Id) {
      this.stateId=Id
      for(let i=0; i<this.xyz.length; i++){
        if (this.stateId===this.xyz[i].Id){
        for(let j = i; this.xyz[j].Id===this.stateId; j++){
          this.IndexId=this.xyz[j].District
      }
      break;
    }
    }
    const index = this.opened.indexOf(Id);
    if (index > -1) {
      this.opened.splice(index, 1)
    } else {
      this.opened.push(Id)
    }
    },
    mouseoverState:function(index2){
      this.selectedState=index2;
      this.axiosCall();
      console.log(this.selectedState)
      this.set1=index2;
      console.log(this.set1);
        let tooltip = document.getElementById("tooltip");
        let tooltip3 = document.getElementById("tooltip3");
        tooltip2.style.display = "none";
        tooltip1.style.display = "none";
        tooltip.innerHTML = this.stateGDP[this.set1].State;
        tooltip3.innerHTML = this.stateGDP[this.set1][this.age];
        tooltip.style.display = "block";
        tooltip3.style.display = "block";
    },
    mouseoverDistrict:function(Index){
      this.selectedCity=Index;
      this.axiosCall();
      this.set2 = Index;
      console.log(this.set2)
      for(let i=0; i<this.xyz.length; i++){
        if(this.set2===this.xyz[i].IndexId){
      let tooltip1 = document.getElementById("tooltip1");
      let tooltip2 = document.getElementById("tooltip2");
      tooltip1.innerHTML = this.xyz[i].District;
      tooltip1.style.display = "block";
      tooltip2.innerHTML = this.xyz[i][this.age];
      tooltip2.style.display = "block";

    }
    }
    },
    getRows:function(id) {
     return this.xyz.filter(district => district.Id === id);
   },
    updateState:function(index, evt)
    {
      console.log('key',Object.keys(this.stateGDP[this.selectedState]).filter(key => isNaN(key) || (key>="1999-00" && key<="2008-09")))
      this.selectedState = index;
      this.axiosCall();
    //  return this.statesJson.features[this.selectedState].id
      console.log(this.selectedState)
      console.log(this.statesJson.features[this.selectedState].id)
    //   return innerHTML = `<div class="tooltip">
    //   <span class="tooltiptext">${this.statesJson.features[this.selectedState].id}</span>
    // </div>`
    function showTooltip(evt, text, text1) {
      console.log("i am evebt", evt);
      let tooltip = document.getElementById("tooltip");
      var tooltip1 = document.getElementById("tooltip1");
      var tooltip2 = document.getElementById("tooltip2");
      tooltip1.style.display = "none";
      tooltip2.style.display = "none";
      tooltip.innerHTML = text;
      tooltip3.innerHTML = text1;
      tooltip3.style.display = "block";
      tooltip.style.display = "block";
      tooltip.style.left = evt.pageX + 10 + 'px';
      tooltip.style.top = evt.pageY + 10 + 'px';
    };
    showTooltip(evt, this.statesJson.features[this.selectedState].id, this.stateGDP[this.selectedState][this.age])
  },
     hideTooltip:function() {
      var tooltip = document.getElementById("tooltip1");
      tooltip.style.display = "none";
    },
    axiosCall() {
   axios.all([axios.get('https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/states.json?token=AOYHVJ2BNIP7L3TMOE66JWK6ZKBRK'),
           axios.get(this.webURL[this.selectedState].URL),
           axios.get('https://sheet.best/api/sheets/2e8f7b95-eb85-496a-a661-2bba64615f67/tabs/GDP'),
           axios.get('https://sheet.best/api/sheets/2e8f7b95-eb85-496a-a661-2bba64615f67/tabs/GDP of Indian States 1980-2020')])
  .then(axios.spread((user1,user2,user3,user4) => (
    console.log(user1.data),
    console.log(this.selectedState),
    console.log(user2.data),
    console.log('selected',this.selected),
    console.log('user4',this.stateGDP),
    this.statesJson=user1.data,
    this.cityJson=user2.data,
    this.xyz=user3.data,
    this.stateGDP=user4.data
  )))
  .catch(error => {
  console.log(error)
  })
},
updateCity:function(index1, evt){
  this.selectedCity=index1
  console.log(this.selectedCity)
  console.log('sheet=',this.compute)
  console.log('city=',this.cityJson.features[this.selectedCity].properties.NAME_2)
  function showTooltip1(evt, text) {
    console.log("i am evebt", evt);
    console.log('text',text)
    let tooltip = document.getElementById("tooltip1");
    tooltip.innerHTML = text;
    tooltip.style.display = "block";
    tooltip.style.left = evt.pageX + 10 + 'px';
    tooltip.style.top = evt.pageY + 10 + 'px';
  }
showTooltip1(evt, this.cityJson.features[this.selectedCity].properties.NAME_2)
},
findCommonElement(index1,evt) {
  function showTooltip2(evt, text) {
    let tooltip = document.getElementById("tooltip2");
    tooltip.innerHTML = text;
    tooltip.style.display = "block";
    tooltip.style.left = evt.pageX + 30 + 'px';
    tooltip.style.top = evt.pageY + 30 + 'px';
  };
    // Loop for array1
  for(let i = 0; i < this.xyz.length; i++) {
        // Loop for array2
       for(let j = 0; j < this.cityJson.features.length; j++) {

            // Compare the element of each and
            // every element from both of the
            // arrays

           if(this.xyz[i].District === this.cityJson.features[this.selectedCity].properties.NAME_2) {
             showTooltip2(evt, this.xyz[i][this.age]);
    }
    break;
    // Return if no common element exist
}}},
selected: function (event) {
   let tooltip3 = document.getElementById("tooltip3");
   console.log(this.stateGDP[1][this.age])
   tooltip3.innerHTML = this.stateGDP[0][this.age];
   tooltip.style.display = "block";
   this.selectedIndex = this.age
   console.log('this is selected Index ' + this.selectedIndex)
 },

 isDate(key) {
     return /\d{4}\-\d{2}/.test(key);
 },
 filterData(stateData, startDate, endDate) {
     return stateData.map(state => {
         let entries = Object.entries(state).filter(([key, val]) => this.isDate(key) && (key >= startDate && key <= endDate ) && Boolean(Number(val)))
         return Object.fromEntries(entries);
     });
 },

 getStateData() {
     return {
         stateData: this.stateGDP,
         newStateData: this.filterData(this.stateGDP, this.startTime, this.endTime)
     }
 },
 getDistrictData(){
   return {
     DistrictData: this.xyz,
     newDistrictData: this.filterData(this.xyz, this.startTime, this.endTime)
   }
 },
 getMax(stateData) {
    let values = Object.values(stateData);
    return [...values.sort((a,b)=>a-b)].pop();
}
},
   mounted() {
     this.createSvg(this.data1);
     setTimeout(() => {
       this.max = 25000
     }, 2000)
   },
  computed: {
    // Typical projection for showing all states scaled and positioned appropriately
    projection () {
      return d3.geoMercator().scale(900).translate([-1030, 700])
    },

    // Function for converting GPS coordinates into path coordinates
    pathGenerator () {
      var path= d3.geoPath().projection(this.projection)
      return path
    },
    projection1 () {
        var width=380
        var height=300
        var scale=80
        var center=d3.geoCentroid(this.cityJson)
        var bounds  = d3.geoBounds(this.cityJson);
        console.log(bounds)
  var hscale  = scale*width  / (bounds[1][0] - bounds[0][0]);
  var vscale  = scale*height / (bounds[1][1] - bounds[0][1]);
  var scale   = (hscale < vscale) ? hscale : vscale;
  var offset  = [width - (bounds[0][0] + bounds[1][0])/2,
                    height - (bounds[0][1] + bounds[1][1])/2];
  var projection2=d3.geoMercator().center(center).scale(scale).translate(offset);
  return d3.geoPath().projection(projection2)
  },
  /*    return d3.geoMercator().scale(1000).translate([-800, 600])
    },

    // Function for converting GPS coordinates into path coordinates
    pathGenerator1 () {
      return d3.geoPath().projection(this.projection1)
    },*/


    // Combine the states GeoJSON with a rank-based gradient
    stateData () {
      return this.statesJson ? this.statesJson.features.map(feature => {
        //let state = this.happiestStates.find(state => state.state === feature.id)
        return {
          feature,
          color: this.stateColor(feature.rank)
        }
      }):[]
    },
    cityData(){
      return this.cityJson ? this.cityJson.features.map(feature1 =>{
        return {
          feature1,
          color: this.cityColor(this.compute)
        }
      }):[]
    },
    // Interpolate from red to green in the domain 50 to 1 (our ranking)
    stateColor () {
      return d3.scaleSequential().domain([50, 1]).interpolator(d3.interpolateRdYlGn)
    },
    cityColor(){
      return d3.scaleSequential().domain([50000, 1]).interpolator(d3.interpolateRdYlGn)
    },
    compute(){
      return this.xyz ? this.xyz.map(lk => {
        let c=lk['1999']
        //let state = this.happiestStates.find(state => state.state === feature.id)
        return {
          c
        }
      }):[]
    }
  /*  compute(){
      let a=[];
      for(k = 0; k < this.xyz.length; k++){
      a=this.xyz[k]['1999']
    }
    return a
  }*/
  },
  // On creation, get the GeoJSON

  created:function(index){
        this.axiosCall();
      },
})
