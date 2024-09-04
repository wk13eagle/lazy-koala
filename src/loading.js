/**
 * Lazy Loading
 * 抽象Loading逻辑, 不具体实现loading
 */
export class Loading {
  constructor(options) {
    this.options = options || {
      loadingStart() { console.log('loading start') },
      loadingEnd() { console.log('loading end') }
    }
  }

  #ajaxIds = [] // ajax请求id集合

  start(ajaxId) {
    if (this.#ajaxIds.length < 1) {
      this.options.loadingStart()
    }

    if (ajaxId && !this.#ajaxIds.includes(ajaxId)) {
      this.#ajaxIds.push(ajaxId)
    }
  }

  end(ajaxId) {
    if (ajaxId) {
      const idIndex = this.#ajaxIds.indexOf(ajaxId)
      if (idIndex > -1) {
        this.#ajaxIds.splice(idIndex, 1)
      }
    }

    if (this.#ajaxIds.length < 1) {
      this.options.loadingEnd()
    }
  }

  hasSameRequest(ajaxId) {
    if (ajaxId) {
      return this.#ajaxIds.includes(ajaxId)
    }
    return false
  }
}
