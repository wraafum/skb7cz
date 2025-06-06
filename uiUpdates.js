// uiUpdates.js
import * as dom from './domElements.js';
import { gameState } from './playerState.js';
import { lilithStages, lilithThoughts, lilithVocalThoughts, essenceReactions, upgradeReactions, darkEssenceReactions } from './characterProgression.js';
import { dialogues as allDialogues, diaryEntries as allDiaryEntries, temptationVisualDescriptions as allTemptationVisualDescriptions } from './narrativeElements.js';
import {
    upgrades as allUpgrades, researchProjects as allResearchProjects,
    darkRituals as allDarkRituals, choiceUpgradeGroups as allChoiceUpgradeGroups,
    temptationMissions as allTemptationMissions, eliteMinions as allEliteMinions,
    isGameAreaUnlocked
} from './gameSystems.js';
import { BALANCE_MODIFIERS } from './gameConfig.js';

// Dirty flags to track what needs updating
let dirtyFlags = {
    resources: true,
    lilithDisplay: true,
    dialogues: true,
    upgrades: true,
    upgradeChoices: true,
    research: true,
    rituals: true,
    temptations: true,
    minions: true,
    sexualPreferences: true,
    diary: true,
    lore: true,
    allSections: true
};

// Mark sections as dirty
export function markResourcesDirty() { dirtyFlags.resources = true; }
export function markLilithDisplayDirty() { dirtyFlags.lilithDisplay = true; }
export function markDialoguesDirty() { dirtyFlags.dialogues = true; }
export function markUpgradesDirty() { dirtyFlags.upgrades = true; }
export function markUpgradeChoicesDirty() { dirtyFlags.upgradeChoices = true; }
export function markResearchDirty() { dirtyFlags.research = true; }
export function markRitualsDirty() { dirtyFlags.rituals = true; }
export function markTemptationsDirty() { dirtyFlags.temptations = true; }
export function markMinionsDirty() { dirtyFlags.minions = true; }
export function markSexualPreferencesDirty() { dirtyFlags.sexualPreferences = true; }
export function markDiaryDirty() { dirtyFlags.diary = true; }
export function markLoreDirty() { dirtyFlags.lore = true; }
export function markAllSectionsDirty() { dirtyFlags.allSections = true; }

// Main update function
export function updateDisplay() {
    if (dirtyFlags.allSections) {
        updateAllSections();
        dirtyFlags.allSections = false;
        // Reset all other flags since we updated everything
        Object.keys(dirtyFlags).forEach(key => dirtyFlags[key] = false);
        return;
    }

    if (dirtyFlags.resources) {
        updateResourcesDisplay();
        dirtyFlags.resources = false;
    }
    if (dirtyFlags.lilithDisplay) {
        updateLilithDisplay();
        dirtyFlags.lilithDisplay = false;
    }
    if (dirtyFlags.dialogues) {
        updateDialoguesDisplay();
        dirtyFlags.dialogues = false;
    }
    if (dirtyFlags.upgrades) {
        updateUpgradesDisplay();
        dirtyFlags.upgrades = false;
    }
    if (dirtyFlags.upgradeChoices) {
        updateUpgradeChoicesDisplay();
        dirtyFlags.upgradeChoices = false;
    }
    if (dirtyFlags.research) {
        updateResearchDisplay();
        dirtyFlags.research = false;
    }
    if (dirtyFlags.rituals) {
        updateRitualsDisplay();
        dirtyFlags.rituals = false;
    }
    if (dirtyFlags.temptations) {
        updateTemptationsDisplay();
        dirtyFlags.temptations = false;
    }
    if (dirtyFlags.minions) {
        updateMinionsDisplay();
        dirtyFlags.minions = false;
    }
    if (dirtyFlags.sexualPreferences) {
        updateSexualPreferencesDisplay();
        dirtyFlags.sexualPreferences = false;
    }
    if (dirtyFlags.diary) {
        updateDiaryDisplay();
        dirtyFlags.diary = false;
    }
    if (dirtyFlags.lore) {
        updateLoreDisplay();
        dirtyFlags.lore = false;
    }
}

