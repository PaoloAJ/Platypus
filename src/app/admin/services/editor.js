"use client";

import { useState } from "react";
import { Trash2, Plus, ChevronUp, ChevronDown, GripVertical } from "lucide-react";
import { SERVICE_ICON_OPTIONS } from "@/lib/registries";
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
  Toggle,
  useDirtyState,
} from "../_components/ui";

const slug = () => Math.random().toString(36).slice(2, 8);

const blankCard = () => ({
  id: `service-${slug()}`,
  title: "",
  blurb: "",
  from: "",
  bullets: [""],
  icon: "anchor",
  popular: false,
});

const blankCategory = () => ({
  id: `category-${slug()}`,
  title: "",
  items: [{ name: "", desc: "" }],
});

function moveInArray(arr, from, dir) {
  const to = from + dir;
  if (to < 0 || to >= arr.length) return arr;
  const next = arr.slice();
  [next[from], next[to]] = [next[to], next[from]];
  return next;
}

function ItemHeader({ summary, onMoveUp, onMoveDown, onDelete, canMoveUp, canMoveDown, onToggle }) {
  return (
    <div className="flex items-center gap-2 px-4 py-3">
      <GripVertical className="w-4 h-4 text-[#374151]" />
      <button type="button" onClick={onToggle} className="flex-1 text-left min-w-0">
        <div className="text-[14.5px] font-semibold truncate">{summary || "Untitled"}</div>
      </button>
      <button
        type="button"
        onClick={onMoveUp}
        disabled={!canMoveUp}
        className="p-1.5 rounded-lg text-[#6B7280] hover:text-white hover:bg-[#0B132B] disabled:opacity-30"
      >
        <ChevronUp className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={onMoveDown}
        disabled={!canMoveDown}
        className="p-1.5 rounded-lg text-[#6B7280] hover:text-white hover:bg-[#0B132B] disabled:opacity-30"
      >
        <ChevronDown className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="p-1.5 rounded-lg text-[#6B7280] hover:text-red-400 hover:bg-red-500/10"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

function Section({ title, blurb, children, action }) {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-[18px] font-semibold">{title}</h2>
          {blurb && <p className="text-[#9CA3AF] text-[13px] mt-1 max-w-2xl">{blurb}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

export default function ServicesEditor({ initial }) {
  const { data, setData, setSaved, dirty } = useDirtyState(initial);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [openCards, setOpenCards] = useState(() => new Set(initial.homepage.map((i) => i.id)));
  const [openCats, setOpenCats] = useState(() => new Set(initial.categories.map((i) => i.id)));

  const toggleIn = (setter) => (id) =>
    setter((s) => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const reset = () => {
    setData(initial);
    setOpenCards(new Set(initial.homepage.map((i) => i.id)));
    setOpenCats(new Set(initial.categories.map((i) => i.id)));
  };

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/cms/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Save failed");
      setSaved(data);
      setToast({ message: "Saved — public site updated.", type: "success" });
    } catch (err) {
      setToast({ message: err.message, type: "error" });
    } finally {
      setSaving(false);
    }
  };

  // --- HOMEPAGE CARDS handlers ---
  const updateCard = (id, patch) =>
    setData((d) => ({
      ...d,
      homepage: d.homepage.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }));
  const moveCard = (id, dir) =>
    setData((d) => {
      const idx = d.homepage.findIndex((c) => c.id === id);
      return idx < 0 ? d : { ...d, homepage: moveInArray(d.homepage, idx, dir) };
    });
  const deleteCard = (id) => {
    if (!confirm("Delete this card?")) return;
    setData((d) => ({ ...d, homepage: d.homepage.filter((c) => c.id !== id) }));
  };
  const addCard = () => {
    const c = blankCard();
    setData((d) => ({ ...d, homepage: [...d.homepage, c] }));
    setOpenCards((s) => new Set(s).add(c.id));
  };

  // --- CATEGORIES handlers ---
  const updateCategory = (id, patch) =>
    setData((d) => ({
      ...d,
      categories: d.categories.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }));
  const moveCategory = (id, dir) =>
    setData((d) => {
      const idx = d.categories.findIndex((c) => c.id === id);
      return idx < 0 ? d : { ...d, categories: moveInArray(d.categories, idx, dir) };
    });
  const deleteCategory = (id) => {
    if (!confirm("Delete this whole section?")) return;
    setData((d) => ({ ...d, categories: d.categories.filter((c) => c.id !== id) }));
  };
  const addCategory = () => {
    const c = blankCategory();
    setData((d) => ({ ...d, categories: [...d.categories, c] }));
    setOpenCats((s) => new Set(s).add(c.id));
  };
  const updateCategoryItem = (catId, itemIdx, patch) =>
    updateCategory(catId, {
      items: data.categories
        .find((c) => c.id === catId)
        .items.map((it, i) => (i === itemIdx ? { ...it, ...patch } : it)),
    });
  const addCategoryItem = (catId) => {
    const cat = data.categories.find((c) => c.id === catId);
    updateCategory(catId, { items: [...cat.items, { name: "", desc: "" }] });
  };
  const removeCategoryItem = (catId, itemIdx) => {
    const cat = data.categories.find((c) => c.id === catId);
    const next = cat.items.filter((_, i) => i !== itemIdx);
    updateCategory(catId, { items: next.length ? next : [{ name: "", desc: "" }] });
  };

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Service catalog"
        description="Homepage feature cards and the full sectioned services list on /services. Add as many as you need — both pages adapt to any count."
      />

      <div className="space-y-10">
        <Section
          title="Homepage service cards"
          blurb="Featured tiles in the 'Services' section of the homepage. Add any number — the grid auto-adapts (1, 2, 3, 4, or more)."
          action={
            <Button onClick={addCard}>
              <Plus className="w-4 h-4" />
              Add card
            </Button>
          }
        >
          {data.homepage.length === 0 && (
            <Card className="text-center text-[#6B7280] py-8">No cards yet.</Card>
          )}
          {data.homepage.map((item, idx) => {
            const isOpen = openCards.has(item.id);
            return (
              <Card key={item.id} className="p-0 overflow-hidden">
                <ItemHeader
                  summary={[item.title, item.from].filter(Boolean).join(" · ") || item.id}
                  canMoveUp={idx > 0}
                  canMoveDown={idx < data.homepage.length - 1}
                  onMoveUp={() => moveCard(item.id, -1)}
                  onMoveDown={() => moveCard(item.id, 1)}
                  onDelete={() => deleteCard(item.id)}
                  onToggle={() => toggleIn(setOpenCards)(item.id)}
                />
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-[#1F2937]">
                    <div className="grid sm:grid-cols-2 gap-4 pt-3">
                      <Field label="Title">
                        <TextInput
                          value={item.title}
                          onChange={(e) => updateCard(item.id, { title: e.target.value })}
                        />
                      </Field>
                      <Field label="Starting price" hint='Include the "$" prefix.'>
                        <TextInput
                          value={item.from}
                          onChange={(e) => updateCard(item.id, { from: e.target.value })}
                        />
                      </Field>
                      <Field label="Icon">
                        <Select
                          value={item.icon}
                          onChange={(e) => updateCard(item.id, { icon: e.target.value })}
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
                            onChange={(v) => updateCard(item.id, { popular: v })}
                            label={item.popular ? "Shown" : "Hidden"}
                          />
                        </div>
                      </Field>
                      <Field label="Description blurb" span={2}>
                        <TextArea
                          value={item.blurb}
                          onChange={(e) => updateCard(item.id, { blurb: e.target.value })}
                          rows={2}
                        />
                      </Field>
                      <Field label="Bullets" span={2}>
                        <div className="space-y-2">
                          {item.bullets.map((b, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <TextInput
                                value={b}
                                onChange={(e) => {
                                  const next = item.bullets.slice();
                                  next[i] = e.target.value;
                                  updateCard(item.id, { bullets: next });
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const next = item.bullets.filter((_, j) => j !== i);
                                  updateCard(item.id, { bullets: next.length ? next : [""] });
                                }}
                                className="p-2 rounded-lg text-[#6B7280] hover:text-red-400 hover:bg-red-500/10"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                          <Button
                            variant="ghost"
                            onClick={() => updateCard(item.id, { bullets: [...item.bullets, ""] })}
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Add bullet
                          </Button>
                        </div>
                      </Field>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </Section>

        <Section
          title="Full services page sections"
          blurb="The sectioned list shown on /services. Each section has a heading and any number of items."
          action={
            <Button onClick={addCategory}>
              <Plus className="w-4 h-4" />
              Add section
            </Button>
          }
        >
          {data.categories.length === 0 && (
            <Card className="text-center text-[#6B7280] py-8">No sections yet.</Card>
          )}
          {data.categories.map((cat, idx) => {
            const isOpen = openCats.has(cat.id);
            return (
              <Card key={cat.id} className="p-0 overflow-hidden">
                <ItemHeader
                  summary={`${cat.title || "Untitled section"}  ·  ${cat.items.length} item${cat.items.length === 1 ? "" : "s"}`}
                  canMoveUp={idx > 0}
                  canMoveDown={idx < data.categories.length - 1}
                  onMoveUp={() => moveCategory(cat.id, -1)}
                  onMoveDown={() => moveCategory(cat.id, 1)}
                  onDelete={() => deleteCategory(cat.id)}
                  onToggle={() => toggleIn(setOpenCats)(cat.id)}
                />
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-[#1F2937] space-y-4">
                    <Field label="Section title">
                      <TextInput
                        value={cat.title}
                        onChange={(e) => updateCategory(cat.id, { title: e.target.value })}
                        placeholder="Lakefront & Aquatic Services"
                      />
                    </Field>
                    <div className="space-y-3">
                      <div className="text-[12px] tracking-eyebrow uppercase font-semibold text-[#9CA3AF]">
                        Items
                      </div>
                      {cat.items.map((it, i) => (
                        <div
                          key={i}
                          className="rounded-xl border border-[#1F2937] bg-[#0B132B] p-3 space-y-2"
                        >
                          <div className="flex items-center gap-2">
                            <TextInput
                              value={it.name}
                              onChange={(e) =>
                                updateCategoryItem(cat.id, i, { name: e.target.value })
                              }
                              placeholder="Service name"
                            />
                            <button
                              type="button"
                              onClick={() => removeCategoryItem(cat.id, i)}
                              className="p-2 rounded-lg text-[#6B7280] hover:text-red-400 hover:bg-red-500/10"
                              title="Remove"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <TextArea
                            value={it.desc}
                            onChange={(e) =>
                              updateCategoryItem(cat.id, i, { desc: e.target.value })
                            }
                            rows={2}
                            placeholder="Short description"
                          />
                        </div>
                      ))}
                      <Button variant="ghost" onClick={() => addCategoryItem(cat.id)}>
                        <Plus className="w-3.5 h-3.5" />
                        Add item
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </Section>
      </div>

      <SaveBar dirty={dirty} saving={saving} onSave={save} onReset={reset} />
      <Toast message={toast?.message} type={toast?.type} onDismiss={() => setToast(null)} />
    </>
  );
}
