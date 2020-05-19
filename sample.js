var app = new Vue({
  el: "#app",
  data: {
    webURL:[{
      id:0,URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/districts/Andhra%20Pradesh.json?token=AOYHVJ22Y4JWLLUXWXODLRK6ZKARK"
    },
  {
    id:22,URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/districts/rajasthan.json?token=AOYHVJ575LRB2FOYBJMVKWK6ZKAVY"
  },
  {
    id:3,URL:"https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/states.json?token=AOYHVJ2BNIP7L3TMOE66JWK6ZKBRK"
  }
],
    selectedState:0,
    cityJson: null,
    statesJson: null
  },
  methods:{
    updateDetails:function(index, evt)
    {
      this.selectedState = index
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
    }

    showTooltip(evt,this.statesJson.features[this.selectedState].id )

    },
     hideTooltip:function() {
      var tooltip = document.getElementById("tooltip");
      tooltip.style.display = "none";
    },
  },



  computed: {
    // Typical projection for showing all states scaled and positioned appropriately
    projection () {
      return d3.geoMercator().scale(900).translate([-700, 700])
    },

    // Function for converting GPS coordinates into path coordinates
    pathGenerator () {
      return d3.geoPath().projection(this.projection)
    },
    projection1 () {
      return d3.geoMercator().scale(2500).translate([-2300, 1000])
    },

    // Function for converting GPS coordinates into path coordinates
    pathGenerator1 () {
      return d3.geoPath().projection(this.projection1)
    },


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
    create(){
      console.log(this.selectedState)
    }
  },
  // On creation, get the GeoJSON
  created () {
    axios.all([axios.get('https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/states.json?token=AOYHVJ2BNIP7L3TMOE66JWK6ZKBRK'),
               axios.get(this.webURL[this.selectedState].URL)])
      .then(axios.spread((user1,user2) => (
        console.log(user1.data),
        console.log(this.selectedState),
        console.log(user2.data),
        this.statesJson=user1.data,
        this.cityJson=user2.data
//      this.statesJson = response.data,
  //  console.log(response))
)))
      .catch(error => {
      console.log(error)
    })
  },
})