function updateAllSections() {
    updateResourcesDisplay();
    updateLilithDisplay();
    updateDialoguesDisplay();
    updateUpgradesDisplay();
    updateUpgradeChoicesDisplay();
    updateResearchDisplay();
    updateRitualsDisplay();
    updateTemptationsDisplay();
    updateMinionsDisplay();
    updateSexualPreferencesDisplay();
    updateDiaryDisplay();
    updateLoreDisplay();
    updateGameAreaVisibility();
}

function updateResourcesDisplay() {
    if (dom.essenceCountEl) {
        dom.essenceCountEl.textContent = Math.floor(gameState.essence);
    }
    if (dom.darkEssenceCountEl) {
        dom.darkEssenceCountEl.textContent = Math.floor(gameState.darkEssence);
    }
    if (dom.corruptionCountEl) {
        dom.corruptionCountEl.textContent = Math.floor(gameState.corruption);
    }
    if (dom.essencePerClickEl) {
        dom.essencePerClickEl.textContent = gameState.essencePerClick;
    }
    if (dom.passiveEssenceRateEl) {
        dom.passiveEssenceRateEl.textContent = gameState.passiveEssencePerSecond.toFixed(1);
    }
}

function updateLilithDisplay() {
    const currentStage = lilithStages[gameState.lilithStage];
    if (!currentStage) return;

    if (dom.lilithNameStageEl) {
        dom.lilithNameStageEl.textContent = `${gameState.lilithName || 'Lilith'} - Etap ${currentStage.name}`;
    }
    if (dom.lilithImgTag) {
        dom.lilithImgTag.src = currentStage.imagePath;
        dom.lilithImgTag.alt = currentStage.name;
    }
    if (dom.lilithDescriptionEl) {
        const description = typeof currentStage.description === 'function' 
            ? currentStage.description(gameState) 
            : currentStage.description;
        dom.lilithDescriptionEl.textContent = description;
    }

    updateLilithThoughts();
}

function updateLilithThoughts() {
    if (!dom.lilithThoughtEl) return;

    let thoughtText = '';
    
    if (gameState.lilithThoughtsOverride) {
        thoughtText = gameState.lilithThoughtsOverride;
    } else {
        const stageThoughts = lilithThoughts[gameState.lilithStage];
        if (stageThoughts && stageThoughts.length > 0) {
            const validThoughts = stageThoughts.filter(thought => {
                if (thought.corruption) {
                    const [min, max] = thought.corruption;
                    if (gameState.corruption < min || gameState.corruption > max) return false;
                }
                if (thought.requiresFlag && !gameState.playerChoiceFlags.includes(thought.requiresFlag)) {
                    return false;
                }
                return true;
            });

            if (validThoughts.length > 0) {
                const randomThought = validThoughts[Math.floor(Math.random() * validThoughts.length)];
                thoughtText = randomThought.text;
            }
        }
    }

    if (thoughtText) {
        dom.lilithThoughtEl.textContent = thoughtText;
        dom.lilithThoughtEl.style.fontStyle = 'italic';
    } else {
        dom.lilithThoughtEl.textContent = '(Lilith wydaje się zamyślona...)';
        dom.lilithThoughtEl.style.fontStyle = 'italic';
    }
}

