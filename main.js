import { initialElements, recipes } from './elements.js';

const elementsList = document.getElementById('elements-list');
const slot1 = document.getElementById('slot-1');
const slot2 = document.getElementById('slot-2');
const resultNotification = document.getElementById('result-notification');
const resetButton = document.getElementById('reset-button');

let discoveredElements = [];

function saveProgress() {
    localStorage.setItem('discoveredElements', JSON.stringify(discoveredElements));
}

function loadProgress() {
    const saved = localStorage.getItem('discoveredElements');
    if (saved) {
        discoveredElements = JSON.parse(saved);
    } else {
        discoveredElements = [...initialElements];
    }
}

function createDraggableElement(name) {
    const el = document.createElement('div');
    el.textContent = name;
    el.className = 'element-item';
    el.draggable = true;
    el.dataset.element = name;
    el.addEventListener('dragstart', handleDragStart);
    return el;
}

function displayDiscoveredElements() {
    elementsList.innerHTML = '';
    const sortedElements = [...new Set(discoveredElements)].sort();
    sortedElements.forEach(name => {
        elementsList.appendChild(createDraggableElement(name));
    });
}

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.element);
}

function setupDropZone(zone) {
    zone.addEventListener('dragover', e => {
        e.preventDefault();
        zone.classList.add('drag-over');
    });
    zone.addEventListener('dragleave', () => {
        zone.classList.remove('drag-over');
    });
    zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        const elementName = e.dataTransfer.getData('text/plain');
        
        // Prevent dropping on a slot that already has an element
        if (zone.children.length > 0) return;

        const el = createDraggableElement(elementName);
        zone.appendChild(el);
        checkCombination();
    });
}

function checkCombination() {
    const el1 = slot1.children[0]?.dataset.element;
    const el2 = slot2.children[0]?.dataset.element;

    if (el1 && el2) {
        let result = recipes[el1]?.[el2] || recipes[el2]?.[el1];
        
        setTimeout(() => {
            if (result) {
                if (!discoveredElements.includes(result)) {
                    discoveredElements.push(result);
                    displayDiscoveredElements();
                    saveProgress();
                    resultNotification.textContent = `New Discovery: ${result}!`;
                } else {
                    resultNotification.textContent = `You created ${result}.`;
                }
            } else {
                resultNotification.textContent = "Nothing happened...";
            }
            slot1.innerHTML = '';
            slot2.innerHTML = '';
        }, 300); // Small delay for effect
    }
}

function resetGame() {
    if (confirm('Are you sure you want to reset your progress?')) {
        localStorage.removeItem('discoveredElements');
        resultNotification.textContent = '';
        slot1.innerHTML = '';
        slot2.innerHTML = '';
        init();
    }
}

function init() {
    loadProgress();
    displayDiscoveredElements();
    setupDropZone(slot1);
    setupDropZone(slot2);
    resetButton.addEventListener('click', resetGame);
}

init();

