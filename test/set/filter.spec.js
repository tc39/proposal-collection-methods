'use strict';

import {assert} from 'chai';

describe.skip('Set.prototype.filter', () => {
    it('Should be present', () => {
        const set = new Set();
        assert.isFunction(set.filter);
        assert.isFunction(Set.prototype.filter);
    })
})
