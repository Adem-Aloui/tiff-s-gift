const SECRET_PASSWORD = "TIFF2011";


// =====================================================
// SCREEN NAVIGATION
// =====================================================

function showScreen(screenId) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const target = document.getElementById(screenId);

    if (target) {
        target.classList.add("active");
    }

}


// =====================================================
// PASSWORD
// =====================================================

function checkPassword() {

    const input = document.getElementById("passwordInput");
    const message = document.getElementById("passwordMessage");

    if (!input || !message) return;

    const password = input.value.trim();

    if (password.toUpperCase() === SECRET_PASSWORD) {

        message.textContent = "I knew you'd remember. ❤️";
        message.style.color = "#D6B878";

        setTimeout(() => {
            showScreen("openingScreen");
        }, 500);

    } else {

        message.textContent =
            "Hmm... that's not very Tiff of you. 😂";

        message.style.color = "#a81735";

        input.value = "";

        input.focus();
    }
}


// =====================================================
// OPENING
// =====================================================

function showPlayfulIntro() {

    showScreen("playfulScreen");

}


// =====================================================
// PLAYFUL TIFF
// =====================================================

function playfulAnswer() {

    const response =
        document.getElementById("playfulResponse");

    const continueButton =
        document.getElementById("continueFromPlayful");

    if (!response || !continueButton) return;

    response.textContent =
        "I KNEW IT. 😂 You really can't resist clicking things.";

    continueButton.classList.add("show");

}


// =====================================================
// TIFF WORLD
// =====================================================

function showTiffWorld() {

    showScreen("tiffWorldScreen");

}


// =====================================================
// PHOTOS
// =====================================================

let currentPhoto = 0;

const tiffPhotos = [

    {
        file: "images/tiff1.jpg",
        caption:
            "Before I knew you, there was already a whole story behind the person you became."
    },

    {
        file: "images/tiff2.jpg",
        caption:
            "Apparently, the chaos started early. 😂"
    },

    {
        file: "images/tiff3.jpg",
        caption:
            "And then came one of the little souls that became part of your world."
    },

    {
        file: "images/tiff4.webp",
        caption:
            "Okay… I think your dog might actually be your favorite person. 😂"
    },

    {
        file: "images/tiff5.jpg",
        caption:
            "And then there are those eyes."
    },

    {
        file: "images/tiff6.png",
        caption:
            "Seriously, Tiff… you were not supposed to make them this pretty. 😂"
    },

    {
        file: "images/tiff7.png",
        caption:
            "And somehow, that little girl became the person I know today."
    }

];


function showPhotos() {

    currentPhoto = 0;

    showScreen("photosScreen");

    setTimeout(() => {
        showPhoto(currentPhoto);
    }, 300);

}


function showPhoto(index) {

    const container =
        document.getElementById("photoContainer");

    const caption =
        document.getElementById("photoCaption");

    const counter =
        document.getElementById("currentMemory");

    const nextButton =
        document.getElementById("nextPhotoButton");

    if (!container || !caption) return;

    const photo = tiffPhotos[index];

    if (!photo) return;


    /* hide current memory */

    container.classList.add("memory-changing");

    caption.classList.remove("caption-visible");


    setTimeout(() => {

        /* update image */

        container.innerHTML = `
            <img
                src="${photo.file}"
                alt="A memory of Tiff"
            >
        `;


        /* update counter */

        if (counter) {

            counter.textContent =
                String(index + 1).padStart(2, "0");

        }


        /* update caption */

        caption.textContent =
            photo.caption;


        /* last button */

        if (nextButton) {

            if (index === tiffPhotos.length - 1) {

                nextButton.textContent =
                    "CONTINUE TO YOUR SOUNDTRACK →";

                nextButton.classList.add(
                    "last-memory"
                );

            } else {

                nextButton.textContent =
                    "NEXT MEMORY →";

                nextButton.classList.remove(
                    "last-memory"
                );

            }

        }


        /* bring memory back */

        container.classList.remove(
            "memory-changing"
        );


        /* reveal caption slightly later */

        setTimeout(() => {

            caption.classList.add(
                "caption-visible"
            );

        }, 250);

    }, 450);

}


function nextPhoto() {

    currentPhoto++;

    if (currentPhoto >= tiffPhotos.length) {

        showPlaylist();

        return;
    }

    showPhoto(currentPhoto);

}
// =====================================================
// PLAYLIST
// =====================================================

const tiffSongs = [

    {
        title: "Amor",
        artist: "Alta Elegancia",
        file: "music/song1.mp3"
    },

    {
        title: "Vixen",
        artist: "Miguel",
        file: "music/song2.mp3"
    },

    {
        title: "About You",
        artist: "The 1975",
        file: "music/song3.mp3"
    },

    {
        title: "The Promise",
        artist: "When In Rome",
        file: "music/song4.mp3"
    }

];


function showPlaylist() {

    showScreen("playlistScreen");

    createPlaylist();

}


function createPlaylist() {

    const playlist =
        document.getElementById("playlist");

    if (!playlist) return;

    playlist.innerHTML = "";

    tiffSongs.forEach((song, index) => {

        const songElement =
            document.createElement("div");

        songElement.className = "song";

        songElement.innerHTML = `
            <button
                class="song-play"
                onclick="playSong(${index})"
            >
                ▶
            </button>

            <div class="song-number">
                ${String(index + 1).padStart(2, "0")}
            </div>

            <div class="song-info">

                <div class="song-name">
                    ${song.title}
                </div>

                <div class="song-artist">
                    ${song.artist}
                </div>

            </div>
        `;

        playlist.appendChild(songElement);

    });

}


