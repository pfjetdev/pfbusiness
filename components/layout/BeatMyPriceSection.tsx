"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Trophy,
  Check,
  ArrowRight,
  Shield,
  Upload,
  Link,
  PenLine,
  X,
  ImageIcon,
  PlaneTakeoff,
  PlaneLanding,
  DollarSign,
  Mail,
} from "lucide-react";

import { AirportInput } from "@/components/booking/FlightSearchForm";
import { BoardingPassVisualization } from "@/components/ui/BoardingPassVisualization";
import { fadeInUpVariants, DURATION_FAST } from "@/lib/animations";

interface BeatPriceFormData {
  from: string;
  to: string;
  theirPrice: string;
  email: string;
  url: string;
}

const INITIAL_FORM_DATA: BeatPriceFormData = {
  from: "",
  to: "",
  theirPrice: "",
  email: "",
  url: "",
};

const TABS = [
  { id: "manual" as const, label: "Manual", icon: PenLine },
  { id: "upload" as const, label: "Screenshot", icon: Upload },
  { id: "url" as const, label: "URL", icon: Link },
];

type TabId = (typeof TABS)[number]["id"];

export function BeatMyPriceSection() {
  const [activeTab, setActiveTab] = useState<TabId>("manual");
  const [formData, setFormData] = useState<BeatPriceFormData>(INITIAL_FORM_DATA);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) {
      setUploadedFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith("image/")) {
        const file = items[i].getAsFile();
        if (file) {
          setUploadedFile(file);
          setActiveTab("upload");
        }
        break;
      }
    }
  };

  const updateField = (field: keyof BeatPriceFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="bg-pf-ivory py-20 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left - Form */}
            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-8 md:p-10 lg:p-12"
              onPaste={handlePaste}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-pf-red/10 px-4 py-1.5 text-sm font-medium text-pf-red mb-6">
                <Trophy className="w-4 h-4" />
                Price Match Guarantee
              </div>

              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-pf-navy mb-4">
                Beat My Price
              </h2>

              <p className="text-lg text-pf-navy-light mb-8 leading-relaxed">
                Found a lower price elsewhere? Send us the quote — we&apos;ll beat it or your next upgrade is free.
              </p>

              {/* Tabs */}
              <div className="flex justify-center gap-2 mb-6">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? "bg-pf-navy text-white shadow-sm"
                        : "bg-pf-pearl text-pf-navy hover:bg-pf-navy/10"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatePresence mode="wait" initial={false}>
                  {activeTab === "manual" && (
                    <motion.div
                      key="manual"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: DURATION_FAST / 2 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <div className={`relative rounded-xl transition-all bg-pf-pearl ${fromOpen ? "ring-2 ring-pf-red/30" : ""}`}>
                          <AirportInput
                            value={formData.from}
                            onChange={(value) => updateField("from", value)}
                            placeholder="From"
                            icon={<PlaneTakeoff className="w-4 h-4" />}
                            onOpenChange={setFromOpen}
                          />
                        </div>
                        <div className={`relative rounded-xl transition-all bg-pf-pearl ${toOpen ? "ring-2 ring-pf-red/30" : ""}`}>
                          <AirportInput
                            value={formData.to}
                            onChange={(value) => updateField("to", value)}
                            placeholder="To"
                            icon={<PlaneLanding className="w-4 h-4" />}
                            onOpenChange={setToOpen}
                          />
                        </div>
                      </div>

                      <div className="relative flex items-center bg-pf-pearl rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-pf-red/30 transition-all">
                        <DollarSign className="w-4 h-4 text-pf-red shrink-0 mr-3" />
                        <input
                          type="text"
                          placeholder="Their Price (e.g. 4,500)"
                          value={formData.theirPrice}
                          onChange={(e) => updateField("theirPrice", e.target.value)}
                          className="w-full bg-transparent text-base font-semibold text-pf-navy outline-none placeholder:text-pf-navy-light placeholder:font-normal"
                        />
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "upload" && (
                    <motion.div
                      key="upload"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: DURATION_FAST / 2 }}
                    >
                      <div
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                          isDragging
                            ? "border-pf-red bg-pf-red/5"
                            : uploadedFile
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-pf-navy/20 bg-pf-pearl hover:border-pf-navy/40"
                        }`}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />

                        {uploadedFile ? (
                          <div className="space-y-2">
                            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                              <ImageIcon className="w-6 h-6 text-emerald-600" />
                            </div>
                            <p className="text-sm font-semibold text-pf-navy">{uploadedFile.name}</p>
                            <p className="text-xs text-pf-navy-light">
                              {(uploadedFile.size / 1024).toFixed(1)} KB
                            </p>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setUploadedFile(null); }}
                              className="inline-flex items-center gap-1 text-xs text-pf-red font-medium hover:underline"
                            >
                              <X className="w-3 h-3" />
                              Remove
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto shadow-sm">
                              <Upload className="w-6 h-6 text-pf-red" />
                            </div>
                            <p className="text-sm font-semibold text-pf-navy">
                              Drop your screenshot here
                            </p>
                            <p className="text-xs text-pf-navy-light">
                              or click to browse · Cmd+V to paste
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "url" && (
                    <motion.div
                      key="url"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: DURATION_FAST / 2 }}
                      className="space-y-3"
                    >
                      <div className="relative flex items-center bg-pf-pearl rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-pf-red/30 transition-all">
                        <Link className="w-4 h-4 text-pf-red shrink-0 mr-3" />
                        <input
                          type="url"
                          placeholder="https://example.com/booking/..."
                          value={formData.url}
                          onChange={(e) => updateField("url", e.target.value)}
                          className="w-full bg-transparent text-base font-semibold text-pf-navy outline-none placeholder:text-pf-navy-light placeholder:font-normal"
                        />
                      </div>
                      <p className="text-xs text-pf-navy-light px-1">
                        Paste the link to the flight offer you found
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Email */}
                <div className="relative flex items-center bg-pf-pearl rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-pf-red/30 transition-all">
                  <Mail className="w-4 h-4 text-pf-red shrink-0 mr-3" />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full bg-transparent text-base font-semibold text-pf-navy outline-none placeholder:text-pf-navy-light placeholder:font-normal"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-base font-semibold transition-all bg-pf-red text-white hover:bg-pf-red-dark h-12 px-8 w-full mt-2 shadow-lg shadow-pf-red/20 hover:shadow-xl hover:shadow-pf-red/30"
                >
                  Challenge Us
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-pf-navy-light">
                  <Shield className="w-4 h-4 text-pf-red" />
                  <span>Price Guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-pf-navy-light">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>2hr Response</span>
                </div>
              </div>
            </motion.div>

            {/* Right - Visualization */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden lg:flex flex-col justify-center items-center p-8 md:p-10 lg:p-12 bg-pf-navy"
            >
              <BoardingPassVisualization />
            </motion.div>
          </div>
        </div>

        {/* Stats Bar */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8 bg-pf-navy rounded-2xl"
        >
          <div className="grid grid-cols-3 divide-x divide-white/10">
            {[
              { label: "Beat Rate", value: "97%" },
              { label: "Quotes Beaten", value: "3,778" },
              { label: "Avg. Saved", value: "$1,400" },
            ].map((stat) => (
              <div key={stat.label} className="px-6 py-6 text-center">
                <p className="text-xs text-white/50 uppercase tracking-wider mb-2">{stat.label}</p>
                <p className="text-3xl md:text-4xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
