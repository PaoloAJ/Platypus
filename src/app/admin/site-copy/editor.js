"use client";

import { useState } from "react";
import {
  Card,
  Field,
  PageHeader,
  SaveBar,
  TextArea,
  TextInput,
  Toast,
  useDirtyState,
} from "../_components/ui";

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

export default function SiteCopyEditor({ initial }) {
  const { data, setData, setSaved, dirty } = useDirtyState(initial);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const updateSection = (section, patch) => {
    setData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...patch },
    }));
  };

  const reset = () => setData(initial);

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/cms/site", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Save failed");
      setSaved(data);
      setToast({ message: "Saved. Refresh the site to see the change.", type: "success" });
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
        description="The hero headline, scarcity card, about page story, and footer fields. Markdown is not supported — plain text only."
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
          <Field label="Rating value">
            <TextInput
              value={data.hero.rating}
              onChange={(e) =>
                updateSection("hero", { rating: e.target.value })
              }
              placeholder="4.9"
            />
          </Field>
          <Field label="Review count text">
            <TextInput
              value={data.hero.reviewCount}
              onChange={(e) =>
                updateSection("hero", { reviewCount: e.target.value })
              }
              placeholder="87 reviews"
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
