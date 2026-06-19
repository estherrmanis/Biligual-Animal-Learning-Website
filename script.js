/* =====================================================
   Animal Flashcard — script.js
   ===================================================== */

// ──────────────────────────────────────────────
// Animal Data
// soundUrl → real animal audio from Wikimedia Commons
// ──────────────────────────────────────────────
const animals = [
  {
    id: 'cat',
    name: 'Cat',
    emoji: '🐱',
    desc: 'Cats are curious, independent, and expressive pets loved worldwide.',
    img: 'https://api.dicebear.com/9.x/adventurer/svg?seed=cat&backgroundColor=fce4ec',
    soundUrl: 'https://www.google.com/logos/fnbx/animal_sounds/cat.mp3',
    color: '#fce4ec',
  },
  {
    id: 'dog',
    name: 'Dog',
    emoji: '🐶',
    desc: 'Dogs are loyal companions known as "man\'s best friend".',
    img: 'https://api.dicebear.com/9.x/adventurer/svg?seed=dog&backgroundColor=e3f2fd',
    soundUrl: 'https://www.google.com/logos/fnbx/animal_sounds/dog.mp3',
    color: '#e3f2fd',
  },
  {
    id: 'panda',
    name: 'Panda',
    emoji: '🐼',
    desc: 'Giant pandas are rare bears from China famous for eating bamboo.',
    img: 'https://api.dicebear.com/9.x/adventurer/svg?seed=panda&backgroundColor=f3e5f5',
    soundUrl: 'https://www.google.com/logos/fnbx/animal_sounds/panda.mp3',
    color: '#f3e5f5',
  },
  {
    id: 'lion',
    name: 'Lion',
    emoji: '🦁',
    desc: 'Lions are majestic big cats and the kings of the African savanna.',
    img: 'https://api.dicebear.com/9.x/adventurer/svg?seed=lion&backgroundColor=fff8e1',
    soundUrl: 'https://www.google.com/logos/fnbx/animal_sounds/lion.mp3',
    color: '#fff8e1',
  },
  {
    id: 'elephant',
    name: 'Elephant',
    emoji: '🐘',
    desc: 'Elephants are the largest land animals with remarkable memory.',
    img: 'https://api.dicebear.com/9.x/adventurer/svg?seed=elephant&backgroundColor=e8f5e9',
    soundUrl: 'https://www.google.com/logos/fnbx/animal_sounds/elephant.mp3',
    color: '#e8f5e9',
  },
  {
    id: 'rabbit',
    name: 'Rabbit',
    emoji: '🐰',
    desc: 'Rabbits are gentle animals that love to hop and nibble greens.',
    img: 'https://api.dicebear.com/9.x/adventurer/svg?seed=rabbit&backgroundColor=fce4ec',
    soundUrl: 'https://www.google.com/logos/fnbx/animal_sounds/rabbit.mp3',
    color: '#fce4ec',
  },
  {
    id: 'frog',
    name: 'Frog',
    emoji: '🐸',
    desc: 'Frogs are amphibians that leap, swim, and croak melodiously.',
    img: 'https://api.dicebear.com/9.x/adventurer/svg?seed=frog&backgroundColor=e8f5e9',
    soundUrl: 'https://www.google.com/logos/fnbx/animal_sounds/frog.mp3',
    color: '#e8f5e9',
  },
  {
    id: 'duck',
    name: 'Duck',
    emoji: '🦆',
    desc: 'Ducks waddle and swim, and are famous for their classic quack.',
    img: 'https://api.dicebear.com/9.x/adventurer/svg?seed=duck&backgroundColor=e3f2fd',
    soundUrl: 'https://www.google.com/logos/fnbx/animal_sounds/duck.mp3',
    color: '#e3f2fd',
  },
  {
    id: 'owl',
    name: 'Owl',
    emoji: '🦉',
    desc: 'Owls are nocturnal birds with silent flight and wise gaze.',
    img: 'https://api.dicebear.com/9.x/adventurer/svg?seed=owl&backgroundColor=ede7f6',
    soundUrl: 'https://www.google.com/logos/fnbx/animal_sounds/owl.mp3',
    color: '#ede7f6',
  },
  {
    id: 'penguin',
    name: 'Penguin',
    emoji: '🐧',
    desc: 'Penguins are flightless birds that thrive in icy Antarctic waters.',
    img: 'https://api.dicebear.com/9.x/adventurer/svg?seed=penguin&backgroundColor=e1f5fe',
    soundUrl: 'https://www.google.com/logos/fnbx/animal_sounds/penguin.mp3',
    color: '#e1f5fe',
  },
  {
    id: 'fox',
    name: 'Fox',
    emoji: '🦊',
    desc: 'Foxes are clever, agile mammals with a bushy tail and sharp wit.',
    img: 'https://api.dicebear.com/9.x/adventurer/svg?seed=fox&backgroundColor=fff3e0',
    soundUrl: 'https://soundbible.com/grab.php?id=1075&type=mp3',
    color: '#fff3e0',
  },
  {
    id: 'bear',
    name: 'Bear',
    emoji: '🐻',
    desc: 'Bears are powerful mammals known for their strength and honey love.',
    img: 'https://api.dicebear.com/9.x/adventurer/svg?seed=bear&backgroundColor=efebe9',
    soundUrl: 'https://soundbible.com/grab.php?id=12&type=mp3',
    color: '#efebe9',
  },
];

