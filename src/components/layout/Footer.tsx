import Image from 'next/image'
import { Phone, Mail, Globe, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">

      {/* ── Sección principal ─────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Columna 1 — Datos de la escuela */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                <Image
                  src="/logo-ens9.png"
                  alt="Escuela Normal Superior N°9"
                  width={52}
                  height={52}
                  className="w-13 h-13 object-contain"
                />
              </div>
              <div>
                <p className="font-bold text-white text-sm leading-tight">Campus Virtual ENS N°9</p>
                <p className="text-slate-400 text-xs leading-tight">Modalidad Técnica en Gestión</p>
                <p className="text-slate-400 text-xs leading-tight">y Administración de las Organizaciones</p>
              </div>
            </div>

            <p className="text-white font-semibold text-sm mb-3">
              Escuela Normal Superior N°9 "Juan XXIII"
            </p>

            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-slate-500 font-medium shrink-0">CUE:</span>
                <span>540073200</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span>Avda. Juan XXIII N° 159, Wanda, Misiones, Argentina — CP: 3376</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                <a href="tel:+5437576772203" className="hover:text-white transition-colors">
                  (+54) 3757-677203
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                <a href="mailto:contacto@normal9wanda.edu.ar" className="hover:text-white transition-colors">
                  contacto@normal9wanda.edu.ar
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                <a
                  href="https://www.normal9wanda.edu.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  www.normal9wanda.edu.ar
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 2 — CGEPM */}
          <div>
            <div className="mb-5 inline-block bg-white rounded-lg px-4 py-2">
              <Image
                src="/logo-cgepm.png"
                alt="Consejo General de Educación de Misiones"
                width={180}
                height={50}
                style={{ width: 'auto', height: '44px' }}
                className="object-contain"
              />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Dependiente del{' '}
              <span className="text-slate-300 font-medium">
                Consejo General de Educación de la Provincia de Misiones
              </span>
            </p>
            <p className="text-xs text-slate-500 mb-3">CUIT: 30-65913433-7</p>
            <a
              href="https://www.cgepm.gov.ar/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Globe className="h-3.5 w-3.5" />
              www.cgepm.gov.ar
            </a>
          </div>

          {/* Columna 3 — Plataforma */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Plataforma</h3>
            <ul className="space-y-2 text-xs mb-6">
              <li><a href="/cursos" className="hover:text-white transition-colors">Catálogo de cursos</a></li>
              <li><a href="/registro" className="hover:text-white transition-colors">Registrarse</a></li>
              <li><a href="/login" className="hover:text-white transition-colors">Iniciar sesión</a></li>
            </ul>

            <div className="bg-slate-800 rounded-xl p-4 text-xs text-slate-400 leading-relaxed">
              <p className="font-medium text-slate-300 mb-1">Uso institucional</p>
              <p>
                Este sistema es de uso exclusivo para estudiantes, docentes y comunidad educativa
                de la Escuela Normal Superior N°9. Los datos son confidenciales.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Franja inferior ───────────────────────────────── */}
      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">

            {/* Copyright */}
            <p>© {new Date().getFullYear()} Escuela Normal Superior N°9 "Juan XXIII" — Wanda, Misiones</p>

            {/* Créditos del creador */}
            <div className="text-center md:text-right">
              <p className="text-slate-400">
                Diseñado y desarrollado por{' '}
                <span className="text-white font-semibold">Juan Manuel Gómez</span>
              </p>
              <p className="text-slate-500 mt-0.5">
                Lic. en Educación · Prof. Universitario en Ciencias Económicas · Experto en Tecnología Educativa
              </p>
              <p className="mt-1">
                <span className="text-slate-500">Un producto de </span>
                <span className="font-bold text-blue-400 tracking-wide">Simul.ar</span>
              </p>
            </div>
          </div>
        </div>
      </div>

    </footer>
  )
}
