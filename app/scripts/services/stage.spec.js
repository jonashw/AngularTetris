'use strict';

describe('Stage service', function () {
	beforeEach(module('angularTetrisApp'));
	var stage,piece;
	beforeEach(inject(function (Stage,Piece) {
		stage = Stage;
		piece = Piece;
	}));
	describe('highestOccupiedRow',function(){
		it('starts off as 0',function(){
			expect(stage.highestOccupiedRow()).toEqual(0);
		});
		it('becomes 2 when there is a square piece placed',function(){
			var p = piece.O();
			dropPiece(p);
			expect(stage.highestOccupiedRow()).toEqual(2);
		});
		it('becomes 4 when there are two square pieces placed',function(){
			var p = piece.O();
			dropPiece(p);
			var p = piece.O();
			dropPiece(p);
			expect(stage.highestOccupiedRow()).toEqual(4);
		});
		it('becomes 4 when there is a rotated long piece placed',function(){
			var p = piece.I();
			piece.rotate(p);
			dropPiece(p);
			expect(stage.highestOccupiedRow()).toEqual(4);
		});
		it('is 2 when there are multiple square neighbors',function(){
			//there are 18 columns for blocks to fit
			//so 9 2x2 pieces can fit horizontally
			//8 will fit without causing any row clears
			var p;
			for(var i=0; i < 9; i++){
				p = piece.O();
				moveFarRight(p);
				moveLeft(p, 2 * i);
				dropPiece(p);
			}
			expect(stage.highestOccupiedRow()).toEqual(2);
		});
		it('is 0 when 9 square neighbors are placed (and cleared)',function(){
			var p;
			stage.onBlockRemove(function(block,done){
				done();
			});
			for(var i=0; i < 10; i++){
				p = piece.O();
				moveFarRight(p);
				moveLeft(p, 2 * i);
				dropPiece(p);
			}
			expect(stage.highestOccupiedRow()).toEqual(0);
		});
	});
	function dropPiece(p){
		while(piece.moveDown(p)){}
		stage.absorbPiece(p);
	}
	function moveFarRight(p){
		while(piece.moveRight(p)){}
		return p;
	}
	function moveFarLeft(p){
		while(piece.moveLeft(p)){}
		return p;
	}
	function moveLeft(p,n){
		var n = isNaN(n) ? 1 : n;
		for(var i=0; i<n; i++){
			piece.moveLeft(p);
		}
	}
});
