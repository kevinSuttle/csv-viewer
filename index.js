var yo = require('yo-yo')
var tbody = require('./lib/tbody.js')

module.exports = function csvViewer (data, opts) {
  console.time('csvViewer')
  var headerRow = data[0]
  data = data.slice(1, 100)
  var asc = true
  var sortByIndex = 0
  var element = render(data)
  console.timeEnd('csvViewer')
  return element

  function render (data) {
    return yo`<table>
      ${thead(headerRow)}
      ${tbody(data)}
    </table>`
  }

  function thead (row) {
    return yo`<thead>
      <tr>
        ${row.map(function (col, idx) {
          var icon = ''
          if (idx === sortByIndex) {
            icon = (asc) ? 'fa-caret-down' : 'fa-caret-up'
            icon = yo`<i className="fa ${icon}"></i>`
          }
          return yo`<th>
            <button onclick=${function () {
              sort(idx)
            }}>${col} ${icon}</button>
          </th>`
        })}
      </tr>
    </thead>`
  }

  function sort (idx) {
    asc = !asc
    sortByIndex = idx
    data = data.sort(function (a, b) {
      var x = a[sortByIndex] || ''
      var y = b[sortByIndex] || ''
      return (asc) ? x.localeCompare(y) : y.localeCompare(x)
    })
    yo.update(element, render(data))
  }
}
