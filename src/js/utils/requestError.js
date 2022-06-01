import { errorNode } from './getNode.js';

function requestError(error) {
    const msgError = `Error: ${error.message}`;
    const nodeTextError = document.createTextNode(msgError);
    errorNode.appendChild(nodeTextError);
}

export default requestError;
