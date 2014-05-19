'use strict';

angular.module('angularTetrisApp')
.service('Render', ['Stage',function(Stage) {
	var self;
	Stage.onBlockRemove(function(block,done){
		block.element.fadeOut(200,done);
	});
	Stage.onRowRemove(function(){
		self.blocks(Stage.blocks);
	});
	function renderBlock(block){
		block.element.css({
			'-webkit-transform':'rotate(-' + block.rotation + 'deg)',
			'left':(Stage.blockSize * (block.x + 0)) + 'px',
			'top':(Stage.blockSize * (block.y + 0)) + 'px'
		});
		block.element.addClass('block-' + block.color);
	}
	var render = {
		piece: function(piece){
			piece.element.css({
				'left':(Stage.blockSize * piece.x) + 'px',
				'top':(Stage.blockSize * piece.y) + 'px'
			});
			self.blocks(piece.blocks);
		},
		blocks: function(blocks){
			blocks.forEach(renderBlock);
		}
	};
	self = render;
	return render;
}]);