function updateDialoguesDisplay() {
    if (!dom.availableDialoguesEl) return;

    dom.availableDialoguesEl.innerHTML = '';

    const availableDialogues = allDialogues.filter(dialogue => {
        if (dialogue.id === 'summoning_ritual' && gameState.initialInteractionCompleted) return false;
        if (dialogue.id !== 'summoning_ritual' && !gameState.initialInteractionCompleted) return false;
        if (dialogue.requiredStage !== undefined && gameState.lilithStage < dialogue.requiredStage) return false;
        if (dialogue.corruptionRequired !== undefined && gameState.corruption < dialogue.corruptionRequired) return false;
        if (dialogue.requiresFlag && !gameState.playerChoiceFlags.includes(dialogue.requiresFlag)) return false;
        if (dialogue.requiresCompletedDialogue && !gameState.completedDialogues.includes(dialogue.requiresCompletedDialogue)) return false;
        if (dialogue.isRepeatable === false && gameState.completedDialogues.includes(dialogue.id)) return false;
        return true;
    });

    availableDialogues.forEach(dialogue => {
        const button = document.createElement('button');
        button.classList.add('interactive-button', 'button-primary');
        
        let buttonText = dialogue.name;
        if (dialogue.essenceCost) buttonText += ` (${dialogue.essenceCost} E)`;
        if (dialogue.darkEssenceCost) buttonText += ` (${dialogue.darkEssenceCost} ME)`;
        
        button.textContent = buttonText;
        
        const canAfford = gameState.essence >= (dialogue.essenceCost || 0) && 
                         gameState.darkEssence >= (dialogue.darkEssenceCost || 0);
        
        if (!canAfford) {
            button.disabled = true;
            button.classList.add('button-disabled');
        } else {
            button.onclick = async () => {
                try {
                    const gameLogic = await import('./gameLogic.js');
                    if (gameLogic.startDialogue) {
                        gameLogic.startDialogue(dialogue.id);
                    }
                } catch (error) {
                    console.error('Error importing gameLogic:', error);
                }
            };
        }
        
        dom.availableDialoguesEl.appendChild(button);
    });
}

function updateUpgradesDisplay() {
    if (!dom.upgradesListEl) return;

    dom.upgradesListEl.innerHTML = '';

    const availableUpgrades = allUpgrades.filter(upgrade => {
        const upgradeState = gameState.upgradesState.find(s => s.id === upgrade.id);
        if (!upgradeState || !upgradeState.unlocked) return false;
        if (upgradeState.purchased && upgrade.type !== 'choice_unlock' && upgrade.type !== 'minion_training' && upgrade.type !== 'elite_minion_recruitment') return false;
        return true;
    });

    availableUpgrades.forEach(upgrade => {
        const upgradeDiv = document.createElement('div');
        upgradeDiv.classList.add('upgrade-item');

        const upgradeState = gameState.upgradesState.find(s => s.id === upgrade.id);
        const isPurchased = upgradeState && upgradeState.purchased;

        upgradeDiv.innerHTML = `
            <h4>${upgrade.name} ${isPurchased ? '(Zakupione)' : ''}</h4>
            <p>${upgrade.description}</p>
            <div class="upgrade-cost">
                Koszt: ${upgrade.cost} Esencji
                ${upgrade.darkEssenceCost ? ` + ${upgrade.darkEssenceCost} ME` : ''}
            </div>
        `;

        if (!isPurchased || upgrade.type === 'choice_unlock' || upgrade.type === 'minion_training' || upgrade.type === 'elite_minion_recruitment') {
            const button = document.createElement('button');
            button.classList.add('interactive-button', 'button-secondary');
            button.textContent = isPurchased ? 'Użyj ponownie' : 'Kup';

            const canAfford = gameState.essence >= upgrade.cost && 
                             gameState.darkEssence >= (upgrade.darkEssenceCost || 0);

            if (!canAfford) {
                button.disabled = true;
                button.classList.add('button-disabled');
            } else {
                button.onclick = async () => {
                    try {
                        const gameLogic = await import('./gameLogic.js');
                        if (gameLogic.buyUpgrade) {
                            gameLogic.buyUpgrade(upgrade.id);
                        }
                    } catch (error) {
                        console.error('Error importing gameLogic:', error);
                    }
                };
            }

            upgradeDiv.appendChild(button);
        }

        dom.upgradesListEl.appendChild(upgradeDiv);
    });
}

