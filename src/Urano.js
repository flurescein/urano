export default class Urano {
  constructor(data, reactions) {
    this.$data = data !== undefined ? data : {}
    this.$reactions = this.divideReactions(reactions)

    Object.keys(this.$data).forEach(key => 
      Object.defineProperty(this, key, {
        get: () => this.$data[key],
        set: newValue => {
          this.callReaction(key, newValue, key)
          this.callReaction('$all', newValue, key)

          this.$data[key] = newValue
        }
      }))
  }

  divideReactions(reactions) {
    switch (typeof reactions) {
      case 'object': return reactions
      case 'function': return { $all: reactions }
      case 'undefined': return {}
      default: throw new TypeError('"reactions" should be object, function or undefined')
    }
  }

  callReaction(reactionName, newValue, key) {
    if (this.$reactions[reactionName] !== undefined) {
      this.$reactions[reactionName].call(this, newValue, this.$data[key], key)
    }
  } 
}
