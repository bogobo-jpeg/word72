+++ b/game.js
@@ -1910,8 +1910,14 @@
 // Move enemy along path
 function moveEnemy(enemy, deltaTime) {
     const enemyPath = enemy.path;
-    if (enemy.pathIndex >= enemyPath.length - 1) { // Check if at the end of the path
-        lives -= 1;
-        updateLivesDisplay();
+    if (enemy.pathIndex >= enemyPath.length - 1) {
+        if (gameRunning) {
+            lives -= 1;
+            updateLivesDisplay();
+            if (lives <= 0) {
+                gameOver();
+            }
+        }
         removeEnemyFromGame(enemy, false);
         return;
     }
@@ -1071,6 +1071,28 @@
     // Handle custom AI tower visuals vs. standard visuals
     if (baseStats.visuals && baseStats.visuals.components) {
         tower.classList.add('tower');
+        
+        const instanceBaseStats = {};
+        for (const key in baseStats) {
+            const value = baseStats[key];
+            if (Array.isArray(value) && value.length === 2 && typeof value[0] === 'number' && typeof value[1] === 'number') {
+                const [min, max] = value;
+                let randomValue = Math.random() * (max - min) + min;
+                // Round to 2 decimal places for stats like fireRate
+                if (key === 'fireRate' || key === 'damage' || key === 'range') {
+                    randomValue = parseFloat(randomValue.toFixed(2));
+                }
+                instanceBaseStats[key] = randomValue;
+            } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
+                // Deep copy for nested objects like auraBuffs and visuals
+                instanceBaseStats[key] = JSON.parse(JSON.stringify(value));
+            } else {
+                instanceBaseStats[key] = value;
+            }
+        }
+        baseStats = instanceBaseStats; // From now on, use the instance's unique stats
+
+
         let turretElement = null;
         baseStats.visuals.components.forEach(comp => {
             const componentDiv = document.createElement('div');
@@ -1111,6 +1133,7 @@
         lastFired: 0,
         lastKillTime: 0,
         incomeTimer: 0, // For income generation
+        baseStats: baseStats,
         upgradeLevels: [0, 0, 0],
         targetEnemy: null,
         upgradeCosts: [0, 0, 0], // Initialize with 0, will be set in upgrade menu
@@ -1220,7 +1243,7 @@
 
 // Get current stats for a tower with upgrades applied
 function getTowerCurrentStats(tower, externalBuffs = {}) {
-    const baseStats = TOWER_STATS[tower.type];
+    const baseStats = tower.baseStats || TOWER_STATS[tower.type];
     const stats = { ...baseStats, specialAbilities: {} }; // Start with base and init special abilities
 
     // Ensure core stats have a default value to prevent errors
@@ -2824,11 +2847,11 @@
 
 Follow this JSON schema strictly:
 {
-  "type": "string (lowercase, one word, e.g., 'sunstone')",
+  "type": "string (unique lowercase, one word, e.g., 'sunstone')",
   "name": "string (The display name, e.g., 'Sunstone')",
   "cost": "number (base cost, between 100 and 800)",
   "visuals": {
     "components": [
       {
         "shape": "string ('circle' or 'rectangle')",
         "color": "string (hex color)",
@@ -2840,10 +2863,10 @@
     ]
   },
   "baseStats": {
-    "damage": "number",
-    "fireRate": "number (attacks per second)",
-    "range": "number (grid units, 2-8)",
+    "damage": "number or [min, max] array",
+    "fireRate": "number or [min, max] array (attacks per second)",
+    "range": "number or [min, max] array (grid units, 2-8)",
     "projectileSpeed": "number (optional, for projectile towers, 5-25)",
     "projectileCount": "number (optional, for shotgun-style towers, e.g., 4)",
     "spreadAngle": "number (optional, for shotgun-style towers, in degrees, e.g., 30)",
@@ -2900,11 +2923,13 @@
 Available "specialAbility" keywords for tier 4 & 5 upgrades: dualShot, tripleShot, criticalStrike, deadlyStrike, piercing, explosiveRounds, shockwave, flashFreeze, corrosiveAcid, plagueSpread, overload, multibeam, deathStar. The Tier 5 ability should be a clear evolution of the Tier 4 ability (e.g., 'dualShot' becomes 'tripleShot').
 
 Visuals Guide:
-- The \`visuals.components\` array lets you build a custom tower model. Be creative!
+- Use multiple components in the 'visuals.components' array to create more complex and interesting tower models. You can layer shapes of different sizes and colors. Be creative!
 - You MUST designate exactly one component with \`"isTurret": true\` for towers that attack. For non-attacking towers like villages, no turret is needed.
 
 Balancing Guidelines:
  - A new tower should not be strictly better than an existing tower of a similar cost. It should have trade-offs.
+- **Randomized Stats**: For stats like damage, fireRate, or range, you can provide a range as an array (e.g., \`"damage": [3, 5]\`). When the tower is placed, a random value from this range will be chosen. This adds unpredictability. Use this for towers that fit a 'wild' or 'chaotic' theme. The range should be reasonable; a range of [1, 10] for damage is likely too wide and unbalanced.
  - **Shotgun Towers**: Use \`projectileCount\` and \`spreadAngle\`. To balance many projectiles, each projectile should have low damage. Total damage (\`damage\` * \`projectileCount\`) should be reasonable for its cost and fire rate.
  - **Aura/Buff Towers (Villages)**: These towers are very powerful. They should have \`"nonAttacking": true\` and no direct damage stats. Their cost must be high. Start with a small \`auraRange\` and weak \`auraBuffs\`, and make the upgrades expensive. Example: A "War Drum" tower might cost 500, have an \`auraRange\` of 3, and \`auraBuffs: { "fireRateBonus": 10 }\`.
  - **Income Towers**: An income tower costing 400 should generate 1-2 money per second (\`incomeRate\`).
  - Upgrade costs for each path should increase for each level and be significant. Total upgrade cost for a path should be more than the base cost of the tower.
  - A tower with a special effect ('frost', 'poison', 'stun' etc.) needs the corresponding baseStats. A regular projectile tower just needs damage, fireRate, range, and projectileSpeed.
  - Create a tower that is fun and unique, but FAIR. It should fill a niche not currently filled, or be an interesting alternative to an existing tower.
 
+async function addCustomTower(towerData) {
+    // It's added here without an ID. The ID is associated after saving.
+    if (!addCustomTowerToGame(towerData)) {
+        return;
+    }
+
+    if (currentUser) {
+        aiStatus.textContent = `Tower "${towerData.name}" created! Saving to database...`;
+        try {
+            const newRecord = await room.collection('custom_towers_v2').create({
+                tower_data: towerData,
+            });
+            // Now that it's saved, associate the DB ID with the in-memory tower object
+            if (TOWER_STATS[towerData.type]) {
+                TOWER_STATS[towerData.type].dbRecordId = newRecord.id;
+            }
+            aiStatus.textContent = `Tower "${towerData.name}" created and saved!`;
+            updateCustomTowerList();
+        } catch (e) {
+            console.error("Error saving custom tower:", e);
+            aiStatus.textContent = `Tower created, but failed to save.`;
+            aiStatus.style.color = '#F44336';
+        }
+    } else {
+        aiStatus.textContent = `Tower "${towerData.name}" created! (Log in to save)`;
+    }
+
+    // UI feedback and cleanup
+    setTimeout(() => {
+        aiCreatorMenu.style.display = 'none';
+        aiStatus.textContent = "";
+        aiTowerName.value = "";
+        aiTowerDescription.value = "";
+    }, 2500);
+}
+
// Update projectiles movement
function updateProjectiles(deltaTime) {
    for (let i = projectiles.length - 1; i >= 0; i--) {
        const p = projectiles[i];
 
        if (!p.element) {
            projectiles.splice(i, 1);
            continue;
        }
 
-        // Move projectile in a straight line
        const moveDistance = p.speed * 50 * deltaTime;
-        p.x += Math.cos(p.angle) * moveDistance;
-        p.y += Math.sin(p.angle) * moveDistance;
-        p.element.style.transform = `translate(-50%, -50%)`;
-        p.element.style.left = `${p.x}px`;
-        p.element.style.top = `${p.y}px`;
+        const stepSize = 5; // Check for collision every 5 pixels of movement
+        const numSteps = Math.max(1, Math.ceil(moveDistance / stepSize));
+        const stepX = (Math.cos(p.angle) * moveDistance) / numSteps;
+        const stepY = (Math.sin(p.angle) * moveDistance) / numSteps;
 
        let consumed = false;
 
-        // Check for collision with any enemy
-        for (const enemy of enemies) {
-            if (!enemy.element || enemy.health <= 0 || p.ignoredTargets.includes(enemy)) {
-                continue;
+        for (let j = 0; j < numSteps; j++) {
+            p.x += stepX;
+            p.y += stepY;
+
+            // Check for collision with any enemy
+            for (const enemy of enemies) {
+                if (!enemy.element || enemy.health <= 0 || p.ignoredTargets.includes(enemy)) {
+                    continue;
+                }
+
+                const enemyX = enemy.position.x + enemy.size / 2;
+                const enemyY = enemy.position.y + enemy.size / 2;
+                const projDistance = Math.sqrt(Math.pow(p.x - enemyX, 2) + Math.pow(p.y - enemyY, 2));
+
+                if (projDistance < (enemy.size / 2) + 4) { // 4 is half projectile width
+                    handleProjectileHit(p, enemy);
+
+                    if (p.pierceCount > 0) {
+                        p.pierceCount--;
+                        p.ignoredTargets.push(enemy);
+                        // Projectile continues, but we should not hit the same enemy again in this frame's steps
+                    } else {
+                        consumed = true;
+                        break; // Projectile is consumed, stop checking enemies
+                    }
+                }
             }
 
-            const enemyX = enemy.position.x + enemy.size / 2;
-            const enemyY = enemy.position.y + enemy.size / 2;
-            const projDistance = Math.sqrt(Math.pow(p.x - enemyX, 2) + Math.pow(p.y - enemyY, 2));
-
-            if (projDistance < (enemy.size / 2) + 4) { // 4 is half projectile width
-                handleProjectileHit(p, enemy);
-                
-                if (p.pierceCount > 0) {
-                    p.pierceCount--;
-                    p.ignoredTargets.push(enemy);
-                    // Projectile continues
-                } else {
-                    consumed = true;
-                    break; // Projectile is consumed, stop checking enemies
-                }
+            if (consumed) {
+                break; // Stop stepping if projectile is consumed
             }
         }
+
+        // Update projectile visual position after all steps
+        p.element.style.transform = `translate(-50%, -50%)`;
+        p.element.style.left = `${p.x}px`;
+        p.element.style.top = `${p.y}px`;
+
        // Remove if consumed or off-screen
        const offScreen = p.x < -20 || p.x > gridWidth * cellSize + 20 || p.y < -20 || p.y > gridHeight * cellSize + 20;
        if (consumed || offScreen) {
            p.element.remove();
            projectiles.splice(i, 1);
        }
    }
}
@@ -3004,6 +3027,27 @@
function placeTower(x, y, type, cost) {
    money -= cost;
    updateMoneyDisplay();
 
    const cell = grid[y][x].element;
    const tower = document.createElement('div');
-    const baseStats = TOWER_STATS[type];
+    let baseStats = JSON.parse(JSON.stringify(TOWER_STATS[type]));
+
+    // Handle randomized stats on placement
+    const instanceBaseStats = {};
+    for (const key in baseStats) {
+        const value = baseStats[key];
+        if (Array.isArray(value) && value.length === 2 && typeof value[0] === 'number' && typeof value[1] === 'number') {
+            const [min, max] = value;
+            let randomValue = Math.random() * (max - min) + min;
+            // Round to 2 decimal places for stats like fireRate
+            if (key === 'fireRate' || key === 'damage' || key === 'range') {
+                randomValue = parseFloat(randomValue.toFixed(2));
+            }
+            instanceBaseStats[key] = randomValue;
+        } else {
+            instanceBaseStats[key] = value;
+        }
+    }
+    baseStats = instanceBaseStats; // From now on, use the instance's unique stats
 
    // Handle custom AI tower visuals vs. standard visuals
    if (baseStats.visuals && baseStats.visuals.components) {
@@ -3047,6 +3091,7 @@
        lastFired: 0,
        lastKillTime: 0,
        incomeTimer: 0, // For income generation
+        baseStats: baseStats,
        upgradeLevels: [0, 0, 0],
        targetEnemy: null,
        upgradeCosts: [0, 0, 0], // Initialize with 0, will be set in upgrade menu
@@ -3126,7 +3171,7 @@
 
// Get current stats for a tower with upgrades applied
function getTowerCurrentStats(tower, externalBuffs = {}) {
-    const baseStats = TOWER_STATS[tower.type];
+    const baseStats = tower.baseStats || TOWER_STATS[tower.type];
    const stats = { ...baseStats, specialAbilities: {} }; // Start with base and init special abilities
 
    // Ensure core stats have a default value to prevent errors
@@ -4049,65 +4094,7 @@
- Create a tower that is fun and unique, but FAIR. It should fill a niche not currently filled, or be an interesting alternative to an existing tower.`;
 
async function handleTowerGeneration() {
-    const name = aiTowerName.value;
-    const description = aiTowerDescription.value;
-
-    if (!name.trim() || !description.trim()) {
-        aiStatus.textContent = "Please provide a name and description.";
-        aiStatus.style.color = '#F44336';
-        return;
-    }
-
    generateAiTowerBtn.disabled = true;
    aiStatus.style.color = '#8BC34A';
-    aiStatus.textContent = "Balancing and generating tower... This may take a moment.";
-
-    try {
-        // Construct the dynamic prompt with existing tower data for balancing
-        const existingTowersData = `Here are the stats for the existing towers for your reference. Use this to balance the cost and stats of the new tower you create.
-\`\`\`json
-${JSON.stringify({ TOWER_STATS, TOWER_UPGRADE_PATHS }, null, 2)}
-\`\`\`
-`;
-        const dynamicPrompt = AI_SYSTEM_PROMPT.replace('{TOWER_DATA_PLACEHOLDER}', existingTowersData);
-        
-        const completion = await websim.chat.completions.create({
-            messages: [
-                { role: "system", content: dynamicPrompt },
-                { role: "user", content: `Tower Name: ${name}\nDescription: ${description}` }
-            ],
-            json: true,
-        });
-
-        // More robust JSON parsing
-        let towerData;
-        try {
-            // The AI might wrap the JSON in markdown, so we extract it.
-            const responseContent = completion.content;
-            const jsonMatch = responseContent.match(/```json\s*([\s\S]*?)\s*```|({[\s\S]*})/);
-            if (!jsonMatch) {
-                throw new Error("No JSON object found in the AI response.");
-            }
-            // Use the first non-null capture group.
-            const jsonString = jsonMatch[1] || jsonMatch[2];
-            towerData = JSON.parse(jsonString);
-        } catch (e) {
-            console.error("Failed to parse JSON from AI response:", e);
-            console.log("Raw AI response:", completion.content);
-            aiStatus.textContent = "AI returned malformed data. Please try again.";
-            aiStatus.style.color = '#F44336';
-            generateAiTowerBtn.disabled = false;
-            return;
-        }
-
        addCustomTower(towerData);
 
    } catch (error) {
@@ -4128,6 +4360,7 @@
         userTowers.forEach(record => {
             const towerData = record.tower_data;
             if (towerData && towerData.type) {
-                // Silently add, don't show the success message
-                addCustomTowerToGame(towerData);
+                // Pass the record ID so it can be deleted later
+                addCustomTowerToGame(towerData, record.id);
             }
         });
@@ -432,6 +432,14 @@
     },
     nightmare: {
         startingMoney: 150,
         startingLives: 5,
         enemyHealthMod: 1.5,
         towerCostMod: 1.3,
         customEnemyChance: 0.25
     }
 };
 
 // Define game variables
@@ -498,6 +506,53 @@
     }, 8000); // Message stays for 8 seconds
 }
 
+// --- Live Chat ---
+
+function setupChat() {
+    const chatInput = document.getElementById('chat-input');
+    const sendChatBtn = document.getElementById('send-chat-btn');
+    const chatMessagesContainer = document.getElementById('chat-messages');
+
+    const sendMessage = async () => {
+        const message = chatInput.value.trim();
+        if (message && currentUser) {
+            try {
+                chatInput.value = '';
+                await room.collection('chat_messages_v1').create({ message });
+            } catch (e) {
+                console.error("Failed to send message:", e);
+                // Optionally, restore the input value on failure
+                chatInput.value = message;
+            }
+        }
+    };
+
+    sendChatBtn.addEventListener('click', sendMessage);
+    chatInput.addEventListener('keypress', (e) => {
+        if (e.key === 'Enter') {
+            sendMessage();
+        }
+    });
+
+    room.collection('chat_messages_v1')
+        .sort('created_at', 'desc')
+        .limit(30)
+        .subscribe((messages) => {
+            chatMessagesContainer.innerHTML = ''; // Clear previous messages
+            messages.forEach(msg => {
+                const messageDiv = document.createElement('div');
+                messageDiv.classList.add('chat-message');
+                
+                const userSpan = document.createElement('span');
+                userSpan.classList.add('chat-username');
+                userSpan.textContent = msg.username || 'Anonymous';
+
+                messageDiv.appendChild(userSpan);
+                messageDiv.append(msg.message); // Use append to treat content as text
+                chatMessagesContainer.appendChild(messageDiv);
+            });
+    });
+}
 
 // Immediately invoked function to initialize the game
 (function() {
     document.addEventListener('DOMContentLoaded', async () => {
         // Setup Main Menu
         const mainMenu = document.getElementById('main-menu');
-        const gameContainer = document.querySelector('.game-container');
+        const gameUIContainer = document.getElementById('game-ui-container');
         const startGameBtn = document.getElementById('start-game-btn');
         const mapSelect = document.getElementById('map-select');
         const difficultyButtons = document.querySelectorAll('.difficulty-btn');
@@ -551,7 +618,7 @@
         startGameBtn.addEventListener('click', () => {
             currentMapId = mapSelect.value;
             mainMenu.style.display = 'none';
-            gameContainer.style.display = 'flex';
+            gameUIContainer.style.display = 'flex';
             initGame();
             if (musicPlayer && musicPlayer.paused) {
                 playRandomMusic();
@@ -563,7 +618,7 @@
                 cancelAnimationFrame(gameLoopId);
                 gameLoopId = null;
             }
-            gameContainer.style.display = 'none';
+            gameUIContainer.style.display = 'none';
             mainMenu.style.display = 'flex';
             // Clear board for next game
             document.getElementById('game-board').innerHTML = '';
@@ -647,7 +702,7 @@
 
 document.getElementById('game-over-to-menu-btn').addEventListener('click', () => {
     document.getElementById('game-over-screen').style.display = 'none';
-    document.querySelector('.game-container').style.display = 'none';
+    document.getElementById('game-ui-container').style.display = 'none';
     document.getElementById('main-menu').style.display = 'flex';
 });
 
@@ -657,6 +712,7 @@
         // Setup admin panel and cheat code listener
         setupAdminPanel();
         setupBroadcastListener();
+        setupChat();
         setupMusic();
     });
 })();
@@ -888,7 +944,7 @@
 
 document.getElementById('game-over-to-menu-btn').addEventListener('click', () => {
     document.getElementById('game-over-screen').style.display = 'none';
-    document.querySelector('.game-container').style.display = 'none';
+    document.getElementById('game-ui-container').style.display = 'none';
     document.getElementById('main-menu').style.display = 'flex';
 });
 
@@ -4344,7 +4336,7 @@
         userTowers.forEach(record => {
             const towerData = record.tower_data;
             if (towerData && towerData.type) {
-                // Silently add, don't show the success message
-                addCustomTowerToGame(towerData);
+                // Pass the record ID so it can be deleted later
+                addCustomTowerToGame(towerData, record.id);
             }
         });
@@ -4351,3 +4360,57 @@
         loadingStatus.style.color = '#F44336';
     }
 }
+
+// --- Broadcasts ---
+let displayedBroadcastIds = new Set();
+
+function setupBroadcastListener() {
+    room.collection('broadcasts_v1').subscribe((messages) => {
+        if (!messages || messages.length === 0) return;
+
+        const latestMessages = messages
+            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
+            .slice(0, 5);
+
+        latestMessages.forEach(msg => {
+            if (!msg || !msg.id || !msg.created_at) return;
+            const messageAge = Date.now() - new Date(msg.created_at).getTime();
+            // Show recent messages (last minute) that haven't been displayed
+            if (!displayedBroadcastIds.has(msg.id) && messageAge < 60000) {
+                displayBroadcastMessage(msg.text, msg.username);
+                displayedBroadcastIds.add(msg.id);
+            }
+        });
+
+        // Prune old displayed message IDs to prevent memory leak
+        if (displayedBroadcastIds.size > 20) {
+            const oldIds = Array.from(displayedBroadcastIds).slice(0, 10);
+            oldIds.forEach(id => displayedBroadcastIds.delete(id));
+        }
+    });
+}
+
+async function broadcastMessage(message) {
+    try {
+        await room.collection('broadcasts_v1').create({
+            text: message,
+        });
+    } catch (e) {
+        console.error("Failed to broadcast message:", e);
+        alert("Failed to send broadcast.");
+    }
+}
+
+function displayBroadcastMessage(text, sender) {
+    const container = document.getElementById('broadcast-container');
+    if (!container) return;
+    const messageEl = document.createElement('div');
+    messageEl.classList.add('broadcast-message');
+    // Sanitize sender and text to prevent HTML injection
+    const safeSender = (sender || 'Electr1cBacon').replace(/</g, "&lt;").replace(/>/g, "&gt;");
+    const safeText = text ? text.replace(/</g, "&lt;").replace(/>/g, "&gt;") : '';
+    messageEl.innerHTML = `<strong style="color: #BF360C; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);">${safeSender}:</strong> ${safeText}`;
+    container.prepend(messageEl);
+
+    // Animate in
+    setTimeout(() => messageEl.classList.add('show'), 10);
+
+    // Animate out and remove
+    setTimeout(() => {
+        messageEl.classList.remove('show');
+        setTimeout(() => messageEl.remove(), 500);
+    }, 8000); // Message stays for 8 seconds
+}
+
+// Setup for the recurring projects promo popup
+window.addEventListener('message', (event) => {
+    if (event.data === 'backquote_pressed') {
+        if (isAdmin) {
+            const gameStateForAdmin = {
+                get money() { return money; },
+                set money(val) { money = Math.floor(val); updateMoneyDisplay(); },
+                get lives() { return lives; },
+                set lives(val) { lives = Math.floor(val); updateLivesDisplay(); },
+                get wave() { return wave; },
+                set wave(val) { wave = Math.floor(val); updateWaveDisplay(); },
+            };
+
+            if (gui) {
+                gui.domElement.style.display = gui.domElement.style.display === 'none' ? '' : 'none';
+            } else {
+                gui = new lil.GUI({
+                    container: document.getElementById('admin-panel-container')
+                });
+                gui.add(gameStateForAdmin, 'money', 0, 100000, 100).name('Money');
+                gui.add(gameStateForAdmin, 'lives', 0, 1000, 1).name('Lives');
+                gui.add(gameStateForAdmin, 'wave', 0, 200, 1).name('Wave');
+                gui.add({ fn: () => enemies.forEach(e => killEnemy(e)) }, 'fn').name('Kill All Enemies');
+                gui.add({ fn: () => { if (waveInProgress) waveComplete(true); } }, 'fn').name('End Wave');
+            }
+        }
+    }
+    if (event.data === 'backslash_pressed') {
+        if (currentUser && currentUser.username === 'Electr1cBacon') {
+            money += 1000;
+            updateMoneyDisplay();
+        }
+    }
+    if (event.data === 'equal_pressed') {
+        if (isAdmin) {
+            const message = prompt("Enter broadcast message:");
+            if (message && message.trim()) {
+                broadcastMessage(message);
+            }
+        }
+    }
+});
+
+// Initialize the game
+function initGame() {
+    // Setup admin panel and cheat code listener
+    setupAdminPanel();
+    setupBroadcastListener();
+    setupChat();
+    setupMusic();
+})();
+
+async function loadCustomTowers() {
+    if (!currentUser) {
+        document.getElementById('loading-status').textContent = 'Log in to save custom towers.';
+        return;
+    }
+
+    const loadingStatus = document.getElementById('loading-status');
+    try {
+        const userTowers = await room.collection('custom_towers_v2').filter({ user_id: currentUser.id }).getList();
+        
+        if (userTowers.length === 0) {
+            loadingStatus.textContent = "Create a tower with AI to save it!";
+            return;
+        }
+
+        userTowers.forEach(record => {
+            const towerData = record.tower_data;
+            if (towerData && towerData.type) {
+                // Pass the record ID so it can be deleted later
+                addCustomTowerToGame(towerData, record.id);
+            }
+        });
+
+        loadingStatus.textContent = `Loaded ${userTowers.length} custom tower(s).`;
+        updateCustomTowerList();
+    } catch (error) {
+        console.error("Error loading custom towers:", error);
+        loadingStatus.textContent = "Could not load custom towers.";
+        loadingStatus.style.color = '#F44336';
+    }
+}