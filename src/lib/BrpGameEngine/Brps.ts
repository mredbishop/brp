import english from '../../dictionaries/english';
import Brp from './Brp';

export default class Brps {
    private static _brps: Array<[Brp, number]>;

    public static get all() {
        if (Brps._brps === undefined) {
            const brps = {} as Record<string, [Brp, number]>;
            english.forEach((word) => {
                if (word.length % 2 === 0) return;

                const brp = [
                    word[0].toUpperCase(),
                    word[Math.floor(word.length / 2)].toUpperCase(),
                    word[word.length - 1].toUpperCase()
                ] as Brp;

                const brpString = brp.join('');
                if (!brps[brpString]) brps[brpString] = [brp, 1];
                else brps[brpString][1]++;
            });
            Brps._brps = Object.values(brps).sort((a, b) => b[1] - a[1]);
        }
        return Brps._brps;
    }
}
