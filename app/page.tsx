"use client"

import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import ScrollProgress from "@/components/scroll-progress"
import BookingForm from "@/components/booking-form"
import { useEffect, useState } from "react"
import { Calculator, Star, ChevronLeft, ChevronRight, Check, X } from "lucide-react"
import { ImageGallery } from "@/components/image-gallery"

import { useLanguage } from "@/contexts/LanguageContext"
import { translations } from "@/lib/translations"

export default function Home() {
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false)
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false)
  const [selectedTariff, setSelectedTariff] = useState<string | null>(null)
  const [withMaterials, setWithMaterials] = useState(false) // Set default toggle to "Work without materials" (false)
  const [currentReview, setCurrentReview] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [currentWorkImage, setCurrentWorkImage] = useState(0)
  const [isWorkImageVisible, setIsWorkImageVisible] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [isQuizSubmitting, setIsQuizSubmitting] = useState(false)
  const [isQuizSuccess, setIsQuizSuccess] = useState(false)
  const [quizError, setQuizError] = useState("")
  const [quizAnswers, setQuizAnswers] = useState({
    propertyType: "",
    area: "",
    rooms: "",
    timeline: "",
    location: "",
    name: "",
    phone: "",
  })

  const [galleryOpen, setGalleryOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const workImages = [
    "https://alchinkaz.github.io/db-tr-remont/assets/our-works.jpg",
    "https://alchinkaz.github.io/db-tr-remont/assets/work-1.jpg",
    "https://alchinkaz.github.io/db-tr-remont/assets/work-2.jpg",
    "https://alchinkaz.github.io/db-tr-remont/assets/work-3.jpg",
    "https://alchinkaz.github.io/db-tr-remont/assets/work-4.jpg",
    "https://alchinkaz.github.io/db-tr-remont/assets/work-5.jpg",
  ]

  const openGallery = (index = 0) => {
    setCurrentImageIndex(index)
    setGalleryOpen(true)
  }

  const closeGallery = () => {
    setGalleryOpen(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % workImages.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + workImages.length) % workImages.length)
  }

  const tariffData = {
    STANDART: {
      name: "STANDART",
      image: "https://alchinkaz.github.io/db-tr-remont/assets/standart.png",
      guarantee: "1 год",
      priceWithMaterials: "130 000 ₸/м²",
      priceWithoutMaterials: "45 000 ₸/м²",
      description: {
        withMaterials: {
          price: "130 000 ₸/м²",
          included: [
            "Разработка рабочего проекта",
            "Выравнивание стен под маяк",
            "Возведение перегородок (ГКЛ, газоблок)",
            "Электромонтажные работы (черновая прокладка электричества, чистовая установка)",
            "Сантехнические работы (разводка мокрых точек, чистовая установка)",
            "Малярные работы (QI, покраска стен, поклейка обоев)",
            "Заливка пола (ламинат, линолеум)",
          ],
          notIncluded: [
            "Установка межкомнатных дверей",
            "Натяжной потолок",
            "Монтаж кондиционеров",
            "Доставка строительных материалов",
            "Вывоз мусора",
          ],
        },
        withoutMaterials: {
          price: "45 000 ₸/м²",
          included: [
            "Разработка рабочего проекта",
            "Выравнивание стен под маяк",
            "Возведение перегородок (ГКЛ, газоблок)",
            "Электромонтажные работы (черновая прокладка электричества, чистовая установка)",
            "Сантехнические работы (разводка мокрых точек, чистовая установка)",
            "Малярные работы (QI, покраска стен, поклейка обоев)",
            "Заливка пола (ламинат, линолеум)",
          ],
          notIncluded: [
            "Установка межкомнатных дверей",
            "Натяжной потолок",
            "Монтаж кондиционеров",
            "Доставка строительных материалов",
            "Вывоз мусора",
          ],
        },
      },
    },
    COMFORT: {
      name: "COMFORT",
      image: "https://alchinkaz.github.io/db-tr-remont/assets/comfort.jpg",
      guarantee: "2 года",
      priceWithMaterials: "160 000 ₸/м²",
      priceWithoutMaterials: "53 000 ₸/м²",
      description: {
        withMaterials: {
          price: "160 000 ₸/м²",
          included: [
            "Разработка рабочего проекта 3D визуализация",
            "Демонтажные работы",
            "Выравнивание стен под маяк",
            "Возведение перегородок (ГКЛ, газоблок и пазогребневый кирпич)",
            "Электромонтажные работы (черновая прокладка электричества, чистовая установка сборка современного модульного щитка)",
            "Сантехнические работы (разводка мокрых точек, чистовая установка, замена перенос радиаторов, сборка современного коллекторного узла, монтаж датчика протечек системы нептун)",
            "Малярные работы (Q2 покраска стен, поклейка обоев, декор штукатурка монтаж гипсовых панелей, монтаж декор элементов, декор панелей, молдинги, декоративные рейки)",
            "Заливка пола (ламинат, линолеум, кварцвинил, паркетная доска, SPC)",
            "Монтаж теневых плинтусов из полиуретан, микроплинтус",
            "Работы по керамика (запилы 45 градусов, изготовка душевых поддонов, изготовка и монтаж полок)",
            "Работа по потолку (ГКЛ, теневой потолок)",
            "Доставка материалов (сопровождение и помощь в закупке материалов)",
            "Вывоз мусора",
            "Сопровождение прораба",
            "Технадзор",
            "Сопровождение в закупке в чистовых материалов",
          ],
          notIncluded: ["Установка межкомнатных дверей", "Натяжной потолок", "Монтаж кондиционеров"],
        },
        withoutMaterials: {
          price: "53 000 ₸/м²",
          included: [
            "Разработка рабочего проекта 3D визуализация",
            "Демонтажные работы",
            "Выравнивание стен под маяк",
            "Возведение перегородок (ГКЛ, газоблок и пазогребневый кирпич)",
            "Электромонтажные работы (черновая прокладка электричества, чистовая установка сборка современного модульного щитка)",
            "Сантехнические работы (разводка мокрых точек, чистовая установка, замена перенос радиаторов, сборка современного коллекторного узла, монтаж датчика протечек системы нептун)",
            "Малярные работы (Q2 покраска стен, поклейка обоев, декор штукатурка монтаж гипсовых панелей, монтаж декор элементов, декор панелей, молдинги, декоративные рейки)",
            "Заливка пола (ламинат, линолеум, кварцвинил, паркетная доска, SPC)",
            "Монтаж теневых плинтусов из полиуретан, микроплинтус",
            "Работы по керамика (запилы 45 градусов, изготовка душевых поддонов, изготовка и монтаж полок)",
            "Работа по потолку (ГКЛ, теневой потолок)",
            "Доставка материалов (сопровождение и помощь в закупке материалов)",
            "Вывоз мусора",
            "Сопровождение прораба",
            "Технадзор",
            "Сопровождение в закупке в чистовых материалов",
          ],
          notIncluded: ["Установка межкомнатных дверей", "Натяжной потолок", "Монтаж кондиционеров"],
        },
      },
    },
    PREMIUM: {
      name: "PREMIUM",
      image: "https://alchinkaz.github.io/db-tr-remont/assets/premium.jpg",
      guarantee: "3 года",
      priceWithMaterials: "270 000 ₸/м²",
      priceWithoutMaterials: "85 000 ₸/м²",
      description: {
        withMaterials: {
          price: "270 000 ₸/м²",
          included: [
            "Разработка рабочего проекта 3D визуализация с разверткими и авторским надзором",
            "Демонтажные работы",
            "Выравнивание стен под маяк",
            "Возведение перегородок (ГКЛ, газоблок и пазогребневый кирпич любой сложности)",
            "Электромонтажные работы (черновая прокладка электричества, чистовая установка сборка современного модульного щитка, монтаж умный дом)",
            "Сантехнические работы (разводка мокрых точек, чистовая установка, замена перенос радиаторов, сборка совр коллекторного узла, монтаж датчика протечек системы нептун, монтаж умный дом)",
            "Малярные работы (Q3-Q4 покраска стен, оклейка обоев, декор штукатурка монтаж гипсовых панели, монтаж декор элементов, декор панелей, молдинги, декор рейки)",
            "Изготовка и монтаж гипсовых лепнин",
            "Заливка пола (ламинат, линолеум, кварцвинил, паркетная доска, SPC, паркет)",
            "Монтаж теневых плинтусов из полиуретан, микроплинтус",
            "Работы по керамике и мрамору (запилы 45 градусов, изготовка душевых поддонов, изготовка и монтаж полок)",
            "Латунные вставки и изготовка по металлу",
            "Работа по потолку (ГКЛ, теневой потолок потолки любой сложности)",
            "Доставка материалов (сопровождение и помощь в закупке материалов)",
            "Вывоз мусора",
            "Сопровождение прораба",
            "Технадзор",
            "Авторский надзор",
            "Сопровождение в закупке в чистовых материалов",
            "Монтаж межкомнатных дверей",
            "Монтаж натяжного потолка",
            "Установка кондиционера",
          ],
          notIncluded: [],
        },
        withoutMaterials: {
          price: "85 000 ₸/м²",
          included: [
            "Разработка рабочего проекта 3D визуализация с разверткими и авторским надзором",
            "Демонтажные работы",
            "Выравнивание стен под маяк",
            "Возведение перегородок (ГКЛ, газоблок и пазогребневый кирпич любой сложности)",
            "Электромонтажные работы (черновая прокладка электричества, чистовая установка сборка современного модульного щитка, монтаж умный дом)",
            "Сантехнические работы (разводка мокрых точек, чистовая установка, замена перенос радиаторов, сборка совр коллекторного узла, монтаж датчика протечек системы нептун, монтаж умный дом)",
            "Малярные работы (Q3-Q4 покраска стен, оклейка обоев, декор штукатурка монтаж гипсовых панели, монтаж декор элементов, декор панелей, молдинги, декор рейки)",
            "Изготовка и монтаж гипсовых лепнин",
            "Заливка пола (ламинат, линолеум, кварцвинил, паркетная доска, SPC, паркет)",
            "Монтаж теневых плинтусов из полиуретан, микроплинтус",
            "Работы по керамике и мрамору (запилы 45 градусов, изготовка душевых поддонов, изготовка и монтаж полок)",
            "Латунные вставки и изготовка по металлу",
            "Работа по потолку (ГКЛ, теневой потолок потолки любой сложности)",
            "Доставка материалов (сопровождение и помощь в закупке материалов)",
            "Вывоз мусора",
            "Сопровождение прораба",
            "Технадзор",
            "Авторский надзор",
            "Сопровождение в закупке в чистовых материалов",
            "Монтаж межкомнатных дверей",
            "Монтаж натяжного потолка",
            "Установка кондиционера",
          ],
          notIncluded: [],
        },
      },
    },
  }

  const formatPriceWithFrom = (price: string) => {
    if (language === "kz") {
      return `${price} ${t("pricing.from")}`
    } else {
      return `${t("pricing.from")} ${price}`
    }
  }

  const reviews = [
    {
      id: 1,
      name: "Карина",
      text: "Сроки не сорвали, по установке все ок — быстро, чисто, точно. Фирма не жадная, качество 🔥 Бывают скидки.",
      fullText:
        "Обращалась в несколько компаний в районе, но именно тут попался компетентный менеджер, который предложил наиболее адекватный вариант с точки зрения цена - качество, дал толковые рекомендации по фурнитуре и конструкции окна.",
      date: "17 декабря 2024",
      rating: 5,
      source: "Отзыв на 2ГИС",
    },
    {
      id: 2,
      name: "Марат",
      text: "Делали ремонт в двухкомнатной квартире. Работали аккуратно, убирали за собой каждый день. Результат превзошел ожидания!",
      fullText:
        "Команда профессионалов! Сделали капитальный ремонт за 2 месяца. Все работы выполнены качественно, материалы использовали хорошие. Особенно понравилось, что предоставили 3D проект бесплатно.",
      date: "12 декабря 2024",
      rating: 5,
      source: "Отзыв на 2ГИС",
    },
    {
      id: 3,
      name: "Кристина",
      text: "Отличная работа! Ванную комнату сделали за неделю, все четко по договору. Плитка положена идеально ровно.",
      fullText:
        "Искала мастеров для ремонта ванной долго, много где были завышенные цены. Здесь адекватная стоимость и качественная работа. Гарантию дали на 3 года, что очень радует.",
      date: "8 декабря 2024",
      rating: 5,
      source: "Отзыв на 2ГИС",
    },
    {
      id: 4,
      name: "Акылжан",
      text: "Косметический ремонт в офисе выполнили быстро и качественно. Работали даже в выходные, чтобы уложиться в сроки.",
      fullText:
        "Нужно было срочно привести офис в порядок к открытию. Ребята взялись за работу и сделали все за 10 дней. Покраска, новые полы, потолки - все на высшем уровне.",
      date: "5 декабря 2024",
      rating: 5,
      source: "Отзыв на 2ГИС",
    },
    {
      id: 5,
      name: "Максим",
      text: "Кухню делали под ключ - от демонтажа до установки мебели. Очень доволен результатом, все продумано до мелочей.",
      fullText:
        "Долго выбирал исполнителей для ремонта кухни. Остановилась на этой компании из-за адекватных цен и хороших отзывов. Не пожалел! Работа выполнена на отлично.",
      date: "1 декабря 2024",
      rating: 5,
      source: "Отзыв на 2ГИС",
    },
    {
      id: 6,
      name: "Куаныш",
      text: "Делали евроремонт в новостройке. Все этапы работ согласовывали, показывали промежуточные результаты. Рекомендую!",
      fullText:
        "Купили квартиру в новостройке и нужен был качественный ремонт. Команда работала профессионально, соблюдали все сроки. Особенно понравился индивидуальный подход к каждому этапу работ.",
      date: "28 ноября 2024",
      rating: 5,
      source: "Отзыв на 2ГИС",
    },
  ]

  const getQuizQuestions = () => [
    {
      id: 1,
      title: t("quiz.questions.1.title"),
      type: "image-select",
      options: [
        {
          value: "apartment",
          label: t("quiz.questions.1.options.apartment"),
          image: "https://alchinkaz.github.io/db-tr-remont/assets/flat.jpeg",
        },
        {
          value: "house",
          label: t("quiz.questions.1.options.house"),
          image: "https://alchinkaz.github.io/db-tr-remont/assets/house.jpg",
        },
        {
          value: "other",
          label: t("quiz.questions.1.options.other"),
          image: "https://alchinkaz.github.io/db-tr-remont/assets/over.png",
        },
      ],
    },
    {
      id: 2,
      title: t("quiz.questions.2.title"),
      type: "radio",
      options: [
        { value: "20-50", label: t("quiz.questions.2.options.20-50") },
        { value: "50-80", label: t("quiz.questions.2.options.50-80") },
        { value: "80-150", label: t("quiz.questions.2.options.80-150") },
        { value: "150+", label: t("quiz.questions.2.options.150+") },
      ],
    },
    {
      id: 3,
      title: t("quiz.questions.3.title"),
      type: "radio",
      options: [
        { value: "1", label: t("quiz.questions.3.options.1") },
        { value: "2", label: t("quiz.questions.3.options.2") },
        { value: "3", label: t("quiz.questions.3.options.3") },
        { value: "4+", label: t("quiz.questions.3.options.4+") },
      ],
    },
    {
      id: 4,
      title: t("quiz.questions.4.title"),
      type: "radio",
      options: [
        { value: "soon", label: t("quiz.questions.4.options.soon") },
        { value: "month", label: t("quiz.questions.4.options.month") },
        { value: "3months", label: t("quiz.questions.4.options.3months") },
        { value: "undefined", label: t("quiz.questions.4.options.undefined") },
      ],
    },
  ]

  const { language } = useLanguage()
  const t = (key: string) => {
    const keys = key.split(".")
    let value: any = translations[language]
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  const getTranslatedServices = (tariff: string, type: "included" | "notIncluded") => {
    const tariffKey = tariff.toLowerCase() as "standart" | "comfort" | "premium"
    const serviceKey =
      `${tariffKey}${type === "included" ? "Included" : "NotIncluded"}` as keyof typeof translations.ru.pricing.services
    return translations[language].pricing.services[serviceKey] || []
  }

  const getTranslatedGuarantee = (tariff: string) => {
    switch (tariff) {
      case "STANDART":
        return t("pricing.oneYear")
      case "COMFORT":
        return t("pricing.twoYears")
      case "PREMIUM":
        return t("pricing.threeYears")
      default:
        return ""
    }
  }

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
        e.preventDefault()
        const id = target.getAttribute("href")?.substring(1)
        const element = document.getElementById(id || "")
        if (element) {
          const navbarHeight = document.querySelector("header")?.clientHeight || 0
          const y = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight
          window.scrollTo({ top: y, behavior: "smooth" })
        }
      }
    }

    const reviewInterval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentReview((prev) => (prev + 1) % reviews.length)
        setIsVisible(true)
      }, 300)
    }, 4000)

    const workImageInterval = setInterval(() => {
      setIsWorkImageVisible(false)
      setTimeout(() => {
        setCurrentWorkImage((prev) => (prev + 1) % workImages.length)
        setIsWorkImageVisible(true)
      }, 300)
    }, 4000)

    document.addEventListener("click", handleAnchorClick)

    return () => {
      document.removeEventListener("click", handleAnchorClick)
      clearInterval(reviewInterval)
      clearInterval(workImageInterval)
    }
  }, [reviews.length, workImages.length])

  const openBookingForm = () => {
    setIsBookingFormOpen(true)
  }

  const closeBookingForm = () => {
    setIsBookingFormOpen(false)
  }

  const openPricingModal = (tariff: string) => {
    setSelectedTariff(tariff)
    setIsPricingModalOpen(true)
    setWithMaterials(false) // по умолчанию без материалов
  }

  const closePricingModal = () => {
    setIsPricingModalOpen(false)
    setSelectedTariff(null)
  }

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const isStepValid = (step: number) => {
    const fieldName = getFieldName(step)
    if (step <= 4) {
      return (
        quizAnswers[fieldName as keyof typeof quizAnswers] !== undefined &&
        quizAnswers[fieldName as keyof typeof quizAnswers] !== ""
      )
    } else if (step === 5) {
      return quizAnswers.name && quizAnswers.phone && quizAnswers.name.trim() !== "" && quizAnswers.phone.trim() !== ""
    }
    return true
  }

  const nextStep = () => {
    if (currentStep < 5 && isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1)
    } else if (currentStep === 5 && isStepValid(currentStep)) {
      // На последнем шаге можно отправить форму
      handleQuizSubmit()
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleQuizAnswer = (field: string, value: string) => {
    setQuizAnswers((prev) => ({ ...prev, [field]: value }))
    if (quizError) setQuizError("")
  }

  const handleQuizSubmit = async () => {
    setIsQuizSubmitting(true)
    setQuizError("")

    try {
      const response = await fetch("/api/send-telegram-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizAnswers),
      })

      if (response.ok) {
        setIsQuizSuccess(true)
      } else {
        const errorData = await response.json()
        setQuizError(errorData.error || "Произошла ошибка при отправке")
      }
    } catch (error) {
      setQuizError("Произошла ошибка при отправке")
    } finally {
      setIsQuizSubmitting(false)
    }
  }

  const resetQuiz = () => {
    setCurrentStep(1)
    setQuizAnswers({
      propertyType: "",
      area: "",
      rooms: "",
      timeline: "",
      location: "",
      name: "",
      phone: "",
    })
    setIsQuizSuccess(false)
    setQuizError("")
  }

  const handleQuizWhatsAppClick = () => {
    const propertyTypeLabels: { [key: string]: string } = {
      apartment: "Квартира",
      house: "Частный дом",
      other: "Другое",
    }

    const message = encodeURIComponent(
      `Здравствуйте! Я оставил данные на получение сметы на сайте TR Remont. Хотел бы получить подробную смету ремонта.`,
    )
    window.open(`https://wa.me/77053333082?text=${message}`, "_blank")
  }

  const getFieldName = (stepId: number) => {
    const fieldMap: { [key: number]: string } = {
      1: "propertyType",
      2: "area",
      3: "rooms",
      4: "timeline",
    }
    return fieldMap[stepId] || ""
  }

  const quizQuestions = getQuizQuestions()

  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <Navbar onBookingClick={openBookingForm} />

      {/* Hero Section */}
      <section
        className="pt-32 md:pt-36 pb-8 relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(https://alchinkaz.github.io/db-tr-remont/assets/bg-1.jpg)" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="backdrop-blur-sm rounded-2xl p-8 md:p-12 lg:p-16 shadow-2xl bg-[rgba(16,9,7,0.7739130414050558)]">
            <div className="text-center max-w-5xl mx-auto">
              <div className="inline-block backdrop-blur-sm rounded-full px-6 py-2 mb-6 text-sm font-medium text-gray-800 shadow-lg border border-white/20 bg-gray-50">
                {t("hero.experienceBadge")}
              </div>

              <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-rubik leading-tight md:leading-tight lg:leading-tight mb-6 md:mb-8 tracking-tight text-white">
                {t("hero.title")}
                <br />
                <span className="text-slate-100">{t("hero.priceFrom")}</span>
              </h1>

              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed font-inter">
                {t("hero.description")}
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
                <Button
                  onClick={openBookingForm}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 xl:px-8 2xl:px-10 h-12 text-sm md:text-base font-semibold rounded-xl w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  {t("hero.calculateButton")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Running Text Banner */}
      <section className="bg-red-600 py-4 overflow-hidden">
        <div className="flex whitespace-nowrap">
          <div className="flex animate-marquee-smooth">
            {/* Первый блок */}
            <div className="flex items-center">
              <span className="text-white text-lg md:text-xl font-semibold font-inter px-3">
                {t("banner.qualityMessage")}
              </span>
              <div className="w-2 h-2 bg-white rounded-full mx-2"></div>
            </div>
            {/* Дублируем для бесшовной анимации */}
            <div className="flex items-center">
              <span className="text-white text-lg md:text-xl font-semibold font-inter px-3">
                {t("banner.qualityMessage")}
              </span>
              <div className="w-2 h-2 bg-white rounded-full mx-2"></div>
            </div>
            <div className="flex items-center">
              <span className="text-white text-lg md:text-xl font-semibold font-inter px-3">
                {t("banner.qualityMessage")}
              </span>
              <div className="w-2 h-2 bg-white rounded-full mx-2"></div>
            </div>
            <div className="flex items-center">
              <span className="text-white text-lg md:text-xl font-semibold font-inter px-3">
                {t("banner.qualityMessage")}
              </span>
              <div className="w-2 h-2 bg-white rounded-full mx-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="prices" className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-rubik mb-4 text-gray-900">
              {t("pricing.title")}
            </h2>
            <p className="text-lg font-medium font-inter text-gray-500">{t("pricing.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {/* STANDART Renovation */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://alchinkaz.github.io/db-tr-remont/assets/standart.png"
                  alt="STANDART ремонт"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">STANDART</h3>
                  <div className="flex flex-col items-center">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium">
                      {t("pricing.oneYear")}
                    </span>
                    <p className="text-xs text-gray-500 mt-1 text-center">{t("pricing.guarantee")}</p>
                  </div>
                </div>
                <p className="text-xl font-semibold text-gray-900 mb-1">{formatPriceWithFrom("45 000 ₸/м²")}</p>
                <p className="text-sm text-gray-500 mb-4">{t("pricing.withoutMaterials")}</p>
                <Button
                  onClick={() => openPricingModal("STANDART")}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300 mt-auto"
                >
                  {t("pricing.detailsButton")}
                </Button>
              </div>
            </div>

            {/* COMFORT Renovation */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://alchinkaz.github.io/db-tr-remont/assets/comfort.jpg"
                  alt="COMFORT ремонт"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">COMFORT</h3>
                  <div className="flex flex-col items-center">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium">
                      {t("pricing.twoYears")}
                    </span>
                    <p className="text-xs text-gray-500 mt-1 text-center">{t("pricing.guarantee")}</p>
                  </div>
                </div>
                <p className="text-xl font-semibold text-gray-900 mb-1">{formatPriceWithFrom("53 000 ₸/м²")}</p>
                <p className="text-sm text-gray-500 mb-4">{t("pricing.withoutMaterials")}</p>
                <Button
                  onClick={() => openPricingModal("COMFORT")}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300 mt-auto"
                >
                  {t("pricing.detailsButton")}
                </Button>
              </div>
            </div>

            {/* PREMIUM Renovation */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://alchinkaz.github.io/db-tr-remont/assets/premium.jpg"
                  alt="PREMIUM ремонт"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">PREMIUM</h3>
                  <div className="flex flex-col items-center">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium">
                      {t("pricing.threeYears")}
                    </span>
                    <p className="text-xs text-gray-500 mt-1 text-center">{t("pricing.guarantee")}</p>
                  </div>
                </div>
                <p className="text-xl font-semibold text-gray-900 mb-1">{formatPriceWithFrom("85 000 ₸/м²")}</p>
                <p className="text-sm text-gray-500 mb-4">{t("pricing.withoutMaterials")}</p>
                <Button
                  onClick={() => openPricingModal("PREMIUM")}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300 mt-auto"
                >
                  {t("pricing.detailsButton")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Works Section */}
      <section id="works" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start mb-12">
            <div className="lg:col-span-3 mx-auto lg:mx-0">
              <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 text-center lg:text-left max-w-2xl">
                <span className="inline-block bg-red-600 text-white px-3 py-1 rounded-lg mr-2">
                  {t("works.experienceBadge")}
                </span>
                {t("works.title")}
              </h2>
            </div>

            {/* Statistics Block - same width as reviews block */}
            <div className="lg:col-span-2">
              {/* Изменил фон с серого на ярко красный и текст на белый */}
              <div className="bg-red-600 rounded-2xl p-6">
                <div className="grid grid-cols-2 gap-6 text-center relative">
                  <div className="flex flex-col items-center">
                    <div className="text-2xl md:text-3xl font-bold text-white mb-2">100+</div>
                    <p className="text-sm text-white leading-tight">{t("works.completedProjects")}</p>
                  </div>

                  {/* Vertical separator line */}
                  <div className="absolute left-1/2 top-2 bottom-2 w-px bg-white transform -translate-x-1/2"></div>

                  <div className="flex flex-col items-center">
                    <div className="text-2xl md:text-3xl font-bold text-white mb-2">20%</div>
                    <p className="text-sm text-white leading-tight">{t("works.averageSavings")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Photos Block - */}
            <div className="lg:col-span-3">
              <div
                className="bg-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity aspect-video lg:h-[400px] lg:aspect-auto flex items-center justify-center"
                onClick={() => openGallery(currentWorkImage)}
              >
                <img
                  src={workImages[currentWorkImage] || "/placeholder.svg"}
                  alt="Примеры наших работ - нажмите для просмотра галереи"
                  className="w-full h-full object-cover"
                  style={{ opacity: isWorkImageVisible ? 1 : 0, transition: "opacity 0.3s ease-in-out" }}
                />
              </div>
            </div>

            {/* Reviews Block - narrower */}
            <div id="reviews" className="lg:col-span-2">
              <div className="rounded-2xl p-6 h-[400px] flex flex-col bg-gray-100">
                <div className="flex-grow flex flex-col justify-between">
                  <div className="mb-10">
                    <p
                      className="text-lg text-gray-900 mb-4 leading-relaxed h-40"
                      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.3s ease-in-out" }}
                    >
                      "{reviews[currentReview].fullText}"
                    </p>
                  </div>

                  <div className="mt-10">
                    <p
                      className="font-semibold text-gray-900"
                      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.3s ease-in-out" }}
                    >
                      {reviews[currentReview].name}
                    </p>
                    <div
                      className="flex items-end justify-between"
                      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.3s ease-in-out" }}
                    >
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="ml-2 text-sm text-gray-500">{reviews[currentReview].date}</span>
                      </div>

                      <img
                        src="https://alchinkaz.github.io/db-tr-remont/assets/2gis.svg"
                        alt="2ГИС"
                        className="w-10 h-10 opacity-70"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Quiz Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">{t("cta.title")}</h2>
            <p className="text-lg text-gray-500 max-w-4xl mx-auto">{t("cta.subtitle")}</p>
          </div>

          {/* Quiz Container */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl overflow-hidden min-h-[500px] flex flex-col">
              {!isQuizSuccess ? (
                <>
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 h-2">
                    <div
                      className="bg-red-600 h-2 transition-all duration-300"
                      style={{ width: `${(currentStep / 5) * 100}%` }}
                    ></div>
                  </div>

                  <div className="p-8 flex-grow flex flex-col">
                    {currentStep <= 4 ? (
                      <>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                          {getQuizQuestions()[currentStep - 1]?.title || "Loading..."}
                        </h3>

                        <div className="flex-grow">
                          {getQuizQuestions()[currentStep - 1]?.type === "image-select" && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              {getQuizQuestions()[currentStep - 1]?.options?.map((option) => (
                                <div
                                  key={option.value}
                                  className={`cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ${
                                    quizAnswers[getFieldName(currentStep) as keyof typeof quizAnswers] === option.value
                                      ? "ring-4 ring-red-600 shadow-lg"
                                      : "hover:shadow-lg"
                                  }`}
                                  onClick={() => handleQuizAnswer(getFieldName(currentStep), option.value)}
                                >
                                  <div className="aspect-[4/3] overflow-hidden">
                                    <img
                                      src={option.image || "/placeholder.svg"}
                                      alt={option.label}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="p-4 bg-white">
                                    <p className="font-semibold text-gray-900">{option.label}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {getQuizQuestions()[currentStep - 1]?.type === "radio" && (
                            <div className="space-y-4">
                              {getQuizQuestions()[currentStep - 1]?.options?.map((option) => (
                                <label
                                  key={option.value}
                                  className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                                    quizAnswers[getFieldName(currentStep) as keyof typeof quizAnswers] === option.value
                                      ? "bg-red-50 border-2 border-red-600"
                                      : "bg-white border-2 border-gray-200 hover:border-gray-300"
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={`step-${currentStep}`}
                                    value={option.value}
                                    checked={
                                      quizAnswers[getFieldName(currentStep) as keyof typeof quizAnswers] ===
                                      option.value
                                    }
                                    onChange={(e) => handleQuizAnswer(getFieldName(currentStep), e.target.value)}
                                    className="w-5 h-5 text-red-600 mr-4"
                                  />
                                  <span className="text-gray-900 font-medium">{option.label}</span>
                                </label>
                              ))}
                            </div>
                          )}

                          {quizQuestions[currentStep - 1]?.type === "text" && (
                            <div>
                              <input
                                type="text"
                                placeholder={quizQuestions[currentStep - 1]?.placeholder || ""}
                                value={quizAnswers[getFieldName(currentStep) as keyof typeof quizAnswers] || ""}
                                onChange={(e) => handleQuizAnswer(getFieldName(currentStep), e.target.value)}
                                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none text-lg"
                              />
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">{t("quiz.lastStep")}</h3>
                        <div className="flex-grow space-y-6">
                          <input
                            type="text"
                            placeholder={t("quiz.namePlaceholder")}
                            value={quizAnswers.name}
                            onChange={(e) => handleQuizAnswer("name", e.target.value)}
                            className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none"
                          />
                          <input
                            type="tel"
                            placeholder={t("quiz.phonePlaceholder")}
                            value={quizAnswers.phone}
                            onChange={(e) => handleQuizAnswer("phone", e.target.value)}
                            className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none"
                          />
                        </div>
                        {quizError && (
                          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg mt-4">{quizError}</div>
                        )}
                      </>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between items-center mt-8">
                      <div className="text-gray-500">
                        {t("quiz.step")} {currentStep}/5
                      </div>
                      <div className="flex gap-4">
                        {currentStep > 1 && (
                          <Button
                            onClick={prevStep}
                            variant="outline"
                            className="px-6 py-3 border-2 border-gray-300 hover:border-gray-400 bg-transparent"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </Button>
                        )}
                        {currentStep < 5 ? (
                          <Button
                            onClick={nextStep}
                            disabled={!isStepValid(currentStep)}
                            className={`px-8 py-3 font-semibold transition-all ${
                              isStepValid(currentStep)
                                ? "bg-red-600 hover:bg-red-700 text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                          >
                            {t("quiz.nextButton")} <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        ) : (
                          <Button
                            onClick={handleQuizSubmit}
                            disabled={!isStepValid(currentStep) || isQuizSubmitting}
                            className={`px-8 py-3 font-semibold transition-all ${
                              isStepValid(currentStep) && !isQuizSubmitting
                                ? "bg-red-600 hover:bg-red-700 text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                          >
                            {isQuizSubmitting ? (
                              <div className="flex items-center justify-center">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                {t("quiz.submitting")}
                              </div>
                            ) : (
                              /* использование переведенного текста кнопки отправить */
                              t("quiz.submitButton")
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-8 flex-grow flex flex-col justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t("quiz.successTitle")}</h3>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">{t("quiz.successMessage")}</p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                      <Button
                        onClick={handleQuizWhatsAppClick}
                        className="flex-1 h-14 sm:h-12 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors text-base px-6"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path
                            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0
11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488z"
                          />
                        </svg>
                        {t("quiz.whatsappButton")}
                      </Button>

                      <Button
                        onClick={resetQuiz}
                        variant="outline"
                        className="flex-1 h-14 sm:h-12 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-xl bg-transparent text-base px-6"
                      >
                        {t("quiz.resetButton")}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Contacts Block - narrower, order-2 на мобильных */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col h-[360px]">
                {/* Large Logo - moved to top left */}
                <div className="flex justify-start">
                  <img
                    src="https://alchinkaz.github.io/db-tr-remont/assets/tr-remont-logo.svg"
                    alt="Orda Premium Burabay"
                    className="h-16 w-auto object-contain"
                    style={{ maxWidth: "300px" }}
                  />
                </div>

                <div className="h-8"></div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <a
                        href="tel:+77053333082"
                        className="text-lg font-semibold text-gray-900 hover:text-red-600 transition-colors"
                      >
                        +7 (705) 333-30-82
                      </a>
                      <span className="text-sm text-gray-500">{t("contacts.mobilePhone")}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <a
                        href="mailto:info@tr-remont.kz"
                        className="text-lg font-semibold text-gray-900 hover:text-red-600 transition-colors"
                      >
                        info@tr-remont.kz
                      </a>
                      <span className="text-sm text-gray-500">{t("contacts.mainEmail")}</span>
                    </div>
                  </div>
                </div>

                <div className="h-8"></div>

                <button
                  onClick={() => window.open("https://go.2gis.com/pJnnK", "_blank")}
                  className="w-full text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                  style={{ backgroundColor: "#21c45d" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1da851")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#21c45d")}
                >
                  {t("contacts.viewIn2GIS")}
                </button>
              </div>
            </div>

            {/* Map Block - wider, order-1 на мобильных/планшетах, order-2 на десктопе */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg h-[360px] flex items-center justify-center">
                <div style={{ position: "relative", overflow: "hidden", width: "100%", height: "360px" }}>
                  <iframe
                    id="map_337509892"
                    frameBorder="0"
                    width="100%"
                    height="360px"
                    src="https://makemap.2gis.ru/widget?data=eJxNkFtvmzAUx7-L9xhUHSBcpT4kpqN0BkGbtUqnPqTBY24cjIxZbsp33yFZpdpv53_ROb8TUbrmmtcpV1tutOA9iX-diDl0nMTkO1-ZQXNikU6rjmtz0U9kraTSqH_77QB-1I0wckw832fNz-2zeXc8wHHN-7UWnRGqRbFMm32Wyk359ADr9kG-v0RDTbPJ11BJI5Uvpj_K-9kkX9wZYJsG2LEaCurDMqn-mnQGLKkwOAEGfZbkB_pxt88KGrKaRowm1aZIE1i6lYlGD3tsasyyj2p4Sh6bgu6Atdjz6aXB2N8XKYVlj30zO09mu0JE83wxn-eQ7XGnXdnc3uJBx6yt-Z7ENny-s0WaK7zDiOY_uVKJ1qB_rRCwaFfmAjbwb8LAnfqBNXVvHAc8L3zDvKhJHLjO-c0i21VXql5cgZ2IXBkSX72hCxDZXgTe1CJylC9tju25TujYvjfOj0ptcTkfSxG8kvLlD-fy9TI1euDnf5EdmHs"
                    sandbox="allow-modals allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"
                    style={{ position: "relative", borderRadius: "1rem" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Modal */}
      <BookingForm isOpen={isBookingFormOpen} onClose={closeBookingForm} />

      {isPricingModalOpen && selectedTariff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="fixed inset-0" onClick={closePricingModal}></div>
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-in fade-in-0 zoom-in-95 duration-300">
            {/* Изображение */}
            <div className="aspect-[16/9] overflow-hidden rounded-t-3xl">
              <img
                src={tariffData[selectedTariff as keyof typeof tariffData].image || "/placeholder.svg"}
                alt={`${selectedTariff} ремонт`}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 md:p-8">
              <button
                onClick={closePricingModal}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 z-10"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Заголовок */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {tariffData[selectedTariff as keyof typeof tariffData].name}
                </h3>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-gray-500">{t("pricing.guarantee")}</p>
                  <span className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium">
                    {getTranslatedGuarantee(selectedTariff)}
                  </span>
                </div>
              </div>

              {/* Переключатель */}
              <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
                <button
                  onClick={() => setWithMaterials(false)}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                    !withMaterials ? "bg-red-600 text-white shadow-md" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {t("pricing.modal.workWithoutMaterials")}
                </button>
                <button
                  onClick={() => setWithMaterials(true)}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                    withMaterials ? "bg-red-600 text-white shadow-md" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {t("pricing.modal.workWithMaterials")}
                </button>
              </div>

              {/* Цена */}
              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {withMaterials
                    ? formatPriceWithFrom(tariffData[selectedTariff as keyof typeof tariffData].priceWithMaterials)
                    : formatPriceWithFrom(tariffData[selectedTariff as keyof typeof tariffData].priceWithoutMaterials)}
                </div>
              </div>

              {/* Описание */}

              <div className="space-y-6 mb-8">
                <div>
                  <h4 className="text-lg font-bold text-black mb-4">{t("pricing.modal.whatIncluded")}</h4>
                  <ul className="space-y-3">
                    {getTranslatedServices(selectedTariff, "included").map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {getTranslatedServices(selectedTariff, "notIncluded").length > 0 && (
                  <div>
                    <h4 className="text-lg font-bold text-black mb-4">{t("pricing.modal.whatNotIncluded")}</h4>
                    <ul className="space-y-3">
                      {getTranslatedServices(selectedTariff, "notIncluded").map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <X className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Кнопка */}
              <Button
                onClick={() => {
                  closePricingModal()
                  openBookingForm()
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-300 text-lg"
              >
                <Calculator className="w-5 h-5 mr-2" />
                {t("pricing.modal.calculateCost")}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Fixed WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/77053333082"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          style={{
            animation: "gentle-glow 3s ease-in-out infinite",
          }}
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0
11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488z"
            />
          </svg>
        </a>
      </div>

      {/* CSS styles for gentle pulse animation */}
      <style jsx>{`
        @keyframes gentle-glow {
          0%, 100% {
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 0 0 0 rgba(34, 197, 94, 0.4);
          }
          50% {
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15), 0 0 0 0 8px rgba(34, 197, 94, 0.1);
          }
          }
        
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        /* Добавляю новую анимацию для плавной бегущей строки */
        @keyframes marquee-smooth {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-25%);
          }
        }
        
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        
        /* Новый класс с замедленной анимацией */
        .animate-marquee-smooth {
          animation: marquee-smooth 30s linear infinite;
        }
      `}</style>

      <ImageGallery
        images={workImages}
        isOpen={galleryOpen}
        currentIndex={currentImageIndex}
        onClose={closeGallery}
        onNext={nextImage}
        onPrevious={previousImage}
      />

      <footer className="py-4 bg-white mb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-base text-gray-500">
            {t("footer.websiteDevelopment")}
          </p>
        </div>
      </footer>
    </div>
  )
}
