'use strict';

angular.module('angularTetrisApp')
.controller('MainCtrl', [
	'$scope',
	'Piece',
	'Render',
	'Stage',
	'$interval',
	function ($scope,Piece,Render,Stage,$interval) {
		$scope.piece = {};
		var loopInterval = null;
		$scope.isRunning = function(){
			return loopInterval !== null;
		};
		var initialized = false;
		$scope.start = function(){
			if(!initialized){
				newPiece();
				render();
				initialized = true;
			}
			loopInterval = $interval(function(){
				$scope.moveDown();
			},1000);
		}
		$scope.stop = function(){
			$interval.cancel(loopInterval);
			loopInterval = null;
		};
		//movement
		$scope.rotate    = function(){ Piece.rotate($scope.piece);    render(); };
		$scope.moveRight = function(){ Piece.moveRight($scope.piece); render(); };
		$scope.moveLeft  = function(){ Piece.moveLeft($scope.piece);  render(); };
		$scope.moveUp    = function(){ Piece.moveUp($scope.piece);    render(); };
		$scope.moveDown  = function(){
			if(!Piece.moveDown($scope.piece)){//the piece has come to rest
				Stage.absorbPiece($scope.piece);
				newPiece();
			}
			render();
		};
		//
		function newPiece(){
			if('element' in $scope.piece){
				$scope.piece.element.detach();
			}
			$scope.piece = Piece.Random();
			$scope.piece.x = 10;
			render();
		}

		function render(){
			Render.piece($scope.piece);
			Stage.blocks.forEach(Render.block);
		}
	}
]);
