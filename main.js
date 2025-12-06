import './style.css'

let strudelInitialized = false;
let isPlaying = false;

const audioStatus = document.getElementById('audio-status');
const playBtn = document.getElementById('play-btn');
const stopBtn = document.getElementById('stop-btn');
const editor = document.getElementById('editor');
const logContainer = document.getElementById('log');

function addLog(message, type = 'info') {
  const entry = document.createElement('div');
  entry.className = `log-entry ${type}`;
  const timestamp = new Date().toLocaleTimeString();
  entry.textContent = `[${timestamp}] ${message}`;
  logContainer.appendChild(entry);
  logContainer.scrollTop = logContainer.scrollHeight;
}

function updateStatus(text, className) {
  audioStatus.textContent = text;
  audioStatus.className = `status ${className}`;
}

async function initializeStrudel() {
  if (strudelInitialized) {
    return;
  }

  try {
    if (typeof initStrudel === 'undefined') {
      throw new Error('Strudel library not loaded. Make sure the script tag is present.');
    }

    await initStrudel({
      prebake: () => samples('github:tidalcycles/dirt-samples'),
    });

    strudelInitialized = true;
    addLog('Strudel engine initialized successfully', 'success');
    return true;
  } catch (error) {
    addLog(`Initialization error: ${error.message}`, 'error');
    updateStatus('Initialization failed', 'stopped');
    return false;
  }
}

async function playPattern() {
  if (isPlaying) {
    addLog('Already playing. Stop first before playing again.', 'info');
    return;
  }

  const code = editor.value.trim();

  if (!code) {
    addLog('Editor is empty. Please enter some Strudel code.', 'error');
    return;
  }

  const initialized = await initializeStrudel();
  if (!initialized) {
    return;
  }

  try {
    updateStatus('Playing...', 'playing');
    playBtn.classList.add('playing-animation');

    if (typeof evaluate !== 'undefined') {
      await evaluate(code);
    } else if (typeof eval !== 'undefined') {
      eval(code);
    } else {
      throw new Error('Cannot evaluate pattern. Strudel evaluate function not available.');
    }

    isPlaying = true;
    addLog('Pattern is now playing', 'success');
    stopBtn.disabled = false;
  } catch (error) {
    addLog(`Playback error: ${error.message}`, 'error');
    updateStatus('Error', 'stopped');
    playBtn.classList.remove('playing-animation');
    isPlaying = false;
  }
}

function stopPattern() {
  if (!isPlaying) {
    addLog('Nothing is playing', 'info');
    return;
  }

  try {
    if (typeof hush !== 'undefined') {
      hush();
    } else {
      addLog('Stop function not available', 'error');
      return;
    }

    isPlaying = false;
    updateStatus('Stopped', 'stopped');
    playBtn.classList.remove('playing-animation');
    addLog('Playback stopped', 'info');
    stopBtn.disabled = true;
  } catch (error) {
    addLog(`Stop error: ${error.message}`, 'error');
  }
}

playBtn.addEventListener('click', playPattern);
stopBtn.addEventListener('click', stopPattern);

editor.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    e.preventDefault();
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    editor.value = editor.value.substring(0, start) + '  ' + editor.value.substring(end);
    editor.selectionStart = editor.selectionEnd = start + 2;
  }

  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    playPattern();
  }
});

stopBtn.disabled = true;

addLog('Le Prof Strudel Lab ready. Write your pattern and click Play!', 'info');

window.addEventListener('error', (e) => {
  addLog(`Runtime error: ${e.message}`, 'error');
});
