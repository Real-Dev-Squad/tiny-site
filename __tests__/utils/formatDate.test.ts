import MockDate from 'mockdate';

import formatDate from '../../src/utils/formatDate';

beforeEach(() => {
    MockDate.set('2021-08-09T18:00:00.000Z');
});

afterEach(() => {
    MockDate.reset();
});

describe('formatDate', () => {
    it('should return 0s ago', () => {
        const result = formatDate({
            inputDate: '2021-08-09T17:59:59.000Z',
            relativeDuration: true,
            fullDate: false,
        });
        expect(result).toEqual('1s ago');
    });

    it('should return 1m ago', () => {
        const result = formatDate({
            inputDate: '2021-08-09T17:58:59.000Z',
            relativeDuration: true,
            fullDate: false,
        });
        expect(result).toEqual('1m ago');
    });

    it('should return 1h ago', () => {
        const result = formatDate({
            inputDate: '2021-08-09T17:00:00.000Z',
            relativeDuration: true,
            fullDate: false,
        });
        expect(result).toEqual('1h ago');
    });

    it('should return 1d ago', () => {
        const result = formatDate({
            inputDate: '2021-08-08T18:00:00.000Z',
            relativeDuration: true,
            fullDate: false,
        });
        expect(result).toEqual('1d ago');
    });

    it('should return Aug 5, 2021', () => {
        const result = formatDate({
            inputDate: '2021-08-05T00:00:00.000Z',
            relativeDuration: false,
            fullDate: false,
        });
        expect(result).toEqual('August 5, 2021');
    });

    // Add more test cases based on the function's behavior
    it('should return full date and time', () => {
        const result = formatDate({
            inputDate: '2021-08-09T17:59:59.000Z',
            relativeDuration: false,
            fullDate: true,
        });
        expect(result).toEqual('August 9, 2021 at 11:29:59 PM');
    });
});
