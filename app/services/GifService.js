import { AppState } from "../AppState.js";
import { Gif } from "../models/Gif.js";
import { Pop } from "../utils/Pop.js";
import { api } from "./AxiosService.js";

class GifService {
  async makeGift(gifData) {
    console.log(gifData);
    const gift = await api.post("/api/gifts/", gifData);
    const newGift = new Gif(gift.data);
    AppState.gifts.push(newGift);
  }
  async openGifts(tag) {
    Pop.toast("You Opened a Gift!!");
    const index = AppState.gifts.findIndex((gift) => gift.id == tag);
    const foundIndex = AppState.gifts[index];
    const giftData = { opened: !foundIndex.opened };
    const response = await api.put(`/api/gifts/${foundIndex.id}`, giftData);
    console.log(response.data);
    const openedGift = new Gif(response.data);
    AppState.gifts.splice(index, 1, openedGift);
  }
  async getGifs() {
    const response = await api.get("/api/gifts");
    const newGifts = response.data.map((gifData) => new Gif(gifData));
    AppState.gifts = newGifts;

    console.log(AppState.gifts);
  }

  async destroyGift(giftId) {
    await api.delete(`api/gifts/${giftId}`);
    const giftIndex = AppState.gifts.findIndex((gift) => gift.id == giftId);
    if (giftIndex == -1) Pop.error("You messed up find index dawg.");
    AppState.gifts.splice(giftIndex, 1);
  }
}
export const gifService = new GifService();