function updateUpgradeChoicesDisplay() {
    if (!dom.upgradeChoicesContainerEl) return;

    if (!gameState.activeChoiceGroupId) {
        dom.upgradeChoicesContainerEl.classList.add('hidden');
        return;
    }

    const choiceGroup = allChoiceUpgradeGroups[gameState.activeChoiceGroupId];
    if (!choiceGroup) {
        dom.upgradeChoicesContainerEl.classList.add('hidden');
        return;
    }

    dom.upgradeChoicesContainerEl.classList.remove('hidden');
    
    if (dom.upgradeChoicePromptEl) {
        dom.upgradeChoicePromptEl.textContent = choiceGroup.prompt;
    }

    if (dom.upgradeChoicesListEl) {
        dom.upgradeChoicesListEl.innerHTML = '';
        
        choiceGroup.choices.forEach(choice => {
            const choiceDiv = document.createElement('div');
            choiceDiv.classList.add('choice-option');
            
            choiceDiv.innerHTML = `
                <h4>${choice.name}</h4>
                <p>${choice.description}</p>
            `;

            const button = document.createElement('button');
            button.classList.add('interactive-button', 'button-primary');
            button.textContent = 'Wybierz';
            button.onclick = async () => {
                try {
                    const gameLogic = await import('./gameLogic.js');
                    if (gameLogic.selectUpgradeChoice) {
                        gameLogic.selectUpgradeChoice(gameState.activeChoiceGroupId, choice.id);
                    }
                } catch (error) {
                    console.error('Error importing gameLogic:', error);
                }
            };

            choiceDiv.appendChild(button);
            dom.upgradeChoicesListEl.appendChild(choiceDiv);
        });
    }
}

function updateResearchDisplay() {
    if (!dom.researchProjectsListEl) return;

    dom.researchProjectsListEl.innerHTML = '';

    const availableProjects = allResearchProjects.filter(project => {
        const projectState = gameState.researchProjectsState.find(s => s.id === project.id);
        return projectState && projectState.unlocked && !projectState.isCompleted;
    });

    availableProjects.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('research-item');

        projectDiv.innerHTML = `
            <h4>${project.name}</h4>
            <p>${project.description}</p>
            <div class="research-cost">
                Koszt: ${project.cost} Esencji
                ${project.darkEssenceCost ? ` + ${project.darkEssenceCost} ME` : ''}
            </div>
        `;

        const button = document.createElement('button');
        button.classList.add('interactive-button', 'button-secondary');
        button.textContent = 'Rozpocznij Badania';

        const canAfford = gameState.essence >= project.cost && 
                         gameState.darkEssence >= (project.darkEssenceCost || 0);

        if (!canAfford) {
            button.disabled = true;
            button.classList.add('button-disabled');
        } else {
            button.onclick = async () => {
                try {
                    const gameLogic = await import('./gameLogic.js');
                    if (gameLogic.startResearch) {
                        gameLogic.startResearch(project.id);
                    }
                } catch (error) {
                    console.error('Error importing gameLogic:', error);
                }
            };
        }

        projectDiv.appendChild(button);
        dom.researchProjectsListEl.appendChild(projectDiv);
    });
}

