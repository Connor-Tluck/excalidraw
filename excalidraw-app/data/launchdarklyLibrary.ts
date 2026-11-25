import { ROUNDNESS } from "@excalidraw/common";
import { convertToExcalidrawElements } from "@excalidraw/excalidraw";

import type { LibraryItem } from "@excalidraw/excalidraw/types";

const INK = "#191919";
const SURFACE = "#F8F8F8";

const COMPONENTS: Array<{
  id: string;
  name: string;
  stroke: string;
  fill: string;
}> = [
  { id: "ld-feature-flag", name: "Feature Flag", stroke: "#405BFF", fill: SURFACE },
  { id: "ld-release-flag", name: "Release Flag", stroke: "#405BFF", fill: SURFACE },
  { id: "ld-kill-switch", name: "Kill Switch", stroke: "#405BFF", fill: SURFACE },
  { id: "ld-migration-flag", name: "Migration Flag", stroke: "#405BFF", fill: SURFACE },
  { id: "ld-context", name: "Context", stroke: "#3DD6F5", fill: SURFACE },
  { id: "ld-segment", name: "Segment", stroke: "#3DD6F5", fill: SURFACE },
  { id: "ld-targeting-rule", name: "Targeting Rule", stroke: "#3DD6F5", fill: SURFACE },
  { id: "ld-environment", name: "Environment", stroke: "#3DD6F5", fill: SURFACE },
  { id: "ld-server-sdk", name: "Server-side SDK", stroke: "#A34FDE", fill: SURFACE },
  { id: "ld-client-sdk", name: "Client-side SDK", stroke: "#A34FDE", fill: SURFACE },
  { id: "ld-relay-proxy", name: "Relay Proxy", stroke: "#A34FDE", fill: SURFACE },
  { id: "ld-flag-delivery", name: "Flag Delivery", stroke: "#A34FDE", fill: SURFACE },
  { id: "ld-workflow", name: "Workflow", stroke: "#FF9D29", fill: SURFACE },
  { id: "ld-guarded-release", name: "Guarded Release", stroke: "#FF9D29", fill: SURFACE },
  { id: "ld-experiment", name: "Experiment", stroke: "#FF9D29", fill: SURFACE },
  { id: "ld-release-pipeline", name: "Release Pipeline", stroke: "#FF9D29", fill: SURFACE },
  { id: "ld-approval", name: "Approval", stroke: "#FF9D29", fill: SURFACE },
  { id: "ld-ai-config", name: "AI Config", stroke: "#FF35A2", fill: SURFACE },
  { id: "ld-prompt", name: "Prompt", stroke: "#FF35A2", fill: SURFACE },
  { id: "ld-model", name: "Model", stroke: "#FF35A2", fill: SURFACE },
  { id: "ld-metric", name: "Metric", stroke: INK, fill: "#DDFF46" },
  { id: "ld-webhook", name: "Webhook", stroke: INK, fill: SURFACE },
  { id: "ld-audit-log", name: "Audit Log", stroke: INK, fill: SURFACE },
  { id: "ld-custom-role", name: "Custom Role", stroke: INK, fill: SURFACE },
];

const stableSeed = (id: string) => {
  let hash = 0;
  for (const char of id) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return hash % 100000 || 1;
};

const labeledCard = (component: (typeof COMPONENTS)[number]): LibraryItem => {
  const seed = stableSeed(component.id);
  const shapeId = `${component.id}-shape`;
  const labelId = `${component.id}-label`;
  const elements = convertToExcalidrawElements(
    [
      {
        type: "rectangle",
        id: shapeId,
        x: 0,
        y: 0,
        width: 220,
        height: 72,
        strokeColor: component.stroke,
        backgroundColor: component.fill,
        fillStyle: "solid",
        strokeWidth: 2,
        roughness: 0,
        seed,
        version: 1,
        versionNonce: 1,
        roundness: { type: ROUNDNESS.ADAPTIVE_RADIUS },
        label: {
          text: component.name,
          fontSize: 18,
          strokeColor: INK,
          textAlign: "center",
          verticalAlign: "middle",
        },
      },
    ],
    { regenerateIds: false },
  );

  const shape = elements.find((element) => element.id === shapeId);
  const label = elements.find((element) => element.type === "text");
  if (!shape || !label) {
    throw new Error(`Could not build LaunchDarkly label: ${component.name}`);
  }

  const nextLabel = {
    ...label,
    id: labelId,
    containerId: shapeId,
    seed,
    version: 1,
    versionNonce: 1,
  };
  const nextShape = {
    ...shape,
    seed,
    version: 1,
    versionNonce: 1,
    boundElements: [{ type: "text" as const, id: labelId }],
  };

  return {
    id: component.id,
    name: `LD · ${component.name}`,
    status: "published",
    created: 1,
    elements: [nextShape, nextLabel] as LibraryItem["elements"],
  };
};

let cached: LibraryItem[] | null = null;

export const getLaunchDarklyLibraryItems = (): LibraryItem[] => {
  if (!cached) {
    cached = COMPONENTS.map(labeledCard);
  }
  return cached;
};

export const LAUNCHDARKLY_LIBRARY_SEEDED_KEY = "ld-architecture-library-v1";
