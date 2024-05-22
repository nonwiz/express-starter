import _ from 'lodash';
import {routing} from "@/routes";

export function getAllKeys(obj: Record<string, any>): string[] {
    const keys: string[] = [];

    function recursiveKeys(data: Record<string, any>, parentKey: string = '') {
        _.forOwn(data, (value, key) => {
            const fullKey = parentKey ? `${parentKey}.${key}` : key;
            keys.push(fullKey);
            if (_.isObject(value) && !_.isEmpty(value)) {
                recursiveKeys(value, fullKey);
            }
        });
    }

    recursiveKeys(obj);
    return keys;
}

function compilePathToRegex(paths: string[]): RegExp[] {
    return paths.map(path => {
        const regexString = path.replace(/:[^/]+/g, '[^/]+');
        return new RegExp(`^${regexString}$`, 'i');
    });
}

const compiledRegexesUrls = compilePathToRegex(getAllKeys(routing));

export function isUrlValid(url: string): boolean {
    const cleanedUrl = url.startsWith('/') ? url.slice(1) : url;
    return compiledRegexesUrls.some(regex => regex.test(cleanedUrl));
}
