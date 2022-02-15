import { useEffect, useState } from 'react';

type UseStats = () => {
    games: number;
};

const useStats: UseStats = () => {
    const [games, setGames] = useState(0);

    useEffect(() => {
        const handle = setInterval(() => setGames(games + 1), 2000);

        return () => clearInterval(handle);
    }, [games]);

    return {
        games
    };
};

export default useStats;
