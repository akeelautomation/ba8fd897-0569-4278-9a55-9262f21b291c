
import React from "react";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedProducts />
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">لماذا تختارنا؟</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              نحن نقدم أفضل المنتجات بأعلى جودة وأسعار مناسبة
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">جودة عالية</h3>
              <p className="text-muted-foreground">
                نختار بعناية أفضل المواد والخامات لتقديم منتجات تدوم لسنوات طويلة
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">توصيل سريع</h3>
              <p className="text-muted-foreground">
                نوصل منتجاتنا إلى باب منزلك في أسرع وقت ممكن وبخدمة ممتازة
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">ضمان الجودة</h3>
              <p className="text-muted-foreground">
                نقدم ضمان على جميع منتجاتنا لمدة عام كامل مع خدمة ما بعد البيع
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-sand-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">آراء عملائنا</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              اطلع على تجارب عملائنا السابقين مع منتجاتنا وخدماتنا
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-brown rounded-full text-white flex items-center justify-center font-bold text-xl">أ</div>
                <div className="mr-4">
                  <h4 className="font-semibold">أحمد محمد</h4>
                  <p className="text-sm text-muted-foreground">الجزائر العاصمة</p>
                </div>
              </div>
              <p className="italic">
                "جودة رائعة وخدمة ممتازة، أنا سعيد جداً بشراء غرفة النوم الكاملة من متجركم. التوصيل كان سريعاً والتركيب احترافي."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-brown rounded-full text-white flex items-center justify-center font-bold text-xl">س</div>
                <div className="mr-4">
                  <h4 className="font-semibold">سارة علي</h4>
                  <p className="text-sm text-muted-foreground">وهران</p>
                </div>
              </div>
              <p className="italic">
                "الأثاث الذي اشتريته من متجركم يضيف لمسة جمالية رائعة لمنزلي. الخامات ممتازة والألوان جميلة، وأسعاركم معقولة جداً مقارنة بالجودة."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-brown rounded-full text-white flex items-center justify-center font-bold text-xl">م</div>
                <div className="mr-4">
                  <h4 className="font-semibold">محمد عبد القادر</h4>
                  <p className="text-sm text-muted-foreground">قسنطينة</p>
                </div>
              </div>
              <p className="italic">
                "تعاملت مع المتجر لأكثر من مرة وفي كل مرة أكون راضياً عن الخدمة. أنصح به بشدة لمن يبحث عن أثاث عصري وجودة عالية."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
