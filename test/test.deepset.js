/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	ceil = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset ceil', function tests() {

	it( 'should export a function', function test() {
		expect( ceil ).to.be.a( 'function' );
	});

	it( 'should compute the ceil function and deep set', function test() {
		var data, expected;

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

		data = ceil( data, 'x' );

		expected = [
			{'x': -9},
			{'x': -4},
			{'x': -2},
			{'x': -0},
			{'x': 0},
			{'x': 1},
			{'x': 2},
			{'x': 4},
			{'x': 5},
			{'x': 6}
		];

		assert.deepEqual( data, expected );

		// Custom separator...
		data = [
			{'x':[9,-9.4]},
			{'x':[9,-4.1]},
			{'x':[9,-2.9]},
			{'x':[9,-0.5]},
			{'x':[9,0]},
			{'x':[9,0.3]},
			{'x':[9,2]},
			{'x':[9,3.9]},
			{'x':[9,4.2]},
			{'x':[9,5.1]}
		];

		data = ceil( data, 'x/1', '/' );
		expected = [
			{'x':[9,-9]},
			{'x':[9,-4]},
			{'x':[9,-2]},
			{'x':[9,-0]},
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,2]},
			{'x':[9,4]},
			{'x':[9,5]},
			{'x':[9,6]}
		];

		assert.deepEqual( data, expected, 'custom separator' );

	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( ceil( [], 'x' ), [] );
		assert.deepEqual( ceil( [], 'x', '/' ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = ceil( data, 'x' );

		expected = [
			{'x':NaN},
			{'x':NaN},
			{'x':NaN},
			{'x':NaN}
		];

		assert.deepEqual( data, expected );
	});

});
