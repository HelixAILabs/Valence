# Pre-registration: two-stage cascade, v3 — self-harm bypasses the validator

**Locked 2026-07-14, BEFORE running.** Follows PREREG-cascade-v2.md, which FAILED 2 of 4 bars
(M2 self-harm 81%, M3 precision 76%) but showed the detect→validate mechanism works (precision
42%→76%, harm recall held 92%). v2's diagnosis named the fix; v3 implements and measures exactly that
— **no new tuning, one structural change.**

## The single change (structural, principled — not prompt tuning)

**Self-harm is Tier-1 and bypasses Stage 2 entirely.** In v2 a SELFHARM flag was routed through the
validator, which — on the weakest model — sometimes returned FALSE_ALARM on a *real* self-harm
disclosure and dropped it. That is catastrophic and is the reason M2 fell to 81%. v3: a Stage-1
SELFHARM label is **always kept** (never validated away). Only VIOLENCE flags are validated.

Nothing else moves: same Stage-1 LABEL screen, same v2.2 validator prompt (already control-gated 7/7),
same frozen battery `kids-safety-v1-frozen-2026-07-11`, same held-out split `stableHash(id)%2`,
report on **test** only, validity control first.

## What v3 is expected to show (disentangling the two v2 failures)

- **M2 self-harm net recall → the Stage-1 ceiling** (no validator can drop it now). If M2 rises from
  81% toward ~85% but still misses ≥90, that **proves the residual self-harm gap is model capability,
  not the validator** — self-harm's answer is the deterministic keyword floor + a capable tier
  (E4B = 99.2%), not the label/cascade on E2B.
- **M1 violence recall ~unchanged (~92%)** and **M3 precision ~unchanged (~76%)** — the safe violence
  operating point. (Self-harm bypass can only *raise* a kept flag, so M3 precision may dip a hair if a
  cry-wolf message is mislabeled SELFHARM by Stage 1 — the deliberate safe direction.)

## The bar (UNCHANGED from v2 — no goalpost-moving; PASS requires ALL on `test`)

| Axis | Metric | Threshold |
|------|--------|-----------|
| M3 cry-wolf | precision (not-flagged) | ≥ 90% |
| M1 harm | net recall | ≥ 80% |
| M1 explicit | net recall | ≥ 90% |
| M2 self-harm | net recall | ≥ 90% (catastrophic guardrail) |

The scientific verdict stays strict. v3's *value* is the clean disentanglement + the honest violence
operating point, not clearing a bar we already expect the model (not the cascade) to miss on M2.

## Prediction (on the record)

M2 net recall lands **~83–87%** (up from 81%, bypass removes the wrongful drops) but **still < 90**
(model ceiling). M1 ~92% / explicit ≥90. M3 ~74–78%. **Verdict: still FAIL by the strict bar, PASS as
a mechanism** — the cascade gives a usable, safe *violence* operating point; self-harm is honestly
model-bound and covered by other layers. If M2 *exceeds* 90 I was wrong about the model ceiling.

## Outcome consequences (decided in advance)

- **M2 rises to Stage-1 ceiling, still < 90** → confirmed: ship the violence cascade behind the flag
  at the ~76%/92% operating point *if* that operating point is accepted as a product decision;
  self-harm stays on the floor + capable-tier path, never the cascade alone. Arc resolves; write it up.
- **M2 clears 90** → the model is better than measured; re-examine the Stage-1 self-harm recall.
- **Validity control < 6/7** → the validator degenerated on this run; VOID, do not trust numbers.

## RESULT (v3, E2B, held-out test split) — 2026-07-14

Validity control: **7/7 VALID** (drops game / "homework is killing me" hyperbole, keeps real threats
+ self-harm). Test split M1=110, M2=63, M3=101. v2 re-run same-session for a clean comparison.

| Axis | v2 (self-harm validated) | v3 (self-harm bypass) | Bar | |
|------|--------------------------|-----------------------|-----|-|
| M1 harm recall | 91.8% (explicit 93.8%) | **91.8%** (explicit 93.8%) | ≥80/≥90 | OK |
| M2 self-harm recall | 81.0% (51/63) | **84.1%** (53/63) | ≥90 | XX |
| M3 precision (not-flagged) | 76.2% (77/101) | **71.3%** (72/101) | ≥90 | XX |

**VERDICT: FAIL by the strict bar (M2 84 < 90, M3 71 < 90) — and informative exactly as predicted.**

- **Self-harm bypass worked as designed.** M2 81% → 84.1%: the validator had been dropping ~2 real
  self-harm disclosures (51→53 kept); removing it recovered them. **The residual gap to 90% is now
  provably the MODEL, not the validator** — nothing can drop a self-harm flag anymore, yet recall
  tops ~84% (Stage-1's self-harm ceiling on E2B). Self-harm's answer is the deterministic keyword
  floor + a capable tier (E4B = 99.2%), never the label/cascade on the weakest model.
- **The safe choice has an honest cost: M3 76% → 71%.** ~5 cry-wolf messages that Stage-1 *mislabels*
  as SELFHARM (e.g. "this homework is killing me") now survive — because "never drop a self-harm flag"
  keeps the false ones too. Deliberate, safe direction, disclosed. It means the clean cascade win is
  **VIOLENCE**, not self-harm.
- **Violence is the deliverable:** ~92% recall at ~76% precision — the usable, safe violence operating
  point (nearly every real threat caught; ~3 of 4 alerts real).

Prediction check (on the record): M2 "~83–87%" → **84.1% ✓**; M1 "~92% / explicit ≥90" → **✓**;
M3 "~74–78%" → **71.3%, slightly below my range** (the bypass cost more cry-wolf than I guessed —
honest miss); verdict "FAIL strict, PASS mechanism" → **✓**.

Next (product decision, not research): accept the ~76%/92% violence operating point for the default-OFF
cascade flag, or hold for a different precision lever that doesn't risk recall? Self-harm stays on the
floor + capable tier. Consistency + real-world (paraphrase) batteries remain open.
