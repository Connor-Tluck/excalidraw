## What this shows

A local-style Excalidraw whiteboard for solution architecture. The library opens with LaunchDarkly labels so an SE can sketch how a customer's apps, SDKs, and release process fit together.

## LaunchDarkly features

The app does not evaluate flags. The labels are drawing components for a conversation, not a running LaunchDarkly project. Each launch still gets an empty project from the seed so the demo stays inside the depot contract.

## The story (about 10 minutes)

1. **Open the app.** The library is on the left. It already contains the LaunchDarkly labels.
2. **Drop a label on the canvas.** Start with Feature Flag, then add Context, Segment, and a Server-side SDK or Client-side SDK.
3. **Show the release path.** Add Workflow, Guarded Release, Experiment, or Release Pipeline and connect them with arrows while you talk through the customer's rollout.
4. **The aha moment.** The diagram uses the customer's own names on top of the standard LaunchDarkly pieces, without the Excalidraw+ signup prompts.

## Created during the demo

Nothing. The whiteboard does not create flags, segments, or AI Configs.

| Key or pattern | Created by | When |
| --- | --- | --- |
| None | — | — |

## Launch parameters

None. Drawings stay in the browser for that session.

## Setup the SE does

None.

## Known limitations

- Live collaboration expects a room server that this demo does not run. Drawing on one canvas still works.
- Pausing the demo starts a fresh page. Drawings saved only in the browser do not come back.
- The labels are stencil shapes. They do not read or change a LaunchDarkly project.
