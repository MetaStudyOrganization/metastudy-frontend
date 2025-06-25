import * as THREE from 'three';
import Application from '../Application';
import Resources from '../Utils/Resources';
import Environment from './Environment';
import Decor from './Decor';
import CoffeeSteam from './CoffeeSteam';
import Cursor from './Cursor';
import AudioManager from '../Audio/AudioManager';
import Macbook from './Macbook';
import MacBookMonitorScreen from './MacBookMonitorScreen';
import Computer from './Computer';
import MonitorScreen from './MonitorScreen';

export default class World {
    application: Application;
    scene: THREE.Scene;
    resources: Resources;
    computer: Computer;
    computerMonitorScreen: MonitorScreen;
    // Objects in the scene
    environment: Environment;
    decor: Decor;
    macbook: Macbook;
    monitorScreen: MacBookMonitorScreen;
    coffeeSteam: CoffeeSteam;
    cursor: Cursor;
    audioManager: AudioManager;

    constructor() {
        this.application = new Application();
        this.scene = this.application.scene;
        this.resources = this.application.resources;

        this.resources.on('ready', () => {
            this.environment = new Environment();
            this.decor = new Decor();

            const selectedComputer = localStorage.getItem('customComputer'); // 🔹 선택된 기기 불러오기

            if (selectedComputer === 'macbook') {
                this.macbook = new Macbook();
                const screenTransform = this.macbook.getScreenTransform();
                this.monitorScreen = new MacBookMonitorScreen(
                    screenTransform.position,
                    screenTransform.rotation
                );
            } else {
                this.computer = new Computer();
                this.computerMonitorScreen = new MonitorScreen();
            }

            this.coffeeSteam = new CoffeeSteam();
            this.audioManager = new AudioManager();
        });
    }

    update() {
        if (this.monitorScreen) this.monitorScreen.update();
        if (this.computerMonitorScreen) this.computerMonitorScreen.update();
        if (this.environment) this.environment.update();
        if (this.coffeeSteam) this.coffeeSteam.update();
        if (this.audioManager) this.audioManager.update();
    }
}
