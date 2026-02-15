"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Music,
  Search,
  Plus,
  Home,
  User,
  MessageSquare,
  X,
} from "lucide-react"
import { MatrixRain } from "@/components/experiences/matrix-rain"

interface VideoFeedProps {
  nextRoute: string
}

interface Comment {
  user: string
  text: string
  likes: string
  time: string
  liked?: boolean
}

const VIDEO_COMMENTS: Comment[][] = [
  // Video 1: "El miedo a renunciar no se elimina. Se ordena."
  [
    { user: "maria_gzz", text: "Esto me llego al alma. Llevo 3 anos queriendo renunciar y hoy lo entendi todo.", likes: "2,341", time: "2h" },
    { user: "carlos_emprendedor", text: "HERMANO esto es exactamente lo que necesitaba escuchar hoy. Manana entrego mi renuncia.", likes: "1,892", time: "3h" },
    { user: "lupita_mx22", text: "Me da miedo pero ya entendi que el miedo no se va, se organiza. Gracias.", likes: "987", time: "1h" },
    { user: "daniel.coach", text: "Yo renuncie hace 6 meses usando este metodo. Hoy facturo 3x lo que ganaba. No es mentira.", likes: "4,521", time: "5h" },
    { user: "sofia_libre", text: "Llore viendo esto. Es como si me hablara directamente a mi.", likes: "1,234", time: "45m" },
    { user: "roberto_finanzas", text: "Lo comparti con mi esposa. Los dos vamos a salir de la matrix juntos.", likes: "3,102", time: "4h" },
    { user: "ana_bienestar", text: "Nunca habia visto a alguien explicar el miedo asi. Brutal.", likes: "756", time: "30m" },
    { user: "paco_digital", text: "Esto no es motivacion barata, esto es REAL. Se nota la diferencia.", likes: "2,890", time: "6h" },
    { user: "karen_empoderada", text: "Tengo 45 anos y pense que era muy tarde. Este video me demostro que no.", likes: "5,678", time: "8h" },
    { user: "juanpi_codes", text: "Yo era esceptico pero aplique lo que dice y en 2 meses ya tenia ingresos propios.", likes: "3,445", time: "7h" },
    { user: "moni_creativos", text: "Esto es ORO PURO. Guardado y compartido.", likes: "1,567", time: "2h" },
    { user: "alex_trader", text: "Me quede viendo esto 5 veces. Cada vez entiendo algo nuevo.", likes: "890", time: "1h" },
  ],
  // Video 2: "Cada hora sin decidir es una hora en un trabajo que odias."
  [
    { user: "fer_marketing", text: "Cada hora que paso en la oficina siento que pierdo vida. Esto me abrio los ojos.", likes: "3,210", time: "1h" },
    { user: "laura_libre23", text: "DIOS MIO esto es verdad. Llevo 8 anos en un trabajo que me roba el alma.", likes: "2,456", time: "3h" },
    { user: "diego_startups", text: "Renuncie hace 4 meses. Hoy ayudo a otros a hacer lo mismo y me pagan por ello.", likes: "5,123", time: "6h" },
    { user: "valentina.coaching", text: "El proposito de ayudar a otros SI se puede monetizar. Yo soy prueba viviente.", likes: "4,789", time: "5h" },
    { user: "marco_nomada", text: "Antes ganaba $800 USD al mes odiando mi vida. Ahora gano $4,500 haciendo lo que amo.", likes: "7,890", time: "9h" },
    { user: "isa_mentora", text: "No necesitas un titulo para vivir de tu proposito. Solo necesitas DECIDIR.", likes: "2,345", time: "2h" },
    { user: "pablo_freedom", text: "Comparti esto con mi grupo de amigos. TODOS quieren saber mas.", likes: "1,678", time: "4h" },
    { user: "camila_writes", text: "Yo pensaba que monetizar era solo para influencers. Que equivocada estaba.", likes: "3,456", time: "7h" },
    { user: "andres_ceo", text: "Lo mejor que he visto en TikTok en MESES. Contenido que realmente transforma.", likes: "6,234", time: "8h" },
    { user: "gaby_wellness", text: "Hoy es el dia que decidi que NO voy a seguir perdiendo horas. Gracias.", likes: "1,987", time: "1h" },
    { user: "ricky_hustle", text: "Mi jefe me grita todos los dias. Este video me dio el coraje que necesitaba.", likes: "4,321", time: "3h" },
  ],
  // Video 3: "No necesitas seguidores para monetizar tu don."
  [
    { user: "naty_emprende", text: "Tenia 200 seguidores cuando hice mi primera venta. ES VERDAD no necesitas miles.", likes: "6,543", time: "2h" },
    { user: "luis_purpose", text: "Monetice mi conocimiento con 0 seguidores. Solo necesitas el sistema correcto.", likes: "8,901", time: "5h" },
    { user: "ale_coach_vida", text: "Esto me cambio la perspectiva COMPLETAMENTE. No es sobre seguidores, es sobre valor.", likes: "3,456", time: "3h" },
    { user: "patri_digital", text: "Yo ayudo a personas con ansiedad y vivo de eso. Sin millones de seguidores. Solo con proposito.", likes: "5,678", time: "7h" },
    { user: "rafa_mentor", text: "Llevo 2 anos viviendo de mi don. La gente no lo cree hasta que lo ve.", likes: "4,321", time: "4h" },
    { user: "diana_libre", text: "ESTO ES LO QUE NADIE TE DICE. Los seguidores no pagan facturas, los clientes si.", likes: "7,654", time: "8h" },
    { user: "tomas_growth", text: "Facture $12,000 el mes pasado ayudando a otros. Con menos de 1K seguidores.", likes: "9,876", time: "10h" },
    { user: "caro_inspira", text: "Llore de la emocion cuando recibi mi primer pago por hacer lo que amo.", likes: "2,345", time: "1h" },
    { user: "oscar_escapeplan", text: "El secreto no es hacerte famoso. Es hacerte UTIL. Esto lo explica perfecto.", likes: "5,432", time: "6h" },
    { user: "meli_transforma", text: "Mi mama me decia que era imposible vivir ayudando gente. Hoy le pago sus vacaciones.", likes: "11.2K", time: "12h" },
    { user: "javi_digital", text: "Esto no es humo. Aplique el metodo y en 60 dias ya tenia clientes.", likes: "3,789", time: "3h" },
    { user: "sol_bienestar", text: "Si yo pude con 38 anos y sin saber nada de internet, CUALQUIERA PUEDE.", likes: "6,123", time: "9h" },
  ],
  // Video 4: "El costo de no renunciar a la matrix ya es demasiado alto."
  [
    { user: "edu_freedom", text: "Ya no es un lujo renunciar. Es una NECESIDAD. El costo de quedarte es tu salud mental.", likes: "8,765", time: "3h" },
    { user: "vero_proposito", text: "Perdi mi salud, mis amigos y casi mi familia por un trabajo que odiaba. Nunca mas.", likes: "6,543", time: "5h" },
    { user: "martin_escapa", text: "El dia que renuncie fue el dia que empece a VIVIR. No exagero.", likes: "5,432", time: "4h" },
    { user: "lili_empodera", text: "Vivo de ayudar a mujeres a encontrar su proposito. Es el mejor trabajo del mundo.", likes: "9,876", time: "8h" },
    { user: "raul_nomad", text: "Escribo esto desde Bali. Hace 1 ano estaba en un cubicalo gris. TODO es posible.", likes: "12.3K", time: "11h" },
    { user: "clau_mentora", text: "Si estas leyendo esto es porque SABES que mereces mas. Hazle caso a esa voz.", likes: "4,567", time: "2h" },
    { user: "beto_fintech", text: "Mis companeros de trabajo me decian loco. Ahora me piden consejo.", likes: "7,890", time: "7h" },
    { user: "dana_wellness", text: "No sabia que podia ganar dinero con mi don de escuchar a la gente. Ahora es mi carrera.", likes: "3,456", time: "6h" },
    { user: "nico_builds", text: "Este contenido deberia tener MILLONES de vistas. Es verdad todo lo que dice.", likes: "5,678", time: "9h" },
    { user: "rosa_inspira", text: "Tengo 52 anos y acabo de lanzar mi negocio de coaching. NUNCA es tarde.", likes: "10.1K", time: "10h" },
    { user: "sam_digital", text: "El costo real es tu felicidad. Y eso no tiene precio. Gracias por este video.", likes: "4,321", time: "1h" },
    { user: "ivan_escapeplan", text: "Esto me pego tan fuerte que lo vi 10 veces seguidas. Hoy empiezo mi plan de escape.", likes: "8,234", time: "4h" },
  ],
]

