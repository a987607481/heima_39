export const timeformat = (time, spe) => {
  time = new Date()
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let day = time.getDate()
  let hours = time.getHours()
  let min = time.getMinutes()
  let sec = time.getSeconds()
  return year + spe + month + spe + day + ' ' + hours + ':' + min + ':' + sec
}
