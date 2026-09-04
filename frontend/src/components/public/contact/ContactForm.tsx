import { Loader2Icon, SendIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useContact } from "@/hooks/useContact";
import {
  type ContactFormValues,
  contactSchema,
} from "@/validations/contact.schema";
import { getErrorMessage } from "@/utils/error";

const ContactForm = () => {
  const contactMutation = useContact();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    contactMutation.mutate(data, {
      onSuccess: (response) => {
        reset();

        toast.success(
          response?.message || "Your message has been sent successfully."
        );
      },

      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  return (
    <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
      <CardHeader className="px-6 pt-6 sm:px-8 sm:pt-8">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ieit-blue">
          Send a Message
        </p>

        <CardTitle className="mt-1 text-2xl font-extrabold tracking-[-0.035em] text-slate-900">
          Let&apos;s talk.
        </CardTitle>

        <CardDescription className="max-w-lg text-sm leading-6 text-slate-500">
          Have a question about our courses, admissions, or branches? Send us a
          message and we&apos;ll get back to you.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6 pb-6 sm:px-8 sm:pb-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          {/* Name */}
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-xs font-semibold text-slate-700"
            >
              Full Name
            </Label>

            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              {...register("name")}
              className={
                errors.name ? "border-red-400 focus-visible:ring-red-400" : ""
              }
            />

            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-xs font-semibold text-slate-700"
            >
              Email Address
            </Label>

            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
              className={
                errors.email ? "border-red-400 focus-visible:ring-red-400" : ""
              }
            />

            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-xs font-semibold text-slate-700"
            >
              Phone Number
            </Label>

            <Input
              id="phone"
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              autoComplete="tel"
              aria-invalid={Boolean(errors.phone)}
              {...register("phone")}
              className={
                errors.phone ? "border-red-400 focus-visible:ring-red-400" : ""
              }
            />

            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone.message}</p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label
              htmlFor="message"
              className="text-xs font-semibold text-slate-700"
            >
              Message
            </Label>

            <Textarea
              id="message"
              rows={5}
              placeholder="Tell us how we can help..."
              aria-invalid={Boolean(errors.message)}
              {...register("message")}
              className={
                errors.message
                  ? "resize-none border-red-400 focus-visible:ring-red-400"
                  : "resize-none"
              }
            />

            {errors.message && (
              <p className="text-xs text-red-500">{errors.message.message}</p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={contactMutation.isPending}
            className="h-10 rounded-lg bg-ieit-blue px-5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-ieit-blue/90 hover:shadow-md"
          >
            {contactMutation.isPending ? (
              <>
                <Loader2Icon className="size-3.5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <SendIcon className="size-3.5" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
