// Game State
let targetScore = 0;
let playerScore = 0;

// Load statistics from localStorage, or default to 0 if playing for the first time
let wins = parseInt(localStorage.getItem('crystal_wins')) || 0;
let losses = parseInt(localStorage.getItem('crystal_losses')) || 0;
let currentStreak = parseInt(localStorage.getItem('crystal_current_streak')) || 0;
let bestStreak = parseInt(localStorage.getItem('crystal_best_streak')) || 0;

const crystals = {
  blue: { val: 0, element: $('#blue') },
  red: { val: 0, element: $('#red') },
  green: { val: 0, element: $('#green') },
  yellow: { val: 0, element: $('#yellow') }
};

// Sound framework (Standard Web Audio API)
function playSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (type === 'click') {
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start(); osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'win') {
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.setValueAtTime(900, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      osc.start(); osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'lose') {
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(150, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      osc.start(); osc.stop(ctx.currentTime + 0.3);
    }
  } catch(e) { /* Audio contexts blocked or unsupported */ }
}

function initGame() {
  playerScore = 0;
  targetScore = Math.floor(Math.random() * (120 - 19 + 1)) + 19; // 19 to 120
  
  // Assign random values to crystals (1 to 12)
  for (let color in crystals) {
    crystals[color].val = Math.floor(Math.random() * 12) + 1;
    crystals[color].element.removeClass('press');
  }

  // Sync state data directly onto layout text elements
  $('#gameNumber').text(targetScore).removeClass('pulse-win shake-lose');
  $('#playerScore').text(playerScore).removeClass('text-win');
  $('#wins').text(wins);
  $('#losses').text(losses);
  
  // Update Streak UI values dynamically if elements exist
  if ($('#bestStreak').length) $('#bestStreak').text(bestStreak);
  if ($('#currentStreak').length) $('#currentStreak').text(currentStreak);
}

function saveStats() {
  localStorage.setItem('crystal_wins', wins);
  localStorage.setItem('crystal_losses', losses);
  localStorage.setItem('crystal_current_streak', currentStreak);
  localStorage.setItem('crystal_best_streak', bestStreak);
}

function checkGameState() {
  if (playerScore === targetScore) {
    wins++;
    currentStreak++;
    
    // Check if the current streak beats our historical record
    if (currentStreak > bestStreak) {
      bestStreak = currentStreak;
    }
    
    saveStats();
    playSound('win');
    $('#gameNumber').addClass('pulse-win');
    $('#playerScore').addClass('text-win');
    setTimeout(initGame, 1200);
    
  } else if (playerScore > targetScore) {
    losses++;
    currentStreak = 0; // Reset your operational consecutive run on a bust
    
    saveStats();
    playSound('lose');
    $('#gameNumber').addClass('shake-lose');
    setTimeout(initGame, 1200);
  }
}

// Event Listeners
Object.keys(crystals).forEach(color => {
  crystals[color].element.on('click', function() {
    if (playerScore >= targetScore) return; // Prevent clicks during layout transitions
    
    playSound('click');
    playerScore += crystals[color].val;
    $('#playerScore').text(playerScore);
    
    $(this).addClass('press');
    setTimeout(() => $(this).removeClass('press'), 100);

    checkGameState();
  });
});

// Start the game loop on load
$(document).ready(initGame);
