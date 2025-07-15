console.log("Welcome music lovers!");

let songIndex =0;
let audioElement= new Audio('songs/1.mp3');
let masterPlay= document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif= document.getElementById('gif');
let masterSongName= document.getElementById('masterSongName');
let songItems= Array.from(document.getElementsByClassName('songItem'));

let coverImage = document.getElementById("coverImage");
let currentSongName = document.getElementById("currentSongName");
let showLyricsBtn = document.getElementById("showLyrics");

showLyricsBtn.addEventListener("click", () => {
    alert("Lyrics will be added soon!");
});


let songs = [
    {songName: "gabriawll, QKReign - Missing Life", filePath: "songs/1.mp3", coverPath: "covers/1.png"},
    {songName: "LXNGVX - Royalty Funk ", filePath: "songs/2.mp3", coverPath: "covers/2.png"},
    {songName: "Around Us (ft. Pasha & Carlos Ukareda)", filePath: "songs/3.mp3", coverPath: "covers/3.png"},
    {songName: "Tamlin - Alive [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.png"},
    {songName: "youth® - a little break", filePath: "songs/5.mp3", coverPath: "covers/5.png"}
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText =songs[i].songName;
})

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


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>
{
    element.addEventListener('click',(e)=>
    {
        makeAllPlays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-regular', 'fa-circle-play');
        e.target.classList.add('fa-regular', 'fa-circle-pause');
        audioElement.src=`songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-regular', 'fa-circle-play');
        masterPlay.classList.add('fa-regular', 'fa-circle-pause');

        coverImage.classList.add('fade-out');
        setTimeout(() => {
        coverImage.src = songs[songIndex].coverPath;
        currentSongName.innerText = songs[songIndex].songName;
        coverImage.classList.remove('fade-out');
        }, 300);

    })
})

/* ── Liked songs persistence ───────────────────────────── */
const LS_KEY = "tunify-liked";
function loadLiked()  { return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); }
function saveLiked(a) { localStorage.setItem(LS_KEY, JSON.stringify(a)); }

let liked = loadLiked();            // array of filenames e.g. ["1.mp3","4.mp3"]

/* Grab all heart icons */
document.querySelectorAll(".likeBtn").forEach(btn => {
  const file = btn.dataset.file;

  // Paint initial state if already liked
  if (liked.includes(file)) {
    btn.classList.add("liked");
    btn.classList.replace("fa-regular", "fa-solid");
  }

  // Toggle on click
  btn.addEventListener("click", () => {
    const idx = liked.indexOf(file);

    if (idx === -1) {               // add to liked
      liked.push(file);
      btn.classList.add("liked");
      btn.classList.replace("fa-regular", "fa-solid");
    } else {                        // remove from liked
      liked.splice(idx, 1);
      btn.classList.remove("liked");
      btn.classList.replace("fa-solid", "fa-regular");
    }
    saveLiked(liked);
  });
});


document.getElementById('next').addEventListener('click', ()=>
{
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