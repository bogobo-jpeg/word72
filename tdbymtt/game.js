import { WebsimSocket } from '@websim/websim-socket';

const room = new WebsimSocket();

// Define tower upgrade paths with 5 levels each
const TOWER_UPGRADE_PATHS = {
    basic: [
        {
            name: "Fast Firing",
            levels: [
                { cost: 75, fireRateBonus: 30, description: "Increases attack speed by {fireRate}" },
                { cost: 150, fireRateBonus: 30, description: "Increases attack speed by {fireRate}" },
                { cost: 225, fireRateBonus: 30, description: "Increases attack speed by {fireRate}" },
                { cost: 300, fireRateBonus: 30, specialAbility: "dualShot", description: "Dual Shot: 50% chance to fire two projectiles at once. Also increases attack speed by {fireRate}." },
                { cost: 375, fireRateBonus: 30, specialAbility: "tripleShot", description: "Triple Shot: Always fires three projectiles simultaneously. Also increases attack speed by {fireRate}." }
            ]
        },
        {
            name: "Heavy Impact",
            levels: [
                { cost: 90, damageBonus: 2, description: "Increases damage by {damage}" },
                { cost: 160, damageBonus: 2, description: "Increases damage by {damage}" },
                { cost: 240, damageBonus: 3, description: "Increases damage by {damage}" },
                { cost: 320, damageBonus: 3, specialAbility: "criticalStrike", description: "Critical Strike: 35% chance to deal double damage. Also increases damage by {damage}." },
                { cost: 400, damageBonus: 4, specialAbility: "deadlyStrike", description: "Deadly Strike: 50% chance to deal triple damage. Also increases damage by {damage}." }
            ]
        },
        {
            name: "Precision Targeting",
            levels: [
                { cost: 60, rangeBonus: 0.6, projectileSpeedBonus: 2, description: "Increases range by {range} and projectile speed by {projectileSpeed}" },
                { cost: 120, rangeBonus: 0.6, projectileSpeedBonus: 2, description: "Increases range by {range} and projectile speed by {projectileSpeed}" },
                { cost: 180, rangeBonus: 0.6, projectileSpeedBonus: 3, description: "Increases range by {range} and projectile speed by {projectileSpeed}" },
                { cost: 240, rangeBonus: 0.6, projectileSpeedBonus: 3, specialAbility: "radarSweep", description: "Radar Sweep: Range increases by 2 units after each kill for 3 seconds. Also increases range by {range} and projectile speed by {projectileSpeed}." },
                { cost: 300, rangeBonus: 0.7, projectileSpeedBonus: 4, specialAbility: "globalRange", description: "Satellite Targeting: Can target enemies anywhere on the map. Also increases range by {range} and projectile speed by {projectileSpeed}." }
            ]
        }
    ],
    sniper: [
        {
            name: "Rapid Sniper",
            levels: [
                { cost: 120, fireRateBonus: 30, description: "Increases attack speed by {fireRate}" },
                { cost: 240, fireRateBonus: 30, description: "Increases attack speed by {fireRate}" },
                { cost: 350, fireRateBonus: 30, description: "Increases attack speed by {fireRate}" },
                { cost: 450, fireRateBonus: 30, specialAbility: "rapidReload", description: "Rapid Reload: Occasionally enters a rapid fire state. Also increases attack speed by {fireRate}." },
                { cost: 550, fireRateBonus: 40, specialAbility: "automaticFire", description: "Automatic Rifle: Permanently doubled fire rate. Also increases attack speed by {fireRate}." }
            ]
        },
        {
            name: "Armor Piercing",
            levels: [
                { cost: 140, damageBonus: 4, description: "Increases damage by {damage}" },
                { cost: 280, damageBonus: 4, description: "Increases damage by {damage}" },
                { cost: 400, damageBonus: 5, description: "Increases damage by {damage}" },
                { cost: 520, damageBonus: 6, specialAbility: "piercing", pierceCount: 1, description: "Armor Piercing: Shots penetrate through the first target. Also increases damage by {damage}." },
                { cost: 640, damageBonus: 8, specialAbility: "explosiveRounds", splashRadius: 1.2, description: "Explosive Rounds: Shots explode on impact, dealing splash damage. Also increases damage by {damage}." }
            ]
        },
        {
            name: "Eagle Eye",
            levels: [
                { cost: 100, rangeBonus: 1.2, description: "Increases range by {range}" },
                { cost: 200, rangeBonus: 1.2, description: "Increases range by {range}" },
                { cost: 300, rangeBonus: 1.2, description: "Increases range by {range}" },
                { cost: 400, rangeBonus: 1.8, specialAbility: "thermalVision", description: "Thermal Vision: Shots deal 2x damage to armored enemies. Also increases range by {range}." },
                { cost: 500, rangeBonus: 2.0, specialAbility: "orbitalStrike", description: "Orbital Strike: Global range and targets enemies with highest health. Also increases range by {range}." }
            ]
        }
    ],
    splash: [
        {
            name: "Quick Reload",
            levels: [
                { cost: 120, fireRateBonus: 20, description: "Increases attack speed by {fireRate}" },
                { cost: 240, fireRateBonus: 20, description: "Increases attack speed by {fireRate}" },
                { cost: 350, fireRateBonus: 25, description: "Increases attack speed by {fireRate}" },
                { cost: 450, fireRateBonus: 25, specialAbility: "clusterBombs", description: "Cluster Bombs: Projectiles split into 3 smaller explosions (40% damage, 60% radius). Also increases attack speed by {fireRate}." },
                { cost: 550, fireRateBonus: 30, specialAbility: "carpetBombing", description: "Carpet Bombing: Fires multiple explosives covering a wide area (6 smaller explosions, 40% damage, 60% radius). Also increases attack speed by {fireRate}." }
            ]
        },
        {
            name: "Bigger Splash",
            levels: [
                { cost: 150, splashRadiusBonus: 0.5, damageBonus: 1, description: "Increases splash radius by {splash} and damage by {damage}" },
                { cost: 280, splashRadiusBonus: 0.5, damageBonus: 1, description: "Increases splash radius by {splash} and damage by {damage}" },
                { cost: 400, splashRadiusBonus: 0.5, damageBonus: 2, description: "Increases splash radius by {splash} and damage by {damage}" },
                { cost: 520, splashRadiusBonus: 0.5, damageBonus: 2, specialAbility: "shockwave", description: "Shockwave: Explosions push enemies back. Also increases splash radius by {splash} and damage by {damage}." },
                { cost: 640, splashRadiusBonus: 1, damageBonus: 3, stunDuration: 1.5, specialAbility: "seismicImpact", description: "Seismic Impact: Huge explosions (30% larger radius) that stun enemies for 1.5s. Also increases splash radius by {splash} and damage by {damage}." }
            ]
        },
        {
            name: "Long Shot",
            levels: [
                { cost: 90, rangeBonus: 0.5, description: "Increases range by {range}" },
                { cost: 180, rangeBonus: 0.5, description: "Increases range by {range}" },
                { cost: 270, rangeBonus: 0.5, description: "Increases range by {range}" },
                { cost: 360, rangeBonus: 0.5, specialAbility: "guidedMissiles", description: "Guided Missiles: Projectiles track enemies. Also increases range by {range}." },
                { cost: 450, rangeBonus: 1, specialAbility: "tacticalNuke", description: "Tactical Nuke: Global range and multiple impact zones. Also increases range by {range}." }
            ]
        }
    ],
    frost: [
        {
            name: "Cold Snap",
            levels: [
                { cost: 120, fireRateBonus: 20, description: "Increases attack speed by {fireRate}" },
                { cost: 240, fireRateBonus: 20, description: "Increases attack speed by {fireRate}" },
                { cost: 350, fireRateBonus: 25, description: "Increases attack speed by {fireRate}" },
                { cost: 450, fireRateBonus: 25, specialAbility: "iceStorm", description: "Ice Storm: Projectiles hit multiple targets in a line. Also increases attack speed by {fireRate}." },
                { cost: 550, fireRateBonus: 30, specialAbility: "blizzard", description: "Blizzard: Periodically freezes all enemies in range for 1.5s. Also increases attack speed by {fireRate}." }
            ]
        },
        {
            name: "Deep Freeze",
            levels: [
                { cost: 140, slowPercentBonus: 5, slowDurationBonus: 0.5, description: "Increases slow effect by {slow}% and duration by {duration}" },
                { cost: 280, slowPercentBonus: 5, slowDurationBonus: 0.5, description: "Increases slow effect by {slow}% and duration by {duration}" },
                { cost: 400, slowPercentBonus: 10, slowDurationBonus: 0.5, description: "Increases slow effect by {slow}% and duration by {duration}" },
                { cost: 520, slowPercentBonus: 10, slowDurationBonus: 1, specialAbility: "flashFreeze", description: "Flash Freeze: 25% chance to completely stop enemies briefly for 1.5s. Also increases slow effect by {slow}% and duration by {duration}." },
                { cost: 640, slowPercentBonus: 15, slowDurationBonus: 1, specialAbility: "absoluteZero", description: "Absolute Zero: 50% chance to freeze enemies solid for 3s. Also increases slow effect by {slow}% and duration by {duration}." }
            ]
        },
        {
            name: "Winter's Reach",
            levels: [
                { cost: 100, rangeBonus: 0.5, damageBonus: 1, description: "Increases range by {range} and damage by {damage}" },
                { cost: 200, rangeBonus: 0.5, damageBonus: 1, description: "Increases range by {range} and damage by {damage}" },
                { cost: 300, rangeBonus: 0.5, damageBonus: 1, description: "Increases range by {range} and damage by {damage}" },
                { cost: 400, rangeBonus: 0.5, damageBonus: 2, specialAbility: "frostbite", description: "Frostbite: Frozen enemies take 50% more damage. Also increases range by {range} and damage by {damage}." },
                { cost: 500, rangeBonus: 1, damageBonus: 2, specialAbility: "avalanche", description: "Avalanche: Massive damage to all frozen enemies on the map. Also increases range by {range} and damage by {damage}." }
            ]
        }
    ],
    poison: [
        {
            name: "Toxic Clouds",
            levels: [
                { cost: 120, fireRateBonus: 20, description: "Increases attack speed by {fireRate}" },
                { cost: 240, fireRateBonus: 20, description: "Increases attack speed by {fireRate}" },
                { cost: 350, fireRateBonus: 25, description: "Increases attack speed by {fireRate}" },
                { cost: 450, fireRateBonus: 25, specialAbility: "toxicCloud", description: "Toxic Cloud: Creates poisonous area that damages enemies for 50% poison damage. Also increases attack speed by {fireRate}." },
                { cost: 550, fireRateBonus: 30, specialAbility: "plagueSpread", description: "Plague Spreader: Poison jumps to nearby enemies within 80px. Also increases attack speed by {fireRate}." }
            ]
        },
        {
            name: "Lethal Venom",
            levels: [
                { cost: 150, damageBonus: 1, poisonDurationBonus: 0.5, description: "Increases poison damage by {damage} and duration by {duration}" },
                { cost: 280, damageBonus: 2, poisonDurationBonus: 0.5, description: "Increases poison damage by {damage} and duration by {duration}" },
                { cost: 400, damageBonus: 2, poisonDurationBonus: 1.0, description: "Increases poison damage by {damage} and duration by {duration}" },
                { cost: 520, damageBonus: 3, poisonDurationBonus: 1, specialAbility: "corrosiveAcid", description: "Corrosive Acid: Poison reduces enemy defense by 25%. Also increases poison damage by {damage} and duration by {duration}." },
                { cost: 640, damageBonus: 4, poisonDurationBonus: 1.5, specialAbility: "disintegration", description: "Disintegration: Poison deals percentage-based damage (3% max health per tick). Also increases poison damage by {damage} and duration by {duration}." }
            ]
        },
        {
            name: "Contagion",
            levels: [
                { cost: 120, rangeBonus: 0.5, description: "Increases range by {range}" },
                { cost: 240, rangeBonus: 0.5, description: "Increases range by {range}" },
                { cost: 350, rangeBonus: 0.5, description: "Increases range by {range}" },
                { cost: 450, rangeBonus: 0.5, specialAbility: "neurotoxin", description: "Neurotoxin: Poisoned enemies are also slowed by 15%. Also increases range by {range}." },
                { cost: 550, rangeBonus: 1, specialAbility: "pandemic", description: "Pandemic: Massive area effect and greatly increased poison potency. Also increases range by {range}." }
            ]
        }
    ],
    lightning: [
        {
            name: "Storm Front",
            levels: [
                { cost: 140, fireRateBonus: 20, description: "Increases attack speed by {fireRate}" },
                { cost: 280, fireRateBonus: 20, description: "Increases attack speed by {fireRate}" },
                { cost: 400, fireRateBonus: 25, description: "Increases attack speed by {fireRate}" },
                { cost: 520, fireRateBonus: 25, specialAbility: "teslaCoil", description: "Tesla Coil: Continuous electric arcs to nearby enemies. Also increases attack speed by {fireRate}." },
                { cost: 640, fireRateBonus: 30, specialAbility: "thunderGod", description: "Thunder God: Multiple simultaneous lightning strikes. Also increases attack speed by {fireRate}." }
            ]
        },
        {
            name: "Chain Lightning",
            levels: [
                { cost: 160, chainTargetsBonus: 1, damageBonus: 1, description: "Increases chain targets by {chainTargets} and damage by {damage}" },
                { cost: 300, chainTargetsBonus: 1, damageBonus: 1, description: "Increases chain targets by {chainTargets} and damage by {damage}" },
                { cost: 440, chainTargetsBonus: 1, damageBonus: 2, description: "Increases chain targets by {chainTargets} and damage by {damage}" },
                { cost: 580, chainTargetsBonus: 1, damageBonus: 2, stunDuration: 0.5, specialAbility: "overload", description: "Overload: Chain lightning has 30% chance to stun for 0.5s. Also increases chain targets by {chainTargets} and damage by {damage}." },
                { cost: 720, chainTargetsBonus: 3, damageBonus: 3, specialAbility: "superconductor", description: "Superconductor: Lightning chains to many more targets (+5). Also increases chain targets by {chainTargets} and damage by {damage}." }
            ]
        },
        {
            name: "Thunderstorm",
            levels: [
                { cost: 120, rangeBonus: 0.5, description: "Increases range by {range}" },
                { cost: 240, rangeBonus: 0.5, description: "Increases range by {range}" },
                { cost: 360, rangeBonus: 0.5, description: "Increases range by {range}" },
                { cost: 480, rangeBonus: 0.5, specialAbility: "electromagnetism", description: "Electromagnetism: Pulls enemies closer to the tower. Also increases range by {range}." },
                { cost: 600, rangeBonus: 1, specialAbility: "stormLord", description: "Storm Lord: Creates a persistent storm damaging all enemies in range (20% tower damage per second). Also increases range by {range}." }
            ]
        }
    ],
    bomb: [
        {
            name: "Rapid Deployment",
            levels: [
                { cost: 160, fireRateBonus: 20, description: "Increases attack speed by {fireRate}" },
                { cost: 300, fireRateBonus: 20, description: "Increases attack speed by {fireRate}" },
                { cost: 440, fireRateBonus: 25, description: "Increases attack speed by {fireRate}" },
                { cost: 580, fireRateBonus: 25, specialAbility: "mirv", description: "MIRV: Bombs split into 3 smaller bombs (40% damage, 60% radius). Also increases attack speed by {fireRate}." },
                { cost: 720, fireRateBonus: 30, specialAbility: "thermobaric", description: "Thermobaric Explosive: Massive area coverage and devastating damage. Also increases attack speed by {fireRate}." }
            ]
        },
        {
            name: "Nuclear Payload",
            levels: [
                { cost: 200, damageBonus: 3, splashRadiusBonus: 0.5, description: "Increases damage by {damage} and splash radius by {splash}" },
                { cost: 360, damageBonus: 3, splashRadiusBonus: 0.5, description: "Increases damage by {damage} and splash radius by {splash}" },
                { cost: 520, damageBonus: 4, splashRadiusBonus: 0.5, description: "Increases damage by {damage} and splash radius by {splash}" },
                { cost: 680, damageBonus: 4, splashRadiusBonus: 1, specialAbility: "fallout", description: "Fallout: Creates lingering damage area (30% tower damage per second). Also increases damage by {damage} and splash radius by {splash}." },
                { cost: 840, damageBonus: 5, splashRadiusBonus: 1, specialAbility: "antimatter", description: "Antimatter Bomb: Enormous damage (+50%) and physics-defying radius (2x). Also increases damage by {damage} and splash radius by {splash}." }
            ]
        },
        {
            name: "Strategic Strike",
            levels: [
                { cost: 160, rangeBonus: 0.5, description: "Increases range by {range}" },
                { cost: 300, rangeBonus: 0.5, description: "Increases range by {range}" },
                { cost: 440, rangeBonus: 0.5, description: "Increases range by {range}" },
                { cost: 580, rangeBonus: 0.5, specialAbility: "targetingComputer", description: "Targeting Computer: Bombs track enemies with precision. Also increases range by {range}." },
                { cost: 720, rangeBonus: 1, specialAbility: "orbitalBombardment", description: "Orbital Bombardment: Global range and multiple impact zones. Also increases range by {range}." }
            ]
        }
    ],
    spikeFactory: [
        {
            name: "Faster Production",
            levels: [
                { cost: 175, fireRateBonus: 25, description: "Increases spike production speed by {fireRate}" },
                { cost: 250, fireRateBonus: 25, description: "Increases spike production speed by {fireRate}" },
                { cost: 350, fireRateBonus: 30, description: "Increases spike production speed by {fireRate}" },
                { cost: 500, fireRateBonus: 30, specialAbility: "spikeStorm", description: "Spike Storm Ability: Periodically covers a large area of the track in spikes. Also increases production speed by {fireRate}." },
                { cost: 800, fireRateBonus: 50, specialAbility: "superSpikeStorm", description: "Super Spike Storm: Spike storm ability is much more powerful and happens more often. Also increases production speed by {fireRate}." }
            ]
        },
        {
            name: "Stronger Spikes",
            levels: [
                { cost: 150, spikeHitsBonus: 3, description: "Spikes can hit {spikeHits} more enemies." },
                { cost: 225, spikeHitsBonus: 4, description: "Spikes can hit {spikeHits} more enemies." },
                { cost: 325, spikeHitsBonus: 5, damageBonus: 1, description: "Increases spike damage by {damage} and spikes can hit {spikeHits} more enemies." },
                { cost: 450, spikeHitsBonus: 8, damageBonus: 2, specialAbility: "whiteHotSpikes", description: "White Hot Spikes: Spikes deal double damage to lead and ceramic enemies. Increases damage by {damage} and spikes can hit {spikeHits} more." },
                { cost: 750, spikeHitsBonus: 15, damageBonus: 3, specialAbility: "permaSpike", description: "Permaspike: Spikes last on the track much longer and are far more powerful. Increases damage by {damage} and spikes can hit {spikeHits} more." }
            ]
        },
        {
            name: "Wider Spread",
            levels: [
                { cost: 125, rangeBonus: 0.5, description: "Increases range by {range}." },
                { cost: 200, rangeBonus: 0.5, description: "Increases range by {range}." },
                { cost: 300, rangeBonus: 0.7, description: "Increases range by {range}." },
                { cost: 400, rangeBonus: 0.8, specialAbility: "directedSpikes", description: "Directed Spikes: Spikes are placed more strategically closer to the entrance. Also increases range by {range}." },
                { cost: 650, rangeBonus: 1.5, specialAbility: "longRangeSpikes", description: "Long-Range Spikes: Can place spikes much further down the track. Also increases range by {range}." }
            ]
        }
    ],
    laser: [
        {
            name: "Beam Intensity",
            levels: [
                { cost: 250, damageBonus: 0.2, description: "Increases beam damage per tick by {damage}." },
                { cost: 350, damageBonus: 0.2, description: "Increases beam damage per tick by {damage}." },
                { cost: 450, damageBonus: 0.3, description: "Increases beam damage per tick by {damage}." },
                { cost: 600, damageBonus: 0.3, specialAbility: "multibeam", description: "Multibeam: Fires smaller beams at 2 nearby targets for 50% damage. Increases primary beam damage by {damage}." },
                { cost: 800, damageBonus: 0.5, specialAbility: "deathStar", description: "Death Star: Main beam becomes massive, dealing double damage. Increases primary beam damage by {damage}." }
            ]
        },
        {
            name: "Focused Beam",
            levels: [
                { cost: 200, rangeBonus: 0.5, description: "Increases range by {range}." },
                { cost: 300, rangeBonus: 0.5, description: "Increases range by {range}." },
                { cost: 400, rangeBonus: 0.5, beamDurationBonus: 0.5, description: "Increases range by {range} and beam duration by {duration}." },
                { cost: 550, rangeBonus: 1, specialAbility: "atomizer", description: "Atomizer: Instantly disintegrates enemies below 40% health. Also increases range by {range}." },
                { cost: 750, rangeBonus: 1, specialAbility: "quantumTunneling", description: "Quantum Tunneling: Beam pierces through its target, hitting all enemies in a line. Also increases range by {range}." }
            ]
        },
        {
            name: "Amplification",
            levels: [
                { cost: 220, fireRateBonus: 10, description: "Increases beam tick rate by {fireRate}." },
                { cost: 320, fireRateBonus: 10, description: "Increases beam tick rate by {fireRate}." },
                { cost: 420, fireRateBonus: 15, description: "Increases beam tick rate by {fireRate}." },
                { cost: 580, fireRateBonus: 15, specialAbility: "prismaticBeam", description: "Prismatic Beam: Beam refracts on hit, dealing 50% damage to nearby enemies. Also increases tick rate by {fireRate}." },
                { cost: 780, fireRateBonus: 20, specialAbility: "resonanceCascade", description: "Resonance Cascade: Enemies hit take 25% more damage from all sources. Also increases tick rate by {fireRate}." }
            ]
        }
    ]
};

