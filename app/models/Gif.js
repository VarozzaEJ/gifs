import { AppState } from "../AppState.js";

export class Gif {
  constructor(data) {
    this.tag = data.tag;
    this.url = data.url;
    this.opened = data.opened;
    this.id = data.id;
    this.creatorId = data.creatorId;
  }
  get cardModel() {
    return `
<div class="card col-3 m-3 selectable" >
          <img  class="card-img-top" onclick="app.GifsController.openGifts('${this.id}')" src="${this.url}" alt="Title" />
          <div class="card-body">
            <p class="card-text">${this.tag}</p>
            ${this.computeDeleteButton}
          </div>
        </div>`;
  }

  get computeDeleteButton() {
    if (this.creatorId != AppState.account?.id) return "";
    return `<button onclick="app.GifsController.destroyGift('${this.id}')" class="btn btn-outline-danger">Delete Gift</button>`;
  }
}
