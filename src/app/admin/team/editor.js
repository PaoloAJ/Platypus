"use client";

import ListEditor from "../_components/list-editor";
import ImageField from "../_components/image-field";
import { Field, TextArea, TextInput } from "../_components/ui";

const slug = () => Math.random().toString(36).slice(2, 8);

const blank = () => ({
  id: `team-${slug()}`,
  name: "",
  role: "",
  experience: "",
  specialty: "",
  image: { src: "", focalX: 50, focalY: 50, zoom: 1 },
});

export default function TeamEditor({ initial }) {
  return (
    <ListEditor
      type="team"
      eyebrow="About page"
      title="Team members"
      description="The team grid on /about. If empty, the section hides automatically — add people once you're ready to show them."
      initial={initial}
      makeBlank={blank}
      itemSummary={(t) =>
        [t.name, t.role].filter(Boolean).join(" — ") || t.id
      }
      renderItem={(item, update) => (
        <div className="space-y-5 pt-3">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name">
              <TextInput
                value={item.name}
                onChange={(e) => update({ name: e.target.value })}
                placeholder="Mike Johnson"
              />
            </Field>
            <Field label="Role / title">
              <TextInput
                value={item.role}
                onChange={(e) => update({ role: e.target.value })}
                placeholder="Founder & Lead Contractor"
              />
            </Field>
            <Field label="Experience" hint="Free text, e.g. '15+ years'.">
              <TextInput
                value={item.experience}
                onChange={(e) => update({ experience: e.target.value })}
              />
            </Field>
            <Field label="Specialty">
              <TextInput
                value={item.specialty}
                onChange={(e) => update({ specialty: e.target.value })}
                placeholder="Lakefront restoration"
              />
            </Field>
          </div>
          <ImageField
            label="Photo (optional)"
            hint="Square headshot looks best. Drag inside the preview to set the focal point."
            value={item.image}
            onChange={(next) => update({ image: next })}
            aspect={1}
          />
        </div>
      )}
    />
  );
}
