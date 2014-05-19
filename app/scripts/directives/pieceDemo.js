'use strict';

angular.module('angularTetrisApp')
.directive('pieceDemo', ['Render',function (Render) {
	var piecesPerRow = 2;
	var colors = ['red','orange','yellow','green','teal','blue','purple'];
	return {
		restrict: 'A',
		scope:{
			pieces:'=pieceDemo'
		},
		link: function (scope, element, attrs) {
			element.addClass('stage');
			element.css({
				'width':'210px',
				'height':'450px'
			});
			scope.$watch('pieces',function(newPieces,oldPieces){
				(oldPieces || []).forEach(function(oldPiece){
					oldPiece.element.remove();
				});
				newPieces.forEach(function(newPiece,i){
					newPiece.x = (i % piecesPerRow) * 5 + 2;
					newPiece.y = (Math.floor(i / piecesPerRow) * 5) + 2;
					var color = colors[i % colors.length];
					newPiece.blocks.forEach(function(block){
						block.color = color;
					});
					Render.piece(newPiece);
					element.append(newPiece.element);
				});
			});
		}
	};
}]);
