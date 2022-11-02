import React from 'react';

function Error({ items }) {

	if (items.error !== '') {
		return <div data-testid="errorMsg" className="alert error mt-20 slide-up-fade-in">{items.error}</div>
	}
	else {
		return null;
	}
}

export default Error;
