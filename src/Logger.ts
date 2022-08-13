const logEntries = [] as Array<string>;
let originalLog: (...data: any[]) => void;

export const initLogging = () => {
    // tslint:disable-next-line:no-console
    if (!console?.log) return;

    // tslint:disable-next-line:no-console
    originalLog = console.log.bind(console);

    // tslint:disable-next-line:no-console
    console.log = (...args: Array<any>) => {
        logEntries.push(...args);

        // tslint:disable-next-line:no-console
        originalLog.apply(console, args);
    };
};

// eslint-disable-next-line no-console
const log = (message: string, details?: any) => window.console.log(...[message, details]);
export default log;
