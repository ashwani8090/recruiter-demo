import React from 'react';

const AppContainer = () => {
    return (<div style={{ position: "absolute", zIndex: '-1000', width: '100%' }}>
        <div
            style={{
                position: "relative",
                top: "0px",
                left: "0px",
                height: "300px",
                width: "100%",
                display: 'flex',
                background:
                    "transparent linear-gradient(253deg, var(--unnamed-color-303f60) 0%, #1A253C 100%) 0% 0% no-repeat padding-box",
                background: "transparent linear-gradient(253deg, #303F60 0%, #1A253C 100%) 0% 0% no-repeat padding-box",
                opacity: "1",
            }}
        />
        <div
            style={{
                position: "relative",
                top: "0px",
                left: "0px",
                height: "900px",
                width: "100%",
                background: "#EDF6FF 0% 0% no-repeat padding-box",
                opacity: "1",
            }}
        />
    </div>)

}

export default AppContainer;