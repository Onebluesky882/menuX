import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";

import { Paperclip, Send } from "lucide-react";
import { toast } from "sonner";

const feedbackSchema = z.object({
  name: z.string().min(2, "กรุณากรอกชื่อ-นามสกุล"),
  email: z.string().email("อีเมลไม่ถูกต้อง"),
  type: z.enum(["bug", "feature", "general"], {
    required_error: "กรุณาเลือกประเภท",
  }),
  message: z.string().min(5, "กรุณากรอกข้อความอย่างน้อย 5 ตัวอักษร"),
  file: z.any().optional(),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

const feedbackTypeLabels: Record<FeedbackFormValues["type"], string> = {
  bug: "รายงานบั๊ก",
  feature: "ขอฟีเจอร์",
  general: "ความคิดเห็นทั่วไป",
};

const FeedbackForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      email: "",
      type: undefined,
      message: "",
      file: undefined,
    },
  });

  const onSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast(<div> ขอบคุณสำหรับ Feedback</div>);
      form.reset();
      setFileName("");
    }, 1200);
  };

  return (
    <div className="max-w-xl mx-auto mt-9 bg-white/90 dark:bg-[#1A1F2C]/90 rounded-xl shadow-lg border border-[#e5defc] dark:border-[#403E43] p-6 md:p-8">
      <h2 className="text-2xl font-bold text-[#6E59A5] text-center mb-1">
        ฟอร์มติดต่อทีม Dev
      </h2>
      <p className="mb-6 text-center text-[#8E9196] text-sm">
        ส่ง Feedback เพื่อช่วยให้เราปรับปรุงและพัฒนาได้ดีขึ้น
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  ชื่อ-นามสกุล<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="กรอกชื่อ-นามสกุลของคุณ"
                    autoComplete="name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  อีเมล<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  ประเภท Feedback<span className="text-red-500">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="กรุณาเลือกประเภท" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="bug">รายงานบั๊ก</SelectItem>
                    <SelectItem value="feature">ขอฟีเจอร์</SelectItem>
                    <SelectItem value="general">ความคิดเห็นทั่วไป</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  ข้อความ<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="พิมพ์ข้อความของคุณ..."
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* แนบไฟล์ (optional) */}
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  แนบไฟล์{" "}
                  <span className="text-[#8E9196] text-xs">
                    (เช่น screenshot)
                  </span>
                </FormLabel>
                <FormControl>
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer w-fit bg-[#f5f3ff] dark:bg-[#1A1F2C] hover:bg-[#ede9fe] text-[#7E69AB] px-4 py-2 rounded-md shadow-sm border border-[#E5DEFF] dark:border-[#403E43] text-sm font-medium transition">
                      <Paperclip size={18} />
                      <span>{fileName ? fileName : "แนบไฟล์"}</span>
                      <Input
                        type="file"
                        className="hidden"
                        accept="image/*,application/pdf"
                        onChange={(e) => {
                          field.onChange(e.target.files?.[0]);
                          setFileName(e.target.files?.[0]?.name ?? "");
                        }}
                      />
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full flex gap-2 items-center justify-center"
          >
            {loading ? (
              <span>กำลังส่ง...</span>
            ) : (
              <>
                <Send size={16} /> ส่ง Feedback
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FeedbackForm;
