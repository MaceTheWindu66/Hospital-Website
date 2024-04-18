import "../map_page/MapWrapper.css";
import { useMapContext } from "./MapContext.ts";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import MapProvider from "./MapProvider.tsx";
import { CSSProperties } from "react";
import DirectionsSelector from "./SelectDirection.tsx";
import LocationSelector from "./SelectLocation.tsx";
import AlgorithmSelector from "./SelectAlgorithm.tsx";
import AccessibilitySelector from "./SelectAccessibility.tsx";
import FloorSelector from "./SelectFloor.tsx";
import FloorDisplay from "./DisplayFloor.tsx";
import ClearPathButton from "./ClearPathButton.tsx";
import TextDirections from "./TextDirections.tsx";
import ConfirmChanges from "./ConfirmChanges.tsx";
import ShowPathsButton from "./ShowAllPaths.tsx";
import ShowNodesEdgesDropDown from "./ShowNodesEdgesDropdown.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@mui/material";

export default PublicMap;

function PublicMap() {
  return (
    <MapProvider>
      <MapContents />
    </MapProvider>
  );
}

function MapContents() {
  const { isAuthenticated } = useAuth0();

  const mapDiv: CSSProperties = {
    height: "100%",
    maxWidth: `${isAuthenticated ? "calc(100% - 55px)" : "100%"}`,
    float: `${isAuthenticated ? "right" : "none"}`,
    position: `${isAuthenticated ? "relative" : "absolute"}`,
    overflow: "hidden",
  };

  const { setScale, disableZoomPanning } = useMapContext();

  const options = {
    initialScale: 0.5,
    minScale: 0.5,
    maxScale: 10,
    minPositionY: -200,
  };

  const zoomWrapperProps = {
    disablePadding: true,
    centerOnInit: false,
    limitToBounds: true,
    doubleClick: { disabled: false },
    disabled: disableZoomPanning,
    options: options,
  };

  function handleScaleChange(event: ReactZoomPanPinchRef) {
    setScale(event.instance.transformState.scale);
  }

  return (
    <div style={mapDiv}>
      <Box
        sx={{
          right: 0,
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          marginTop: "10vh",
          marginRight: "1vw",
          justifyContent: "space-between",
        }}
      >
        <AlgorithmSelector />
        <AccessibilitySelector />
      </Box>
      <Box
        sx={{
          position: "absolute",
          left: 0,
          display: "flex",
          flexDirection: "column",
          marginTop: "11vh",
          marginLeft: "1.5vw",
          backgroundColor: "white",
          zIndex: 3,
          padding: "1rem",
          paddingLeft: "0.5rem",
          boxShadow: 7,
          borderRadius: "5px",
        }}
      >
        <LocationSelector /> {/* start & end location text boxes */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: "2vh",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <ClearPathButton /> {/* clear path button */}
            <ShowPathsButton /> {/* show all paths button */}
          </Box>
          <DirectionsSelector /> {/* "next floor" button */}
        </Box>
        {/*<ClearPathButton /> /!* clear path button *!/*/}
      </Box>
      <FloorSelector /> {/* button cluster to change floor */}
      <TextDirections />
      <ShowNodesEdgesDropDown />
      <ConfirmChanges />
      <TransformWrapper
        {...zoomWrapperProps}
        onTransformed={(e) => handleScaleChange(e)}
        disablePadding={true}
      >
        <TransformComponent
          wrapperStyle={{ height: screen.height, width: screen.width }}
        >
          <FloorDisplay />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}