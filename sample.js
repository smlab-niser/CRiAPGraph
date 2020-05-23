
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
    statesJson: null
  }},
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

    showTooltip(evt,this.statesJson.features[this.selectedState].id )
    },
     hideTooltip:function() {
      var tooltip = document.getElementById("tooltip");
      tooltip.style.display = "none";
    },
    axiosCall() {
   axios.all([axios.get('https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/states.json?token=AOYHVJ2BNIP7L3TMOE66JWK6ZKBRK'),
           axios.get(this.webURL[this.selectedState].URL)])
  .then(axios.spread((user1,user2) => (
    console.log(user1.data),
    console.log(this.selectedState),
    console.log(user2.data),
    this.statesJson=user1.data,
    this.cityJson=user2.data
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
  };
  showTooltip1(evt,this.cityJson.features[this.selectedCity].properties.NAME_2)
}

  },


  computed: {
    // Typical projection for showing all states scaled and positioned appropriately
    projection () {
      return d3.geoMercator().scale(900).translate([-1000, 700])
    },

    // Function for converting GPS coordinates into path coordinates
    pathGenerator () {
      var path= d3.geoPath().projection(this.projection)
      return path
    },
    projection1 () {
    //  create(){
        var width=400
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
      }
})
