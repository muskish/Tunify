const audio = document.getElementById("audioPlayer");
const rows = document.querySelectorAll(".playlist-row:not(.header)");
const nowPlaying = document.getElementById("songName");

let currentIndex = -1;

rows.forEach((row, index) => {
  const playBtn = row.querySelector(".play-btn");

  playBtn.addEventListener("click", () => {
    const file = row.getAttribute("data-file");
    const name = row.getAttribute("data-name");

    // If the same song is playing, toggle pause/play
    if (currentIndex === index) {
      if (!audio.paused) {
        audio.pause();
        playBtn.innerHTML = `<i class="fas fa-play"></i>`;
        playBtn.classList.remove("playing");
      } else {
        audio.play();
        playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
        playBtn.classList.add("playing");
      }
    } else {
      // Reset previous buttons
      document.querySelectorAll(".play-btn").forEach(btn => {
        btn.innerHTML = `<i class="fas fa-play"></i>`;
        btn.classList.remove("playing");
      });

      audio.src = `songs/${file}`;
      audio.play();
      playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
      playBtn.classList.add("playing");
      nowPlaying.innerText = name;
      currentIndex = index;
    }
  });
});
