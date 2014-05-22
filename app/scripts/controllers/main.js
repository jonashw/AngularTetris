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
		$scope.rotateCW  = moveWithShadow.bind(null,Piece.rotateCW);
		$scope.rotateCCW = moveWithShadow.bind(null,Piece.rotateCCW);
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
			Piece.castShadow(Piece.moveDown, piece, shadowPiece);
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
			Render.blocks(Stage.blocks);
			Render.piece(piece);
			Render.piece(shadowPiece);
		}
		Stage.onRowRemove(function(){
			Piece.castShadow(Piece.no_op, piece, shadowPiece);
			draw();
		});
	}
]);
