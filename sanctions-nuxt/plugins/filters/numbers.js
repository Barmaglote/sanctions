import Vue from 'vue'

export default () => {
  Vue.filter('shortNumber', function (value) {
     if (!value || value === 0) return '0'

      if (value <= 1000) { return value; }
      if (value > 1000 && value <= 1000000) { return `${(value/1000).toFixed(1)}K`; }
      if (value > 1000000 && value <= 1000000000) { return `${(value/1000000).toFixed(1)}M`; }
      if (value > 1000000000) { return `${(value/1000).toFixed(1)}B`; }
  })
}