const MAPS = {
    straight: {
        paths: [
            [
                { x: 0, y: 5 }, { x: 1, y: 5 }, { x: 2, y: 5 }, { x: 3, y: 5 }, { x: 4, y: 5 },
                { x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 }, { x: 8, y: 5 }, { x: 9, y: 5 },
                { x: 10, y: 5 }, { x: 11, y: 5 }, { x: 12, y: 5 }, { x: 13, y: 5 }, { x: 14, y: 5 }
            ]
        ]
    },
    zigzag: {
        paths: [
            [
                { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 },
                { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 }, { x: 3, y: 6 }, { x: 3, y: 7 },
                { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 7 }, { x: 7, y: 7 }, { x: 8, y: 7 },
                { x: 9, y: 7 }, { x: 10, y: 7 }, { x: 11, y: 7 },
                { x: 11, y: 6 }, { x: 11, y: 5 }, { x: 11, y: 4 }, { x: 11, y: 3 }, { x: 11, y: 2 },
                { x: 12, y: 2 }, { x: 13, y: 2 }, { x: 14, y: 2 }
            ]
        ],
        specialBlocks: [
            { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 },
            { x: 12, y: 9 }, { x: 13, y: 9 }, { x: 14, y: 9 }
        ]
    },
    loop: {
        paths: [
            [
                { x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 },
                { x: 2, y: 3 }, { x: 2, y: 2 }, { x: 2, y: 1 },
                { x: 3, y: 1 }, { x: 4, y: 1 }, { x: 5, y: 1 },
                { x: 5, y: 2 }, { x: 5, y: 3 }, { x: 5, y: 4 }, { x: 5, y: 5 }, { x: 5, y: 6 }, { x: 5, y: 7 }, { x: 5, y: 8 },
                { x: 4, y: 8 }, { x: 3, y: 8 }, { x: 2, y: 8 },
                { x: 2, y: 7 }, { x: 2, y: 6 },
                { x: 8, y: 6 }, { x: 9, y: 6 }, { x: 10, y: 6 },
                { x: 10, y: 5 }, { x: 10, y: 4 }, { x: 10, y: 3 }, { x: 10, y: 2 }, { x: 10, y: 1 },
                { x: 9, y: 1 }, { x: 8, y: 1 },
                { x: 8, y: 2 }, { x: 8, y: 3 }, { x: 8, y: 4 },
                { x: 8, y: 8 }, { x: 9, y: 8 }, { x: 10, y: 8 }, { x: 11, y: 8 }, { x: 12, y: 8 },
                { x: 12, y: 7 }, { x: 12, y: 6 }, { x: 12, y: 5 }, { x: 12, y: 4 }, { x: 12, y: 3 },
                { x: 13, y: 3 }, { x: 14, y: 3 }
            ]
        ]
    }
};

const TOWER_STATS = {
    basic: {
        damage: 4,
        fireRate: 2,
        range: 3,
        projectileSpeed: 10
    },
    sniper: {
        damage: 15,
        fireRate: 0.5,
        range: 6,
        projectileSpeed: 20
    },
    splash: {
        damage: 5,
        fireRate: 1,
        range: 2.5,
        projectileSpeed: 7,
        splashRadius: 1.5
    },
    frost: {
        damage: 1,
        fireRate: 1.5,
        range: 2.5,
        projectileSpeed: 8,
        slowPercent: 20,
        slowDuration: 2
    },
    poison: {
        damage: 1, // Direct damage
        fireRate: 1,
        range: 3,
        projectileSpeed: 7,
        poisonDamage: 2, // Damage per second from poison
        poisonDuration: 4
    },
    lightning: {
        damage: 8,
        fireRate: 1.2,
        range: 3,
        chainTargets: 3,
        chainDamageReduction: 0.6
    },
    bomb: {
        damage: 20,
        fireRate: 0.5,
        range: 2.5,
        projectileSpeed: 5,
        splashRadius: 2.5
    },
    laser: {
        damage: 0.5, // Damage per tick
        fireRate: 20, // Ticks per second
        range: 4,
        beamDuration: 1.5 // Seconds
    },
    spikeFactory: {
        damage: 1, // Damage per spike hit
        fireRate: 0.5, // Piles per second
        range: 3,
        spikeHits: 5, // Number of enemies a pile can hit
        spikeDuration: 10, // Seconds a pile lasts
        nonAttacking: true
    }
};

const DIFFICULTY_MODS = {
    easy: {
        startingMoney: 450,
        startingLives: 25,
        enemyHealthMod: 0.85,
        towerCostMod: 0.9,
        customEnemyChance: 0.10 // 10% chance
    },
    normal: {
        startingMoney: 300,
        startingLives: 15,
        enemyHealthMod: 1.0,
        towerCostMod: 1.0,
        customEnemyChance: 0.15 // 15% chance
    },
    hard: {
        startingMoney: 250,
        startingLives: 10,
        enemyHealthMod: 1.2,
        towerCostMod: 1.15,
        customEnemyChance: 0.20 // 20% chance
    },
    nightmare: {
        startingMoney: 150,
        startingLives: 5,
        enemyHealthMod: 1.5,
        towerCostMod: 1.3,
        customEnemyChance: 0.25 // 25% chance
    }
};

// Define game variables
let gridWidth = 15;
let gridHeight = 10;
let cellSize = 40;
let grid = [];
let path = []; // Will hold the primary path for drawing, but enemies will have their own
let towers = [];
let enemies = [];
let projectiles = [];
let beams = [];
let money = 300;
let lives = 15;
let wave = 0;
let selectedTower = null;
let selectedUpgradeTower = null;
let waveInProgress = false;
let gameRunning = true;
let autoStartEnabled = false;
let gameLoopId = null;
let lastFrameTime = 0;
let killedEnemiesCount = 0;
let gameSpeed = 1;
let currentMapId = 'straight'; // Default map
let gameDifficulty = 'normal'; // Default difficulty
let CUSTOM_ENEMIES = {};
let currentUser = null;
let moveVisuals = null;

// Music variables
const musicTracks = [
    '/Wii-Shop-Background-Music.mp3',
    '/Regretevator OST - Natural Elevator.mp3',
    '/ytmp3free.cc_mrfun-unregistered-hypercam-2-by-undertale-last-corridor-extra-youtubemp3free.org (1).mp3'
];
let musicPlayer;
let currentTrackIndex = -1;
let isMuted = false;

// AI Tower Creator elements
let createTowerBtn, aiCreatorMenu, closeAiCreatorBtn, generateAiTowerBtn, aiTowerName, aiTowerDescription, aiStatus;
// AI Enemy Creator elements
let createEnemyBtn, aiEnemyCreatorMenu, closeAiEnemyCreatorBtn, generateAiEnemyBtn, aiEnemyName, aiEnemyDescription, aiEnemyStatus;

// Declare towerButtons globally accessible within this script
let towerButtons;

// --- Broadcasts ---
let displayedBroadcastIds = new Set();

function setupBroadcastListener() {
    room.collection('broadcasts_v1').subscribe((messages) => {
        if (!messages || messages.length === 0) return;

        const latestMessages = messages
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 5);

        latestMessages.forEach(msg => {
            if (!msg || !msg.id || !msg.created_at) return;
            const messageAge = Date.now() - new Date(msg.created_at).getTime();
            // Show recent messages (last minute) that haven't been displayed
            if (!displayedBroadcastIds.has(msg.id) && messageAge < 60000) {
                displayBroadcastMessage(msg.text, msg.username);
                displayedBroadcastIds.add(msg.id);
            }
        });

        // Prune old displayed message IDs to prevent memory leak
        if (displayedBroadcastIds.size > 20) {
            const oldIds = Array.from(displayedBroadcastIds).slice(0, 10);
            oldIds.forEach(id => displayedBroadcastIds.delete(id));
        }
    });
}

async function broadcastMessage(message) {
    try {
        await room.collection('broadcasts_v1').create({
            text: message,
        });
    } catch (e) {
        console.error("Failed to broadcast message:", e);
        alert("Failed to send broadcast.");
    }
}

function displayBroadcastMessage(text, sender) {
    const container = document.getElementById('broadcast-container');
    if (!container) return;
    const messageEl = document.createElement('div');
    messageEl.classList.add('broadcast-message');
    // Sanitize sender and text to prevent HTML injection
    const safeSender = (sender || 'Electr1cBacon').replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const safeText = text ? text.replace(/</g, "&lt;").replace(/>/g, "&gt;") : '';
    messageEl.innerHTML = `<strong style="color: #BF360C; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);">${safeSender}:</strong> ${safeText}`;
    container.prepend(messageEl);

    // Animate in
    setTimeout(() => messageEl.classList.add('show'), 10);

    // Animate out and remove
    setTimeout(() => {
        messageEl.classList.remove('show');
        setTimeout(() => messageEl.remove(), 500);
    }, 8000); // Message stays for 8 seconds
}

// Immediately invoked function to initialize the game
(function() {
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            currentUser = await websim.getUser();
        } catch (e) {
            console.log("Not logged in, custom towers will not be saved.");
        }
        
        // Load custom towers on startup
        await loadCustomTowers();

        // AI Creator Menu Listeners
        createTowerBtn = document.getElementById('create-tower-btn');
        aiCreatorMenu = document.getElementById('ai-creator-menu');
        closeAiCreatorBtn = document.getElementById('close-ai-creator');
        generateAiTowerBtn = document.getElementById('generate-ai-tower');
        aiTowerName = document.getElementById('ai-tower-name');
        aiTowerDescription = document.getElementById('ai-tower-description');
        aiStatus = document.getElementById('ai-status');

        createTowerBtn.addEventListener('click', () => {
            aiCreatorMenu.style.display = 'flex';
        });

        closeAiCreatorBtn.addEventListener('click', () => {
            aiCreatorMenu.style.display = 'none';
        });

        generateAiTowerBtn.addEventListener('click', handleTowerGeneration);

        // Setup Main Menu
        const mainMenu = document.getElementById('main-menu');
        const gameContainer = document.querySelector('.game-container');
        const startGameBtn = document.getElementById('start-game-btn');
        const mapSelect = document.getElementById('map-select');
        const difficultyButtons = document.querySelectorAll('.difficulty-btn');

        // AI Enemy Creator Menu Listeners
        createEnemyBtn = document.getElementById('create-enemy-btn');
        aiEnemyCreatorMenu = document.getElementById('ai-enemy-creator-menu');
        closeAiEnemyCreatorBtn = document.getElementById('close-ai-enemy-creator');
        generateAiEnemyBtn = document.getElementById('generate-ai-enemy');
        aiEnemyName = document.getElementById('ai-enemy-name');
        aiEnemyDescription = document.getElementById('ai-enemy-description');
        aiEnemyStatus = document.getElementById('ai-enemy-status');

        createEnemyBtn.addEventListener('click', () => {
            aiEnemyCreatorMenu.style.display = 'flex';
        });

        closeAiEnemyCreatorBtn.addEventListener('click', () => {
            aiEnemyCreatorMenu.style.display = 'none';
        });

        generateAiEnemyBtn.addEventListener('click', handleEnemyGeneration);

        difficultyButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (button.classList.contains('active')) return;
                difficultyButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                gameDifficulty = button.dataset.difficulty;
            });
        });

        startGameBtn.addEventListener('click', () => {
            currentMapId = mapSelect.value;
            mainMenu.style.display = 'none';
            gameContainer.style.display = 'flex';
            initGame();
            if (musicPlayer && musicPlayer.paused) {
                playRandomMusic();
            }
        });
        
        document.getElementById('back-to-menu').addEventListener('click', () => {
            gameRunning = false;
            if (gameLoopId) {
                cancelAnimationFrame(gameLoopId);
                gameLoopId = null;
            }
            gameContainer.style.display = 'none';
            mainMenu.style.display = 'flex';
            // Clear board for next game
            document.getElementById('game-board').innerHTML = '';
        });

        document.getElementById('close-tutorial').addEventListener('click', function() {
            document.getElementById('tutorial').style.display = 'none';
        });

        document.getElementById('close-code-copy').addEventListener('click', function() {
            const codeCopy = document.getElementById('code-copy');
            codeCopy.style.display = 'none';
        });

        document.getElementById('copy-html').addEventListener('click', function() {
            copyFileContent('index.html');
        });

        document.getElementById('copy-css').addEventListener('click', function() {
            copyFileContent('style.css');
        });

        document.getElementById('copy-js').addEventListener('click', function() {
            copyFileContent('game.js');
        });
        
        // Use event delegation for tower selection
        const towerSelection = document.querySelector('.tower-selection');
        towerSelection.addEventListener('click', (event) => {
            const button = event.target.closest('.tower-btn');
            if (!button || button.disabled) return;

            // Guard against selecting a new tower while moving an existing one
            if (selectedTower && selectedTower.isMoving) {
                return;
            }

            const towerType = button.getAttribute('data-type');
            
            // If clicking the currently selected tower, deselect it
            if (selectedTower && selectedTower.type === towerType) {
                button.classList.remove('selected');
                selectedTower = null;
                return;
            }

            const towerCost = parseInt(button.getAttribute('data-cost'));

            if (money >= towerCost) {
                document.querySelectorAll('.tower-btn').forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                selectedTower = {
                    type: towerType,
                    cost: towerCost
                };
            }
        });

        // Event delegation for custom enemy spawning
        document.body.addEventListener('click', (event) => {
            const button = event.target.closest('.custom-enemy-spawn-btn');
            if (button) {
                const enemyType = button.dataset.type;
                spawnCustomEnemy(enemyType);
            }
        });

        // Assign to the globally declared variable
        towerButtons = document.querySelectorAll('.tower-btn');

        document.getElementById('start-wave').addEventListener('click', startWave);

        document.getElementById('auto-start').addEventListener('click', function() {
            autoStartEnabled = !autoStartEnabled;
            this.textContent = `Auto Start: ${autoStartEnabled ? 'On' : 'Off'}`;
            this.classList.toggle('active', autoStartEnabled);

            if (autoStartEnabled && !waveInProgress) {
                startWave();
            }
        });

        document.getElementById('reset-game').addEventListener('click', resetGame);

        document.getElementById('close-upgrade').addEventListener('click', function() {
            document.getElementById('upgrade-menu').style.display = 'none';
            selectedUpgradeTower = null;
        });

        document.getElementById('sell-tower').addEventListener('click', sellSelectedTower);
        document.getElementById('move-tower').addEventListener('click', initiateTowerMove);

        document.getElementById('upgrade-path1').addEventListener('click', function() {
            upgradeSelectedTower(0);
        });

        document.getElementById('upgrade-path2').addEventListener('click', function() {
            upgradeSelectedTower(1);
        });

        document.getElementById('upgrade-path3').addEventListener('click', function() {
            upgradeSelectedTower(2);
        });

        document.getElementById('speed-toggle').addEventListener('click', function() {
            if (gameSpeed === 1) {
                gameSpeed = 2;
                this.textContent = 'Speed: 2x';
            } else if (gameSpeed === 2) {
                gameSpeed = 3;
                this.textContent = 'Speed: 3x';
            } else {
                gameSpeed = 1;
                this.textContent = 'Speed: 1x';
            }
            this.classList.toggle('active', gameSpeed > 1);
        });

        // Game Over Screen Buttons
        document.getElementById('restart-game-btn').addEventListener('click', () => {
            document.getElementById('game-over-screen').style.display = 'none';
            resetGame();
        });

        document.getElementById('game-over-to-menu-btn').addEventListener('click', () => {
            document.getElementById('game-over-screen').style.display = 'none';
            document.querySelector('.game-container').style.display = 'none';
            document.getElementById('main-menu').style.display = 'flex';
        });

        // Initialize Promo Popup
        setupPromoPopup();

        // Setup admin panel and cheat code listener
        setupAdminPanel();
        setupBroadcastListener();
        setupMusic();
    });
})();

