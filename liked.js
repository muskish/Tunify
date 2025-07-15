const likedTracks = JSON.parse(localStorage.getItem("tunify-liked") || "[]");
  const wrap = document.getElementById("likedContainer");
  const audioElement = new Audio();
  const masterSongName = document.getElementById("masterSongName");
  const gif = document.getElementById("gif");
  const myProgressBar = document.getElementById("myProgressBar");
let songIndex = 0;
const songs = [
  { songName: "Daylight", filePath: "1.mp3", coverPath: "covers/1.png" },
  { songName: "On & On", filePath: "2.mp3", coverPath: "covers/2.png" },
  // ... add more as needed
];
const coverImage = document.getElementById("coverImage");
const currentSongName = document.getElementById("currentSongName");


  likedTracks.forEach((file, i) => {
    const row = document.createElement("div");
    row.className = "songItem";

    // Create HTML skeleton
    row.innerHTML = `
      <img src="covers/${i + 1}.png" alt="cover">
      <span class="songName">${file.split(".")[0]}</span>
      <span class="songlistplay">
        <span class="timestamp" id="duration-${i}">Loading...</span>
        <span class="controls">
          <i id="play-${i}" class="songItemPlay fa-regular fa-circle-play"></i>
          <i data-file="${file}" class="likeBtn fa-solid fa-heart liked"></i>
        </span>
      </span>`;
    wrap.appendChild(row);

    // Load audio to get duration
    const tempAudio = new Audio(`songs/${file}`);
    tempAudio.addEventListener("loadedmetadata", () => {
      const mins = Math.floor(tempAudio.duration / 60);
      const secs = Math.floor(tempAudio.duration % 60).toString().padStart(2, '0');
      document.getElementById(`duration-${i}`).innerText = `${mins}:${secs}`;
    });
  });


masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-regular', 'fa-circle-play');
        masterPlay.classList.add('fa-regular', 'fa-circle-pause');
        gif.style.opacity = 1;
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove('fa-regular', 'fa-circle-pause');
        masterPlay.classList.add('fa-regular', 'fa-circle-play');
        gif.style.opacity = 0;
    }
})

  // Play song when play icon clicked

  document.addEventListener("click", e => {
    if (e.target.classList.contains("songItemPlay")) {
      const id = e.target.id.split("-")[1];
      const file = likedTracks[id];

      audioElement.src = `songs/${file}`;
      audioElement.currentTime = 0;
      audioElement.play();

      masterSongName.innerText = file.split(".")[0];
      gif.style.opacity = 1;

      document.querySelectorAll(".songItemPlay").forEach(i =>
        i.className = "songItemPlay fa-regular fa-circle-play"
      );
      e.target.className = "songItemPlay fa-solid fa-circle-pause";
    }
  });


  // Remove from liked list
  document.addEventListener("click", e => {
    if (e.target.classList.contains("likeBtn")) {
      const file = e.target.dataset.file;
      const updated = likedTracks.filter(f => f !== file);
      localStorage.setItem("tunify-liked", JSON.stringify(updated));
      location.reload();
    }
  });

  //throughout the music
audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})

//user change
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-regular', 'fa-circle-pause');
        element.classList.add('fa-regular', 'fa-circle-play');
    });
};



document.getElementById('next').addEventListener('click', ()=>
{
  makeAllPlays();

    if(songIndex>=5)
    {
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-regular', 'fa-circle-play');
    masterPlay.classList.add('fa-regular', 'fa-circle-pause');

    coverImage.classList.add('fade-out');
    setTimeout(() => {
    coverImage.src = songs[songIndex].coverPath;
    currentSongName.innerText = songs[songIndex].songName;
    coverImage.classList.remove('fade-out');
    }, 300);

}
)

document.getElementById('previous').addEventListener('click', ()=>{
  makeAllPlays();
  
  if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-regular', 'fa-circle-play');
    masterPlay.classList.add('fa-regular', 'fa-circle-pause');

    coverImage.classList.add('fade-out');
    setTimeout(() => {
    coverImage.src = songs[songIndex].coverPath;
    currentSongName.innerText = songs[songIndex].songName;
    coverImage.classList.remove('fade-out');
    }, 300);

})