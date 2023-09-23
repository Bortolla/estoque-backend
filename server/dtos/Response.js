exports.ResponseDTO = class {
    constructor(type, status, message, data=null) {
      this.type    = type
      this.status  = status
      this.message = message
      this.data    = data
    }

    sendResponse (res) {
      if (this.type == "Success") {
        res.status(this.status).json({
            status: this.status,
            msg:    this.message,
            data:   this.data
        })
      } 
      else {
        res.status(this.status).json({
          status: this.status,
          msg:    this.message,
          erro:   this.message
        }) 
      }
    }

}