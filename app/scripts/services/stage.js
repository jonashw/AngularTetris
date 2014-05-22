'use strict';

angular.module('angularTetrisApp')
.service('Stage', function Stage() {
	var _blockRows;
	var _blockSize = 20;
	var _blocksWide = 20.5;
	var _blocksTall = 20.5;
	var _stage = {
		element: angular.element('<div></div>')
			.addClass('stage')
			.css({
				'width':(_blockSize * _blocksWide) + 'px',
				'height':(_blockSize * _blocksTall) + 'px'
			}),
		highestOccupiedRow: function(){
			var nonEmptyRows = _blockRows.map(function(row,rowIndex){
				return {
					index: rowIndex,
					blockCount: row.filter(function(slot){
						return slot !== null;
					}).length
				};
			}).filter(function(rowSummary){
				return rowSummary.blockCount > 0;
			});
			return nonEmptyRows.length;
		},
		onRowsCompleted: function(fn){ _observers.add.rowsCompleted(fn); },
		onRowRemove:     function(fn){ _observers.add.rowRemoved(fn); },
		onBlockRemove:   function(fn){ _observers.add.blockRemoved(fn); },
		blockSize:  _blockSize,
		blocksWide: _blocksWide,
		blocksTall: _blocksTall,
		blocks: [],
		absorbPiece: function(piece){
			var self = this;
			var newBlocks = piece.blocks;
			newBlocks.forEach(function(block){
				block.x = block.x + piece.x;
				block.y = block.y + piece.y;
				self.element.append(block.element);
				addBlock(block);
			});
			clearRows();
		}
	};

	_blockRows = (function(){
		var _rows = [];
		for(var y=0; y < _stage.blocksTall; y++){
			var row = [];
			for(var x=0; x < _blocksWide - 1; x++){
				row.push(null);
			}
			_rows.push(row);
		}
		return _rows;
	})();

	function addBlock(block){
		_blockRows[block.y][block.x] = block;
		_stage.blocks.push(block);
		//visualizeRows();
	}
	function visualizeRows(){
		var rows = _blockRows.map(function(row){
			return row.map(function(slot){
				return slot === null
					? '_'
					: 'X';
			}).join('');
		}).join('\n');
		console.log(rows);
	}
	function clearRows(){
		var rowIndicesCleared = [];
		_blockRows.forEach(function(row,y){
			var blocks = row.filter(function(slot){
				return slot !== null;
			});
			if(blocks.length === row.length){//full row
				rowIndicesCleared.push(y);
			}
		});
		_observers.notify.rowsCompleted(rowIndicesCleared.length);
		rowIndicesCleared.forEach(function(clearedRowIndex){
			clearRow(clearedRowIndex, function(){
				moveRowsDown(clearedRowIndex);
				_observers.notify.rowRemoved();
			});
		});
	}
	function clearRow(rowIndex,done){
		var blocks = _blockRows[rowIndex];
		var blockCount = blocks.length;
		var blocksProcessed = 0;
		var checkDone = function(){//for some reason, this code is never getting called
			blocksProcessed++;
			if(blocksProcessed === blockCount){
				done();
			}
		};
		blocks.forEach(function(block){
			_observers.notify.blockRemoved(block,function(){
				var index = _stage.blocks.indexOf(block);
				_stage.blocks.splice(index,1);
				_blockRows[block.y][block.x] = null;
				checkDone();
			});
		});
	}
	function moveRowsDown(removedRowIndex){ //move all existing blocks down, starting at the bottom
		//start at the row right above the removed row, moving the slot contents down
		for(var y = removedRowIndex - 1; y >= 0; y--){//yes, y is largest at the bottom
			for(var x = 0; x < _blocksWide - 1; x++){
				var block = _blockRows[y][x];
				if(block !== null){
					block.y = y + 1;
				}
				_blockRows[y+1][x] = block;
				_blockRows[y][x] = null;
			}
		}
	}
	var _observers = (function(){
		var __observers = {
			rowRemoved: [],
			blockRemoved: [],
			rowsCompleted: []
		};
		function __add(event,fn){
			__observers[event].push(fn);
		}
		function __notify(event,args){
			__observers[event].forEach(function(fn){
				fn.apply(null, args || []);
			});
		}
		return {
			add: {
				rowsCompleted: __add.bind(null,'rowsCompleted'),
				rowRemoved:    __add.bind(null,'rowRemoved'),
				blockRemoved:  __add.bind(null,'blockRemoved')
			},
			notify: {
				blockRemoved: function(block,doneFn){
					__notify('blockRemoved',[block,doneFn]);
				},
				rowRemoved: function(){
					__notify('rowRemoved');
				},
				rowsCompleted: function(n){
					__notify('rowsCompleted',[n]);
				}
			}
		};
	})();
	return _stage;
});
