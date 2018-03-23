import './connection';
import { initialize as initializeUi } from '../ui';
import store from '../redux/store'

// Build UI container div and add to main page document.
const rootNode = document.createElement('div');
document.body.appendChild(rootNode);

initializeUi(rootNode, store);
