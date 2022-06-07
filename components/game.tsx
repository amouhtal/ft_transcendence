import React, { useState, useEffect, useRef } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { change } from "../redux/sizes";
import {
  drawRect,
  drawBall,
  drawMiddle,
  changeTraject,
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
    ballMovmentY,
    ballMovmentX,
  } = useSelector((state: RootStateOrAny) => state.sizes_);
  const dispatch = useDispatch();
  const ballX = useRef(false);
  const ballY = useRef(true);
  const resizeOneTime = useRef(0);
  const oneTime = useRef({
    player1: true,
    player2: false,
  });
  const movementPlayer1 = useRef({
    keyUp: false,
    keyDown: false,
  });
  const movementPlayer2 = useRef({
    keyUp: false,
    keyDown: false,
  });
  const ballTrajecY = useRef(ballMovmentY);
  const ballTrajecX = useRef(ballMovmentX);
  const ballSpeed = useRef(10);
  const [player1, changePlayer1] = useState({
    x: 5,
    y: canvaHeight / 2 - rectHeigth / 2,
    score: 0,
  });
  const [player2, changePlayer2] = useState({
    x: canvaWidth - rectWidth - 5,
    y: canvaHeight / 2 - rectHeigth / 2,
    score: 0,
  });
  ballTrajecX.current = ballMovmentX;
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
        console.log(newPosition.x, newPosition.y);
        resizeOneTime.current = 3;
      }
    }, [window.innerWidth]);

  useEffect(() => {
    function loop() {
      requestAnimationFrame(loop);
      if (movementPlayer1.current.keyUp) {
        if (
          position.current.y1 < size.current.rectMovment &&
          position.current.y1 > 0
        )
          changePlayer1((oldValues) => ({ ...oldValues, y: 0 }));
        else if (position.current.y1 != 0)
          changePlayer1((oldValues) => ({
            ...oldValues,
            y: oldValues.y - size.current.rectMovment,
          }));
      }
      if (movementPlayer1.current.keyDown) {
        if (
          position.current.y1 >
            size.current.canvaHeight -
              size.current.rectHeigth -
              size.current.rectMovment &&
          position.current.y1 <
            size.current.canvaHeight - size.current.rectHeigth
        )
          changePlayer1((oldValues) => ({
            ...oldValues,
            y: size.current.canvaHeight - size.current.rectHeigth,
          }));
        else if (
          position.current.y1 !=
          size.current.canvaHeight - size.current.rectHeigth
        )
          changePlayer1((oldValues) => ({
            ...oldValues,
            y: oldValues.y + size.current.rectMovment,
          }));
      }
      if (movementPlayer2.current.keyUp) {
        if (
          position.current.y2 < size.current.rectMovment &&
          position.current.y2 > 0
        )
          changePlayer2((oldValues) => ({ ...oldValues, y: 0 }));
        else if (position.current.y2 != 0)
          changePlayer2((oldValues) => ({
            ...oldValues,
            y: oldValues.y - size.current.rectMovment,
          }));
      }
      if (movementPlayer2.current.keyDown) {
        if (
          position.current.y2 >
            size.current.canvaHeight -
              size.current.rectHeigth -
              size.current.rectMovment &&
          position.current.y2 <
            size.current.canvaHeight - size.current.rectHeigth
        )
          changePlayer2((oldValues) => ({
            ...oldValues,
            y: size.current.canvaHeight - size.current.rectHeigth,
          }));
        else if (
          position.current.y2 !=
          size.current.canvaHeight - size.current.rectHeigth
        )
          changePlayer2((oldValues) => ({
            ...oldValues,
            y: oldValues.y + size.current.rectMovment,
          }));
      }
    }
    requestAnimationFrame(loop);
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
  useEffect(() => {
    const BallPlacement = setInterval(() => {
      if (
        oneTime.current.player2 &&
        ball.x + size.current.ballSize >=
          size.current.canvaWidth - size.current.rectWidth &&
        ball.x + size.current.ballSize <= size.current.canvaWidth &&
        ball.y + size.current.ballSize > position.current.y2 &&
        ball.y <
          position.current.y2 + size.current.rectHeigth + size.current.ballSize
      ) {
        let impact =
          ball.y - (position.current.y2 + size.current.rectHeigth / 2);
        ballX.current = false;
        ballSpeed.current--;
        changeTraject(impact, ballY, ballTrajecY, ballTrajecX, canvaWidth);
        oneTime.current = {
          player2: false,
          player1: true,
        };
      } else if (
        oneTime.current.player1 &&
        ball.x - size.current.ballSize <= size.current.rectWidth &&
        ball.x - size.current.ballSize >= 0 &&
        ball.y + size.current.ballSize > position.current.y1 &&
        ball.y <
          position.current.y1 + size.current.rectHeigth + size.current.ballSize
      ) {
        let impact =
          ball.y - (position.current.y1 + size.current.rectHeigth / 2);
        ballX.current = true;
        ballSpeed.current--;
        changeTraject(impact, ballY, ballTrajecY, ballTrajecX, canvaWidth);
        oneTime.current = {
          player2: true,
          player1: false,
        };
      }
      if (ball.y + size.current.ballSize >= size.current.canvaHeight)
        ballY.current = false;
      if (ball.y - size.current.ballSize <= 0) ballY.current = true;
      if (ball.x <= 0) {
        changeBall({
          x: size.current.canvaWidth / 2,
          y: size.current.canvaHeight / 2,
        });
        ballSpeed.current = 10;
        props.changeScore((oldvalues: any) => ({
          ...oldvalues,
          player2: oldvalues.player2 + 1,
        }));
      } else if (ball.x >= size.current.canvaWidth) {
        changeBall({
          x: size.current.canvaWidth / 2,
          y: size.current.canvaHeight / 2,
        });
        ballSpeed.current = 10;
        props.changeScore((oldvalues: any) => ({
          ...oldvalues,
          player1: oldvalues.player1 + 1,
        }));
      } else
        changeBall((oldValues) => ({
          y: ballY.current
            ? oldValues.y + ballTrajecY.current
            : oldValues.y - ballTrajecY.current,
          x: ballX.current
            ? oldValues.x + ballTrajecX.current
            : oldValues.x - ballTrajecX.current,
        }));
    }, ballSpeed.current);
    return () => {
      clearInterval(BallPlacement);
    };
  }, [ball, size]);
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
