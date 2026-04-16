import { getServiceBySlug, getServices } from "@/lib/strapi";
import { notFound } from "next/navigation";
import ServiceDetailClient from "./ServiceDetailClient";

interface PageProps {
  params: Promise<{ serviceId: string }>;
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({
    serviceId: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { serviceId } = await params;
  const service = await getServiceBySlug(serviceId);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} />;
}