function updateRitualsDisplay() {
    if (!dom.darkRitualsListEl) return;

    dom.darkRitualsListEl.innerHTML = '';

    const availableRituals = allDarkRituals.filter(ritual => {
        const ritualState = gameState.darkRitualsState.find(s => s.id === ritual.id);
        if (ritualState && ritualState.isCompleted) return false;
        if (ritual.requiredStage !== undefined && gameState.lilithStage < ritual.requiredStage) return false;
        return true;
    });

    availableRituals.forEach(ritual => {
        const ritualDiv = document.createElement('div');
        ritualDiv.classList.add('ritual-item');

        ritualDiv.innerHTML = `
            <h4>${ritual.name}</h4>
            <p>${ritual.description}</p>
            <div class="ritual-effect">${ritual.effectDescription}</div>
            <div class="ritual-cost">
                Koszt: ${ritual.essenceCost} Esencji + ${ritual.darkEssenceCost} ME
            </div>
        `;

        const button = document.createElement('button');
        button.classList.add('interactive-button', 'button-danger');
        button.textContent = 'Przeprowadź Rytuał';

        const canAfford = gameState.essence >= ritual.essenceCost && 
                         gameState.darkEssence >= ritual.darkEssenceCost;

        if (!canAfford) {
            button.disabled = true;
            button.classList.add('button-disabled');
        } else {
            button.onclick = async () => {
                try {
                    const gameLogic = await import('./gameLogic.js');
                    if (gameLogic.startDarkRitual) {
                        gameLogic.startDarkRitual(ritual.id);
                    }
                } catch (error) {
                    console.error('Error importing gameLogic:', error);
                }
            };
        }

        ritualDiv.appendChild(button);
        dom.darkRitualsListEl.appendChild(ritualDiv);
    });
}