// ──────────────────────────────────────────────
// Audio — Real animal sounds (HTML Audio API)
// Falls back to Web Speech if audio fails to load
// ──────────────────────────────────────────────
let currentAudio = null;

function playAnimalSound(animal, onPlay) {
  // Stop any currently playing audio
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  const audio = new Audio(animal.soundUrl);
  currentAudio = audio;

  audio.volume = 1.0;

  const playPromise = audio.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        if (onPlay) onPlay(true); // success
      })
      .catch(() => {
        // Fallback: Web Speech API speaks the SOUND words (meow, woof, etc.)
        fallbackSpeak(animal.soundWords);
        if (onPlay) onPlay(false);
      });
  }

  // Also handle error event (e.g., file not found)
  audio.addEventListener('error', () => {
    fallbackSpeak(animal.soundWords);
    if (onPlay) onPlay(false);
  });
}

function fallbackSpeak(soundWords) {
  if (!window.speechSynthesis) return;
  speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(soundWords);
  utter.rate = 0.75;
  utter.pitch = 1.2;
  speechSynthesis.speak(utter);
}

// ──────────────────────────────────────────────
// Loader
// ──────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
  }, 1200);
  buildFlashcards();
  initQuiz();
});

// ──────────────────────────────────────────────
// Mode Switch
// ──────────────────────────────────────────────
function switchMode(mode) {
  const fcMode  = document.getElementById('flashcard-mode');
  const qzMode  = document.getElementById('quiz-mode');
  const btnFc   = document.getElementById('btn-flashcard');
  const btnQz   = document.getElementById('btn-quiz');

  if (mode === 'flashcard') {
    fcMode.classList.remove('hidden');
    qzMode.classList.add('hidden');
    btnFc.classList.add('active');
    btnQz.classList.remove('active');
  } else {
    fcMode.classList.add('hidden');
    qzMode.classList.remove('hidden');
    btnFc.classList.remove('active');
    btnQz.classList.add('active');
    startQuiz();
  }
}

// ──────────────────────────────────────────────
// Build Flashcards
// ──────────────────────────────────────────────
function buildFlashcards() {
  const grid = document.getElementById('card-grid');
  grid.innerHTML = '';
  animals.forEach((animal, i) => {
    const delay = i * 0.06;
    const wrapper = document.createElement('div');
    wrapper.className = 'flashcard-wrapper';
    wrapper.style.animationDelay = `${delay}s`;
    wrapper.setAttribute('aria-label', `Flashcard: ${animal.name}`);

    wrapper.innerHTML = `
      <div class="flashcard-inner">
        <!-- FRONT -->
        <div class="card-front glass-card" onclick="flipCard(this)">
          <div class="card-emoji main-emoji">${animal.emoji}</div>
          <span class="tap-hint">✨ Tap me</span>
        </div>
        <!-- BACK -->
        <div class="card-back glass-card" onclick="flipCard(this)" style="background: linear-gradient(145deg, rgba(255,255,255,0.28), ${animal.color}55);">
          <div class="card-emoji">${animal.emoji}</div>
          <div class="card-animal-name">${animal.name}</div>
          <div class="card-animal-desc">${animal.desc}</div>
          <button
            class="sound-btn"
            id="sound-${animal.id}"
            onclick="playCardSound(event, '${animal.id}')"
            aria-label="Play ${animal.name} sound"
          >
            🔊 Sound
          </button>
        </div>
      </div>
    `;

    grid.appendChild(wrapper);
  });
}

// Flip card when front is clicked
function flipCard(frontEl) {
  const wrapper = frontEl.closest('.flashcard-wrapper');
  wrapper.classList.toggle('flipped');
}

// Play card sound without flipping back
function playCardSound(event, id) {
  event.stopPropagation();
  const animal = animals.find(a => a.id === id);
  if (!animal) return;

  const btn = document.getElementById(`sound-${id}`);
  btn.classList.add('playing');
  btn.disabled = true;
  btn.textContent = '⏳ Playing...';

  playAnimalSound(animal, () => {
    setTimeout(() => {
      btn.classList.remove('playing');
      btn.disabled = false;
      btn.textContent = '🔊 Sound';
    }, 2000);
  });
}

