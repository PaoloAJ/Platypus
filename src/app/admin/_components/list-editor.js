"use client";

import { useCallback, useState } from "react";
import { ChevronUp, ChevronDown, Trash2, Plus, GripVertical } from "lucide-react";
import {
  Button,
  Card,
  PageHeader,
  SaveBar,
  Toast,
  useDirtyState,
} from "./ui";
import { deleteOrphanedImages } from "./image-cleanup";

export default function ListEditor({
  type,
  eyebrow,
  title,
  description,
  initial,
  makeBlank,
  renderItem,
  itemSummary,
}) {
  const { data, setData, saved, setSaved, dirty } = useDirtyState(initial);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [expanded, setExpanded] = useState(() => new Set(initial.map((i) => i.id)));

  const updateItem = useCallback(
    (id, patch) => {
      setData((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...patch } : item))
      );
    },
    [setData]
  );

  const moveItem = useCallback(
    (id, direction) => {
      setData((prev) => {
        const idx = prev.findIndex((i) => i.id === id);
        if (idx < 0) return prev;
        const target = idx + direction;
        if (target < 0 || target >= prev.length) return prev;
        const next = prev.slice();
        [next[idx], next[target]] = [next[target], next[idx]];
        return next;
      });
    },
    [setData]
  );

  const removeItem = useCallback(
    (id) => {
      if (!confirm("Delete this item? This can't be undone after you save.")) return;
      setData((prev) => prev.filter((i) => i.id !== id));
    },
    [setData]
  );

  const addItem = useCallback(() => {
    const blank = makeBlank();
    setData((prev) => [...prev, blank]);
    setExpanded((s) => new Set(s).add(blank.id));
  }, [makeBlank, setData]);

  const toggle = (id) =>
    setExpanded((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const reset = () => {
    setData(initial);
    setExpanded(new Set(initial.map((i) => i.id)));
  };

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/cms/${type}`, {
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
        eyebrow={eyebrow}
        title={title}
        description={description}
        action={
          <Button onClick={addItem}>
            <Plus className="w-4 h-4" />
            Add new
          </Button>
        }
      />

      <div className="space-y-3">
        {data.length === 0 && (
          <Card className="text-center text-[#6B7280] py-12">
            Nothing here yet. Click <span className="text-white">Add new</span> to create one.
          </Card>
        )}

        {data.map((item, idx) => {
          const isOpen = expanded.has(item.id);
          return (
            <Card key={item.id} className="p-0 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3">
                <GripVertical className="w-4 h-4 text-[#374151]" />
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="flex-1 text-left min-w-0"
                >
                  <div className="text-[14.5px] font-semibold truncate">
                    {itemSummary(item) || "Untitled"}
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(item.id, -1)}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg text-[#6B7280] hover:text-white hover:bg-[#0B132B] disabled:opacity-30"
                  title="Move up"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(item.id, 1)}
                  disabled={idx === data.length - 1}
                  className="p-1.5 rounded-lg text-[#6B7280] hover:text-white hover:bg-[#0B132B] disabled:opacity-30"
                  title="Move down"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="p-1.5 rounded-lg text-[#6B7280] hover:text-red-400 hover:bg-red-500/10"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-[#1F2937]">
                  {renderItem(item, (patch) => updateItem(item.id, patch))}
                </div>
              )}
            </Card>
          );
        })}
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