// Setup for the recurring projects promo popup
function setupPromoPopup() {
    const popup = document.getElementById('promo-popup');
    const closeBtn = document.getElementById('close-promo-popup');
    
    if (!popup || !closeBtn) return;

    const showPopup = () => {
        popup.style.display = 'flex';
        setTimeout(() => popup.classList.add('show'), 10); // Delay to allow transition
    };

    const hidePopup = () => {
        popup.classList.remove('show');
        // Wait for transition to finish before setting display to none
        setTimeout(() => {
            popup.style.display = 'none';
        }, 500);
    };

    closeBtn.addEventListener('click', hidePopup);
    
    // Show on start
    setTimeout(showPopup, 3000); // Show after 3 seconds on first load

    // Show every 10 minutes
    setInterval(showPopup, 10 * 60 * 1000); // 10 minutes in milliseconds
}

// Setup admin panel check
async function setupAdminPanel() {
    let isAdmin = false;
    let currentUser = null;
    let gui;
    try {
        const user = await websim.getUser();
        currentUser = user;
        if (user && (user.is_admin || user.username === 'Electr1cBacon')) {
            isAdmin = true;
        }
    } catch (e) {
        console.error("Could not get user for admin panel check:", e);
    }
    
    window.addEventListener('message', (event) => {
        if (event.data === 'backquote_pressed') {
            if (isAdmin) {
                const gameStateForAdmin = {
                    get money() { return money; },
                    set money(val) { money = Math.floor(val); updateMoneyDisplay(); },
                    get lives() { return lives; },
                    set lives(val) { lives = Math.floor(val); updateLivesDisplay(); },
                    get wave() { return wave; },
                    set wave(val) { wave = Math.floor(val); updateWaveDisplay(); },
                };

                if (gui) {
                    gui.domElement.style.display = gui.domElement.style.display === 'none' ? '' : 'none';
                } else {
                    gui = new lil.GUI({
                        container: document.getElementById('admin-panel-container')
                    });
                    gui.add(gameStateForAdmin, 'money', 0, 100000, 100).name('Money');
                    gui.add(gameStateForAdmin, 'lives', 0, 1000, 1).name('Lives');
                    gui.add(gameStateForAdmin, 'wave', 0, 200, 1).name('Wave');
                    gui.add({ fn: () => enemies.forEach(e => killEnemy(e)) }, 'fn').name('Kill All Enemies');
                    gui.add({ fn: () => { if (waveInProgress) waveComplete(true); } }, 'fn').name('End Wave');
                }
            }
        }
        if (event.data === 'backslash_pressed') {
            if (currentUser && currentUser.username === 'Electr1cBacon') {
                money += 1000;
                updateMoneyDisplay();
            }
        }
        if (event.data === 'equal_pressed') {
            if (isAdmin) {
                const message = prompt("Enter broadcast message:");
                if (message && message.trim()) {
                    broadcastMessage(message);
                }
            }
        }
    });
}

// Initialize the game
function initGame() {
    const gameBoard = document.getElementById('game-board');
    const difficulty = DIFFICULTY_MODS[gameDifficulty];

    // Reset game state for a fresh start
    money = difficulty.startingMoney;
    lives = difficulty.startingLives;
    wave = 0;
    towers = [];
    enemies = [];
    projectiles = [];
    beams = [];
    selectedTower = null;
    selectedUpgradeTower = null;
    waveInProgress = false;
    autoStartEnabled = false;
    killedEnemiesCount = 0;
    gameSpeed = 1;
    CUSTOM_ENEMIES = {};

    // Reset UI elements
    const autoStartBtn = document.getElementById('auto-start');
    autoStartBtn.textContent = 'Auto Start: Off';
    autoStartBtn.classList.remove('active');
    const speedToggleBtn = document.getElementById('speed-toggle');
    speedToggleBtn.textContent = 'Speed: 1x';
    speedToggleBtn.classList.remove('active');
    document.getElementById('start-wave').disabled = false;
    document.getElementById('upgrade-menu').style.display = 'none';
    document.getElementById('game-over-screen').style.display = 'none';

    // Clear custom enemy panel
    const customEnemyPanel = document.querySelector('.custom-enemy-panel');
    if(customEnemyPanel) customEnemyPanel.innerHTML = '';
    const customEnemyContainer = document.querySelector('.custom-enemy-panel-container');
    if(customEnemyContainer) customEnemyContainer.style.display = 'none';

    cellSize = Math.min(Math.floor(gameBoard.clientWidth / gridWidth), Math.floor(gameBoard.clientHeight / gridHeight));

    gameBoard.style.gridTemplateColumns = `repeat(${gridWidth}, ${cellSize}px)`;
    gameBoard.style.gridTemplateRows = `repeat(${gridHeight}, ${cellSize}px)`;

    createGrid();
    generatePath();
    updateMoneyDisplay();
    updateLivesDisplay();
    updateWaveDisplay();
    gameRunning = true;
    startGameLoop();
}

// Create grid cells
function createGrid() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    grid = [];

    for (let y = 0; y < gridHeight; y++) {
        const row = [];
        for (let x = 0; x < gridWidth; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.x = x;
            cell.dataset.y = y;

            cell.addEventListener('click', function() {
                const x = parseInt(this.dataset.x);
                const y = parseInt(this.dataset.y);

                if (selectedTower) {
                    if (canPlaceTower(x, y)) {
                        if (selectedTower.isMoving) {
                            finalizeTowerMove(x, y);
                        } else {
                            placeTower(x, y, selectedTower.type, selectedTower.cost);
                        }
                    }
                } else {
                    const tower = getTowerAt(x, y);
                    if (tower) {
                        openUpgradeMenu(tower);
                    }
                }
            });

            cell.addEventListener('mouseenter', function() {
                if (selectedTower) {
                    const x = parseInt(this.dataset.x);
                    const y = parseInt(this.dataset.y);

                    if (canPlaceTower(x, y)) {
                        this.classList.add('tower-placement-valid');
                    } else {
                        this.classList.add('tower-placement-invalid');
                    }
                }
            });

            cell.addEventListener('mouseleave', function() {
                this.classList.remove('tower-placement-valid', 'tower-placement-invalid');
            });

            gameBoard.appendChild(cell);
            row.push({
                element: cell,
                x: x,
                y: y,
                isPath: false,
                isBuildable: true
            });
        }
        grid.push(row);
    }
}

// Generate a simple path
function generatePath() {
    const mapData = MAPS[currentMapId] || MAPS['straight'];
    // For visual drawing, we combine all paths into one set of path cells
    const allPathCoords = new Set();

    mapData.paths.forEach(p => {
        p.forEach(point => {
            allPathCoords.add(`${point.x},${point.y}`);
        });
    });

    allPathCoords.forEach(coord => {
        const [x, y] = coord.split(',').map(Number);
        if (grid[y] && grid[y][x]) {
            grid[y][x].isPath = true;
            grid[y][x].isBuildable = false;
            grid[y][x].element.classList.add('path');
        }
    });
    
    // Set the main path variable to the first path for backward compatibility if needed
    path = mapData.paths[0];

    if (mapData.specialBlocks) {
        for (const block of mapData.specialBlocks) {
            if (grid[block.y] && grid[block.y][block.x]) {
                grid[block.y][block.x].isBuildable = false;
                grid[block.y][block.x].element.classList.add('non-buildable');
            }
        }
    }
}

// Check if a tower can be placed at this position
function canPlaceTower(x, y) {
    if (x < 0 || x >= gridWidth || y < 0 || y >= gridHeight) {
        return false;
    }

    // Use the isBuildable flag
    if (!grid[y][x].isBuildable) {
        return false;
    }

    if (getTowerAt(x, y)) {
        return false;
    }

    return true;
}

// Place a tower at the given position
function placeTower(x, y, type, cost) {
    money -= cost;
    updateMoneyDisplay();

    const cell = grid[y][x].element;
    const tower = document.createElement('div');
    const baseStats = TOWER_STATS[type];

    // Handle custom AI tower visuals vs. standard visuals
    if (baseStats.visuals && baseStats.visuals.components) {
        tower.classList.add('tower');
        let turretElement = null;
        baseStats.visuals.components.forEach(comp => {
            const componentDiv = document.createElement('div');
            componentDiv.style.position = 'absolute';
            componentDiv.style.backgroundColor = comp.color;
            componentDiv.style.width = `${comp.size.width}%`;
            componentDiv.style.height = `${comp.size.height}%`;
            componentDiv.style.left = `calc(50% + ${comp.position.x}%)`;
            componentDiv.style.top = `calc(50% + ${comp.position.y}%)`;
            componentDiv.style.transform = 'translate(-50%, -50%)';
            componentDiv.style.zIndex = comp.zIndex || 2;

            if (comp.shape === 'circle') {
                componentDiv.style.borderRadius = '50%';
            }

            tower.appendChild(componentDiv);

            if (comp.isTurret) {
                componentDiv.classList.add('tower-turret'); // For rotation
                turretElement = componentDiv;
            }
        });
        cell.appendChild(tower);
        tower.turret = turretElement; // Assign the rotatable part
    } else {
        // Standard tower creation
        tower.classList.add('tower', `tower-${type}`);
        const turret = document.createElement('div');
        turret.classList.add('tower-turret');
        tower.appendChild(turret);
        cell.appendChild(tower);
        tower.turret = turret;
    }

    const towerObj = {
        id: Date.now() + Math.random(),
        type: type,
        x: x,
        y: y,
        element: tower,
        turret: tower.turret,
        lastFired: 0,
        lastKillTime: 0,
        incomeTimer: 0, // For income generation
        upgradeLevels: [0, 0, 0],
        targetEnemy: null,
        upgradeCosts: [0, 0, 0], // Initialize with 0, will be set in upgrade menu
        needsStatsUpdate: true, // Flag to recalculate stats
        currentStats: {} // Cache for calculated stats
    };
    
    // Safely get initial upgrade costs
    const upgradePaths = TOWER_UPGRADE_PATHS[type];
    if (upgradePaths && upgradePaths.length === 3) {
        for (let i = 0; i < 3; i++) {
            if (upgradePaths[i] && upgradePaths[i].levels && upgradePaths[i].levels.length > 0) {
                towerObj.upgradeCosts[i] = upgradePaths[i].levels[0].cost;
            }
        }
    }

    towers.push(towerObj);
    towerButtons.forEach(btn => btn.classList.remove('selected'));
    selectedTower = null;
    updateAllButtons();
}

// Get tower at a specific position
function getTowerAt(x, y) {
    return towers.find(tower => tower.x === x && tower.y === y);
}

// Update money display
function updateMoneyDisplay() {
    document.getElementById('money').textContent = money;
    updateAllButtons();
}

// Update tower buttons
function updateAllButtons() {
    const towerButtons = document.querySelectorAll('.tower-btn');
    towerButtons.forEach(button => {
        const cost = parseInt(button.getAttribute('data-cost'));
        button.disabled = cost > money;
    });

    const enemySpawnButtons = document.querySelectorAll('.custom-enemy-spawn-btn');
    enemySpawnButtons.forEach(button => {
        const cost = parseInt(button.dataset.cost);
        button.disabled = money < cost;
    });
}

// Update lives display
function updateLivesDisplay() {
    document.getElementById('lives').textContent = lives;
}

// Update wave display
function updateWaveDisplay() {
    document.getElementById('wave').textContent = wave;
}

// Start a new wave
function startWave() {
    if (waveInProgress) return;

    wave++;
    updateWaveDisplay();
    createEnemiesForWave(wave);
    waveInProgress = true;
    document.getElementById('start-wave').disabled = true;
}

// Reset the game
function resetGame() {
    gameRunning = false;
    if (gameLoopId) {
        cancelAnimationFrame(gameLoopId);
        gameLoopId = null;
    }
    initGame();
}

// Get current stats for a tower with upgrades applied
function getTowerCurrentStats(tower, externalBuffs = {}) {
    const baseStats = TOWER_STATS[tower.type];
    const stats = { ...baseStats, specialAbilities: {} }; // Start with base and init special abilities

    // Ensure core stats have a default value to prevent errors
    stats.damage = stats.damage || 0;
    stats.fireRate = stats.fireRate || 0;
    stats.range = stats.range || 0;

    // Initialize aura stats from base
    stats.auraBuffs = baseStats.auraBuffs ? { ...baseStats.auraBuffs } : {};
    stats.auraRange = baseStats.auraRange || 0;

    // Apply external buffs first (from other towers' auras)
    if (externalBuffs.damageBonus) {
        stats.damage += externalBuffs.damageBonus;
    }
    if (externalBuffs.rangeBonus) {
        stats.range += externalBuffs.rangeBonus;
    }
    if (externalBuffs.fireRateBonus) {
        stats.fireRate *= (1 + externalBuffs.fireRateBonus / 100);
    }

    // Apply this tower's own upgrades
    for (let pathIndex = 0; pathIndex < 3; pathIndex++) {
        const level = tower.upgradeLevels[pathIndex];
        if (level === 0) continue;

        const upgradePath = TOWER_UPGRADE_PATHS[tower.type][pathIndex];
        for (let i = 0; i < level; i++) {
            const upgrade = upgradePath.levels[i];

            // Apply stat bonuses
            if (upgrade.damageBonus) stats.damage += upgrade.damageBonus;
            if (upgrade.rangeBonus) stats.range += upgrade.rangeBonus;
            if (upgrade.projectileSpeedBonus) stats.projectileSpeed = (stats.projectileSpeed || 0) + upgrade.projectileSpeedBonus;
            if (upgrade.splashRadiusBonus) stats.splashRadius = (stats.splashRadius || 0) + upgrade.splashRadiusBonus;
            if (upgrade.slowPercentBonus) stats.slowPercent = (stats.slowPercent || 0) + upgrade.slowPercentBonus;
            if (upgrade.slowDurationBonus) stats.slowDuration = (stats.slowDuration || 0) + upgrade.slowDurationBonus;
            if (upgrade.poisonDurationBonus) stats.poisonDuration = (stats.poisonDuration || 0) + upgrade.poisonDurationBonus;
            if (upgrade.poisonDamageBonus) stats.poisonDamage = (stats.poisonDamage || 0) + upgrade.poisonDamageBonus;
            if (upgrade.chainTargetsBonus) stats.chainTargets = (stats.chainTargets || 0) + upgrade.chainTargetsBonus;
            if (upgrade.beamDurationBonus) stats.beamDuration = (stats.beamDuration || 0) + upgrade.beamDurationBonus;
            if (upgrade.incomeRateBonus) stats.incomeRate = (stats.incomeRate || 0) + upgrade.incomeRateBonus;
            if (upgrade.cashPerHitBonus) stats.cashPerHit = (stats.cashPerHit || 0) + upgrade.cashPerHitBonus;
            if (upgrade.cashPerKillBonus) stats.cashPerKill = (stats.cashPerKill || 0) + upgrade.cashPerKillBonus;
            if (upgrade.fireRateBonus) stats.fireRate *= (1 + upgrade.fireRateBonus / 100);

            // Apply aura upgrades
            if (upgrade.auraRangeBonus) {
                stats.auraRange += upgrade.auraRangeBonus;
            }
            if (upgrade.auraBuffs) {
                for (const [buffKey, buffValue] of Object.entries(upgrade.auraBuffs)) {
                    if (typeof buffValue === 'number') {
                        stats.auraBuffs[buffKey] = (stats.auraBuffs[buffKey] || 0) + buffValue;
                    }
                }
            }

            // Add special ability logic
            if (upgrade.specialAbility) {
                stats.specialAbilities[upgrade.specialAbility] = {
                    enabled: true,
                    chance: upgrade.chance,
                    pierceCount: upgrade.pierceCount,
                    stunDuration: upgrade.stunDuration // Carry over stun duration if present
                };
            }
        }
    }

    return stats;
}

