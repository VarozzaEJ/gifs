export class Gif {
  constructor(data) {
    this.tag = data.tag
    this.url = data.url
    this.opened = data.opened
    this.id = data.id
  }
  get cardModel() {
    return `
<div class="card col-3 m-3 selectable" onclick= "app.GifsController.openGifts('${this.id}')">
          <img class="card-img-top" src="${this.url}" alt="Title" />
          <div class="card-body">
            <p class="card-text">${this.tag}</p>
          </div>
        </div>`
  }
}