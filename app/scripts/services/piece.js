'use strict';

angular.module('angularTetrisApp')
.service('Piece', ['Stage',function (Stage) {
	var blockSize = Stage.blockSize + 'px';
	var canRotateCW    = shadowInLegalPosition.bind(null, rotateCW);
	var canRotateCCW    = shadowInLegalPosition.bind(null, rotateCCW);
	var canMoveDown  = shadowInLegalPosition.bind(null, moveDown);
	var canMoveRight = shadowInLegalPosition.bind(null, moveRight);
	var canMoveLeft  = shadowInLegalPosition.bind(null, moveLeft);
	function canMoveUp   (piece){ return false; }

	function shadowInLegalPosition(fn, piece){
		var shadowPiece = clonePiece(piece);
		fn(shadowPiece);
		return inLegalPosition(shadowPiece);
	}

	function inLegalPosition(piece){
		return piece.blocks.every(function(block){
			return !blockOverlapsWithStageBlocks(piece, block)
				&& blockWithinStage(piece, block);
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

	function rotateCCW(piece){
		if(piece.zeroCenter){
			piece.blocks.forEach(rotateBlock.CCW);
		} else {
			weirdRotate(piece);
		}
		return true;
	}
	function rotateCW(piece){
		if(piece.zeroCenter){
			piece.blocks.forEach(rotateBlock.CW);
		} else {
			weirdRotate(piece);
		}
		return true;
	}

	var rotateBlock = (function(){
		//my god, boy.  Use some trig!
		var _positionConnections = [
			[{x:-1, y:-1}, {x:-1, y: 1}],
			[{x:-1, y: 0}, {x: 0, y: 1}],
			[{x:-1, y: 1}, {x: 1, y: 1}], 
			[{x: 0, y:-1}, {x:-1, y: 0}],
			[{x: 0, y: 0}, {x: 0, y: 0}],
			[{x: 0, y: 1}, {x: 1, y: 0}],
			[{x: 1, y:-1}, {x:-1, y:-1}],
			[{x: 1, y: 0}, {x: 0, y:-1}],
			[{x: 1, y: 1}, {x: 1, y:-1}],
			[{x:-2, y: 0}, {x: 0, y: 2}],
			[{x: 0, y: 2}, {x: 2, y: 0}],
			[{x: 2, y: 0}, {x: 0, y:-2}],
			[{x: 0, y:-2}, {x:-2, y: 0}]
		];
		var _truthTable = {
			CW:{},
			CCW:{}
		};
		_positionConnections.forEach(function(connection){
			var from = connection[0];
			var to = connection[1];
			var fromKey = from.x + ',' + from.y;
			var toKey = to.x + ',' + to.y;
			_truthTable.CW[fromKey] = to;
			_truthTable.CCW[toKey] = from;
		});
		function _rotate(truthTable,block){
			var newPosition = truthTable[block.x + ',' + block.y];
			block.x = newPosition.x;
			block.y = newPosition.y;
			return true;
		}
		return {
			CW: function(block){
				block.rotation += 90;
				if(block.rotation >= 360){
					block.rotation -= 360;
				}
				return _rotate(_truthTable.CW,block);
			},
			CCW: function(block){
				block.rotation -= 90;
				if(block.rotation <= -360){
					block.rotation += 360;
				}
				return _rotate(_truthTable.CCW,block);
			}
		};
		return function(block){
			var newPosition = _rotationCWTruthTable[block.x + ',' + block.y];
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

	var colors = ['red','orange','yellow','green','teal','blue','purple'];
	function randomColor(){
		var index = Math.floor(Math.random() * colors.length);
		var color = colors[index];
		console.log('random color:',color);
		return color;
	}

	function createPiece(zeroCenter,blocks){
		var element = angular.element('<div></div>');
		element.addClass('piece');
		var piece = {
			element: element,
			zeroCenter: zeroCenter,
			x:0,
			y:0
		};
		var copiedBlocks = blocks.map(cloneBlock);
		var color = randomColor();
		copiedBlocks.forEach(function(block){
			block.rotation = 0;
			block.color = color;
			block.element = angular.element('<div></div>');
			block.element.addClass('block');
			block.element.css({
				'width':blockSize,
				'height':blockSize
			});
			piece.element.append(block.element);
		});
		piece.blocks = copiedBlocks;
		return piece;
	}

	function createShadowPiece(piece){
		var shadowPiece = createPiece(piece.zeroCenter, piece.blocks);
		shadowPiece.element.addClass('shadow-piece');
		shadowPiece.x = piece.x;
		shadowPiece.blocks.forEach(function(block,i){
			block.color = piece.blocks[i].color;
		});
		drop(shadowPiece);
		return shadowPiece;
	}

	function clonePiece(piece){
		//a piece's element doesn't matter here
		return {
			rotation: piece.rotation,
			zeroCenter: piece.zeroCenter,
			blocks: piece.blocks.map(cloneBlock),
			x: piece.x,
			y: piece.y
		};
	}
	function drop(piece){
		while(canMoveDown(piece)){
			moveDown(piece);
		}
	}

	function cloneBlock(block){
		//a block's element doesn't matter here
		return {
			rotation: block.rotation,
			x: block.x,
			y: block.y,
			color: block.color
		};
	}

	//API
	return {
		moveLeft:  function(piece){ return canMoveLeft(piece)  && moveLeft(piece);  },
		moveRight: function(piece){ return canMoveRight(piece) && moveRight(piece); },
		moveDown:  function(piece){ return canMoveDown(piece)  && moveDown(piece);  },
		moveUp:    function(piece){ return canMoveUp(piece)    && moveUp(piece);    },
		rotate:    function(piece){ return canRotateCW(piece)  && rotateCW(piece);  },
		rotateCW:  function(piece){ return canRotateCW(piece)  && rotateCW(piece);  },
		rotateCCW: function(piece){ return canRotateCCW(piece) && rotateCCW(piece); },
		drop:      function(piece){ drop(piece); return true; },
		no_op:     function(piece){ },
		castShadow: function(fn, piece, shadowPiece){
			shadowPiece.y = piece.y;
		   	fn(shadowPiece);
			drop(shadowPiece);
		},
		Random: function(){
			var pieces = ['T','L','J','S','Z','I','O'];
			var randomKey = pieces[Math.floor(pieces.length * Math.random())];
			console.log('next random piece:',randomKey);
			return this[randomKey]();
		},
		Shadow: function(piece){
			return createShadowPiece(piece);
		},
		justRotateCW: rotateCW.bind(null),
		justRotateCCW: rotateCCW.bind(null),
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
		T: createPiece.bind(this, true, [
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
