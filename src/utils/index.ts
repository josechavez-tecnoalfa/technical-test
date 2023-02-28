/* eslint-disable eqeqeq */

const getFormattedTime = (time: any) => {
  if (time && typeof time === 'number') {
    if (time < 60) return `${time.toFixed(2)} min.`
    else return `${Math.floor(time / 60)} hrs. ${Math.floor(time % 60)} min.`
  }

  return '0.00 min.'
}

const getFormattedDate = (date: any) => {
  return date ? date.toLocaleString(['es-MX', 'en-US'], { hour: 'numeric', minute: 'numeric', day: '2-digit', month: 'long', year: 'numeric' }) : ''
}

const getFormattedLocalDate = (date: any) => {
  return date ? new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000).toLocaleString(['es-MX', 'en-US'], { hour: 'numeric', minute: 'numeric', day: '2-digit', month: 'long', year: 'numeric' }) : ''
}

const toAmPm = (date: any) => {
  let hour = date.getHours() /* Returns the hour (from 0-23) */
  let minutes = date.getMinutes() /* Returns the minutes (from 0-59) */
  let result = hour
  let ext = ''

  if (hour > 12) {
    ext = 'PM'
    hour = hour - 12
    result = hour
    if (hour < 10) {
      result = '0' + hour
    } else if (hour == 12) {
      hour = '00'
      ext = 'AM'
    }
  } else if (hour < 12) {
    result = hour < 10 ? '0' + hour : hour
    ext = 'AM'
  } else if (hour == 12) {
    ext = 'PM'
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  result = result + ':' + minutes + ' ' + ext
  return result
}

const capitalizeFirst = (string: any, separator = '-') => {
  const split = string.split(separator)
  let jointWord = ''
  split.forEach((s: any) => {
    jointWord = jointWord + s.charAt(0).toUpperCase() + s.slice(1)
  })
  return jointWord
}

const capitalizeFirstLetter = (string: any) => {
  const arr = string.split(' ')
  const arr2 = arr.map((e: any) => e.charAt(0).toUpperCase() + e.slice(1).toLowerCase())

  return arr2.join(' ')
}

const numberWithCommas = (x: any) => {
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const convertTime12to24 = (time12h: any) => {
  const [time, modifier] = time12h.split(' ')

  let [hours, minutes] = time.split(':')

  if (hours === '12') {
    hours = '00'
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12
  }

  return `${hours}:${minutes}`
}

const util = {
  getFormattedTime,
  getFormattedDate,
  getFormattedLocalDate,
  toAmPm,
  capitalizeFirst,
  capitalizeFirstLetter,
  numberWithCommas,
  convertTime12to24,
}

Object.freeze(util)

export { util }
