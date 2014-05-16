'use strict';

describe('Service: Piecerender', function () {

  // load the service's module
  beforeEach(module('angularTetrisApp'));

  // instantiate service
  var PieceRender,Piece;
  beforeEach(inject(function (_Piecerender_,_Piece_) {
    PieceRender = _Piecerender_;
	Piece = _Piece_;
  }));

  describe("piece render basics",function(){
	  var p;
	  beforeEach(function(){
		  p = Piece.M();
	  });
	  it('gives a piece an element', function () {
		  PieceRender(p);
		  expect('element' in p).toBe(true);
	  });
	  it('the element has one child for each of the piece\'s blocks', function () {
		  PieceRender(p);
		  expect(p.element.children().length).toEqual(p.blocks.length);
	  });
	  it('each block has its own element', function () {
		  PieceRender(p);
		  var allBlocksHaveAnElement = p.blocks.every(function(block){
			  return 'element' in block;
		  });
		  expect(allBlocksHaveAnElement).toBe(true);
	  });
  });
});
