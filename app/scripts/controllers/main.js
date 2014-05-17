'use strict';

angular.module('angularTetrisApp')
.controller('MainCtrl', [
	'$scope',
	'Piece',
	'Render',
	'Stage',
	'$interval',
	function ($scope,Piece,Render,Stage,$interval) {
		var piece = {};
		var loopInterval = null;
		$scope.isRunning = function(){
			return loopInterval !== null;
		};
		var initialized = false;
		$scope.start = function(){
			if(!initialized){
				newPiece();
				draw();
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
		$scope.playPause = function(){
			if($scope.isRunning()){
				$scope.stop();
			} else {
				$scope.start();
			}
		};
		//movement
		$scope.rotate    = function(){ Piece.rotate(piece);    draw(); };
		$scope.moveRight = function(){ Piece.moveRight(piece); draw(); };
		$scope.moveLeft  = function(){ Piece.moveLeft(piece);  draw(); };
		$scope.moveUp    = function(){ Piece.moveUp(piece);    draw(); };
		$scope.drop      = function(){ Piece.drop(piece);      draw(); };
		$scope.moveDown  = function(){
			if(!Piece.moveDown(piece)){//the piece has come to rest
				Stage.absorbPiece(piece);
				newPiece();
			}
			draw();
		};
		//
		function newPiece(){
			if('element' in piece){
				piece.element.detach();
			}
			piece = Piece.Random();
			Stage.element.append(piece.element);
			piece.x = 10;
			draw();
		}

		var newShadowPiece = (function(){
			var _shadowPiece = {};
			return function(){
				if('element' in _shadowPiece){
					_shadowPiece.element.remove();
				}
				_shadowPiece = Piece.Shadow(piece);
				Stage.element.append(_shadowPiece.element);
				return _shadowPiece;
			}
		})();

		function draw(){
			Render.piece(piece);
			Stage.blocks.forEach(Render.block);
			Render.piece(newShadowPiece());
		}
	}
]);