function updateTemptationsDisplay() {
    if (!dom.availableTemptationsListEl) return;

    dom.availableTemptationsListEl.innerHTML = '';

    const availableTemptations = allTemptationMissions.filter(temptation => {
        if (temptation.requiredLilithStage !== undefined && gameState.lilithStage < temptation.requiredLilithStage) return false;
        if (temptation.requiredCorruption !== undefined && gameState.corruption < temptation.requiredCorruption) return false;
        const temptationState = gameState.temptationMissionsState.find(s => s.id === temptation.id);
        if (!temptation.isRepeatable && temptationState && temptationState.isCompleted) return false;
        return true;
    });

    availableTemptations.forEach(temptation => {
        const temptationState = gameState.temptationMissionsState.find(s => s.id === temptation.id);
        const isActive = temptationState && temptationState.isActive;
        const isActiveApprentice = temptationState && temptationState.isActiveApprentice;

        const temptationDiv = document.createElement('div');
        temptationDiv.classList.add('temptation-item');

        let statusText = '';
        if (isActive) {
            statusText = `<div class="temptation-active">Aktywna (${temptationState.timeRemaining}s)</div>`;
        } else if (isActiveApprentice) {
            statusText = `<div class="temptation-active">Uczennica pracuje (${temptationState.timeRemainingApprentice}s)</div>`;
        }

        temptationDiv.innerHTML = `
            <h4>${temptation.title}</h4>
            <p>${temptation.description}</p>
            ${statusText}
            <div class="temptation-cost">
                Koszt: ${temptation.essenceCost} Esencji + ${temptation.darkEssenceCost} ME
            </div>
            <div class="temptation-duration">Czas: ${temptation.durationSeconds}s</div>
        `;

        if (!isActive && !isActiveApprentice) {
            // Minion assignment controls
            if (gameState.minions.praktykanci && gameState.minions.praktykanci.unlocked) {
                const minionControls = document.createElement('div');
                minionControls.classList.add('minion-controls');
                minionControls.innerHTML = `
                    <label>Przydzieleni słudzy: ${temptationState?.assignedMinions || 0}/${gameState.minions.praktykanci.count}</label>
                    <button class="minion-decrease">-</button>
                    <button class="minion-increase">+</button>
                `;

                const decreaseBtn = minionControls.querySelector('.minion-decrease');
                const increaseBtn = minionControls.querySelector('.minion-increase');

                decreaseBtn.onclick = async () => {
                    try {
                        const gameLogic = await import('./gameLogic.js');
                        if (gameLogic.changeAssignedMinions) {
                            gameLogic.changeAssignedMinions(temptation.id, -1);
                        }
                    } catch (error) {
                        console.error('Error importing gameLogic:', error);
                    }
                };

                increaseBtn.onclick = async () => {
                    try {
                        const gameLogic = await import('./gameLogic.js');
                        if (gameLogic.changeAssignedMinions) {
                            gameLogic.changeAssignedMinions(temptation.id, 1);
                        }
                    } catch (error) {
                        console.error('Error importing gameLogic:', error);
                    }
                };

                temptationDiv.appendChild(minionControls);
            }

            // Start temptation button
            const button = document.createElement('button');
            button.classList.add('interactive-button', 'button-secondary');
            button.textContent = 'Rozpocznij Pokusę';

            const canAfford = gameState.essence >= temptation.essenceCost && 
                             gameState.darkEssence >= temptation.darkEssenceCost;

            if (!canAfford) {
                button.disabled = true;
                button.classList.add('button-disabled');
            } else {
                button.onclick = async () => {
                    try {
                        const gameLogic = await import('./gameLogic.js');
                        if (gameLogic.startTemptation) {
                            gameLogic.startTemptation(temptation.id, false);
                        }
                    } catch (error) {
                        console.error('Error importing gameLogic:', error);
                    }
                };
            }

            temptationDiv.appendChild(button);

            // Apprentice button if available
            if (gameState.eliteMinion.apprentice && gameState.eliteMinion.apprentice.recruited) {
                const apprenticeButton = document.createElement('button');
                apprenticeButton.classList.add('interactive-button', 'button-tertiary');
                apprenticeButton.textContent = 'Wyślij Uczennicę';

                if (!canAfford) {
                    apprenticeButton.disabled = true;
                    apprenticeButton.classList.add('button-disabled');
                } else {
                    apprenticeButton.onclick = async () => {
                        try {
                            const gameLogic = await import('./gameLogic.js');
                            if (gameLogic.startTemptation) {
                                gameLogic.startTemptation(temptation.id, true);
                            }
                        } catch (error) {
                            console.error('Error importing gameLogic:', error);
                        }
                    };
                }

                temptationDiv.appendChild(apprenticeButton);
            }
        }

        dom.availableTemptationsListEl.appendChild(temptationDiv);
    });

    // Update active temptation displays
    if (gameState.activeTemptation && dom.activeTemptationDisplayEl) {
        const activeTemptation = allTemptationMissions.find(t => t.id === gameState.activeTemptation);
        const temptationState = gameState.temptationMissionsState.find(s => s.id === gameState.activeTemptation);
        
        if (activeTemptation && temptationState) {
            dom.activeTemptationDisplayEl.classList.remove('hidden');
            if (dom.activeTemptationTextEl) {
                dom.activeTemptationTextEl.textContent = activeTemptation.title;
            }
            if (dom.activeTemptationTimerEl) {
                dom.activeTemptationTimerEl.textContent = `Pozostały czas: ${temptationState.timeRemaining}s`;
            }
        }
    } else if (dom.activeTemptationDisplayEl) {
        dom.activeTemptationDisplayEl.classList.add('hidden');
    }

    if (gameState.activeTemptationApprentice && dom.activeApprenticeTemptationDisplayEl) {
        const activeTemptation = allTemptationMissions.find(t => t.id === gameState.activeTemptationApprentice);
        const temptationState = gameState.temptationMissionsState.find(s => s.id === gameState.activeTemptationApprentice);
        
        if (activeTemptation && temptationState) {
            dom.activeApprenticeTemptationDisplayEl.classList.remove('hidden');
            if (dom.activeApprenticeTemptationTextEl) {
                dom.activeApprenticeTemptationTextEl.textContent = `Uczennica: ${activeTemptation.title}`;
            }
            if (dom.activeApprenticeTemptationTimerEl) {
                dom.activeApprenticeTemptationTimerEl.textContent = `Pozostały czas: ${temptationState.timeRemainingApprentice}s`;
            }
        }
    } else if (dom.activeApprenticeTemptationDisplayEl) {
        dom.activeApprenticeTemptationDisplayEl.classList.add('hidden');
    }
}

