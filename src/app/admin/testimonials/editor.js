"use client";

import ListEditor from "../_components/list-editor";
import { Field, Select, TextArea, TextInput } from "../_components/ui";

function slug() {
  return Math.random().toString(36).slice(2, 8);
}

const TONE_OPTIONS = [
  { value: "#7DD3FC", label: "Sky cyan" },
  { value: "#00BCD4", label: "Brand cyan" },
  { value: "#E5B97D", label: "Warm sand" },
  { value: "#C99A5B", label: "Deep sand" },
  { value: "#9CA3AF", label: "Neutral gray" },
];

const blank = () => ({
  id: `testimonial-${slug()}`,
  name: "",
  loc: "",
  stars: 5,
  quote: "",
  initials: "",
  tone: "#7DD3FC",
  title: "",
  service: "",
  date: "",
});

function initialsFrom(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export default function TestimonialsEditor({ initial }) {
  return (
    <ListEditor
      type="testimonials"
      eyebrow="Homepage section"
      title="Testimonials"
      description="Customer reviews shown on the homepage and the /reviews page. The homepage uses just the quote, stars and avatar. The /reviews page also shows the optional title, service and date fields if you fill them in."
      initial={initial}
      makeBlank={blank}
      itemSummary={(t) =>
        [t.name, t.loc].filter(Boolean).join(" — ") || t.id
      }
      renderItem={(item, update) => (
        <div className="grid sm:grid-cols-2 gap-4 pt-3">
          <Field label="Name">
            <TextInput
              value={item.name}
              onChange={(e) => {
                const v = e.target.value;
                const auto = initialsFrom(v);
                update({
                  name: v,
                  initials:
                    !item.initials || item.initials === initialsFrom(item.name)
                      ? auto
                      : item.initials,
                });
              }}
              placeholder="Margaret Sutton"
            />
          </Field>
          <Field label="Location">
            <TextInput
              value={item.loc}
              onChange={(e) => update({ loc: e.target.value })}
              placeholder="Lake Mary, FL"
            />
          </Field>
          <Field label="Stars">
            <Select
              value={String(item.stars)}
              onChange={(e) => update({ stars: Number(e.target.value) })}
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} star{n === 1 ? "" : "s"}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Avatar tone" hint="Color behind the initials circle.">
            <Select
              value={item.tone}
              onChange={(e) => update({ tone: e.target.value })}
            >
              {TONE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Initials" hint="Two letters max. Auto-fills from name.">
            <TextInput
              value={item.initials}
              maxLength={3}
              onChange={(e) =>
                update({ initials: e.target.value.toUpperCase() })
              }
              placeholder="MS"
            />
          </Field>
          <div />
          <Field label="Quote" span={2}>
            <TextArea
              value={item.quote}
              onChange={(e) => update({ quote: e.target.value })}
              placeholder="After 14 years of green seawall..."
              rows={3}
            />
          </Field>
          <Field
            label="Short title"
            hint="Optional. Shows on /reviews above the quote (e.g. 'Years of algae gone in two days')."
            span={2}
          >
            <TextInput
              value={item.title || ""}
              onChange={(e) => update({ title: e.target.value })}
            />
          </Field>
          <Field label="Service performed" hint="Optional. Shows on /reviews under the quote.">
            <TextInput
              value={item.service || ""}
              onChange={(e) => update({ service: e.target.value })}
              placeholder="Lakefront Restoration"
            />
          </Field>
          <Field label="Date label" hint='Optional. Free-form, e.g. "3 weeks ago" or "Jan 2026".'>
            <TextInput
              value={item.date || ""}
              onChange={(e) => update({ date: e.target.value })}
              placeholder="2 weeks ago"
            />
          </Field>
        </div>
      )}
    />
  );
}
