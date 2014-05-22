'use strict';

describe('Service: Render', function () {

  // load the service's module
  beforeEach(module('angularTetrisApp'));

  // instantiate service
  var Render,Piece;
  beforeEach(inject(function (_Render_,_Piece_) {
    Render = _Render_;
	Piece = _Piece_;
  }));

  describe("piece render basics",function(){
	  var p;
	  beforeEach(function(){
		  p = Piece.T();
	  });
	  it('gives a piece an element', function () {
		  Render.piece(p);
		  expect('element' in p).toBe(true);
	  });
	  it('the element has one child for each of the piece\'s blocks', function () {
		  Render.piece(p);
		  expect(p.element.children().length).toEqual(p.blocks.length);
	  });
	  it('each block has its own element', function () {
		  Render.piece(p);
		  var allBlocksHaveAnElement = p.blocks.every(function(block){
			  return 'element' in block;
		  });
		  expect(allBlocksHaveAnElement).toBe(true);
	  });
  });
});
