'use strict';

angular.module('angularTetrisApp')
.service('Render', ['Stage',function(Stage) {
	var sideLength = (Stage.blockSize * 5) + 'px';
	return {
		piece: function(piece){
			if(!('element' in piece)){
				piece.element = angular
					.element('<div></div>')
					.addClass('piece')
					.css({
						'display':'inline-block',
						'position':'absolute',
						'width':sideLength,
						'height':sideLength
					})
					.appendTo(Stage.element);
			}
			piece.element.css({
				'left':(Stage.blockSize * piece.x) + 'px',
				'top':(Stage.blockSize * piece.y) + 'px'
			});
			//piece.element.css('-webkit-transform', 'rotate(' + piece.rotation + 'deg)');
			var self = this;
			piece.blocks.forEach(function(block){
				if(!('element' in block)){
					block.element = angular.element('<div></div>');
					piece.element.append(block.element);
					block.element.css({
						'position':'absolute',
						'background': block.color,
						'width':Stage.blockSize + 'px',
						'height':Stage.blockSize + 'px'
					});
				}
				self.block(block);
			});
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
