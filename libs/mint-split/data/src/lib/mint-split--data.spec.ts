import { mintSplitData } from './mint-split--data';

describe('mintSplitData', () => {
    it('should work', () => {
        expect(mintSplitData()).toEqual('mint-split--data');
    });
});
