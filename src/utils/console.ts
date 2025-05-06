import 'colors';
import * as fs from 'fs';

/**
 * @param {string[]} message 
 */
const info = (...message: string[]) => {
    const time = new Date().toLocaleTimeString();
    let fileContent = fs.readFileSync('./terminal.log', 'utf-8');

    console.info(`[${time}]`.gray, '[Info]'.blue, message.join(' '));
    fileContent += [`[${time}]`.gray, '[Info]'.blue, message.join(' ')].join(' ') + '\n';

    fs.writeFileSync('./terminal.log', fileContent, 'utf-8');
}

/**
 * @param {string[]} message 
 */
const success = (...message: string[]) => {
    const time = new Date().toLocaleTimeString();
    let fileContent = fs.readFileSync('./terminal.log', 'utf-8');

    console.info(`[${time}]`.gray, '[OK]'.green, message.join(' '));
    fileContent += [`[${time}]`.gray, '[OK]'.green, message.join(' ')].join(' ') + '\n';

    fs.writeFileSync('./terminal.log', fileContent, 'utf-8');
}

/**
 * @param {string[]} message 
 */
const error = (...message: string[]) => {
    const time = new Date().toLocaleTimeString();
    let fileContent = fs.readFileSync('./terminal.log', 'utf-8');

    console.error(`[${time}]`.gray, '[Error]'.red, message.join(' '));
    fileContent += [`[${time}]`.gray, '[Error]'.red, message.join(' ')].join(' ') + '\n';

    fs.writeFileSync('./terminal.log', fileContent, 'utf-8');
}

/**
 * @param {string[]} message 
 */
const warn = (...message: string[]) => {
    const time = new Date().toLocaleTimeString();
    let fileContent = fs.readFileSync('./terminal.log', 'utf-8');

    console.warn(`[${time}]`.gray, '[Warning]'.yellow, message.join(' '));
    fileContent += [`[${time}]`.gray, '[Warning]'.yellow, message.join(' ')].join(' ') + '\n';

    fs.writeFileSync('./terminal.log', fileContent, 'utf-8');
}

export { info, success, error, warn };