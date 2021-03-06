import * as React from "react";

const Container = (props: any) => {
  return (
    <div
      style={{
        top: 0,
        left: 0,
        right: 0,
        width: "1070px",
        height: "100vh",
        position: "fixed",
        margin: "0 auto",
        backgroundColor: "#F5F5F5",
        zIndex: -1
      }}
    >
      {props.children}
    </div>
  );
};

export default Container;