function playSong(index) {
    const audio = document.getElementById("audioPlayer");
    const status = document.getElementById("musicStatus");

    if (!audio) return;

    const song = tiffSongs[index];

    if (!song) return;

    const rows = document.querySelectorAll(".song");

    if (audio.dataset.currentSong === String(index)) {
        if (audio.paused) {
            audio.play().catch(() => {
                if (status) {
                    status.textContent =
                        "Tap play on the music player to listen.";
                }
            });
        } else {
            audio.pause();
        }
        return;
    }

    audio.dataset.currentSong = String(index);
    audio.src = song.file;

    rows.forEach(row => row.classList.remove("playing"));

    if (rows[index]) {
        rows[index].classList.add("playing");
    }

    if (status) {
        status.textContent = `Now playing · ${song.title} ♡`;
    }

    document.title = `${song.title} — My Tiff`;

    audio.play().catch(() => {
        if (status) {
            status.textContent =
                "Tap play to start " + song.title + ".";
        }
    });
}


// =====================================================
// SUPPORT
// =====================================================

function showSupport() {

    showScreen("supportScreen");

}


// =====================================================
// FRIENDSHIP
// =====================================================

function showFriendship() {

    showScreen("friendshipScreen");

}


// =====================================================
// LAST PAGE
// =====================================================

function showLastPage() {

    showScreen("lastPageScreen");

}


// =====================================================
// FINAL UNLOCK
// =====================================================

function unlockFinal() {

    showScreen("unlockScreen");

}


// =====================================================
// FINAL MESSAGE
// =====================================================

function openFinalDoor() {

    const unlockScreen =
        document.getElementById("unlockScreen");

    if (!unlockScreen) return;

    unlockScreen.classList.add("door-opening");

    setTimeout(() => {

        unlockScreen.classList.remove("door-opening");

        showScreen("finalScreen");

    }, 1100);

}

// =====================================================
// FINAL SURPRISE
// =====================================================

function showFinalSurprise() {

    showScreen("surpriseScreen");

}


// =====================================================
// ENTER KEY FOR PASSWORD
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const passwordInput =
            document.getElementById("passwordInput");

        if (!passwordInput) return;

        passwordInput.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {
                    checkPassword();
                }

            }
        );

    }
);




document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("audioPlayer");
    const status = document.getElementById("musicStatus");

    if (!audio) return;

    audio.addEventListener("play", () => {
        if (status && audio.dataset.currentSong !== undefined) {
            const song = tiffSongs[
                Number(audio.dataset.currentSong)
            ];

            if (song) {
                status.textContent = `Now playing · ${song.title} ♡`;
            }
        }
    });

    audio.addEventListener("pause", () => {
        if (status && !audio.ended) {
            status.textContent = "Paused for a moment. ♡";
        }
    });

    audio.addEventListener("ended", () => {
        const rows = document.querySelectorAll(".song");
        rows.forEach(row => row.classList.remove("playing"));

        if (status) {
            status.textContent = "A little song for you. ♡";
        }
    });
});





function revealSupportReminder() {
    const message = document.getElementById("supportExtraMessage");
    const revealButton = document.getElementById("supportRevealButton");
    const continueButton = document.getElementById("supportContinueButton");

    if (!message || !revealButton || !continueButton) return;

    message.classList.remove("hidden");

    requestAnimationFrame(() => {
        message.classList.add("revealed");
    });

    revealButton.textContent = "REMEMBER THIS, TIFF ♡";
    revealButton.disabled = true;
    revealButton.style.opacity = "0.65";

    setTimeout(() => {
        continueButton.classList.add("visible");
    }, 700);
}




const friendshipMessages = [
    "Because somehow, even the most random conversations with you become good memories. 😂",
    "Because I appreciate being able to talk to you and be myself around you.",
    "Because you have a way of understanding things that not everyone does.",
    "Because you're you, Tiff. You don't have to be anyone else to matter."
];

const revealedFriendshipWords = new Set();

function revealFriendshipWord(index) {
    const reveal = document.getElementById("friendshipReveal");
    const ending = document.getElementById("friendshipEnding");
    const buttons = document.querySelectorAll(".friendship-word");

    if (!reveal || !ending || !buttons[index]) return;

    reveal.textContent = friendshipMessages[index];
    reveal.style.animation = "none";
    void reveal.offsetWidth;
    reveal.style.animation = "memoryCaptionIn 0.5s ease forwards";

    buttons[index].classList.add("selected");
    revealedFriendshipWords.add(index);

    if (revealedFriendshipWords.size === friendshipMessages.length) {
        ending.classList.remove("hidden");
    }
}



function revealSecretSong() {
    const player = document.getElementById("secretSongPlayer");
    const message = document.getElementById("secretSongMessage");
    const button = document.querySelector(
        "#surpriseScreen .secret-song-box button"
    );

    if (!player || !message || !button) return;

    player.classList.remove("hidden");

    message.textContent =
        "Because some songs say what ordinary words can't. ♡";

    button.textContent = "YOUR SONG IS HERE ♡";
    button.disabled = true;
    button.style.opacity = "0.65";
}

function restartExperience() {
    const audio = document.getElementById("audioPlayer");
    const secretAudio = document.getElementById("secretAudio");

    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }

    if (secretAudio) {
        secretAudio.pause();
        secretAudio.currentTime = 0;
    }

    showScreen("passwordScreen");
}
