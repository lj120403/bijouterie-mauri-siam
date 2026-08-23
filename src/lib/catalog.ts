export type StockItem = {
  id: string;
  sku: string;
  category: string;
  stone_type: string | null;
  shape: string | null;
  cut: string | null;
  carat: number | null;
  dimensions_mm: string | null;
  colour: string | null;
  clarity: string | null;
  treatment: string | null;
  origin: string | null;
  cert_lab: string | null;
  cert_number: string | null;
  metal: string | null;
  ring_size: string | null;
  weight_g: number | null;
  style: string | null;
  image_url: string | null;
  quantity: number;
  available: boolean;
  location: string | null;
  notes: string | null;
};

export const CATEGORIES = [
  { value: "loose_gem", label: "Loose gemstones" },
  { value: "diamond", label: "Diamonds" },
  { value: "silver", label: "Silver jewellery" },
  { value: "gold", label: "Gold jewellery" },
] as const;

export const CSV_COLUMNS = [
  "sku",
  "category",
  "stone_type",
  "shape",
  "cut",
  "carat",
  "dimensions_mm",
  "colour",
  "clarity",
  "treatment",
  "origin",
  "cert_lab",
  "cert_number",
  "metal",
  "ring_size",
  "weight_g",
  "style",
  "image_url",
  "quantity",
  "available",
  "location",
  "notes",
] as const;

export const CSV_TEMPLATE =
  CSV_COLUMNS.join(",") +
  "\n" +
  "TZ-001,loose_gem,Tanzanite,Oval,Brilliant,2.05,9.1x7.0x5.2,Vivid Blue-Violet,VS,Heated,Tanzania,,,,,,,,1,true,Port Louis,In vault\n" +
  "DIA-118,diamond,Diamond,Round,Brilliant,1.02,6.45x6.48x3.98,F,VS1,Natural,,GIA,2196745821,,,,,,1,true,Port Louis,Certified\n" +
  "GR-540,gold,,,,,,,,,,,,18k Yellow Gold,54,3.8,Solitaire mount,,1,true,Port Louis,Ready to set\n";

/** Minimal RFC4180-ish CSV parser (handles quotes, commas and newlines in fields). */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  const src = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  for (let i = 0; i < src.length; i++) {
    const char = src[i];
    if (inQuotes) {
      if (char === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }
    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

const NUMERIC = new Set(["carat", "weight_g"]);

export type ParsedRow = Record<string, string | number | boolean | null>;

export function csvToRows(text: string): { rows: ParsedRow[]; errors: string[] } {
  const table = parseCsv(text);
  const errors: string[] = [];
  if (table.length < 2) return { rows: [], errors: ["The file has no data rows."] };

  const header = table[0].map((h) => h.trim().toLowerCase().replace(/\s+/g, "_"));
  if (!header.includes("sku")) {
    return { rows: [], errors: ['The file must contain a "sku" column.'] };
  }
  const unknown = header.filter((h) => !(CSV_COLUMNS as readonly string[]).includes(h));
  if (unknown.length) errors.push(`Ignored unknown columns: ${unknown.join(", ")}`);

  const rows: ParsedRow[] = [];
  for (let r = 1; r < table.length; r++) {
    const raw = table[r];
    const item: ParsedRow = {};
    header.forEach((key, idx) => {
      if (!(CSV_COLUMNS as readonly string[]).includes(key)) return;
      const value = (raw[idx] ?? "").trim();
      if (value === "") {
        item[key] = null;
        return;
      }
      if (NUMERIC.has(key)) {
        const num = Number(value);
        item[key] = Number.isFinite(num) ? num : null;
      } else if (key === "quantity") {
        const num = parseInt(value, 10);
        item[key] = Number.isFinite(num) ? num : 1;
      } else if (key === "available") {
        item[key] = !/^(false|no|0|sold)$/i.test(value);
      } else {
        item[key] = value;
      }
    });
    if (!item.sku) {
      errors.push(`Row ${r + 1}: missing SKU — skipped.`);
      continue;
    }
    if (!item.category) item.category = "loose_gem";
    if (item.quantity == null) item.quantity = 1;
    if (item.available == null) item.available = true;
    rows.push(item);
  }
  return { rows, errors };
}

export function waLink(message: string) {
  return `https://wa.me/23057535035?text=${encodeURIComponent(message)}`;
}

export function itemEnquiryLink(item: StockItem) {
  const bits = [item.stone_type, item.carat ? `${item.carat}ct` : null, item.shape, item.style]
    .filter(Boolean)
    .join(" ");
  return waLink(
    `Hello Bijouterie Mauri-Siam, I would like to reserve ${bits || "this piece"} (Ref ${item.sku}) from your on-demand catalogue. Can you deliver it to my shop today?`,
  );
}

export function itemTitle(item: StockItem) {
  if (item.category === "silver" || item.category === "gold") {
    return [item.metal, item.style].filter(Boolean).join(" · ") || item.sku;
  }
  return (
    [item.carat ? `${item.carat} ct` : null, item.shape, item.stone_type]
      .filter(Boolean)
      .join(" ") || item.sku
  );
}
