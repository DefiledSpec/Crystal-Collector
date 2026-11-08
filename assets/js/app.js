// Game State
let targetScore = 0;
let playerScore = 0;
let wins = 0;
let losses = 0;

const crystals = {
  blue: { val: 0, element: $('#blue') },
  red: { val: 0, element: $('#red') },
  green: { val: 0, element: $('#green') },
  yellow: { val: 0, element: $('#yellow') }
};

// Optional: Sound framework (uses standard Web Audio API - no external assets needed!)
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
  } catch(e) { /* Audio context blocked or unsupported */ }
}

function initGame() {
  playerScore = 0;
  targetScore = Math.floor(Math.random() * (120 - 19 + 1)) + 19; // 19 to 120
  
  // Assign random values to crystals (1 to 12)
  for (let color in crystals) {
    crystals[color].val = Math.floor(Math.random() * 12) + 1;
    // Remove any previous endgame animation classes
    crystals[color].element.removeClass('bounce press');
  }

  // Update UI Elements
  $('#gameNumber').text(targetScore).removeClass('pulse-win shake-lose');
  $('#playerScore').text(playerScore).removeClass('text-win');
  $('#wins').text(wins);
  $('#losses').text(losses);
}

function checkGameState() {
  if (playerScore === targetScore) {
    wins++;
    playSound('win');
    $('#gameNumber').addClass('pulse-win');
    $('#playerScore').addClass('text-win');
    setTimeout(initGame, 1200); // 1.2s delay so player feels the win
  } else if (playerScore > targetScore) {
    losses++;
    playSound('lose');
    $('#gameNumber').addClass('shake-lose');
    setTimeout(initGame, 1200); // 1.2s delay to process loss
  }
}

// Event Listeners
Object.keys(crystals).forEach(color => {
  crystals[color].element.on('click', function() {
    if (playerScore >= targetScore) return; // Prevent clicking during reset animation
    
    playSound('click');
    playerScore += crystals[color].val;
    $('#playerScore').text(playerScore);
    
    // Quick CSS micro-interaction trigger
    $(this).addClass('press');
    setTimeout(() => $(this).removeClass('press'), 100);

    checkGameState();
  });
});

// Start the game loop on load
$(document).ready(initGame);
