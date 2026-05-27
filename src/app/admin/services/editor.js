"use client";

import { Trash2, Plus } from "lucide-react";
import { SERVICE_ICON_OPTIONS } from "@/lib/registries";
import ListEditor from "../_components/list-editor";
import { Button, Field, Select, TextArea, TextInput, Toggle } from "../_components/ui";

function slug() {
  return Math.random().toString(36).slice(2, 8);
}

const blank = () => ({
  id: `service-${slug()}`,
  title: "",
  blurb: "",
  from: "",
  bullets: [""],
  icon: "anchor",
  popular: false,
});

export default function ServicesEditor({ initial }) {
  return (
    <ListEditor
      type="services"
      eyebrow="Homepage section"
      title="Services & pricing"
      description="The service tiles with starting prices and 'Most popular' badge. Order here is the visual order on the site."
      initial={initial}
      makeBlank={blank}
      itemSummary={(s) =>
        [s.title, s.from].filter(Boolean).join(" · ") || s.id
      }
      renderItem={(item, update) => (
        <div className="grid sm:grid-cols-2 gap-4 pt-3">
          <Field label="Title">
            <TextInput
              value={item.title}
              onChange={(e) => update({ title: e.target.value })}
              placeholder="Lakefront Restoration"
            />
          </Field>
          <Field label="Starting price" hint='Include the "$" or text prefix.'>
            <TextInput
              value={item.from}
              onChange={(e) => update({ from: e.target.value })}
              placeholder="$650"
            />
          </Field>
          <Field label="Icon">
            <Select
              value={item.icon}
              onChange={(e) => update({ icon: e.target.value })}
            >
              {SERVICE_ICON_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Most popular badge">
            <div className="pt-1">
              <Toggle
                checked={!!item.popular}
                onChange={(v) => update({ popular: v })}
                label={item.popular ? "Shown" : "Hidden"}
              />
            </div>
          </Field>
          <Field label="Description blurb" span={2}>
            <TextArea
              value={item.blurb}
              onChange={(e) => update({ blurb: e.target.value })}
              placeholder="Docks, seawalls, boat lifts and pavers..."
              rows={2}
            />
          </Field>
          <Field label="Bullets" span={2} hint="Short feature points shown beneath the description.">
            <div className="space-y-2">
              {item.bullets.map((b, i) => (
                <div key={i} className="flex items-center gap-2">
                  <TextInput
                    value={b}
                    onChange={(e) => {
                      const next = item.bullets.slice();
                      next[i] = e.target.value;
                      update({ bullets: next });
                    }}
                    placeholder={`Bullet ${i + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const next = item.bullets.filter((_, j) => j !== i);
                      update({ bullets: next.length ? next : [""] });
                    }}
                    className="p-2 rounded-lg text-[#6B7280] hover:text-red-400 hover:bg-red-500/10"
                    title="Remove bullet"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <Button
                variant="ghost"
                onClick={() => update({ bullets: [...item.bullets, ""] })}
              >
                <Plus className="w-3.5 h-3.5" />
                Add bullet
              </Button>
            </div>
          </Field>
        </div>
      )}
    />
  );
}
