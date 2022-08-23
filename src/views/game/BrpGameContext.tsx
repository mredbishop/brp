import React from 'react';
import BrpGameConfig from '../../lib/BrpGameEngine/BrpGameConfig';

function createBrpGameContext<TContextType extends {} | null>() {
    const context = React.createContext<TContextType | undefined>(undefined);
    function useBrpGameContext() {
        const c = React.useContext(context);
        if (c === undefined) {
            throw new Error(
                'useBrpGameContext must be inside a Provider with a value'
            );
        }
        return c;
    }
    return [useBrpGameContext, context.Provider] as const;
}

export const [useBrpGameContext, BrpContextProvider] =
    createBrpGameContext<BrpGameConfig>();
