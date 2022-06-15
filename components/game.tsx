import React, { useState, useEffect, useRef } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { change } from "../redux/sizes";
import {
  drawRect,
  drawBall,
  drawMiddle,
  switch_,
} from "../tools/gameTools";

export default function Game(props: any) {
  const canvasRef = useRef(null);
  const {
    canvaWidth,
    canvaHeight,
    rectWidth,
    rectHeigth,
    ballSize,
    rectMovment,
  } = useSelector((state: RootStateOrAny) => state.sizes_);
  const dispatch = useDispatch();
  const resizeOneTime = useRef(0);
  const movementPlayer1 = useRef({
    keyUp: false,
    keyDown: false,
  });
  const movementPlayer2 = useRef({
    keyUp: false,
    keyDown: false,
  });
  const ballSpeed = useRef(10);
  const [player1, changePlayer1] = useState({
    x: 5,
    y: (canvaHeight / 2) - (rectHeigth / 2),
    score: 0,
  });
  const [player2, changePlayer2] = useState({
    x: canvaWidth - rectWidth - 5,
    y: (canvaHeight / 2) - (rectHeigth / 2),
    score: 0,
  });
  const [ball, changeBall] = useState({
    x: canvaWidth / 2,
    y: canvaHeight / 2,
  });
  const size = useRef({
    canvaWidth: canvaWidth,
    canvaHeight: canvaHeight,
    rectWidth: rectWidth,
    rectHeigth: rectHeigth,
    ballSize: ballSize,
    rectMovment: rectMovment,
  });
  const position = useRef({
    x1: player1.x,
    y1: player1.y,
    x2: player2.x,
    y2: player2.y,
    ballX: ball.x,
    ballY: ball.y,
  });
  position.current = {
    x1: player1.x,
    y1: player1.y,
    x2: player2.x,
    y2: player2.y,
    ballX: ball.x,
    ballY: ball.y,
  };
  size.current = {
    canvaWidth: canvaWidth,
    canvaHeight: canvaHeight,
    rectWidth: rectWidth,
    rectHeigth: rectHeigth,
    ballSize: ballSize,
    rectMovment: rectMovment,
  };

  if (typeof window != "undefined")
    useEffect(() => {
      var changePerc1 =
        (position.current.y2 * 100) / size.current.canvaHeight - 100;
      var changePerc2 =
        (position.current.y1 * 100) / size.current.canvaHeight - 100;
      var ballPerc = {
        changePercX:
          (position.current.ballX * 100) / size.current.canvaWidth - 100,
        changePercY:
          (position.current.ballY * 100) / size.current.canvaHeight - 100,
      };
      if (changePerc1 < 0) changePerc1 *= -1;
      if (changePerc2 < 0) changePerc2 *= -1;
      if (ballPerc.changePercX < 0) ballPerc.changePercX *= -1;
      if (ballPerc.changePercY < 0) ballPerc.changePercY *= -1;
      if (resizeOneTime.current != 1 && window.innerWidth < 600) {
        dispatch(change(300));
        let newPosition1 = 300 / 2 - ((300 / 2) * changePerc1) / 100;
        let newPosition2 = 300 / 2 - ((300 / 2) * changePerc2) / 100;
        let newPosition = {
          x: 300 - (300 * ballPerc.changePercX) / 100,
          y: 300 / 2 - ((300 / 2) * ballPerc.changePercY) / 100,
        };
        changePlayer2((oldValue) => ({
          ...oldValue,
          y: newPosition1,
          x: size.current.canvaWidth - size.current.rectWidth - 5,
        }));
        changePlayer1((oldValue) => ({ ...oldValue, y: newPosition2 }));
        changeBall({ x: newPosition.x, y: newPosition.y });
        console.log(newPosition.x, newPosition.y);
        resizeOneTime.current = 1;
      } else if (
        resizeOneTime.current != 2 &&
        window.innerWidth > 600 &&
        window.innerWidth < 1300
      ) {
        dispatch(change(520));
        let newPosition1 = 520 / 2 - ((520 / 2) * changePerc1) / 100;
        let newPosition2 = 520 / 2 - ((520 / 2) * changePerc2) / 100;
        let newPosition = {
          x: 520 - (520 * ballPerc.changePercX) / 100,
          y: 520 / 2 - ((520 / 2) * ballPerc.changePercY) / 100,
        };
        changePlayer2((oldValue) => ({
          ...oldValue,
          y: newPosition1,
          x: size.current.canvaWidth - size.current.rectWidth - 5,
        }));
        changePlayer1((oldValue) => ({ ...oldValue, y: newPosition2 }));
        changeBall({ x: newPosition.x, y: newPosition.y });
        console.log(newPosition.x, newPosition.y);
        resizeOneTime.current = 2;
      } else if (resizeOneTime.current != 3 && window.innerWidth > 1300) {
        dispatch(change(1000));
        let newPosition1 = 1000 / 2 - ((1000 / 2) * changePerc1) / 100;
        let newPosition2 = 1000 / 2 - ((1000 / 2) * changePerc2) / 100;
        let newPosition = {
          x: 1000 - (1000 * ballPerc.changePercX) / 100,
          y: 1000 / 2 - ((1000 / 2) * ballPerc.changePercY) / 100,
        };
        changePlayer2((oldValue) => ({
          ...oldValue,
          y: newPosition1,
          x: size.current.canvaWidth - size.current.rectWidth - 5,
        }));
        changePlayer1((oldValue) => ({ ...oldValue, y: newPosition2 }));
        changeBall({ x: newPosition.x, y: newPosition.y });
        resizeOneTime.current = 3;
      }
    }, [window.innerWidth]);

  useEffect(() => {
    function loop() {
      requestAnimationFrame(loop);
      if (movementPlayer1.current.keyUp) {
        props.socket?.emit("playing","up")
      }
      if (movementPlayer1.current.keyDown) {
        props.socket?.emit("playing","down")
      }
    }
    requestAnimationFrame(loop);
    props.socket?.on("movements", (data: any) => {
      var changePerc =
        (1000 /2) / size.current.canvaHeight
      let newPosition1 = data.players.player1Y / changePerc;
      let newPosition2 = data.players.player2Y / changePerc;
      changePlayer1(oldvalue =>({...oldvalue, y:newPosition1}))
      changePlayer2(oldvalue =>({...oldvalue, y:newPosition2}))
    })
  }, []);

  useEffect(() => {
    window.onkeydown = function (e) {
      switch_(e.keyCode, "onKeyDown", movementPlayer1, movementPlayer2);
    };
    window.onkeyup = function (e) {
      switch_(e.keyCode, "onKeyUp", movementPlayer1, movementPlayer2);
    };
  }, []);
  useEffect(() => {
    if (canvasRef.current) {
      const canva: HTMLCanvasElement = canvasRef.current;
      const context = canva.getContext("2d");
      context?.clearRect(0, 0, canvaWidth, canvaHeight);
      drawRect(0, 0, canvaWidth, canvaHeight, "black", context);
      drawMiddle(canvaWidth, canvaHeight, context);
      drawRect(player1.x, player1.y, rectWidth, rectHeigth, "white", context);
      drawBall(ball.x, ball.y, ballSize, "white", context);
      drawRect(player2.x, player2.y, rectWidth, rectHeigth, "white", context);
    }
  });
  useEffect(()=>{
    props.socket?.on("ballMovement",(data:any) =>{
      var changePercHeight =
      (1000 /2) / size.current.canvaHeight
      var changePercWidth =
      1000 / size.current.canvaWidth
    let newPositionX = data.ballStats.ballX / changePercWidth;
    let newPositionY = data.ballStats.ballY / changePercHeight;
    changeBall({x:newPositionX,y:newPositionY})
    console.log(data.playerStat)
    if (data.playerStat.player1score != props.score.player1 || data.playerStat.player2score != props.score.player2){
      props.changeScore({player1:data.playerStat.player1score,player2:data.playerStat.player2score})
    }
    })
  },[])
  return (
    <>
      <canvas
        style={{ border: "1px solid #d3d3d3", borderRadius: "10px" }}
        id="canvas"
        width={canvaWidth}
        height={canvaHeight}
        ref={canvasRef}
        moz-opaque="true"
      ></canvas>
    </>
  );
}