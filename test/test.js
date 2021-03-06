/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Validate a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Cast typed arrays to a different data type
	cast = require( 'compute-cast-arrays' ),

	// Module to be tested:
	ceil = require( './../lib' ),

	// Floor function:
	CEIL = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-ceil', function tests() {

	it( 'should export a function', function test() {
		expect( ceil ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				ceil( [1,2,3], {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				ceil( [1,2,3], {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a typed-array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				ceil( new Int8Array([1,2,3]), {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a matrix and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				ceil( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
	});

	it( 'should return NaN if the first argument is neither a number, array-like, or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			// NaN, // allowed
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( ceil( values[ i ] ) ) );
		}
	});

	it( 'should compute the ceil function when provided a number', function test() {
		assert.strictEqual( ceil( 0.4 ), 1 );
		assert.strictEqual( ceil( 1.8 ), 2 );

		assert.isTrue( isnan( ceil( NaN ) ) );
	});

	it( 'should evaluate the ceil function when provided a plain array', function test() {
		var data, actual, expected;

		data = [
			-9.4,
			-4.1,
			-2.9,
			-0.5,
			0,
			0.3,
			2,
			3.9,
			4.2,
			5.1
		];
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

		actual = ceil( data );
		assert.notEqual( actual, data );

		assert.deepEqual( actual, expected );

		// Mutate...
		actual = ceil( data, {
			'copy': false
		});
		assert.strictEqual( actual, data );

		assert.deepEqual( actual, expected );

	});

	it( 'should evaluate the ceil function when provided a typed array', function test() {
		var data, actual, expected;

		data = new Float32Array([
			-9.4,
			-4.1,
			-2.9,
			-0.5,
			0,
			0.3,
			2,
			3.9,
			4.2,
			5.1
		]);
		expected = new Int32Array([
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
		]);


		actual = ceil( data );
		assert.notEqual( actual, data );

		assert.deepEqual( actual, expected );

		// Mutate:
		actual = ceil( data, {
			'copy': false
		});
		expected = new Float32Array([
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
		]);
		assert.strictEqual( actual, data );

		assert.deepEqual( actual, expected );
	});

	it( 'should evaluate the ceil function element-wise and return an array of a specific type', function test() {
		var data, actual, expected;

		data = [ -3.3, -2, -1.3, 0, 1.3, 2.9, 3.3 ];
		expected = new Int8Array( [ -3, -2, -1, 0, 2, 3, 4 ] );

		actual = ceil( data, {
			'dtype': 'int8'
		});
		assert.notEqual( actual, data );
		assert.strictEqual( actual.BYTES_PER_ELEMENT, 1 );
		assert.deepEqual( actual, expected );
	});

	it( 'should evaluate the ceil function element-wise using an accessor', function test() {
		var data, actual, expected;

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

		actual = ceil( data, {
			'accessor': getValue
		});
		assert.notEqual( actual, data );

		assert.deepEqual( actual, expected );

		// Mutate:
		actual = ceil( data, {
			'accessor': getValue,
			'copy': false
		});
		assert.strictEqual( actual, data );

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should evaluate the ceil function element-wise and deep set', function test() {
		var data, actual, expected;

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

		actual = ceil( data, {
			'path': 'x.1'
		});

		assert.strictEqual( actual, data );

		assert.deepEqual( actual, expected );

		// Specify a path with a custom separator...
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
		actual = ceil( data, {
			'path': 'x/1',
			'sep': '/'
		});
		assert.strictEqual( actual, data );

		assert.deepEqual( actual, expected );

	});

	it( 'should evaluate the ceil function element-wise when provided a matrix', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float64Array( 25 );
		d2 = new Int32Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i / 5;
			d2[ i ] = CEIL( i / 5 );
		}
		mat = matrix( d1, [5,5], 'float64' );
		out = ceil( mat );

		assert.deepEqual( out.data, d2 );

		// Mutate...
		out = ceil( mat, {
			'copy': false
		});
		assert.strictEqual( mat, out );
		assert.deepEqual( mat.data, cast( d2, 'float64') );
	});

	it( 'should evaluate the ceil function element-wise and return a matrix of a specific type', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float64Array( 25 );
		d2 = new Float32Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i / 5;
			d2[ i ] = CEIL( i / 5 );
		}
		mat = matrix( d1, [5,5], 'float64' );
		out = ceil( mat, {
			'dtype': 'float32'
		});

		assert.strictEqual( out.dtype, 'float32' );
		assert.deepEqual( out.data, d2 );
	});

	it( 'should return an empty data structure if provided an empty data structure', function test() {
		assert.deepEqual( ceil( [] ), [] );
		assert.deepEqual( ceil( matrix( [0,0] ) ).data, new Int32Array() );
		assert.deepEqual( ceil( new Int8Array() ), new Int32Array() );
	});

});
