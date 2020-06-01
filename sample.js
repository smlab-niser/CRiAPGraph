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
    options: [1999,2000,2001,2002,2003,2004,2005,2006,2007,2008],
    data1: [
     {ser1: 0.3, ser2: 4},
     {ser1: 2, ser2: 16},
     {ser1: 4, ser2: 18},
     {ser1: 2.5, ser2: 20},
     {ser1: 3.4, ser2: 14},
     {ser1: 3, ser2: 8}
   ],
    data2: [
       {ser1: 1, ser2: 7},
       {ser1: 4, ser2: 1},
       {ser1: 6, ser2: 8}
    ],
    margin: {top: 10, right: 30, bottom: 30, left: 50},
    width: null,
    height: null
  }},
  mounted(){
          this.width = 460 - this.margin.left - this.margin.right;
          this.height = 400 - this.margin.top - this.margin.bottom;
          this.createSvg();
  },
  methods:{
    updateState:function(index, evt)
    {
      this.selectedState = index;
      this.axiosCall();
    //  return this.statesJson.features[this.selectedState].id
      console.log(this.selectedState)
      console.log(this.statesJson.features[this.selectedState].id)
    //   return innerHTML = `<div class="tooltip">
    //   <span class="tooltiptext">${this.statesJson.features[this.selectedState].id}</span>
    // </div>`
    function showTooltip(evt, text) {
      console.log("i am evebt", evt);
      let tooltip = document.getElementById("tooltip");
      tooltip.innerHTML = text;
      tooltip.style.display = "block";
      tooltip.style.left = evt.pageX + 10 + 'px';
      tooltip.style.top = evt.pageY + 10 + 'px';
    };
    showTooltip(evt, 'State:' + this.statesJson.features[this.selectedState].id)
    },
     hideTooltip:function() {
      var tooltip = document.getElementById("tooltip");
      tooltip.style.display = "none";
    },
    axiosCall() {
   axios.all([axios.get('https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/states.json?token=AOYHVJ2BNIP7L3TMOE66JWK6ZKBRK'),
           axios.get(this.webURL[this.selectedState].URL),
           axios.get('https://sheet.best/api/sheets/fede5525-c729-4e4f-b042-062d54a2a702/tabs/GDP')])
  .then(axios.spread((user1,user2,user3) => (
    console.log(user1.data),
    console.log(this.selectedState),
    console.log(user2.data),
    console.log('selected',this.selected),
    this.statesJson=user1.data,
    this.cityJson=user2.data,
    this.xyz=user3.data,
    console.log('sheet=',this.xyz)
  )))
  .catch(error => {
  console.log(error)
  })
},
updateCity:function(index1, evt){
  this.selectedCity=index1
  console.log(this.selectedCity)
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
  function hideTooltip1() {
   var tooltip = document.getElementById("tooltip1");
   tooltip.style.display = "none";
 }
  if(this.statesJson.features[this.selectedState].id === this.cityJson.features[this.selectedCity].properties.NAME_1){
  showTooltip1(evt, 'District:' + this.cityJson.features[this.selectedCity].properties.NAME_2);
}
else{
  hideTooltip1();
}
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
             showTooltip2(evt, 'GDP:' + this.xyz[i][this.age]);
             console.log('index',this.selectedIndex)
    }
    break;
    // Return if no common element exist
}}},
selected: function () {
   this.selectedIndex = this.age
   console.log('this is selected Index ' + this.selectedIndex)
 },
createSvg() {
    var svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .attr("fill", "blue")
      .append("g")
      .attr("transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")");

    var x = d3.scaleLinear().range([0, this.width]);
    var xAxis = d3.axisBottom().scale(x);
    svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .attr("class", "myXaxis")

    var y = d3.scaleLinear().range([this.height, 0]);
    var yAxis = d3.axisLeft().scale(y);
    svg.append("g")
      .attr("class", "myYaxis");


    this.update(svg, x, y, xAxis, yAxis, this.data1)
  },
  updateData(data) {
    var svg = d3.select("#my_dataviz");

    var x = d3.scaleLinear().range([0, this.width]);
    var xAxis = d3.axisBottom().scale(x);

    var y = d3.scaleLinear().range([this.height, 0]);
    var yAxis = d3.axisLeft().scale(y);


    this.update(svg, x, y, xAxis, yAxis, data);
  },
  update(svg, x, y, xAxis, yAxis, data) {
    // Create the X axis:
    x.domain([0, d3.max(data, function(d) {
      return d.ser1
    })]);
    svg.selectAll(".myXaxis").transition()
      .duration(3000)
      .call(xAxis);

    // create the Y axis
    y.domain([0, d3.max(data, function(d) {
      return d.ser2
    })]);
    svg.selectAll(".myYaxis")
      .transition()
      .duration(3000)
      .call(yAxis);

    // Create a update selection: bind to the new data
    var u = svg.selectAll(".lineTest")
      .data([data], function(d) {
        return d.ser1
      });

    // Updata the line
    u
      .enter()
      .append("path")
      .attr("class", "lineTest")
      .merge(u)
      .transition()
      .duration(3000)
      .attr("d", d3.line()
        .x(function(d) {
          return x(d.ser1);
        })
        .y(function(d) {
          return y(d.ser2);
        }))
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2.5)

  }
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
          feature1
        }
      }):[]
    },
    // Interpolate from red to green in the domain 50 to 1 (our ranking)
    stateColor () {
      return d3.scaleSequential().domain([50, 1]).interpolator(d3.interpolateRdYlGn)
    },
  },
  // On creation, get the GeoJSON

  created:function(index){
        this.axiosCall();
      },
})
