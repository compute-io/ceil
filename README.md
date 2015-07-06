ceil
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes element-wise the smallest integer greater than or equal to a numeric value

The [ceil function](https://en.wikipedia.org/wiki/Floor_and_ceiling_functions) is defined as

<div class="equation" align="center" data-raw-text="\operatorname{ceil}(x) = \lceil x \rceil=\min\,\{n\in\mathbb{Z}\mid n\ge x\}" data-equation="eq:ceil_function">
	<img src="" alt="Equation of the ceil function.">
	<br>
</div>


## Installation

``` bash
$ npm install compute-ceil
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var ceil = require( 'compute-ceil' );
```


#### ceil( x[, options] )

Evaluates the [ceil function](https://en.wikipedia.org/wiki/Floor_and_ceiling_functions) (element-wise). `x` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix). Values may include `NaN`, `+infinity`, and `-infinity`.

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	out,
	i;

out = ceil( 2.3 );
// returns 3

out = ceil( -1.4 );
// returns -1

out = ceil( [ -10.3, -1.2, 0, 1, 10.9 ] );
// returns [ -10, -1, 0, 1, 11 ]

data = [ 0.3, 1.9, 2.3 ];
out = ceil( data );
// returns [ 1, 2, 3 ]

data = new Int8Array( data );
out = ceil( data );
// returns Float64Array( [ 1, 2, 3 ] )

data = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i / 2;
}
mat = matrix( data, [3,2], 'float64' );
/*
	[ 0  0.5
	  1  1.5
	  2  2.5 ]
*/

out = ceil( mat );
/*
	[ 0 1
      1 2
      2 3 ]
*/
```

The function accepts the following `options`:

* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `int32`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	['beep', -5.3],
	['boop', -1.4],
	['bip', 0.8],
	['bap', 1.4],
	['baz', 10.5]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = ceil( data, {
	'accessor': getValue
});
// returns [ -5, -1, 1, 2, 11 ]
```

To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,-5.3]},
	{'x':[1,-1.4]},
	{'x':[2,0.8]},
	{'x':[3,1.4]},
	{'x':[4,10.5]}
];

var out = ceil( data, 'x|1', '|' );
/*
	[
		{'x':[0,-5]},
		{'x':[1,-1]},
		{'x':[2,1]},
		{'x':[3,2]},
		{'x':[4,11]}
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `int32` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var data, out;

data = new Float32Array( [0.2, 1.4, 2.9] );

out = ceil( data, {
	'dtype': 'int16'
});
// returns Int16Array( [1,2,3] )

// Works for plain arrays, as well...
out = ceil( [0.2, 1.4, 2.9], {
	'dtype': 'uint8'
});
// returns Uint8Array( [1,2,3] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var data,
	bool,
	mat,
	out,
	i;

var data = [ -5.3, -1.4, 0.8, 1.4, 10.5 ];

var out = ceil( data, {
	'copy': false
});
// returns [ -5, -1, 1, 2, 11 ]

bool = ( data === out );
// returns true

data = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i / 2;
}
mat = matrix( data, [3,2], 'float64' );
/*
	[ 0  0.5
	  1  1.5
	  2  2.5 ]
*/

out = ceil( mat, {
	'copy': false
});
/*
	[ 0 1
      1 2
      2 3 ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a numeric value, the evaluated [error function](http://en.wikipedia.org/wiki/Error_function) is `NaN`.

	``` javascript
	var data, out;

	out = ceil( null );
	// returns NaN

	out = ceil( true );
	// returns NaN

	out = ceil( {'a':'b'} );
	// returns NaN

	out = ceil( [ true, null, [] ] );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	data = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = ceil( data, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = ceil( data, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = ceil( [ true, null, [] ], {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```


## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	ceil = require( 'compute-ceil' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 20 - 10;
}
out = ceil( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = ceil( data, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = ceil( data, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Int32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 20 - 10;
}
tmp = ceil( data );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}

// Matrices...
mat = matrix( data, [5,2], 'int32' );
out = ceil( mat );


// Matrices (custom output data type)...
out = ceil( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-ceil.svg
[npm-url]: https://npmjs.org/package/compute-ceil

[travis-image]: http://img.shields.io/travis/compute-io/ceil/master.svg
[travis-url]: https://travis-ci.org/compute-io/ceil

[coveralls-image]: https://img.shields.io/coveralls/compute-io/ceil/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/ceil?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/ceil.svg
[dependencies-url]: https://david-dm.org/compute-io/ceil

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/ceil.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/ceil

[github-issues-image]: http://img.shields.io/github/issues/compute-io/ceil.svg
[github-issues-url]: https://github.com/compute-io/ceil/issues
