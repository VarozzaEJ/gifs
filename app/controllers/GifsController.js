import { AppState } from "../AppState.js";
import { gifService } from "../services/GifService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

export class GifsController {
  constructor() {
    AppState.on("user", this.getGifs);
    AppState.on("gifts", this.drawGifs);
  }
  async getGifs() {
    try {
      await gifService.getGifs();
    } catch (error) {
      Pop.error(error);
    }
  }
  drawGifs() {
    const gifs = AppState.gifts;
    let innerHTML = "";
    gifs.forEach((gif) => (innerHTML += gif.cardModel));
    setHTML("cards", innerHTML);
  }
  async openGifts(tag) {
    try {
      await gifService.openGifts(tag);
    } catch (error) {
      Pop.error(error);
    }
  }
  async makeGift() {
    try {
      event.preventDefault();
      const form = event.target;
      let makingGift = getFormData(form);
      await gifService.makeGift(makingGift);
    } catch (error) {
      Pop.error(error);
    }
  }

  async destroyGift(giftId) {
    try {
      const wantsToDelete = await Pop.confirm(
        "Are you sure you want to delete your gift?"
      );
      if (!wantsToDelete) return;
      await gifService.destroyGift(giftId);
    } catch (error) {
      Pop.error(error);
    }
  }
}
