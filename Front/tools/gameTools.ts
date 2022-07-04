import { RootStateOrAny } from "react-redux"


function drawRect(x:number, y:number, width:number, height:number, color:string, context:CanvasRenderingContext2D | null){
    if (context){
        context.beginPath()
        context.fillStyle = color
        context.fillRect(x, y, width, height)
        context.fill()
        context.closePath()
    }
}

function drawBall(x:number, y:number, r:number, color:string, context:CanvasRenderingContext2D | null){
    if(context){
        context.beginPath()
        context.arc(x, y, r, 0, 2*Math.PI)
        context.fillStyle = color;
        context.closePath()
        context.fill()
    }
}

function drawCircleMiddle(x:number, y:number, r:number, context:CanvasRenderingContext2D | null){
    if(context){
        context.beginPath()
        context.arc(x, y, r, 0, 2*Math.PI)
        context.closePath()
        context.strokeStyle = "grey"
        context.stroke();
    }
}

function drawMiddle(canvaWidth:number,canvaHeight:number, context:CanvasRenderingContext2D | null){ 

    const circleSize = canvaWidth == 300 ? 10 : canvaWidth == 520 ? 20 : 30

    drawRect((canvaWidth / 2) - 1 ,0 ,0.5,(canvaHeight / 2) - circleSize,"grey",context);
    drawCircleMiddle((canvaWidth / 2),(canvaHeight / 2),circleSize ,context);
    drawRect((canvaWidth / 2) - 1 ,(canvaHeight / 2) + circleSize ,0.5,canvaHeight,"grey",context);
}

function changeTraject(impact:number, ballY:RootStateOrAny, ballTrajecY:RootStateOrAny, ballTrajecX:RootStateOrAny,canvaWidth:number){
    
    const ballTrajecXChange = canvaWidth / 520
    const ballTrajecYChange = (canvaWidth / 2) / 520
    if(ballY.current && impact < 0){
        ballY.current = !ballY.current
    }
    else if (ballY.current == false && impact > 0){
        ballY.current = !ballY.current
    }
    if(impact < 0)
        impact *= -1
    ballTrajecY.current = impact / 20
    ballTrajecX.current = ballTrajecY.current > 1 ? ballTrajecXChange  / ballTrajecY.current : ballTrajecXChange + ballTrajecY.current
}

function switch_(keyCode:number, keyType:string,movementPlayer1:RootStateOrAny, movementPlayer2:RootStateOrAny){
    if(keyType == "onKeyDown")
        switch(keyCode) {
            case 87:
                movementPlayer1.current ={
                    keyUp :true,
                    keyDown :movementPlayer1.current.keyDown,
                }
                return false;
            case 83:
                movementPlayer1.current ={
                    keyUp :movementPlayer1.current.keyUp,
                    keyDown :true,
                }
                return false;
            case 38:
                movementPlayer2.current ={
                    keyUp :true,
                    keyDown :movementPlayer2.current.keyDown,
                }
                return false;
            case 40:
                movementPlayer2.current ={
                    keyUp :movementPlayer2.current.keyUp,
                    keyDown :true,
                }
                return false;
        }
    else
    switch(keyCode) {
        case 87:
            movementPlayer1.current ={
                keyUp :false,
                keyDown :movementPlayer1.current.keyDown,
            }
            return false;
        case 83:
            movementPlayer1.current ={
                keyUp :movementPlayer1.current.keyUp,
                keyDown :false,
            }
            return false;
        case 38:
            movementPlayer2.current ={
                keyUp :false,
                keyDown :movementPlayer2.current.keyDown,
            }
            return false;
        case 40:
            movementPlayer2.current ={
                keyUp :movementPlayer2.current.keyUp,
                keyDown :false,
            }
            return false;
    }
}

export {drawRect, drawBall, drawMiddle, changeTraject, switch_}        