// Open upgrade menu for a tower
function openUpgradeMenu(tower) {
    selectedUpgradeTower = tower;

    const upgradePaths = TOWER_UPGRADE_PATHS[tower.type];

    // Add a check to prevent errors if upgrade paths don't exist for a tower type
    if (!upgradePaths) {
        console.error(`No upgrade paths found for tower type: ${tower.type}`);
        // Optionally, close the menu or show an error message to the user
        document.getElementById('upgrade-menu').style.display = 'none';
        return;
    }

    document.getElementById('upgrade-title').textContent = `${tower.type.charAt(0).toUpperCase() + tower.type.slice(1)} Tower Upgrades`;
    
    document.getElementById('money').textContent = money;
    
    for (let i = 0; i < 3; i++) {
        const pathContainer = document.querySelector(`#path${i+1}-name`).parentElement;
        if (upgradePaths && upgradePaths[i]) {
            pathContainer.style.display = 'block';
            document.getElementById(`path${i+1}-name`).textContent = upgradePaths[i].name;

            const levelsContainer = document.getElementById(`path${i+1}-levels`);
            levelsContainer.innerHTML = '';

            for (let j = 0; j < 5; j++) {
                const node = document.createElement('div');
                node.classList.add('level-node');

                if (j < tower.upgradeLevels[i]) {
                    node.classList.add('active');
                }

                levelsContainer.appendChild(node);
            }

            const currentLevel = tower.upgradeLevels[i];
            const pathUpgrades = upgradePaths[i].levels;

            if (currentLevel < 5 && pathUpgrades && pathUpgrades.length > currentLevel) {
                const nextUpgrade = pathUpgrades[currentLevel];
                tower.upgradeCosts[i] = nextUpgrade.cost;

                document.getElementById(`path${i+1}-cost`).textContent = nextUpgrade.cost;
                document.getElementById(`path${i+1}-description`).innerHTML = getUpgradeDescription(tower.type, i, nextUpgrade, tower);

                const upgradeBtn = document.getElementById(`upgrade-path${i+1}`);
                upgradeBtn.disabled = money < nextUpgrade.cost;
                upgradeBtn.style.display = 'block';
            } else {
                document.getElementById(`path${i+1}-description`).textContent = 'Fully upgraded';
                document.getElementById(`upgrade-path${i+1}`).style.display = 'none';
            }
        } else {
            // Hide the UI for this path if it doesn't exist
            pathContainer.style.display = 'none';
        }
    }

    const currentStats = getTowerCurrentStats(tower); // Always recalculate for fresh data
    tower.currentStats = currentStats; // Update the tower's cached stats

    const statsContainer = document.getElementById('tower-stats');
    let statsHTML = '';

    if (currentStats.damage > 0 || !currentStats.nonAttacking) {
        statsHTML += `<div class="stat-line"><span>Damage:</span> <span>${currentStats.damage.toFixed(1)}</span></div>`;
    }
    if (currentStats.fireRate > 0 || !currentStats.nonAttacking) {
        statsHTML += `<div class="stat-line"><span>Fire Rate:</span> <span>${currentStats.fireRate.toFixed(2)}/sec</span></div>`;
    }
    if (currentStats.range > 0 || !currentStats.nonAttacking) {
        statsHTML += `<div class="stat-line"><span>Range:</span> <span>${currentStats.range.toFixed(1)}</span></div>`;
    }

    if (currentStats.auraRange) {
        statsHTML += `<div class="stat-line"><span>Aura Range:</span> <span>${currentStats.auraRange.toFixed(1)}</span></div>`;
    }
    if (currentStats.auraBuffs) {
        statsHTML += `<h4>Aura Buffs:</h4>`;
        for (const [key, value] of Object.entries(currentStats.auraBuffs)) {
            const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            const isPercentage = key.toLowerCase().includes('firerate');
            statsHTML += `<div class="stat-line"><span>${formattedKey}:</span> <span>+${value}${isPercentage ? '%' : ''}</span></div>`;
        }
    }

    if (currentStats.splashRadius) {
        statsHTML += `<div class="stat-line"><span>Splash Radius:</span> <span>${currentStats.splashRadius.toFixed(1)}</span></div>`;
    }

    if (currentStats.slowPercent) {
        statsHTML += `<div class="stat-line"><span>Slow Effect:</span> <span>${currentStats.slowPercent}%</span></div>`;
        statsHTML += `<div class="stat-line"><span>Slow Duration:</span> <span>${currentStats.slowDuration.toFixed(1)}s</span></div>`;
    }

    if (currentStats.poisonDuration) {
        statsHTML += `<div class="stat-line"><span>Poison Duration:</span> <span>${currentStats.poisonDuration.toFixed(1)}s</span></div>`;
    }

    if (currentStats.chainTargets) {
        statsHTML += `<div class="stat-line"><span>Chain Targets:</span> <span>${currentStats.chainTargets}</span></div>`;
    }

    if (currentStats.beamDuration) {
        statsHTML += `<div class="stat-line"><span>Beam Duration:</span> <span>${currentStats.beamDuration.toFixed(1)}s</span></div>`;
    }

    if (currentStats.incomeRate) {
        statsHTML += `<div class="stat-line"><span>Income Rate:</span> <span>$${currentStats.incomeRate.toFixed(1)}/s</span></div>`;
    }
    if (currentStats.cashPerHit) {
        statsHTML += `<div class="stat-line"><span>Cash Per Hit:</span> <span>$${currentStats.cashPerHit}</span></div>`;
    }
    if (currentStats.cashPerKill) {
        statsHTML += `<div class="stat-line"><span>Cash Per Kill:</span> <span>$${currentStats.cashPerKill}</span></div>`;
    }

    statsContainer.innerHTML = statsHTML;

    const initialCost = getTowerInitialCost(tower.type);
    const upgradeCost = calculateTotalUpgradeCost(tower);
    const sellValue = Math.floor((initialCost + upgradeCost) * 0.75);
    document.getElementById('sell-value').textContent = sellValue;

    const moveCost = Math.floor((initialCost + upgradeCost) * 0.25);
    document.getElementById('move-cost').textContent = moveCost;
    const moveBtn = document.getElementById('move-tower');
    moveBtn.disabled = money < moveCost;

    document.getElementById('upgrade-menu').style.display = 'flex';
}

// Get the initial cost of a tower
function getTowerInitialCost(towerType) {
    const towerBtn = document.querySelector(`.tower-btn[data-type="${towerType}"]`);
    return towerBtn ? parseInt(towerBtn.getAttribute('data-basecost')) : 0;
}

// Calculate total upgrade costs spent on a tower
function calculateTotalUpgradeCost(tower) {
    let totalCost = 0;
    const upgradePaths = TOWER_UPGRADE_PATHS[tower.type];

    for (let pathIndex = 0; pathIndex < 3; pathIndex++) {
        const level = tower.upgradeLevels[pathIndex];

        if (level > 0) {
            const pathUpgrades = upgradePaths[pathIndex].levels;

            for (let i = 0; i < level; i++) {
                totalCost += pathUpgrades[i].cost;
            }
        }
    }

    return totalCost;
}

// Upgrade a selected tower
function upgradeSelectedTower(pathIndex) {
    if (!selectedUpgradeTower) return;

    const currentLevel = selectedUpgradeTower.upgradeLevels[pathIndex];

    if (currentLevel >= 5) return;

    const cost = selectedUpgradeTower.upgradeCosts[pathIndex];

    if (money >= cost) {
        money -= cost;
        updateMoneyDisplay();
        
        document.getElementById('money').textContent = money;
        
        selectedUpgradeTower.upgradeLevels[pathIndex]++;
        selectedUpgradeTower.needsStatsUpdate = true; // Mark stats for recalculation
        updateTowerAppearance(selectedUpgradeTower);
        openUpgradeMenu(selectedUpgradeTower);
    }
}

// Sell the selected tower
function sellSelectedTower() {
    if (!selectedUpgradeTower) return;

    const initialCost = getTowerInitialCost(selectedUpgradeTower.type);
    const upgradeCost = calculateTotalUpgradeCost(selectedUpgradeTower);
    const sellValue = Math.floor((initialCost + upgradeCost) * 0.75);

    money += sellValue;
    updateMoneyDisplay();
    
    document.getElementById('money').textContent = money;

    if (selectedUpgradeTower.element) {
        selectedUpgradeTower.element.remove();
    }

    const index = towers.findIndex(t => t.id === selectedUpgradeTower.id);
    if (index !== -1) {
        towers.splice(index, 1);
    }

    document.getElementById('upgrade-menu').style.display = 'none';
    selectedUpgradeTower = null;
}

function initiateTowerMove() {
    if (!selectedUpgradeTower) return;

    const moveCost = parseInt(document.getElementById('move-cost').textContent);
    if (money < moveCost) return;

    document.getElementById('start-wave').disabled = true;

    // Hide the original tower
    selectedUpgradeTower.element.style.display = 'none';

    // Set global state for moving a tower
    selectedTower = {
        isMoving: true,
        towerObject: selectedUpgradeTower,
        cost: moveCost,
    };

    createMoveVisuals(selectedUpgradeTower);

    // Close menu
    document.getElementById('upgrade-menu').style.display = 'none';
    selectedUpgradeTower = null;
}

function finalizeTowerMove(newX, newY) {
    if (!selectedTower || !selectedTower.isMoving) return;

    const towerToMove = selectedTower.towerObject;
    const moveCost = selectedTower.cost;

    money -= moveCost;
    updateMoneyDisplay();

    towerToMove.x = newX;
    towerToMove.y = newY;

    const newCell = grid[newY][newX].element;
    newCell.appendChild(towerToMove.element);

    towerToMove.element.style.display = ''; // Make it visible again

    cleanupMoveVisuals();
    selectedTower = null;
    document.getElementById('start-wave').disabled = waveInProgress;
}

function cancelTowerMove() {
    if (!selectedTower || !selectedTower.isMoving) return;

    const towerToRestore = selectedTower.towerObject;
    towerToRestore.element.style.display = '';

    document.querySelectorAll('.cell').forEach(c => {
        c.classList.remove('tower-placement-valid', 'tower-placement-invalid');
    });

    cleanupMoveVisuals();
    selectedTower = null;
    document.getElementById('start-wave').disabled = waveInProgress;
}

function createMoveVisuals(tower) {
    const gameBoard = document.getElementById('game-board');
    moveVisuals = document.createElement('div');
    moveVisuals.style.position = 'absolute';
    moveVisuals.style.pointerEvents = 'none';
    moveVisuals.style.zIndex = '10';
    moveVisuals.style.left = '0px';
    moveVisuals.style.top = '0px';

    const visualContainer = document.createElement('div');
    visualContainer.style.position = 'relative';
    visualContainer.style.width = `${cellSize}px`;
    visualContainer.style.height = `${cellSize}px`;

    const towerClone = tower.element.cloneNode(true);
    towerClone.style.display = '';
    towerClone.style.opacity = '0.6';
    towerClone.style.position = 'absolute';
    visualContainer.appendChild(towerClone);

    const range = tower.currentStats.range * cellSize;
    const rangeIndicator = document.createElement('div');
    rangeIndicator.classList.add('tower-range');
    rangeIndicator.style.width = `${range * 2}px`;
    rangeIndicator.style.height = `${range * 2}px`;
    rangeIndicator.style.left = `calc(50% - ${range}px)`;
    rangeIndicator.style.top = `calc(50% - ${range}px)`;
    rangeIndicator.style.display = 'block';
    visualContainer.appendChild(rangeIndicator);

    moveVisuals.appendChild(visualContainer);
    gameBoard.appendChild(moveVisuals);
    gameBoard.addEventListener('mousemove', updateMoveVisuals);
    gameBoard.addEventListener('touchmove', updateMoveVisuals, { passive: true });
}

function updateMoveVisuals(e) {
    if (!moveVisuals) return;
    const gameBoardRect = document.getElementById('game-board').getBoundingClientRect();

    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = e.clientX;
        clientY = e.clientY;
    }

    const x = clientX - gameBoardRect.left;
    const y = clientY - gameBoardRect.top;

    moveVisuals.style.transform = `translate(${x - cellSize / 2}px, ${y - cellSize / 2}px)`;
}

function cleanupMoveVisuals() {
    if (moveVisuals) {
        const gameBoard = document.getElementById('game-board');
        gameBoard.removeEventListener('mousemove', updateMoveVisuals);
        gameBoard.removeEventListener('touchmove', updateMoveVisuals);
        moveVisuals.remove();
        moveVisuals = null;
    }
}

// Update tower appearance based on upgrade levels
function updateTowerAppearance(tower) {
    const totalLevel = tower.upgradeLevels.reduce((a, b) => a + b, 0);

    // Remove any existing upgrade elements
    const existingBadge = tower.element.querySelector('.tower-level-badge');
    if (existingBadge) {
        existingBadge.remove();
    }

    const existingSpecialEffect = tower.element.querySelector('.special-effect');
    if (existingSpecialEffect) {
        existingSpecialEffect.remove();
    }

    // Remove any existing path elements and additional turrets
    const existingPathElements = tower.element.querySelectorAll('.path-upgrade');
    existingPathElements.forEach(el => el.remove());
    
    const existingTurrets = tower.element.querySelectorAll('.tower-turret:not(:first-child)');
    existingTurrets.forEach(el => el.remove());

    // Reset tower special abilities before re-applying them
    tower.specialAbilities = {};

    // Reset the tower base appearance
    tower.element.classList.forEach(className => {
        if (className.startsWith('path-') || className.includes('-upgraded')) {
            tower.element.classList.remove(className);
        }
    });

    // Reset the turret appearance
    if (tower.turret) {
        tower.turret.classList.forEach(className => {
            if (className.startsWith('path-') || className.includes('-upgraded')) {
                tower.turret.classList.remove(className);
            }
        });
        
        // Reset any inline styles that might have been applied
        tower.turret.style.width = '';
        tower.turret.style.height = '';
        tower.turret.style.backgroundColor = '';
        tower.turret.style.borderRadius = '';
    }

    if (totalLevel > 0) {
        // Add level badge
        const badge = document.createElement('div');
        badge.classList.add('tower-level-badge');
        badge.textContent = totalLevel;
        tower.element.appendChild(badge);

        // Apply path-specific upgrades
        for (let i = 0; i < 3; i++) {
            const pathLevel = tower.upgradeLevels[i];
            if (pathLevel > 0) {
                // Add path class to base tower
                tower.element.classList.add(`path-${i+1}-level-${pathLevel}`);

                // Apply tier-based visual enhancements
                if (pathLevel >= 1) {
                    addPathUpgrade(tower, i, pathLevel);
                }

                // Special effects for high tiers
                if (pathLevel >= 4) {
                    const specialEffect = document.createElement('div');
                    specialEffect.classList.add('special-effect');

                    if (pathLevel === 5) {
                        specialEffect.classList.add('tier-5', `path-${i+1}`);
                    } else {
                        specialEffect.classList.add('tier-4', `path-${i+1}`);
                    }

                    tower.element.appendChild(specialEffect);

                    // Special abilities are now handled in getTowerCurrentStats
                }
            }
        }
    }
}

function addPathUpgrade(tower, pathIndex, level) {
    // This function is now empty and only kept to avoid breaking old code
}

// Create enemies for a wave
function createEnemiesForWave(waveNumber) {
    const count = 5 + Math.floor(waveNumber * 1.5);
    const spacing = 1000 - (waveNumber * 40);
    const minSpacing = 300;
    const actualSpacing = Math.max(spacing, minSpacing);
    const mapData = MAPS[currentMapId] || MAPS['straight'];
    const difficulty = DIFFICULTY_MODS[gameDifficulty];

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            if (!gameRunning) return; // Stop spawning if game has ended
            const enemyType = getRandomEnemyType(waveNumber);
            // Randomly select a path for each enemy
            const enemyPath = mapData.paths[Math.floor(Math.random() * mapData.paths.length)];
            createEnemy(enemyType, waveNumber, enemyPath);
        }, i * actualSpacing / gameSpeed);
    }

    if (waveNumber > 0 && waveNumber % 5 === 0) { // Make sure bosses don't spawn on wave 0
        setTimeout(() => {
            if (!gameRunning) return; // Stop spawning if game has ended
            const bossPath = mapData.paths[Math.floor(Math.random() * mapData.paths.length)];
            createBossEnemy(150, 0.7, waveNumber, bossPath);
        }, count * actualSpacing + 1000);
    }
}

