import {
  FloorType,
  Node,
  Path,
} from "../../../../backend/src/algorithms/DataStructures.ts";
import { AlgorithmType } from "../../../../backend/src/algorithms/data_structures/AlgorithmType.ts";

export interface FloorSelectorProps {
  updateFloorFunction: (floorType: FloorType) => void;
  getButtonColor: (floorType: FloorType) => string;
  getButtonWidth: (floorType: FloorType) => string;
}

export interface AlgorithmSelectorProps {
  updateAlgorithmFunction: (algorithm: AlgorithmType) => void;
  currentAlgorithm: AlgorithmType;
}

export interface AccessibilitySelectorProps {
  updateAccessibility: (accessibilityType: AccessibilityType) => void;
  currentAccessibility: AccessibilityType;
}

export interface LocationSelectorProps {
  updateStartNodeID: (startNodeID: string) => void;
  updateEndNodeID: (endNodeID: string) => void;
}

export interface PathGrapherProps {
  floor: FloorType;
  draggingNodes: (isDragging: boolean) => void;
  scale: number;
  algorithm: AlgorithmType;
  accessibility: AccessibilityType;
  locationSelectorStartNodeID: string | null;
  locationSelectorEndNodeID: string | null;
  currentDirectionsCounter: number;
  resetDirections: () => void;
  currentEditorMode: boolean;
}

export interface FloorDisplayProps {
  imageUrl: string;
  nodes: Array<Node>;
  draggingNodes: (isDragging: boolean) => void;
  scale: number;
  algorithm: AlgorithmType;
  accessibility: AccessibilityType;
  locationSelectorStartNodeID: string | null;
  locationSelectorEndNodeID: string | null;
  currentDirectionsCounter: number;
  resetDirections: () => void;
  currentEditorMode: boolean;
}

export interface NodeDisplayProps {
  node: Node;
  key: string;
  scaling: NodeScaling;
  handleNodeSelection(node: Node): void;
  changesFloor: boolean;
  isStartNode: boolean;
  isEndNode: boolean;
  draggingNodes: (isDragging: boolean) => void;
  scale: number;
  currentEditorMode: boolean;
}
export interface NodeScaling {
  widthScaling: number;
  heightScaling: number;
}

export interface PathDisplayProps {
  path: Array<Path>;
  scaling: NodeScaling;
  currentDirectionsNumber: number;
  resetDirections: () => void;
}

export interface NodesByFloor {
  L2: Array<Node>;
  L1: Array<Node>;
  firstFloor: Array<Node>;
  secondFloor: Array<Node>;
  thirdFloor: Array<Node>;
}

export interface StartEndNodes {
  node1ID: string;
  node2ID: string;
}

export interface PathOptionsRequest {
  algorithm: AlgorithmType;
  includeStairs: boolean;
  nodes: StartEndNodes;
}

export interface NodesOptionsRequest {
  includeHallways: boolean;
  byFloors: boolean;
}

export enum AccessibilityType {
  all = "all",
  wheelchair = "wheelchair",
}

export interface Location {
  ID: string;
  longName: string;
}

export interface DirectionsProps {
  triggerNextDirection: (currentDirectionNumber: number) => void;
  currentDirectionsCounter: number;
}

export interface EditorProps {
  changeEditorMode: (editing: boolean) => void;
  currentEditorMode: boolean;
}
