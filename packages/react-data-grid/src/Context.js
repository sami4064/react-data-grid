import React from 'react';

export const InteractionMasksContext = React.createContext({
    editing: false,
    interactionMasksCallback: () => { console.log('null InteractionMasksContext callback') },
});