// Get a random enemy type based on wave number
function getRandomEnemyType(waveNumber) {
    const customEnemyTypes = Object.values(CUSTOM_ENEMIES);
    const difficulty = DIFFICULTY_MODS[gameDifficulty];

    // New balanced logic for spawning custom enemies
    if (customEnemyTypes.length > 0 && Math.random() < difficulty.customEnemyChance) {
        const eligibleEnemies = customEnemyTypes.filter(
            enemy => waveNumber >= enemy.recommendedSpawnWave
        );

        if (eligibleEnemies.length > 0) {
            // Pick a random one from the eligible list
            const customEnemy = eligibleEnemies[Math.floor(Math.random() * eligibleEnemies.length)];
            return {
                type: customEnemy.type,
                health: customEnemy.health,
                speedMod: customEnemy.speedMod,
                size: customEnemy.size,
                money: customEnemy.money,
                isCustom: true,
                visuals: customEnemy.visuals
            };
        }
    }

    const enemyTypes = [{
        type: 'basic',
        healthMod: 1,
        speedMod: 1,
        size: 20,
        health: 15,
        chance: 100
    }];

    if (waveNumber > 3) {
        enemyTypes.push({
            type: 'fast',
            healthMod: 0.7,
            speedMod: 2.5,
            size: 16,
            health: 10,
            chance: 20 + waveNumber * 2
        });
    }

    if (waveNumber > 5) {
        enemyTypes.push({
            type: 'tank',
            healthMod: 1.8,
            speedMod: 0.7,
            size: 25,
            health: 30,
            chance: 15 + waveNumber
        });
    }

    if (waveNumber > 8) {
        enemyTypes.push({
            type: 'swift',
            healthMod: 0.5,
            speedMod: 3.5,
            size: 14,
            health: 7,
            chance: 10 + waveNumber
        });
    }

    if (waveNumber > 12) {
        enemyTypes.push({
            type: 'armored',
            healthMod: 2.2,
            speedMod: 0.8,
            size: 23,
            health: 45,
            chance: 5 + waveNumber
        });
    }

    if (waveNumber > 15) {
        enemyTypes.push({
            type: 'phantom',
            healthMod: 0.8,
            speedMod: 2.8,
            size: 18,
            health: 12,
            chance: waveNumber
        });
    }

    const totalChance = enemyTypes.reduce((sum, type) => sum + type.chance, 0);
    let random = Math.random() * totalChance;

    for (const enemyType of enemyTypes) {
        random -= enemyType.chance;
        if (random <= 0) {
            return enemyType;
        }
    }

    return enemyTypes[0];
}

// Create a basic enemy
function createEnemy(enemyData, waveNumber, enemyPath) {
    const gameBoard = document.getElementById('game-board');
    const difficulty = DIFFICULTY_MODS[gameDifficulty];

    const enemy = document.createElement('div');
    enemy.classList.add('enemy');

    let finalHealth, finalSpeed, moneyReward, enemySize;

    if (enemyData.isCustom) {
        // Handle custom enemy from AI
        enemy.classList.add(`enemy-custom`); // Generic class, specific styling via JS
        enemy.style.backgroundColor = enemyData.visuals.color;
        if(enemyData.visuals.shape === 'square'){
             enemy.style.borderRadius = '0';
        }
        if(enemyData.visuals.shadow) {
            enemy.style.boxShadow = `0 0 10px 3px ${enemyData.visuals.shadow}`;
        }
        finalHealth = Math.round(enemyData.health * difficulty.enemyHealthMod);
        finalSpeed = enemyData.speedMod * 25; // Use the direct speed mod
        moneyReward = enemyData.money;
        enemySize = enemyData.size;

    } else {
        // Handle predefined enemy
        enemy.classList.add(`enemy-${enemyData.type}`);
        finalHealth = Math.round(enemyData.health * difficulty.enemyHealthMod);
        finalSpeed = enemyData.speedMod * 25;
        moneyReward = Math.ceil(finalHealth / 2);
        enemySize = enemyData.size;
    }

    enemy.style.width = `${enemySize}px`;
    enemy.style.height = `${enemySize}px`;

    const healthBar = document.createElement('div');
    healthBar.classList.add('health-bar');
    enemy.appendChild(healthBar);

    gameBoard.appendChild(enemy);

    const enemyObj = {
        element: enemy,
        healthBar: healthBar,
        position: { x: -enemySize, y: 0 },
        path: enemyPath,
        pathIndex: 0,
        pathProgress: 0,
        size: enemySize,
        health: finalHealth,
        maxHealth: finalHealth, // Base max health on the final calculated health
        speed: finalSpeed,
        type: enemyData.type,
        money: moneyReward,
        effects: {},
        isKilled: false,
        lastHitBy: null
    };

    positionEnemyOnPath(enemyObj);
    enemies.push(enemyObj);
}

// Create a boss enemy
function createBossEnemy(health, speed, waveNumber, enemyPath) {
    const gameBoard = document.getElementById('game-board');
    const difficulty = DIFFICULTY_MODS[gameDifficulty];

    const enemy = document.createElement('div');
    enemy.classList.add('enemy', 'enemy-tank');

    enemy.style.width = '35px';
    enemy.style.height = '35px';

    const healthBar = document.createElement('div');
    healthBar.classList.add('health-bar');
    enemy.appendChild(healthBar);

    gameBoard.appendChild(enemy);

    const bossHealth = Math.round(health * difficulty.enemyHealthMod);

    const enemyObj = {
        element: enemy,
        healthBar: healthBar,
        position: { x: -35, y: 0 },
        path: enemyPath,
        pathIndex: 0,
        pathProgress: 0,
        size: 35,
        health: bossHealth,
        maxHealth: bossHealth,
        speed: speed * 25,
        type: 'boss',
        money: Math.ceil(bossHealth / 2),
        effects: {},
        isKilled: false,
        lastHitBy: null
    };

    positionEnemyOnPath(enemyObj);
    enemies.push(enemyObj);
}

// Position enemy on path
function positionEnemyOnPath(enemy) {
    const enemyPath = enemy.path;
    if (enemy.pathIndex < enemyPath.length) {
        const pathPoint = enemyPath[enemy.pathIndex];

        const x = pathPoint.x * cellSize + (cellSize - enemy.size) / 2;
        const y = pathPoint.y * cellSize + (cellSize - enemy.size) / 2;

        // Use transform for better performance
        enemy.element.style.transform = `translate3d(${x}px, ${y}px, 0)`;

        enemy.position.x = x;
        enemy.position.y = y;
    }
}

// Move enemy along path
function moveEnemy(enemy, deltaTime) {
    const enemyPath = enemy.path;
    if (!enemy.element || enemy.pathIndex >= enemyPath.length - 1) { // Check if at the end of the path
        if (gameRunning) {
            lives -= 1;
            updateLivesDisplay();
            if (lives <= 0) {
                gameOver();
            }
        }
        removeEnemyFromGame(enemy, false);
        return;
    }
    if (enemy.effects && enemy.effects.stun && enemy.effects.stun.duration > 0) return; // Stun check

    // Calculate effective speed (base speed * slow modifier)
    let currentSpeed = enemy.speed;
    if (enemy.effects.slow) {
        currentSpeed *= (1 - enemy.effects.slow.percent / 100);
    }
    const moveDistance = currentSpeed * deltaTime;

    enemy.pathProgress = (enemy.pathProgress || 0) + moveDistance;

    const currentPoint = enemyPath[enemy.pathIndex];
    const nextPoint = enemyPath[enemy.pathIndex + 1];

    if (!nextPoint) {
        // This case is handled at the start of the function now.
        return;
    }

    const currentPixelX = currentPoint.x * cellSize + (cellSize - enemy.size) / 2;
    const currentPixelY = currentPoint.y * cellSize + (cellSize - enemy.size) / 2;
    const nextPixelX = nextPoint.x * cellSize + (cellSize - enemy.size) / 2;
    const nextPixelY = nextPoint.y * cellSize + (cellSize - enemy.size) / 2;

    const segmentDx = nextPixelX - currentPixelX;
    const segmentDy = nextPixelY - currentPixelY;
    const segmentLength = Math.sqrt(segmentDx * segmentDx + segmentDy * segmentDy);

    if (enemy.pathProgress >= segmentLength) {
        enemy.pathProgress -= segmentLength;
        enemy.pathIndex++;
        // Recalculate based on new segment
        moveEnemy(enemy, 0); // Call with 0 deltaTime to snap to the new path segment start
        return;
    }

    const percentMove = enemy.pathProgress / segmentLength;
    const newX = currentPixelX + segmentDx * percentMove;
    const newY = currentPixelY + segmentDy * percentMove;

    enemy.position.x = newX;
    enemy.position.y = newY;
    
    // Use transform for smoother animation
    enemy.element.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
}

// Update enemy health bar
function updateEnemyHealth(enemy) {
    const healthPercent = Math.max(0, enemy.health / enemy.maxHealth);
    enemy.healthBar.style.width = `${healthPercent * 100}%`;
}

// Kill enemy and give reward
function killEnemy(enemy) {
    if (!enemy.element || enemy.isKilled) return;
    enemy.isKilled = true;

    // Handle 'plagueSpread' ability
    if (enemy.effects.poison && enemy.effects.poison.specialAbilities && enemy.effects.poison.specialAbilities.plagueSpread) {
        const enemyCenterX = enemy.position.x + enemy.size / 2;
        const enemyCenterY = enemy.position.y + enemy.size / 2;
        const nearbyEnemies = findNearbyEnemies(enemyCenterX, enemyCenterY, 80, 5); // Spread in 80px radius
        for (const nearby of nearbyEnemies) {
            if (nearby !== enemy && !nearby.effects.poison) {
                applyPoisonEffect(nearby, enemy.effects.poison.damage * 0.5, enemy.effects.poison.duration, enemy.effects.poison.sourceTower);
            }
        }
    }

    money += enemy.money;
    updateMoneyDisplay();

    removeEnemyFromGame(enemy, true);
}

// Remove enemy from game
function removeEnemyFromGame(enemy, wasKilled) {
    if (!enemy || !enemy.element) return;

    enemy.element.remove();
    enemy.element = null;

    const index = enemies.indexOf(enemy);
    if (index !== -1) {
        enemies.splice(index, 1);
    }

    if (wasKilled) {
        killedEnemiesCount++;
    }

    if (enemies.length === 0 && waveInProgress) {
        waveComplete(wasKilled);
    }
}

// Wave complete
function waveComplete(allEnemiesKilled) {
    waveInProgress = false;

    document.getElementById('start-wave').disabled = false;

    if (allEnemiesKilled) {
        const waveBonus = wave * 50;
        money += waveBonus;
        updateMoneyDisplay();

        showWaveCompletionMessage(waveBonus);
    }

    if (autoStartEnabled) {
        setTimeout(startWave, 2000);
    }
}

// Show wave completion message
function showWaveCompletionMessage(waveBonus) {
    const gameBoard = document.getElementById('game-board');

    const message = document.createElement('div');
    message.classList.add('wave-completion-message');

    message.innerHTML = `
        <div>Wave ${wave} Complete!</div>
        <div>Bonus: +$${waveBonus}</div>
    `;

    gameBoard.appendChild(message);

    setTimeout(() => {
        message.classList.add('show');

        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => message.remove(), 500);
        }, 2000);
    }, 100);
}

// Game over
function gameOver() {
    gameRunning = false;
    if (gameLoopId) {
        cancelAnimationFrame(gameLoopId);
        gameLoopId = null;
    }

    // Populate and show the game over screen
    const gameOverScreen = document.getElementById('game-over-screen');
    document.getElementById('final-wave').textContent = wave;
    document.getElementById('final-enemies').textContent = killedEnemiesCount;
    gameOverScreen.style.display = 'flex';
}

// Start game loop
function startGameLoop() {
    if (gameLoopId) {
        cancelAnimationFrame(gameLoopId);
    }
    lastFrameTime = performance.now();

    function gameUpdate(timestamp) {
        if (!gameRunning) {
            if (gameLoopId) {
                cancelAnimationFrame(gameLoopId);
                gameLoopId = null;
            }
            return;
        }

        const deltaTime = (timestamp - lastFrameTime); // Milliseconds
        lastFrameTime = timestamp;
        const scaledDeltaTime = deltaTime * gameSpeed; // Milliseconds
        const scaledDeltaTimeSeconds = scaledDeltaTime / 1000; // Seconds

        for (const enemy of [...enemies]) {
            moveEnemy(enemy, scaledDeltaTimeSeconds);
            updateEnemy(enemy, scaledDeltaTime);
        }
        
        // Update money in upgrade menu if it's open
        if (selectedUpgradeTower) {
            updateUpgradeMenuMoney();
        }

        for (const tower of towers) {
            updateTower(tower, scaledDeltaTime);
        }

        updateProjectiles(scaledDeltaTimeSeconds);
        updateBeams(scaledDeltaTime);

        if (gameRunning) {
            gameLoopId = requestAnimationFrame(gameUpdate);
        }
    }

    gameLoopId = requestAnimationFrame(gameUpdate);
}

// Find the closest enemy within a tower's range
function findClosestEnemyInRange(tower, range) {
    let closestEnemy = null;
    let minDistance = Infinity;

    const towerCenterX = tower.x * cellSize + cellSize / 2;
    const towerCenterY = tower.y * cellSize + cellSize / 2;
    const rangeInPixels = range * cellSize;

    for (const enemy of enemies) {
        if (!enemy.element || enemy.health <= 0) continue;

        const enemyCenterX = enemy.position.x + enemy.size / 2;
        const enemyCenterY = enemy.position.y + enemy.size / 2;
        const dx = enemyCenterX - towerCenterX;
        const dy = enemyCenterY - towerCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= rangeInPixels && distance < minDistance) {
            minDistance = distance;
            closestEnemy = enemy;
        }
    }
    return closestEnemy;
}

// Aim turret at a specific enemy
function aimTurretAt(tower, enemy) {
    if (!tower.turret) return;

    const towerCenterX = tower.x * cellSize + cellSize / 2;
    const towerCenterY = tower.y * cellSize + cellSize / 2;
    const enemyCenterX = enemy.position.x + enemy.size / 2;
    const enemyCenterY = enemy.position.y + enemy.size / 2;

    const dx = enemyCenterX - towerCenterX;
    const dy = enemyCenterY - towerCenterY;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    tower.turret.style.transform = `rotate(${angle}deg)`;
}

// Update tower logic
function updateTower(tower, deltaTime) {
    // --- Buff Calculation ---
    // Find auras affecting this tower
    const externalBuffs = findAurasForTower(tower);
    // Recalculate stats including buffs
    const stats = getTowerCurrentStats(tower, externalBuffs);
    tower.currentStats = stats; // Cache the buffed stats for this frame

    // Handle income generation for all towers that have it
    if (stats.incomeRate > 0) {
        tower.incomeTimer = (tower.incomeTimer || 0) + deltaTime;
        const incomeInterval = 1000; // per second
        if (tower.incomeTimer >= incomeInterval) {
            const incomeGenerated = Math.floor(tower.incomeTimer / incomeInterval) * stats.incomeRate;
            if (incomeGenerated > 0) {
                money += incomeGenerated;
                updateMoneyDisplay();
                // Optionally show floating text here
            }
            tower.incomeTimer %= incomeInterval;
        }
    }

    // Skip attack logic for non-attacking towers (like pure aura villages)
    if (stats.nonAttacking) {
        // Future logic for non-attacking towers can go here
        return;
    }

    // --- Target Acquisition Logic ---
    let modifiedRange = stats.range;
    if (stats.specialAbilities) {
        if (stats.specialAbilities.radarSweep && tower.lastKillTime) {
            const timeSinceKill = performance.now() - tower.lastKillTime;
            if (timeSinceKill < 3000) modifiedRange += 2;
        }
        if (stats.specialAbilities.globalRange) modifiedRange = 100;
    }
    const rangeInPixels = modifiedRange * cellSize;

    // Check if current target is still valid
    if (tower.targetEnemy) {
        if (!tower.targetEnemy.element || tower.targetEnemy.health <= 0) {
            tower.targetEnemy = null; // Target is dead
        } else {
            const towerCenterX = tower.x * cellSize + cellSize / 2;
            const towerCenterY = tower.y * cellSize + cellSize / 2;
            const enemyCenterX = tower.targetEnemy.position.x + tower.targetEnemy.size / 2;
            const enemyCenterY = tower.targetEnemy.position.y + tower.targetEnemy.size / 2;
            const dx = enemyCenterX - towerCenterX;
            const dy = enemyCenterY - towerCenterY;
            if (Math.sqrt(dx * dx + dy * dy) > rangeInPixels) {
                tower.targetEnemy = null; // Target is out of range
            }
        }
    }
    
    // Find new target if we don't have one
    if (!tower.targetEnemy) {
        tower.targetEnemy = findClosestEnemyInRange(tower, stats.range);
    }
    // --- End Target Logic ---

    if (tower.targetEnemy) {
        aimTurretAt(tower, tower.targetEnemy);

        const currentTime = performance.now();
        const elapsedTime = currentTime - tower.lastFired;

        const fireInterval = stats.fireRate > 0 ? (1000 / stats.fireRate) : Infinity;

        if (elapsedTime >= fireInterval) {
            attackEnemy(tower, tower.targetEnemy, stats);
            tower.lastFired = currentTime;
        }
    }
}

