import { useState } from "react";
import { Container, Row, Col, Button } from "reactstrap"
import ScoreBoard from "./components/ScoreBoard";
import Win from "./resources/victory.gif"


const App = () => {

    const players = ['X', 'O'];
    const positions = [...Array(9).keys()];
    
    let [i, setI] = useState(0)
    const [moves, setMoves] = useState(Array(9).fill(null))
    const [roundCount, setRoundCount] = useState(1)
    const [gameWon, setGameWon] = useState(false)
    const [gameTie, setGameTie] = useState(false)
    const [score, setScore] = useState({ X: 0, tie: 0, O: 0 });
    
    const putMark = (i, index) => {
        moves[index] = players[i];
        setMoves(moves);
        switch (checkWin(index, players[i])){
            case "won":  setWinner();
                         break;

            case "tie":  setTie();
                         break;

            default: setI((i+1) % 2)
        }
    }

    const checkMark = (arr, mark) => arr.every(el => moves[el] === mark)
    
    const checkWin = (index, mark) => {
        let movesCount = moves.filter(el => el != null).length;
        if(movesCount > 4) {
            const [diagOne, diagTwo] = [[0, 4, 8], [2, 4, 6]];
            const getColumn = positions.filter(el => el % 3 === index % 3);
            const getRow = positions.filter(el => parseInt(el / 3) === parseInt(index / 3));

            let hasWon = [getRow, getColumn, diagOne, diagTwo].some(arr => checkMark(arr, mark));

            if(hasWon)
                return "won";
            else {
                return (movesCount === 9) ? "tie" : false;
            }
        }
        return false;
    }

    const setWinner = () => {
        setGameWon(true);
        score[players[i]] += 1;
        setScore(score);
    }

    const setTie = () => {
        setGameTie(true);
        score["tie"] += 1;
        setScore(score);
    }

    const restart = () => {
        setMoves(Array(9).fill(null));
        setI(0); 
        setRoundCount(roundCount + 1);
        if(gameWon)
            setGameWon(false);
        if(gameTie)
            setGameTie(false);
    }

    
    return <Container className="h-100 row m-auto py-3 flex-column">

                <header className="px-0 mb-3 shadow fit-content">
                    <h1 className="display-4 fw-bold text-light text-center bg-dark py-3 m-0 rounded-3">Tic-Tac-Toe</h1>
                </header>

                <Col>
                    <Row className="h-100 justify-content-between">
                        <Col id="scoreContainer" className="col-5 p-4 d-flex shadow rounded-3">
                            <Row className="w-100 m-0 text-center">
                                <div>
                                    <div className="text-light bg-dark fw-bold p-3 rounded">
                                        <h1 className="fs-2">{ "Round " + roundCount }</h1>
                                        <p className="lead m-0">
                                            { 
                                                gameWon ?
                                                players[i] + " Won!" :
                                                (gameTie ? "Game tie" :
                                                "Current move : " + players[i])
                                            }
                                        </p>
                                    </div>
                                </div>

                                {
                                    gameWon ? <div><img className="col-5 drop-shadow" src={Win} alt="victory" /></div> : ""
                                }

                                <div className="mt-auto fit-content">
                                    <ScoreBoard score={ score } />
                                </div>
                            </Row>
                        </Col>
                        
                        <Col className="col d-flex ms-3 flex-column py-3">
                            <div id="box" className="m-auto bg-light text-light display-2 border border-light border-1">
                                {
                                    moves.map((el, index) => {
                                    return <div className="d-flex justify-content-center" key={index} onClick={() => {putMark(i, index)}}>
                                                <span className="m-auto col-12 text-center">{ el }</span>
                                            </div>
                                    })
                                }
                            </div>

                            <div className={"text-center" + ((gameWon || gameTie) ? "" : " invisible")}>
                                <Button size="lg" color="dark" onClick={restart}>Play again</Button>
                            </div>

                        </Col>
                    </Row>
                </Col>

            </Container>
}


export default App