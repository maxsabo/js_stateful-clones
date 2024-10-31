'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = Object.assign({}, state);

  const eachStateResult = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateCopy, action.extraData);
        eachStateResult.push({ ...stateCopy });
        break;

      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove);
        eachStateResult.push({ ...stateCopy });
        break;

      case 'clear':
        clear(stateCopy);
        eachStateResult.push({ ...stateCopy });
        break;

      default:
        break;
    }
  }

  return eachStateResult;
}

function addProperties(stateCopy, extraData) {
  Object.assign(stateCopy, extraData);
}

function removeProperties(stateCopy, keysToRemove) {
  for (const key of keysToRemove) {
    delete stateCopy[key];
  }
}

function clear(stateCopy) {
  for (const property in stateCopy) {
    delete stateCopy[property];
  }
}

module.exports = transformStateWithClones;
