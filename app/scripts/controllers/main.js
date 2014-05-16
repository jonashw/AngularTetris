'use strict';

angular.module('angularTetrisApp')
  .controller('MainCtrl', ['$scope','Piece','Render','Stage',function ($scope,Piece,Render,Stage) {
	  $scope.piece = {};
	  function render(){
		  Render.piece($scope.piece);
		  Stage.blocks.forEach(Render.block);
	  }
	  $scope.newPiece = function(){
		  if('element' in $scope.piece){
			  $scope.piece.element.detach();
		  }
		  var pieces = ['M','L','J','S','Z','I','O'];
		  var randomKey = pieces[Math.floor(pieces.length * Math.random())];
		  console.log('next random piece:',randomKey);
		  $scope.piece = Piece[randomKey]();
		  $scope.piece.x = 10;
		  render();
	  };
	  $scope.moveRight = function(){
		  Piece.moveRight($scope.piece);
		  render();
	  };
	  $scope.moveLeft = function(){
		  Piece.moveLeft($scope.piece);
		  render();
	  };
	  $scope.moveUp = function(){
		  Piece.moveUp($scope.piece);
		  render();
	  };
	  $scope.moveDown = function(){
		  if(!Piece.moveDown($scope.piece)){
			  render();
			  Stage.absorbPiece($scope.piece);
			  $scope.newPiece();
		  }
		  render();
	  };
	  $scope.rotate = function(){
		  Piece.rotate($scope.piece);
		  render();
	  };
	  $scope.newPiece();
	  render();
  }]);
