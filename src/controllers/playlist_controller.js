import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["track", "player", "playlist", "message", "revealButton"];
  connect() {
    this.currentlyPlaying = null;
    this.element.addEventListener(
      "nowPlaying",
      this.nowPlaying.bind(this),
      false
    );
    this.shuffle();
    const audio = this.playerTarget;
    audio.addEventListener(
      "seeked",
      function () {
        audio.play();
      },
      true
    );
    audio.onended = this.nextTrack.bind(this);
    audio.addEventListener("timeupdate", this.captureDuration.bind(this), true);
  }

  captureDuration(event) {
    this.currentlyPlaying.dataset.duration = this.playerTarget.currentTime;
  }

  shuffle() {
    const player = this.playerTarget;
    const playlist = this.playlistTarget;
    const random_order = [];
    for (let i = 1; i <= this.trackTargets.length; i++) random_order.push(i);
    let currentIndex = random_order.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = random_order[currentIndex];
      random_order[currentIndex] = random_order[randomIndex];
      random_order[randomIndex] = temporaryValue;
    }

    this.messageTargets.forEach((message) => {
      //message.classList.add("hidden");
    });

    this.revealButtonTargets.forEach((button) => {
      button.classList.remove("hidden");
    });

    this.trackTargets.forEach((track, index) => {
      track.classList.remove("playing");
      track.setAttribute("style", `order: ${random_order[index] + 1}`);
    });

    this.currentlyPlaying = playlist.children[random_order.indexOf(1)];
    this.currentlyPlaying.classList.add("playing");
    player.src = this.currentlyPlaying.dataset.src;
  }

  reveal() {
    this.messageTargets.forEach((message) => {
      message.classList.remove("hidden");
    });

    this.revealButtonTargets.forEach((button) => {
      button.classList.add("hidden");
    });
  }

  nextTrack() {
    const currentPlayingOrderId = parseInt(
      this.currentlyPlaying.dataset.order || 1
    );
    const nextPlayingOrderId =
      this.trackTargets.length === currentPlayingOrderId
        ? 1
        : currentPlayingOrderId + 1;

    const nextTrack = this.trackTargets.find(
      (track) => parseInt(track.dataset.order) === nextPlayingOrderId
    );
    this.currentlyPlaying = nextTrack;
    this.nowPlaying();

    nextTrack.classList.add("playing");
    const audio = this.playerTarget;
    audio.src = nextTrack.dataset.src;
    audio.play();
  }

  nowPlaying(event) {
    console.log("Called Clear Now Playing");
    this.trackTargets.forEach((track) => {
      track.classList.remove("playing");
    });

    if (event && event.detail) {
      const audio = this.playerTarget;
      this.currentlyPlaying = event.detail.track;
      audio.src = event.detail.track.dataset.src;
      event.detail.track.classList.add("playing");
      audio.currentTime = parseFloat(
        this.currentlyPlaying.dataset.duration || "0.0"
      );
      audio.play();
    }
  }
}
