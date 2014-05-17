'use strict';

angular.module('angularTetrisApp')
.service('Render', ['Stage',function(Stage) {
	Stage.onBlockRemove(function(block,done){
		block.element.fadeOut(200,done);
	});
	return {
		piece: function(piece){
			piece.element.css({
				'left':(Stage.blockSize * piece.x) + 'px',
				'top':(Stage.blockSize * piece.y) + 'px'
			});
			piece.blocks.forEach(this.block);
		},
		block: function(block){
			block.element.css({
				'-webkit-transform':'rotate(-' + block.rotation + 'deg)',
				'left':(Stage.blockSize * (block.x + 0)) + 'px',
				'top':(Stage.blockSize * (block.y + 0)) + 'px'
			});
		}
	}
}]);
