"use client";

import ListEditor from "../_components/list-editor";
import { Field, TextArea, TextInput } from "../_components/ui";
import ImageField from "../_components/image-field";

function slug() {
  return Math.random().toString(36).slice(2, 8);
}

const blankImage = () => ({ src: "", focalX: 50, focalY: 50, zoom: 1 });

const blank = () => ({
  id: `project-${slug()}`,
  location: "",
  scope: "",
  duration: "",
  quote: "",
  before: blankImage(),
  after: blankImage(),
});

export default function ProjectsEditor({ initial }) {
  return (
    <ListEditor
      type="projects"
      eyebrow="Homepage section"
      title="Before / After projects"
      description="The drag-to-reveal transformation cards on the homepage. Upload a Before and After photo for each — drag inside the preview to set what stays visible when the photo gets cropped."
      initial={initial}
      makeBlank={blank}
      itemSummary={(p) =>
        [p.location, p.scope].filter(Boolean).join(" — ") || p.id
      }
      renderItem={(item, update) => (
        <div className="space-y-5 pt-3">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Location">
              <TextInput
                value={item.location}
                onChange={(e) => update({ location: e.target.value })}
                placeholder="Lake Mary, FL"
              />
            </Field>
            <Field label="Scope">
              <TextInput
                value={item.scope}
                onChange={(e) => update({ scope: e.target.value })}
                placeholder="Dock & boat-lift restoration"
              />
            </Field>
            <Field label="Duration">
              <TextInput
                value={item.duration}
                onChange={(e) => update({ duration: e.target.value })}
                placeholder="3 days"
              />
            </Field>
            <Field label="Customer quote" hint="Short, in their voice.">
              <TextArea
                value={item.quote}
                onChange={(e) => update({ quote: e.target.value })}
                placeholder="Looks like a brand-new dock..."
                rows={2}
              />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <ImageField
              label="Before photo"
              hint="Shown on the left of the drag-slider."
              value={item.before}
              onChange={(next) => update({ before: next })}
            />
            <ImageField
              label="After photo"
              hint="Shown on the right of the drag-slider."
              value={item.after}
              onChange={(next) => update({ after: next })}
            />
          </div>
        </div>
      )}
    />
  );
}
