'use strict';

describe('Service: Piece', function () {

	// load the service's module
	beforeEach(module('angularTetrisApp'));

	// instantiate service
	var Piece;
	beforeEach(inject(function (_Piece_) {
		Piece = _Piece_;
	}));

	describe('Z piece',function(){
		var p;
		beforeEach(function(){
			p = Piece.Z();
		});
		it('has a particular orientation', function () {
			expectPieceCoordsToBe(p,[
				[-1,-1],
				[-1, 0],
				[ 0, 0],
				[ 0, 1]
			]);
		});
		it('has a different orientation after rotation', function () {
			Piece.justRotateCW(p);
			expectPieceCoordsToBe(p,[
				[-1, 1],
				[ 0, 1],
				[ 0, 0],
				[ 1, 0]
			]);
		});
		it('has a different orientation after CCW rotation', function () {
			Piece.justRotateCCW(p);
			expectPieceCoordsToBe(p,[
				[ 1,-1],
				[ 0,-1],
				[ 0, 0],
				[-1, 0]
			]);
		});
		it('has a different orientation after two rotations', function () {
			Piece.justRotateCW(p);
			Piece.justRotateCW(p);
			expectPieceCoordsToBe(p,[
				[ 1, 1],
				[ 1, 0],
				[ 0, 0],
				[ 0,-1]
			]);
		});
		it('has a different orientation after three rotations', function () {
			Piece.justRotateCW(p);
			Piece.justRotateCW(p);
			Piece.justRotateCW(p);
			expectPieceCoordsToBe(p,[
				[ 1,-1],
				[ 0,-1],
				[ 0, 0],
				[-1, 0]
			]);
		});
	});

	describe('O piece',function(){
		var p;
		beforeEach(function(){
			p = Piece.O();
		});
		it('has a particular orientation', function () {
			expectPieceCoordsToBe(p,[
				[0,0],
				[0,1],
				[1,1],
				[1,0]
			]);
		});
		it('has a different orientation after rotation', function () {
			Piece.justRotateCW(p);
			expectPieceCoordsToBe(p,[
				[0,1],
				[1,1],
				[1,0],
				[0,0]
			]);
		});
		it('has a different orientation after two rotations', function () {
			Piece.justRotateCW(p);
			Piece.justRotateCW(p);
			expectPieceCoordsToBe(p,[
				[1,1],
				[1,0],
				[0,0],
				[0,1]
			]);
		});
		it('has a different orientation after three rotations', function () {
			Piece.justRotateCW(p);
			Piece.justRotateCW(p);
			Piece.justRotateCW(p);
			expectPieceCoordsToBe(p,[
				[1,0],
				[0,0],
				[0,1],
				[1,1]
			]);
		});
		it('has has the same orientation after four rotations', function () {
			Piece.justRotateCW(p);
			Piece.justRotateCW(p);
			Piece.justRotateCW(p);
			Piece.justRotateCW(p);
			expectPieceCoordsToBe(p,[
				[0,0],
				[0,1],
				[1,1],
				[1,0]
			]);
		});
	});
	describe('L piece',function(){
		var p;
		beforeEach(function(){
			p = Piece.L();
		});
		it('has a particular orientation', function () {
			expectPieceCoordsToBe(p,[
				[ 0, 1],
				[ 0, 0],
				[ 0,-1],
				[ 1,-1]
			]);
		});
		it('has a particular orientation after one rotation', function () {
			Piece.justRotateCW(p);
			expectPieceCoordsToBe(p,[
				[ 1, 0],
				[ 0, 0],
				[-1, 0],
				[-1,-1]
			]);
		});
	});
	describe('M piece',function(){
		var p;
		beforeEach(function(){
			p = Piece.T();
		});
		it('has a particular orientation', function () {
			expectPieceCoordsToBe(p,[
				[-1, 0],
				[ 0, 0],
				[ 0, 1],
				[ 1, 0]
			]);
		});
		it('has a particular orientation after rotation', function () {
			Piece.justRotateCW(p);
			expectPieceCoordsToBe(p,[
				[ 0, 1],
				[ 0, 0],
				[ 1, 0],
				[ 0,-1]
			]);
		});
	});
	describe('I piece',function(){
		var p;
		beforeEach(function(){
			p = Piece.I();
		});
		it('has a particular orientation', function () {
			expectPieceCoordsToBe(p,[
				[-2, 0],
				[-1, 0],
				[ 0, 0],
				[ 1, 0]
			]);
		});
		it('has a particular orientation after rotation', function () {
			Piece.justRotateCW(p);
			expectPieceCoordsToBe(p,[
				[ 0, 2],
				[ 0, 1],
				[ 0, 0],
				[ 0,-1]
			]);
		});
		it('has a particular orientation after two rotations', function () {
			Piece.justRotateCW(p);
			Piece.justRotateCW(p);
			expectPieceCoordsToBe(p,[
				[ 2, 0],
				[ 1, 0],
				[ 0, 0],
				[-1, 0]
			]);
		});
		it('has a particular orientation after three rotations', function () {
			Piece.justRotateCW(p);
			Piece.justRotateCW(p);
			Piece.justRotateCW(p);
			expectPieceCoordsToBe(p,[
				[ 0,-2],
				[ 0,-1],
				[ 0, 0],
				[ 0, 1]
			]);
		});
		it('has a same orientation after four rotations', function () {
			Piece.justRotateCW(p);
			Piece.justRotateCW(p);
			Piece.justRotateCW(p);
			Piece.justRotateCW(p);
			expectPieceCoordsToBe(p,[
				[-2, 0],
				[-1, 0],
				[0, 0],
				[1, 0]
			]);
		});
	});
});

function expectPieceCoordsToBe(piece, coords){
	expect(piece.blocks.length).toBe(coords.length);
	var actualCoords = piece.blocks.map(function(block){
		return [block.x, block.y];
	});
	expect(coords).toEqual(actualCoords);
}
