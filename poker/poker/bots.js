
function playBot() {
  const actions = ['check', 'call', 'fold'];
  const action = actions[Math.floor(Math.random() * actions.length)];
  logMessage(`Bot chooses to ${action}.`);
}

