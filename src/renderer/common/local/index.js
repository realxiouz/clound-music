
class Local {
  static set(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
  }

  static get(key) {
    return JSON.parse(localStorage.getItem(key))
  }
}

// let instance

// function getInstance() {
//   return instance ? instance : new Local()
// }

export default Local