function updateMinionsDisplay() {
    if (dom.praktykanciCountEl) {
        dom.praktykanciCountEl.textContent = gameState.minions.praktykanci.count;
    }

    if (dom.eliteApprenticeDisplayEl && dom.eliteApprenticeStatusEl) {
        if (gameState.eliteMinion.apprentice.recruited) {
            dom.eliteApprenticeDisplayEl.classList.remove('hidden');
            dom.eliteApprenticeStatusEl.textContent = `Poziom ${gameState.eliteMinion.apprentice.level}`;
        } else {
            dom.eliteApprenticeDisplayEl.classList.add('hidden');
        }
    }

    if (dom.minionActionsListEl) {
        dom.minionActionsListEl.innerHTML = '';
        // Add any minion-specific actions here if needed
    }
}

function updateSexualPreferencesDisplay() {
    if (!dom.sexualPreferencesListEl) return;

    dom.sexualPreferencesListEl.innerHTML = '';

    Object.entries(gameState.sexualPreferences).forEach(([key, preference]) => {
        if (!preference.unlocked) return;

        const prefDiv = document.createElement('div');
        prefDiv.classList.add('preference-item-custom');

        const progressPercentage = (preference.level / preference.maxLevel) * 100;

        prefDiv.innerHTML = `
            <strong>${key.charAt(0).toUpperCase() + key.slice(1)}</strong>
            <div class="description-text">${preference.description}</div>
            <div>Poziom: ${preference.level}/${preference.maxLevel}</div>
            <div class="level-bar-container">
                <div class="level-bar" style="width: ${progressPercentage}%"></div>
            </div>
        `;

        dom.sexualPreferencesListEl.appendChild(prefDiv);
    });
}

function updateDiaryDisplay() {
    if (!dom.diaryEntriesListEl) return;

    dom.diaryEntriesListEl.innerHTML = '';

    const unlockedEntries = allDiaryEntries.filter(entry => 
        gameState.unlockedDiaryEntryIds.includes(entry.id)
    );

    unlockedEntries.forEach(entry => {
        const button = document.createElement('button');
        button.classList.add('interactive-button', 'diary-entry-button-custom');
        button.textContent = entry.title;
        button.onclick = () => showDiaryEntry(entry);

        dom.diaryEntriesListEl.appendChild(button);
    });
}

function updateLoreDisplay() {
    if (!dom.loreDropsContentEl) return;

    dom.loreDropsContentEl.innerHTML = '';

    gameState.discoveredLore.forEach(lore => {
        const loreDiv = document.createElement('div');
        loreDiv.classList.add('lore-drop-custom');

        loreDiv.innerHTML = `
            <strong>${lore.name}</strong><br>
            ${lore.text}
        `;

        dom.loreDropsContentEl.appendChild(loreDiv);
    });
}

function updateGameAreaVisibility() {
    // Update visibility of game sections based on unlock conditions
    const areas = [
        { id: 'research', element: dom.researchAreaEl },
        { id: 'rituals', element: dom.ritualsAreaEl },
        { id: 'temptations', element: dom.temptationsAreaEl },
        { id: 'minions', element: dom.minionsAreaEl },
        { id: 'preferences', element: dom.preferencesAreaEl }
    ];

    areas.forEach(area => {
        if (area.element) {
            const isUnlocked = isGameAreaUnlocked(area.id, gameState);
            if (isUnlocked) {
                area.element.classList.remove('hidden');
            } else {
                area.element.classList.add('hidden');
            }
        }
    });

    // Show essence generation button only after initial interaction
    if (dom.generateEssenceButton) {
        if (gameState.essenceGenerationUnlocked) {
            dom.generateEssenceButton.classList.remove('hidden');
        } else {
            dom.generateEssenceButton.classList.add('hidden');
        }
    }
}

// Utility functions
export function showCustomAlert(message) {
    if (dom.customAlertModalEl && dom.customAlertMessageEl) {
        dom.customAlertMessageEl.textContent = message;
        dom.customAlertModalEl.classList.remove('hidden');
    } else {
        alert(message); // Fallback
    }
}

