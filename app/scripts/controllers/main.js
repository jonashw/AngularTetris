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
		var shadowPiece = {};
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
		$scope.rotate    = moveWithShadow.bind(null,Piece.rotate);
		$scope.moveRight = moveWithShadow.bind(null,Piece.moveRight);
		$scope.moveLeft  = moveWithShadow.bind(null,Piece.moveLeft);
		function moveWithShadow(fn){
			fn(piece);
			Piece.castShadow(fn, piece, shadowPiece);
			draw();
		}
		$scope.drop = function(){
			Piece.drop(piece);
			draw();
		};
		$scope.moveDown = function(){
			if(!Piece.moveDown(piece)){//the piece has come to rest
				Stage.absorbPiece(piece);
				shadowPiece.element.remove();
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
			shadowPiece = Piece.Shadow(piece);
			Stage.element.append(shadowPiece.element);
			draw();
		}

		function draw(){
			Stage.blocks.forEach(Render.block);
			Render.piece(piece);
			Render.piece(shadowPiece);
		}
	}
]);
