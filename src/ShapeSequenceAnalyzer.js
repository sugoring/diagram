import React, { useState } from "react";
import { Square, Circle, Triangle } from "lucide-react";

const shapes = [
  { name: "square", component: Square },
  { name: "circle", component: Circle },
  { name: "triangle", component: Triangle },
];

const ShapeSequenceAnalyzer = () => {
  const [sequence, setSequence] = useState([]);
  const [analysis, setAnalysis] = useState("");

  const addShape = (shape) => {
    const newSequence = [...sequence, shape];
    setSequence(newSequence);
    if (newSequence.length >= 3) {
      analyzeSequence(newSequence);
    } else {
      setAnalysis("");
    }
  };

  const analyzeSequence = (currentSequence) => {
    const length = currentSequence.length;
    const currentShape = currentSequence[length - 1];
    const secondLastShape = currentSequence[length - 3];
    const thirdLastShape = currentSequence[length - 4];

    if (currentShape === secondLastShape && currentShape === thirdLastShape) {
      setAnalysis("왼쪽 방향키 또는 오른쪽 방향키");
    } else if (currentShape === secondLastShape) {
      setAnalysis("왼쪽 방향키");
    } else if (currentShape === thirdLastShape) {
      setAnalysis("오른쪽 방향키");
    } else {
      setAnalysis("스페이스바");
    }
  };

  const resetSequence = () => {
    setSequence([]);
    setAnalysis("");
  };

  const renderShape = (shape, index) => {
    const ShapeComponent = shapes.find((s) => s.name === shape).component;
    const isLastShape = index === sequence.length - 1;
    return (
      <ShapeComponent
        key={index}
        size={36}
        color={isLastShape ? "red" : "black"}
        style={{
          transition: "all 0.3s",
          transform: isLastShape ? "scale(1.25)" : "scale(1)",
        }}
      />
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "1rem",
        backgroundColor: "#f3f4f6",
      }}
    >
      <h1
        style={{
          fontSize: "1.875rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
        }}
      >
        도형 순서 분석기
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "2rem",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem" }}>
            {shapes.map((shape) => (
              <button
                key={shape.name}
                onClick={() => addShape(shape.name)}
                style={{
                  padding: "0.5rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.25rem",
                  background: "white",
                }}
              >
                <shape.component size={70} />
              </button>
            ))}
          </div>
          <div
            style={{
              marginBottom: "1rem",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1rem",
              maxWidth: "16rem",
              minHeight: "50px",
            }}
          >
            {sequence.map(renderShape)}
          </div>
          <button
            onClick={resetSequence}
            style={{
              marginBottom: "1rem",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "0.25rem",
              background: "#3b82f6",
              color: "white",
              cursor: "pointer",
            }}
          >
            초기화
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "0.5rem",
            }}
          >
            분석 결과
          </h2>
          <div
            style={{
              fontSize: "2.25rem",
              fontWeight: "bold",
              color: "#2563eb",
              backgroundColor: "#dbeafe",
              padding: "1rem",
              borderRadius: "0.5rem",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              minHeight: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "250px",
            }}
          >
            {analysis || "도형을 선택하세요"}
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: "2rem",
          maxWidth: "36rem",
          padding: "1rem",
          borderRadius: "0.5rem",
          backgroundColor: "#e5e7eb",
        }}
      >
        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          사용 방법
        </h3>
        <p>
          1. 왼쪽의 버튼을 클릭하여 도형 시퀀스를 만드세요.
          <br />
          2. 최소 3개의 도형을 선택하면 오른쪽에 분석 결과가 표시됩니다.
          <br />
          3. 분석 결과는 플레이어가 눌러야 할 키를 알려줍니다.
          <br />
          4. 마지막으로 선택한 도형은 빨간색으로 표시됩니다.
          <br />
          5. '초기화' 버튼을 눌러 새로운 시퀀스를 시작할 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default ShapeSequenceAnalyzer;
