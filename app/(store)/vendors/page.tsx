import type { Metadata } from "next";
import VendorsClient from "./VendorsClient";

export const metadata: Metadata = {
  title: "All Vendors — Modest Kouture",
  description: "Browse 500+ independent fashion vendors on Modest Kouture",
};

export default function VendorsPage() {
  return <VendorsClient />;
}