// ──────────────────────────────────────────────
// Quiz Mode
// ──────────────────────────────────────────────
let quizQueue   = [];
let quizIndex   = 0;
let quizScore   = 0;
let quizTarget  = null;
let quizAnswered = false;
const QUIZ_ROUNDS = 10;

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function initQuiz() {
  // just a stub; startQuiz called on mode switch
}

function startQuiz() {
  quizQueue    = shuffle(animals).slice(0, QUIZ_ROUNDS);
  quizIndex    = 0;
  quizScore    = 0;
  quizAnswered = false;

  document.getElementById('quiz-end').classList.add('hidden');
  document.getElementById('quiz-card') && null;
  document.querySelector('.quiz-card').classList.remove('hidden');
  updateScoreBar();
  loadQuizRound();
}

function loadQuizRound() {
  quizAnswered = false;
  quizTarget   = quizQueue[quizIndex];

  // Options: correct + 3 random wrong
  const others = shuffle(animals.filter(a => a.id !== quizTarget.id)).slice(0, 3);
  const options = shuffle([quizTarget, ...others]);

  // Score bar
  updateScoreBar();

  // Reset feedback / next button
  const feedbackEl = document.getElementById('quiz-feedback');
  feedbackEl.className = 'quiz-feedback hidden';
  feedbackEl.textContent = '';
  document.getElementById('next-btn').classList.add('hidden');

  // Render options
  const optionsEl = document.getElementById('quiz-options');
  optionsEl.innerHTML = '';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.id = `opt-${opt.id}`;
    btn.textContent = `${opt.emoji} ${opt.name}`;
    btn.onclick = () => answerQuiz(opt.id);
    optionsEl.appendChild(btn);
  });

  // Auto play on load
  setTimeout(playQuizSound, 600);
}

function playQuizSound() {
  if (!quizTarget) return;

  const playBtn = document.getElementById('play-sound-btn');
  playBtn.classList.add('pulsing');
  playBtn.disabled = true;
  playBtn.innerHTML = '<span class="btn-icon">⏳</span> Playing...';

  playAnimalSound(quizTarget, () => {
    setTimeout(() => {
      playBtn.classList.remove('pulsing');
      playBtn.disabled = false;
      playBtn.innerHTML = '<span class="btn-icon">▶</span> Play Sound';
    }, 2500);
  });
}

function answerQuiz(selectedId) {
  if (quizAnswered) return;
  quizAnswered = true;

  const correct = selectedId === quizTarget.id;
  if (correct) quizScore++;

  // Highlight buttons
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.disabled = true;
    if (btn.id === `opt-${quizTarget.id}`) btn.classList.add('correct');
    if (btn.id === `opt-${selectedId}` && !correct) btn.classList.add('wrong');
  });

  // Feedback
  const feedbackEl = document.getElementById('quiz-feedback');
  feedbackEl.classList.remove('hidden');
  if (correct) {
    feedbackEl.textContent = '✅ Correct! Great job!';
    feedbackEl.className = 'quiz-feedback correct';
  } else {
    feedbackEl.textContent = `❌ Oops! It was ${quizTarget.emoji} ${quizTarget.name}`;
    feedbackEl.className = 'quiz-feedback wrong';
  }

  updateScoreBar();

  // Show next or finish
  const isLast = quizIndex >= QUIZ_ROUNDS - 1;
  if (isLast) {
    setTimeout(showQuizEnd, 1400);
  } else {
    document.getElementById('next-btn').classList.remove('hidden');
  }
}

function nextQuiz() {
  quizIndex++;
  if (quizIndex >= QUIZ_ROUNDS) {
    showQuizEnd();
  } else {
    loadQuizRound();
  }
}

function updateScoreBar() {
  document.getElementById('quiz-score').textContent = quizScore;
  document.getElementById('quiz-round').textContent =
    `${Math.min(quizIndex + 1, QUIZ_ROUNDS)} / ${QUIZ_ROUNDS}`;
}

function showQuizEnd() {
  document.querySelector('.quiz-card').classList.add('hidden');
  const endEl = document.getElementById('quiz-end');
  endEl.classList.remove('hidden');

  const pct = quizScore / QUIZ_ROUNDS;
  let msg, emoji;
  if (pct === 1)        { emoji = '🏆'; msg = `Perfect score! ${quizScore}/${QUIZ_ROUNDS} — You're an Animal Genius! 🐾`; }
  else if (pct >= 0.7)  { emoji = '🌟'; msg = `Great job! ${quizScore}/${QUIZ_ROUNDS} — Almost perfect! Keep it up!`;     }
  else if (pct >= 0.5)  { emoji = '👏'; msg = `Not bad! ${quizScore}/${QUIZ_ROUNDS} — Keep practising!`;                  }
  else                  { emoji = '🐣'; msg = `${quizScore}/${QUIZ_ROUNDS} — Keep learning, you'll get it next time!`;    }

  endEl.querySelector('.end-emoji').textContent = emoji;
  document.getElementById('end-message').textContent = msg;
}
