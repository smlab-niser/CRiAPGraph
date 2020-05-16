var app = new Vue({
  el: "#app",
  data: {
    selectedState:0,
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
    }

  },
  computed: {
    // Typical projection for showing all states scaled and positioned appropriately
    projection () {
      return d3.geoMercator().scale(900).translate([-500, 600])
    },

    // Function for converting GPS coordinates into path coordinates
    pathGenerator () {
      return d3.geoPath().projection(this.projection)
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
    // Interpolate from red to green in the domain 50 to 1
    stateColor () {
      return d3.scaleSequential().domain([50, 1]).interpolator(d3.interpolateRdYlGn)
    },
  },
  created () {
    axios.get('https://raw.githubusercontent.com/smlab-niser/CRiAPGraph/master/states.json?token=AOYHVJ5WOTPOMJCD3XLLRYS6ZFBUO')
      .then(response => (
      this.statesJson = response.data,
    console.log(response))
    )
      .catch(error => {
      console.log(error)
    })
  }
})
