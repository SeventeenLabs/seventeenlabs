---
name: paper
description: Create, edit, inspect, and polish visual designs directly on a Paper MCP canvas. Use when Codex needs to create artboards, mockups, diagrams, cards, UI screens, social graphics, landing-page sections, visual concepts, or other editable canvas-based design work using Paper MCP tools.
---

# Paper

## Overview

Use Paper MCP to build editable designs on the user's canvas. Treat it as a live design surface: write incrementally, inspect existing structure before changing it, and verify visually before finishing.

## First Steps

1. Call `get_guide({ topic: "paper-mcp-instructions" })` before using other Paper tools.
2. Call `get_basic_info()` to understand the current file, page, artboards, dimensions, and fonts.
3. If editing existing work, use `get_selection()`, `get_tree_summary()`, `get_node_info()`, and `get_computed_styles()` before modifying nodes.
4. If creating new work, create one or more artboards with `create_artboard()`. Use the default device sizes unless the user specifies dimensions.

## Creation Workflow

Use `write_html()` as the primary creation tool. Write in small visible chunks so the user sees progress:

- Create the artboard shell first.
- Add major sections one at a time.
- Add repeated elements incrementally; create one polished item, then use `duplicate_nodes()` or `<x-paper-clone node-id="...">` where useful.
- Use `set_text_content()` for text-only edits instead of replacing whole node trees.
- Use `update_styles()` for targeted visual corrections instead of rewriting stable structure.
- Use `move_nodes()` for ordering or reparenting existing layers.

HTML rules for Paper:

- Use inline styles only.
- Prefer flex layouts with padding and gap.
- Do not use CSS margin, grid, HTML tables, `display: inline`, or emojis as icons.
- Use absolute positioning only for decorative or overlay elements.
- Use `layer-name` attributes for meaningful layer names.
- For mobile artboards, include a status bar. Load `get_guide({ topic: "mobile-status-bar" })` for paste-ready markup.

## Design Quality

Make the canvas feel intentionally designed, not merely laid out.

- Match the requested artifact: dense and utilitarian for tools or dashboards, expressive for posters and social graphics, calm for documents or briefs.
- Use clear type hierarchy, accessible contrast, stable spacing, and realistic content.
- Keep cards for repeated items, modals, or framed tools. Avoid nested cards.
- Avoid one-note palettes, gradient-orb decoration, and oversized text inside compact UI.
- Make text fit its container on desktop and mobile; adjust copy, layout, or font size directly rather than leaving overflow.
- Use real images when the subject needs visual specificity. For local image assets, use absolute `paper-asset://` paths.

## Inspection And Editing

Choose tools by intent:

- `get_tree_summary()` for orientation.
- `get_jsx()` when you need a precise editable representation of a node.
- `get_screenshot()` for visual verification.
- `get_fill_image()` when inspecting image fills.
- `rename_nodes()` to keep layers navigable.
- `delete_nodes()` only after verifying the node and parent with `get_node_info()` when there is any ambiguity.

Prefer precise edits over replacement. If a node already has useful structure, preserve it and patch only the content, styles, ordering, or children that need to change.

## Verification

Before final response:

- Capture screenshots of changed artboards with `get_screenshot()`.
- Check for clipped content, overlap, unreadable text, missing images, and large accidental empty gaps.
- If content clips or an artboard is much taller than needed, prefer `update_styles()` with `height: "fit-content"` where appropriate.
- Call `finish_working_on_nodes()` when finished so Paper removes working indicators.
