'use strict';

angular.module('angularTetrisApp')
.service('Stage', function Stage() {
	var stage = {
		element: null,
		blockSize: 20,
		blocksWide: 20.5,
		blocksTall: 20.5,
		blocks: [],
		absorbPiece: function(piece){
			var self = this;
			console.log('absorbing piece: ',piece,this.blocks);
			var newBlocks = piece.blocks;
			newBlocks.forEach(function(block){
				block.x = block.x + piece.x;
				block.y = block.y + piece.y;
				block.element.appendTo(self.element);
			});
			this.blocks = this.blocks.concat(newBlocks);
		}
	};
	stage.element = angular.element('<div></div>')
	.css({
		'background':'#666',
		'display':'inline-block',
		'position':'relative',
		'border':'5px solid #333',
		'width':(stage.blockSize * stage.blocksWide) + 'px',
		'height':(stage.blockSize * stage.blocksTall) + 'px'
	});
	return stage;
});
