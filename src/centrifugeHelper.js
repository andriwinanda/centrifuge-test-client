import Centrifuge from 'centrifuge'

let centrifuge 

const callbacks = {
  publish: (message) => {
    // Emit description of message format
    centrifuge.emit('publish', message)
  },
  join: (message) => {
    // See below description of join message format
    console.log('join', message)
  },
  leave: (message) => {
    // See below description of leave message format
    console.log('leave', message)
  },
  subscribe: (context) => {
    // See below description of subscribe callback context format
    console.log('subscribe', context)
  },
  error: (context) => {
    // See below description of error error callback context format
    // console.log('error', context.message)
    centrifuge.emit('error', context)

  },
  unsubscribe: (context) => {
    // See below description of unsubscribe event callback context format
    console.log('unsubscribe', context)
  }
}

export function initCentrifuge(url, token) {
  const CENTRIFUGE_TOKEN = token
  const CENTRIFUGE_URL = url
  centrifuge = new Centrifuge(CENTRIFUGE_URL)

  centrifuge.setToken(CENTRIFUGE_TOKEN)
  centrifuge.connect()
 
  return centrifuge
}

export function subscribe(channel) {
  centrifuge.subscribe(channel, callbacks)
  // for (const i in channel) {
  //   centrifuge.subscribe(`positions:${channel[i].channel}`, callbacks)
  // }
}
