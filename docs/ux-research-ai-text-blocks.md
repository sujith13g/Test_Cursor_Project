# UX Research: AI-Powered Heading & Paragraph Blocks

## Context
Authoring teams want richer tooling inside the `Heading` and `Paragraph` blocks so they can ideate, rewrite, and polish text without leaving the editor. Today, creators copy content into external AI tools, then bring results back—breaking flow, increasing cognitive load, and introducing formatting errors.

## Problem Statement
- **Fragmented workflow:** Authors switch tools to generate or improve text.
- **Inconsistent voice:** Manual edits produce tone drift across a course.
- **Slow iteration:** Rewriting and experimenting with versions takes time.

## Research Goals
- Understand how authors expect AI assistance to appear inside existing blocks.
- Validate the most valuable AI actions (generate, rewrite, expand, shorten, adjust tone, translate).
- Identify trust, control, and transparency requirements when AI alters text.
- Measure the impact on authoring velocity and quality perception.

## Target Users & Scenarios
- **Instructional Designers** preparing net-new course outlines.
- **Subject Matter Experts** updating legacy modules with fresher language.
- **Localization Specialists** adapting content for new regions and reading levels.

Key scenarios include drafting new sections, polishing confusing passages, and tailoring tone to audience segments (e.g., K-12 vs. corporate).

## Existing Experience Audit
- Inline toolbar currently offers style, alignment, and hyperlinking only.
- AI features live in a separate modal, causing context switching.
- No preview/history of AI edits within the block.

## Opportunity Areas
1. **Inline AI Action Bar**
   - Hover or cursor focus reveals `Generate`, `Rewrite`, `Adjust Tone`, `Summarize`, `Translate`.
   - Secondary options under each action (e.g., tone variants: professional, conversational, empathetic).
2. **Prompt Bar**
   - Free-form prompt input with recent prompt suggestions.
   - Quick toggles for word count targets or reading level.
3. **Version Tray**
   - Side panel storing AI suggestions with metadata (action type, time, prompt).
   - Allow compare-and-insert or revert to previous version.
4. **Guided Rewrite Chips**
   - Context-aware chips generated from content detection (e.g., "Clarify technical jargon," "Make more concise").

## UX Principles
- **Control & Transparency:** Always preview before committing; clearly label AI-generated text.
- **Low Friction:** Actions available within one click from cursor position.
- **Consistency:** Match styling and keyboard shortcuts of existing block toolbars.
- **Recoverability:** Offer undo stack plus version history of AI outputs.

## Experience Flow (Happy Path)
1. Author places cursor in a `Heading` block.
2. Inline toolbar surfaces AI icon; author selects `Rewrite`.
3. Prompt sheet appears anchored to block; author selects tone = Conversational.
4. AI generates 3 variations; author previews each in context.
5. Author accepts one; block updates and version tray logs change.
6. Author switches to adjacent `Paragraph` block, chooses `Expand`.
7. AI uses heading + paragraph context to propose expanded copy; author edits inline and saves.

## Research Methods
- **Diary Study:** Observe authors using current workflow for 1 week to baseline pain points.
- **Prototype Testing:** Medium-fidelity editor prototype with inline AI toolbar; run 6 usability sessions.
- **Comparative Study:** A/B authoring tasks with/without AI assistance to measure task completion time and satisfaction.
- **Survey & NPS:** Post-session survey to gauge trust and perceived control over AI edits.

## Data & AI Considerations
- Log prompts, actions, accepted/rejected suggestions for iterative tuning.
- Respect role-based permissions; log personal data only if necessary.
- Provide contextual metadata to model: surrounding blocks, course tone settings.
- Display usage disclaimers and link to AI policy.

## Success Metrics
- ↓ 30% average time to first draft of a section.
- ↑ 40% adoption of inline AI actions in active course builds.
- ≥ 80% of testers reporting trust in AI-generated suggestions.
- Net positive impact on content quality ratings (peer review).

## Risks & Open Questions
- Over-reliance on AI leading to generic content.
- Need to mitigate hallucinations or inaccurate facts.
- How to surface tone/style guidelines per organization?
- Determine fallback UX when model latency is high or service is offline.
- Explore accessibility implications (keyboard navigation, screen reader support).

## Next Steps
- Create prototype leveraging design tokens from existing block toolbar.
- Define instrumentation requirements with analytics.
- Draft content governance guidelines with legal/compliance teams.
- Schedule cross-functional review (Design, PM, Eng) to align on MVP scope.

