'use strict';

angular.module('angularTetrisApp')
.service('Piece', ['Stage',function (Stage) {
	var canRotate    = shadowWithinStage.bind(null, rotate);
	var canMoveDown  = shadowWithinStage.bind(null, moveDown);
	var canMoveRight = shadowWithinStage.bind(null, moveRight);
	var canMoveLeft  = shadowWithinStage.bind(null, moveLeft);
	function canMoveUp   (piece){ return false; }

	function shadowWithinStage(fn, piece){
		var shadowPiece = clonePiece(piece);
		fn(shadowPiece);
		return shadowPiece.blocks.every(function(block){
			return !blockOverlapsWithStageBlocks(shadowPiece, block)
				&& blockWithinStage(shadowPiece, block);
		});
	}

	function blockWithinStage(piece,block){
		return block.x + piece.x >= 0 
		&& block.x + piece.x + 1 <= Stage.blocksWide
		&& block.y + piece.y + 1 <= Stage.blocksTall;
	}

	function blockOverlapsWithStageBlocks(piece, block){
		return Stage.blocks.some(function(stageBlock){
			return (block.x + piece.x) === stageBlock.x
				&& (block.y + piece.y) === stageBlock.y;
		});
	}

	function rotate(piece){
		if(piece.zeroCenter){
			piece.blocks.forEach(rotateBlock);
		} else {
			weirdRotate(piece);
		}
		return true;
	}

	var rotateBlock = (function(){
		//my god, boy.  Use some trig!
		var _rotationTruthTable = {
			'-1,-1': {x:-1, y: 1},
			'-1,0' : {x: 0, y: 1},
			'-1,1' : {x: 1, y: 1}, 
			'0,-1' : {x:-1, y: 0},
			'0,0'  : {x: 0, y: 0},
			'0,1'  : {x: 1, y: 0},
			'1,-1' : {x:-1, y:-1},
			'1,0'  : {x: 0, y:-1},
			'1,1'  : {x: 1, y:-1},
			'-2,0' : {x: 0, y:2},
			'0,2'  : {x: 2, y:0},
			'2,0'  : {x: 0, y:-2},
			'0,-2' : {x: -2, y:0}
		};
		return function(block){
			var newPosition = _rotationTruthTable[block.x + ',' + block.y];
			block.x = newPosition.x;
			block.y = newPosition.y;
			block.rotation += 90;
			if(block.rotation >= 360){
				block.rotation -= 360;
			}
			return true;
		}
	})();

	function weirdRotate(piece){
		var shadowBlocks = piece.blocks.slice(0).map(cloneBlock);
		//the first block takes on the position of the second,
		//the last takes on the position of the first,
		//etc
		var first = shadowBlocks.shift();
		shadowBlocks.push(first);
		for(var i=0; i<piece.blocks.length; i++){
			var src = shadowBlocks[i];
			var dst = piece.blocks[i];
			dst.x = src.x;
			dst.y = src.y;
		}
	}

	function moveLeft (piece){ piece.x--; return true; }
	function moveRight(piece){ piece.x++; return true; }
	function moveUp   (piece){ piece.y--; return true; }
	function moveDown (piece){ piece.y++; return true; }

	function createPiece(zeroCenter,blocks){
		var copiedBlocks = blocks.map(cloneBlock);
		copiedBlocks.forEach(function(block){
			block.rotation = 0;
			block.color = 'pink';
		});
		return {
			zeroCenter: zeroCenter,
			blocks: copiedBlocks,
			x:0,
			y:0
		};
	}

	function clonePiece(piece){
		return {
			rotation: piece.rotation,
			zeroCenter: piece.zeroCenter,
			blocks: piece.blocks.map(cloneBlock),
			x: piece.x,
			y: piece.y
		};
	}

	function cloneBlock(block){
		var clone = {};
		for(var k in block){
			clone[k] = block[k];
		}
		return clone;
	}

	//API
	return {
		moveLeft:  function(piece){ return canMoveLeft(piece)  && moveLeft(piece);  },
		moveRight: function(piece){ return canMoveRight(piece) && moveRight(piece); },
		moveDown:  function(piece){ return canMoveDown(piece)  && moveDown(piece);  },
		moveUp:    function(piece){ return canMoveUp(piece)    && moveUp(piece);    },
		rotate:    function(piece){ return canRotate(piece)    && rotate(piece);    },
		O: createPiece.bind(this,false, [
			{x:0, y:0},
			{x:0, y:1},
			{x:1, y:1},
			{x:1, y:0}
		]),
		Z: createPiece.bind(this, true, [
			{x:-1, y:-1},
			{x:-1, y: 0},
			{x: 0, y: 0},
			{x: 0, y: 1}
		]),
		S: createPiece.bind(this, true, [
			{x: 1, y:-1},
			{x: 1, y: 0},
			{x: 0, y: 0},
			{x: 0, y: 1}
		]),
		L: createPiece.bind(this, true, [
			{x: 0, y: 1},
			{x: 0, y: 0},
			{x: 0, y:-1},
			{x: 1, y:-1}
		]),
		J: createPiece.bind(this, true, [
			{x: 0, y: 1},
			{x: 0, y: 0},
			{x: 0, y:-1},
			{x:-1, y:-1}
		]),
		M: createPiece.bind(this, true, [
			{x:-1, y: 0},
			{x: 0, y: 0},
			{x: 0, y: 1},
			{x: 1, y: 0}
		]),
		I: createPiece.bind(this, true, [
			{x:-2, y: 0},
			{x:-1, y: 0},
			{x: 0, y: 0},
			{x: 1, y: 0}
		])
	};
}]);
