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
    if (action.type === 'addProperties') {
      addProperties(stateCopy, action.extraData);

      eachStateResult.push({ ...stateCopy });
    } else if (action.type === 'removeProperties') {
      removeProperties(stateCopy, action.keysToRemove);

      eachStateResult.push({ ...stateCopy });
    } else if (action.type === 'clear') {
      clear(stateCopy);

      eachStateResult.push({ ...stateCopy });
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
