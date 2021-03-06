/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	ceil = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor ceil', function tests() {

	it( 'should export a function', function test() {
		expect( ceil ).to.be.a( 'function' );
	});

	it( 'should evaluate the ceil function using an accessor', function test() {
		var data, actual, expected;

		data = [
			{'x': -9.4},
			{'x': -4.1},
			{'x': -2.9},
			{'x': -0.5},
			{'x': 0},
			{'x': 0.3},
			{'x': 2},
			{'x': 3.9},
			{'x': 4.2},
			{'x': 5.1}
		];
		actual = new Array( data.length );

		actual = ceil( actual, data, getValue );

		expected = [
			-9,
			-4,
			-2,
			-0,
			0,
			1,
			2,
			4,
			5,
			6
		];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}

		data = [
			[1,1e-306],
			[2,-1e-306],
			[3,1e-299],
			[4,-1e-299],
			[5,0.8],
			[6,-0.8],
			[7,1],
			[8,-1],
			[9,10.9],
			[10,-10],
			[11,2.4],
			[12,-2.1],
			[13,3.2],
			[14,-3]
		];

		expected = [
			1,
			-0,
			1,
			-0,
			1,
			-0,
			1,
			-1,
			11,
			-10,
			3,
			-2,
			4,
			-3
		];

		actual = new Array( data.length );
		actual = ceil( actual, data, getValue2 );

		assert.deepEqual( actual, expected );
		function getValue2( d ) {
			return d[ 1 ];
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( ceil( [], [], getValue ), [] );
		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = new Array( data.length );
		actual = ceil( actual, data, getValue );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

});
