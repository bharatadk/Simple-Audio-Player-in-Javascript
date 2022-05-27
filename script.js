const audio = document.querySelector('#audio') ;
const playPauseBtn = document.querySelector('#play-pause');
const nextBtn = document.querySelector('#next');
const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('#previous');
const playList = document.querySelector('.playlist');
const title  = document.querySelector('#song_title');
const cd = document.querySelector('.cd');

let songArray = [];
let songTitle = '';
let songIndex = 0;
let isPlaying = false;

function loadAudio(){
	audio.src = songArray[songIndex];

	let songListItems = playList.getElementsByTagName('li');
	songTitle = songListItems[songIndex].getAttribute('data-name');
	title.innerText = songTitle;

	//making active songName bold
	for(let i =0; i< songListItems.length;i++){
		songListItems[i].classList.remove('active');
	}

		playList.getElementsByTagName('li')[songIndex].classList.add('active')
}


function loadAllSongs(){
	let songs =  playList.getElementsByTagName('li');
	for(let i=0;i<songs.length;i++){
		songArray.push(songs[i].getAttribute('data-src'));		
	}
		loadAudio();
}

//load all songs and PUSH to songArray from LIST(li)
loadAllSongs();


function playAudio(){
	audio.play();
	playPauseBtn.querySelector('i.fa-solid').classList.remove('fa-play');
	playPauseBtn.querySelector('i.fa-solid').classList.add('fa-pause');
	isPlaying  = true;
	cd.classList.add('cd-animation');

}

function pauseAudio(){
	audio.pause();
	playPauseBtn.querySelector('i.fa-solid').classList.remove('fa-pause');
	playPauseBtn.querySelector('i.fa-solid').classList.add('fa-play');
	isPlaying  = false;
	cd.classList.remove('cd-animation');	
}

function nextSong(){
	songIndex++;
	if (songIndex>songArray.length -1){
		songIndex=0;
	}
	loadAudio();
	playAudio();
}

function previousSong(){
	songIndex--;
	if(songIndex<0){
		songIndex=0;
	}
	loadAudio();
	playAudio();
}
playPauseBtn.addEventListener('click', ()=>{
	if(isPlaying){
		pauseAudio();
	}
	else{
		playAudio();
	}
},false)

nextBtn.addEventListener('click',()=>{
	nextSong();
}, false)

prevBtn.addEventListener('click',()=>{
	previousSong();
},false)

slider.addEventListener('input',()=>{
	audio.volume = slider.value/100;
} ,false)

playList.addEventListener('click',(e)=>{
	value = e.target;
	songIndex = value.getAttribute('data-index');;
	loadAudio()
	playAudio();
	console.log(songIndex);
},false)