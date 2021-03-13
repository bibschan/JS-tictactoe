class Board {
    board;
    isBoardFull;
    activePlayer;

    constructor(){
        this.board = [[0, 0, 0],
                      [0, 0, 0],
                      [0, 0, 0]];
        this.isBoardFull = false;
        this.activePlayer = 'x';
    }

    setBoardStateToFull(){
        this.isBoardFull = true;
        return isBoardFull;
    }

    resetBoard(){
        this.board = [[0, 0, 0],
                      [0, 0, 0],
                      [0, 0, 0]];

        for (let index = 0; index < 3; index++){
            for(let j = 0; j < 3; j++){
                let attachPlayer = document.getElementById(index + '' + j);
                attachPlayer.classList.remove('x');
                attachPlayer.classList.remove('o');
            }
        }
    }

    checkBoardFull(){
        for(let i = 0; i < 3; i++){
            if(this.board[i].includes(0)){
                return false;
            }
        }
        this.setBoardStateToFull();
        return true;
    }
    
    getBoardState(){
        return this.isBoardFull;
    }

    

    checkForWin(row, column){
        let count = 0;
        // checks the rows
        for(let i = 0; i < 3; i++){
            if(this.getBoxState(row, i) === this.activePlayer){
                count++
            }
        }
        if(count === 3){
            return true;
        }

        count = 0;
        // check columns
        for(let i = 0; i < 3; i++){
            if(this.getBoxState(i, column) === this.activePlayer){
                count++
            }
        }
        if(count === 3){
            return true;
        } 

        // check diagonals
        if(this.getBoxState(0, 0) === this.activePlayer && 
           this.getBoxState(1, 1) === this.activePlayer &&
           this.getBoxState(2, 2) === this.activePlayer){
             return true;
        }
        // check the other diagonal
        if(this.getBoxState(0, 2) === this.activePlayer && 
           this.getBoxState(1, 1) === this.activePlayer &&
           this.getBoxState(2, 0) === this.activePlayer){
             return true;
        }

        this.switchPlayer();

        return false;
    }

    switchPlayer(){
        this.activePlayer === 'x' ? this.activePlayer = 'o' : this.activePlayer = 'x';
    }

    setBoxState(row, column){
        this.checkBoardFull();

        if(this.board[row][column] === 0){
            this.board[row][column] = this.activePlayer;
            
        } else {
            alert('this box is not available')
        }  
    }
    
    getBoxState(row, column){
        return this.board[row][column];
    }
}

  // adding event listeners
    let box = document.getElementsByTagName('td')

    for (let index = 0; index < box.length; index++) {
        box[index].addEventListener('click', () => play(box[index].id))
    }

    let game = new Board();

    function play(id){
        let row, column;
        row = id.substring(0,1);
        column = id.substring(1,2);

        if(game.getBoxState(row, column) === 0){
            game.setBoxState(row, column);
            let attachPlayer = document.getElementById(id);
            attachPlayer.classList.add(game.activePlayer);

            if(game.checkForWin(row, column)){
                setTimeout(() => {
                    alert((game.activePlayer === 'x' ? 'Cool Cat' : 'Chilling Doge') + ' won!')
                    game.resetBoard();
                }, 250);
                
                
            }
        } else {
            alert('this box is not available')
        }
}
