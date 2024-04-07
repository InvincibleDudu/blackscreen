export function getReadableTime(time?: Date) {
   let m
   if (!time) m = new Date()
   else m = new Date(time)
   return (
      // m.getFullYear() + "/" +
      ("0" + (m.getMonth() + 1)).slice(-2) + "-" +
      ("0" + m.getDate()).slice(-2) + " " +
      ("0" + m.getHours()).slice(-2) + ":" +
      ("0" + m.getMinutes()).slice(-2) + ":" +
      ("0" + m.getSeconds()).slice(-2))
      // + ":" + ("0" + m.getMilliseconds()).slice(-3))
}

window.addEventListener('DOMContentLoaded', () => {
   const element = document.getElementById('time')

   if (!element) return
   setInterval(() => {
      element.innerText = getReadableTime()
   }, 1000)

   // random height from 30-80%
   setInterval(() => {
      element.style.height = `${Math.floor(Math.random() * 50) + 30}%`
   }, 200000)
})