// Fire a projectile from a tower
function fireProjectile(tower, target, startX, startY, stats) {
    const gameBoard = document.getElementById('game-board');

    // Handle multi-shot abilities
    const specialAbilities = stats.specialAbilities || {};
    let projectileCount = stats.projectileCount || 1; // Use base stat if available

    if (specialAbilities.tripleShot && specialAbilities.tripleShot.enabled) {
        projectileCount = 3;
    } else if (specialAbilities.dualShot && specialAbilities.dualShot.enabled && Math.random() < 0.5) {
        projectileCount = 2;
    }
    
    // Determine the angle to the primary target
    const targetX = target.position.x + target.size / 2;
    const targetY = target.position.y + target.size / 2;
    const dx = targetX - startX;
    const dy = targetY - startY;
    const baseAngle = Math.atan2(dy, dx); // in radians

    const spread = 15 * Math.PI / 180; // 15 degrees total spread

    for (let i = 0; i < projectileCount; i++) {
        const projectileElement = document.createElement('div');
        projectileElement.classList.add('projectile');
        if (tower.type) {
            projectileElement.classList.add(`projectile-${tower.type}`);
        }

        // Calculate the angle for this specific projectile
        let finalAngle = baseAngle;
        if (projectileCount > 1) {
            const spreadPerProjectile = spread / (projectileCount > 1 ? projectileCount - 1 : 1);
            finalAngle += (i - (projectileCount - 1) / 2) * spreadPerProjectile;
        }
        
        const projectile = {
            element: projectileElement,
            towerId: tower.id,
            x: startX,
            y: startY,
            speed: stats.projectileSpeed || 10,
            damage: stats.damage,
            angle: finalAngle, // Store angle for non-homing projectiles
            stats: stats,
            isCritical: false,
            pierceCount: stats.pierceCount || 0,
            ignoredTargets: []
        };

        // Critical strike check
        if (specialAbilities.deadlyStrike && specialAbilities.deadlyStrike.enabled && Math.random() < (specialAbilities.deadlyStrike.chance || 0.5)) {
            projectile.damage *= 3;
            projectile.isCritical = true;
        } else if (specialAbilities.criticalStrike && specialAbilities.criticalStrike.enabled && Math.random() < (specialAbilities.criticalStrike.chance || 0.35)) {
            projectile.damage *= 2;
            projectile.isCritical = true;
        }

        projectileElement.style.left = `${projectile.x}px`;
        projectileElement.style.top = `${projectile.y}px`;

        gameBoard.appendChild(projectileElement);
        projectiles.push(projectile);
    }
}

// Attack enemy based on tower type
function attackEnemy(tower, target, stats) {
    const towerCenterX = tower.x * cellSize + cellSize / 2;
    const towerCenterY = tower.y * cellSize + cellSize / 2;

    const towerType = tower.type;

    if (towerType === 'laser' || (!TOWER_STATS[towerType] && stats.beamDuration)) { // Standard laser or custom laser
        createLaserBeam(tower, target, stats);
        if (stats.specialAbilities && stats.specialAbilities.multibeam) {
            const otherTargets = findNearbyEnemies(towerCenterX, towerCenterY, stats.range * cellSize, 3).filter(e => e !== target);
            if (otherTargets[0]) createLaserBeam(tower, otherTargets[0], stats, 0.5);
            if (otherTargets[1]) createLaserBeam(tower, otherTargets[1], stats, 0.5);
        }
    } else if (towerType === 'lightning' || (!TOWER_STATS[towerType] && stats.chainTargets)) { // Standard lightning or custom lightning
        createLightningEffect(tower, target, stats);
    } else { // All other projectile towers (basic, sniper, splash, bomb, frost, poison, and custom)
        fireProjectile(tower, target, towerCenterX, towerCenterY, stats);
    }
}

// Create lightning effect that chains to nearby enemies
function createLightningEffect(tower, primaryTarget, stats) {
    const gameBoard = document.getElementById('game-board');

    // Initial hit visual
    const towerCenterX = tower.x * cellSize + cellSize / 2;
    const towerCenterY = tower.y * cellSize + cellSize / 2;

    const primaryTargetCenter = {
        x: primaryTarget.position.x + primaryTarget.size / 2,
        y: primaryTarget.position.y + primaryTarget.size / 2
    };

    const initialDx = primaryTargetCenter.x - towerCenterX;
    const initialDy = primaryTargetCenter.y - towerCenterY;
    const initialDistance = Math.sqrt(initialDx * initialDx + initialDy * initialDy);
    const initialAngle = Math.atan2(initialDy, initialDx) * 180 / Math.PI;

    const initialChainLink = document.createElement('div');
    initialChainLink.classList.add('lightning-chain');
    initialChainLink.style.width = `${initialDistance}px`;
    initialChainLink.style.left = `${towerCenterX}px`;
    initialChainLink.style.top = `${towerCenterY}px`;
    initialChainLink.style.transform = `rotate(${initialAngle}deg)`;
    gameBoard.appendChild(initialChainLink);
    setTimeout(() => initialChainLink.remove(), 200);

    // Apply initial damage
    applyDamageToEnemy(primaryTarget, stats.damage, tower);
    if (stats.specialAbilities && stats.specialAbilities.overload && Math.random() < (stats.specialAbilities.overload.chance || 0.3)) {
        const stunDuration = stats.specialAbilities.overload.stunDuration || 0.5;
        stunEnemy(primaryTarget, stunDuration);
    }

    let lastTargetCenter = primaryTargetCenter;

    for (let i = 0; i < stats.chainTargets; i++) {
        let nextTarget = findClosestEnemyInRangeOfPoint(lastTargetCenter.x, lastTargetCenter.y, 100, [primaryTarget]);
        if (!nextTarget) break;

        // Apply chained damage
        const damage = stats.damage * (stats.chainDamageReduction || 0.6);
        applyDamageToEnemy(nextTarget, damage, tower);
        if (stats.specialAbilities && stats.specialAbilities.overload && Math.random() < (stats.specialAbilities.overload.chance || 0.3)) {
            const stunDuration = stats.specialAbilities.overload.stunDuration || 0.5;
            stunEnemy(nextTarget, stunDuration);
        }

        // Create visual chain link
        const nextTargetCenter = {
            x: nextTarget.position.x + nextTarget.size / 2,
            y: nextTarget.position.y + nextTarget.size / 2,
        };

        const dx = nextTargetCenter.x - lastTargetCenter.x;
        const dy = nextTargetCenter.y - lastTargetCenter.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;

        const chainLink = document.createElement('div');
        chainLink.classList.add('lightning-chain');
        chainLink.style.width = `${distance}px`;
        chainLink.style.left = `${lastTargetCenter.x}px`;
        chainLink.style.top = `${lastTargetCenter.y}px`;
        chainLink.style.transform = `rotate(${angle}deg)`;

        gameBoard.appendChild(chainLink);
        setTimeout(() => chainLink.remove(), 200);

        lastTargetCenter = nextTargetCenter;
    }
}

// Create laser beam
function createLaserBeam(tower, target, stats, damageMultiplier = 1) {
    const gameBoard = document.getElementById('game-board');

    const towerCenterX = tower.x * cellSize + cellSize / 2;
    const towerCenterY = tower.y * cellSize + cellSize / 2;

    const targetCenterX = target.position.x + target.size / 2;
    const targetCenterY = target.position.y + target.size / 2;

    const dx = targetCenterX - towerCenterX;
    const dy = targetCenterY - towerCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    const beam = document.createElement('div');
    beam.classList.add('laser-beam');

    if (stats.specialAbilities) {
        if (stats.specialAbilities.deathStar) {
            beam.style.height = '8px';
            beam.style.boxShadow = '0 0 12px 4px #E91E63';
        } else if (stats.specialAbilities.multibeam) {
            beam.style.height = '3px';
            beam.style.opacity = '0.7';
        }
    }

    beam.style.width = `${distance}px`;
    beam.style.left = `${towerCenterX}px`;
    beam.style.top = `${towerCenterY}px`;
    beam.style.transform = `rotate(${angle}deg)`;

    gameBoard.appendChild(beam);

    const beamInfo = {
        element: beam,
        tower: tower,
        target: target,
        damage: stats.damage * damageMultiplier,
        duration: stats.beamDuration * 1000, // in ms
        elapsedTime: 0,
        hitTime: 0,
        damageMultiplier: 1,
        specialAbilities: stats.specialAbilities
    };

    beams.push(beamInfo);
}

function updateBeams(deltaTime) {
    for (let i = beams.length - 1; i >= 0; i--) {
        const beam = beams[i];
        beam.elapsedTime += deltaTime;

        if (beam.elapsedTime >= beam.duration || !beam.target || !beam.target.element || beam.target.health <= 0) {
            beam.element.remove();
            beams.splice(i, 1);
            continue;
        }
        
        // Update beam visual position to track target
        const towerCenterX = beam.tower.x * cellSize + cellSize / 2;
        const towerCenterY = beam.tower.y * cellSize + cellSize / 2;
        const targetCenterX = beam.target.position.x + beam.target.size / 2;
        const targetCenterY = beam.target.position.y + beam.target.size / 2;

        const dx = targetCenterX - towerCenterX;
        const dy = targetCenterY - towerCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;

        beam.element.style.width = `${distance}px`;
        beam.element.style.transform = `rotate(${angle}deg)`;

        // Deal damage periodically
        beam.hitTime += deltaTime;
        if (beam.hitTime >= 100) { // every 100ms
             if (beam.specialAbilities && beam.specialAbilities.atomizer &&
                beam.target.health < beam.target.maxHealth * 0.4) {
                beam.target.health = 0;
                applyDamageToEnemy(beam.target, 0, beam.tower);
            } else {
                applyDamageToEnemy(beam.target, beam.damage * beam.damageMultiplier, beam.tower);
            }

            if (beam.specialAbilities && beam.specialAbilities.prismaticBeam) {
                const nearbyEnemies = findNearbyEnemies(targetCenterX, targetCenterY, 60, 2);
                for (const nearbyEnemy of nearbyEnemies) {
                    if (nearbyEnemy !== beam.target) {
                        applyDamageToEnemy(nearbyEnemy, beam.damage * 0.5, beam.tower);
                    }
                }
             }
             if (beam.specialAbilities && beam.specialAbilities.quantumTunneling) {
                const lineEndX = towerCenterX + Math.cos(angle * Math.PI / 180) * 1000;
                const lineEndY = towerCenterY + Math.sin(angle * Math.PI / 180) * 1000;

                for (const enemy of enemies) {
                    if (enemy !== beam.target && isEnemyInLine(enemy, towerCenterX, towerCenterY, lineEndX, lineEndY)) {
                        applyDamageToEnemy(enemy, beam.damage * 0.7, beam.tower);
                    }
                }
            }

            beam.hitTime %= 100;
        }
    }
}

// Update projectiles movement
function updateProjectiles(deltaTime) {
    for (let i = projectiles.length - 1; i >= 0; i--) {
        const p = projectiles[i];

        if (!p.element) {
            projectiles.splice(i, 1);
            continue;
        }

        // Move projectile in a straight line
        const moveDistance = p.speed * 50 * deltaTime;
        p.x += Math.cos(p.angle) * moveDistance;
        p.y += Math.sin(p.angle) * moveDistance;
        p.element.style.transform = `translate(-50%, -50%)`;
        p.element.style.left = `${p.x}px`;
        p.element.style.top = `${p.y}px`;

        let consumed = false;

        // Check for collision with any enemy
        for (const enemy of enemies) {
            if (!enemy.element || enemy.health <= 0 || p.ignoredTargets.includes(enemy)) {
                continue;
            }

            const enemyX = enemy.position.x + enemy.size / 2;
            const enemyY = enemy.position.y + enemy.size / 2;
            const projDistance = Math.sqrt(Math.pow(p.x - enemyX, 2) + Math.pow(p.y - enemyY, 2));

            if (projDistance < (enemy.size / 2) + 4) { // 4 is half projectile width
                handleProjectileHit(p, enemy);
                
                if (p.pierceCount > 0) {
                    p.pierceCount--;
                    p.ignoredTargets.push(enemy);
                    // Projectile continues
                } else {
                    consumed = true;
                    break; // Projectile is consumed, stop checking enemies
                }
            }
        }

        // Remove if consumed or off-screen
        const offScreen = p.x < -20 || p.x > gridWidth * cellSize + 20 || p.y < -20 || p.y > gridHeight * cellSize + 20;
        if (consumed || offScreen) {
            p.element.remove();
            projectiles.splice(i, 1);
        }
    }
}

function handleProjectileHit(projectile, enemy) {
    const sourceTower = towers.find(t => t.id === projectile.towerId);
    if (!sourceTower) return;

    if (projectile.stats.splashRadius) {
        applySplashDamage(
            enemy.position.x + enemy.size / 2,
            enemy.position.y + enemy.size / 2,
            projectile.damage,
            projectile.stats.splashRadius * 30,
            sourceTower, { isCritical: projectile.isCritical, stats: projectile.stats }
        );
    } else {
        applyDamageToEnemy(enemy, projectile.damage, sourceTower, { isCritical: projectile.isCritical });
        if (projectile.stats.type === 'frost' || (projectile.stats.slowPercent > 0)) {
            applySlowEffect(enemy, projectile.stats.slowPercent, projectile.stats.slowDuration);
        } else if (projectile.stats.type === 'poison' || projectile.stats.poisonDamage > 0) {
            applyPoisonEffect(enemy, projectile.stats.poisonDamage, projectile.stats.poisonDuration, sourceTower);
        }
    }
}

// Apply slow effect to enemy
function applySlowEffect(enemy, slowPercent, slowDuration) {
    if (!enemy || !enemy.element || enemy.health <= 0 || (enemy.effects.stun && enemy.effects.stun.duration > 0)) return;
    
    // If the enemy is completely frozen, don't apply a lesser slow effect.
    if (enemy.effects.frozen) return;

    if (!enemy.effects.slow || slowPercent > (enemy.effects.slow.percent || 0)) {
        const originalSpeed = enemy.effects.slow ? 
            enemy.effects.slow.originalSpeed : enemy.speed;

        // Speed modification is now handled in moveEnemy, we just set the effect data
        enemy.effects.slow = {
            percent: slowPercent,
            duration: slowDuration
        };

        if (!enemy.element.querySelector('.slow-effect')) {
            const slowEffect = document.createElement('div');
            slowEffect.classList.add('status-effect', 'slow-effect');
            enemy.element.appendChild(slowEffect);
        }
    } else {
        enemy.effects.slow.duration = Math.max(enemy.effects.slow.duration, slowDuration);
    }
}

// Stun an enemy
function stunEnemy(enemy, duration) {
    if (!enemy || !enemy.element || enemy.health <= 0 || (enemy.effects.stun && enemy.effects.stun.duration > 0)) return;

    enemy.effects.stun = { duration: duration };
    const stunEffectEl = document.createElement('div');
    stunEffectEl.classList.add('status-effect', 'stun-effect');
    enemy.element.appendChild(stunEffectEl);
}

// Apply poison damage to an enemy
function applyPoisonEffect(enemy, poisonDamage, poisonDuration, sourceTower) {
    if (!enemy || !enemy.element || enemy.health <= 0) return;

    if (!enemy.effects.poison || poisonDamage > (enemy.effects.poison.damage || 0)) {
        enemy.effects.poison = {
            damage: poisonDamage,
            duration: poisonDuration,
            tickTime: 1000, // Damage every second
            sourceTower: sourceTower,
            specialAbilities: sourceTower.currentStats.specialAbilities
        };

        if (!enemy.element.querySelector('.poison-effect')) {
            const poisonEffectDiv = document.createElement('div');
            poisonEffectDiv.classList.add('status-effect', 'poison-effect');
            enemy.element.appendChild(poisonEffectDiv);
        }
    } else {
        // If already poisoned, refresh duration if the new duration is longer
        enemy.effects.poison.duration = Math.max(enemy.effects.poison.duration, poisonDuration);
    }
}

// Apply damage to an enemy
function applyDamageToEnemy(enemy, damage, sourceTower, options = {}) {
    if (enemy.health <= 0) return;

    let finalDamage = damage;
    // Handle 'corrosiveAcid' (vulnerability)
    if (enemy.effects.vulnerable) {
        finalDamage *= (1 + enemy.effects.vulnerable.multiplier);
    }

    enemy.health -= finalDamage;

    if (sourceTower) {
        enemy.lastHitBy = sourceTower;
        if (sourceTower.currentStats.cashPerHit > 0 && damage > 0) {
            money += sourceTower.currentStats.cashPerHit;
            updateMoneyDisplay();
            // Could add a floating text for money gain
        }
    }

    updateEnemyHealth(enemy);

    showDamageText(enemy, finalDamage, options.isPoison, options.isCritical);

    if (enemy.health <= 0 && !enemy.isKilled) {
        killEnemy(enemy);
    }
}

