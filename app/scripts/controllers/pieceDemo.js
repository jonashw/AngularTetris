'use strict';

angular.module('angularTetrisApp')
.controller('PieceDemoCtrl', [
	'$scope',
	'Piece',
	'Render',
	function ($scope,Piece,Render) {
		$scope.pieces = [
			Piece.O(),
			Piece.L(),
			Piece.J(),
			Piece.S(),
			Piece.Z(),
			Piece.I(),
			Piece.M()
		];
	}
]);
