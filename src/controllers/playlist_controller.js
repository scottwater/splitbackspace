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
    for (var i = playlist.children.length; i >= 0; i--) {
      playlist.appendChild(playlist.children[(Math.random() * i) | 0]);
    }

    this.messageTargets.forEach((message) => {
      message.classList.add("hidden");
    });

    this.revealButtonTargets.forEach((button) => {
      button.classList.remove("hidden");
    });

    this.trackTargets.forEach((track) => {
      track.classList.remove("playing");
    });

    this.currentlyPlaying = playlist.children[0];
    const mp3_url = this.currentlyPlaying.dataset.src;
    this.currentlyPlaying.classList.add("playing");
    player.src = mp3_url;
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
    console.log("NEW NEXT TRACK CALLED!");
    const currentPlayingElement = document.querySelector("li.playing");
    // sibling or parents first child
    const nextTrack =
      currentPlayingElement.nextElementSibling ||
      currentPlayingElement.parentNode.children[0];

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