// Show damage text with critical indicator
function showDamageText(enemy, damage, isPoison, isCritical) {
    const gameBoard = document.getElementById('game-board');

    const damageText = document.createElement('div');
    damageText.classList.add('damage-text');

    if (isPoison) {
        damageText.classList.add('poison-damage');
    }

    if (isCritical) {
        damageText.classList.add('critical-damage');
    }

    damageText.textContent = Math.round(damage);
    const x = enemy.position.x + enemy.size / 2;
    const y = enemy.position.y;

    damageText.style.left = `${x}px`;
    damageText.style.top = `${y}px`;

    gameBoard.appendChild(damageText);

    setTimeout(() => {
        damageText.style.opacity = '0';
        damageText.style.transform = 'translate(-50%, -150%)';
        setTimeout(() => damageText.remove(), 500);
    }, 10);
}

// Find nearby enemies within radius
function findNearbyEnemies(centerX, centerY, radius, maxCount) {
    const nearbyEnemies = [];

    for (const enemy of enemies) {
        if (!enemy.element || enemy.health <= 0) continue; // Also check health
        
        const enemyCenterX = enemy.position.x + enemy.size / 2;
        const enemyCenterY = enemy.position.y + enemy.size / 2;
        
        const dx = enemyCenterX - centerX;
        const dy = enemyCenterY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance <= radius) {
            nearbyEnemies.push(enemy);

            if (nearbyEnemies.length >= maxCount) break;
        }
    }
    
    return nearbyEnemies;
}

// Find closest enemy from a point, excluding some targets
function findClosestEnemyInRangeOfPoint(x, y, range, excludeEnemies) {
    let closestEnemy = null;
    let minDistance = Infinity;

    for (const enemy of enemies) {
        if (excludeEnemies.includes(enemy) || !enemy.element) continue;

        const enemyCenterX = enemy.position.x + enemy.size / 2;
        const enemyCenterY = enemy.position.y + enemy.size / 2;
        const dx = enemyCenterX - x;
        const dy = enemyCenterY - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= range && distance < minDistance) {
            minDistance = distance;
            closestEnemy = enemy;
        }
    }

    return closestEnemy;
}

// Update enemy
function updateEnemy(enemy, deltaTime) {
    const deltaTimeSeconds = deltaTime / 1000;

    if (enemy.effects && enemy.effects.poison) {
        enemy.effects.poison.tickTime -= deltaTime;
        
        if (enemy.effects.poison.tickTime <= 0) {
            let poisonDamage = enemy.effects.poison.damage;
            const sourceTower = enemy.effects.poison.sourceTower;
            
            // Apply special abilities for poison
            if (enemy.effects.poison.specialAbilities) {
                if (enemy.effects.poison.specialAbilities.corrosiveAcid) {
                    // Apply vulnerable effect instead of direct damage modification
                    if (!enemy.effects.vulnerable) {
                         enemy.effects.vulnerable = { multiplier: 0.25, duration: 2 }; // Take 25% more damage for 2s
                    } else {
                         enemy.effects.vulnerable.duration = Math.max(enemy.effects.vulnerable.duration, 2);
                    }
                }
                
                if (enemy.effects.poison.specialAbilities.disintegration) {
                    // Disintegration deals percentage-based damage
                    poisonDamage = Math.max(poisonDamage, enemy.maxHealth * 0.03);
                }
            }
            
            applyDamageToEnemy(enemy, poisonDamage, sourceTower, {isPoison: true});
            
            if (enemy.health <= 0) {
                // The enemy might already be killed by applyDamageToEnemy, but check again
                if (!enemy.isKilled) killEnemy(enemy);
            }
            
            enemy.effects.poison.tickTime = 1000;
            enemy.effects.poison.duration -= 1;
            
            if (enemy.effects.poison.duration <= 0) {
                delete enemy.effects.poison;
                const poisonEffect = enemy.element?.querySelector('.poison-effect');
                if (poisonEffect) {
                    poisonEffect.remove();
                }
            }
        }
    }
    
    // Check for vulnerable effect
    if (enemy.effects && enemy.effects.vulnerable) {
        enemy.effects.vulnerable.duration -= deltaTimeSeconds;
        if (enemy.effects.vulnerable.duration <= 0) {
            delete enemy.effects.vulnerable;
        }
    }

    // Check for slow effect
    if (enemy.effects && enemy.effects.slow) {
        enemy.effects.slow.duration -= deltaTimeSeconds;
        
        if (enemy.effects.slow.duration <= 0) {
            delete enemy.effects.slow;
            
            const slowEffect = enemy.element?.querySelector('.slow-effect');
            if (slowEffect) {
                slowEffect.remove();
            }
        }
    }

    // Check for stun effect
    if (enemy.effects && enemy.effects.stun) {
        enemy.effects.stun.duration -= deltaTimeSeconds;

        if (enemy.effects.stun.duration <= 0) {
            delete enemy.effects.stun;
            const stunEffect = enemy.element?.querySelector('.stun-effect');
            if (stunEffect) {
                stunEffect.remove();
            }
        }
    }
}

// Create lingering effect area
function createLingeringEffectArea(centerX, centerY, radius, damagePerSecond, duration) {
    const gameBoard = document.getElementById('game-board');

    const effectArea = document.createElement('div');
    effectArea.classList.add('lingering-effect');
    effectArea.style.width = `${radius * 2}px`;
    effectArea.style.height = `${radius * 2}px`;
    effectArea.style.left = `${centerX}px`;
    effectArea.style.top = `${centerY}px`;
    effectArea.style.transform = 'translate(-50%, -50%)';
    effectArea.style.opacity = '0.7';

    gameBoard.appendChild(effectArea);

    const damageInterval = setInterval(() => {
        for (const enemy of enemies) {
            const enemyCenterX = enemy.position.x + enemy.size / 2;
            const enemyCenterY = enemy.position.y + enemy.size / 2;

            const dx = enemyCenterX - centerX;
            const dy = enemyCenterY - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= radius) {
                const falloff = 1 - (distance / radius) * 0.5;
                const damage = damagePerSecond * falloff;

                applyDamageToEnemy(enemy, damage);
            }
        }
    }, 1000);

    setTimeout(() => {
        clearInterval(damageInterval);
        effectArea.style.opacity = '0';
        setTimeout(() => effectArea.remove(), 500);
    }, duration * 1000);
}

// Update money in upgrade menu
function updateUpgradeMenuMoney() {
    if (!selectedUpgradeTower) return;
    document.getElementById('money').textContent = money;
    
    // Update upgrade buttons based on current money
    for (let i = 0; i < 3; i++) {
        const currentLevel = selectedUpgradeTower.upgradeLevels[i];
        if (currentLevel < 5) {
            const cost = selectedUpgradeTower.upgradeCosts[i];
            const upgradeBtn = document.getElementById(`upgrade-path${i+1}`);
            upgradeBtn.disabled = money < cost;
        }
    }
}

function getUpgradeDescription(towerType, pathIndex, upgrade, tower) {
    let description = upgrade.description;
    
    // Replace placeholders with actual values
    if (description.includes('{fireRate}')) {
        description = description.replace('{fireRate}', `${upgrade.fireRateBonus}%`);
    }
    
    if (description.includes('{damage}')) {
        description = description.replace('{damage}', `${upgrade.damageBonus}`);
    }
    
    if (description.includes('{range}')) {
        description = description.replace('{range}', `${upgrade.rangeBonus}`);
    }
    
    if (description.includes('{splash}')) {
        description = description.replace('{splash}', `${upgrade.splashRadiusBonus}`);
    }
    
    if (description.includes('{slow}')) {
        description = description.replace('{slow}', `${upgrade.slowPercentBonus}`);
    }
    
    if (description.includes('{duration}')) {
        if (upgrade.slowDurationBonus) {
            description = description.replace('{duration}', `${upgrade.slowDurationBonus}s`);
        } else if (upgrade.poisonDurationBonus) {
            description = description.replace('{duration}', `${upgrade.poisonDurationBonus}s`);
        } else if (upgrade.beamDurationBonus) {
            description = description.replace('{duration}', `${upgrade.beamDurationBonus}s`);
        }
    }
    
    if (description.includes('{chainTargets}')) {
        description = description.replace('{chainTargets}', `${upgrade.chainTargetsBonus}`);
    }
    
    if (description.includes('{projectileSpeed}')) {
        description = description.replace('{projectileSpeed}', `${upgrade.projectileSpeedBonus}`);
    }
    
    if (description.includes('{spikeHits}')) {
        description = description.replace('{spikeHits}', `${upgrade.spikeHitsBonus}`);
    }
    
    // Wrap stats in value class for styling
    description = description.replace(/(\d+%|\d+\.?\d*s?)/g, '<span class="value">$1</span>');
    
    return description;
}

// --- AI Tower Creation ---

let AI_SYSTEM_PROMPT = `You are an expert tower defense game designer and balancer. Your task is to design a new tower based on a user's description, ensuring it is balanced with the existing towers in the game. An overpowered tower will ruin the game. You must output your design as a single JSON object, and nothing else. Your response must be valid JSON.

{TOWER_DATA_PLACEHOLDER}

Follow this JSON schema strictly:
{
  "type": "string (lowercase, one word, e.g., 'sunstone')",
  "name": "string (The display name, e.g., 'Sunstone')",
  "cost": "number (base cost, between 100 and 800)",
  "visuals": {
    "components": [
      {
        "shape": "string ('circle' or 'rectangle')",
        "color": "string (hex color)",
        "size": { "width": "number (percentage of tower size)", "height": "number (percentage of tower size)" },
        "position": { "x": "number (percentage offset from center)", "y": "number (percentage offset from center)" },
        "zIndex": "number (optional, for layering)",
        "isTurret": "boolean (optional, exactly ONE component should be the turret to rotate)"
      }
    ]
  },
  "baseStats": {
    "damage": "number",
    "fireRate": "number (attacks per second)",
    "range": "number (grid units, 2-8)",
    "projectileSpeed": "number (optional, for projectile towers, 5-25)",
    "projectileCount": "number (optional, for shotgun-style towers, e.g., 4)",
    "spreadAngle": "number (optional, for shotgun-style towers, in degrees, e.g., 30)",
    "splashRadius": "number (optional, for splash towers, grid units, 1-4)",
    "slowPercent": "number (optional, for frost towers, 10-50)",
    "slowDuration": "number (optional, for frost towers, seconds, 1-3)",
    "stunDuration": "number (optional, for stun towers, seconds, 0.2-2)",
    "poisonDamage": "number (optional, for poison towers, damage per second)",
    "poisonDuration": "number (optional, for poison towers, seconds, 2-5)",
    "chainTargets": "number (optional, for lightning towers, 2-5)",
    "beamDuration": "number (optional, for laser towers, seconds, 1-3)",
    "nonAttacking": "boolean (optional, if true, tower is for support and does not attack)",
    "incomeRate": "number (optional, money generated per second)",
    "cashPerHit": "number (optional, money gained per projectile hit)",
    "cashPerKill": "number (optional, money gained on kill)",
    "auraRange": "number (optional, for buffing towers, grid units)",
    "auraBuffs": {
       "damageBonus": "number (optional, flat damage increase)",
       "fireRateBonus": "number (optional, percentage increase e.g. 10 for 10%)",
       "rangeBonus": "number (optional, flat range increase)"
    }
  },
  "upgradePaths": [
    {
      "name": "string (e.g., 'Solar Flare')",
      "levels": [
        { "cost": "number", "description": "string (e.g., 'Increases aura range and buff power')", "auraRangeBonus": "number (optional)", "auraBuffs": { "fireRateBonus": "number (optional)" } },
        { "cost": "number", "description": "string", "fireRateBonus": "number (optional, percentage)" },
        { "cost": "number", "description": "string", "rangeBonus": "number (optional)" },
        { "cost": "number", "description": "string", "specialAbility": "string (optional)", "chance": "number (optional, from 0.0 to 1.0)" },
        { "cost": "number", "description": "string", "specialAbility": "string (optional)", "chance": "number (optional, from 1.0)" }
      ]
    },
    {
      "name": "string (e.g., 'Path 2')",
      "levels": [
        { "cost": "number", "description": "string" },
        { "cost": "number", "description": "string" },
        { "cost": "number", "description": "string" },
        { "cost": "number", "description": "string" },
        { "cost": "number", "description": "string" }
      ]
    },
    {
      "name": "string (e.g., 'Path 3')",
      "levels": [
        { "cost": "number", "description": "string" },
        { "cost": "number", "description": "string" },
        { "cost": "number", "description": "string" },
        { "cost": "number", "description": "string" },
        { "cost": "number", "description": "string" }
      ]
    }
  ]
}

When defining an upgrade level, you can add or increase any of the base stats by including the corresponding "Bonus" key (e.g., \`damageBonus\`, \`rangeBonus\`). To improve an aura, an upgrade can include \`"auraRangeBonus": 0.5\` or \`"auraBuffs": { "damageBonus": 1 }\`. These will be ADDED to the tower's current stats.

Available "specialAbility" keywords for tier 4 & 5 upgrades: dualShot, tripleShot, criticalStrike, deadlyStrike, piercing, explosiveRounds, shockwave, flashFreeze, corrosiveAcid, plagueSpread, overload, multibeam, deathStar. The Tier 5 ability should be a clear evolution of the Tier 4 ability (e.g., 'dualShot' becomes 'tripleShot').

Visuals Guide:
- The \`visuals.components\` array lets you build a custom tower model. Be creative!
- You MUST designate exactly one component with \`"isTurret": true\` for towers that attack. For non-attacking towers like villages, no turret is needed.

Balancing Guidelines:
- A new tower should not be strictly better than an existing tower of a similar cost. It should have trade-offs.
- **Shotgun Towers**: Use \`projectileCount\` and \`spreadAngle\`. To balance many projectiles, each projectile should have low damage. Total damage (\`damage\` * \`projectileCount\`) should be reasonable for its cost and fire rate.
- **Aura/Buff Towers (Villages)**: These towers are very powerful. They should have \`"nonAttacking": true\` and no direct damage stats. Their cost must be high. Start with a small \`auraRange\` and weak \`auraBuffs\`, and make the upgrades expensive. Example: A "War Drum" tower might cost 500, have an \`auraRange\` of 3, and \`auraBuffs: { "fireRateBonus": 10 }\`.
- **Income Towers**: An income tower costing 400 should generate 1-2 money per second (\`incomeRate\`).
- Upgrade costs for each path should increase for each level and be significant. Total upgrade cost for a path should be more than the base cost of the tower.
- A tower with a special effect ('frost', 'poison', 'stun' etc.) needs the corresponding baseStats. A regular projectile tower just needs damage, fireRate, range, and projectileSpeed.
- Create a tower that is fun and unique, but FAIR. It should fill a niche not currently filled, or be an interesting alternative to an existing tower.`;

async function handleTowerGeneration() {
    const name = aiTowerName.value;
    const description = aiTowerDescription.value;

    if (!name.trim() || !description.trim()) {
        aiStatus.textContent = "Please provide a name and description.";
        aiStatus.style.color = '#F44336';
        return;
    }

    generateAiTowerBtn.disabled = true;
    aiStatus.style.color = '#8BC34A';
    aiStatus.textContent = "Balancing and generating tower... This may take a moment.";

    try {
        // Construct the dynamic prompt with existing tower data for balancing
        const existingTowersData = `Here are the stats for the existing towers for your reference. Use this to balance the cost and stats of the new tower you create.
\`\`\`json
${JSON.stringify({ TOWER_STATS }, null, 2)}
\`\`\`
`;
        const dynamicPrompt = AI_SYSTEM_PROMPT.replace('{TOWER_DATA_PLACEHOLDER}', existingTowersData);
        
        const completion = await websim.chat.completions.create({
            messages: [
                { role: "system", content: dynamicPrompt },
                { role: "user", content: `Tower Name: ${name}\nDescription: ${description}` }
            ],
            json: true,
        });

        // More robust JSON parsing
        let towerData;
        try {
            // The AI might wrap the JSON in markdown, so we extract it.
            const responseContent = completion.content;
            const jsonMatch = responseContent.match(/```json\s*([\s\S]*?)\s*```|({[\s\S]*})/);
            if (!jsonMatch) {
                throw new Error("No JSON object found in the AI response.");
            }
            // Use the first non-null capture group.
            const jsonString = jsonMatch[1] || jsonMatch[2];
            towerData = JSON.parse(jsonString);
        } catch (e) {
            console.error("Failed to parse JSON from AI response:", e);
            console.log("Raw AI response:", completion.content);
            aiStatus.textContent = "AI returned malformed data. Please try again.";
            aiStatus.style.color = '#F44336';
            generateAiTowerBtn.disabled = false;
            return;
        }

        addCustomTower(towerData);

    } catch (error) {
        console.error("AI Tower Generation Error:", error);
        aiStatus.textContent = "Failed to generate tower. The AI might be busy or the description is too complex. Please try again.";
        aiStatus.style.color = '#F44336';
    } finally {
        generateAiTowerBtn.disabled = false;
    }
}

async function addCustomTower(towerData) {
    if (!addCustomTowerToGame(towerData)) {
        return; // Validation failed in the helper
    }

    if (currentUser) {
        aiStatus.textContent = `Tower "${towerData.name}" created! Saving to database...`;
        try {
            const newRecord = await room.collection('custom_towers_v2').create({
                tower_data: towerData,
            });
            // Now that it's saved, associate the DB ID with the in-memory tower object
            if (TOWER_STATS[towerData.type]) {
                TOWER_STATS[towerData.type].dbRecordId = newRecord.id;
            }
            aiStatus.textContent = `Tower "${towerData.name}" created and saved!`;
            updateCustomTowerList();
        } catch (e) {
            console.error("Error saving custom tower:", e);
            aiStatus.textContent = `Tower created, but failed to save.`;
            aiStatus.style.color = '#F44336';
        }
    } else {
        aiStatus.textContent = `Tower "${towerData.name}" created! (Log in to save)`;
    }

    // UI feedback and cleanup
    setTimeout(() => {
        aiCreatorMenu.style.display = 'none';
        aiStatus.textContent = "";
        aiTowerName.value = "";
        aiTowerDescription.value = "";
    }, 2500);
}

