import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["message"];

  reveal(event) {
    event.currentTarget.classList.add("hidden");
    this.messageTarget.classList.remove("hidden");
  }

  play(event) {
    console.log("Call Play");
    event.preventDefault();

    const nowPlaying = new CustomEvent("nowPlaying", {
      bubbles: true,
      detail: {
        track: this.element,
      },
    });

    this.element.dispatchEvent(nowPlaying);
    this.element.classList.add("playing");
  }

  stop(event) {
    console.log("Stop Button");
    event.preventDefault();

    const stopPlayingEvent = new CustomEvent("stopPlaying", {
      bubbles: true,
      detail: {
        track: this.element,
      },
    });

    this.element.dispatchEvent(stopPlayingEvent);
  }
}