function showDiaryEntry(entry) {
    if (dom.diaryEntryContentAreaEl && dom.diaryEntryTitleEl && dom.diaryEntryTextEl) {
        dom.diaryEntryTitleEl.textContent = entry.title;
        dom.diaryEntryTextEl.innerHTML = entry.content;
        dom.diaryEntryContentAreaEl.classList.remove('hidden');
    }
}

export function displayEssenceReaction() {
    if (!essenceReactions || essenceReactions.length === 0) return;

    const currentEssence = gameState.essence;
    const lastThreshold = gameState.lastEssenceReactionThreshold || 0;

    for (let i = essenceReactions.length - 1; i >= 0; i--) {
        const reaction = essenceReactions[i];
        if (currentEssence >= reaction.threshold && lastThreshold < reaction.threshold) {
            if (dom.lilithEssenceReactionEl) {
                dom.lilithEssenceReactionEl.textContent = reaction.text;
                dom.lilithEssenceReactionEl.style.opacity = '1';
                
                // Reset after a delay
                setTimeout(() => {
                    if (dom.lilithEssenceReactionEl) {
                        dom.lilithEssenceReactionEl.style.opacity = '0';
                    }
                }, BALANCE_MODIFIERS.thoughts.displayDurationMs);
            }
            gameState.lastEssenceReactionThreshold = reaction.threshold;
            break;
        }
    }
}

export function displayInitialVocalThought() {
    if (!gameState.lilithBecameVocal || gameState.firstVocalThoughtShown) return;

    const initialThought = lilithVocalThoughts.find(thought => thought.id === 'initial_vocal_thought');
    if (initialThought && dom.lilithVocalThoughtDisplayEl) {
        dom.lilithVocalThoughtDisplayEl.textContent = initialThought.text;
        if (initialThought.isItalic) {
            dom.lilithVocalThoughtDisplayEl.classList.add('italic-thought');
        } else {
            dom.lilithVocalThoughtDisplayEl.classList.remove('italic-thought');
        }
        dom.lilithVocalThoughtDisplayEl.style.opacity = '1';
        gameState.firstVocalThoughtShown = true;
    }
}

export function displayRandomVocalThought() {
    if (!gameState.lilithBecameVocal || !gameState.firstVocalThoughtShown) return;
    if (!dom.lilithVocalThoughtDisplayEl) return;

    const validThoughts = lilithVocalThoughts.filter(thought => {
        if (thought.id === 'initial_vocal_thought') return false;
        if (thought.stageRequired !== undefined && gameState.lilithStage < thought.stageRequired) return false;
        if (thought.corruptionMin !== undefined && gameState.corruption < thought.corruptionMin) return false;
        if (thought.requiresFlag) {
            if (Array.isArray(thought.requiresFlag)) {
                return thought.requiresFlag.every(flag => gameState.playerChoiceFlags.includes(flag));
            } else {
                return gameState.playerChoiceFlags.includes(thought.requiresFlag);
            }
        }
        if (thought.sexualPreference) {
            const pref = gameState.sexualPreferences[thought.sexualPreference.key];
            if (!pref || !pref.unlocked || pref.level < (thought.sexualPreference.level || 1)) {
                return false;
            }
        }
        return true;
    });

    if (validThoughts.length > 0) {
        const randomThought = validThoughts[Math.floor(Math.random() * validThoughts.length)];
        dom.lilithVocalThoughtDisplayEl.textContent = randomThought.text;
        if (randomThought.isItalic) {
            dom.lilithVocalThoughtDisplayEl.classList.add('italic-thought');
        } else {
            dom.lilithVocalThoughtDisplayEl.classList.remove('italic-thought');
        }
        dom.lilithVocalThoughtDisplayEl.style.opacity = '1';

        // Fade out after delay
        setTimeout(() => {
            if (dom.lilithVocalThoughtDisplayEl) {
                dom.lilithVocalThoughtDisplayEl.style.opacity = '0';
            }
        }, BALANCE_MODIFIERS.vocalThoughts.fadeDelayMs);
    }
}