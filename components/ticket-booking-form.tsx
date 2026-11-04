"use client"

import { useState, type FormEvent } from "react"
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  Minus,
  Plus,
  Ticket,
  Users,
} from "lucide-react"

const ticketOptions = [
  {
    id: "adult",
    title: "زائر بالغ",
    description: "تذكرة زيارة فردية",
    price: 650,
  },
  {
    id: "student",
    title: "طالب",
    description: "تذكرة طالب — السعر توضيحي",
    price: 325,
  },
  {
    id: "child",
    title: "طفل",
    description: "تذكرة طفل — السعر توضيحي",
    price: 220,
  },
] as const

type TicketId = (typeof ticketOptions)[number]["id"]
type TicketCounts = Record<TicketId, number>

const timeOptions = [
  "09:00 صباحًا",
  "11:30 صباحًا",
  "01:00 مساءً",
  "03:30 مساءً",
]

const numberFormatter = new Intl.NumberFormat("ar-EG")

function formatPrice(amount: number) {
  return `${numberFormatter.format(amount)} ج.م`
}

function formatVisitDate(dateValue: string) {
  const date = new Date(`${dateValue}T12:00:00`)
  return new Intl.DateTimeFormat("ar-EG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
}

export function TicketBookingForm() {
  const [visitDate, setVisitDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [ticketCounts, setTicketCounts] = useState<TicketCounts>({
    adult: 1,
    student: 0,
    child: 0,
  })
  const [errorMessage, setErrorMessage] = useState("")
  const [hasReviewed, setHasReviewed] = useState(false)

  const visitorCount = ticketOptions.reduce(
    (total, ticket) => total + ticketCounts[ticket.id],
    0,
  )
  const totalPrice = ticketOptions.reduce(
    (total, ticket) => total + ticketCounts[ticket.id] * ticket.price,
    0,
  )

  function updateTicketCount(ticketId: TicketId, change: number) {
    setTicketCounts((currentCounts) => {
      const currentTotal = Object.values(currentCounts).reduce(
        (total, count) => total + count,
        0,
      )

      if (change > 0 && currentTotal >= 10) {
        return currentCounts
      }

      return {
        ...currentCounts,
        [ticketId]: Math.max(0, currentCounts[ticketId] + change),
      }
    })
    setErrorMessage("")
    setHasReviewed(false)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!visitDate) {
      setErrorMessage("اختر تاريخ الزيارة أولًا.")
      setHasReviewed(false)
      return
    }

    if (!selectedTime) {
      setErrorMessage("اختر الموعد المناسب لزيارتك.")
      setHasReviewed(false)
      return
    }

    if (visitorCount === 0) {
      setErrorMessage("أضف تذكرة واحدة على الأقل للمتابعة.")
      setHasReviewed(false)
      return
    }

    setErrorMessage("")
    setHasReviewed(true)
  }

  return (
    <form className="booking-layout" onSubmit={handleSubmit} noValidate>
      <section className="booking-card" aria-labelledby="booking-card-heading">
        <div className="booking-card-heading">
          <div>
            <p className="card-step-label">تفاصيل الزيارة</p>
            <h3 id="booking-card-heading">اختر موعدك وتذاكرك</h3>
          </div>
          <span className="booking-step-icon" aria-hidden="true">
            <Ticket />
          </span>
        </div>

        <div className="booking-fields-grid">
          <div className="form-field">
            <label htmlFor="visit-date">
              <CalendarDays aria-hidden="true" />
              تاريخ الزيارة
            </label>
            <input
              id="visit-date"
              name="visitDate"
              type="date"
              value={visitDate}
              onChange={(event) => {
                setVisitDate(event.target.value)
                setErrorMessage("")
                setHasReviewed(false)
              }}
              aria-invalid={Boolean(errorMessage && !visitDate)}
              aria-describedby="date-help"
            />
            <span className="field-help" id="date-help">
              اختر اليوم الذي يناسبك
            </span>
          </div>

          <fieldset className="form-field time-fieldset">
            <legend>
              <Clock3 aria-hidden="true" />
              موعد الزيارة
            </legend>
            <div className="time-options">
              {timeOptions.map((time) => (
                <button
                  className={`time-option${selectedTime === time ? " is-selected" : ""}`}
                  type="button"
                  key={time}
                  aria-pressed={selectedTime === time}
                  onClick={() => {
                    setSelectedTime(time)
                    setErrorMessage("")
                    setHasReviewed(false)
                  }}
                >
                  {time}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="ticket-section-heading">
          <div>
            <h4>عدد التذاكر</h4>
            <p>يمكنك اختيار حتى 10 تذاكر في هذا الملخص.</p>
          </div>
          <span className="ticket-count-badge">
            <Users aria-hidden="true" />
            {numberFormatter.format(visitorCount)} زائر
          </span>
        </div>

        <div className="ticket-options-list">
          {ticketOptions.map((ticket) => {
            const count = ticketCounts[ticket.id]

            return (
              <div className="ticket-option-row" key={ticket.id}>
                <div className="ticket-option-copy">
                  <strong>{ticket.title}</strong>
                  <span>{ticket.description}</span>
                </div>
                <div className="ticket-option-price">
                  <strong>{formatPrice(ticket.price)}</strong>
                  <span>للتذكرة</span>
                </div>
                <div className="quantity-control" aria-label={`عدد تذاكر ${ticket.title}`}>
                  <button
                    className="quantity-button"
                    type="button"
                    aria-label={`تقليل عدد تذاكر ${ticket.title}`}
                    disabled={count === 0}
                    onClick={() => updateTicketCount(ticket.id, -1)}
                  >
                    <Minus aria-hidden="true" />
                  </button>
                  <span aria-live="polite">{numberFormatter.format(count)}</span>
                  <button
                    className="quantity-button"
                    type="button"
                    aria-label={`زيادة عدد تذاكر ${ticket.title}`}
                    disabled={visitorCount >= 10}
                    onClick={() => updateTicketCount(ticket.id, 1)}
                  >
                    <Plus aria-hidden="true" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {errorMessage ? (
          <p className="booking-error" role="alert">
            {errorMessage}
          </p>
        ) : null}

        <p className="pricing-disclaimer" id="pricing-note">
          الأسعار والمواعيد المعروضة تجريبية للتصميم فقط، ولا تمثّل أسعارًا رسمية.
        </p>
      </section>

      <aside className="booking-summary" aria-labelledby="summary-heading">
        <div className="summary-card">
          <div className="summary-topline">
            <span>ملخص الزيارة</span>
            <span className="summary-dot" aria-hidden="true" />
          </div>
          <h3 id="summary-heading">تفاصيل رحلتك</h3>

          <div className="summary-visit-details">
            <div>
              <CalendarDays aria-hidden="true" />
              <span>{visitDate ? formatVisitDate(visitDate) : "لم يُحدد التاريخ بعد"}</span>
            </div>
            <div>
              <Clock3 aria-hidden="true" />
              <span>{selectedTime || "اختر موعد الزيارة"}</span>
            </div>
          </div>

          <div className="summary-divider" />

          <div className="summary-ticket-list" aria-live="polite">
            {ticketOptions.map((ticket) => {
              const count = ticketCounts[ticket.id]
              if (count === 0) return null

              return (
                <div className="summary-ticket-row" key={ticket.id}>
                  <span>
                    {ticket.title} × {numberFormatter.format(count)}
                  </span>
                  <span>{formatPrice(ticket.price * count)}</span>
                </div>
              )
            })}
          </div>

          <div className="summary-total-row">
            <div>
              <span>الإجمالي التقديري</span>
              <small>{numberFormatter.format(visitorCount)} تذكرة</small>
            </div>
            <strong aria-live="polite">{formatPrice(totalPrice)}</strong>
          </div>

          <button className="summary-submit-button" type="submit">
            مراجعة ملخص الزيارة
            <ArrowLeft aria-hidden="true" />
          </button>

          {hasReviewed ? (
            <div className="review-success" role="status" aria-live="polite">
              <span className="review-success-icon" aria-hidden="true">
                <Check />
              </span>
              <span>
                <strong>ملخص زيارتك جاهز</strong>
                <small>هذه معاينة فقط، ولم يتم إصدار تذكرة فعلية.</small>
              </span>
            </div>
          ) : null}

          <p className="summary-footnote">
            <span aria-hidden="true">*</span>
            نموذج توضيحي غير رسمي — لا يتم حفظ الحجز أو إصدار التذاكر.
          </p>
        </div>
      </aside>
    </form>
  )
}
