"use client";

import { GALLERY_CATEGORY_OPTIONS } from "@/lib/registries";
import ListEditor from "../_components/list-editor";
import ImageField from "../_components/image-field";
import { Field, Select, TextArea, TextInput } from "../_components/ui";

const slug = () => Math.random().toString(36).slice(2, 8);

const blank = () => ({
  id: `gallery-${slug()}`,
  title: "",
  category: GALLERY_CATEGORY_OPTIONS[0].value,
  location: "Central Florida",
  size: "",
  description: "",
  image: { src: "", focalX: 50, focalY: 50, zoom: 1 },
});

export default function GalleryEditor({ initial }) {
  return (
    <ListEditor
      type="gallery"
      eyebrow="Public gallery"
      title="Project gallery"
      description="The portfolio shown on /gallery. Add a photo, pick a category, describe the work. The category filters and counts update automatically."
      initial={initial}
      makeBlank={blank}
      itemSummary={(g) =>
        [g.title, g.location].filter(Boolean).join(" — ") || g.id
      }
      renderItem={(item, update) => (
        <div className="space-y-5 pt-3">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Title">
              <TextInput
                value={item.title}
                onChange={(e) => update({ title: e.target.value })}
                placeholder="Dock Restoration"
              />
            </Field>
            <Field label="Category">
              <Select
                value={item.category}
                onChange={(e) => update({ category: e.target.value })}
              >
                {GALLERY_CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Location">
              <TextInput
                value={item.location}
                onChange={(e) => update({ location: e.target.value })}
                placeholder="Lake Mary, FL"
              />
            </Field>
            <Field label="Size / scope" hint="Optional — e.g. '400 sq ft' or '2 days'.">
              <TextInput
                value={item.size}
                onChange={(e) => update({ size: e.target.value })}
                placeholder="400 sq ft"
              />
            </Field>
            <Field label="Description" span={2}>
              <TextArea
                value={item.description}
                onChange={(e) => update({ description: e.target.value })}
                rows={2}
                placeholder="Short description of the work."
              />
            </Field>
          </div>

          <ImageField
            label="Photo"
            hint="Drag inside the preview to set the focal point. Zoom slider crops in further."
            value={item.image}
            onChange={(next) => update({ image: next })}
            aspect={16 / 10}
          />
        </div>
      )}
    />
  );
}
