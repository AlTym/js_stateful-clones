'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const allStates = [];

  for (const i in actions) {
    switch (actions[i].type) {
      case 'addProperties': {
        Object.assign(stateClone, actions[i].extraData);
        allStates.push({ ...stateClone });
        break;
      }

      case 'removeProperties': {
        for (const key in actions[i].keysToRemove) {
          delete stateClone[actions[i].keysToRemove[key]];
        }
        allStates.push({ ...stateClone });
        break;
      }

      case 'clear': {
        for (const key in stateClone) {
          delete stateClone[key];
        }
        allStates.push({ ...stateClone });
        break;
      }
    }
  }

  return allStates;
}

module.exports = transformStateWithClones;
