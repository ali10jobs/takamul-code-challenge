"use client";

import { useT } from "@/lib/useIsHydrated";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import SocialIcon from "@/components/atoms/SocialIcon";
import Divider from "@/components/atoms/Divider";
import { footerLinks } from "@/data/navigation";
import { subscribeEmail } from "@/lib/strapi";

export default function Footer() {
  const t = useT();
  const [status, setStatus] = useState<"idle" | "success" | "error" | "duplicate">("idle");

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t("footer.invalidEmail"))
        .required(t("footer.invalidEmail")),
    }),
    onSubmit: async (values, { resetForm }) => {
      setStatus("idle");
      const result = await subscribeEmail(values.email);
      if (result.success) {
        setStatus("success");
        resetForm();
        setTimeout(() => setStatus("idle"), 3000);
      } else if (result.error === "duplicate") {
        setStatus("duplicate");
      } else {
        setStatus("error");
      }
    },
  });

  return (
    <footer className="bg-primary">
      {/* Subscription Row */}
      <div className="px-6 md:px-12 lg:px-16 py-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          {/* Formik Subscription Form */}
          <form
            onSubmit={formik.handleSubmit}
            className="flex items-center gap-2"
          >
            <Input
              variant="email"
              name="email"
              placeholder={t("footer.emailPlaceholder")}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-48 md:w-56"
            />
            <Button type="submit" variant="primary" className="text-xs">
              {t("footer.subscribe")}
            </Button>
          </form>

          {/* Contacts + Social */}
          <div className="flex items-center gap-4">
            <span className="text-white text-sm">{t("footer.contacts")}</span>
            <div className="flex items-center gap-3">
              <SocialIcon type="twitter" />
              <SocialIcon type="facebook" />
              <SocialIcon type="google" />
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-400 text-xs text-center mt-2">
            {formik.errors.email}
          </p>
        )}
        {status === "success" && (
          <p className="text-green-400 text-xs text-center mt-2">
            {t("footer.subscribeSuccess")}
          </p>
        )}
        {status === "duplicate" && (
          <p className="text-yellow-400 text-xs text-center mt-2">
            {t("footer.duplicateEmail")}
          </p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-xs text-center mt-2">
            {t("footer.subscribeError")}
          </p>
        )}
      </div>

      <Divider className="border-white/20 mx-6 md:mx-12 lg:mx-16" />

      {/* Bottom Links Row */}
      <div className="px-6 md:px-12 lg:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          {footerLinks.map((link) => (
            <span
              key={link.key}
              className="text-white/70 text-xs hover:text-white transition-colors cursor-default"
            >
              {t(`footer.${link.key}`)}
            </span>
          ))}
        </div>
        <p className="text-white/50 text-xs">{t("footer.copyright")}</p>
      </div>
    </footer>
  );
}