function addCustomTowerToGame(towerData, recordId = null) {
    // Basic validation
    if (!towerData || !towerData.type || !towerData.name || !towerData.cost || !towerData.baseStats || !towerData.upgradePaths || !towerData.visuals) {
        aiStatus.textContent = "AI returned invalid data. Please try again.";
        aiStatus.style.color = '#F44336';
        console.error("Invalid tower data from AI:", towerData);
        return false;
    }

    const { type, name } = towerData;

    if (TOWER_STATS[type]) {
        // This is not an error if it happens during initial load.
        // Let's just log it and move on.
        console.log(`A tower with type '${type}' already exists. Skipping duplicate.`);
        return false;
    }

    // Add visuals to baseStats so it's part of the tower object
    towerData.baseStats.visuals = towerData.visuals;
    towerData.baseStats.dbRecordId = recordId; // Store the ID here
    towerData.baseStats.name = towerData.name; // Ensure name is on base stats for easy access

    // Add to game data structures
    TOWER_STATS[type] = towerData.baseStats;
    TOWER_UPGRADE_PATHS[type] = towerData.upgradePaths;

    // Create and add the new tower button if we are in-game
    const towerSelection = document.querySelector('.tower-selection');
    if (towerSelection) {
        const newButton = document.createElement('button');
        newButton.classList.add('tower-btn', 'custom-tower-btn');
        newButton.dataset.type = type;
        newButton.dataset.cost = towerData.cost;
        newButton.dataset.basecost = towerData.cost;
        newButton.innerHTML = `${name} ($<span class="tower-cost">${towerData.cost}</span>)`;
        towerSelection.appendChild(newButton);
        updateAllButtons();
    }

    return true;
}

function updateCustomTowerList() {
    const listContainer = document.getElementById('custom-tower-list-container');
    const listElement = document.getElementById('custom-tower-list');
    listElement.innerHTML = '';

    const customTowerTypes = Object.keys(TOWER_STATS).filter(type => !['basic', 'sniper', 'splash', 'frost', 'poison', 'lightning', 'bomb', 'laser', 'spikeFactory'].includes(type));

    if (customTowerTypes.length > 0) {
        listContainer.style.display = 'block';
        customTowerTypes.forEach(type => {
            const towerStats = TOWER_STATS[type];
            const button = document.querySelector(`.tower-btn[data-type="${type}"]`);
            const name = button ? button.textContent.split('(')[0].trim() : type;
            const cost = button ? button.dataset.cost : '???';

            const item = document.createElement('div');
            item.classList.add('custom-tower-list-item');
            item.innerHTML = `<span class="name">${name}</span><span class="cost">$${cost}</span>`;
            
            if (towerStats.dbRecordId) {
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-tower-btn';
                deleteBtn.dataset.recordId = towerStats.dbRecordId;
                deleteBtn.dataset.towerType = type;
                deleteBtn.innerHTML = '&times;';
                item.appendChild(deleteBtn);
            }

            listElement.appendChild(item);
        });
    } else {
        listContainer.style.display = 'none';
    }
}

// --- AI Enemy Creation ---

const AI_ENEMY_SYSTEM_PROMPT = `You are an expert tower defense game designer and balancer. Your task is to design a new enemy based on a user's description. The enemy must be balanced against the game's existing towers. An impossible-to-kill enemy will ruin the game. You must output your design as a single JSON object, and nothing else. Your response must be valid JSON.
Here is data on the towers the player can use, for your balancing reference:
{TOWER_DATA_PLACEHOLDER}

Follow this JSON schema strictly:
{
  "type": "string (unique lowercase, one word, e.g., 'crystalgolem')",
  "name": "string (The display name, e.g., 'Crystal Golem')",
  "health": "number (base health, between 10 and 500)",
  "speedMod": "number (speed multiplier, 0.5 is slow, 1 is normal, 2+ is fast)",
  "size": "number (pixel size, between 15 and 35)",
  "money": "number (money reward for killing, balance against health and difficulty)",
  "visuals": {
    "color": "string (hex color for the enemy)",
    "shape": "string ('circle' or 'square')",
    "shadow": "string (optional, hex color for a css box-shadow glow)"
  },
  "abilities": ["string"],
  "recommendedSpawnWave": "number (The wave number when this enemy should start appearing, must be > 3)"
}

Balancing Guidelines:
- High health should mean low speed, and vice versa.
- The 'money' reward should be proportional to the enemy's difficulty. A basic enemy gives ~10-15. A tough one might give 50-100.
- 'recommendedSpawnWave' is crucial. A powerful enemy should not appear in early waves.
- 'abilities' can be an array of descriptive keywords from the user prompt (e.g., ["armored", "fast", "regenerating"]). You don't need to implement them, just list them for flavor. The stats (health, speed) should reflect these abilities. For example, an "armored" enemy should have high health.
- The 'type' must be a unique, machine-readable version of the 'name'.
- Visuals should be simple. Just a color, a shape, and an optional glow.
- Ensure the enemy is killable by a reasonable combination of the towers provided. For example, don't make an enemy so fast and tough that no tower can deal with it.
`;

async function handleEnemyGeneration() {
    const name = aiEnemyName.value;
    const description = aiEnemyDescription.value;

    if (!name.trim() || !description.trim()) {
        aiEnemyStatus.textContent = "Please provide a name and description.";
        aiEnemyStatus.style.color = '#F44336';
        return;
    }

    generateAiEnemyBtn.disabled = true;
    aiEnemyStatus.style.color = '#8BC34A';
    aiEnemyStatus.textContent = "Designing and balancing enemy... This may take a moment.";

    try {
        const existingTowersData = `\`\`\`json
${JSON.stringify({ TOWER_STATS }, null, 2)}
\`\`\`
`;
        const dynamicPrompt = AI_ENEMY_SYSTEM_PROMPT.replace('{TOWER_DATA_PLACEHOLDER}', existingTowersData);

        const completion = await websim.chat.completions.create({
            messages: [
                { role: "system", content: dynamicPrompt },
                { role: "user", content: `Enemy Name: ${name}\nDescription: ${description}` }
            ],
            json: true,
        });
        
        let enemyData;
        try {
            const responseContent = completion.content;
            const jsonMatch = responseContent.match(/```json\s*([\s\S]*?)\s*```|({[\s\S]*})/);
            if (!jsonMatch) throw new Error("No JSON object found in the AI response.");
            const jsonString = jsonMatch[1] || jsonMatch[2];
            enemyData = JSON.parse(jsonString);
        } catch (e) {
            console.error("Failed to parse JSON from AI response:", e);
            console.log("Raw AI response:", completion.content);
            aiEnemyStatus.textContent = "AI returned malformed data. Please try again.";
            aiEnemyStatus.style.color = '#F44336';
            generateAiEnemyBtn.disabled = false;
            return;
        }

        addCustomEnemy(enemyData);

    } catch (error) {
        console.error("AI Enemy Generation Error:", error);
        aiEnemyStatus.textContent = "Failed to generate enemy. Please try again.";
        aiEnemyStatus.style.color = '#F44336';
    } finally {
        generateAiEnemyBtn.disabled = false;
    }
}

function addCustomEnemy(enemyData) {
    if (!enemyData || !enemyData.type || !enemyData.name || !enemyData.health) {
        aiEnemyStatus.textContent = "AI returned invalid data. Please try again.";
        aiEnemyStatus.style.color = '#F44336';
        return;
    }

    const { type, name } = enemyData;

    if (CUSTOM_ENEMIES[type]) {
        aiEnemyStatus.textContent = `An enemy with type '${type}' already exists. Try a more unique name.`;
        aiEnemyStatus.style.color = '#F44336';
        return;
    }

    CUSTOM_ENEMIES[type] = enemyData;

    let panel = document.querySelector('.custom-enemy-panel');
    if (!panel) {
        const panelContainer = document.createElement('div');
        panelContainer.classList.add('custom-enemy-panel-container');
        panelContainer.innerHTML = '<h4>Custom Enemies</h4><p>Spawn enemies for a cost. They will also appear in waves.</p>';
        
        panel = document.createElement('div');
        panel.classList.add('custom-enemy-panel');
        panelContainer.appendChild(panel);

        const controls = document.querySelector('.game-controls');
        controls.parentNode.insertBefore(panelContainer, controls.nextSibling); // place after controls
    }
    
    document.querySelector('.custom-enemy-panel-container').style.display = 'block';

    const spawnCost = Math.ceil((enemyData.money || 10) * 1.2);
    const newButton = document.createElement('button');
    newButton.classList.add('custom-enemy-spawn-btn');
    newButton.dataset.type = type;
    newButton.dataset.cost = spawnCost;
    newButton.textContent = `Spawn ${name} ($${spawnCost})`;
    newButton.style.backgroundColor = enemyData.visuals.color;
    if(enemyData.visuals.shadow) {
        newButton.style.boxShadow = `0 0 8px ${enemyData.visuals.shadow}`;
    }
    newButton.disabled = money < spawnCost;

    panel.appendChild(newButton);

    aiEnemyStatus.textContent = `Enemy "${name}" created! It can now appear in waves or be spawned manually.`;
    setTimeout(() => {
        aiEnemyCreatorMenu.style.display = 'none';
        aiEnemyStatus.textContent = "";
        aiEnemyName.value = "";
        aiEnemyDescription.value = "";
    }, 3500);
}

function spawnCustomEnemy(enemyType) {
    const button = document.querySelector(`.custom-enemy-spawn-btn[data-type="${enemyType}"]`);
    if (!button) return;
    
    const cost = parseInt(button.dataset.cost);
    if (money < cost) {
        // Maybe add a visual cue later that you can't afford it
        return;
    }

    money -= cost;
    updateMoneyDisplay();

    if (!waveInProgress && enemies.length === 0) {
        // If nothing is happening, start a "mini-wave"
        waveInProgress = true; 
        document.getElementById('start-wave').disabled = true;
    }
    
    const enemyData = CUSTOM_ENEMIES[enemyType];
    if (enemyData) {
        const mapData = MAPS[currentMapId] || MAPS['straight'];
        const enemyPath = mapData.paths[Math.floor(Math.random() * mapData.paths.length)];
        
        const dataForCreation = {
            ...enemyData,
            isCustom: true,
        };

        createEnemy(dataForCreation, wave, enemyPath);
    }
}

function countEnemiesInRadius(centerX, centerY, radius) {
    let count = 0;
    for (const enemy of enemies) {
        if (!enemy.element || enemy.health <= 0) continue;
        
        const enemyCenterX = enemy.position.x + enemy.size / 2;
        const enemyCenterY = enemy.position.y + enemy.size / 2;
        const dx = enemyCenterX - centerX;
        const dy = enemyCenterY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance <= radius) {
            count++;
        }
    }
    return count;
}

// Check if enemy is in line
function isEnemyInLine(enemy, x1, y1, x2, y2) {
    const enemyCenterX = enemy.position.x + enemy.size / 2;
    const enemyCenterY = enemy.position.y + enemy.size / 2;

    const lineLength = Math.sqrt((x2 - x1)**2 + (y2 - y1)**2);
    const distance = Math.abs((x2 - x1) * (y1 - enemyCenterY) - (x1 - enemyCenterX) * (y2 - y1)) / lineLength;

    // Check if point is within a certain threshold of the line
    return distance < enemy.size / 2;
}

// Find all aura buffs applying to a specific tower
function findAurasForTower(towerToBuff) {
    const aggregatedBuffs = {};
    const towerToBuffCenterX = towerToBuff.x * cellSize + cellSize / 2;
    const towerToBuffCenterY = towerToBuff.y * cellSize + cellSize / 2;

    for (const potentialSource of towers) {
        // A tower cannot buff itself
        if (potentialSource.id === towerToBuff.id) continue;

        const sourceStats = potentialSource.currentStats;
        if (sourceStats && sourceStats.auraRange && sourceStats.auraBuffs) {
            const sourceCenterX = potentialSource.x * cellSize + cellSize / 2;
            const sourceCenterY = potentialSource.y * cellSize + cellSize / 2;
            const rangePixels = sourceStats.auraRange * cellSize;

            const dx = towerToBuffCenterX - sourceCenterX;
            const dy = towerToBuffCenterY - sourceCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= rangePixels) {
                // The tower is in range, apply buffs
                for (const [buffKey, buffValue] of Object.entries(sourceStats.auraBuffs)) {
                    if (typeof buffValue === 'number') {
                        aggregatedBuffs[buffKey] = (aggregatedBuffs[buffKey] || 0) + buffValue;
                    }
                }
            }
        }
    }
    return aggregatedBuffs;
}

async function loadCustomTowers() {
    if (!currentUser) {
        document.getElementById('loading-status').textContent = 'Log in to save custom towers.';
        return;
    }

    const loadingStatus = document.getElementById('loading-status');
    try {
        const userTowers = await room.collection('custom_towers_v2').filter({ user_id: currentUser.id }).getList();
        
        if (userTowers.length === 0) {
            loadingStatus.textContent = "Create a tower with AI to save it!";
            return;
        }

        userTowers.forEach(record => {
            const towerData = record.tower_data;
            if (towerData && towerData.type) {
                // Silently add, don't show the success message
                addCustomTowerToGame(towerData, record.id);
            }
        });

        loadingStatus.textContent = `Loaded ${userTowers.length} custom tower(s).`;
        updateCustomTowerList();
    } catch (error) {
        console.error("Error loading custom towers:", error);
        loadingStatus.textContent = "Could not load custom towers.";
        loadingStatus.style.color = '#F44336';
    }
}

// --- Music Functions ---
function setupMusic() {
    musicPlayer = new Audio();
    musicPlayer.volume = 0.25;
    musicPlayer.loop = false; // We'll handle looping manually to change tracks
    musicPlayer.addEventListener('ended', playRandomMusic);

    const muteButton = document.getElementById('mute-btn');
    const gameMuteButton = document.getElementById('game-mute-btn');

    function toggleMute() {
        isMuted = !isMuted;
        musicPlayer.muted = isMuted;

        const text = isMuted ? 'Music: Off' : 'Music: On';
        muteButton.textContent = text;
        gameMuteButton.textContent = text;
        muteButton.classList.toggle('active', !isMuted);
        gameMuteButton.classList.toggle('active', !isMuted);
    }

    muteButton.addEventListener('click', toggleMute);
    gameMuteButton.addEventListener('click', toggleMute);
}

function playRandomMusic() {
    if (!musicPlayer) return;

    if (musicTracks.length === 0) {
        console.log("No music tracks available.");
        return;
    }

    let nextTrackIndex;
    do {
        nextTrackIndex = Math.floor(Math.random() * musicTracks.length);
    } while (musicTracks.length > 1 && nextTrackIndex === currentTrackIndex);
    
    currentTrackIndex = nextTrackIndex;
    musicPlayer.src = musicTracks[currentTrackIndex];
    
    // The play() method returns a Promise which can be useful for handling autoplay restrictions.
    const playPromise = musicPlayer.play();

    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Music autoplay was blocked by the browser. It will start upon the next user interaction.", error);
        });
    }
}

// Delete custom tower
async function deleteCustomTower(recordId, towerType) {
    try {
        await room.collection('custom_towers_v2').delete(recordId);

        // Deletion from DB successful, now update the game state
        // 1. Remove from TOWER_STATS and TOWER_UPGRADE_PATHS
        delete TOWER_STATS[towerType];
        delete TOWER_UPGRADE_PATHS[towerType];

        // 2. Remove the button from the tower selection bar
        const towerButton = document.querySelector(`.tower-btn[data-type="${towerType}"]`);
        if (towerButton) {
            towerButton.remove();
        }

        // 3. Refresh the list in the main menu
        updateCustomTowerList();

    } catch (error) {
        console.error("Failed to delete custom tower:", error);
        alert("Failed to delete tower. Please try again.");
        // Refresh list to re-enable button if deletion failed
        updateCustomTowerList();
    }
}

document.getElementById('game-over-to-menu-btn').addEventListener('click', () => {
    document.getElementById('game-over-screen').style.display = 'none';
    document.querySelector('.game-container').style.display = 'none';
    document.getElementById('main-menu').style.display = 'flex';
});

// Listener for deleting custom towers from the main menu list
document.getElementById('custom-tower-list').addEventListener('click', async (event) => {
    const deleteBtn = event.target.closest('.delete-tower-btn');
    if (deleteBtn && !deleteBtn.disabled) {
        const recordId = deleteBtn.dataset.recordId;
        const towerType = deleteBtn.dataset.towerType;
        
        if (recordId && towerType) {
            const towerName = TOWER_STATS[towerType] ? TOWER_STATS[towerType].name : towerType;
            if (confirm(`Are you sure you want to delete the "${towerName}" tower? This cannot be undone.`)) {
                deleteBtn.disabled = true;
                await deleteCustomTower(recordId, towerType);
            }
        }
    }
});

// Initialize Promo Popup
setupPromoPopup();