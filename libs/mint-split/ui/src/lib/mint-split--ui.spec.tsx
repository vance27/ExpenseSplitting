import { render } from '@testing-library/react';

import MintSplitUi from './mint-split--ui';

describe('MintSplitUi', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<MintSplitUi />);
        expect(baseElement).toBeTruthy();
    });
});
