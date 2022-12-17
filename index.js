const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
const dayOfWeek = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.']
async function main() {
  var events = await (await (fetch('https://eagletime.fly.dev/calendar'))).json();
  console.log(events)
  var appendedDates = []
  for (i = 0; i < events.length; i++) {
    if (!appendedDates.includes(events[i].date)) {
      let date = new Date(events[i].date + ' ')
      let formattedDate = dayOfWeek[date.getDay()] + ' ' + months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
      console.log(formattedDate)
      var container = document.createElement('div')
      container.classList.add('section')
      container.style.marginBottom = '20px'
      var dateText = document.createElement('h4')
      dateText.innerText = formattedDate
      dateText.style.margin = '0px'
      container.appendChild(dateText)
      appendedDates.push(events[i].date)
    }
    if (events[i].cal_mode == 1) {
      console.log('Block rot:' + events[i].name)
      var blockRotation = document.createElement('p')
      blockRotation.innerText = events[i].name
      container.appendChild(blockRotation)
    }
    else {
      if (events[i].description.replace(/\s/, '') != '') {
        console.log(events[i].name + ';;;;;;;;;;' + events[i].description)
        var collapserButton = document.createElement('button')
        collapserButton.classList.add('collapser')
        collapserButton.innerText = events[i].name
        container.appendChild(collapserButton)
        var collapseDiv = document.createElement('div')
        collapseDiv.classList.add('collapsible')
        var collapseText = document.createElement('p')
        collapseText.innerText = events[i].description
        collapseDiv.appendChild(collapseText)
        container.appendChild(collapseDiv)
      }
      else {
        console.log(events[i].name)
        var eventName = document.createElement('p')
        eventName.innerText = events[i].name
        container.appendChild(eventName)
      }
    }
    document.getElementById('pane3').appendChild(container)
  }
  document.querySelector('#pane3 > p').remove()
}
main()

var coll = document.getElementsByClassName("collapser");
var i;
for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

var scr = document.getElementsByClassName("screenlink");
var i;
for (i = 0; i < scr.length; i++) {
    scr[i].addEventListener("click", function() {
    var content = this.nextElementSibling;
    content.style.opacity = 1
    content.style.pointerEvents = 'all'
  });
}
var scr2 = document.getElementsByClassName("screen");
var i;
for (i = 0; i < scr2.length; i++) {
    scr2[i].addEventListener("click", function() {
        if (document.querySelector('.modal:hover') == null) {
            this.style.opacity = ''
            this.style.pointerEvents = ''
        }
  });
}
var scr3 = document.getElementsByClassName("modalclose");
var i;
for (i = 0; i < scr3.length; i++) {
    scr3[i].addEventListener("click", function() {
        var content = this.parentElement.parentElement.parentElement;
        content.style.opacity = ''
        content.style.pointerEvents = ''
  });
}

document.getElementById('home').addEventListener('click', () => {
  document.getElementById('home').classList.add("current")
  document.getElementById('messages').classList.remove("current")
  document.getElementById('calendar').classList.remove("current")

  document.getElementById('pane2').classList.add("panehidden")
  document.getElementById('pane3').classList.add("panehidden")
  setTimeout(() => {
      document.getElementById('pane1').classList.remove("panehidden")
  }, 100)
})
document.getElementById('messages').addEventListener('click', () => {
  document.getElementById('home').classList.remove("current")
  document.getElementById('messages').classList.add("current")
  document.getElementById('calendar').classList.remove("current")
  
  document.getElementById('pane1').classList.add("panehidden")
  document.getElementById('pane3').classList.add("panehidden")
  setTimeout(() => {
      document.getElementById('pane2').classList.remove("panehidden")
  }, 100)
})
document.getElementById('calendar').addEventListener('click', () => {
  document.getElementById('home').classList.remove("current")
  document.getElementById('messages').classList.remove("current")
  document.getElementById('calendar').classList.add("current")
  
  document.getElementById('pane1').classList.add("panehidden")
  document.getElementById('pane2').classList.add("panehidden")
  setTimeout(() => {
      document.getElementById('pane3').classList.remove("panehidden")
  }, 100)
})