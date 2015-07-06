/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	ceil = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number ceil', function tests() {

	it( 'should export a function', function test() {
		expect( ceil ).to.be.a( 'function' );
	});

	it( 'should evaluate the ceil function', function test() {
		assert.strictEqual( ceil( 9.5 ), 10 );
		assert.strictEqual( ceil( -3.1 ), -3 );
		assert.strictEqual( ceil( 4.7 ), 5 );
		assert.strictEqual( ceil( 12.2 ), 13 );
	});

	it( 'should return NaN if provided a NaN', function test() {
		var val = ceil( NaN );
		assert.isNumber( val );
		assert.ok( val !== val );
	});

	it( 'should return a numeric value if provided a numeric value', function test() {
		assert.isNumber( ceil( 1.5 ) );
	});

});
