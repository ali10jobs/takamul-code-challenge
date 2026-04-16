export interface ClientTestimonial {
  id: number;
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  quote: string;
  quoteAr: string;
  image: string;
}

export const clientTestimonials: ClientTestimonial[] = [
  {
    id: 1,
    name: "Mohammed Saif",
    nameAr: "محمد سيف",
    role: "CEO/Company",
    roleAr: "الرئيس التنفيذي/الشركة",
    quote:
      "\"With the help of the responsible staff of Al Safar and Partners I was able to get my work done without any hassle. The help I received helped me a great deal to overcome the issues that I faced. I was always updated about my case and my queries never went unanswered.\"",
    quoteAr:
      "\"بفضل مساعدة الموظفين المسؤولين في الصفار وشركاه تمكنت من إنجاز عملي دون أي متاعب. ساعدني الدعم الذي تلقيته كثيراً في التغلب على المشكلات التي واجهتها. كنت دائماً على اطلاع بآخر المستجدات في قضيتي ولم تبق أي من استفساراتي دون إجابة.\"",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Ahmed Al-Rashid",
    nameAr: "أحمد الراشد",
    role: "Managing Director",
    roleAr: "المدير العام",
    quote:
      "\"The legal team provided outstanding service and professional guidance throughout our corporate restructuring. Their attention to detail and dedication to our case was exceptional.\"",
    quoteAr:
      "\"قدم الفريق القانوني خدمة متميزة وتوجيهاً مهنياً طوال عملية إعادة هيكلة شركتنا. كان اهتمامهم بالتفاصيل وتفانيهم في قضيتنا استثنائياً.\"",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Sara Al-Mutairi",
    nameAr: "سارة المطيري",
    role: "Business Owner",
    roleAr: "صاحبة عمل",
    quote:
      "\"I highly recommend their services. They handled my case with utmost professionalism and delivered results beyond my expectations.\"",
    quoteAr:
      "\"أوصي بشدة بخدماتهم. تعاملوا مع قضيتي بأقصى درجات المهنية وحققوا نتائج تفوق توقعاتي.\"",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
  },
];
