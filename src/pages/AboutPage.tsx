
import React from "react";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">عن متجرنا</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <p className="mb-4 text-lg">
            مرحباً بكم في متجر "مفروشات الأصالة"، وجهتكم المثالية للحصول على أفضل المفروشات المنزلية في الجزائر. نحن نفتخر بتقديم منتجات عالية الجودة تجمع بين الأناقة والراحة والمتانة.
          </p>
          
          <p className="mb-4">
            تأسس متجرنا منذ عام 2010 بهدف توفير مفروشات عصرية تلبي احتياجات العائلات الجزائرية، ومنذ ذلك الحين ونحن نعمل على توسيع تشكيلتنا وتحسين خدماتنا لنقدم لكم تجربة تسوق مميزة.
          </p>
          
          <p className="mb-4">
            ما يميز "مفروشات الأصالة" هو الالتزام بالجودة في كل التفاصيل، بدءاً من اختيار المواد الأولية وحتى خدمة ما بعد البيع. نحرص على اختيار أفضل الخامات ونتعاون مع حرفيين مهرة لتقديم منتجات تدوم لسنوات طويلة.
          </p>
          
          <p>
            نتعهد بتوفير منتجات تجمع بين الجمال والعملية وبأسعار مناسبة، مع توصيل سريع لمختلف مناطق الجزائر، وخدمة عملاء متميزة للإجابة على جميع استفساراتكم.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-brown">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">رؤيتنا</h3>
            <p className="text-muted-foreground">
              نسعى لأن نكون الخيار الأول للأثاث المنزلي في الجزائر من خلال تقديم منتجات متميزة تجمع بين الجودة والأناقة والراحة.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-brown">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">مهمتنا</h3>
            <p className="text-muted-foreground">
              نهدف إلى توفير أثاث عالي الجودة بأسعار معقولة مع خدمة عملاء استثنائية لمساعدة عملائنا على إنشاء مساحات معيشة مريحة وجميلة.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-brown">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">قيمنا</h3>
            <p className="text-muted-foreground">
              نؤمن بالجودة والنزاهة والشفافية في كل ما نقدمه، مع التركيز على رضا العملاء والالتزام بتقديم منتجات تفوق توقعاتهم.
            </p>
          </div>
        </div>
        
        <div className="bg-brown/10 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-center">اتصل بنا</h2>
          <div className="text-center">
            <p className="mb-2">لأي استفسارات أو مساعدة، لا تتردد في التواصل معنا:</p>
            <p className="mb-2">الهاتف: 0555 123 456</p>
            <p className="mb-2">البريد الإلكتروني: info@mafroshatalasal.com</p>
            <p className="mb-2">العنوان: شارع الاستقلال، الجزائر العاصمة</p>
            <p>ساعات العمل: من السبت إلى الخميس، 9:00 صباحاً - 8:00 مساءً</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
