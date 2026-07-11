"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

const PAGE_WIDTH = 794;
const PAGE_HEIGHT = 1123;
const MIN_ZOOM = 40;
const MAX_ZOOM = 150;
const STEP = 10;

export function ResumePreviewScaler({ children }: { children: React.ReactNode }) {
  const [zoom, setZoom] = useState(65);

  const zoomIn = () => setZoom((z) => Math.min(z + STEP, MAX_ZOOM));
  const zoomOut = () => setZoom((z) => Math.max(z - STEP, MIN_ZOOM));

  const scale = zoom / 100;

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-center gap-2 border-b bg-muted/30 px-4 py-2">
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={zoomOut} disabled={zoom <= MIN_ZOOM}>
          <Minus className="h-3.5 w-3.5" />
        </Button>
        <span className="w-12 text-center text-xs text-muted-foreground">{zoom}%</span>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={zoomIn} disabled={zoom >= MAX_ZOOM}>
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Scrollable canvas */}
      <div className="no-scrollbar flex-1 overflow-auto bg-muted/10 p-8">
        <div className="flex justify-center">
          <div style={{ width: PAGE_WIDTH * scale, height: PAGE_HEIGHT * scale }}>
            <div
              style={{
                width: PAGE_WIDTH,
                height: PAGE_HEIGHT,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}