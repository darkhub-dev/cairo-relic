import Image from "next/image"
import {
  ArrowLeft,
  CalendarDays,
  Landmark,
  MapPin,
  Ticket,
} from "lucide-react"
import { TicketBookingForm } from "@/components/ticket-booking-form"

const visitNotes = [
  {
    icon: MapPin,
    title: "موقع استثنائي",
    description: "في الجيزة، بالقرب من هضبة الأهرامات.",
  },
  {
    icon: Ticket,
    title: "اختيارات مرنة",
    description: "حدّد فئة الزائر وعدد التذاكر المناسب لمجموعتك.",
  },
  {
    icon: CalendarDays,
    title: "خطّط لزيارتك",
    description: "راجع موعدك والتعليمات الرسمية قبل الوصول.",
  },
]

export function MuseumTicketBooking() {
  return (
    <div className="museum-site" dir="rtl" id="top">
      <div className="announcement-bar">
        <div className="announcement-inner">
          <span>واجهة تجريبية غير رسمية — بيانات الزيارة والأسعار للعرض فقط</span>
          <span className="announcement-location" dir="ltr">
            GIZA · EGYPT
          </span>
        </div>
      </div>

      <header className="site-header">
        <div className="site-header-inner">
          <a className="site-brand" href="#top" aria-label="العودة إلى بداية الصفحة">
            <span className="brand-mark" aria-hidden="true">
              <Landmark />
            </span>
            <span className="brand-copy">
              <strong>المتحف المصري الكبير</strong>
              <span>رحلة عبر ذاكرة الحضارة</span>
            </span>
          </a>

          <nav className="site-nav" aria-label="التنقل الرئيسي">
            <a href="#story">عن التجربة</a>
            <a href="#booking">التذاكر</a>
            <a href="#visit">معلومات الزيارة</a>
          </nav>

          <a className="header-booking-link" href="#booking">
            <span>ابدأ الحجز</span>
            <ArrowLeft aria-hidden="true" />
          </a>
        </div>
      </header>

      <main>
        <section className="hero-section" id="story" aria-labelledby="hero-title">
          <Image
            src="/museum-hero.png"
            alt=""
            fill
            priority
            sizes="(max-width: 900px) 100vw, 1180px"
            className="hero-image"
          />
          <div className="hero-overlay" aria-hidden="true" />
          <div className="hero-content">
            <p className="hero-eyebrow">
              <span className="eyebrow-rule" aria-hidden="true" />
              تجربة ثقافية في قلب الجيزة
            </p>
            <h1 id="hero-title">
              تذكرةٌ إلى
              <span>حكاية مصر.</span>
            </h1>
            <p className="hero-description">
              اكتشف المتحف المصري الكبير، حيث تلتقي روائع الماضي برؤية معمارية
              تحتفي بالمستقبل.
            </p>
            <div className="hero-actions">
              <a className="hero-primary-link" href="#booking">
                احجز زيارتك
                <ArrowLeft aria-hidden="true" />
              </a>
              <p className="hero-location">
                <MapPin aria-hidden="true" />
                الجيزة، مصر
              </p>
            </div>
          </div>
          <span className="hero-index" aria-hidden="true">
            01 <span /> 03
          </span>
          <span className="hero-caption">GRAND EGYPTIAN MUSEUM</span>
        </section>

        <section
          className="booking-section"
          id="booking"
          aria-labelledby="booking-heading"
        >
          <div className="section-intro">
            <div>
              <p className="section-kicker">
                <span>01</span> احجز زيارتك
              </p>
              <h2 id="booking-heading">
                رحلتك إلى قلب الحضارة
                <br />
                تبدأ من هنا.
              </h2>
            </div>
            <p className="section-intro-copy">
              اختر اليوم والموعد وعدد التذاكر، ثم راجع ملخص زيارتك في خطوة واحدة.
            </p>
          </div>

          <TicketBookingForm />
        </section>

        <section className="visit-section" id="visit" aria-labelledby="visit-heading">
          <div className="visit-inner">
            <div className="visit-heading-row">
              <div>
                <p className="section-kicker section-kicker-light">
                  <span>02</span> قبل الزيارة
                </p>
                <h2 id="visit-heading">تفاصيل صغيرة، لزيارة أجمل.</h2>
              </div>
              <p>
                هذه الصفحة نموذج تصميمي؛ تحقّق من القنوات الرسمية للمتحف لمعرفة
                الأسعار والمواعيد الفعلية.
              </p>
            </div>

            <div className="visit-notes-grid">
              {visitNotes.map((note) => {
                const Icon = note.icon

                return (
                  <article className="visit-note-card" key={note.title}>
                    <span className="visit-note-icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <div>
                      <h3>{note.title}</h3>
                      <p>{note.description}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <a className="footer-brand" href="#top">
            <Landmark aria-hidden="true" />
            المتحف المصري الكبير
          </a>
          <p>نموذج واجهة توضيحي غير رسمي — لا يصدر تذاكر فعلية.</p>
          <a className="footer-top-link" href="#top">
            العودة للأعلى <ArrowLeft aria-hidden="true" />
          </a>
        </div>
      </footer>
    </div>
  )
}
