'use strict';

// MODULES //

var CEIL = require( './number.js' );


// CEIL FUNCTION //

/**
* FUNCTION: ceil( out, matrix )
*	Evaluates the ceil function for each matrix element.
*
* @param {Matrix} out - output matirx
* @param {Matrix} arr - input matrix
* @returns {Matrix} output matrix
*/
function ceil( y, x ) {
	var len = x.length,
		i;
	if ( y.length !== len ) {
		throw new Error( 'ceil()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		y.data[ i ] = CEIL( x.data[ i ] );
	}
	return y;
} // end FUNCTION ceil()


// EXPORTS //

module.exports = ceil;
