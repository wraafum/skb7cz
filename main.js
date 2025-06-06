// main.js - Entry point for the Succubus Corruption Game

import * as dom from './domElements.js';
import * as gameLogic from './gameLogic.js';
import * as ui from './uiUpdates.js';
import { gameState, saveGame, loadGame, resetGame } from './playerState.js';

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("Initializing Succubus Corruption Game...");
    
    // Set up event listeners for main game buttons
    setupEventListeners();
    
    // Try to load saved game, otherwise start fresh
    const gameLoaded = loadGame();
    if (!gameLoaded) {
        console.log("No saved game found, starting fresh.");
    }
    
    // Initialize the game logic and UI
    gameLogic.initGame();
    
    console.log("Game initialized successfully!");
});

function setupEventListeners() {
    // Save/Load/Reset buttons
    if (dom.saveGameButton) {
        dom.saveGameButton.addEventListener('click', () => {
            const success = saveGame();
            if (success) {
                ui.showCustomAlert("Gra została zapisana!");
            } else {
                ui.showCustomAlert("Błąd podczas zapisywania gry.");
            }
        });
    }

    if (dom.loadGameButton) {
        dom.loadGameButton.addEventListener('click', () => {
            // Stop all intervals before loading
            gameLogic.stopAllIntervals();
            
            const success = loadGame();
            if (success) {
                ui.showCustomAlert("Gra została wczytana!");
                gameLogic.initGame(); // Reinitialize after loading
            } else {
                ui.showCustomAlert("Błąd podczas wczytywania gry lub brak zapisanego stanu.");
            }
        });
    }

    if (dom.resetGameButton) {
        dom.resetGameButton.addEventListener('click', () => {
            if (confirm("Czy na pewno chcesz zresetować grę? Wszystkie postępy zostaną utracone!")) {
                // Stop all intervals before resetting
                gameLogic.stopAllIntervals();
                
                const success = resetGame();
                if (success) {
                    ui.showCustomAlert("Gra została zresetowana!");
                    gameLogic.initGame(); // Reinitialize after reset
                } else {
                    ui.showCustomAlert("Błąd podczas resetowania gry.");
                }
            }
        });
    }

    // Main essence generation button
    if (dom.generateEssenceButton) {
        dom.generateEssenceButton.addEventListener('click', gameLogic.generateEssence);
    }

    // Cheat buttons for testing
    if (dom.cheatEssenceButton) {
        dom.cheatEssenceButton.addEventListener('click', () => {
            gameLogic.generateEssence(); // This will add the normal amount
            // Add extra for testing
            gameState.essence += 10000;
            ui.markResourcesDirty();
            ui.updateDisplay();
        });
    }

    if (dom.cheatDarkEssenceButton) {
        dom.cheatDarkEssenceButton.addEventListener('click', () => {
            gameState.darkEssence += 10000;
            ui.markResourcesDirty();
            ui.updateDisplay();
        });
    }

    if (dom.cheatCorruptionButton) {
        dom.cheatCorruptionButton.addEventListener('click', () => {
            gameState.corruption += 10000;
            ui.markResourcesDirty();
            ui.updateDisplay();
        });
    }

    // Modal close button
    if (dom.customAlertCloseButtonEl) {
        dom.customAlertCloseButtonEl.addEventListener('click', () => {
            if (dom.customAlertModalEl) {
                dom.customAlertModalEl.classList.add('hidden');
            }
        });
    }

    // Diary entry close button
    if (dom.closeDiaryEntryButton) {
        dom.closeDiaryEntryButton.addEventListener('click', () => {
            if (dom.diaryEntryContentAreaEl) {
                dom.diaryEntryContentAreaEl.classList.add('hidden');
            }
        });
    }
}

// Handle any uncaught errors
window.addEventListener('error', (event) => {
    console.error('Uncaught error:', event.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});