const VIDEOS = [
  {
    id: 1,
    text: "El miedo a renunciar no se elimina. Se ordena.",
    likes: "48.2K",
    comments: "1,247",
    bookmarks: "3,890",
    shares: "892",
  },
  {
    id: 2,
    text: "Cada hora sin decidir es una hora en un trabajo que odias.",
    likes: "92.1K",
    comments: "4,512",
    bookmarks: "8,234",
    shares: "2,103",
  },
  {
    id: 3,
    text: "No necesitas seguidores para monetizar tu don.",
    likes: "156K",
    comments: "7,891",
    bookmarks: "12.4K",
    shares: "5,670",
  },
  {
    id: 4,
    text: "El costo de no renunciar a la matrix ya es demasiado alto.",
    likes: "234K",
    comments: "11.2K",
    bookmarks: "18.7K",
    shares: "8,456",
  },
]

export function VideoFeed({ nextRoute }: VideoFeedProps) {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const maxScrollRef = useRef(0)
  const [hasReachedEnd, setHasReachedEnd] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [likedVideos, setLikedVideos] = useState<Set<number>>(new Set())
  const [showComments, setShowComments] = useState<number | null>(null)
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set())

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const currentScroll = container.scrollTop
      const height = container.clientHeight
      const index = Math.round(currentScroll / height)

      if (currentScroll < maxScrollRef.current) {
        container.scrollTop = maxScrollRef.current
        return
      }

      maxScrollRef.current = currentScroll
      setCurrentIndex(index)

      if (index === VIDEOS.length - 1) {
        setHasReachedEnd(true)
      }
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleLike = (id: number) => {
    setLikedVideos((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const toggleCommentLike = (videoIndex: number, commentIndex: number) => {
    const key = `${videoIndex}-${commentIndex}`
    setLikedComments((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      {/* Top Header - TikTok style */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-center pt-3 pb-2 px-4">
        <div className="flex items-center gap-4">
          <button type="button" className="text-white/50 text-[15px] font-medium">
            Siguiendo
          </button>
          <span className="text-white/20">|</span>
          <button type="button" className="text-white text-[15px] font-semibold relative">
            Para ti
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-white rounded-full" />
          </button>
        </div>
        <button type="button" className="absolute right-4 top-3">
          <Search className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Scrollable Feed */}
      <div
        ref={containerRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory"
        style={{ scrollSnapType: "y mandatory" }}
      >
        {VIDEOS.map((video, index) => (
          <div
            key={video.id}
            className="relative h-screen snap-start flex items-center justify-center overflow-hidden"
          >
            {/* Matrix Background */}
            <MatrixRain opacity={0.12} />

            {/* Center Content */}
            <div className="relative z-10 px-12 pr-20 max-w-sm">
              <p className="text-white text-xl font-semibold leading-relaxed text-center">
                {video.text}
              </p>
            </div>

            {/* Right Side Actions - TikTok style */}
            <div className="absolute right-3 bottom-28 z-20 flex flex-col items-center gap-5">
              {/* Profile */}
              <div className="relative mb-2">
                <div className="w-11 h-11 rounded-full border-2 border-white overflow-hidden">
                  <img
                    src="/tony-avatar.png"
                    alt="Tony"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#fe2c55] flex items-center justify-center">
                  <Plus className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
              </div>

              {/* Like */}
              <button
                type="button"
                className="flex flex-col items-center gap-1"
                onClick={() => toggleLike(video.id)}
              >
                <div className="w-10 h-10 flex items-center justify-center">
                  <Heart
                    className={`w-7 h-7 ${
                      likedVideos.has(video.id) ? "text-[#fe2c55] fill-[#fe2c55]" : "text-white"
                    }`}
                  />
                </div>
                <span className="text-white text-[11px] font-medium">{video.likes}</span>
              </button>

              {/* Comments */}
              <button
                type="button"
                className="flex flex-col items-center gap-1"
                onClick={() => setShowComments(index)}
              >
                <div className="w-10 h-10 flex items-center justify-center">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <span className="text-white text-[11px] font-medium">{video.comments}</span>
              </button>

              {/* Bookmark */}
              <button type="button" className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 flex items-center justify-center">
                  <Bookmark className="w-7 h-7 text-white" />
                </div>
                <span className="text-white text-[11px] font-medium">{video.bookmarks}</span>
              </button>

              {/* Share */}
              <button type="button" className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 flex items-center justify-center">
                  <Share2 className="w-7 h-7 text-white" />
                </div>
                <span className="text-white text-[11px] font-medium">{video.shares}</span>
              </button>

              {/* Spinning disc */}
              <div className="mt-1 w-10 h-10 rounded-full bg-gradient-to-br from-[#333] to-[#111] border-[3px] border-[#333] flex items-center justify-center animate-spin" style={{ animationDuration: "3s" }}>
                <Music className="w-3 h-3 text-white" />
              </div>
            </div>

            {/* Bottom Info - username + description */}
            <div className="absolute left-3 bottom-20 z-20 max-w-[70%]">
              <p className="text-white font-bold text-[14px] mb-1">@themindboost</p>
              <p className="text-white/80 text-[13px] leading-snug line-clamp-2">
                {video.text}
              </p>
              <div className="flex items-center gap-1.5 mt-2">
                <Music className="w-3 h-3 text-white" />
                <p className="text-white/60 text-[12px]">Sonido original - Escape Plan</p>
              </div>
            </div>

            {/* Progress dots on left */}
            <div className="absolute left-1.5 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1.5">
              {VIDEOS.map((_, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "bg-white h-4"
                      : i < currentIndex
                        ? "bg-white/40 h-1.5"
                        : "bg-white/20 h-1.5"
                  }`}
                />
              ))}
            </div>

            {/* CTA Button on last video */}
            {index === VIDEOS.length - 1 && hasReachedEnd && (
              <div className="absolute bottom-20 left-3 right-16 z-30">
                <Button
                  onClick={() => router.push(nextRoute)}
                  className="w-full bg-[#fe2c55] hover:bg-[#fe2c55]/90 text-white font-bold py-6 text-[15px] rounded-md"
                >
                  CONTINUAR
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Comments Overlay - TikTok style */}
      {showComments !== null && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowComments(null)}
            onKeyDown={() => {}}
            role="presentation"
          />

          {/* Comments Panel */}
          <div className="relative bg-[#121212] rounded-t-xl max-h-[65vh] flex flex-col animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="w-8" />
              <span className="text-white text-[14px] font-semibold">
                {VIDEOS[showComments].comments} comentarios
              </span>
              <button
                type="button"
                onClick={() => setShowComments(null)}
                className="w-8 h-8 flex items-center justify-center"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-5">
              {VIDEO_COMMENTS[showComments].map((comment, cIdx) => {
                const commentKey = `${showComments}-${cIdx}`
                const isLiked = likedComments.has(commentKey)
                return (
                  <div key={cIdx} className="flex gap-3">
                    {/* Avatar */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#333] to-[#555] flex items-center justify-center">
                      <span className="text-white text-[11px] font-bold">
                        {comment.user.charAt(0).toUpperCase()}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-white/50 text-[12px] font-medium">
                          {comment.user}
                        </span>
                        <span className="text-white/30 text-[11px]">{comment.time}</span>
                      </div>
                      <p className="text-white text-[13px] leading-snug mt-0.5">
                        {comment.text}
                      </p>
                      <div className="flex items-center gap-4 mt-1.5">
                        <button
                          type="button"
                          className="flex items-center gap-1"
                          onClick={() => toggleCommentLike(showComments, cIdx)}
                        >
                          <Heart
                            className={`w-3.5 h-3.5 ${isLiked ? "text-[#fe2c55] fill-[#fe2c55]" : "text-white/40"}`}
                          />
                          <span className={`text-[11px] ${isLiked ? "text-[#fe2c55]" : "text-white/40"}`}>
                            {comment.likes}
                          </span>
                        </button>
                        <button type="button" className="text-white/40 text-[11px]">
                          Responder
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Input bar */}
            <div className="border-t border-white/10 px-4 py-3 flex items-center gap-3 pb-6">
              <div className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-white/50" />
              </div>
              <div className="flex-1 bg-white/10 rounded-full px-4 py-2">
                <span className="text-white/30 text-[13px]">Agregar comentario...</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation - TikTok style */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-black/95 border-t border-white/10">
        <div className="flex items-center justify-around py-2 pb-4">
          <button type="button" className="flex flex-col items-center gap-0.5">
            <Home className="w-6 h-6 text-white" fill="white" />
            <span className="text-white text-[10px] font-medium">Inicio</span>
          </button>
          <button type="button" className="flex flex-col items-center gap-0.5">
            <Search className="w-6 h-6 text-white/50" />
            <span className="text-white/50 text-[10px]">Descubrir</span>
          </button>
          <button type="button" className="relative">
            <div className="relative w-12 h-8 flex items-center justify-center">
              <div className="absolute left-0 w-8 h-7 rounded-md bg-[#00f2ea]" />
              <div className="absolute right-0 w-8 h-7 rounded-md bg-[#fe2c55]" />
              <div className="relative w-8 h-7 rounded-md bg-white flex items-center justify-center">
                <Plus className="w-5 h-5 text-black" strokeWidth={2.5} />
              </div>
            </div>
          </button>
          <button type="button" className="flex flex-col items-center gap-0.5">
            <MessageSquare className="w-6 h-6 text-white/50" />
            <span className="text-white/50 text-[10px]">Bandeja</span>
          </button>
          <button type="button" className="flex flex-col items-center gap-0.5">
            <User className="w-6 h-6 text-white/50" />
            <span className="text-white/50 text-[10px]">Perfil</span>
          </button>
        </div>
      </div>
    </div>
  )
}
