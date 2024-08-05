export class Loading {
  constructor(options) {
    this.options = options || {
      loadingStart() {},
      loadingEnd() {}
    }
  }

  #ajaxIds = [] // ajax请求id集合

  start(ajaxId) {
    if (this.#ajaxIds.length < 1) {
      this.options.loadingStart()
    }

    if (!this.#ajaxIds.includes(ajaxId)) {
      this.#ajaxIds.push(ajaxId)
    }
  }

  end(ajaxId) {
    const idIndex = this.#ajaxIds.indexOf(ajaxId)
    if (idIndex > -1) {
      this.#ajaxIds.splice(idIndex, 1)
    }

    if (this.#ajaxIds.length < 1) {
      this.options.loadingEnd()
    }
  }

  hasSameRequest(ajaxId) {
    return this.#ajaxIds.includes(ajaxId)
  }
}
