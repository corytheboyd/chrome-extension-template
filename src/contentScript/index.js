import PortManager from './PortManager';
import { initialize as initializeUi } from '../ui';
import store from '../redux/store'

const portManager = new PortManager();
portManager.registerWatchers();

global.portManager = portManager;

// Build UI container div and add to main page document.
const rootNode = document.createElement('div');
document.body.appendChild(rootNode);

initializeUi(rootNode, store);
