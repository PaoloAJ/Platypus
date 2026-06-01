"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  Button,
  Card,
  Field,
  PageHeader,
  SaveBar,
  Select,
  TextArea,
  TextInput,
  Toast,
  useDirtyState,
} from "../_components/ui";
import { deleteOrphanedImages } from "../_components/image-cleanup";
import { PROCESS_ICON_OPTIONS } from "@/lib/registries";

function Section({ title, blurb, children }) {
  return (
    <Card className="space-y-5">
      <div>
        <h2 className="text-[16px] font-semibold">{title}</h2>
        {blurb && <p className="text-[#9CA3AF] text-[13px] mt-1">{blurb}</p>}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">{children}</div>
    </Card>
  );
}

function StringList({ items, onChange, placeholder, addLabel }) {
  const update = (i, v) => onChange(items.map((x, j) => (j === i ? v : x)));
  const remove = (i) => onChange(items.filter((_, j) => j !== i));
  const add = () => onChange([...items, ""]);
  return (
    <div className="space-y-2">
      {items.map((value, i) => (
        <div key={i} className="flex items-center gap-2">
          <TextInput
            value={value}
            onChange={(e) => update(i, e.target.value)}
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={() => remove(i)}
            className="p-2 rounded-lg text-[#6B7280] hover:text-red-400 hover:bg-red-500/10"
            title="Remove"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <Button variant="ghost" onClick={add}>
        <Plus className="w-3.5 h-3.5" /> {addLabel}
      </Button>
    </div>
  );
}

function StepList({ steps, onChange }) {
  const update = (i, patch) =>
    onChange(steps.map((s, j) => (j === i ? { ...s, ...patch } : s)));
  const remove = (i) => onChange(steps.filter((_, j) => j !== i));
  const add = () =>
    onChange([
      ...steps,
      {
        number: String(steps.length + 1).padStart(2, "0"),
        title: "",
        description: "",
        icon: "clipboard-list",
      },
    ]);

  return (
    <div className="space-y-3">
      {steps.map((s, i) => (
        <div
          key={i}
          className="rounded-xl border border-[#1F2937] bg-[#0B132B]/60 p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-[12px] tracking-eyebrow uppercase font-semibold text-[#9CA3AF]">
              Step {i + 1}
            </span>
            <button
              type="button"
              onClick={() => remove(i)}
              className="p-1.5 rounded-lg text-[#6B7280] hover:text-red-400 hover:bg-red-500/10"
              title="Delete step"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="grid sm:grid-cols-[80px_1fr_180px] gap-3">
            <Field label="Number">
              <TextInput
                value={s.number}
                onChange={(e) => update(i, { number: e.target.value })}
                placeholder="01"
              />
            </Field>
            <Field label="Title">
              <TextInput
                value={s.title}
                onChange={(e) => update(i, { title: e.target.value })}
                placeholder="Free quote"
              />
            </Field>
            <Field label="Icon">
              <Select
                value={s.icon}
                onChange={(e) => update(i, { icon: e.target.value })}
              >
                {PROCESS_ICON_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </Field>
          </div>
          <Field label="Description">
            <TextArea
              value={s.description}
              onChange={(e) => update(i, { description: e.target.value })}
              rows={2}
            />
          </Field>
        </div>
      ))}
      <Button variant="ghost" onClick={add}>
        <Plus className="w-3.5 h-3.5" /> Add step
      </Button>
    </div>
  );
}

// Defaults applied to incoming `initial` so the editor never crashes on
// older site rows that don't yet have these sections.
const SECTION_DEFAULTS = {
  hero: {
    demoCaption: "Live demo · drag the slider",
    demoLocation: "",
    avgTimelineLabel: "Avg. timeline",
    avgTimelineValue: "",
    avgTimelineUnit: "days",
  },
  socialProof: {
    count: "",
    countLabel: "",
    trustHeadline: "",
    towns: [],
    publications: [],
  },
  beforeAfter: {
    eyebrow: "",
    headlinePart1: "",
    headlinePart2: "",
    description: "",
  },
  process: { eyebrow: "", headline: "", description: "", steps: [] },
  testimonialsSection: {
    eyebrow: "",
    headlinePart1: "",
    rating: "",
    ratingMax: "5",
    reviewCount: "",
    headlinePart2: "",
  },
  scarcity: { disclaimer: "" },
  serviceArea: { eyebrow: "", headline: "", description: "", counties: [] },
};

function applyDefaults(raw) {
  const out = { ...raw };
  for (const [key, defaults] of Object.entries(SECTION_DEFAULTS)) {
    out[key] = { ...defaults, ...(raw?.[key] ?? {}) };
  }
  return out;
}

export default function SiteCopyEditor({ initial }) {
  const seeded = applyDefaults(initial);
  const { data, setData, saved, setSaved, dirty } = useDirtyState(seeded);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const updateSection = (section, patch) => {
    setData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...patch },
    }));
  };

  const reset = () => setData(seeded);

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/cms/site", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Save failed");
      deleteOrphanedImages(saved, data);
      setSaved(data);
      setToast({ message: "Saved — public site updated.", type: "success" });
    } catch (err) {
      setToast({ message: err.message, type: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Editorial"
        title="Site copy"
        description="Every editable text block on the homepage, About page, and footer. Markdown is not supported — plain text only."
      />

      <div className="space-y-5">
        <Section
          title="Hero (homepage top)"
          blurb='The headline reads "{Part 1} {highlight} — {Part 2}".'
        >
          <Field label="Eyebrow tag" span={2}>
            <TextInput
              value={data.hero.eyebrow}
              onChange={(e) =>
                updateSection("hero", { eyebrow: e.target.value })
              }
              placeholder="Central Florida · Waterfront restoration"
            />
          </Field>
          <Field label="Headline · part 1">
            <TextInput
              value={data.hero.headlinePart1}
              onChange={(e) =>
                updateSection("hero", { headlinePart1: e.target.value })
              }
            />
          </Field>
          <Field label="Headline · highlight (cyan)">
            <TextInput
              value={data.hero.headlineHighlight}
              onChange={(e) =>
                updateSection("hero", { headlineHighlight: e.target.value })
              }
            />
          </Field>
          <Field label="Headline · part 2" span={2}>
            <TextInput
              value={data.hero.headlinePart2}
              onChange={(e) =>
                updateSection("hero", { headlinePart2: e.target.value })
              }
            />
          </Field>
          <Field label="Subtext" span={2}>
            <TextArea
              value={data.hero.subtext}
              onChange={(e) =>
                updateSection("hero", { subtext: e.target.value })
              }
              rows={3}
            />
          </Field>
          <Field label="Primary CTA">
            <TextInput
              value={data.hero.primaryCta}
              onChange={(e) =>
                updateSection("hero", { primaryCta: e.target.value })
              }
            />
          </Field>
          <Field label="Secondary CTA">
            <TextInput
              value={data.hero.secondaryCta}
              onChange={(e) =>
                updateSection("hero", { secondaryCta: e.target.value })
              }
            />
          </Field>
          <Field label="Trust badge 1">
            <TextInput
              value={data.hero.trustBadge1}
              onChange={(e) =>
                updateSection("hero", { trustBadge1: e.target.value })
              }
            />
          </Field>
          <Field label="Trust badge 2">
            <TextInput
              value={data.hero.trustBadge2}
              onChange={(e) =>
                updateSection("hero", { trustBadge2: e.target.value })
              }
            />
          </Field>
          <Field label="Trust badge 3" span={2}>
            <TextInput
              value={data.hero.trustBadge3}
              onChange={(e) =>
                updateSection("hero", { trustBadge3: e.target.value })
              }
            />
          </Field>
        </Section>

        <Section
          title="Hero — before/after card"
          blurb="The interactive slider and the floating stat badge below it."
        >
          <Field label="Demo caption (left)">
            <TextInput
              value={data.hero.demoCaption}
              onChange={(e) =>
                updateSection("hero", { demoCaption: e.target.value })
              }
              placeholder="Live demo · drag the slider"
            />
          </Field>
          <Field label="Demo location (right)">
            <TextInput
              value={data.hero.demoLocation}
              onChange={(e) =>
                updateSection("hero", { demoLocation: e.target.value })
              }
              placeholder="Lake Mary, FL · 3-day restore"
            />
          </Field>
          <Field label="Stat label" hint="Leave value empty to hide the badge.">
            <TextInput
              value={data.hero.avgTimelineLabel}
              onChange={(e) =>
                updateSection("hero", { avgTimelineLabel: e.target.value })
              }
              placeholder="Avg. timeline"
            />
          </Field>
          <Field label="Stat value">
            <TextInput
              value={data.hero.avgTimelineValue}
              onChange={(e) =>
                updateSection("hero", { avgTimelineValue: e.target.value })
              }
              placeholder="4.2"
            />
          </Field>
          <Field label="Stat unit">
            <TextInput
              value={data.hero.avgTimelineUnit}
              onChange={(e) =>
                updateSection("hero", { avgTimelineUnit: e.target.value })
              }
              placeholder="days"
            />
          </Field>
        </Section>

        <Section
          title="Social proof strip"
          blurb="The thin band under the hero with the rolling counter, towns marquee, and publication mentions."
        >
          <Field label="Counter value" hint="Animates up to this number.">
            <TextInput
              value={data.socialProof.count}
              onChange={(e) =>
                updateSection("socialProof", { count: e.target.value })
              }
              placeholder="127"
            />
          </Field>
          <Field label="Counter label">
            <TextInput
              value={data.socialProof.countLabel}
              onChange={(e) =>
                updateSection("socialProof", { countLabel: e.target.value })
              }
              placeholder="properties restored this year"
            />
          </Field>
          <Field label="Marquee headline" span={2}>
            <TextInput
              value={data.socialProof.trustHeadline}
              onChange={(e) =>
                updateSection("socialProof", { trustHeadline: e.target.value })
              }
              placeholder="Trusted by communities in"
            />
          </Field>
          <Field label="Towns" hint='Each town is shown as "Name, FL".' span={2}>
            <StringList
              items={data.socialProof.towns}
              onChange={(towns) => updateSection("socialProof", { towns })}
              placeholder="Lake Mary"
              addLabel="Add town"
            />
          </Field>
          <Field
            label="Publications"
            hint="Press / media mentions shown on the right."
            span={2}
          >
            <StringList
              items={data.socialProof.publications}
              onChange={(publications) =>
                updateSection("socialProof", { publications })
              }
              placeholder="Orlando Sentinel"
              addLabel="Add publication"
            />
          </Field>
        </Section>

        <Section
          title="Before/after section"
          blurb="The 'Recent transformations' grid header."
        >
          <Field label="Eyebrow">
            <TextInput
              value={data.beforeAfter.eyebrow}
              onChange={(e) =>
                updateSection("beforeAfter", { eyebrow: e.target.value })
              }
            />
          </Field>
          <Field label="Headline · main">
            <TextInput
              value={data.beforeAfter.headlinePart1}
              onChange={(e) =>
                updateSection("beforeAfter", { headlinePart1: e.target.value })
              }
              placeholder="Drag any photo."
            />
          </Field>
          <Field label="Headline · subtle (gray)" span={2}>
            <TextInput
              value={data.beforeAfter.headlinePart2}
              onChange={(e) =>
                updateSection("beforeAfter", { headlinePart2: e.target.value })
              }
              placeholder="See the difference."
            />
          </Field>
          <Field label="Description (right column)" span={2}>
            <TextArea
              value={data.beforeAfter.description}
              onChange={(e) =>
                updateSection("beforeAfter", { description: e.target.value })
              }
              rows={2}
            />
          </Field>
        </Section>

        <Section
          title="Process section"
          blurb="The 4-step 'How it works' band. Add, remove, or reorder steps."
        >
          <Field label="Eyebrow">
            <TextInput
              value={data.process.eyebrow}
              onChange={(e) =>
                updateSection("process", { eyebrow: e.target.value })
              }
            />
          </Field>
          <Field label="Headline">
            <TextInput
              value={data.process.headline}
              onChange={(e) =>
                updateSection("process", { headline: e.target.value })
              }
            />
          </Field>
          <Field label="Description" span={2}>
            <TextArea
              value={data.process.description}
              onChange={(e) =>
                updateSection("process", { description: e.target.value })
              }
              rows={2}
            />
          </Field>
          <Field label="Steps" span={2}>
            <StepList
              steps={data.process.steps}
              onChange={(steps) => updateSection("process", { steps })}
            />
          </Field>
        </Section>

        <Section
          title="Testimonials section header"
          blurb='Reads "{Part 1} {rating} out of {max} across {count} {Part 2}".'
        >
          <Field label="Eyebrow">
            <TextInput
              value={data.testimonialsSection.eyebrow}
              onChange={(e) =>
                updateSection("testimonialsSection", { eyebrow: e.target.value })
              }
            />
          </Field>
          <Field label="Headline · part 1">
            <TextInput
              value={data.testimonialsSection.headlinePart1}
              onChange={(e) =>
                updateSection("testimonialsSection", {
                  headlinePart1: e.target.value,
                })
              }
              placeholder="Rated"
            />
          </Field>
          <Field label="Rating">
            <TextInput
              value={data.testimonialsSection.rating}
              onChange={(e) =>
                updateSection("testimonialsSection", { rating: e.target.value })
              }
              placeholder="4.9"
            />
          </Field>
          <Field label="Rating max">
            <TextInput
              value={data.testimonialsSection.ratingMax}
              onChange={(e) =>
                updateSection("testimonialsSection", {
                  ratingMax: e.target.value,
                })
              }
              placeholder="5"
            />
          </Field>
          <Field label="Review count">
            <TextInput
              value={data.testimonialsSection.reviewCount}
              onChange={(e) =>
                updateSection("testimonialsSection", {
                  reviewCount: e.target.value,
                })
              }
              placeholder="87"
            />
          </Field>
          <Field label="Headline · part 2" span={2}>
            <TextInput
              value={data.testimonialsSection.headlinePart2}
              onChange={(e) =>
                updateSection("testimonialsSection", {
                  headlinePart2: e.target.value,
                })
              }
              placeholder="Google reviews."
            />
          </Field>
        </Section>

        <Section
          title="Scarcity card (above the footer)"
          blurb="The 'Reserve your restoration slot' booking card."
        >
          <Field label="Eyebrow">
            <TextInput
              value={data.scarcity.eyebrow}
              onChange={(e) =>
                updateSection("scarcity", { eyebrow: e.target.value })
              }
            />
          </Field>
          <Field label="Headline">
            <TextInput
              value={data.scarcity.headline}
              onChange={(e) =>
                updateSection("scarcity", { headline: e.target.value })
              }
            />
          </Field>
          <Field label="Body" span={2}>
            <TextArea
              value={data.scarcity.body}
              onChange={(e) =>
                updateSection("scarcity", { body: e.target.value })
              }
              rows={3}
            />
          </Field>
          <Field label="Disclaimer (small text under the CTA)" span={2}>
            <TextInput
              value={data.scarcity.disclaimer}
              onChange={(e) =>
                updateSection("scarcity", { disclaimer: e.target.value })
              }
              placeholder="No spam. No deposit required. Free estimate in 24h."
            />
          </Field>
        </Section>

        <Section
          title="Service area section"
          blurb="The map band at the bottom of the homepage."
        >
          <Field label="Eyebrow">
            <TextInput
              value={data.serviceArea.eyebrow}
              onChange={(e) =>
                updateSection("serviceArea", { eyebrow: e.target.value })
              }
            />
          </Field>
          <Field label="Headline">
            <TextInput
              value={data.serviceArea.headline}
              onChange={(e) =>
                updateSection("serviceArea", { headline: e.target.value })
              }
            />
          </Field>
          <Field label="Description" span={2}>
            <TextArea
              value={data.serviceArea.description}
              onChange={(e) =>
                updateSection("serviceArea", { description: e.target.value })
              }
              rows={2}
            />
          </Field>
          <Field
            label="Counties"
            hint='Shown as pill tags reading "Name County".'
            span={2}
          >
            <StringList
              items={data.serviceArea.counties}
              onChange={(counties) =>
                updateSection("serviceArea", { counties })
              }
              placeholder="Orange"
              addLabel="Add county"
            />
          </Field>
        </Section>

        <Section
          title="About page"
          blurb="Story, headline, and stats grid on /about."
        >
          <Field label="Headline" span={2}>
            <TextInput
              value={data.about.headline}
              onChange={(e) =>
                updateSection("about", { headline: e.target.value })
              }
            />
          </Field>
          <Field label="Subheadline" span={2}>
            <TextArea
              value={data.about.subheadline}
              onChange={(e) =>
                updateSection("about", { subheadline: e.target.value })
              }
              rows={2}
            />
          </Field>
          <Field label="Story paragraph 1" span={2}>
            <TextArea
              value={data.about.story1}
              onChange={(e) =>
                updateSection("about", { story1: e.target.value })
              }
              rows={3}
            />
          </Field>
          <Field label="Story paragraph 2" span={2}>
            <TextArea
              value={data.about.story2}
              onChange={(e) =>
                updateSection("about", { story2: e.target.value })
              }
              rows={3}
            />
          </Field>
          <Field label="Story paragraph 3" span={2}>
            <TextArea
              value={data.about.story3}
              onChange={(e) =>
                updateSection("about", { story3: e.target.value })
              }
              rows={3}
            />
          </Field>
          <Field label="Years experience">
            <TextInput
              value={data.about.yearsFounded}
              onChange={(e) =>
                updateSection("about", { yearsFounded: e.target.value })
              }
            />
          </Field>
          <Field label="Projects completed">
            <TextInput
              value={data.about.projectsCount}
              onChange={(e) =>
                updateSection("about", { projectsCount: e.target.value })
              }
            />
          </Field>
          <Field label="Customer satisfaction">
            <TextInput
              value={data.about.satisfaction}
              onChange={(e) =>
                updateSection("about", { satisfaction: e.target.value })
              }
            />
          </Field>
          <Field label="Cities served">
            <TextInput
              value={data.about.citiesServed}
              onChange={(e) =>
                updateSection("about", { citiesServed: e.target.value })
              }
            />
          </Field>
        </Section>

        <Section title="Footer" blurb="Tagline and contact info shown at the bottom of every page.">
          <Field label="Tagline" span={2}>
            <TextArea
              value={data.footer.tagline}
              onChange={(e) =>
                updateSection("footer", { tagline: e.target.value })
              }
              rows={2}
            />
          </Field>
          <Field label="License number">
            <TextInput
              value={data.footer.licenseNumber}
              onChange={(e) =>
                updateSection("footer", { licenseNumber: e.target.value })
              }
            />
          </Field>
          <Field label="Phone">
            <TextInput
              value={data.footer.phone}
              onChange={(e) =>
                updateSection("footer", { phone: e.target.value })
              }
            />
          </Field>
          <Field label="Email">
            <TextInput
              value={data.footer.email}
              onChange={(e) =>
                updateSection("footer", { email: e.target.value })
              }
            />
          </Field>
          <Field label="Business hours">
            <TextInput
              value={data.footer.hours}
              onChange={(e) =>
                updateSection("footer", { hours: e.target.value })
              }
            />
          </Field>
        </Section>
      </div>

      <SaveBar dirty={dirty} saving={saving} onSave={save} onReset={reset} />
      <Toast
        message={toast?.message}
        type={toast?.type}
        onDismiss={() => setToast(null)}
      />
    </>
  );
}
